import { Metadata } from 'next'
import { PageHeader } from '@/_components'
import { BlogCard, FilterTags, NoRecords } from './_components'
import blogEntries from './_config/data'
import { isPublished } from './_utils/isPublished'
import { getReadTime } from './_utils/readTime'

export const revalidate = 3600 // Revalidate every 1h

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'In-depth technical articles about platform engineering, Kubernetes and cloud infrastructure, CI/CD and GitOps, AWS security and ethical hacking, and homelab system administration.',
  keywords: [
    'Platform Engineering Blog',
    'Developer Experience',
    'DevOps Blog',
    'AWS Tutorials',
    'Kubernetes Guide',
    'GitOps',
    'CI/CD',
    'GitHub Actions',
    'Terraform',
    'Ansible',
    'Docker',
    'Cloud Security',
    'Home Lab',
    'Linux',
    'Technical Writing',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Technical Blog - Arcade Lab',
    description:
      'In-depth technical articles about platform engineering, Kubernetes and cloud infrastructure, CI/CD and GitOps, AWS security and ethical hacking, and homelab system administration.',
    url: `https://${domain}/blog`,
    type: 'website',
    images: [
      {
        url: `/logo/arcade_lab_og.png`,
        width: 1200,
        height: 630,
        alt: 'Arcade Lab Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog - Arcade Lab',
    description:
      'In-depth technical articles about platform engineering, Kubernetes and cloud infrastructure, CI/CD and GitOps, AWS security and ethical hacking, and homelab system administration.',
    creator: '@DenesBeck',
  },
}

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string[] }>
}) => {
  const tags = [(await searchParams).tag || []].flat()

  // Pre-sort once to avoid sorting on every render
  const sortedEntries = [...blogEntries].sort((a, b) =>
    b.date.localeCompare(a.date)
  )

  // Short-circuit filtering when no tags are selected
  const entries =
    tags.length === 0
      ? sortedEntries
      : sortedEntries.filter((entry) =>
          tags.every((tag) => entry.tags.includes(tag))
        )

  return (
    <div className="flex overflow-auto flex-col w-full">
      <FilterTags />
      <PageHeader
        title={metadata.title as string}
        description={metadata.description as string}
      />
      <div className="flex justify-center py-4">
        {entries.length === 0 ? (
          <NoRecords message="No results based on your tag selection." />
        ) : (
          <div className="grid justify-center w-full sm:gap-6 sm:px-10 sm:grid-cols-[repeat(auto-fit,minmax(33rem,0))]">
            {entries.filter(isPublished).map((entry) => (
              <BlogCard
                key={entry.id}
                slug={entry.slug}
                title={entry.title}
                description={entry.description}
                date={entry.date}
                readTime={getReadTime(entry.file)}
                cover={entry.cover}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
