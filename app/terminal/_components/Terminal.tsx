'use client'
import { useRouter } from 'next/navigation'
import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const TYPE_MS = 45
/** Long enough to read the "→ /work" line before the route changes. */
const NAV_DELAY_MS = 700

/** Side effects a command can reach for; the terminal owns the router. */
export interface CommandContext {
  go: (path: string) => void
  open: (url: string) => void
}

/** Static output, or a function of the arguments typed after the name. */
export type Command =
  | ReactNode
  | ((args: string[], context: CommandContext) => ReactNode)

export type Registry = Record<string, Command>

const CLEAR = 'CLEAR'

interface Line {
  id: number
  command: string
  output: ReactNode
}

interface TerminalProps {
  registry: Registry
  /** Commands offered as clickable chips. */
  suggestions: string[]
  /** Run automatically on first paint. */
  autoRun: string
  prompt?: string
  /**
   * 'page' draws its own window chrome and sizes to its content; 'embedded'
   * drops the frame and fills whatever container it is given, for the widget.
   */
  variant?: 'page' | 'embedded'
  /**
   * Takes the caret when it turns true. A page mounts focused; the widget only
   * wants focus once its panel is open on this tab, never on page load.
   */
  active?: boolean
}

const Terminal = ({
  registry,
  suggestions,
  autoRun,
  prompt = 'denes@arcade-lab',
  variant = 'page',
  active = true,
}: TerminalProps) => {
  const isEmbedded = variant === 'embedded'
  const router = useRouter()
  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState('')
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(true)
  const nextId = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const history = useRef<string[]>([])
  // -1 means "not browsing history" — the live input is whatever was typed.
  const cursor = useRef(-1)

  const clearTimers = useCallback(() => {
    for (const timer of timers.current) {
      window.clearInterval(timer)
      window.clearTimeout(timer)
    }
    timers.current = []
  }, [])

  const context = useMemo<CommandContext>(
    () => ({
      go: (path) => {
        timers.current.push(
          window.setTimeout(() => router.push(path), NAV_DELAY_MS)
        )
      },
      open: (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
      },
    }),
    [router]
  )

  const resolve = useCallback(
    (raw: string): ReactNode => {
      const [name, ...args] = raw.trim().split(/\s+/)
      if (!name) return null
      if (name === 'clear') return CLEAR

      const command = registry[name]
      if (command === undefined) {
        return (
          <p className="text-alert-error">
            command not found: {name} — try{' '}
            <span className="text-primary">help</span>
          </p>
        )
      }
      return typeof command === 'function' ? command(args, context) : command
    },
    [registry, context]
  )

  // Types the command out character by character, then prints its output.
  const run = useCallback(
    (raw: string) => {
      const command = raw.trim()
      if (!command) return
      clearTimers()
      setBusy(true)

      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const commit = () => {
        const output = resolve(command)
        setTyping('')
        if (output === CLEAR) {
          setLines([])
        } else {
          setLines((prev) => [
            ...prev,
            { id: nextId.current++, command, output },
          ])
        }
        setBusy(false)
      }

      if (reduced) {
        commit()
        return
      }

      let index = 0
      const tick = window.setInterval(() => {
        index += 1
        setTyping(command.slice(0, index))
        if (index >= command.length) {
          window.clearInterval(tick)
          timers.current.push(window.setTimeout(commit, 160))
        }
      }, TYPE_MS)
      timers.current.push(tick)
    },
    [resolve, clearTimers]
  )

  // Cancelling on cleanup is what keeps StrictMode's double invoke honest: the
  // first run is torn down before the second starts, so it executes once.
  useEffect(() => {
    run(autoRun)
    return clearTimers
  }, [run, autoRun, clearTimers])

  // preventScroll stops the page jumping to the terminal when it takes focus.
  useEffect(() => {
    if (!active) return
    inputRef.current?.focus({ preventScroll: true })
  }, [active])

  // Stick to the bottom as output arrives.
  useEffect(() => {
    const node = scrollRef.current
    if (!node || (lines.length === 0 && typing === '')) return
    node.scrollTo({ top: node.scrollHeight })
  }, [lines, typing])

  const submit = (raw: string) => {
    const command = raw.trim()
    if (!command) return
    history.current = [...history.current, command]
    cursor.current = -1
    run(command)
    setInput('')
    // Keeps the caret where it was after a suggestion chip is clicked, so the
    // next command can be typed straight away.
    inputRef.current?.focus({ preventScroll: true })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (busy) return

    if (event.key === 'Enter') {
      submit(input)
      return
    }

    // ArrowUp walks back through what was typed; ArrowDown walks forward and
    // falls off the end into an empty prompt, the way a shell behaves.
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (history.current.length === 0) return
      event.preventDefault()

      const last = history.current.length - 1
      const position =
        event.key === 'ArrowUp'
          ? cursor.current === -1
            ? last
            : Math.max(0, cursor.current - 1)
          : cursor.current === -1
            ? -1
            : cursor.current + 1

      if (position > last || position === -1) {
        cursor.current = -1
        setInput('')
        return
      }
      cursor.current = position
      setInput(history.current[position])
    }
  }

  return (
    <div
      className={`flex flex-col ${
        isEmbedded ? 'min-h-0 flex-1' : 'ring-secondary ring-2 backdrop-blur-md'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* window chrome — the widget supplies its own header */}
      {!isEmbedded && (
        <div className="border-secondary flex items-center gap-4 border-b-2 px-5 py-3">
          <div className="flex shrink-0 space-x-2">
            <span className="bg-macos-red h-3 w-3 rounded-full" />
            <span className="bg-macos-yellow h-3 w-3 rounded-full" />
            <span className="bg-macos-green h-3 w-3 rounded-full" />
          </div>
          <span className="text-dark-400 truncate text-xs tracking-widest">
            {prompt}: ~
          </span>
        </div>
      )}

      {/* scrollback */}
      <div
        ref={scrollRef}
        className={`flex flex-col gap-6 overflow-y-auto ${
          isEmbedded
            ? 'min-h-0 flex-1 p-4'
            : 'max-h-[65dvh] min-h-[26rem] p-5 sm:p-7'
        }`}
      >
        {lines.map(({ id, command, output }) => (
          <div key={id} className="flex flex-col gap-3">
            <p className="text-sm">
              <span className="text-primary">{prompt}</span>
              <span className="text-dark-500">:~$</span>{' '}
              <span className="text-dark-100">{command}</span>
            </p>
            <div className="text-dark-200 min-w-0 text-sm leading-relaxed">
              {output}
            </div>
          </div>
        ))}

        {/* live prompt */}
        <p className="text-sm">
          <span className="text-primary">{prompt}</span>
          <span className="text-dark-500">:~$</span>{' '}
          <span className="text-dark-100">{busy ? typing : input}</span>
          <span className="animate-caret text-primary ml-0.5 inline-block">
            ▊
          </span>
        </p>

        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal input"
          spellCheck={false}
          autoComplete="off"
          className="sr-only"
        />
      </div>

      {/* clickable commands */}
      <div
        className={`border-secondary flex flex-wrap items-center gap-2 border-t-2 ${
          isEmbedded ? 'px-4 py-3' : 'px-5 py-4'
        }`}
      >
        <span className="text-dark-500 mr-1 text-xs tracking-widest uppercase">
          run
        </span>
        {suggestions.map((command) => (
          <button
            key={command}
            type="button"
            disabled={busy}
            onClick={() => submit(command)}
            className="ring-dark-500 text-dark-300 hover:ring-primary hover:text-primary cursor-pointer px-3 py-1 text-xs ring-1 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Terminal
