import { Metadata } from 'next'
import { INFO } from '@/about/_config/data'
import { FeaturedWork, Hero, LatestPosts, StackMarquee } from './_components'

// Matches /blog: the latest-writing section has to pick up posts whose
// publish date passes after the last build.
export const revalidate = 3600 // Revalidate every 1h

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Home',
  description: `Hi, I'm ${INFO.Name}. I'm a ${INFO.FullRole} at ${INFO.Company} based in ${INFO.Location}, building internal platforms, cloud infrastructure, and the developer tooling engineering teams ship on.`,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${INFO.Name} - ${INFO.FullRole}`,
    description: `${INFO.FullRole} at ${INFO.Company} building internal platforms, CI/CD pipelines, and developer tooling, with hands-on AWS, Kubernetes, and homelab projects on the side.`,
    url: `https://${domain}`,
    type: 'profile',
    images: [
      {
        url: `/logo/arcade_lab_og.png`,
        width: 1200,
        height: 630,
        alt: `${INFO.Name} - Arcade Lab`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${INFO.Name} - ${INFO.FullRole}`,
    description: `${INFO.FullRole} at ${INFO.Company} building internal platforms, CI/CD pipelines, and developer tooling, with hands-on AWS, Kubernetes, and homelab projects on the side.`,
    creator: '@DenesBeck',
  },
}

const Home = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-20 overflow-x-clip px-4 pt-6 pb-24 sm:px-6 lg:gap-28 lg:pt-12">
      <Hero />
      <StackMarquee />
      <FeaturedWork />
      <LatestPosts />
    </div>
  )
}

export default Home
