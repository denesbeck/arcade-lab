import type { PersonalInfo } from '../types'

/**
 * Personal information extracted from app/about/_config/data.tsx.
 * Plain data without React/Next.js dependencies.
 */
export function getPersonalInfo(): PersonalInfo {
  return {
    name: 'Denes Beck',
    location: 'Budapest, Hungary',
    company: 'SEON',
    role: 'Senior Software Engineer',
    bio: `Senior Software Engineer with ${new Date().getFullYear() - 2019} years of experience building full-stack applications and developer tooling, with a strong interest in DevOps and automation that I sharpen through hands-on personal projects.

    My flagship project is Nexio (https://github.com/denesbeck/nexio), a Git-inspired version control system in Go. Alongside it I run my Home Lab (https://github.com/denesbeck/home-lab-infra) — a bare-metal setup managed with Ansible and Terraform.

    More recently I started Dev Platform (https://github.com/denesbeck/dev-platform), a self-hosted Internal Developer Platform where I'm going deeper on Kubernetes, IaC, GitOps, and observability.

    Outside of work, I'm a long-time Neovim and Tmux user who maintains a personal development environment (https://github.com/denesbeck/dotfiles) and builds tools (https://github.com/denesbeck/tmux-worktree) to improve my daily workflow.`,
    skills: [
      'TypeScript',
      'Node.js',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Golang',
      'Bash',
      'Lua',
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'GitHub Actions',
      'Argo CD',
      'Linux',
      'Prometheus',
      'Grafana',
      'Loki',
    ],
    certificates: [
      {
        name: 'AWS Certified Developer - Associate',
        url: 'https://www.credly.com/badges/b4bf4117-6a90-49eb-baee-e382447b72c2/public_url',
      },
      {
        name: 'AWS Certified CloudOps Engineer - Associate',
        url: 'https://www.credly.com/badges/955a71c6-a223-4c7b-9b27-cc95268465ce/public_url',
      },
      {
        name: 'HashiCorp Certified: Terraform Associate',
        url: 'https://www.credly.com/badges/91d294a8-8f7d-4f5a-80c1-071fa0bf2be6/public_url',
      },
    ],
    connections: [
      { platform: 'GitHub', url: 'https://github.com/denesbeck' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/denesbeck' },
    ],
  }
}
