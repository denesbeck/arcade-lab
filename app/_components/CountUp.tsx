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
  /** Zero-pad to this many digits, e.g. 2 renders 8 as "08". */
  pad?: number
  /** Tick by one every `stepMs` instead of easing over a fixed duration. */
  stepMs?: number
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The final number is what renders on the server, so it is correct without
 * JavaScript and for crawlers. It stays hidden (see globals.css) until the
 * layout effect resets it to zero, so the real figure never flashes first.
 */
const CountUp = ({ value, delay = 0, pad = 0, stepMs }: CountUpProps) => {
  const [displayed, setDisplayed] = useState(value)
  const [pending, setPending] = useState(true)
  const ref = useRef<HTMLSpanElement>(null)

  useIsomorphicLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    setPending(false)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setDisplayed(0)

    let frame = 0
    let timer = 0
    let startedAt = 0

    const step = (now: number) => {
      if (!startedAt) startedAt = now
      const elapsed = now - startedAt
      const next = stepMs
        ? Math.min(Math.floor(elapsed / stepMs) + 1, value)
        : Math.round(easeOutCubic(Math.min(elapsed / DURATION_MS, 1)) * value)
      setDisplayed(next)
      if (next < value) frame = requestAnimationFrame(step)
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
  }, [value, delay, stepMs])

  return (
    <span ref={ref} data-count-pending={pending ? '' : undefined}>
      {String(displayed).padStart(pad, '0')}
    </span>
  )
}

export default CountUp
