import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import AlertBox from './_components/AlertBox'
import ChatWidget from './_components/ChatWidget'
import Navbar from './_components/Navbar'
import { INFO } from './about/_config/data'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

// The site title and blurb appear in three metadata blocks; deriving them from
// INFO keeps the role string in exactly one place.
const SITE_TITLE = `Arcade Lab | ${INFO.Name} - ${INFO.FullRole}`
const SITE_DESCRIPTION = `Personal portfolio and technical blog of ${INFO.Name}, a ${INFO.FullRole} building internal platforms, cloud infrastructure, and developer tooling.`

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    default: SITE_TITLE,
    template: '%s | Arcade Lab',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Denes Beck',
    'Platform Engineer',
    'Developer Experience',
    'Internal Developer Platform',
    'Developer Tooling',
    'DevOps',
    'AWS',
    'Kubernetes',
    'Terraform',
    'GitOps',
    'CI/CD',
    'Golang',
    'TypeScript',
    'Portfolio',
    'Technical Blog',
  ],
  authors: [{ name: 'Denes Beck', url: `https://${domain}` }],
  creator: 'Denes Beck',
  publisher: 'Denes Beck',
  icons: {
    icon: '/logo/arcade_lab_logo_64.png',
    apple: '/logo/arcade_lab_logo_120.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${domain}`,
    siteName: 'Arcade Lab',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `/logo/arcade_lab_og.png`,
        width: 1200,
        height: 630,
        alt: 'Arcade Lab Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@DenesBeck',
    images: [`/logo/arcade_lab_og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Denes Beck',
    url: `https://${domain}`,
    image: `https://${domain}/logo/arcade_lab_logo.png`,
    jobTitle: INFO.FullRole,
    worksFor: {
      '@type': 'Organization',
      name: 'SEON',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Budapest',
      addressCountry: 'HU',
    },
    sameAs: [
      'https://github.com/denesbeck',
      'https://www.linkedin.com/in/denesbeck',
      'https://x.com/DenesBeck',
    ],
    knowsAbout: [
      'Platform Engineering',
      'Developer Experience',
      'Internal Developer Platforms',
      'Cloud Computing',
      'AWS',
      'Kubernetes',
      'Terraform',
      'GitOps',
      'CI/CD',
      'Observability',
      'Docker',
      'Golang',
      'TypeScript',
      'Full Stack Development',
    ],
  }

  return (
    <html lang="en">
      <head>
        {/* Not via metadata.alternates.types — pages that set their own
            canonical replace the whole alternates object and drop it. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Arcade Lab"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="text-text-dark font-[DepartureMono]">
        <SpeedInsights />
        <Analytics />
        <div className="flex flex-col">
          <div className="fixed top-0 w-dvw h-dvh from-dark-1400 to-dark-1400 via-dark-900 bg-linear-to-r" />
          <div
            style={{
              position: 'fixed',
              top: 0,
              zIndex: 10,
              width: '100dvw',
              height: '100dvh',
              backgroundSize: '2rem 2rem',
              backgroundImage:
                'linear-gradient(to right, rgb(26, 26, 36, 0.2) 2px, transparent 2px),linear-gradient(to bottom, rgb(26, 26, 36, 0.2) 2px, transparent 2px)',
            }}
          />
          <div className="flex z-10 flex-col min-h-dvh">
            <Navbar />
            <AlertBox context="global" />
            <div className="flex justify-center w-full">
              <div className="flex flex-1 max-w-[1400px] mt-[100px]">
                {children}
              </div>
            </div>
          </div>
          <ChatWidget />
        </div>
      </body>
    </html>
  )
}
