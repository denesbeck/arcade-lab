import { useEffect } from 'react'
import { useTurnstile } from '../_hooks'

interface ITurnstile {
  getToken: (token: string) => void
}

const SITE_KEY = process.env.NEXT_PUBLIC_TS_SITE_KEY
const Turnstile = ({ getToken }: ITurnstile) => {
  const { token } = useTurnstile()

  useEffect(() => {
    if (token) getToken(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div
      className="p-0 cf-turnstile"
      data-sitekey={SITE_KEY}
      data-size="flexible"
      data-callback="onTurnstileSuccess"
      data-theme="dark"
    />
  )
}

export default Turnstile
