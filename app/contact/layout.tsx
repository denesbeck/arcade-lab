import { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'arcade-lab.vercel.app'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Denes Beck — for collaboration, freelance work, or a conversation about software engineering, DevOps, and cloud infrastructure.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact - Denes Beck',
    description:
      'Get in touch with Denes Beck — for collaboration, freelance work, or a conversation about software engineering, DevOps, and cloud infrastructure.',
    url: `https://${domain}/contact`,
    type: 'website',
    images: [
      {
        url: `/logo/arcade_lab_logo.png`,
        width: 1200,
        height: 630,
        alt: 'Denes Beck - Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Denes Beck',
    description:
      'Get in touch with Denes Beck — for collaboration, freelance work, or a conversation about software engineering, DevOps, and cloud infrastructure.',
    creator: '@DenesBeck',
  },
}

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
