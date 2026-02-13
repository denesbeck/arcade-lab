import { Metadata } from 'next'
import { Suspense } from 'react'
import { Certificates, Info, Skills } from './_components'
import Bio from './_components/Bio/Bio'
import { Avatar } from './_components/Info'
import { INFO } from './_config/data'

export const dynamic = 'force-static'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${INFO.Name}, a self-taught full-stack ${INFO.Role} with ${new Date().getFullYear() - 2019} years of experience. Specializing in Next.js, React, TypeScript, AWS, Kubernetes, and DevOps. Based in ${INFO.Location}, working at ${INFO.Company}.`,
  keywords: [
    'Denes Beck',
    'Software Engineer',
    'Full Stack Developer',
    'Self-taught Developer',
    'AWS Certified',
    'Terraform Certified',
    'Next.js Developer',
    'React Developer',
    'TypeScript',
    'Golang',
    'DevOps Engineer',
    'Budapest',
    'SEON',
  ],
  openGraph: {
    title: `About ${INFO.Name} - ${INFO.Role}`,
    description: `Self-taught full-stack ${INFO.Role} with ${new Date().getFullYear() - 2019} years of experience. AWS & Terraform certified. Specializing in scalable applications and infrastructure automation.`,
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
    description: `Self-taught full-stack ${INFO.Role} with ${new Date().getFullYear() - 2019} years of experience. AWS & Terraform certified.`,
    creator: '@DenesBeck',
  },
}

const About = () => {
  return (
    <div className="flex flex-col items-center pb-8 min-h-[calc(100dvh-100px)] w-dvw lg:pb-[100px]">
      {/* wrapper for adding animate-slide-in-from-bottom */}
      <div className="flex flex-col py-4 px-2 my-auto transition-all duration-200 ease-in-out sm:w-max sm:ring-2 lg:py-8 lg:px-8 ring-secondary animate-slide-in-from-bottom backdrop-blur-md sm:max-w-[90dvw] sm:hover:shadow-[10px_10px_#46ecd5,20px_20px_black]">
        {/* main container */}
        <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex justify-center items-center w-full sm:hidden">
              <Avatar autoHide={false} />
            </div>
            <Info />
            <div className="block my-2 border-b-2 border-secondary" />
            <Skills />
            <div className="block my-2 border-b-2 border-secondary" />
            <Certificates />
          </div>
          <Suspense>
            <div className="block my-2 border-b-2 lg:hidden border-secondary" />
            <Bio />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default About
