import { describe, expect, it } from 'vitest'
import { getBlogEntries } from './data/blog'
import { executeTool, TOOL_DEFINITIONS } from './tools'

// Helper: executeTool always returns a single text block — collapse it.
const run = (name: string, args: Record<string, unknown> = {}): string =>
  executeTool(name, args)
    .content.map((c) => c.text)
    .join('\n')

describe('executeTool', () => {
  describe('tool definitions', () => {
    it('exposes a handler for every advertised tool', () => {
      // Guards against a tool being defined but unhandled (falls through to
      // the "Unknown tool" branch), which would silently break the chat widget.
      // Supply the required args per schema so each handler actually runs.
      const requiredArgs: Record<string, Record<string, unknown>> = {
        search_blog_posts: { query: 'test' },
        get_blog_post: { id: getBlogEntries()[0].id },
      }
      for (const def of TOOL_DEFINITIONS) {
        expect(run(def.name, requiredArgs[def.name] ?? {})).not.toMatch(
          /^Unknown tool:/
        )
      }
    })

    it('returns the Unknown tool message for an unregistered name', () => {
      expect(run('does_not_exist')).toBe('Unknown tool: does_not_exist')
    })
  })

  describe('search_blog_posts', () => {
    it('formats matches with the ID and /blog/<id> URL', () => {
      // The system prompt relies on this URL format to build markdown links.
      const text = run('search_blog_posts', { query: 'lambda' })
      expect(text).toMatch(/\[ID: \d+\]/)
      expect(text).toMatch(/URL: \/blog\/\d+/)
    })

    it('reports no results for a query that cannot match', () => {
      const text = run('search_blog_posts', {
        query: 'zzzznonexistentqueryxyz',
      })
      expect(text).toContain('No blog posts found')
    })
  })

  describe('get_blog_post', () => {
    it('returns a not-found message for an unknown id', () => {
      expect(run('get_blog_post', { id: 999999 })).toContain('not found')
    })

    it('returns the title, URL, and content for a published post', () => {
      const entry = getBlogEntries()[0]
      const text = run('get_blog_post', { id: entry.id })
      expect(text).toContain(entry.title)
      expect(text).toContain(`/blog/${entry.id}`)
      // Content is appended after the metadata separator.
      expect(text).toContain('---')
    })
  })

  describe('list_blog_posts', () => {
    it('lists published posts with IDs', () => {
      expect(run('list_blog_posts')).toMatch(/\[ID: \d+\]/)
    })

    it('filters by tag case-insensitively', () => {
      const text = run('list_blog_posts', { tag: 'AWS' })
      expect(text).toContain('with tag "AWS"')
      expect(text).toMatch(/\[ID: \d+\]/)
    })

    it('reports no posts for an unknown tag', () => {
      const text = run('list_blog_posts', { tag: 'no-such-tag-xyz' })
      expect(text).toContain('No published blog posts with tag')
    })
  })

  describe('get_about_info', () => {
    it('includes the core profile fields', () => {
      const text = run('get_about_info')
      expect(text).toContain('Name:')
      expect(text).toContain('Role:')
      expect(text).toContain('Skills:')
    })
  })

  describe('list_projects', () => {
    it('lists projects with tech and URL', () => {
      const text = run('list_projects')
      expect(text).toContain('project(s):')
      expect(text).toContain('Tech:')
      expect(text).toContain('URL:')
    })

    it('filters to active projects only', () => {
      const text = run('list_projects', { status: 'active' })
      expect(text).toContain('[active]')
      expect(text).not.toContain('[archived]')
    })
  })

  describe('list_tags', () => {
    it('returns the tag list', () => {
      const text = run('list_tags')
      expect(text).toContain('Available tags')
    })
  })
})
