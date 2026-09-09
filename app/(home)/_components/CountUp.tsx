'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const DURATION_MS = 1200

// Same guard as work/_components/Highlights.tsx uses.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

interface CountUpProps {
  value: number
  /** Milliseconds to wait after the number scrolls into view. */
  delay?: number
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The final number is what renders on the server and during hydration, so it is
 * correct without JavaScript and for crawlers; the reset to zero happens in a
 * layout effect, before the browser paints, so the real figure never flashes.
 */
const CountUp = ({ value, delay = 0 }: CountUpProps) => {
  const [displayed, setDisplayed] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setDisplayed(0)

    let frame = 0
    let timer = 0
    let startedAt = 0

    const step = (now: number) => {
      if (!startedAt) startedAt = now
      const progress = Math.min((now - startedAt) / DURATION_MS, 1)
      setDisplayed(Math.round(easeOutCubic(progress) * value))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(() => {
          frame = requestAnimationFrame(step)
        }, delay)
      },
      { threshold: 0.5 }
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [value, delay])

  return <span ref={ref}>{displayed}</span>
}

export default CountUp
