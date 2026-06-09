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
  SiElastic,
  SiGithubactions,
  SiGnubash,
  SiGrafana,
  SiHelm,
  SiKubernetes,
  SiLua,
  SiPrometheus,
  SiTalos,
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
  { name: 'AWS', icon: FaAws },
  { name: 'Terraform', icon: SiTerraform },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Talos', icon: SiTalos },
  { name: 'Docker', icon: SiDocker },
  { name: 'Helm', icon: SiHelm },
  { name: 'Ansible', icon: SiAnsible },
  { name: 'Linux', icon: FaLinux },
  { name: 'GitHub Actions', icon: SiGithubactions },
  { name: 'Argo CD', icon: SiArgo },
  { name: 'Prometheus', icon: SiPrometheus },
  { name: 'Grafana', icon: SiGrafana },
  { name: 'Loki', icon: LuLogs },
  { name: 'Elastic', icon: SiElastic },
  { name: 'Golang', icon: FaGolang },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Bash', icon: SiGnubash },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Lua', icon: SiLua },
  { name: 'Next.js', icon: RiNextjsFill },
  { name: 'React', icon: FaReact },
  { name: 'Tailwind CSS', icon: RiTailwindCssFill },
]

export const BIO = (
  <div className="text-text-dark">
    <p className="mb-8">
      🚀 Senior Software Engineer with{' '}
      <Emphasize>{new Date().getFullYear() - 2019} years</Emphasize> of
      experience building full-stack applications, cloud-native systems, and
      developer tooling. My work spans frontend and backend development, cloud
      infrastructure, Kubernetes, CI/CD, and platform engineering, with a
      particular interest in developer experience, automation, and distributed
      systems.
    </p>
    <p className="mb-8">
      🏗️ My flagship project is{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dev-platform"
      >
        Dev Platform
      </a>
      , a self-hosted Internal Developer Platform on AWS featuring end-to-end
      Infrastructure as Code with Terraform, Kubernetes on Talos Linux, Cilium
      networking, GitOps workflows via Argo CD, and a complete observability
      stack built with Prometheus, Grafana, Loki, and Tempo.
    </p>
    <p className="mb-8">
      💼 I also maintain{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/nexio"
      >
        Nexio
      </a>
      , a Git-inspired version control system written in Go, where I explored
      content-addressable storage, DAG-based history, and remote state
      synchronization. In addition, I operate a{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/home-lab-infra"
      >
        Home Lab
      </a>{' '}
      environment managed through Ansible and Terraform, running containerized
      services, monitoring, and infrastructure automation on bare metal.
    </p>
    <p className="mb-8">
      🛠️ Outside of work, I&apos;m passionate about developer productivity and
      open-source tooling. I am a long-time <Emphasize>Neovim</Emphasize> and{' '}
      <Emphasize>Tmux</Emphasize> user, maintain my own{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dotfiles"
      >
        development environment
      </a>
      , and build{' '}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/tmux-worktree"
      >
        tools
      </a>{' '}
      that improve my daily workflow.
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
