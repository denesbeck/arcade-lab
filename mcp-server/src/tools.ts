import { getPersonalInfo } from './data/about'
import { getAllTags, getBlogEntries, getBlogPost } from './data/blog'
import { getProjects } from './data/projects'
import { searchBlogPosts } from './search'
import type { ToolResult } from './types'

/**
 * Tool definitions in Claude API format (JSON Schema).
 * Used by the Next.js API route for Claude tool_use.
 */
export const TOOL_DEFINITIONS = [
  {
    name: 'search_blog_posts',
    description:
      'Search blog posts by keyword. Matches against titles, descriptions, and tags. Use this when the user asks about a topic that might be covered in a blog post (e.g., "how to set up Jellyfin", "Docker containers", "AWS security").',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description:
            'Search query — keywords describing what the user is looking for',
        },
        tag: {
          type: 'string',
          description:
            'Optional: filter results to a specific tag (e.g., "docker", "aws", "home-server")',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_blog_post',
    description:
      'Get the full content of a specific blog post by its ID. Use this after search_blog_posts to retrieve the full article content for a relevant result.',
    input_schema: {
      type: 'object' as const,
      properties: {
        id: {
          type: 'number',
          description: 'The blog post ID',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_blog_posts',
    description:
      'List all published blog posts with their titles, descriptions, dates, and tags. Use this when the user asks what blog posts are available or wants an overview of all content.',
    input_schema: {
      type: 'object' as const,
      properties: {
        tag: {
          type: 'string',
          description: 'Optional: filter by tag',
        },
      },
    },
  },
  {
    name: 'get_about_info',
    description:
      'Get personal information about Denes Beck — name, role, company, location, bio, skills, certifications, and social links. Use this when the user asks about the blog author, their background, skills, or experience.',
    input_schema: {
      type: 'object' as const,
      properties: {},
    },
  },
  {
    name: 'list_projects',
    description:
      'List portfolio projects with details including title, description, tech stack, highlights, and GitHub URLs. Use this when the user asks about projects or work.',
    input_schema: {
      type: 'object' as const,
      properties: {
        status: {
          type: 'string',
          enum: ['active', 'archived'],
          description: 'Optional: filter by project status',
        },
      },
    },
  },
  {
    name: 'list_tags',
    description:
      'List all unique tags used across blog posts. Use this when the user wants to know what topics are covered.',
    input_schema: {
      type: 'object' as const,
      properties: {},
    },
  },
]

/**
 * Execute a tool by name with the given arguments.
 * Returns a standardized result format compatible with both MCP and Claude API.
 */
export function executeTool(
  name: string,
  args: Record<string, unknown>
): ToolResult {
  switch (name) {
    case 'search_blog_posts': {
      const query = args.query as string
      const tag = args.tag as string | undefined
      const entries = getBlogEntries()
      const results = searchBlogPosts(entries, query, { tag })

      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No blog posts found matching "${query}"${tag ? ` with tag "${tag}"` : ''}.`,
            },
          ],
        }
      }

      const text = results
        .map(
          (r) =>
            `[ID: ${r.id}] ${r.title}\n  URL: /blog/${r.id}\n  Description: ${r.description}\n  Date: ${r.date}\n  Tags: ${r.tags.join(', ')}\n  Relevance score: ${r.score}`
        )
        .join('\n\n')

      return {
        content: [
          {
            type: 'text',
            text: `Found ${results.length} matching blog post(s):\n\n${text}\n\nUse get_blog_post with the ID to retrieve the full content of a post. When referencing a blog post in your response, always include a markdown link to it using the URL shown above.`,
          },
        ],
      }
    }

    case 'get_blog_post': {
      const id = args.id as number
      const post = getBlogPost(id)

      if (!post) {
        return {
          content: [
            { type: 'text', text: `Blog post with ID ${id} not found.` },
          ],
        }
      }

      if (post.hidden) {
        return {
          content: [
            {
              type: 'text',
              text: `Blog post with ID ${id} is not published yet.`,
            },
          ],
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: `# ${post.title}\n\nURL: /blog/${post.id}\nDate: ${post.date}\nTags: ${post.tags.join(', ')}\n\n${post.description}\n\n---\n\n${post.content}\n\n---\nWhen referencing this blog post in your response, include a markdown link: [${post.title}](/blog/${post.id})`,
          },
        ],
      }
    }

    case 'list_blog_posts': {
      const tag = args.tag as string | undefined
      let entries = getBlogEntries()

      if (tag) {
        const normalizedTag = tag.toLowerCase()
        entries = entries.filter((e) =>
          e.tags.some((t) => t.toLowerCase() === normalizedTag)
        )
      }

      if (entries.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: tag
                ? `No published blog posts with tag "${tag}".`
                : 'No published blog posts.',
            },
          ],
        }
      }

      const text = entries
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(
          (e) =>
            `[ID: ${e.id}] ${e.title} (${e.date})\n  URL: /blog/${e.id}\n  ${e.description}\n  Tags: ${e.tags.join(', ')}`
        )
        .join('\n\n')

      return {
        content: [
          {
            type: 'text',
            text: `${entries.length} published blog post(s)${tag ? ` with tag "${tag}"` : ''}:\n\n${text}`,
          },
        ],
      }
    }

    case 'get_about_info': {
      const info = getPersonalInfo()
      const text = [
        `Name: ${info.name}`,
        `Role: ${info.role}`,
        `Company: ${info.company}`,
        `Location: ${info.location}`,
        '',
        `Bio: ${info.bio}`,
        '',
        `Skills: ${info.skills.join(', ')}`,
        '',
        'Certifications:',
        ...info.certificates.map((c) => `  - ${c.name}: ${c.url}`),
        '',
        'Social Links:',
        ...info.connections.map((c) => `  - ${c.platform}: ${c.url}`),
      ].join('\n')

      return { content: [{ type: 'text', text }] }
    }

    case 'list_projects': {
      const status = args.status as 'active' | 'archived' | undefined
      const projects = getProjects(status)

      const text = projects
        .map((p) => {
          const lines = [
            `${p.title} — ${p.subtitle} [${p.status}]`,
            `  URL: ${p.url}`,
            `  Tech: ${p.tech.join(', ')}`,
            `  Highlights:`,
            ...p.highlights.map((h) => `    - ${h}`),
          ]
          if (p.relatedBlogPostIds.length > 0) {
            lines.push(
              `  Related blog post IDs: ${p.relatedBlogPostIds.join(', ')}`
            )
          }
          return lines.join('\n')
        })
        .join('\n\n')

      return {
        content: [
          { type: 'text', text: `${projects.length} project(s):\n\n${text}` },
        ],
      }
    }

    case 'list_tags': {
      const tags = getAllTags()
      return {
        content: [
          {
            type: 'text',
            text: `Available tags (${tags.length}):\n${tags.join(', ')}`,
          },
        ],
      }
    }

    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }] }
  }
}
