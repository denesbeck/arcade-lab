import { afterEach, describe, expect, it, vi } from 'vitest'
import type { BlogEntry } from '../_interfaces/blog'
import { getRecommendedPosts } from './getRecommendedPosts'

function entry(overrides: Partial<BlogEntry>): BlogEntry {
  return {
    id: 1,
    title: 'Test',
    description: 'Test',
    date: '2025-06-15',
    hidden: false,
    content: '',
    tags: [],
    cover: {} as BlogEntry['cover'],
    ...overrides,
  } as BlogEntry
}

describe('getRecommendedPosts', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('excludes the current post', () => {
    const current = entry({ id: 1 })
    const result = getRecommendedPosts(current, [current, entry({ id: 2 })])
    expect(result.map((p) => p.id)).toEqual([2])
  })

  it('ranks posts with more shared tags higher', () => {
    const current = entry({ id: 1, tags: ['aws', 'k8s', 'terraform'] })
    const all = [
      current,
      entry({ id: 2, tags: ['aws'] }),
      entry({ id: 3, tags: ['aws', 'k8s'] }),
      entry({ id: 4, tags: ['unrelated'] }),
    ]
    expect(getRecommendedPosts(current, all).map((p) => p.id)).toEqual([
      3, 2, 4,
    ])
  })

  it('breaks ties by most recent date', () => {
    const current = entry({ id: 1, tags: ['aws'] })
    const all = [
      current,
      entry({ id: 2, tags: ['aws'], date: '2025-01-01' }),
      entry({ id: 3, tags: ['aws'], date: '2025-12-01' }),
    ]
    expect(getRecommendedPosts(current, all).map((p) => p.id)).toEqual([3, 2])
  })

  it('respects the limit', () => {
    const current = entry({ id: 1 })
    const all = [current, entry({ id: 2 }), entry({ id: 3 }), entry({ id: 4 })]
    expect(getRecommendedPosts(current, all, 2)).toHaveLength(2)
  })

  it('never recommends hidden or unpublished posts', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15'))
    const current = entry({ id: 1 })
    const all = [
      current,
      entry({ id: 2, hidden: true }),
      entry({ id: 3, date: '2099-01-01' }),
      entry({ id: 4, date: '2025-01-01' }),
    ]
    expect(getRecommendedPosts(current, all).map((p) => p.id)).toEqual([4])
  })
})
