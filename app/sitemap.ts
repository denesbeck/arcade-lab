import { MetadataRoute } from 'next'
import blogEntries from './blog/_config/data'
import { isPublished } from './blog/_utils/isPublished'

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'
  const baseUrl = `https://${domain}`

  // Only surface posts that are actually reachable (published, not hidden).
  const publishedPosts = blogEntries.filter(isPublished)

  // Most recent published post drives the blog index's lastModified.
  const latestPostDate = publishedPosts.reduce<string>(
    (latest, entry) => (entry.date > latest ? entry.date : latest),
    '1970-01-01'
  )

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(latestPostDate),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Dynamic blog posts
  const blogPosts: MetadataRoute.Sitemap = publishedPosts.map((entry) => ({
    url: `${baseUrl}/blog/${entry.id}`,
    lastModified: new Date(entry.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}
