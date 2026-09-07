import { Metadata } from 'next'
import { Biography, CharacterCard, Inventory, Trophies } from './_components'
import { INFO } from './_config/data'

export const dynamic = 'force-static'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${INFO.Name}, a ${INFO.FullRole} with ${new Date().getFullYear() - 2019}+ years of experience building internal platforms, cloud infrastructure, CI/CD pipelines, and developer tooling. Working with AWS, Kubernetes, Terraform, GitOps, Go, and TypeScript. Based in ${INFO.Location}, working at ${INFO.Company}.`,
  keywords: [
    'Denes Beck',
    'Platform Engineer',
    'Developer Experience',
    'DevEx Engineer',
    'Internal Developer Platform',
    'Developer Tooling',
    'AWS Certified',
    'Terraform Certified',
    'Kubernetes',
    'Terraform',
    'GitOps',
    'CI/CD',
    'Golang',
    'TypeScript',
    'Home Lab',
    'Budapest',
    'SEON',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About ${INFO.Name} - ${INFO.FullRole}`,
    description: `${INFO.FullRole} with ${new Date().getFullYear() - 2019}+ years of experience building internal platforms, cloud infrastructure, and CI/CD pipelines that let engineering teams ship reliably at scale. AWS & Terraform certified.`,
    url: `https://${domain}/about`,
    type: 'profile',
    images: [
      {
        url: `/logo/arcade_lab_logo.png`,
        width: 1200,
        height: 630,
        alt: `${INFO.Name} - About`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${INFO.Name}`,
    description: `${INFO.FullRole} with ${new Date().getFullYear() - 2019}+ years of experience building internal platforms, cloud infrastructure, and developer tooling. AWS & Terraform certified.`,
    creator: '@DenesBeck',
  },
}

const About = () => {
  return (
    <div className="w-full min-w-0 overflow-x-clip px-4 pt-6 pb-24 sm:px-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[23rem_1fr] lg:gap-14">
        <CharacterCard />
        <div className="flex min-w-0 flex-col gap-14">
          <Biography />
          <Inventory />
          <Trophies />
        </div>
      </div>
    </div>
  )
}

export default About
