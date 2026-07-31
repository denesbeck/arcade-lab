import Image from 'next/image'
import Link from 'next/link'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BlogEntry } from '../_interfaces/blog'

interface IRecommendedPosts {
  posts: BlogEntry[]
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
            className="ring-offset-root border-secondary ring-secondary group sm:hover:ring-primary sm:active:ring-active flex animate-text-focus cursor-pointer flex-col overflow-hidden ring-2 backdrop-blur-md transition-all duration-200 ease-in-out sm:hover:ring-offset-4"
          >
            <Image
              quality={100}
              src={post.cover.original}
              alt={post.cover.alt}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
              className="h-32 w-full object-cover transition-all duration-200 ease-in-out group-hover:h-full"
            />
            <div className="flex flex-1 flex-col space-y-2 px-4 py-3">
              <h2 className="after:bg-primary relative text-left text-base transition-all duration-200 ease-in-out after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200 after:ease-in-out after:content-[''] group-hover:after:w-full">
                {post.title}
              </h2>
              <p className="flex-1 text-left text-sm">{post.description}</p>
              <div className="flex items-center space-x-2">
                <FaRegCalendarAlt />
                <div className="text-sm whitespace-nowrap">{post.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendedPosts
