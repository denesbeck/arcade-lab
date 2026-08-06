'use client'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { TbChevronDown } from 'react-icons/tb'

const COLLAPSED_HEIGHT = 240

const LINE_HEIGHT = 22.75
const ITEM_GAP = 8
const CHARS_PER_LINE = 48

const estimateHeight = (highlights: string[]) =>
  highlights.reduce(
    (total, point) =>
      total + Math.ceil(point.length / CHARS_PER_LINE) * LINE_HEIGHT,
    0
  ) +
  Math.max(highlights.length - 1, 0) * ITEM_GAP

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

interface IHighlights {
  highlights: string[]
}

const Highlights = ({ highlights }: IHighlights) => {
  const [expanded, setExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(() =>
    estimateHeight(highlights)
  )
  const listRef = useRef<HTMLUListElement>(null)

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => setContentHeight(list.scrollHeight)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  const toggle = useCallback(() => setExpanded((prev) => !prev), [])

  if (highlights.length === 0) return null

  const hasOverflow = contentHeight > COLLAPSED_HEIGHT

  return (
    <div className="mt-1 flex flex-col gap-2">
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? contentHeight : COLLAPSED_HEIGHT,
          maskImage:
            !expanded && hasOverflow
              ? 'linear-gradient(to bottom, black 60%, transparent 100%)'
              : undefined,
        }}
      >
        <ul ref={listRef} className="flex flex-col gap-2">
          {highlights.map((point) => (
            <li
              key={point}
              className="text-dark-200 before:bg-primary/40 relative pl-4 text-sm leading-relaxed before:absolute before:top-[0.55rem] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:content-['']"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
      {hasOverflow && (
        <button
          type="button"
          onClick={toggle}
          className="text-dark-300 hover:text-primary mt-1 flex w-fit cursor-pointer items-center gap-1 text-xs transition-colors duration-200"
        >
          <TbChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
          <span>{expanded ? 'Show less' : 'Show more'}</span>
        </button>
      )}
    </div>
  )
}

export default Highlights
