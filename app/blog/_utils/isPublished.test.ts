import { afterEach, describe, expect, it, vi } from 'vitest'
import type { BlogEntry } from '../_interfaces/blog'
import { isPublished } from './isPublished'

// Only the fields isPublished uses — cast to satisfy the interface
function entry(
  overrides: Partial<Pick<BlogEntry, 'date' | 'hidden'>>
): BlogEntry {
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

describe('isPublished', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns false for hidden entries regardless of date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-12-31'))
    expect(isPublished(entry({ hidden: true, date: '2020-01-01' }))).toBe(false)
  })

  it('returns true for a past date that is not hidden', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15'))
    expect(isPublished(entry({ date: '2025-06-01', hidden: false }))).toBe(true)
  })

  it('returns true for today', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T12:00:00Z'))
    expect(isPublished(entry({ date: '2025-06-15', hidden: false }))).toBe(true)
  })

  it('returns false for a future date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15'))
    expect(isPublished(entry({ date: '2025-07-01', hidden: false }))).toBe(
      false
    )
  })

  it('handles date boundary correctly (yesterday vs today)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T00:00:00Z'))

    expect(isPublished(entry({ date: '2025-06-14', hidden: false }))).toBe(true)
    expect(isPublished(entry({ date: '2025-06-15', hidden: false }))).toBe(true)
    expect(isPublished(entry({ date: '2025-06-16', hidden: false }))).toBe(
      false
    )
  })
})
