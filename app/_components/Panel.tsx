import { ReactNode } from 'react'

interface PanelProps {
  title: string
  /** Right-aligned count or aside, e.g. "26 slots filled". */
  meta: string
  children: ReactNode
}

// A filled tab plus a rule, rather than a boxed section — the sheet's sections
// are peers of each other, not cards.
const Panel = ({ title, meta, children }: PanelProps) => (
  <section className="flex min-w-0 flex-col gap-6">
    <div className="flex items-center gap-4">
      <h2 className="bg-primary text-dark-900 shrink-0 px-3 py-1 text-xs tracking-[0.25em] uppercase">
        {title}
      </h2>
      <span className="bg-secondary h-0.5 min-w-0 flex-1" />
      <span className="text-dark-500 shrink-0 text-[0.625rem] tracking-[0.25em] uppercase">
        {meta}
      </span>
    </div>
    {children}
  </section>
)

export default Panel
