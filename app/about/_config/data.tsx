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
import { HiTemplate } from 'react-icons/hi'
import { HiIdentification } from 'react-icons/hi2'
import { LuLogs } from 'react-icons/lu'
import { PiListMagnifyingGlassBold } from 'react-icons/pi'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiAnsible,
  SiArgo,
  SiDocker,
  SiGithubactions,
  SiGnubash,
  SiGrafana,
  SiHelm,
  SiKubernetes,
  SiLua,
  SiPrometheus,
  SiTekton,
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
  {
    url: 'https://www.linkedin.com/in/denesbeck',
    icon: FaLinkedin,
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
  // Cloud & Infrastructure
  { name: 'AWS', icon: FaAws },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Terraform', icon: SiTerraform },
  { name: 'Docker', icon: SiDocker },
  { name: 'Ansible', icon: SiAnsible },
  { name: 'Linux', icon: FaLinux },
  { name: 'Helm', icon: SiHelm },

  // CI/CD & GitOps
  { name: 'GitHub Actions', icon: SiGithubactions },
  { name: 'Argo CD', icon: SiArgo },
  { name: 'Tekton', icon: SiTekton },
  { name: 'Kustomize', icon: HiTemplate },

  // Observability
  { name: 'Prometheus', icon: SiPrometheus },
  { name: 'Grafana', icon: SiGrafana },
  { name: 'Loki', icon: LuLogs },
  { name: 'CloudWatch', icon: PiListMagnifyingGlassBold },

  // Programming
  { name: 'Go', icon: FaGolang },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Bash', icon: SiGnubash },
  { name: 'Next.js', icon: RiNextjsFill },
  { name: 'Tailwind CSS', icon: RiTailwindCssFill },
  { name: 'React', icon: FaReact },
]

export const BIO = (
  <div className="text-text-dark">
    <p className="mb-8">
      🚀 Senior Software Engineer with{' '}
      <Emphasize>{new Date().getFullYear() - 2019}+ years</Emphasize> of
      experience building cloud-native systems, developer platforms, and
      production software. My work spans application development, distributed
      systems, infrastructure automation, CI/CD, and operational tooling,
      allowing me to contribute across both application and platform layers.
    </p>
    <p className="mb-8">
      🏗️ Professionally, I&apos;ve delivered full-stack products, owned
      production services, and built CI/CD and deployment workflows used by
      engineering teams at scale. I enjoy creating systems that improve
      developer experience, reduce operational friction, and make software
      easier to ship and operate.
    </p>
    <p className="mb-8">
      🧪 Outside of work, I explore platform engineering through hands-on
      projects. I&apos;m building{' '}
      <a
        target="_blank"
        className="text-active underline underline-offset-4"
        href="https://github.com/denesbeck/dev-platform"
      >
        Dev Platform
      </a>
      , a self-hosted Internal Developer Platform on Kubernetes, and maintain a
      bare-metal{' '}
      <a
        target="_blank"
        className="text-active underline underline-offset-4"
        href="https://github.com/denesbeck/home-lab-infra"
      >
        homelab
      </a>{' '}
      powered by Terraform, Ansible, GitOps workflows, and observability
      tooling.
    </p>
    <p className="mb-8">
      🛠️ I&apos;m a long-time <Emphasize>Neovim</Emphasize> and{' '}
      <Emphasize>Tmux</Emphasize> user who maintains a personal{' '}
      <a
        target="_blank"
        className="text-active underline underline-offset-4"
        href="https://github.com/denesbeck/dotfiles"
      >
        development environment
      </a>{' '}
      and builds{' '}
      <a
        target="_blank"
        className="text-active underline underline-offset-4"
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
        className="text-active underline underline-offset-4"
        href="https://github.com/denesbeck"
      >
        my work
      </a>{' '}
      on GitHub.
    </p>
  </div>
)
