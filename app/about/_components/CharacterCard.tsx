import Link from 'next/link'
import { ACTIVE_PROJECTS, POSTS, TOOL_COUNT, YEARS } from '@/_config/stats'
import { CONNECTIONS, INFO } from '../_config/data'
import { Avatar } from './Info'

const VITALS: [string, string][] = [
  ['class', 'Infrastructure'],
  ['title', INFO.Role],
  ['rank', INFO.Rank],
  ['guild', INFO.Company],
  ['base', INFO.Location],
]

const COUNTERS: [string, number][] = [
  ['projects live', ACTIVE_PROJECTS],
  ['logs written', POSTS],
  ['tools held', TOOL_COUNT],
]

// The character card: everything a stat block would carry, stacked into one
// ringed unit that stays pinned while the sheet scrolls past it.
const CharacterCard = () => {
  return (
    <aside className="ring-secondary flex animate-text-focus flex-col self-start shadow-[8px_8px_0px_0px_black] ring-2 lg:sticky lg:top-[120px]">
      <div className="border-secondary flex items-center justify-between border-b-2 px-6 py-3">
        <span className="text-primary text-[0.625rem] tracking-[0.3em] uppercase">
          character
        </span>
        <span className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase">
          p1
        </span>
      </div>

      <div className="flex items-center gap-6 p-6">
        <Avatar size={132} autoHide={false} />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase">
            level
          </span>
          <span className="text-primary text-6xl leading-none font-semibold">
            {String(YEARS).padStart(2, '0')}
          </span>
          <span className="text-dark-400 text-xs tracking-[0.2em] uppercase">
            years in
          </span>
        </div>
      </div>

      <h1 className="border-secondary text-dark-50 border-t-2 px-6 py-5 text-2xl tracking-[0.15em] uppercase">
        {INFO.Name}
      </h1>

      <dl className="border-secondary flex flex-col gap-2.5 border-t-2 px-6 py-5">
        {VITALS.map(([key, value]) => (
          <div key={key} className="flex items-baseline gap-3">
            <dt className="text-dark-500 w-12 shrink-0 text-[0.625rem] tracking-[0.2em] uppercase">
              {key}
            </dt>
            <dd className="text-dark-100 min-w-0 text-sm">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-secondary flex flex-col gap-3 border-t-2 px-6 py-5">
        {COUNTERS.map(([label, value]) => (
          <div key={label} className="flex items-baseline gap-3">
            <span className="text-primary w-9 shrink-0 text-xl font-semibold">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-dark-400 text-xs tracking-[0.2em] uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="border-secondary flex items-center gap-3 border-t-2 p-5">
        <Link
          href="/contact"
          className="bg-primary text-dark-900 hover:bg-primary/80 flex-1 py-3 text-center text-xs tracking-[0.25em] uppercase transition-colors duration-200"
        >
          ▶ press start
        </Link>
        {CONNECTIONS.map(({ name, url, icon: Icon }) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="ring-dark-500 text-dark-300 hover:ring-primary hover:text-primary flex h-10 w-10 shrink-0 items-center justify-center ring-1 transition-colors duration-200"
          >
            <Icon className="h-4.5 w-4.5" />
          </a>
        ))}
      </div>
    </aside>
  )
}

export default CharacterCard
