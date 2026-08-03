import Image from 'next/image'
import Link from 'next/link'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { AnimatedUnderline } from '@/_components'
import { BlogEntryWithReadTime } from '../_interfaces/blog'

interface IRecommendedPosts {
  posts: BlogEntryWithReadTime[]
}

const RecommendedPosts = ({ posts }: IRecommendedPosts) => {
  if (posts.length === 0) return null

  return (
    <div className="mt-8 flex w-4xl max-w-screen flex-col items-start px-6">
      <div className="font-bold">Keep reading:</div>
      <div className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="ring-offset-root border-secondary ring-secondary group sm:hover:ring-primary sm:active:ring-active relative flex animate-text-focus cursor-pointer flex-col overflow-hidden ring-2 backdrop-blur-md transition-all duration-200 ease-in-out sm:hover:ring-offset-4"
          >
            <Image
              quality={100}
              src={post.cover.original}
              alt={post.cover.alt}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
              className="absolute top-0 left-0 h-32 w-full object-cover transition-all duration-200 ease-in-out group-hover:h-full group-hover:brightness-40"
            />
            <div className="mt-32 flex flex-1 flex-col space-y-2 px-4 py-3">
              <h2 className="group-hover:text-dark-50 relative z-10 text-left text-base transition-all duration-200 ease-in-out group-hover:font-bold">
                <AnimatedUnderline>{post.title}</AnimatedUnderline>
              </h2>
              <p className="flex-1 text-left text-sm">{post.description}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <div className="flex items-center space-x-2">
                  <FaRegCalendarAlt />
                  <div className="text-sm whitespace-nowrap">{post.date}</div>
                </div>
                {post.readTime !== null && (
                  <div className="group-hover:text-dark-50 z-10 flex items-center space-x-2 transition-all duration-200 ease-in-out group-hover:font-bold">
                    <FaRegClock />
                    <div className="text-sm whitespace-nowrap">
                      {post.readTime} min read
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendedPosts
