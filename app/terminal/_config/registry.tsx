'use client'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import {
  ACTIVE_PROJECTS,
  CERT_COUNT,
  POSTS,
  TOOL_COUNT,
  YEARS,
} from '@/_config/stats'
import {
  BIO,
  CERTIFICATES,
  CONNECTIONS,
  INFO,
  SKILL_GROUPS,
} from '@/about/_config/data'
import type { Registry } from '../_components/Terminal'

/** Only these resolve for `cd` — an unknown path is what makes the 404 work. */
const ROUTES = [
  { name: 'home', path: '/', note: `landing page` },
  { name: 'work', path: '/work', note: `${ACTIVE_PROJECTS} active projects` },
  { name: 'blog', path: '/blog', note: `${POSTS} posts` },
  { name: 'about', path: '/about', note: 'the long version' },
  { name: 'contact', path: '/contact', note: 'say hello' },
]

const HELP: [string, string][] = [
  ['whoami', 'identity and current role'],
  ['bio', 'the long version'],
  ['toolkit', 'what I build with'],
  ['certs', 'verified certifications'],
  ['stats', 'numbers about this site'],
  ['ls', 'list the pages on this site'],
  ['cd <dir>', 'go to one of them'],
  ['open <name>', 'github or linkedin, in a new tab'],
  ['links', 'where else to find me'],
  ['clear', 'wipe the scrollback'],
]

/** Path-safe name: "CI/CD & GitOps" -> "ci-cd-gitops". */
const slug = (name: string) =>
  name.toLowerCase().replace(/ & /g, '-').replace(/\//g, '-').replace(/ /g, '-')

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-3">
    <span className="text-primary w-24 shrink-0">{label}</span>
    <span className="text-dark-100 min-w-0">{value}</span>
  </div>
)

const REGISTRY: Registry = {
  whoami: (
    <div className="flex flex-col gap-1">
      <Row label="name" value={INFO.Name} />
      <Row label="role" value={INFO.FullRole} />
      <Row label="company" value={INFO.Company} />
      <Row label="location" value={INFO.Location} />
      <Row label="experience" value={`${YEARS}+ years`} />
    </div>
  ),

  help: (
    <div className="flex flex-col gap-1">
      <p className="text-dark-400 mb-1">available commands:</p>
      {HELP.map(([command, description]) => (
        <div key={command} className="flex gap-3">
          <span className="text-primary w-28 shrink-0">{command}</span>
          <span className="text-dark-300 min-w-0">{description}</span>
        </div>
      ))}
      <p className="text-dark-500 mt-2 text-xs">
        ↑ / ↓ walk back through what you have already run.
      </p>
    </div>
  ),

  bio: <div className="max-w-2xl">{BIO}</div>,

  ls: (
    <div className="flex flex-col gap-1">
      {ROUTES.map(({ name, note }) => (
        <div key={name} className="flex gap-3">
          <span className="text-dark-500 hidden shrink-0 sm:inline">
            drwxr-xr-x
          </span>
          <span className="text-primary w-20 shrink-0">{name}/</span>
          <span className="text-dark-300 min-w-0">{note}</span>
        </div>
      ))}
    </div>
  ),

  cd: (args, context) => {
    const target = args[0]
    if (!target) {
      return (
        <p className="text-dark-400">
          usage: cd &lt;dir&gt; — run <span className="text-primary">ls</span>{' '}
          to see what is here
        </p>
      )
    }

    const key = target.replace(/^\/+|\/+$/g, '').toLowerCase()
    if (key === '' || key === '~') {
      context.go('/')
      return <p className="text-dark-300">→ /</p>
    }

    const route = ROUTES.find(({ name }) => name === key)
    if (!route) {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-alert-error">
            cd: {target}: no such file or directory
          </p>
          <p className="text-dark-400">
            run <span className="text-primary">ls</span> to see what is here.
          </p>
        </div>
      )
    }

    context.go(route.path)
    return (
      <p className="text-dark-300">
        → <span className="text-primary">{route.path}</span>
      </p>
    )
  },

  open: (args, context) => {
    const target = args[0]?.toLowerCase()
    const link = CONNECTIONS.find(({ name }) => name.toLowerCase() === target)
    if (!link) {
      return (
        <p className="text-alert-error">
          open: {target ?? 'nothing'}: unknown target — try{' '}
          {CONNECTIONS.map(({ name }) => name.toLowerCase()).join(' or ')}
        </p>
      )
    }
    context.open(link.url)
    return (
      <p className="text-dark-300">
        opening <span className="text-primary">{link.url}</span>
      </p>
    )
  },

  toolkit: (
    // The rail connects the directory lines only; the tools stay wrapped
    // side by side. It is drawn with spans rather than box-drawing characters
    // because consecutive folders are separated by a block of tools, which no
    // amount of line-height would let a `│` glyph span.
    <div className="flex flex-col">
      {SKILL_GROUPS.map(({ name, skills }, index) => {
        const isFirst = index === 0
        const isLast = index === SKILL_GROUPS.length - 1
        return (
          <div key={name} className="relative pb-5 pl-6 last:pb-0">
            <span
              aria-hidden
              className={`bg-dark-500 absolute left-[3px] w-px ${
                isLast ? 'top-0 h-2.5' : 'bottom-0'
              } ${isFirst ? 'top-2.5' : 'top-0'}`}
            />
            <span
              aria-hidden
              className="bg-dark-500 absolute top-2.5 left-[3px] h-px w-3.5"
            />
            <p className="text-primary flex h-5 items-center">{slug(name)}/</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {skills.map(({ name: skill, icon: Icon }) => (
                <span key={skill} className="flex items-center gap-2">
                  <Icon className="text-primary h-4 w-4 shrink-0" />
                  {slug(skill)}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  ),

  certs: (
    <div className="flex flex-col gap-3">
      {CERTIFICATES.map(({ name, url, img, alt }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="text-macos-green shrink-0">✓</span>
          <Image
            src={img}
            alt={alt}
            width={28}
            height={28}
            quality={100}
            className="h-7 w-7 shrink-0"
          />
          <span className="group-hover:text-primary min-w-0 transition-colors duration-200">
            {name}
          </span>
          <FiArrowUpRight className="text-dark-500 group-hover:text-primary h-3 w-3 shrink-0" />
        </a>
      ))}
    </div>
  ),

  stats: (
    <div className="flex flex-col gap-1">
      <Row label="experience" value={`${YEARS}+ years`} />
      <Row label="toolkit" value={`${TOOL_COUNT} tools`} />
      <Row label="projects" value={`${ACTIVE_PROJECTS} active`} />
      <Row label="posts" value={String(POSTS)} />
      <Row label="certs" value={`${CERT_COUNT} verified`} />
    </div>
  ),

  links: (
    <div className="flex flex-col gap-1">
      {CONNECTIONS.map(({ name, url }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary flex gap-3 transition-colors duration-200"
        >
          <span className="text-primary w-24 shrink-0">
            {name.toLowerCase()}
          </span>
          <span className="text-dark-100 min-w-0 underline underline-offset-4">
            {url}
          </span>
        </a>
      ))}
    </div>
  ),
}

export const SUGGESTIONS = [
  'whoami',
  'ls',
  'bio',
  'toolkit',
  'certs',
  'stats',
  'links',
  'help',
  'clear',
]

export default REGISTRY
