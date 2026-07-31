import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

interface IShare {
  slug: string
}

const domain = process.env.NEXT_PUBLIC_DOMAIN

const SHARE_OPTIONS = [
  {
    getId: (slug: string) => `${slug}_linkedin`,
    getHref: (slug: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://${domain}/blog/${slug}`)}`,
    icon: FaLinkedin,
  },
  {
    getId: (slug: string) => `${slug}_facebook`,
    getHref: (slug: string) =>
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(`https://${domain}/blog/${slug}`)}`,
    icon: FaFacebook,
  },
  {
    getId: (slug: string) => `${slug}_twitter`,
    getHref: (slug: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://${domain}/blog/${slug}`)}`,
    icon: FaXTwitter,
  },
]

const Share = ({ slug }: IShare) => {
  const shareLinks = SHARE_OPTIONS.map((option) => ({
    id: option.getId(slug),
    href: option.getHref(slug),
    icon: option.icon,
  }))

  return (
    <div className="flex flex-col items-start px-6 mt-8 max-w-screen w-4xl">
      <div className="font-bold">Share this post on:</div>
      <div className="flex py-4 space-x-4">
        {shareLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="w-7 h-7 transition-all duration-200 ease-in-out hover:scale-110 text-slate-200 hover:text-primary" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Share
