import type { Project } from '../types'

/**
 * Project data extracted from app/work/_config/data.ts.
 * Plain data without React/Next.js dependencies.
 */
const PROJECTS: Project[] = [
  {
    title: 'Dev Platform',
    subtitle: 'Self-Hosted Internal Developer Platform',
    highlights: [
      'Designing a portfolio-grade Internal Developer Platform on AWS with end-to-end IaC — from VPC to running apps in a single repository',
      'Running vanilla Kubernetes on Talos Linux with Cilium networking, spot instance self-healing, and GitOps via Argo CD',
    ],
    tech: ['AWS', 'Terraform', 'Kubernetes', 'Talos', 'Cilium', 'Helm'],
    url: 'https://github.com/denesbeck/dev-platform',
    status: 'active',
    relatedBlogPostIds: [26],
  },
  {
    title: 'Nexio',
    subtitle: 'Version Control System',
    highlights: [
      'Implemented a Git-inspired version control system written in Go, exploring core concepts such as commits, snapshots, and repository state management',
      'Designed CLI tooling and repository structure to manage file history and version tracking',
    ],
    tech: ['Go'],
    url: 'https://github.com/denesbeck/nexio',
    status: 'active',
    relatedBlogPostIds: [8, 9, 14, 17],
  },
  {
    title: 'Home Lab',
    subtitle: 'Infrastructure Automation',
    highlights: [
      'Automated provisioning of a single-node Ubuntu server with Ansible — Docker services behind NGINX reverse proxy with SSL, Tailscale VPN, and hardened SSH/firewall',
      'Managed AWS infrastructure with Terraform for encrypted S3 backups and a fully automated Vaultwarden DR failover using CloudWatch, Lambda, and EC2 spot instances',
      'Built a Prometheus, Grafana, and Loki monitoring stack with alerting to Discord for host metrics, container health, and power outage detection',
    ],
    tech: ['Ansible', 'Terraform', 'AWS', 'Prometheus', 'Grafana', 'Bash'],
    url: 'https://github.com/denesbeck/home-lab-infra',
    status: 'active',
    relatedBlogPostIds: [4, 5, 6, 7, 15, 16, 18, 22, 23, 24, 27],
  },
  {
    title: 'Tmux Worktree',
    subtitle: 'Tmux Plugin',
    highlights: [
      'Built a tmux plugin for managing git worktrees via an interactive floating popup with fzf-based branch selection',
      'Integrated an AI tool picker supporting Claude Code, Gemini CLI, Aider, Codex CLI, OpenCode, or a plain shell when opening a worktree',
    ],
    tech: ['Bash', 'Tmux'],
    url: 'https://github.com/denesbeck/tmux-worktree',
    status: 'active',
    relatedBlogPostIds: [21],
  },
  {
    title: 'Tmux Pane Controller',
    subtitle: 'CLI Tool & Tmux Plugin',
    highlights: [
      'Built a CLI tool that defines and loads tmux pane layouts from YAML config files with recursive split tree application',
      'Developed a companion tmux plugin that captures running pane layouts by reverse-engineering split geometry from pane rectangles',
    ],
    tech: ['Bash', 'Tmux'],
    url: 'https://github.com/denesbeck/tmux-pane-controller',
    status: 'active',
    relatedBlogPostIds: [25],
  },
  {
    title: 'Serverless Deploy',
    subtitle: 'Deployment Automation',
    highlights: [
      'Developed automation scripts and GitHub Actions workflows to deploy AWS Lambda functions',
      'Implemented CI/CD pipeline for serverless infrastructure using shell scripting and Infrastructure-as-Code practices',
    ],
    tech: ['GitHub Actions', 'Bash', 'Terraform', 'AWS'],
    url: 'https://github.com/denesbeck/lambda-functions',
    status: 'archived',
    relatedBlogPostIds: [3, 19],
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
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    url: 'https://github.com/denesbeck/arcade-lab',
    status: 'active',
    relatedBlogPostIds: [20, 28],
  },
  {
    title: 'Dotfiles',
    subtitle: 'Dev Environment Config',
    highlights: [
      'Configured and maintained NeoVim and Tmux dotfiles with a custom Lua-based NeoVim setup',
      'Automated environment provisioning with an Ansible playbook for reproducible development setups',
    ],
    tech: ['Lua', 'NeoVim', 'Tmux'],
    url: 'https://github.com/denesbeck/dotfiles',
    status: 'active',
    relatedBlogPostIds: [],
  },
  {
    title: 'Auth Service',
    subtitle: 'OAuth 2.1 Authorization Server',
    highlights: [
      'Built an OAuth 2.1 compliant authorization server for MCP servers with authorization code grant, PKCE, dynamic client registration, and refresh token rotation',
      'Implemented security hardening including bcrypt password hashing, rate limiting, account lockout, and JWT-based bearer token authentication',
    ],
    tech: ['TypeScript', 'PostgreSQL', 'Redis'],
    url: 'https://github.com/denesbeck/auth-service',
    status: 'archived',
    relatedBlogPostIds: [],
  },
  {
    title: 'Lost in Dusk',
    subtitle: 'Developer Portfolio',
    highlights: [
      'Built a previous portfolio application using React, Vite, and Tailwind CSS with a fully serverless AWS backend',
      'Provisioned cloud infrastructure with Terraform and automated deployments via GitHub Actions with CI quality gates',
    ],
    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'TypeScript',
      'AWS',
      'Terraform',
      'GitHub Actions',
      'Material UI',
    ],
    url: 'https://github.com/denesbeck/lost-in-dusk',
    status: 'archived',
    relatedBlogPostIds: [],
  },
]

/**
 * Get all projects, optionally filtered by status.
 */
export function getProjects(status?: 'active' | 'archived'): Project[] {
  if (status) return PROJECTS.filter((p) => p.status === status)
  return PROJECTS
}
