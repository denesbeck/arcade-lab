'use client'
import { RefObject, useState } from 'react'

const SEGMENTS = 20
// Past this share of the budget the bar warns instead of reading as progress.
const WARN_AT = 0.9

interface IMeter {
  filled: number
  warn: boolean
}

// Same cell shape as the inventory meter on /about, so the counter reads as a
// bar the site already uses rather than a new widget.
const Meter = ({ filled, warn }: IMeter) => (
  <div aria-hidden className="flex shrink-0 gap-1">
    {Array.from({ length: SEGMENTS }, (_, cell) => (
      <span
        key={cell}
        className={`h-2.5 w-1.5 transition-colors duration-150 ${
          cell < filled
            ? warn
              ? 'bg-alert-warning'
              : 'bg-primary'
            : 'ring-dark-600 ring-1'
        }`}
      />
    ))}
  </div>
)

interface ITextArea {
  label: string
  placeholder: string
  messageRef: RefObject<HTMLTextAreaElement | null>
  /** A full bar is a real limit — the field refuses input past it. */
  max: number
  /** Bumped by the page after a send, to resync the counter after it clears. */
  resetKey?: number
}

const TextArea = ({
  label,
  placeholder,
  messageRef,
  max,
  resetKey = 0,
}: ITextArea) => {
  const id = label.toLowerCase()
  const [count, setCount] = useState(0)
  const [lastReset, setLastReset] = useState(resetKey)

  // The page empties the field by writing to the DOM node, which React never
  // sees; resyncing here beats an effect, which would paint the stale count
  // first and trips the exhaustive-deps rule for a dependency it only watches.
  if (resetKey !== lastReset) {
    setLastReset(resetKey)
    setCount(messageRef.current?.value.length ?? 0)
  }

  const warn = count >= max * WARN_AT
  // Any input lights at least one cell — a bar that stays dark for 100
  // characters reads as broken rather than empty.
  const filled =
    count === 0 ? 0 : Math.min(SEGMENTS, Math.ceil((count / max) * SEGMENTS))

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label
          htmlFor={id}
          className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase"
        >
          {label}
        </label>
        <Meter filled={filled} warn={warn} />
        <span
          className={`text-[0.625rem] tabular-nums ${warn ? 'text-alert-warning' : 'text-dark-500'}`}
        >
          {count} / {max}
        </span>
      </div>
      <textarea
        id={id}
        name={id}
        rows={8}
        maxLength={max}
        placeholder={placeholder}
        onChange={(event) => setCount(event.target.value.length)}
        className="bg-dark-1000 text-dark-100 placeholder:text-dark-400 ring-dark-500 focus-visible:ring-primary w-full resize-y px-4 py-3 text-sm ring-1 transition-colors duration-200 outline-hidden"
        ref={messageRef}
      />
    </div>
  )
}

export default TextArea
