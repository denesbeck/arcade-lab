import * as fs from 'node:fs'
import * as path from 'node:path'
import BLOG_METADATA from '../../../app/blog/_config/metadata'
import type { BlogPost, BlogPostMeta } from '../types'

const BLOG_ENTRIES: BlogPostMeta[] = BLOG_METADATA

/**
 * Strip MDX/JSX syntax from content to produce plain readable text.
 */
function stripMdx(content: string): string {
  return (
    content
      // Remove JSX tags like <div className="..."> and </div>
      .replace(/<[^>]+>/g, '')
      // Remove image syntax ![alt](/path)
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      // Convert markdown links [text](url) to just text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove code block markers ```lang
      .replace(/```[\w-]*/g, '')
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')
      // Remove heading markers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic markers
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}$/gm, '')
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

/**
 * Resolve the path to the markdown directory.
 * Works from both the project root and the mcp-server subdirectory.
 */
function resolveMarkdownDir(): string {
  // Try relative to project root first
  const fromRoot = path.join(
    process.cwd(),
    'app',
    'blog',
    '_config',
    'markdown'
  )
  if (fs.existsSync(fromRoot)) return fromRoot

  // Try from mcp-server subdirectory
  const fromMcpServer = path.join(
    process.cwd(),
    '..',
    'app',
    'blog',
    '_config',
    'markdown'
  )
  if (fs.existsSync(fromMcpServer)) return fromMcpServer

  throw new Error(
    `Could not find markdown directory. Tried:\n  ${fromRoot}\n  ${fromMcpServer}`
  )
}

/**
 * A post is published if it is not explicitly hidden
 * and its date is today or in the past (YYYY-MM-DD comparison).
 */
export function isPublished(entry: BlogPostMeta): boolean {
  if (entry.hidden) return false
  const today = new Date().toISOString().split('T')[0]
  return entry.date <= today
}

/**
 * Get all published blog post metadata.
 * A post is published when not hidden and its date is today or in the past.
 */
export function getBlogEntries(includeAll = false): BlogPostMeta[] {
  if (includeAll) return BLOG_ENTRIES
  return BLOG_ENTRIES.filter(isPublished)
}

/**
 * Get a blog post by ID, including its full MDX content (stripped to plain text).
 */
export function getBlogPost(id: number): BlogPost | null {
  const entry = BLOG_ENTRIES.find((e) => e.id === id)
  if (!entry) return null

  const markdownDir = resolveMarkdownDir()
  const filePath = path.join(markdownDir, `${entry.file}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const content = stripMdx(rawContent)

  return { ...entry, content }
}

/**
 * Get a blog post by its URL slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const entry = BLOG_ENTRIES.find((e) => e.slug === slug)
  if (!entry) return null
  return getBlogPost(entry.id)
}

/**
 * Get all unique tags across all published blog posts.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const entry of getBlogEntries()) {
    for (const tag of entry.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}
