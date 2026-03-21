import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { executeTool } from './tools'

const server = new McpServer({
  name: 'arcade-lab',
  version: '1.0.0',
})

// search_blog_posts
server.registerTool(
  'search_blog_posts',
  {
    description:
      'Search blog posts by keyword. Matches against titles, descriptions, and tags. Use this when the user asks about a topic that might be covered in a blog post.',
    annotations: { readOnlyHint: true },
    inputSchema: {
      query: z
        .string()
        .describe(
          'Search query — keywords describing what the user is looking for'
        ),
      tag: z
        .string()
        .optional()
        .describe(
          'Optional: filter results to a specific tag (e.g., "docker", "aws", "home-server")'
        ),
    },
  },
  async (args) => {
    return executeTool('search_blog_posts', args)
  }
)

// get_blog_post
server.registerTool(
  'get_blog_post',
  {
    description:
      'Get the full content of a specific blog post by its ID. Use this after search_blog_posts to retrieve the full article.',
    annotations: { readOnlyHint: true },
    inputSchema: {
      id: z.number().describe('The blog post ID'),
    },
  },
  async (args) => {
    return executeTool('get_blog_post', args)
  }
)

// list_blog_posts
server.registerTool(
  'list_blog_posts',
  {
    description:
      'List all published blog posts with their titles, descriptions, dates, and tags.',
    annotations: { readOnlyHint: true },
    inputSchema: {
      tag: z.string().optional().describe('Optional: filter by tag'),
    },
  },
  async (args) => {
    return executeTool('list_blog_posts', args)
  }
)

// get_about_info
server.registerTool(
  'get_about_info',
  {
    description:
      'Get personal information about Denes Beck — name, role, company, location, bio, skills, certifications, and social links.',
    annotations: { readOnlyHint: true },
  },
  async () => {
    return executeTool('get_about_info', {})
  }
)

// list_projects
server.registerTool(
  'list_projects',
  {
    description:
      'List portfolio projects with details including title, description, tech stack, highlights, and GitHub URLs.',
    annotations: { readOnlyHint: true },
    inputSchema: {
      status: z
        .enum(['active', 'archived'])
        .optional()
        .describe('Optional: filter by project status'),
    },
  },
  async (args) => {
    return executeTool('list_projects', args)
  }
)

// list_tags
server.registerTool(
  'list_tags',
  {
    description:
      'List all unique tags used across blog posts. Use this when the user wants to know what topics are covered.',
    annotations: { readOnlyHint: true },
  },
  async () => {
    return executeTool('list_tags', {})
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Arcade Lab MCP server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
