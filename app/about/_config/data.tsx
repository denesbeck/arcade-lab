import {
  FaAws,
  FaBriefcase,
  FaBuilding,
  FaGithub,
  FaLinkedin,
  FaLinux,
  FaMapMarkerAlt,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { HiIdentification } from 'react-icons/hi2'
import { LuLogs } from 'react-icons/lu'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiAnsible,
  SiArgo,
  SiDocker,
  SiGithubactions,
  SiGnubash,
  SiGrafana,
  SiKubernetes,
  SiLua,
  SiPrometheus,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si'
import { Emphasize } from '@/_components'

export const INFO = {
  Name: 'Denes Beck',
  Location: 'Budapest, Hungary',
  Company: 'SEON',
  Role: 'Senior Software Engineer',
}

export const INFO_ICONS = {
  Name: HiIdentification,
  Location: FaMapMarkerAlt,
  Company: FaBuilding,
  Role: FaBriefcase,
}

export const CONNECTIONS = [
  {
    url: 'https://github.com/denesbeck',
    icon: FaGithub,
  },
]

export type Certificate = {
  url: string
  size: number
  img: string
  alt: string
}

export const CERTIFICATES: Certificate[] = [
  {
    url: 'https://www.credly.com/badges/b4bf4117-6a90-49eb-baee-e382447b72c2/public_url',
    size: 105,
    img: 'https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    alt: 'awsDeveloperAssociate',
  },
  {
    url: 'https://www.credly.com/badges/955a71c6-a223-4c7b-9b27-cc95268465ce/public_url',
    size: 105,
    img: 'https://images.credly.com/size/680x680/images/88a6405e-0f26-442a-95ed-f9b9db4c857e/blob',
    alt: 'awsCloudOpsAssociate',
  },
  {
    url: 'https://www.credly.com/badges/91d294a8-8f7d-4f5a-80c1-071fa0bf2be6/public_url',
    size: 105,
    img: 'https://images.credly.com/size/680x680/images/0dc62494-dc94-469a-83af-e35309f27356/blob',
    alt: 'terraform',
  },
]

export const SKILLS = [
  // Full-stack
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: RiNextjsFill },
  { name: 'Tailwind CSS', icon: RiTailwindCssFill },
  // Languages
  { name: 'Golang', icon: FaGolang },
  { name: 'Bash', icon: SiGnubash },
  { name: 'Lua', icon: SiLua },
  // DevOps & cloud
  { name: 'AWS', icon: FaAws },
  { name: 'Docker', icon: SiDocker },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Terraform', icon: SiTerraform },
  { name: 'Ansible', icon: SiAnsible },
  { name: 'GitHub Actions', icon: SiGithubactions },
  { name: 'Argo CD', icon: SiArgo },
  { name: 'Linux', icon: FaLinux },
  // Observability
  { name: 'Prometheus', icon: SiPrometheus },
  { name: 'Grafana', icon: SiGrafana },
  { name: 'Loki', icon: LuLogs },
]

export const BIO = (
  <div className="text-text-dark">
    <p className="mb-8">
      🚀 Senior Software Engineer with{' '}
      <Emphasize>{new Date().getFullYear() - 2019} years</Emphasize> of
      experience building <Emphasize>full-stack applications</Emphasize> and
      developer tooling, with a strong interest in DevOps and automation that I
      sharpen through hands-on personal projects.
    </p>
    <p className="mb-8">
      🏗️ My flagship project is{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/nexio"
      >
        Nexio
      </a>
      , a Git-inspired version control system in Go. Alongside it I run my{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/home-lab-infra"
      >
        Home Lab
      </a>{' '}
      — a bare-metal setup managed with Ansible and Terraform.
    </p>
    <p className="mb-8">
      🧪 More recently I started{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dev-platform"
      >
        Dev Platform
      </a>
      , a self-hosted Internal Developer Platform where I&apos;m going deeper on
      Kubernetes, IaC, GitOps, and observability.
    </p>
    <p className="mb-8">
      🛠️ Outside of work, I&apos;m a long-time <Emphasize>Neovim</Emphasize> and{' '}
      <Emphasize>Tmux</Emphasize> user who maintains a personal{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dotfiles"
      >
        development environment
      </a>{' '}
      and builds{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/tmux-worktree"
      >
        tools
      </a>{' '}
      to improve my daily workflow.
    </p>
    <p>
      📁 Check out{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck"
      >
        my work
      </a>{' '}
      on GitHub.
    </p>
  </div>
)
