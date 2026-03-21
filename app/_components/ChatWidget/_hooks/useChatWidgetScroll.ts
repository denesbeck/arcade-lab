import { useEffect, useRef } from 'react'
import type { Message } from '../_config/chat-widget'

const useChatWidgetScroll = (
  messages: Message[],
  streamingContent: string,
  isOpen: boolean
) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll on new messages and streaming content
  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, streamingContent])

  // Scroll and focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        const container = messagesContainerRef.current
        if (container) {
          container.scrollTop = container.scrollHeight
        }
        inputRef.current?.focus()
      })
    }
  }, [isOpen])

  return { messagesContainerRef, inputRef }
}

export default useChatWidgetScroll
