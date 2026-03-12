import { FiExternalLink } from 'react-icons/fi'
import { Tooltip } from '@/_components'
import type { Project } from '../_config/data'
import BlogPosts from './BlogPosts'

const ProjectCard = ({
  title,
  subtitle,
  highlights,
  tech,
  url,
  status,
  blogPosts,
}: Project) => {
  const isLink = url.length > 0

  return (
    <div
      className={`group relative flex flex-col justify-between gap-6 p-6 sm:p-8 ring-2 ring-secondary backdrop-blur-md transition-all duration-300 ease-in-out animate-text-focus sm:hover:ring-primary sm:hover:ring-offset-4 sm:hover:ring-offset-root sm:hover:shadow-[10px_10px_0px_0px_black]`}
    >
      {/* status indicator */}
      <div className="flex absolute top-4 right-4 gap-2 items-center">
        <div
          className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-macos-green animate-pulse' : 'bg-dark-400'}`}
        />
        <span className="text-xs tracking-widest uppercase text-dark-300">
          {status}
        </span>
      </div>

      {/* content */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex gap-3 items-center">
            {isLink ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center cursor-pointer"
              >
                <h2 className="text-2xl font-semibold transition-colors duration-200 hover:text-primary">
                  {title}
                </h2>
                <FiExternalLink className="w-4 h-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-dark-300 group-hover:text-primary" />
              </a>
            ) : (
              <h2 className="text-2xl font-semibold">{title}</h2>
            )}
          </div>
          <span className="text-xs tracking-widest uppercase text-dark-400">
            {subtitle}
          </span>
        </div>
        <ul className="flex flex-col gap-2 mt-1">
          {highlights.map((point) => (
            <li
              key={point}
              className="relative pl-4 text-sm leading-relaxed text-dark-200 before:content-[''] before:absolute before:left-0 before:top-[0.55rem] before:w-1.5 before:h-1.5 before:bg-primary/40 before:rounded-full"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* blog post references */}
      {blogPosts.length > 0 && <BlogPosts blogPosts={blogPosts} />}

      {/* tech stack */}
      <div className="flex flex-wrap gap-3">
        {tech.map(({ name, icon: Icon }) => (
          <Tooltip key={name} title={name}>
            <div className="flex justify-center items-center w-9 h-9 ring-1 transition-all duration-200 ring-dark-500 group-hover:ring-primary/40">
              <Icon className="w-5 h-5 transition-colors duration-200 text-dark-200 group-hover:text-primary" />
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard
