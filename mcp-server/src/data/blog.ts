import * as fs from 'node:fs'
import * as path from 'node:path'
import type { BlogPost, BlogPostMeta } from '../types'

/**
 * Blog metadata extracted from app/blog/_config/data.tsx.
 * Plain data representation without React/Next.js dependencies.
 */
const BLOG_ENTRIES: BlogPostMeta[] = [
  {
    id: 21,
    title: 'Building my home server P9',
    description: 'UPS failover with automated shutdown',
    date: '2026-04-04',
    hidden: true,
    tags: [
      'linux',
      'home-server',
      'ups',
      'bash',
      'prometheus',
      'grafana',
      'monitoring',
      'ansible',
      'cron',
    ],
    slug: 'building-my-home-server-p9',
  },
  {
    id: 20,
    title: 'Building my home server P8',
    description: 'Remote access with Tailscale',
    date: '2026-03-28',
    hidden: true,
    tags: [
      'linux',
      'home-server',
      'tailscale',
      'wireguard',
      'vpn',
      'pi-hole',
      'dns',
      'samba',
      'ufw',
      'ansible',
    ],
    slug: 'building-my-home-server-p8',
  },
  {
    id: 19,
    title: 'Building an AI Chat Widget with MCP',
    description: 'Adding an AI-powered assistant to my portfolio',
    date: '2026-03-18',
    hidden: false,
    tags: [
      'mcp',
      'ai',
      'claude',
      'typescript',
      'nextjs',
      'react',
      'streaming',
      'chat',
      'sse',
    ],
    slug: 'mcp-server-and-chat-widget',
  },
  {
    id: 18,
    title: 'Building my home server P7',
    description: 'Streaming movies with Jellyfin',
    date: '2026-03-13',
    hidden: false,
    tags: [
      'linux',
      'docker',
      'containers',
      'home-server',
      'jellyfin',
      'media-server',
      'nginx',
      'ansible',
    ],
    slug: 'building-my-home-server-p7',
  },
  {
    id: 17,
    title: 'Remote State Management with S3',
    description: 'Taking Nexio from Local-Only to Collaborative',
    date: '2026-03-09',
    hidden: false,
    tags: ['golang', 'vcs', 'nexio', 'aws', 's3', 'sqlite', 'remote', 'sync'],
    slug: 'remote-state-management',
  },
  {
    id: 16,
    title: 'Building my home server P6',
    description: 'Centralized logging with Loki',
    date: '2026-03-07',
    hidden: false,
    tags: [
      'linux',
      'docker',
      'containers',
      'home-server',
      'grafana',
      'loki',
      'promtail',
      'logging',
      'monitoring',
      'nginx',
    ],
    slug: 'building-my-home-server-p6',
  },
  {
    id: 15,
    title: 'Building my home server P5',
    description: 'Network-wide ad blocking with Pi-hole',
    date: '2026-03-02',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'docker',
      'ufw',
      'nginx',
      'containers',
      'home-server',
      'pi-hole',
      'dns',
      'ad-blocking',
      'ansible',
    ],
    slug: 'building-my-home-server-p5',
  },
  {
    id: 14,
    title: 'From JSON Files to SQLite',
    description:
      "How a Simple Benchmark Convinced Me to Rewrite Nexio's Storage Layer",
    date: '2026-02-28',
    hidden: false,
    tags: ['sqlite', 'golang', 'vcs', 'nexio', 'performance', 'optimization'],
    slug: 'from-json-to-sqlite',
  },
  {
    id: 13,
    title: 'CloudGoat: Data Secrets',
    description:
      'Write-up: Exploiting EC2 User Data and IMDS to escalate privileges',
    date: '2026-02-19',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'pacu',
      'ec2',
      'lambda',
      'secrets_manager',
      'iam',
      'exploit',
      'vulnerability',
    ],
    slug: 'cloudgoat__data-secrets',
  },
  {
    id: 12,
    title: 'CloudGoat: SNS Secrets',
    description: 'Write-up: Exploiting SNS subscriptions to leak API keys',
    date: '2026-01-17',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'pacu',
      'awscli',
      'sns',
      'api-gw',
      'iam',
      'exploit',
      'vulnerability',
    ],
    slug: 'cloudgoat__sns-secrets',
  },
  {
    id: 11,
    title: 'CloudGoat: Beanstalk Secrets (Pacu)',
    description: 'Write-up: From low-privilege user to admin (Pacu approach)',
    date: '2026-01-11',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'pacu',
      'beanstalk',
      'iam',
      'privesc',
      'exploit',
      'vulnerability',
    ],
    slug: 'cloudgoat__beanstalk-secrets-pacu',
  },
  {
    id: 10,
    title: 'CloudGoat: Beanstalk Secrets (AWS CLI)',
    description:
      'Write-up: From low-privilege user to admin (AWS CLI approach)',
    date: '2026-01-11',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'awscli',
      'beanstalk',
      'iam',
      'privesc',
      'exploit',
      'vulnerability',
    ],
    slug: 'cloudgoat__beanstalk-secrets-awscli',
  },
  {
    id: 9,
    title: 'Storage optimization',
    description: 'Transforming Nexio with Content-Addressable Storage',
    date: '2025-12-21',
    hidden: false,
    tags: [
      'blake3',
      'zlib',
      'sharding',
      'git',
      'golang',
      'vcs',
      'nexio',
      'performance',
      'blob',
      'optimization',
    ],
    slug: 'blob-storage-optimization',
  },
  {
    id: 8,
    title: 'Developing my own VCS',
    description: 'Learning Git the Hard Way',
    date: '2025-11-13',
    hidden: false,
    tags: ['git', 'golang', 'vcs', 'nexio'],
    slug: 'developing-my-own-vcs',
  },
  {
    id: 7,
    title: 'Building my home server P4',
    description: 'Part 4: Docker, UFW and Nginx',
    date: '2025-10-26',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'docker',
      'ufw',
      'nginx',
      'containers',
      'home-server',
    ],
    slug: 'building-my-home-server-p4',
  },
  {
    id: 6,
    title: 'Building my home server P3',
    description: 'Part 3: Volumes and backup',
    date: '2025-10-11',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'fsck',
      'fstab',
      'fdisk',
      'mkfs',
      'crontab',
      'home-server',
      'volumes',
      'rsync',
    ],
    slug: 'building-my-home-server-p3',
  },
  {
    id: 5,
    title: 'Building my home server P2',
    description: 'Part 2: SMB with Samba',
    date: '2025-10-03',
    hidden: false,
    tags: ['linux', 'ubuntu', 'smb', 'samba', 'home-server'],
    slug: 'building-my-home-server-p2',
  },
  {
    id: 4,
    title: 'Building my home server P1',
    description: 'Part 1: Starting and connecting to the server',
    date: '2025-10-03',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'ssh',
      'wifi',
      'netplan',
      'home-server',
      'security',
      'ufw',
    ],
    slug: 'building-my-home-server-p1',
  },
  {
    id: 3,
    title: 'Lambda Deployments',
    description:
      'Automating AWS Lambda and Layer Deployments with GitHub Actions',
    date: '2025-10-19',
    hidden: false,
    tags: ['aws', 'lambda', 'cicd', 'github-actions', 'terraform', 'oidc'],
    slug: 'lambda-deployments',
  },
  {
    id: 2,
    title: 'IBM Tech 2024 Conference',
    description: 'Insights and takeaways from the IBM Tech 2024 conference.',
    date: '2024-03-22',
    hidden: false,
    tags: ['ibm', 'red-hat', 'openshift', 'ansible', 'security', 'watsonx'],
    slug: 'ibm-tech-2024-conference',
  },
  {
    id: 1,
    title: 'Migrating to Tekton',
    description:
      'This blog post is about my experience migrating from Travis CI to Tekton.',
    date: '2023-12-13',
    hidden: false,
    tags: [
      'cicd',
      'tekton',
      'ruby-on-rails',
      'travis-ci',
      'kubernetes',
      'docker',
    ],
    slug: 'migrating-to-tekton',
  },
]

