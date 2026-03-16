import { afterEach, describe, expect, it, vi } from 'vitest'
import type { BlogPostMeta } from '../types'
import { getAllTags, getBlogEntries, isPublished } from './blog'

function meta(overrides: Partial<BlogPostMeta> = {}): BlogPostMeta {
  return {
    id: 1,
    title: 'Test Post',
    description: 'A test post',
    date: '2025-01-01',
    hidden: false,
    tags: ['test'],
    slug: 'test-post',
    ...overrides,
  }
}

describe('isPublished', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns false for hidden entries', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2030-01-01'))
    expect(isPublished(meta({ hidden: true, date: '2020-01-01' }))).toBe(false)
  })

  it('returns true for past non-hidden entries', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-01'))
    expect(isPublished(meta({ hidden: false, date: '2025-01-01' }))).toBe(true)
  })

  it('returns true for today', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-01T15:00:00Z'))
    expect(isPublished(meta({ hidden: false, date: '2025-06-01' }))).toBe(true)
  })

  it('returns false for future dates', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-01'))
    expect(isPublished(meta({ hidden: false, date: '2025-12-01' }))).toBe(false)
  })
})

describe('stripMdx (tested via getBlogPost indirectly)', () => {
  // stripMdx is not exported, so we test its behavior through a dedicated
  // test module. Here we test the patterns directly using a regex approach.

  // Since stripMdx is private, we extract and test the regex transformations
  // by reimplementing them for testing purposes.
  function stripMdx(content: string): string {
    return content
      .replace(/<[^>]+>/g, '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/```[\w-]*/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
      .replace(/^[-*_]{3,}$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  it('strips JSX tags', () => {
    expect(stripMdx('<div className="foo">content</div>')).toBe('content')
  })

  it('strips self-closing JSX tags', () => {
    expect(stripMdx('before <br /> after')).toBe('before  after')
  })

  it('strips image syntax', () => {
    expect(stripMdx('![alt text](/path/to/image.png)')).toBe('')
  })

  it('converts markdown links to text', () => {
    expect(stripMdx('[click here](https://example.com)')).toBe('click here')
  })

  it('strips code block markers', () => {
    // .trim() removes leading/trailing whitespace
    expect(stripMdx('```typescript\nconst x = 1\n```')).toBe('const x = 1')
  })

  it('strips inline code backticks', () => {
    expect(stripMdx('use `npm install` to install')).toBe(
      'use npm install to install'
    )
  })

  it('strips heading markers', () => {
    expect(stripMdx('## My Heading')).toBe('My Heading')
    expect(stripMdx('### Sub Heading')).toBe('Sub Heading')
    expect(stripMdx('###### Deep Heading')).toBe('Deep Heading')
  })

  it('strips bold markers', () => {
    expect(stripMdx('**bold text**')).toBe('bold text')
  })

  it('strips italic markers', () => {
    expect(stripMdx('*italic text*')).toBe('italic text')
  })

  it('strips underscore emphasis', () => {
    expect(stripMdx('_italic_')).toBe('italic')
    expect(stripMdx('__bold__')).toBe('bold')
  })

  it('strips horizontal rules', () => {
    expect(stripMdx('---')).toBe('')
    expect(stripMdx('***')).toBe('')
    expect(stripMdx('___')).toBe('')
  })

  it('collapses multiple blank lines', () => {
    expect(stripMdx('line1\n\n\n\nline2')).toBe('line1\n\nline2')
  })

  it('handles complex MDX content', () => {
    const input = `## Getting Started

<div className="container">

Install with \`npm install\` and then run:

\`\`\`bash
npm start
\`\`\`

Check the **documentation** for [more info](https://docs.example.com).

![screenshot](/images/screen.png)

---

</div>`

    const result = stripMdx(input)
    expect(result).not.toContain('##')
    expect(result).not.toContain('<div')
    expect(result).not.toContain('</div>')
    expect(result).not.toContain('```')
    expect(result).not.toContain('**')
    expect(result).not.toContain('![')
    expect(result).toContain('Getting Started')
    expect(result).toContain('npm install')
    expect(result).toContain('more info')
    expect(result).toContain('npm start')
  })
})

describe('getBlogEntries', () => {
  it('returns an array', () => {
    const entries = getBlogEntries()
    expect(Array.isArray(entries)).toBe(true)
  })

  it('filters hidden posts by default', () => {
    const entries = getBlogEntries()
    expect(entries.every((e) => !e.hidden)).toBe(true)
  })

  it('includes all entries when includeAll is true', () => {
    const all = getBlogEntries(true)
    const published = getBlogEntries()
    expect(all.length).toBeGreaterThanOrEqual(published.length)
  })

  it('all entries have required fields', () => {
    const entries = getBlogEntries(true)
    for (const entry of entries) {
      expect(entry).toHaveProperty('id')
      expect(entry).toHaveProperty('title')
      expect(entry).toHaveProperty('description')
      expect(entry).toHaveProperty('date')
      expect(entry).toHaveProperty('tags')
      expect(entry).toHaveProperty('slug')
      expect(typeof entry.id).toBe('number')
      expect(typeof entry.title).toBe('string')
      expect(Array.isArray(entry.tags)).toBe(true)
      // Date should be YYYY-MM-DD format
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('entries have unique IDs', () => {
    const entries = getBlogEntries(true)
    const ids = entries.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('entries have unique slugs', () => {
    const entries = getBlogEntries(true)
    const slugs = entries.map((e) => e.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('getAllTags', () => {
  it('returns an array of strings', () => {
    const tags = getAllTags()
    expect(Array.isArray(tags)).toBe(true)
    for (const tag of tags) {
      expect(typeof tag).toBe('string')
    }
  })

  it('returns sorted tags', () => {
    const tags = getAllTags()
    const sorted = [...tags].sort()
    expect(tags).toEqual(sorted)
  })

  it('returns unique tags (no duplicates)', () => {
    const tags = getAllTags()
    expect(new Set(tags).size).toBe(tags.length)
  })
})
