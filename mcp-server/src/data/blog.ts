import * as fs from 'node:fs'
import * as path from 'node:path'
import type { BlogPost, BlogPostMeta } from '../types'

/**
 * Blog metadata extracted from app/blog/_config/data.tsx.
 * Plain data representation without React/Next.js dependencies.
 */
const BLOG_ENTRIES: BlogPostMeta[] = [
  {
    id: 30,
    title: 'Home Lab: An AI Agent That Triages My Alerts',
    description:
      'Letting Claude investigate firing alerts and post the root-cause hypothesis to Discord',
    date: '2026-06-14',
    hidden: false,
    tags: [
      'home-lab',
      'self-hosted',
      'ai',
      'claude',
      'mcp',
      'observability',
      'prometheus',
      'loki',
      'alertmanager',
      'grafana',
      'docker',
      'fastapi',
      'python',
      'sre',
      'devops',
    ],
    slug: 'building-my-home-server-p12',
  },
  {
    id: 29,
    title: 'Dev Platform: Guardrails, then Trading Flannel for eBPF',
    description:
      'Milestones 0 and 1: SOPS-encrypted secrets, CI gates, and swapping the CNI for Cilium on Talos',
    date: '2026-05-31',
    hidden: false,
    tags: [
      'dev-platform',
      'kubernetes',
      'cilium',
      'ebpf',
      'talos',
      'sops',
      'age',
      'github-actions',
      'kubeconform',
      'kyverno',
      'helm',
      'terraform',
      'gitops',
      'devops',
      'self-hosted',
    ],
    slug: 'self-hosted-developer-platform-on-k8s-p2',
  },
  {
    id: 28,
    title: 'Consolidating Lambda Infrastructure',
    description:
      'Bringing the contact Lambda, layers, and Terraform into one repo with end-to-end OIDC',
    date: '2026-05-28',
    hidden: false,
    tags: [
      'aws',
      'terraform',
      'hcp-terraform',
      'lambda',
      'iam',
      'oidc',
      'cloudflare',
      'vercel',
      'ses',
      'ssm',
      's3',
      'github-actions',
      'next.js',
      'devops',
    ],
    slug: 'consolidating-lambda-infrastructure',
  },
  {
    id: 27,
    title: 'Home Lab: Vaultwarden & Disaster Recovery',
    description:
      'Self-hosting a password manager with automated backups to AWS',
    date: '2026-05-25',
    hidden: false,
    tags: [
      'linux',
      'home-lab',
      'self-hosted',
      'vaultwarden',
      'docker',
      'ansible',
      'aws',
      'terraform',
      'cloudwatch',
      'lambda',
      'ec2',
      's3',
      'tailscale',
      'disaster-recovery',
      'nginx',
    ],
    slug: 'building-my-home-server-p11',
  },
  {
    id: 26,
    title: 'Dev Platform: Bootstrapping Talos on AWS',
    description:
      'Provisioning Kubernetes on Talos Linux with Terraform and EC2',
    date: '2026-05-22',
    hidden: false,
    tags: [
      'dev-platform',
      'talos',
      'kubernetes',
      'aws',
      'terraform',
      'ec2',
      'networking',
      'grpc',
      'devops',
      'debugging',
      'self-hosted',
    ],
    slug: 'self-hosted-developer-platform-on-k8s-p1',
  },
  {
    id: 25,
    title: 'tmux-pane-controller',
    description: 'Declarative pane layouts for tmux',
    date: '2026-04-24',
    hidden: false,
    tags: ['tmux', 'bash', 'cli', 'yaml', 'productivity', 'tpm'],
    slug: 'tmux-pane-controller',
  },
  {
    id: 24,
    title: 'Home Lab: Network Scanning with NetAlertX',
    description:
      'Detecting devices and monitoring ARP traffic on the local network',
    date: '2026-04-17',
    hidden: false,
    tags: [
      'linux',
      'home-lab',
      'self-hosted',
      'netalertx',
      'docker',
      'networking',
      'arp',
      'nginx',
      'ansible',
    ],
    slug: 'building-my-home-server-p10',
  },
  {
    id: 23,
    title: 'Home Lab: UPS Monitoring & Failover',
    description: 'Automated shutdown on power loss with Prometheus alerting',
    date: '2026-04-10',
    hidden: false,
    tags: [
      'linux',
      'home-lab',
      'self-hosted',
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
    id: 22,
    title: 'Home Lab: Remote Access with Tailscale',
    description:
      'Secure WireGuard-based VPN with Pi-hole DNS and Samba over the mesh',
    date: '2026-04-03',
    hidden: false,
    tags: [
      'linux',
      'home-lab',
      'self-hosted',
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
    id: 21,
    title: 'tmux-worktree',
    description: 'A tmux plugin for managing git worktrees in the age of AI',
    date: '2026-03-27',
    hidden: false,
    tags: [
      'tmux',
      'git',
      'worktrees',
      'neovim',
      'bash',
      'cli',
      'ai',
      'productivity',
      'fzf',
    ],
    slug: 'tmux-worktree',
  },
  {
    id: 20,
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
    id: 19,
    title: 'Lambda Deployments v2',
    description:
      'Taking the Lambda deployment pipeline from MVP to production-ready',
    date: '2026-03-16',
    hidden: false,
    tags: [
      'aws',
      'lambda',
      'cicd',
      'github-actions',
      'testing',
      'vitest',
      'pytest',
      'shellcheck',
    ],
    slug: 'lambda-deployments-v2',
  },
  {
    id: 18,
    title: 'Home Lab: Media Streaming with Jellyfin',
    description: 'Self-hosted media server with Docker and Nginx reverse proxy',
    date: '2026-03-13',
    hidden: false,
    tags: [
      'linux',
      'docker',
      'containers',
      'home-lab',
      'self-hosted',
      'jellyfin',
      'media-server',
      'nginx',
      'ansible',
    ],
    slug: 'building-my-home-server-p7',
  },
  {
    id: 17,
    title: 'Nexio: Remote State Management with S3',
    description: 'Taking Nexio from Local-Only to Collaborative',
    date: '2026-03-09',
    hidden: false,
    tags: ['golang', 'vcs', 'nexio', 'aws', 's3', 'sqlite', 'remote', 'sync'],
    slug: 'remote-state-management',
  },
  {
    id: 16,
    title: 'Home Lab: Centralized Logging with Loki',
    description:
      'Aggregating container and system logs with Promtail and Grafana',
    date: '2026-03-07',
    hidden: false,
    tags: [
      'linux',
      'docker',
      'containers',
      'home-lab',
      'self-hosted',
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
    title: 'Home Lab: Ad Blocking with Pi-hole',
    description:
      'Network-wide DNS filtering with Docker and custom firewall rules',
    date: '2026-03-02',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'docker',
      'ufw',
      'nginx',
      'containers',
      'home-lab',
      'self-hosted',
      'pi-hole',
      'dns',
      'ad-blocking',
      'ansible',
    ],
    slug: 'building-my-home-server-p5',
  },
  {
    id: 14,
    title: 'Nexio: From JSON Files to SQLite',
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
    title: 'Nexio: Storage Optimization',
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
    title: 'Nexio: Developing My Own VCS',
    description: 'Learning Git the Hard Way',
    date: '2025-11-13',
    hidden: false,
    tags: ['git', 'golang', 'vcs', 'nexio'],
    slug: 'developing-my-own-vcs',
  },
  {
    id: 7,
    title: 'Home Lab: Docker, UFW & Nginx',
    description: 'Containerized services with firewall rules and reverse proxy',
    date: '2025-10-26',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'docker',
      'ufw',
      'nginx',
      'containers',
      'home-lab',
      'self-hosted',
    ],
    slug: 'building-my-home-server-p4',
  },
  {
    id: 6,
    title: 'Home Lab: Volumes & Backups',
    description: 'Disk partitioning, mounting, and automated rsync backups',
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
      'home-lab',
      'self-hosted',
      'volumes',
      'rsync',
    ],
    slug: 'building-my-home-server-p3',
  },
  {
    id: 5,
    title: 'Home Lab: File Sharing with Samba',
    description: 'Setting up SMB shares for local network access',
    date: '2025-10-03',
    hidden: false,
    tags: ['linux', 'ubuntu', 'smb', 'samba', 'home-lab', 'self-hosted'],
    slug: 'building-my-home-server-p2',
  },
  {
    id: 4,
    title: 'Home Lab: Initial Setup & SSH',
    description:
      'Ubuntu install, networking with Netplan, and hardened SSH access',
    date: '2025-10-03',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'ssh',
      'wifi',
      'netplan',
      'home-lab',
      'self-hosted',
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
