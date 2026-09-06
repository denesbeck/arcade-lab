import { FiExternalLink } from 'react-icons/fi'
import { TbArticle } from 'react-icons/tb'
import BLOG_ENTRIES from '@/blog/_config/data'
import { isPublished } from '@/blog/_utils/isPublished'
import PROJECTS from '@/work/_config/data'
import SectionHeader from './SectionHeader'

// The work config exports its entries already sorted — active first, then by
// priority — so the top three actives are the same three /work leads with.
const FEATURED = PROJECTS.filter((project) => project.status === 'active')
  .slice(0, 3)
  .map((project) => ({
    ...project,
    // Same rule as /work's related-posts row: hidden and future-dated entries
    // don't count.
    postCount: project.blogPosts.filter((reference) => {
      const entry = BLOG_ENTRIES.find(({ id }) => id === reference)
      return !!entry && isPublished(entry)
    }).length,
  }))

const FeaturedWork = () => {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeader
        index="01"
        title="Selected work"
        link={{ label: 'All projects', href: '/work' }}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((project, index) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${index * 100}ms` }}
            className="ring-secondary hover:ring-primary group animate-text-focus relative flex flex-col gap-5 p-6 ring-2 backdrop-blur-md transition-all duration-300 ease-in-out [animation-fill-mode:backwards]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="group-hover:text-primary text-xl font-semibold transition-colors duration-200">
                  {project.title}
                </h3>
                <span className="text-dark-400 text-xs tracking-widest uppercase">
                  {project.subtitle}
                </span>
              </div>
              <FiExternalLink className="text-dark-400 group-hover:text-primary mt-1 h-4 w-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <p className="text-dark-200 line-clamp-3 text-sm leading-relaxed">
              {project.highlights[0]}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
              {project.tech.slice(0, 5).map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  title={name}
                  className="ring-dark-500 group-hover:ring-primary/40 flex h-8 w-8 items-center justify-center ring-1 transition-all duration-200"
                >
                  <Icon className="text-dark-200 group-hover:text-primary h-4 w-4 transition-colors duration-200" />
                </div>
              ))}
              {project.tech.length > 5 && (
                <span className="text-dark-400 text-xs">
                  +{project.tech.length - 5}
                </span>
              )}
            </div>

            <div className="border-secondary flex items-center gap-2 border-t-2 pt-4">
              <span className="bg-macos-green h-2 w-2 animate-pulse rounded-full" />
              <span className="text-dark-300 text-xs tracking-widest uppercase">
                {project.status}
              </span>
              {project.postCount > 0 && (
                <span className="text-dark-400 ml-auto flex items-center gap-1.5 text-xs tracking-widest uppercase">
                  <TbArticle className="h-3.5 w-3.5" />
                  {project.postCount}{' '}
                  {project.postCount === 1 ? 'post' : 'posts'}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default FeaturedWork
