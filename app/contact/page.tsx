'use client'
import { useCallback, useRef, useState } from 'react'
import {
  AnimatedBorder,
  Button,
  GoBack,
  Heading2,
  Input,
  TextArea,
} from '@/_components'
import { useAlert } from '@/_components/AlertBox/_hooks'
import { Turnstile } from './_components'
import type { TurnstileHandle } from './_components/Turnstile'
import validate from './_utils/validate'
import { contact } from './actions'

const Contact = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const turnstile = useRef<TurnstileHandle>(null)
  // State, not a ref: the submit button's disabled state has to react to it.
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { alert } = useAlert('global')

  const handleSubmit = useCallback(async () => {
    const { valid, messages } = validate(
      nameRef.current?.value || '',
      emailRef.current?.value || '',
      messageRef.current?.value || ''
    )
    if (!valid) {
      alert({
        id: 'contact-invalid',
        title: 'Invalid input',
        message: messages.join('\n'),
        severity: 'error',
      })
      return
    }

    if (!token) {
      alert({
        id: 'contact-unverified',
        title: 'Verification pending',
        message: 'Wait for the human check to finish, then submit again.',
        severity: 'warning',
      })
      return
    }

    setLoading(true)
    const res = await contact({
      token,
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || '',
    })
    setLoading(false)

    // The token is spent either way; the widget needs a fresh challenge.
    turnstile.current?.reset()

    if (!res.success) {
      alert({
        id: 'contact-error',
        title: 'Error',
        message: res.message,
        severity: 'error',
      })
      return
    }

    alert({
      id: 'contact-success',
      title: 'Success',
      message: res.message,
      severity: 'success',
    })
    nameRef.current!.value = ''
    emailRef.current!.value = ''
    messageRef.current!.value = ''
  }, [alert, token])

  return (
    <div className="flex flex-col w-full min-h-[calc(100dvh-100px)]">
      <GoBack fallbackUrl="/" />
      <div className="flex flex-col items-center pt-6 my-auto animate-slide-in-from-bottom pb-15 lg:pb-25">
        <AnimatedBorder>
          <div className="flex relative flex-col gap-4 p-6 min-w-max ring-2 transition-all duration-200 ease-in-out hover:ring-gray-500 hover:ring-offset-2 ring-secondary ring-offset-root h-max max-w-[90dvw] backdrop-blur-md">
            <Heading2>Contact </Heading2>
            <Input placeholder="Name" inputRef={nameRef} />
            <Input placeholder="Email" inputRef={emailRef} />
            <TextArea placeholder="Message" messageRef={messageRef} />
            <Turnstile ref={turnstile} onToken={setToken} />
            <Button
              disabled={!token}
              label={'Submit'}
              action={handleSubmit}
              loading={loading}
            />
          </div>
        </AnimatedBorder>
      </div>
    </div>
  )
}

export default Contact
