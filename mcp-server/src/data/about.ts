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
    bio: `Senior Software Engineer with ${new Date().getFullYear() - 2019}+ years of experience building full-stack applications, cloud-native systems, and developer platforms. My work spans modern web development, distributed systems, infrastructure automation, and operational tooling, allowing me to contribute across both application and platform layers.

    Professionally, I've delivered full-stack products, owned production services, and built CI/CD and deployment workflows used by engineering teams at scale. I enjoy creating systems that improve developer experience, reduce operational friction, and make software easier to ship and operate.

    Outside of work, I explore platform engineering through hands-on projects. I'm building Dev Platform (https://github.com/denesbeck/dev-platform), a self-hosted Internal Developer Platform on Kubernetes, and maintain a bare-metal homelab (https://github.com/denesbeck/home-lab-infra) powered by Terraform, Ansible, GitOps workflows, and observability tooling.

    I'm a long-time Neovim and Tmux user who maintains a personal development environment (https://github.com/denesbeck/dotfiles) and builds tools (https://github.com/denesbeck/tmux-worktree) to improve my daily workflow.

    Check out my work (https://github.com/denesbeck) on GitHub.`,
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
