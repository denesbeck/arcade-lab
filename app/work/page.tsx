import { Metadata } from 'next'
import { LuChevronRight } from 'react-icons/lu'
import { PageHeader } from '@/_components'
import { ProjectCard } from './_components'
import PROJECTS from './_config/data'

export const dynamic = 'force-static'

const GRID =
  'grid justify-center w-full sm:gap-6 sm:px-10 sm:grid-cols-[repeat(auto-fill,minmax(415px,0))]'

const active = PROJECTS.filter(({ status }) => status === 'active')
const archived = PROJECTS.filter(({ status }) => status === 'archived')

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
        <div className={GRID}>
          {active.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={100 + index * 100}
            />
          ))}
        </div>
      </div>
      {archived.length > 0 && (
        <details className="group/archived py-4">
          <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
            {/* same grid as the cards so the label lines up with the first column */}
            <span className={GRID}>
              <span className="flex col-span-full gap-2 items-center px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 sm:px-0 text-dark-300 hover:text-primary">
                <LuChevronRight className="w-4 h-4 transition-transform duration-200 group-open/archived:rotate-90" />
                Archived ({archived.length})
              </span>
            </span>
          </summary>
          <div className="flex justify-center pt-4">
            <div className={GRID}>
              {archived.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </details>
      )}
    </div>
  )
}

export default Work
