import { describe, expect, it } from 'vitest'
import previousInternalPath from './previousInternalPath'

const ORIGIN = 'https://arcade-lab.io'

// Only the three members the util reads.
function navigation(
  canGoBack: boolean,
  entries: (string | null)[],
  index = entries.length - 1
): Navigation {
  return {
    canGoBack,
    currentEntry: { index },
    entries: () => entries.map((url) => ({ url })),
  } as unknown as Navigation
}

function context(
  overrides: Partial<Parameters<typeof previousInternalPath>[0]>
) {
  return {
    referrer: '',
    origin: ORIGIN,
    current: '/blog/some-post',
    ...overrides,
  }
}

describe('previousInternalPath', () => {
  it('is null when the entry behind us is not ours', () => {
    const nav = navigation(false, [`${ORIGIN}/blog/some-post`])
    expect(previousInternalPath(context({ nav }))).toBeNull()
  })

  it('returns the path of the previous entry', () => {
    const nav = navigation(true, [`${ORIGIN}/blog`, `${ORIGIN}/blog/some-post`])
    expect(previousInternalPath(context({ nav }))).toBe('/blog')
  })

  it('drops the query string', () => {
    const nav = navigation(true, [
      `${ORIGIN}/blog?tag=kubernetes`,
      `${ORIGIN}/blog/some-post`,
    ])
    expect(previousInternalPath(context({ nav }))).toBe('/blog')
  })

  it('ignores an entry on the page we are already on', () => {
    const nav = navigation(true, [
      `${ORIGIN}/blog/some-post`,
      `${ORIGIN}/blog/some-post#setup`,
    ])
    expect(previousInternalPath(context({ nav }))).toBeNull()
  })

  it('ignores an entry whose url the browser withholds', () => {
    const nav = navigation(true, [null, `${ORIGIN}/blog/some-post`])
    expect(previousInternalPath(context({ nav }))).toBeNull()
  })

  it('falls back to a same-origin referrer without the Navigation API', () => {
    const referrer = `${ORIGIN}/work`
    expect(previousInternalPath(context({ referrer }))).toBe('/work')
  })

  it('is null for a referrer from another site', () => {
    const referrer = 'https://news.ycombinator.com/item?id=1'
    expect(previousInternalPath(context({ referrer }))).toBeNull()
  })

  it('is null for a direct landing with no referrer', () => {
    expect(previousInternalPath(context({}))).toBeNull()
  })
})
