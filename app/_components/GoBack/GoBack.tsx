'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import previousInternalPath from './_utils/previousInternalPath'

interface IGoBack {
  fallbackUrl: string
}

const GoBack = ({ fallbackUrl }: IGoBack) => {
  const { back, push } = useRouter()
  const pathname = usePathname()
  const [previous, setPrevious] = useState<string | null>(null)

  // Per route, not per click: the component survives a blog → blog navigation.
  useEffect(() => {
    setPrevious(
      previousInternalPath({
        nav: window.navigation,
        referrer: document.referrer,
        origin: window.location.origin,
        current: pathname,
      })
    )
  }, [pathname])

  const handleGoBack = useCallback(() => {
    if (previous) return back()

    push(fallbackUrl)
  }, [back, push, previous, fallbackUrl])

  const target = previous ?? fallbackUrl
  const label = target === '/' ? 'home' : target

  return (
    <button
      type="button"
      onClick={handleGoBack}
      aria-label={`Go back to ${label}`}
      className="group text-dark-300 hover:text-primary flex min-w-0 cursor-pointer items-center gap-2 text-sm transition-colors duration-200"
    >
      <span
        aria-hidden
        className="text-primary shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        ◀
      </span>
      <span className="min-w-0 truncate underline decoration-dashed underline-offset-4">
        {label}
      </span>
    </button>
  )
}

export default GoBack
