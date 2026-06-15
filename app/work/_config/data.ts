import { IconType } from 'react-icons'
import { FaAws, FaGolang, FaLinux, FaReact } from 'react-icons/fa6'
import { LuLogs } from 'react-icons/lu'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiAnsible,
  SiArgo,
  SiCilium,
  SiDocker,
  SiGithubactions,
  SiGnubash,
  SiGrafana,
  SiHelm,
  SiKubernetes,
  SiLua,
  SiMui,
  SiNeovim,
  SiPostgresql,
  SiPrometheus,
  SiRedis,
  SiTalos,
  SiTerraform,
  SiTmux,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import BLOG_ENTRIES from '@/blog/_config/data'

export type BlogPostReference = (typeof BLOG_ENTRIES)[number]['id']

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type Project = {
  title: string
  subtitle: string
  highlights: string[]
  tech: { name: string; icon: IconType }[]
  url: string
  status: 'active' | 'archived'
  priority: Priority
  blogPosts: BlogPostReference[]
}

const PROJECTS: Project[] = [
  {
    title: 'Arcade Lab',
    subtitle: 'Developer Portfolio',
    highlights: [
      'Built a personal developer portfolio using Next.js and TypeScript',
      'Designed responsive UI and project showcase pages',
      'Deployed and hosted the application on Vercel, leveraging automated builds and continuous deployment',
      'Built an MCP server exposing blog posts, projects, and personal info as tools for Claude Code',
      'Integrated an AI-powered chat widget with streaming responses, backed by Claude API and server-side tool execution',
    ],
    tech: [
      { name: 'Next.js', icon: RiNextjsFill },
      {
        name: 'React',
        icon: FaReact,
      },
      {
        name: 'Tailwind CSS',
        icon: RiTailwindCssFill,
      },
      { name: 'TypeScript', icon: SiTypescript },
    ],
    url: 'https://github.com/denesbeck/arcade-lab',
    status: 'active',
    priority: 'critical',
    blogPosts: [20, 28],
  },
  {
    title: 'Auth Service',
    subtitle: 'OAuth 2.1 Authorization Server',
    highlights: [
      'Built an OAuth 2.1 compliant authorization server for MCP servers with authorization code grant, PKCE, dynamic client registration, and refresh token rotation',
      'Implemented security hardening including bcrypt password hashing, rate limiting, account lockout, and JWT-based bearer token authentication',
    ],
    tech: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Redis', icon: SiRedis },
    ],
    url: 'https://github.com/denesbeck/auth-service',
    status: 'archived',
    priority: 'low',
    blogPosts: [],
  },
  {
    title: 'Dev Platform',
    subtitle: 'Self-Hosted Internal Developer Platform',
    highlights: [
      'Designing a portfolio-grade Internal Developer Platform on AWS with end-to-end IaC — from VPC to running apps in a single repository',
      'Running vanilla Kubernetes on Talos Linux with Cilium networking, spot instance self-healing, and GitOps via Argo CD',
    ],
    tech: [
      { name: 'AWS', icon: FaAws },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Talos', icon: SiTalos },
      { name: 'Cilium', icon: SiCilium },
      { name: 'Helm', icon: SiHelm },
      { name: 'Argo CD', icon: SiArgo },
      { name: 'Docker', icon: SiDocker },
      { name: 'Loki', icon: LuLogs },
    ],
    url: 'https://github.com/denesbeck/dev-platform',
    status: 'active',
    priority: 'critical',
    blogPosts: [26, 29],
  },
  {
    title: 'Dotfiles',
    subtitle: 'Dev Environment Config',
    highlights: [
      'Configured and maintained NeoVim and Tmux dotfiles with a custom Lua-based NeoVim setup',
      'Automated environment provisioning with an Ansible playbook for reproducible development setups',
    ],
    tech: [
      { name: 'Lua', icon: SiLua },
      { name: 'NeoVim', icon: SiNeovim },
      { name: 'Tmux', icon: SiTmux },
    ],
    url: 'https://github.com/denesbeck/dotfiles',
    status: 'active',
    priority: 'medium',
    blogPosts: [],
  },
  {
    title: 'Home Lab',
    subtitle: 'Infrastructure Automation',
    highlights: [
      'Automated provisioning of a single-node Ubuntu server with Ansible — Docker services behind NGINX reverse proxy with SSL, Tailscale VPN, and hardened SSH/firewall',
      'Managed AWS infrastructure with Terraform for encrypted S3 backups and a fully automated Vaultwarden DR failover using CloudWatch, Lambda, and EC2 spot instances',
      'Built a Prometheus, Grafana, and Loki monitoring stack with alerting to Discord for host metrics, container health, and power outage detection',
    ],
    tech: [
      { name: 'Ansible', icon: SiAnsible },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'AWS', icon: FaAws },
      { name: 'Docker', icon: SiDocker },
      { name: 'Linux', icon: FaLinux },
      { name: 'Prometheus', icon: SiPrometheus },
      { name: 'Grafana', icon: SiGrafana },
      { name: 'Loki', icon: LuLogs },
      { name: 'Bash', icon: SiGnubash },
    ],
    url: 'https://github.com/denesbeck/home-lab-infra',
    status: 'active',
    priority: 'critical',
    blogPosts: [4, 5, 6, 7, 15, 16, 18, 22, 23, 24, 27, 30],
  },
  {
    title: 'Lost in Dusk',
    subtitle: 'Developer Portfolio',
    highlights: [
      'Built a previous portfolio application using React, Vite, and Tailwind CSS with a fully serverless AWS backend',
      'Provisioned cloud infrastructure with Terraform and automated deployments via GitHub Actions with CI quality gates',
    ],
    tech: [
      { name: 'React', icon: FaReact },
      { name: 'Vite', icon: SiVite },
      { name: 'Tailwind CSS', icon: RiTailwindCssFill },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'AWS', icon: FaAws },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Material UI', icon: SiMui },
    ],
    url: 'https://github.com/denesbeck/lost-in-dusk',
    status: 'archived',
    priority: 'low',
    blogPosts: [],
  },
  {
    title: 'Nexio',
    subtitle: 'Version Control System',
    highlights: [
      'Implemented a Git-inspired version control system written in Go, exploring core concepts such as commits, snapshots, and repository state management',
      'Designed CLI tooling and repository structure to manage file history and version tracking',
    ],
    tech: [{ name: 'Golang', icon: FaGolang }],
    url: 'https://github.com/denesbeck/nexio',
    status: 'active',
    priority: 'high',
    blogPosts: [8, 9, 14, 17],
  },
  {
    title: 'Serverless Deploy',
    subtitle: 'Deployment Automation',
    highlights: [
      'Developed automation scripts and GitHub Actions workflows to deploy AWS Lambda functions',
      'Implemented CI/CD pipeline for serverless infrastructure using shell scripting and Infrastructure-as-Code practices',
    ],
    tech: [
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Bash', icon: SiGnubash },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'AWS', icon: FaAws },
    ],
    url: 'https://github.com/denesbeck/lambda-functions',
    status: 'archived',
    priority: 'low',
    blogPosts: [3, 19],
  },
  {
    title: 'Tmux Pane Controller',
    subtitle: 'CLI Tool & Tmux Plugin',
    highlights: [
      'Built a CLI tool that defines and loads tmux pane layouts from YAML config files with recursive split tree application',
      'Developed a companion tmux plugin that captures running pane layouts by reverse-engineering split geometry from pane rectangles',
    ],
    tech: [
      { name: 'Bash', icon: SiGnubash },
      { name: 'Tmux', icon: SiTmux },
    ],
    url: 'https://github.com/denesbeck/tmux-pane-controller',
    status: 'active',
    priority: 'medium',
    blogPosts: [25],
  },
  {
    title: 'Tmux Worktree',
    subtitle: 'Tmux Plugin',
    highlights: [
      'Built a tmux plugin for managing git worktrees via an interactive floating popup with fzf-based branch selection',
      'Integrated an AI tool picker supporting Claude Code, Gemini CLI, Aider, Codex CLI, OpenCode, or a plain shell when opening a worktree',
    ],
    tech: [
      { name: 'Bash', icon: SiGnubash },
      { name: 'Tmux', icon: SiTmux },
    ],
    url: 'https://github.com/denesbeck/tmux-worktree',
    status: 'active',
    priority: 'medium',
    blogPosts: [21],
  },
]

// Ordering: active before archived, then by priority (critical → low),
// then alphabetically by title. Keeps the work page sorted automatically
// regardless of the order entries are declared above.
const STATUS_ORDER: Record<Project['status'], number> = {
  active: 0,
  archived: 1,
}

const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

const sortProjects = (projects: Project[]): Project[] =>
  [...projects]
    .sort(
      (a, b) =>
        STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
        PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] ||
        a.title.localeCompare(b.title)
    )
    .map((project) => ({
      ...project,
      tech: [...project.tech].sort((a, b) => a.name.localeCompare(b.name)),
    }))

export default sortProjects(PROJECTS)
