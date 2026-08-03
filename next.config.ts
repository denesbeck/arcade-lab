import path from 'node:path'
import createMDX from '@next/mdx'
import { NextConfig } from 'next'

// Absolute path (a serializable string) to our rehype-highlight wrapper that
// registers the HCL/Terraform grammar. Passed as a string because Turbopack
// serializes MDX loader options and cannot carry a plugin/grammar function.
const rehypeHighlightHcl = path.join(
  process.cwd(),
  'app/blog/_config/rehype-highlight-hcl.mjs'
)

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  images: {
    remotePatterns: [new URL('https://images.credly.com/**')],
    minimumCacheTTL: 5184000, // 60d
    formats: ['image/avif', 'image/webp'], // Use efficient image formats
    qualities: [75, 100],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Read time is estimated from the MDX sources on disk, which the blog routes
  // still need when they revalidate on the server.
  outputFileTracingIncludes: {
    '/blog': ['./app/blog/_config/markdown/**/*.mdx'],
    '/blog/[slug]': ['./app/blog/_config/markdown/**/*.mdx'],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
    rehypePlugins: [rehypeHighlightHcl],
  },
})

export default withMDX(nextConfig)
