import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa6'

interface IShare {
  id: string
}

const domain = process.env.NEXT_PUBLIC_DOMAIN

const SHARE_OPTIONS = [
  {
    getId: (id: string) => `${id}_linkedin`,
    getHref: (id: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://${domain}/blog/${id}`)}`,
    icon: FaLinkedin,
  },
  {
    getId: (id: string) => `${id}_facebook`,
    getHref: (id: string) =>
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(`https://${domain}/blog/${id}`)}`,
    icon: FaFacebook,
  },
  {
    getId: (id: string) => `${id}_twitter`,
    getHref: (id: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://${domain}/blog/${id}`)}`,
    icon: FaTwitter,
  },
]

const Share = ({ id }: IShare) => {
  const shareLinks = SHARE_OPTIONS.map((option) => ({
    id: option.getId(id),
    href: option.getHref(id),
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
