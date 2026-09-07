import { IconType } from 'react-icons'
import {
  FaAws,
  FaGithub,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { HiTemplate } from 'react-icons/hi'
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
  SiJavascript,
  SiKubernetes,
  SiLua,
  SiPodman,
  SiPrometheus,
  SiPython,
  SiTekton,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si'
import Emphasize from '@/_components/Emphasize'

const RANK = 'Senior'
const ROLE = 'DevEx/Platform Engineer'

export const INFO = {
  Name: 'Denes Beck',
  Location: 'Budapest, Hungary',
  Company: 'SEON',
  Rank: RANK,
  Role: ROLE,
  /**
   * Rank and role joined. They are stored apart only so the character card can
   * show them on separate lines — everywhere else (prose, metadata, JSON-LD)
   * wants the whole title, and nothing should concatenate it by hand.
   */
  FullRole: `${RANK} ${ROLE}`,
}

export const CONNECTIONS = [
  {
    name: 'GitHub',
    url: 'https://github.com/denesbeck',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/denesbeck',
    icon: FaLinkedin,
  },
]

export type Certificate = {
  name: string
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
    name: 'AWS Certified Developer — Associate',
  },
  {
    url: 'https://www.credly.com/badges/955a71c6-a223-4c7b-9b27-cc95268465ce/public_url',
    size: 105,
    img: 'https://images.credly.com/size/680x680/images/88a6405e-0f26-442a-95ed-f9b9db4c857e/blob',
    alt: 'awsCloudOpsAssociate',
    name: 'AWS Certified CloudOps Engineer — Associate',
  },
  {
    url: 'https://www.credly.com/badges/91d294a8-8f7d-4f5a-80c1-071fa0bf2be6/public_url',
    size: 105,
    img: 'https://images.credly.com/size/680x680/images/0dc62494-dc94-469a-83af-e35309f27356/blob',
    alt: 'terraform',
    name: 'HashiCorp Certified: Terraform Associate',
  },
]

export type Skill = { name: string; icon: IconType }

export type SkillGroup = { name: string; skills: Skill[] }

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Platform & Cloud',
    skills: [
      { name: 'AWS', icon: FaAws },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'Ansible', icon: SiAnsible },
      { name: 'Docker', icon: SiDocker },
      { name: 'Podman', icon: SiPodman },
      { name: 'Helm', icon: SiHelm },
      { name: 'Linux', icon: FaLinux },
    ],
  },
  {
    name: 'CI/CD & GitOps',
    skills: [
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Argo CD', icon: SiArgo },
      { name: 'Tekton', icon: SiTekton },
      { name: 'Kustomize', icon: HiTemplate },
    ],
  },
  {
    name: 'Observability',
    skills: [
      { name: 'Prometheus', icon: SiPrometheus },
      { name: 'Grafana', icon: SiGrafana },
      { name: 'Loki', icon: LuLogs },
      { name: 'CloudWatch', icon: PiListMagnifyingGlassBold },
    ],
  },
  {
    name: 'Programming',
    skills: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Go', icon: FaGolang },
      { name: 'Bash', icon: SiGnubash },
      { name: 'Python', icon: SiPython },
      { name: 'Lua', icon: SiLua },
    ],
  },
  {
    name: 'Application Development',
    skills: [
      { name: 'React', icon: FaReact },
      { name: 'Next.js', icon: RiNextjsFill },
      { name: 'Tailwind CSS', icon: RiTailwindCssFill },
      { name: 'Node.js', icon: FaNodeJs },
    ],
  },
]

/** Flat, in group order — the home page's stack marquee reads this. */
export const SKILLS: Skill[] = SKILL_GROUPS.flatMap((group) => group.skills)

export const BIO = (
  <div className="text-text-dark">
    <p className="mb-8">
      Senior Software Engineer with{' '}
      <Emphasize>{new Date().getFullYear() - 2019}+ years</Emphasize> of
      experience building internal platforms, cloud infrastructure, web
      applications, CI/CD pipelines, and developer tooling. Experienced in{' '}
      <Emphasize>AWS</Emphasize>, <Emphasize>Kubernetes</Emphasize>,{' '}
      <Emphasize>Terraform</Emphasize>, GitOps, and production operations, with
      a track record of reducing infrastructure costs, improving deployment
      efficiency, and helping engineering teams ship reliable software at scale.
    </p>
    <p className="mb-8">
      My background spans both platform engineering and full-stack product
      development, which shapes how I build platforms: with a focus on
      reliability, developer experience, and tools engineers actually want to
      use.
    </p>
    <p>
      Outside of work, I run a self-hosted{' '}
      <a
        target="_blank"
        className="text-active underline underline-offset-4"
        href="https://github.com/denesbeck/dev-platform"
      >
        Internal Developer Platform
      </a>{' '}
      on Kubernetes and a bare-metal{' '}
      <a
        target="_blank"
        className="text-active underline underline-offset-4"
        href="https://github.com/denesbeck/home-lab-infra"
      >
        homelab
      </a>{' '}
      managed with Terraform, Ansible, and GitOps.
    </p>
  </div>
)
