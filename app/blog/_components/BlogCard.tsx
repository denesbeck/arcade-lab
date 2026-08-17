'use client'
import { Skeleton, ThemeProvider } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { AnimatedUnderline } from '@/_components'
import { darkTheme } from '@/theme'

interface BlogCardProps {
  slug: string
  title: string
  description: string
  date: string
  readTime: number | null
  cover: { image: StaticImageData; alt: string }
}

const BlogCard = ({
  slug,
  title,
  description,
  date,
  readTime,
  cover,
}: BlogCardProps) => {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const startLoad = useCallback(() => {
    setLoading(true)
  }, [])

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <Link
      href={`/blog/${slug}?${searchParams.toString()}`}
      className="ring-offset-root border-secondary ring-secondary group sm:hover:ring-primary sm:active:ring-active relative flex max-h-44 min-h-44 animate-text-focus cursor-pointer overflow-hidden border-b-2 backdrop-blur-md transition-all duration-200 ease-in-out last:border-b-0 sm:border-b-0 sm:ring-2 sm:hover:ring-offset-4"
    >
      {loading && (
        <ThemeProvider theme={darkTheme}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={160}
            height={160}
            className="bg-dark-800! min-h-40 min-w-40"
          />
        </ThemeProvider>
      )}
      <Image
        quality={100}
        src={cover.image}
        alt={cover.alt}
        className="hidden h-full max-h-44 min-h-44 max-w-44 min-w-44 animate-text-focus xs:block"
        onLoadStart={startLoad}
        onLoad={handleLoad}
      />
      <div className="flex flex-col space-y-2 overflow-hidden px-6 py-3">
        <h1 className="line-clamp-2 text-left text-lg transition-all duration-200 ease-in-out">
          <AnimatedUnderline>{title}</AnimatedUnderline>
        </h1>
        <p className="line-clamp-3 max-h-16 min-h-0 flex-1 text-left text-sm md:w-full">
          {description}
        </p>
        <div className="mt-auto flex w-full shrink-0 items-center justify-start gap-4 xs:justify-between">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt />
            <div className="text-sm whitespace-nowrap">{date}</div>
          </div>
          {readTime !== null && (
            <div className="flex items-center space-x-2">
              <FaRegClock />
              <div className="text-sm whitespace-nowrap">
                {readTime} min read
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
