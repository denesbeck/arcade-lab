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
    <div className="flex flex-col items-start px-6 mt-8 max-w-screen w-4xl">
      <div className="font-bold">Keep reading:</div>
      <div className="grid grid-cols-1 gap-4 py-4 w-full sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="flex overflow-hidden flex-col transition-all duration-200 ease-in-out cursor-pointer ring-2 ring-offset-root backdrop-blur-md border-secondary ring-secondary group animate-text-focus sm:hover:ring-primary sm:active:ring-active sm:hover:ring-offset-4"
          >
            <Image
              quality={100}
              src={post.cover.original}
              alt={post.cover.alt}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
              className="object-cover w-full h-32"
            />
            <div className="flex flex-col flex-1 py-3 px-4 space-y-2">
              <h2 className="relative text-base text-left transition-all duration-200 ease-in-out after:bg-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200 after:ease-in-out after:content-[''] group-hover:after:w-full">
                {post.title}
              </h2>
              <p className="flex-1 text-sm text-left">{post.description}</p>
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
