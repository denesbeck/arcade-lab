import { useState } from 'react'
import type { Message } from '../_config/chat-widget'
import { INITIAL_MESSAGE, MAX_USER_MESSAGES } from '../_config/chat-widget'

const useChatWidgetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')

  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const isAtLimit = userMessageCount >= MAX_USER_MESSAGES

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading || isAtLimit) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setStreamingContent('')

    try {
      const apiMessages = updatedMessages
        .filter((_, i) => i > 0)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('text/event-stream')) {
        // Streaming response — read SSE chunks
        const reader = response.body?.getReader()
        if (!reader) throw new Error('No reader')

        const decoder = new TextDecoder()
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  accumulated += parsed.text
                  setStreamingContent(accumulated)
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        }

        // Finalize — move streaming content into messages
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: accumulated || 'Sorry, I could not process your request.',
          },
        ])
        setStreamingContent('')
      } else {
        // Non-streaming fallback (e.g., rate limit error returned as JSON)
        const data = await response.json()
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.response ||
              data.error ||
              'Sorry, I could not process your request.',
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return {
    messages,
    input,
    setInput,
    isLoading,
    streamingContent,
    isAtLimit,
    sendMessage,
    handleKeyDown,
  }
}

export default useChatWidgetMessages
