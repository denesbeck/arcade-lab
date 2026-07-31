import { describe, expect, it } from 'vitest'
import BLOG_METADATA from './metadata'
import { BLOG_REDIRECTS } from './redirects'

describe('blog redirects', () => {
  const liveSlugs = new Set(BLOG_METADATA.map((e) => e.slug))
  const liveIds = new Set(BLOG_METADATA.map((e) => String(e.id)))

  it('points every redirect at a live post slug', () => {
    const dangling = Object.entries(BLOG_REDIRECTS).filter(
      ([, to]) => !liveSlugs.has(to)
    )
    expect(dangling).toEqual([])
  })

  it('never shadows a slug that is still a live post', () => {
    const shadowed = Object.keys(BLOG_REDIRECTS).filter((from) =>
      liveSlugs.has(from)
    )
    expect(shadowed).toEqual([])
  })

  it('never redirects a numeric id that still belongs to a live post', () => {
    const clashing = Object.keys(BLOG_REDIRECTS).filter((from) =>
      liveIds.has(from)
    )
    expect(clashing).toEqual([])
  })

  it('has no redirect target that is itself a redirect key (single hop)', () => {
    const chained = Object.entries(BLOG_REDIRECTS).filter(
      ([, to]) => to in BLOG_REDIRECTS
    )
    expect(chained).toEqual([])
  })
})
