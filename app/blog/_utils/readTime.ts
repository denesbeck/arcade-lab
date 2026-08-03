import * as fs from 'node:fs'
import * as path from 'node:path'
import type { BlogEntry, BlogEntryWithReadTime } from '../_interfaces/blog'

// Low end of the usual 200-250 wpm range: these posts mix prose with code and
// config, which is read slower than plain text.
const WORDS_PER_MINUTE = 200

const MARKDOWN_DIR = path.join(process.cwd(), 'app/blog/_config/markdown')

/**
 * Strip the markup a reader never reads — tags, urls, formatting characters —
 * so the word count reflects the actual text. Code blocks stay in: skimming
 * them is part of reading the post.
 */
const toPlainText = (mdx: string): string =>
  mdx
    .replace(/<[^>]+>/g, ' ') // JSX/HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links, keeping the label
    .replace(/^```[\w-]*$/gm, ' ') // code fences, not their contents
    .replace(/^#{1,6}\s+/gm, ' ') // heading markers
    .replace(/^\s*>\s?/gm, ' ') // blockquote markers
    .replace(/^\s*[-*+]\s+/gm, ' ') // list bullets
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ') // horizontal rules
    .replace(/\*{1,3}|~{2}|`/g, '') // emphasis and inline code
    .replace(/\|/g, ' ') // table cell separators

const countWords = (text: string): number =>
  text.split(/\s+/).filter(Boolean).length

/** Whole minutes to read an MDX source, never less than one. */
export const estimateReadTime = (mdx: string): number =>
  Math.max(1, Math.round(countWords(toPlainText(mdx)) / WORDS_PER_MINUTE))

const cache = new Map<string, number | null>()

/**
 * Read time in minutes for a post's MDX file, or null when the file cannot be
 * read — callers omit the label rather than fail the page over it.
 *
 * Server-only: the MDX sources are read from disk (see
 * `outputFileTracingIncludes` in next.config.ts).
 */
export const getReadTime = (file: string): number | null => {
  const cached = cache.get(file)
  if (cached !== undefined) return cached

  let minutes: number | null
  try {
    const mdx = fs.readFileSync(path.join(MARKDOWN_DIR, `${file}.mdx`), 'utf-8')
    minutes = estimateReadTime(mdx)
  } catch {
    minutes = null
  }

  cache.set(file, minutes)
  return minutes
}

export const withReadTime = (entry: BlogEntry): BlogEntryWithReadTime => ({
  ...entry,
  readTime: getReadTime(entry.file),
})
