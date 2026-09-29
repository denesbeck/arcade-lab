'use client'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { TbArticle, TbChevronDown } from 'react-icons/tb'
import BLOG_ENTRIES from '@/blog/_config/data'
import { BlogEntry } from '@/blog/_interfaces/blog'
import { isPublished } from '@/blog/_utils/isPublished'
import { BlogPostReference } from '../_config/data'

const MAX_VISIBLE = 3

// Same guard as Highlights.tsx uses.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

interface IBlogPosts {
  blogPostReferences: BlogPostReference[]
}

const BlogPosts = ({ blogPostReferences }: IBlogPosts) => {
  const [expanded, setExpanded] = useState(false)
  // Heights are only known after layout; until then the overflow is simply
  // not rendered, which matches the server HTML.
  const [heights, setHeights] = useState<{
    collapsed: number
    full: number
  } | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Filter before slicing, so a hidden post doesn't shrink the collapsed row.
  const publishedPosts = blogPostReferences
    .map((reference) => BLOG_ENTRIES.find(({ id }) => id === reference))
    .filter((entry): entry is BlogEntry => !!entry && isPublished(entry))

  const hasOverflow = publishedPosts.length > MAX_VISIBLE

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current
    if (!list || !hasOverflow) return

    // Chips wrap, so "three posts" can be one row or three: collapse to the
    // bottom of the last visible chip, not a fixed height.
    const measure = () => {
      const last = list.children[MAX_VISIBLE - 1] as HTMLElement
      setHeights({
        collapsed: last.offsetTop + last.offsetHeight + 1,
        full: list.scrollHeight,
      })
    }
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [hasOverflow])

  const toggle = useCallback(() => setExpanded((prev) => !prev), [])

  if (publishedPosts.length === 0) return null

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex gap-2 items-center text-xs tracking-widest uppercase text-dark-300">
        <TbArticle className="w-3.5 h-3.5" />
        <span>Related posts</span>
      </div>
      {/* p-px keeps the chips' outer ring inside the clip. */}
      <div
        ref={listRef}
        className="relative flex flex-wrap gap-2 overflow-hidden p-px transition-[max-height] duration-300 ease-in-out"
        style={
          heights
            ? { maxHeight: expanded ? heights.full : heights.collapsed }
            : undefined
        }
      >
        {publishedPosts.map(({ id, slug, title }, index) => {
          const overflow = index >= MAX_VISIBLE
          // Hidden overflow chips can still share the last visible row, so
          // they fade rather than rely on the clip alone.
          const hidden = overflow && !expanded
          if (overflow && !heights && !expanded) return null
          return (
            <Link
              key={id}
              href={`/blog/${slug}`}
              inert={hidden}
              className={`py-1 px-2 max-w-full text-xs ring-1 transition-all duration-200 ring-dark-500 text-dark-200 truncate hover:ring-primary hover:text-primary ${hidden ? 'opacity-0' : 'opacity-100'}`}
            >
              {title}
            </Link>
          )
        })}
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
              : `Show ${publishedPosts.length - MAX_VISIBLE} more`}
          </span>
        </button>
      )}
    </div>
  )
}

export default BlogPosts
