import { Metadata } from 'next'
import { Heading1, Info, PageHeader } from '@/_components'
import { ProjectCard } from './_components'
import PROJECTS from './_config/data'

export const dynamic = 'force-static'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Works',
  description:
    'A showcase of my projects — from version control systems to home lab infrastructure.',
  openGraph: {
    title: 'Works - Denes Beck',
    description:
      'A showcase of my projects — from version control systems to home lab infrastructure.',
    url: `https://${domain}/works`,
    type: 'website',
    images: [
      {
        url: `/logo/arcade_lab_logo.png`,
        width: 1200,
        height: 630,
        alt: 'Denes Beck - Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Works - Denes Beck',
    description:
      'A showcase of my projects — from version control systems to home lab infrastructure.',
    creator: '@DenesBeck',
  },
}

const Works = () => {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Works"
        description="A collection of tools and services I&apos;ve built and maintain."
      />
      <div className="flex flex-col items-center pb-8 min-h-[calc(100dvh-100px)] w-dvw lg:pb-[100px]">
        <div className="flex flex-col gap-8 py-8 px-4 my-auto w-full max-w-4xl animate-slide-in-from-bottom">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Works
