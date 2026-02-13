import { useEffect, useState } from 'react'

type Context = Window &
  typeof globalThis & {
    onTurnstileSuccess?: (token: string) => void
    turnstile?: object
  }

const useTurnstile = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const w: Context = window
    // Define the callback function globally so Turnstile can call it
    w.onTurnstileSuccess = (token: string) => {
      setToken(token)
    }

    const script = document.createElement('script')
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js`
    script.async = true
    script.defer = true
    script.id = 'turnstile-check'
    document.body.appendChild(script)

    return () => {
      document.getElementById('turnstile-check')?.remove()
      delete w.onTurnstileSuccess
      delete w.turnstile
    }
  }, [])

  return {
    token,
  }
}

export default useTurnstile
