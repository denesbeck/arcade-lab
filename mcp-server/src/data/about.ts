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
    bio: `Senior Software Engineer with ${new Date().getFullYear() - 2019} years of experience building full-stack applications, cloud-native systems, and developer tooling. My work spans frontend and backend development, cloud infrastructure, Kubernetes, CI/CD, and platform engineering, with a particular interest in developer experience, automation, and distributed systems.

    My flagship project is Dev Platform (https://github.com/denesbeck/dev-platform), a self-hosted Internal Developer Platform on AWS featuring end-to-end Infrastructure as Code with Terraform, Kubernetes on Talos Linux, Cilium networking, GitOps workflows via Argo CD, and a complete observability stack built with Prometheus, Grafana, Loki, and Tempo.

    I also maintain Nexio (https://github.com/denesbeck/nexio), a Git-inspired version control system written in Go, where I explored content-addressable storage, DAG-based history, and remote state synchronization. In addition, I operate a Home Lab environment (https://github.com/denesbeck/home-lab-infra) managed through Ansible and Terraform, running containerized services, monitoring, and infrastructure automation on bare metal.

    Outside of work, I'm passionate about developer productivity and open-source tooling. I am a long-time Neovim and Tmux user, maintain my own development environment (https://github.com/denesbeck/dotfiles), and build tools (https://github.com/denesbeck/tmux-worktree) that improve my daily workflow.`,
    skills: [
      'AWS',
      'Terraform',
      'Kubernetes',
      'Talos',
      'Docker',
      'Helm',
      'Ansible',
      'Linux',
      'GitHub Actions',
      'Argo CD',
      'Prometheus',
      'Grafana',
      'Loki',
      'Elastic',
      'Golang',
      'TypeScript',
      'Bash',
      'Node.js',
      'Lua',
      'Next.js',
      'React',
      'Tailwind CSS',
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
