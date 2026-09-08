import type { PersonalInfo } from '../types'

// Mirrors the split in app/about/_config/data.tsx, which cannot be imported
// here because it carries JSX. Both files have to move together.
const RANK = 'Senior'
const ROLE = 'DevEx/Platform Engineer'

/**
 * Personal information extracted from app/about/_config/data.tsx.
 * Plain data without React/Next.js dependencies.
 */
export function getPersonalInfo(): PersonalInfo {
  return {
    name: 'Denes Beck',
    location: 'Budapest, Hungary',
    company: 'SEON',
    role: `${RANK} ${ROLE}`,
    bio: `${RANK} ${ROLE} with ${new Date().getFullYear() - 2019}+ years of experience building internal platforms, cloud infrastructure, web applications, CI/CD pipelines, and developer tooling. Experienced in AWS, Kubernetes, Terraform, GitOps, and production operations, with a track record of reducing infrastructure costs, improving deployment efficiency, and helping engineering teams ship reliable software at scale.

    My background spans both platform engineering and full-stack product development, which shapes how I build platforms: with a focus on reliability, developer experience, and tools engineers actually want to use.

    Outside of work, I run a self-hosted Internal Developer Platform (https://github.com/denesbeck/dev-platform) on Kubernetes and a bare-metal homelab (https://github.com/denesbeck/home-lab-infra) managed with Terraform, Ansible, and GitOps.`,
    skills: [
      // Platform & Cloud
      'AWS',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'Docker',
      'Podman',
      'Helm',
      'Linux',

      // CI/CD & GitOps
      'GitHub Actions',
      'Argo CD',
      'Tekton',
      'Kustomize',

      // Observability
      'Prometheus',
      'Grafana',
      'Loki',
      'CloudWatch',

      // Programming
      'TypeScript',
      'JavaScript',
      'Go',
      'Bash',
      'Python',
      'Lua',

      // Application Development
      'React',
      'Next.js',
      'Tailwind CSS',
      'Node.js',
    ],
    certificates: [
      {
        name: 'AWS Certified Developer — Associate',
        url: 'https://www.credly.com/badges/b4bf4117-6a90-49eb-baee-e382447b72c2/public_url',
      },
      {
        name: 'AWS Certified CloudOps Engineer — Associate',
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
