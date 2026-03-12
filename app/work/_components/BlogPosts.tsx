'use client'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { TbArticle, TbChevronDown } from 'react-icons/tb'
import type { BlogRef } from '../_config/data'

const MAX_VISIBLE = 3

const BlogPosts = ({ blogPosts }: { blogPosts: BlogRef[] }) => {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = blogPosts.length > MAX_VISIBLE
  const visiblePosts = expanded ? blogPosts : blogPosts.slice(0, MAX_VISIBLE)

  const toggle = useCallback(() => setExpanded((prev) => !prev), [])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center text-xs tracking-widest uppercase text-dark-300">
        <TbArticle className="w-3.5 h-3.5" />
        <span>Related posts</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {visiblePosts.map(({ id, title }) => (
          <Link
            key={id}
            href={`/blog/${id}`}
            className="py-1 px-2 max-w-full text-xs ring-1 transition-all duration-200 ring-dark-500 text-dark-200 truncate hover:ring-primary hover:text-primary"
          >
            {title}
          </Link>
        ))}
      </div>
      {hasOverflow && (
        <button
          type="button"
          onClick={toggle}
          className="flex gap-1 items-center mt-1 text-xs transition-colors duration-200 cursor-pointer text-dark-300 w-fit hover:text-primary"
        >
          <TbChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
          <span>
            {expanded
              ? 'Show less'
              : `Show ${blogPosts.length - MAX_VISIBLE} more`}
          </span>
        </button>
      )}
    </div>
  )
}

export default BlogPosts
