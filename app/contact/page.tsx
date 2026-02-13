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
import validate from './_utils/validate'
import { contact } from './actions'

const Contact = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const tsToken = useRef<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { alert } = useAlert('global')

  const handleTokenReceived = useCallback((token: string) => {
    tsToken.current = token
  }, [])

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

    setLoading(true)
    if (tsToken.current) {
      const res = await contact({
        token: tsToken.current,
        name: nameRef.current?.value || '',
        email: emailRef.current?.value || '',
        message: messageRef.current?.value || '',
      })

      if (!res.success) {
        alert({
          id: 'contact-error',
          title: 'Error',
          message: res.message,
          severity: 'error',
        })
      } else {
        alert({
          id: 'contact-success',
          title: 'Success',
          message: res.message,
          severity: 'success',
        })
      }
      setLoading(false)
      nameRef.current!.value = ''
      emailRef.current!.value = ''
      messageRef.current!.value = ''
      // @ts-expect-error: Turnstile object should be present
      window.turnstile.reset()
      return
    }
  }, [alert])

  return (
    <div className="flex flex-col min-h-[calc(100dvh-100px)]">
      <GoBack fallbackUrl="/" />
      <div className="flex flex-col items-center pt-6 my-auto w-dvw animate-slide-in-from-bottom pb-[60px] lg:pb-[100px]">
        <AnimatedBorder>
          <div className="flex relative flex-col p-6 min-w-max ring-2 transition-all duration-200 ease-in-out hover:ring-gray-500 hover:ring-offset-2 ring-secondary ring-offset-root h-max max-w-[90dvw] gap-[1rem] backdrop-blur-md">
            <Heading2>Contact </Heading2>
            <Input placeholder="Name" inputRef={nameRef} />
            <Input placeholder="Email" inputRef={emailRef} />
            <TextArea placeholder="Message" messageRef={messageRef} />
            <Turnstile getToken={handleTokenReceived} />
            <Button
              disabled={!tsToken}
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
