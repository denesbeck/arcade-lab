import { CERTIFICATES, INFO } from '@/about/_config/data'
import BLOG_ENTRIES from '@/blog/_config/data'
import { isPublished } from '@/blog/_utils/isPublished'
import PROJECTS from '@/work/_config/data'
import CountUp from './CountUp'

const CAREER_START_YEAR = 2019

const ROWS = [
  {
    label: 'experience',
    value: `${new Date().getFullYear() - CAREER_START_YEAR}+ years`,
  },
  { label: 'currently', value: INFO.Company },
  { label: 'location', value: INFO.Location },
]

const STATS = [
  {
    value: PROJECTS.filter((project) => project.status === 'active').length,
    label: 'active projects',
  },
  {
    value: BLOG_ENTRIES.filter(isPublished).length,
    label: 'posts published',
  },
  { value: CERTIFICATES.length, label: 'certifications' },
]

// The hero's counterweight: a terminal window whose contents are derived from
// the same config the /work, /blog and /about pages render, so it cannot drift.
const SystemPanel = () => {
  return (
    <div className="ring-secondary animate-text-focus w-full ring-2 backdrop-blur-md [animation-fill-mode:backwards] [animation-delay:400ms]">
      <div className="border-secondary flex items-center gap-4 border-b-2 px-5 py-3">
        <div className="flex shrink-0 space-x-2">
          <span className="bg-macos-red h-3 w-3 rounded-full" />
          <span className="bg-macos-yellow h-3 w-3 rounded-full" />
          <span className="bg-macos-green h-3 w-3 rounded-full" />
        </div>
        <span className="text-dark-400 truncate text-xs tracking-widest">
          ~/arcade-lab — stat
        </span>
      </div>

      <dl className="flex flex-col">
        {ROWS.map(({ label, value }) => (
          <div
            key={label}
            className="border-secondary flex items-baseline justify-between gap-4 border-b-2 px-5 py-3.5 last:border-b-0"
          >
            <dt className="text-dark-400 shrink-0 text-xs tracking-widest uppercase">
              {label}
            </dt>
            <dd className="text-dark-100 text-right text-sm">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-secondary grid grid-cols-3 border-t-2">
        {STATS.map(({ value, label }, index) => (
          <div
            key={label}
            className="border-secondary flex flex-col gap-1 border-r-2 px-3 py-5 text-center last:border-r-0"
          >
            <span className="text-primary text-3xl font-semibold">
              {/* Starts once the panel's own blur-in has finished, then each
                  column follows the one before it. */}
              <CountUp value={value} delay={500 + index * 120} />
            </span>
            <span className="text-dark-400 text-[0.625rem] leading-tight tracking-widest uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SystemPanel
