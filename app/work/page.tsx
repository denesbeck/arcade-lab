import { Metadata } from 'next'
import { PageHeader } from '@/_components'
import { ProjectCard } from './_components'
import PROJECTS from './_config/data'

export const dynamic = 'force-static'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'A showcase of my projects — from version control systems to home lab infrastructure.',
  openGraph: {
    title: 'Work - Denes Beck',
    description:
      'A showcase of my projects — from version control systems to home lab infrastructure.',
    url: `https://${domain}/work`,
    type: 'website',
    images: [
      {
        url: `/logo/arcade_lab_logo.png`,
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
      'A showcase of my projects — from version control systems to home lab infrastructure.',
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
        <div className="grid justify-center mr-6 w-full sm:gap-6 sm:px-10 sm:[grid-template-columns:repeat(auto-fit,minmax(415px,0))]">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
