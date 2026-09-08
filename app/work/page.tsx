import { Metadata } from 'next'
import { PageHeader } from '@/_components'
import { ProjectCard } from './_components'
import PROJECTS from './_config/data'

export const dynamic = 'force-static'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Platform engineering and developer tooling projects — a self-hosted internal developer platform, a bare-metal homelab, CI/CD automation, and a version control system written in Go.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work - Denes Beck',
    description:
      'Platform engineering and developer tooling projects — a self-hosted internal developer platform, a bare-metal homelab, CI/CD automation, and a version control system written in Go.',
    url: `https://${domain}/work`,
    type: 'website',
    images: [
      {
        url: `/logo/arcade_lab_og.png`,
        width: 1200,
        height: 630,
        alt: 'Denes Beck - Work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work - Denes Beck',
    description:
      'Platform engineering and developer tooling projects — a self-hosted internal developer platform, a bare-metal homelab, CI/CD automation, and a version control system written in Go.',
    creator: '@DenesBeck',
  },
}

const Work = () => {
  return (
    <div className="flex overflow-auto flex-col w-full">
      <PageHeader
        title="Work"
        description="A collection of tools and services I&apos;ve built and maintain."
      />
      <div className="flex justify-center py-4">
        <div className="grid justify-center w-full sm:gap-6 sm:px-10 sm:grid-cols-[repeat(auto-fit,minmax(415px,0))]">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
