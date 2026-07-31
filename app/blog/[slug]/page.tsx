import 'highlight.js/styles/nord.css'
import { permanentRedirect, redirect } from 'next/navigation'
import { Metadata } from 'next/types'
import { GoBack, ScrollToTop } from '@/_components'
import { RecommendedPosts, Share, Tag } from '../_components'
import blogEntries from '../_config/data'
import { BLOG_REDIRECTS } from '../_config/redirects'
import { getRecommendedPosts } from '../_utils/getRecommendedPosts'
import { isPublished } from '../_utils/isPublished'

interface IPost {
  params: Promise<{ slug: string }>
}

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

// Ids 1-32 predate the slug migration; their numeric URLs still redirect.
const LEGACY_MAX_ID = 32

export async function generateStaticParams() {
  const seen = new Set<string>()
  const params: { slug: string }[] = []
  const add = (slug: string) => {
    if (seen.has(slug)) return
    seen.add(slug)
    params.push({ slug })
  }

  for (const entry of blogEntries) {
    add(entry.slug)
    if (entry.id <= LEGACY_MAX_ID) add(entry.id.toString())
  }
  // Retired URLs (old slugs, numeric ids of removed posts) still resolve.
  for (const from of Object.keys(BLOG_REDIRECTS)) add(from)

  return params
}

// Only allow pre-generated slugs, legacy numeric ids, and retired urls
export const dynamicParams = false

// Enable static generation with revalidation every hour
export const revalidate = 3600

const findEntry = (slug: string) =>
  blogEntries.find((entry) => entry.slug === slug)

const findLegacyEntry = (slug: string) =>
  /^\d+$/.test(slug)
    ? blogEntries.find((entry) => entry.id.toString() === slug)
    : undefined

// Slug to redirect this param at, if any — an explicit retirement or a legacy
// numeric id that still maps to a live post. Resolves in a single hop.
const redirectTarget = (slug: string): string | undefined =>
  BLOG_REDIRECTS[slug] ?? findLegacyEntry(slug)?.slug

export async function generateMetadata({ params }: IPost): Promise<Metadata> {
  const { slug } = await params
  const post = findEntry(slug)

  if (!post) {
    const target = redirectTarget(slug)
    return target ? { alternates: { canonical: `/blog/${target}` } } : {}
  }

  const { title, description, cover, tags, date } = post

  return {
    metadataBase: new URL(`https://${domain}`),
    title: title,
    description: description,
    keywords: tags,
    authors: [{ name: 'Denes Beck' }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://${domain}/blog/${post.slug}`,
      images: cover?.ogImage ? [{ url: cover.ogImage }] : [],
      type: 'article',
      siteName: 'Arcade Lab',
      publishedTime: date,
    },
    twitter: {
      card: 'summary_large_image',
      site: 'Arcade Lab',
      description: description,
      title: title,
      creator: '@DenesBeck',
      images: cover?.ogImageX ? [{ url: cover.ogImageX }] : [],
    },
  }
}

const Post = async ({ params }: IPost) => {
  const { slug } = await params
  const post = findEntry(slug)

  if (!post) {
    const target = redirectTarget(slug)
    if (target) permanentRedirect(`/blog/${target}`)
    redirect('/blog')
  }

  if (!isPublished(post)) redirect('/blog')

  const { default: Post } = await import(`../_config/markdown/${post.file}.mdx`)

  // JSON-LD structured data for blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.cover?.ogImage ? `https://${domain}${post.cover.ogImage}` : '',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Denes Beck',
      url: `https://${domain}`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Denes Beck',
      logo: {
        '@type': 'ImageObject',
        url: `https://${domain}/logo/arcade_lab_logo.png`,
      },
    },
    keywords: post.tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${domain}/blog/${post.slug}`,
    },
  }

  return (
    <div className="flex flex-col items-center pb-4 w-dvw">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoBack fallbackUrl="/blog" />
      <ScrollToTop />
      {Post()}
      <div className="flex flex-wrap items-start px-6 mt-8 space-x-4 max-w-screen w-4xl">
        {post.tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <Share slug={post.slug} />
      <RecommendedPosts posts={getRecommendedPosts(post, blogEntries)} />
    </div>
  )
}

export default Post
