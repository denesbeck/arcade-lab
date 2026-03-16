import { describe, expect, it } from 'vitest'
import { searchBlogPosts } from './search'
import type { BlogPostMeta } from './types'

const ENTRIES: BlogPostMeta[] = [
  {
    id: 1,
    title: 'Building my home server P1',
    description: 'Part 1: Starting and connecting to the server',
    date: '2025-10-03',
    hidden: false,
    tags: ['linux', 'ubuntu', 'ssh', 'home-server'],
    slug: 'building-my-home-server-p1',
  },
  {
    id: 2,
    title: 'Developing my own VCS',
    description: 'Learning Git the Hard Way',
    date: '2025-11-13',
    hidden: false,
    tags: ['git', 'golang', 'vcs', 'nexio'],
    slug: 'developing-my-own-vcs',
  },
  {
    id: 3,
    title: 'CloudGoat: Beanstalk Secrets',
    description: 'From low-privilege user to admin',
    date: '2026-01-11',
    hidden: false,
    tags: ['hacking', 'aws', 'beanstalk', 'iam', 'exploit'],
    slug: 'cloudgoat__beanstalk-secrets',
  },
  {
    id: 4,
    title: 'Lambda Deployments',
    description:
      'Automating AWS Lambda and Layer Deployments with GitHub Actions',
    date: '2025-10-19',
    hidden: false,
    tags: ['aws', 'lambda', 'cicd', 'github-actions', 'terraform'],
    slug: 'lambda-deployments',
  },
]

describe('searchBlogPosts', () => {
  it('returns empty array for empty query', () => {
    expect(searchBlogPosts(ENTRIES, '')).toEqual([])
  })

  it('returns empty array for whitespace-only query', () => {
    expect(searchBlogPosts(ENTRIES, '   ')).toEqual([])
  })

  it('returns empty array for single-char words (filtered by tokenizer)', () => {
    expect(searchBlogPosts(ENTRIES, 'a')).toEqual([])
  })

  it('matches by title', () => {
    const results = searchBlogPosts(ENTRIES, 'home server')
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(1)
  })

  it('matches by description', () => {
    const results = searchBlogPosts(ENTRIES, 'Git Hard Way')
    // Entry 2 matches "git" (tag), "hard" + "way" (description)
    // Entry 4 gets a partial tag match on "git" via "github-actions"
    expect(results[0].id).toBe(2)
    expect(results[0].score).toBeGreaterThan(1)
  })

  it('matches by tag (exact)', () => {
    const results = searchBlogPosts(ENTRIES, 'terraform')
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(4)
  })

  it('title matches score higher than description-only matches', () => {
    const results = searchBlogPosts(ENTRIES, 'lambda')
    // "Lambda Deployments" has "lambda" in both title and tag
    // Should be ranked first
    expect(results[0].id).toBe(4)
  })

  it('combines scores from multiple query tokens', () => {
    const results = searchBlogPosts(ENTRIES, 'aws lambda')
    // Entry 4 matches "aws" (tag) + "lambda" (title + tag)
    // Entry 3 matches "aws" (tag)
    expect(results[0].id).toBe(4)
    expect(results[0].score).toBeGreaterThan(results[1].score)
  })

  it('is case insensitive', () => {
    const results = searchBlogPosts(ENTRIES, 'LINUX')
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(1)
  })

  it('strips punctuation from query', () => {
    const results = searchBlogPosts(ENTRIES, 'linux!')
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(1)
  })

  it('filters by tag option', () => {
    const results = searchBlogPosts(ENTRIES, 'aws', { tag: 'hacking' })
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(3)
  })

  it('tag filter is case insensitive', () => {
    const results = searchBlogPosts(ENTRIES, 'aws', { tag: 'HACKING' })
    expect(results.length).toBe(1)
    expect(results[0].id).toBe(3)
  })

  it('returns empty when tag filter matches no entries', () => {
    const results = searchBlogPosts(ENTRIES, 'aws', {
      tag: 'nonexistent-tag',
    })
    expect(results.length).toBe(0)
  })

  it('respects limit option', () => {
    const results = searchBlogPosts(ENTRIES, 'aws', { limit: 1 })
    expect(results.length).toBe(1)
  })

  it('defaults to limit of 5', () => {
    // All 4 entries would match something broad
    const manyEntries: BlogPostMeta[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      title: `Post about linux ${i}`,
      description: 'A linux post',
      date: '2025-01-01',
      hidden: false,
      tags: ['linux'],
      slug: `post-${i}`,
    }))
    const results = searchBlogPosts(manyEntries, 'linux')
    expect(results.length).toBe(5)
  })

  it('returns results sorted by score descending', () => {
    const results = searchBlogPosts(ENTRIES, 'aws')
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score)
    }
  })

  it('includes score property in results', () => {
    const results = searchBlogPosts(ENTRIES, 'linux')
    expect(results[0]).toHaveProperty('score')
    expect(results[0].score).toBeGreaterThan(0)
  })

  it('does not mutate original entries', () => {
    const original = JSON.parse(JSON.stringify(ENTRIES))
    searchBlogPosts(ENTRIES, 'linux')
    expect(ENTRIES).toEqual(original)
  })

  it('handles partial tag matches', () => {
    // "home-server" tag should partially match "server"
    const results = searchBlogPosts(ENTRIES, 'server')
    expect(results.some((r) => r.id === 1)).toBe(true)
  })

  it('returns empty for query with no matches', () => {
    const results = searchBlogPosts(ENTRIES, 'python django')
    expect(results.length).toBe(0)
  })
})
