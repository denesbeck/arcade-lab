import { Metadata } from 'next'
import { INFO } from '@/about/_config/data'
import { Console } from './_components'

// The ls/stats output counts published posts, which changes without a deploy.
export const revalidate = 3600

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Terminal',
  description: `Browse ${INFO.Name}'s site from a shell. Run whoami, ls, cd and friends to move around, or read the bio, toolkit and certifications without leaving the prompt.`,
  keywords: [
    'Denes Beck',
    'Terminal',
    'Interactive Portfolio',
    'Platform Engineer',
    'Developer Experience',
  ],
  alternates: {
    canonical: '/terminal',
  },
  openGraph: {
    title: `Terminal | ${INFO.Name}`,
    description: `Browse ${INFO.Name}'s site from a shell — whoami, ls, cd, and the rest.`,
    url: `https://${domain}/terminal`,
    type: 'website',
    images: [
      {
        url: '/logo/arcade_lab_logo.png',
        width: 1200,
        height: 630,
        alt: `${INFO.Name} - Terminal`,
      },
    ],
  },
}

const TerminalPage = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-6 overflow-x-clip px-4 pt-6 pb-24 sm:px-6">
      <div className="animate-text-focus flex flex-col gap-2">
        <h1 className="text-dark-50 text-2xl font-semibold">Terminal</h1>
        <p className="text-dark-400 text-sm">
          The whole site, from a prompt. Type a command and hit enter, or click
          one below — <span className="text-primary">ls</span> and{' '}
          <span className="text-primary">cd</span> get you around.
        </p>
      </div>
      <Console />
    </div>
  )
}

export default TerminalPage
