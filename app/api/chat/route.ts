import Anthropic from '@anthropic-ai/sdk'
import type {
  MessageParam,
  Tool,
  ToolResultBlockParam,
  ToolUseBlock,
} from '@anthropic-ai/sdk/resources/messages'
import { executeTool, TOOL_DEFINITIONS } from '@mcp/tools'
import { checkRateLimit } from './rate-limit'

const SYSTEM_PROMPT = `You are a helpful assistant for Denes Beck's portfolio website (Arcade Lab). You have access to tools that let you search and retrieve blog posts, personal information, and project details.

Guidelines:
- Be concise and helpful. This is a chat widget on a portfolio site, so keep responses focused.
- When users ask about topics covered in blog posts, search for and retrieve the relevant content.
- When users ask about Denes, use the get_about_info tool to get accurate information.
- When users ask about projects, use the list_projects tool.
- Always base your answers on the actual content from the tools — do not make up information.
- When referencing a blog post, ALWAYS include a markdown link to it using the format [Post Title](/blog/<id>). The URL is provided in the tool results.
- Keep responses brief but informative — users can read the full blog posts for more detail.`

const MAX_TOOL_ROUNDS = 5

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const rateLimitError = checkRateLimit(ip)
    if (rateLimitError) {
      return Response.json({ error: rateLimitError }, { status: 429 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'ANTHROPIC_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const { messages } = (await request.json()) as { messages: MessageParam[] }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    if (messages.length > 20) {
      return Response.json(
        { error: 'Too many messages in conversation' },
        { status: 400 }
      )
    }

    const client = new Anthropic({ apiKey })

    const tools: Tool[] = TOOL_DEFINITIONS.map((t) => ({
      name: t.name,
      description: t.description,
      input_schema: t.input_schema as Tool['input_schema'],
    }))

    // Run tool rounds (non-streaming) until we get a final text response
    let currentMessages = [...messages]
    let rounds = 0

    while (rounds < MAX_TOOL_ROUNDS) {
      rounds++

      // For the potential final round, check if we should stream
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages: currentMessages,
      })

      const toolUseBlocks = response.content.filter(
        (block): block is ToolUseBlock => block.type === 'tool_use'
      )

      if (toolUseBlocks.length === 0) {
        // Final response — stream it back
        const stream = client.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          tools,
          messages: currentMessages,
        })

        const encoder = new TextEncoder()

        const readable = new ReadableStream({
          async start(controller) {
            try {
              for await (const event of stream) {
                if (
                  event.type === 'content_block_delta' &&
                  event.delta.type === 'text_delta'
                ) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
                    )
                  )
                }
              }
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
            } catch (err) {
              controller.error(err)
            }
          },
        })

        return new Response(readable, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        })
      }

      // Execute tool calls and continue loop
      const toolResults: ToolResultBlockParam[] = toolUseBlocks.map(
        (toolUse) => {
          const result = executeTool(
            toolUse.name,
            toolUse.input as Record<string, unknown>
          )
          return {
            type: 'tool_result' as const,
            tool_use_id: toolUse.id,
            content: result.content.map((c) => ({
              type: 'text' as const,
              text: c.text,
            })),
          }
        }
      )

      currentMessages = [
        ...currentMessages,
        { role: 'assistant' as const, content: response.content },
        { role: 'user' as const, content: toolResults },
      ]
    }

    return Response.json({
      response:
        "I wasn't able to find a complete answer. Please try rephrasing your question.",
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    )
  }
}
