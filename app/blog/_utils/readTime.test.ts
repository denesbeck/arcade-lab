import { describe, expect, it } from 'vitest'
import BLOG_METADATA from '../_config/metadata'
import { estimateReadTime, getReadTime } from './readTime'

const words = (count: number) => 'word '.repeat(count)

describe('estimateReadTime', () => {
  it('counts words at 200 per minute', () => {
    expect(estimateReadTime(words(600))).toBe(3)
  })

  it('rounds to the nearest minute', () => {
    expect(estimateReadTime(words(390))).toBe(2)
    expect(estimateReadTime(words(410))).toBe(2)
  })

  it('never drops below a minute', () => {
    expect(estimateReadTime('')).toBe(1)
    expect(estimateReadTime('A two-line note.')).toBe(1)
  })

  it('ignores markup a reader never reads', () => {
    const markup = [
      '# A heading',
      '',
      '<div className="wrapper">',
      '',
      '![1200_630](/blog/images/diagram.png)',
      '',
      '- **bold** bullet with `inline code`',
      '',
      '> quoted line',
      '',
      '| column | column |',
      '| --- | --- |',
      '',
      '---',
      '',
      words(400),
    ].join('\n')

    const plain = [
      'A heading',
      'bold bullet with inline code',
      'quoted line',
      'column column',
      words(400),
    ].join(' ')

    expect(estimateReadTime(markup)).toBe(estimateReadTime(plain))
  })

  it('counts a link by its label, not its url', () => {
    const link =
      '[the Terraform docs](https://developer.hashicorp.com/terraform)'
    expect(estimateReadTime(`${words(400)} ${link}`)).toBe(
      estimateReadTime(`${words(400)} the Terraform docs`)
    )
  })

  it('counts code inside fences but not the fence markers', () => {
    const fenced = ['```bash', words(200), '```'].join('\n')
    expect(estimateReadTime(fenced)).toBe(estimateReadTime(words(200)))
  })
})

describe('getReadTime', () => {
  it('estimates a plausible read time for every post', () => {
    const bad = BLOG_METADATA.map((entry) => ({
      slug: entry.slug,
      minutes: getReadTime(entry.file),
    })).filter(({ minutes }) => minutes === null || minutes < 1 || minutes > 60)

    expect(bad).toEqual([])
  })

  it('returns null instead of throwing when the mdx file is missing', () => {
    expect(getReadTime('no-such-post')).toBeNull()
  })
})
