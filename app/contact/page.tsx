'use client'
import { useCallback, useRef, useState } from 'react'
import { Button, GoBack, Input, Panel, TextArea } from '@/_components'
import { useAlert } from '@/_components/AlertBox/_hooks'
import { SignalCard, Turnstile } from './_components'
import type { TurnstileHandle } from './_components/Turnstile'
import validate from './_utils/validate'
import { contact } from './actions'

// Deliberately under the lambda's own 2000-character cap, so the meter reads as
// a budget to spend rather than a ceiling nobody reaches.
const MESSAGE_MAX = 500

const Contact = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const turnstile = useRef<TurnstileHandle>(null)
  // State, not a ref: the submit button's disabled state has to react to it.
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  // Bumped on a successful send so the message counter resyncs to the cleared
  // field; incremented per send, never per keystroke.
  const [sent, setSent] = useState(0)
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
    setSent((count) => count + 1)
  }, [alert, token])

  return (
    <div className="w-full min-w-0 overflow-x-clip px-4 pt-6 pb-24 sm:px-6">
      <div className="mb-8">
        <GoBack fallbackUrl="/" />
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[23rem_1fr] lg:gap-14">
        <SignalCard>
          <Turnstile ref={turnstile} onToken={setToken} />
        </SignalCard>

        <div className="flex min-w-0 flex-col gap-14">
          <Panel title="Message" meta="3 fields">
            <div className="flex max-w-[44rem] flex-col gap-6">
              <Input
                label="Name"
                placeholder="Who's sending this"
                inputRef={nameRef}
                autoComplete="name"
              />
              <Input
                label="Email"
                placeholder="Where the reply goes"
                inputRef={emailRef}
                type="email"
                autoComplete="email"
              />
              <TextArea
                label="Message"
                placeholder="What's on your mind"
                messageRef={messageRef}
                max={MESSAGE_MAX}
                resetKey={sent}
              />
            </div>
          </Panel>

          <Panel
            title="Transmission"
            meta={token ? 'verified' : 'awaiting check'}
          >
            <div className="flex max-w-[44rem] flex-col gap-5">
              <Button
                disabled={!token}
                label="Send"
                action={handleSubmit}
                loading={loading}
              />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

export default Contact
