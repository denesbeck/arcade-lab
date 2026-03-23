import { IconType } from 'react-icons'
import { FaAws, FaGolang, FaReact } from 'react-icons/fa6'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiAnsible,
  SiGithubactions,
  SiGnubash,
  SiLua,
  SiMui,
  SiNeovim,
  SiPostgresql,
  SiRedis,
  SiTerraform,
  SiTmux,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import BLOG_ENTRIES from '@/blog/_config/data'

export type BlogPostReference = (typeof BLOG_ENTRIES)[number]['id']

export type Project = {
  title: string
  subtitle: string
  highlights: string[]
  tech: { name: string; icon: IconType }[]
  url: string
  status: 'active' | 'archived'
  blogPosts: BlogPostReference[]
}

const PROJECTS: Project[] = [
  {
    title: 'Nexio',
    subtitle: 'Version Control System',
    highlights: [
      'Implemented a Git-inspired version control system written in Go, exploring core concepts such as commits, snapshots, and repository state management',
      'Designed CLI tooling and repository structure to manage file history and version tracking',
    ],
    tech: [{ name: 'Go', icon: FaGolang }],
    url: 'https://github.com/denesbeck/nexio',
    status: 'active',
    blogPosts: [8, 9, 14, 17],
  },
  {
    title: 'Home Lab',
    subtitle: 'Infrastructure Automation',
    highlights: [
      'Built Ansible playbooks to automate provisioning and configuration of a personal homelab environment',
      'Automated infrastructure setup and service deployment using Infrastructure-as-Code principles',
    ],
    tech: [
      { name: 'Ansible', icon: SiAnsible },
      { name: 'Bash', icon: SiGnubash },
    ],
    url: 'https://github.com/denesbeck/home-lab-ansible',
    status: 'active',
    blogPosts: [4, 5, 6, 7, 15, 16, 18, 22, 23, 24],
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
    blogPosts: [21],
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
    status: 'active',
    blogPosts: [3, 19],
  },
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
    blogPosts: [20],
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
    blogPosts: [],
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
    status: 'active',
    blogPosts: [],
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
    blogPosts: [],
  },
]

export default PROJECTS
