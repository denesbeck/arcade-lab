'use client'
import { type Ref, useEffect, useImperativeHandle } from 'react'
import { useTurnstile } from '../_hooks'

export interface TurnstileHandle {
  reset: () => void
}

interface ITurnstile {
  ref?: Ref<TurnstileHandle>
  onToken: (token: string | null) => void
}

const Turnstile = ({ ref, onToken }: ITurnstile) => {
  const { token, container, reset } = useTurnstile()

  useImperativeHandle(ref, () => ({ reset }), [reset])

  useEffect(() => {
    onToken(token)
  }, [token, onToken])

  return <div ref={container} />
}

export default Turnstile
