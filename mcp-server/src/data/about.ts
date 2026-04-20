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
    role: 'Senior Full-Stack Software Engineer',
    bio: `I'm a full-stack software engineer with ${new Date().getFullYear() - 2019} years of experience. I specialize in developing scalable, efficient, and maintainable applications using modern frameworks and best practices. I thrive on building self-hosted solutions and automating workflows, with a deep interest in DevOps, security and infrastructure management. I'm a huge Neovim and Tmux enthusiast. I mostly work with JavaScript and TypeScript, but I'm also comfortable working with other languages like Python and Lua. I'm currently diving into Golang. Nexio (https://github.com/denesbeck/nexio) is my latest project written in Go — a Git-inspired version control system.`,
    skills: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Node.js',
      'TypeScript',
      'Golang',
      'Lua',
      'GitHub Actions',
      'Tekton',
      'Linux',
      'Bash',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'AWS',
    ],
    certificates: [
      {
        name: 'AWS Certified Developer - Associate',
        url: 'https://www.credly.com/badges/b4bf4117-6a90-49eb-baee-e382447b72c2/public_url',
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
