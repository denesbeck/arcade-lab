import { IconType } from 'react-icons'
import { FaAws, FaGolang, FaReact } from 'react-icons/fa6'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiAnsible,
  SiGithubactions,
  SiGnubash,
  SiTerraform,
  SiTypescript,
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
    blogPosts: [4, 5, 6, 7, 15, 16, 18, 19, 20],
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
    blogPosts: [3],
  },
  {
    title: 'Arcade Lab',
    subtitle: 'Developer Portfolio',
    highlights: [
      'Built a personal developer portfolio using Next.js and TypeScript',
      'Designed responsive UI and project showcase pages',
      'Deployed and hosted the application on Vercel, leveraging automated builds and continuous deployment',
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
    blogPosts: [],
  },
]

export default PROJECTS
