'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

const SITE_KEY = process.env.NEXT_PUBLIC_TS_SITE_KEY
const SCRIPT_ID = 'turnstile-check'
// Explicit: implicit mode only scans at script load, so a widget mounted later
// gets nothing rendered into it.
const SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

interface RenderOptions {
  sitekey: string
  theme: 'dark' | 'light' | 'auto'
  size: 'normal' | 'compact' | 'flexible'
  callback: (token: string) => void
  'expired-callback': () => void
  'timeout-callback': () => void
  'error-callback': () => void
}

interface TurnstileApi {
  render: (element: HTMLElement, options: RenderOptions) => string
  remove: (widgetId: string) => void
  reset: (widgetId?: string) => void
}

type TurnstileWindow = Window & typeof globalThis & { turnstile?: TurnstileApi }

// Never removed: re-adding the tag makes Cloudflare skip the widget entirely.
let loader: Promise<void> | undefined

const load = () => {
  if (loader) return loader

  loader = new Promise<void>((resolve, reject) => {
    if ((window as TurnstileWindow).turnstile) return resolve()

    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    script.defer = true
    script.id = SCRIPT_ID
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Turnstile failed to load.'))
    document.head.appendChild(script)
  })

  return loader
}

const useTurnstile = () => {
  const [token, setToken] = useState<string | null>(null)
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)

  useEffect(() => {
    let active = true

    const render = () => {
      const api = (window as TurnstileWindow).turnstile
      if (!active || !api || !container.current || !SITE_KEY) return

      widget.current = api.render(container.current, {
        sitekey: SITE_KEY,
        theme: 'dark',
        size: 'flexible',
        callback: setToken,
        // Tokens lapse after a few minutes; dropping them keeps a stale form
        // from failing silently.
        'expired-callback': () => setToken(null),
        'timeout-callback': () => setToken(null),
        'error-callback': () => setToken(null),
      })
    }

    // Not turnstile.ready() — it refuses to run against an async/defer tag.
    load()
      .then(render)
      .catch((error) => console.error(error))

    return () => {
      active = false
      if (widget.current) {
        ;(window as TurnstileWindow).turnstile?.remove(widget.current)
        widget.current = null
      }
    }
  }, [])

  const reset = useCallback(() => {
    setToken(null)
    if (widget.current)
      (window as TurnstileWindow).turnstile?.reset(widget.current)
  }, [])

  return { token, container, reset }
}

export default useTurnstile
