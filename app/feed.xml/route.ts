import BLOG_METADATA from '../blog/_config/metadata'
import { isPublished } from '../blog/_utils/isPublished'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'
const baseUrl = `https://${domain}`

const TITLE = 'Arcade Lab'
const DESCRIPTION =
  'Technical writing on software engineering, DevOps, cloud infrastructure and home lab automation by Denes Beck.'

export const revalidate = 3600

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// RSS 2.0 requires RFC 822 dates; entry dates are plain YYYY-MM-DD.
const rfc822 = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString()

export async function GET() {
  const posts = BLOG_METADATA.filter(isPublished).sort((a, b) =>
    b.date.localeCompare(a.date)
  )

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`
      const categories = post.tags
        .map((tag) => `      <category>${escape(tag)}</category>`)
        .join('\n')

      return [
        '    <item>',
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <description>${escape(post.description)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(TITLE)}</title>
    <link>${baseUrl}</link>
    <description>${escape(DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
