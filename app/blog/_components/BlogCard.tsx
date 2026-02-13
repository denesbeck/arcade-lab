'use client'
import { Skeleton, ThemeProvider } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { darkTheme } from '@/theme'

interface BlogCardProps {
  id: number
  title: string
  description: string
  date: string
  tags: string[]
  content: string
  cover: { image: StaticImageData; alt: string }
}

const BlogCard = ({
  id,
  title,
  description,
  date,
  tags,
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
      href={`/blog/${id}?${searchParams.toString()}`}
      className={`flex overflow-hidden relative border-b-2 transition-all duration-200 ease-in-out cursor-pointer sm:border-b-0 sm:ring-2 last:border-b-0 ring-offset-root border-secondary ${tags.includes('write-up') ? 'ring-blue-300' : 'ring-primary'} group animate-text-focus max-h-[11rem] min-h-[11rem] sm:active:ring-active sm:hover:ring-offset-4`}
    >
      {loading && (
        <ThemeProvider theme={darkTheme}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={160}
            height={160}
            className="min-w-40 min-h-40 !bg-dark-800"
          />
        </ThemeProvider>
      )}
      <Image
        quality={100}
        src={cover.image}
        alt={cover.alt}
        className="hidden h-full max-h-44 min-w-44 min-h-44 xs:block animate-text-focus max-w-44"
        onLoadStart={startLoad}
        onLoad={handleLoad}
      />
      <div className="flex overflow-auto flex-col py-3 px-6 space-y-2">
        <h1 className="relative text-lg text-left transition-all duration-200 ease-in-out after:bg-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200 after:ease-in-out after:content-[''] group-hover:after:w-full">
          {title}
        </h1>
        <p className="flex-1 text-sm text-left md:w-full">{description}</p>
        <div className="flex gap-4 justify-start items-center w-full xs:justify-between">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt />
            <div className="text-sm whitespace-nowrap">{date}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
