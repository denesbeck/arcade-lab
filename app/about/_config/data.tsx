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
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiAnsible,
  SiDocker,
  SiElastic,
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
  Role: 'Senior Full-Stack Software Engineer & Platform Engineer',
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
  {
    name: 'Next.js',
    icon: RiNextjsFill,
  },
  {
    name: 'React',
    icon: FaReact,
  },
  {
    name: 'Tailwind CSS',
    icon: RiTailwindCssFill,
  },
  {
    name: 'Node.js',
    icon: FaNodeJs,
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
  },
  {
    name: 'Golang',
    icon: FaGolang,
  },
  {
    name: 'Lua',
    icon: SiLua,
  },
  {
    name: 'GitHub Actions',
    icon: SiGithubactions,
  },
  {
    name: 'Linux',
    icon: FaLinux,
  },
  { name: 'Bash', icon: SiGnubash },
  {
    name: 'Docker',
    icon: SiDocker,
  },
  {
    name: 'Kubernetes',
    icon: SiKubernetes,
  },
  {
    name: 'Terraform',
    icon: SiTerraform,
  },
  {
    name: 'Ansible',
    icon: SiAnsible,
  },
  {
    name: 'AWS',
    icon: FaAws,
  },
  { name: 'Elastic', icon: SiElastic },
  { name: 'Prometheus', icon: SiPrometheus },
  { name: 'Grafana', icon: SiGrafana },
]

export const BIO = (
  <div className="text-text-dark">
    <p className="mb-8">
      🚀 Full-stack engineer with{' '}
      <Emphasize>{new Date().getFullYear() - 2019} years</Emphasize> of
      experience, now focused on platform engineering — designing and operating
      Kubernetes-based platforms from the ground up.
    </p>
    <p className="mb-8">
      🏗️ My flagship project is{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dev-platform"
      >
        Dev Platform
      </a>{' '}
      — a self-hosted Internal Developer Platform on AWS with end-to-end IaC via
      Terraform, Kubernetes on Talos Linux, Cilium networking, GitOps with Argo
      CD, and a full observability stack (Prometheus, Grafana, Loki, Tempo).
    </p>
    <p className="mb-8">
      💼 I also maintain{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/nexio"
      >
        Nexio
      </a>{' '}
      — a Git-inspired version control system written in Go that taught me
      content-addressable storage, DAG-based history, and remote state sync —
      and an Ansible-driven{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/home-lab-infra"
      >
        Home Lab
      </a>{' '}
      running Docker, Nginx, Pi-hole, Prometheus, and Grafana on bare metal.
    </p>
    <p className="mb-8">
      🛠️ I&apos;m a huge <Emphasize>Neovim</Emphasize> and{' '}
      <Emphasize>Tmux</Emphasize> enthusiast — I build{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/tmux-worktree"
      >
        plugins
      </a>{' '}
      for my workflow and maintain my own{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dotfiles"
      >
        dotfiles
      </a>
      .
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
