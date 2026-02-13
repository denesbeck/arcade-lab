import Link from 'next/link'

interface ITag {
  name: string
}

const Tag = ({ name }: ITag) => {
  return (
    <Link
      href={{
        pathname: `/blog`,
        query: { tag: name },
      }}
      className="no-underline transition-all duration-200 ease-in-out cursor-pointer hover:underline hover:scale-110 text-active decoration-dashed underline-offset-4"
    >
      #{name}
    </Link>
  )
}

export default Tag