/**
 * Strip MDX/JSX syntax from content to produce plain readable text.
 */
function stripMdx(content: string): string {
  return (
    content
      // Remove JSX tags like <div className="..."> and </div>
      .replace(/<[^>]+>/g, '')
      // Remove image syntax ![alt](/path)
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      // Convert markdown links [text](url) to just text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove code block markers ```lang
      .replace(/```[\w-]*/g, '')
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')
      // Remove heading markers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic markers
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}$/gm, '')
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}

/**
 * Resolve the path to the markdown directory.
 * Works from both the project root and the mcp-server subdirectory.
 */
function resolveMarkdownDir(): string {
  // Try relative to project root first
  const fromRoot = path.join(
    process.cwd(),
    'app',
    'blog',
    '_config',
    'markdown'
  )
  if (fs.existsSync(fromRoot)) return fromRoot

  // Try from mcp-server subdirectory
  const fromMcpServer = path.join(
    process.cwd(),
    '..',
    'app',
    'blog',
    '_config',
    'markdown'
  )
  if (fs.existsSync(fromMcpServer)) return fromMcpServer

  throw new Error(
    `Could not find markdown directory. Tried:\n  ${fromRoot}\n  ${fromMcpServer}`
  )
}

/**
 * A post is published if it is not explicitly hidden
 * and its date is today or in the past (YYYY-MM-DD comparison).
 */
export function isPublished(entry: BlogPostMeta): boolean {
  if (entry.hidden) return false
  const today = new Date().toISOString().split('T')[0]
  return entry.date <= today
}

/**
 * Get all published blog post metadata.
 * A post is published when not hidden and its date is today or in the past.
 */
export function getBlogEntries(includeAll = false): BlogPostMeta[] {
  if (includeAll) return BLOG_ENTRIES
  return BLOG_ENTRIES.filter(isPublished)
}

/**
 * Get a blog post by ID, including its full MDX content (stripped to plain text).
 */
export function getBlogPost(id: number): BlogPost | null {
  const entry = BLOG_ENTRIES.find((e) => e.id === id)
  if (!entry) return null

  const markdownDir = resolveMarkdownDir()
  const filePath = path.join(markdownDir, `${entry.slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const content = stripMdx(rawContent)

  return { ...entry, content }
}

/**
 * Get a blog post by slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const entry = BLOG_ENTRIES.find((e) => e.slug === slug)
  if (!entry) return null
  return getBlogPost(entry.id)
}

/**
 * Get all unique tags across all published blog posts.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const entry of getBlogEntries()) {
    for (const tag of entry.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}
