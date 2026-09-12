import { ReactNode } from 'react'
import { CONNECTIONS, INFO } from '@/about/_config/data'

const VITALS: [string, string][] = [
  ['base', INFO.Location],
  ['guild', INFO.Company],
]

interface SignalCardProps {
  /** The human check, sat in the card's footer the way the character card
      ends on its CTA row. */
  children: ReactNode
}

// The sheet's left column. Same ringed, section-divided unit as the character
// card, carrying the ways in that are not the form.
const SignalCard = ({ children }: SignalCardProps) => {
  return (
    <aside className="ring-secondary animate-text-focus flex flex-col self-start shadow-[8px_8px_0px_0px_black] ring-2 lg:sticky lg:top-[120px]">
      <div className="border-secondary flex items-center justify-between border-b-2 px-6 py-3">
        <span className="text-primary text-[0.625rem] tracking-[0.3em] uppercase">
          signal
        </span>
        <span className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase">
          p1
        </span>
      </div>

      <div className="flex flex-col gap-1 px-6 py-5">
        <span className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase">
          channels
        </span>
        <span className="text-primary text-6xl leading-none font-semibold">
          {String(CONNECTIONS.length + 1).padStart(2, '0')}
        </span>
        <span className="text-dark-400 text-xs tracking-[0.2em] uppercase">
          ways in
        </span>
      </div>

      <div className="border-secondary flex flex-col border-t-2">
        {CONNECTIONS.map(({ name, url, icon: Icon }) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-dark-700 text-dark-200 hover:text-primary hover:bg-dark-1000 flex items-center gap-3 border-b px-6 py-4 transition-colors duration-200"
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span className="min-w-0 flex-1 text-sm">{name}</span>
            <span aria-hidden className="text-dark-500 text-xs">
              ↗
            </span>
          </a>
        ))}
        <div className="text-dark-200 flex items-center gap-3 px-6 py-4">
          <span aria-hidden className="text-primary w-4.5 shrink-0 text-center">
            ▸
          </span>
          <span className="min-w-0 flex-1 text-sm">This form</span>
          <span className="text-dark-500 text-[0.625rem] tracking-[0.2em] uppercase">
            here
          </span>
        </div>
      </div>

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

      <div className="border-secondary flex flex-col gap-2 border-t-2 px-6 py-5">
        <span className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase">
          human check
        </span>
        {children}
      </div>
    </aside>
  )
}

export default SignalCard
