import Link from 'next/link'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { AnimatedUnderline } from '@/_components'
import BLOG_ENTRIES from '@/blog/_config/data'
import { isPublished } from '@/blog/_utils/isPublished'
import { getReadTime } from '@/blog/_utils/readTime'
import SectionHeader from './SectionHeader'

const LATEST = [...BLOG_ENTRIES]
  .filter(isPublished)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3)

// An index rather than a card grid: /blog already shows covers, and the plain
// numbered rows keep this section from competing with the work cards above.
const LatestPosts = () => {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeader
        index="02"
        title="Latest writing"
        link={{ label: 'All posts', href: '/blog' }}
      />
      <div className="border-secondary flex flex-col border-t-2">
        {LATEST.map((entry, index) => {
          const readTime = getReadTime(entry.file)
          return (
            <Link
              key={entry.id}
              href={`/blog/${entry.slug}`}
              style={{ animationDelay: `${index * 100}ms` }}
              className="border-secondary hover:bg-secondary/40 group animate-text-focus flex flex-col gap-2 border-b-2 py-5 px-2 transition-colors duration-200 ease-in-out [animation-fill-mode:backwards] sm:flex-row sm:items-baseline sm:gap-6 sm:px-4"
            >
              <span className="text-dark-500 group-hover:text-primary shrink-0 text-xs tracking-widest transition-colors duration-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3 className="text-dark-50 text-lg leading-snug">
                  <AnimatedUnderline>{entry.title}</AnimatedUnderline>
                </h3>
                <p className="text-dark-300 line-clamp-2 text-sm leading-relaxed">
                  {entry.description}
                </p>
              </div>
              <div className="text-dark-400 flex shrink-0 items-center gap-4 text-xs sm:flex-col sm:items-end sm:gap-1.5">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <FaRegCalendarAlt />
                  {entry.date}
                </span>
                {readTime !== null && (
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <FaRegClock />
                    {readTime} min read
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default LatestPosts
