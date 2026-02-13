import createMDX from '@next/mdx'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://images.credly.com/**')],
    minimumCacheTTL: 5184000, // 60d
    formats: ['image/avif', 'image/webp'], // Use efficient image formats
    qualities: [75, 100],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
    rehypePlugins: ['rehype-highlight'],
  },
})

export default withMDX(nextConfig)
