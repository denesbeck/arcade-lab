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

export type BlogRef = {
  id: number
  title: string
}

export type Project = {
  title: string
  subtitle: string
  highlights: string[]
  tech: { name: string; icon: IconType }[]
  url: string
  status: 'active' | 'archived'
  blogPosts: BlogRef[]
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
    blogPosts: [
      { id: 8, title: 'Developing my own VCS' },
      { id: 9, title: 'Storage optimization' },
      { id: 14, title: 'From JSON Files to SQLite' },
      { id: 17, title: 'Remote State Management with S3' },
    ],
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
    blogPosts: [
      { id: 4, title: 'Building my home server P1' },
      { id: 5, title: 'Building my home server P2' },
      { id: 6, title: 'Building my home server P3' },
      { id: 7, title: 'Building my home server P4' },
      { id: 15, title: 'Building my home server P5' },
      { id: 16, title: 'Building my home server P6' },
      { id: 18, title: 'Building my home server P7' },
      { id: 19, title: 'Building my home server P8' },
    ],
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
    blogPosts: [{ id: 3, title: 'Lambda Deployments' }],
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
