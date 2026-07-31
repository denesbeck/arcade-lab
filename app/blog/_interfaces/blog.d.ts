import { StaticImageData } from 'next/image'
import type { BlogMeta } from '../_config/metadata'

export interface BlogCover {
  image: StaticImageData
  original: StaticImageData
  xImage: StaticImageData
  alt: string
  ogImage: string // absolute path for OG meta tags (e.g., "/blog/covers/image.png")
  ogImageX: string // absolute path for Twitter/X meta tags
}

export interface BlogEntry extends BlogMeta {
  cover: BlogCover
}
