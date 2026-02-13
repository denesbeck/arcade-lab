'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface NavitemProps {
  label: string
  path: string
}

const Navitem = ({ label, path }: NavitemProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname === path) {
      document.title = `Arcade Lab | ${label}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Link
      href={`${path}${searchParams ? '?' + searchParams : ''}`}
      className={`ring-primary text-center hover:bg-secondary min-w-[6rem] -skew-x-6 cursor-pointer px-4 py-2 text-lg underline-offset-4 transition-colors duration-200 ease-in-out hover:shadow-[8px_8px_0px_0px_black] ${pathname === path || (path === '/blog' && pathname.startsWith('/blog')) ? 'bg-primary! text-black underline underline-offset-4 shadow-[8px_8px_0px_0px_black]' : ''}`}
    >
      {label}
    </Link>
  )
}

export default Navitem
