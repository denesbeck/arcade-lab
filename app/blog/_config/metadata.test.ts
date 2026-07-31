import * as fs from 'node:fs'
import * as path from 'node:path'
import { describe, expect, it } from 'vitest'
import BLOG_METADATA from './metadata'

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const TAG_RE = /^[a-z0-9]+([-.][a-z0-9]+)*$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
// Google truncates meta descriptions around here.
const MAX_DESCRIPTION = 160

const markdownDir = path.join(__dirname, 'markdown')

describe('blog metadata', () => {
  it('has unique ids', () => {
    const ids = BLOG_METADATA.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique slugs', () => {
    const slugs = BLOG_METADATA.map((e) => e.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has well-formed slugs', () => {
    const bad = BLOG_METADATA.filter((e) => !SLUG_RE.test(e.slug))
    expect(bad.map((e) => e.slug)).toEqual([])
  })

  it('never reuses a slug as another post id', () => {
    const ids = new Set(BLOG_METADATA.map((e) => String(e.id)))
    const clashing = BLOG_METADATA.filter((e) => ids.has(e.slug))
    expect(clashing.map((e) => e.slug)).toEqual([])
  })

  it('has well-formed dates', () => {
    const bad = BLOG_METADATA.filter((e) => !DATE_RE.test(e.date))
    expect(bad.map((e) => `${e.slug}: ${e.date}`)).toEqual([])
  })

  it('points every entry at an existing mdx file', () => {
    const missing = BLOG_METADATA.filter(
      (e) => !fs.existsSync(path.join(markdownDir, `${e.file}.mdx`))
    )
    expect(missing.map((e) => `${e.slug} -> ${e.file}.mdx`)).toEqual([])
  })

  it('leaves no orphaned mdx files', () => {
    const referenced = new Set(BLOG_METADATA.map((e) => `${e.file}.mdx`))
    const orphans = fs
      .readdirSync(markdownDir)
      .filter((f) => f.endsWith('.mdx') && !referenced.has(f))
    expect(orphans).toEqual([])
  })

  it('has lowercase kebab-case tags', () => {
    const bad = [...new Set(BLOG_METADATA.flatMap((e) => e.tags))].filter(
      (t) => !TAG_RE.test(t)
    )
    expect(bad).toEqual([])
  })

  it('has no tag that differs from another only by separator or case', () => {
    const seen = new Map<string, string>()
    const collisions: string[] = []
    for (const tag of new Set(BLOG_METADATA.flatMap((e) => e.tags))) {
      const key = tag.toLowerCase().replace(/[._-]/g, '')
      const prev = seen.get(key)
      if (prev && prev !== tag) collisions.push(`${prev} / ${tag}`)
      else seen.set(key, tag)
    }
    expect(collisions).toEqual([])
  })

  it('gives every post a title, description and at least one tag', () => {
    const bad = BLOG_METADATA.filter(
      (e) => !e.title.trim() || !e.description.trim() || e.tags.length === 0
    )
    expect(bad.map((e) => e.slug)).toEqual([])
  })

  it('keeps descriptions short enough not to be truncated in search results', () => {
    const tooLong = BLOG_METADATA.filter(
      (e) => e.description.length > MAX_DESCRIPTION
    )
    expect(
      tooLong.map((e) => `${e.slug}: ${e.description.length} chars`)
    ).toEqual([])
  })

  it('has no duplicate tags within a post', () => {
    const bad = BLOG_METADATA.filter(
      (e) => new Set(e.tags).size !== e.tags.length
    )
    expect(bad.map((e) => e.slug)).toEqual([])
  })
})
