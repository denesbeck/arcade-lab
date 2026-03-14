import type { Project } from '../types'

/**
 * Project data extracted from app/work/_config/data.ts.
 * Plain data without React/Next.js dependencies.
 */
const PROJECTS: Project[] = [
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
      'Built Ansible playbooks to automate provisioning and configuration of a personal homelab environment',
      'Automated infrastructure setup and service deployment using Infrastructure-as-Code principles',
    ],
    tech: ['Ansible', 'Bash'],
    url: 'https://github.com/denesbeck/home-lab-ansible',
    status: 'active',
    relatedBlogPostIds: [4, 5, 6, 7, 15, 16, 18],
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
    status: 'active',
    relatedBlogPostIds: [3],
  },
  {
    title: 'Arcade Lab',
    subtitle: 'Developer Portfolio',
    highlights: [
      'Built a personal developer portfolio using Next.js and TypeScript',
      'Designed responsive UI and project showcase pages',
      'Deployed and hosted the application on Vercel, leveraging automated builds and continuous deployment',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    url: 'https://github.com/denesbeck/arcade-lab',
    status: 'active',
    relatedBlogPostIds: [],
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
