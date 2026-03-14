'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { IoChatbubbleEllipses, IoClose, IoSend } from 'react-icons/io5'
import Markdown from 'react-markdown'
import chatMarkdownComponents from './MarkdownComponents'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm an AI assistant for Denes Beck's portfolio. Ask me about blog posts, projects, skills, or anything you'd like to know!",
}

const MAX_USER_MESSAGES = 15
const MIN_WIDTH = 320
const MIN_HEIGHT = 400
const DEFAULT_WIDTH = 400
const DEFAULT_HEIGHT = 500

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [size, setSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  })

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isResizing = useRef(false)
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })

  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const isAtLimit = userMessageCount >= MAX_USER_MESSAGES

  // Scroll to bottom — uses scrollTop instead of scrollIntoView for reliability
  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [])

  // Scroll on new messages and streaming content
  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent, scrollToBottom])

  // Scroll when chat opens
  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure DOM has rendered
      requestAnimationFrame(() => {
        scrollToBottom()
        inputRef.current?.focus()
      })
    }
  }, [isOpen, scrollToBottom])

  // --- Resize handling ---
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      isResizing.current = true
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      }

      const handleResizeMove = (moveEvent: MouseEvent) => {
        if (!isResizing.current) return
        const deltaX = resizeStart.current.x - moveEvent.clientX
        const deltaY = resizeStart.current.y - moveEvent.clientY
        setSize({
          width: Math.max(MIN_WIDTH, resizeStart.current.width + deltaX),
          height: Math.max(MIN_HEIGHT, resizeStart.current.height + deltaY),
        })
      }

      const handleResizeEnd = () => {
        isResizing.current = false
        document.removeEventListener('mousemove', handleResizeMove)
        document.removeEventListener('mouseup', handleResizeEnd)
      }

      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)
    },
    [size]
  )

  // --- Send message with streaming ---
  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading || isAtLimit) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setStreamingContent('')

    try {
      const apiMessages = updatedMessages
        .filter((_, i) => i > 0)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('text/event-stream')) {
        // Streaming response — read SSE chunks
        const reader = response.body?.getReader()
        if (!reader) throw new Error('No reader')

        const decoder = new TextDecoder()
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  accumulated += parsed.text
                  setStreamingContent(accumulated)
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        }

        // Finalize — move streaming content into messages
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: accumulated || 'Sorry, I could not process your request.',
          },
        ])
        setStreamingContent('')
      } else {
        // Non-streaming fallback (e.g., rate limit error returned as JSON)
        const data = await response.json()
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.response ||
              data.error ||
              'Sorry, I could not process your request.',
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 flex justify-center items-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 cursor-pointer bg-primary text-root hover:brightness-110 hover:scale-105 active:scale-95"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <IoClose className="w-6 h-6" />
        ) : (
          <IoChatbubbleEllipses className="w-6 h-6" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed right-6 bottom-24 z-50 flex flex-col rounded-lg border-2 shadow-2xl border-dark-600 bg-dark-900"
          style={{ width: size.width, height: size.height }}
        >
          {/* Resize handle — top-left corner */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 z-10 w-4 h-4 cursor-nw-resize"
            title="Drag to resize"
          >
            <svg
              className="w-3 h-3 m-0.5 text-dark-400"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <circle cx="2" cy="2" r="1.5" />
              <circle cx="6" cy="2" r="1.5" />
              <circle cx="2" cy="6" r="1.5" />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b rounded-t-lg border-dark-600 bg-dark-800">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-text-dark">
                Arcade Lab Assistant
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-primary text-root'
                      : 'bg-dark-700 text-text-dark'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <Markdown components={chatMarkdownComponents}>
                      {message.content}
                    </Markdown>
                  ) : (
                    <span className="whitespace-pre-wrap">
                      {message.content}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Streaming message — appears while AI is typing */}
            {streamingContent && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed bg-dark-700 text-text-dark">
                  <Markdown components={chatMarkdownComponents}>
                    {streamingContent}
                  </Markdown>
                </div>
              </div>
            )}

            {/* Loading indicator (before streaming starts) */}
            {isLoading && !streamingContent && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-center px-3 py-2 rounded-lg bg-dark-700 text-text-dark">
                  <ImSpinner8 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center p-3 border-t border-dark-600">
            {isAtLimit ? (
              <div className="flex-1 px-3 py-2 text-xs text-dark-300">
                Message limit reached. Refresh the page to start a new session.
              </div>
            ) : (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-sm bg-transparent rounded-md border outline-none border-dark-500 text-text-dark placeholder:text-dark-400 focus:border-primary disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex justify-center items-center w-9 h-9 rounded-md transition-colors cursor-pointer bg-primary text-root hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <IoSend className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget
