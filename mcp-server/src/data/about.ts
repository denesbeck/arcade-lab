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
    role: 'Senior Full-Stack Software Engineer & Platform Engineer',
    bio: `Full-stack engineer with ${new Date().getFullYear() - 2019} years of experience, now focused on platform engineering — designing and operating Kubernetes-based platforms from the ground up. My flagship project is Dev Platform (https://github.com/denesbeck/dev-platform) — a self-hosted Internal Developer Platform on AWS with end-to-end IaC via Terraform, Kubernetes on Talos Linux, Cilium networking, GitOps with Argo CD, and a full observability stack (Prometheus, Grafana, Loki, Tempo). I also maintain Nexio (https://github.com/denesbeck/nexio) — a Git-inspired version control system written in Go that taught me content-addressable storage, DAG-based history, and remote state sync — and an Ansible-driven Home Lab (https://github.com/denesbeck/home-lab-infra) running Docker, Nginx, Pi-hole, Prometheus, and Grafana on bare metal. I'm a huge Neovim and Tmux enthusiast — I build plugins (https://github.com/denesbeck/tmux-worktree) for my workflow and maintain my own dotfiles (https://github.com/denesbeck/dotfiles).`,
    skills: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Node.js',
      'TypeScript',
      'Golang',
      'Lua',
      'GitHub Actions',
      'Linux',
      'Bash',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'AWS',
      'Elastic',
      'Prometheus',
      'Grafana',
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
