'use client'
import { useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { IoChatbubbleEllipses, IoClose, IoSend } from 'react-icons/io5'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Console } from '@/terminal/_components'
import CopyButton from './_components/CopyButton'
import { TERMINAL_MIN_WIDTH } from './_config/chat-widget'
import chatMarkdownComponents from './_config/MarkdownComponents'
import useChatWidgetMessages from './_hooks/useChatWidgetMessages'
import useChatWidgetScroll from './_hooks/useChatWidgetScroll'
import useChatWidgetSize from './_hooks/useChatWidgetSize'

type Tab = 'assistant' | 'terminal'

const TABS: { id: Tab; label: string }[] = [
  { id: 'assistant', label: 'assistant' },
  { id: 'terminal', label: 'terminal' },
]

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('assistant')
  // The terminal mounts on first visit and stays mounted, so its boot animation
  // plays when you actually open it and the scrollback survives tab switches.
  const [terminalStarted, setTerminalStarted] = useState(false)

  const {
    messages,
    input,
    setInput,
    isLoading,
    streamingContent,
    isAtLimit,
    sendMessage,
    handleKeyDown,
  } = useChatWidgetMessages()

  const { size, handleResizeStart } = useChatWidgetSize()
  // Gated on the tab too, or opening on the terminal would pull the caret into
  // the chat field instead of the prompt.
  const { messagesContainerRef, inputRef } = useChatWidgetScroll(
    messages,
    streamingContent,
    isOpen && tab === 'assistant'
  )

  const openTab = (next: Tab) => {
    if (next === 'terminal') setTerminalStarted(true)
    setTab(next)
  }

  return (
    <>
      {/* Launcher — one control for both modes */}
      <button
        onClick={() => {
          if (!isOpen && tab === 'terminal') setTerminalStarted(true)
          setIsOpen(!isOpen)
        }}
        className="bg-primary text-root fixed right-6 bottom-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
        aria-label={isOpen ? 'Close panel' : 'Open panel'}
      >
        {isOpen ? (
          <IoClose className="h-6 w-6" />
        ) : (
          <IoChatbubbleEllipses className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div
          className="ring-secondary bg-dark-900 fixed right-6 bottom-24 z-50 flex max-w-[90dvw] flex-col shadow-[8px_8px_0px_0px_black] ring-2"
          style={{
            width:
              tab === 'terminal'
                ? Math.max(size.width, TERMINAL_MIN_WIDTH)
                : size.width,
            height: size.height,
          }}
        >
          {/* Resize handle — top-left corner */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 z-10 h-4 w-4 cursor-nw-resize"
            title="Drag to resize"
          >
            <svg
              className="text-dark-400 m-0.5 h-3 w-3"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <circle cx="2" cy="2" r="1.5" />
              <circle cx="6" cy="2" r="1.5" />
              <circle cx="2" cy="6" r="1.5" />
            </svg>
          </div>

          {/* Header — title plus the mode switch */}
          <div className="border-secondary bg-dark-800 flex items-center justify-between gap-3 border-b-2 py-2 pr-3 pl-6">
            <span className="text-dark-300 truncate text-xs tracking-widest uppercase">
              Arcade Lab
            </span>
            <div className="flex shrink-0 gap-1.5">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => openTab(id)}
                  className={`cursor-pointer px-2.5 py-1 text-[0.625rem] tracking-widest uppercase transition-colors duration-200 ${
                    tab === id
                      ? 'bg-primary text-dark-900'
                      : 'ring-dark-500 text-dark-300 hover:text-primary hover:ring-primary ring-1'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Assistant — kept mounted so the conversation survives a tab switch */}
          <div
            className={
              tab === 'assistant' ? 'flex min-h-0 flex-1 flex-col' : 'hidden'
            }
          >
            <div
              ref={messagesContainerRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-primary text-root'
                        : 'bg-dark-700 text-text-dark group relative'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <>
                        <Markdown
                          components={chatMarkdownComponents}
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.content}
                        </Markdown>
                        <CopyButton content={message.content} />
                      </>
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
                  <div className="bg-dark-700 text-text-dark max-w-[85%] px-3 py-2 text-sm leading-relaxed">
                    <Markdown
                      components={chatMarkdownComponents}
                      remarkPlugins={[remarkGfm]}
                    >
                      {streamingContent}
                    </Markdown>
                  </div>
                </div>
              )}

              {/* Loading indicator (before streaming starts) */}
              {isLoading && !streamingContent && (
                <div className="flex justify-start">
                  <div className="bg-dark-700 text-text-dark flex items-center gap-2 px-3 py-2">
                    <ImSpinner8 className="text-primary h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-secondary flex items-center gap-2 border-t-2 p-3">
              {isAtLimit ? (
                <div className="text-dark-300 flex-1 px-3 py-2 text-xs">
                  Message limit reached. Refresh the page to start a new
                  session.
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
                    className="ring-dark-500 text-text-dark placeholder:text-dark-400 focus:ring-primary flex-1 bg-transparent px-3 py-2 text-sm ring-1 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-primary text-root flex h-9 w-9 cursor-pointer items-center justify-center transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <IoSend className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Terminal — the same Console the /terminal route and the 404 render */}
          <div
            className={
              tab === 'terminal' ? 'flex min-h-0 flex-1 flex-col' : 'hidden'
            }
          >
            {terminalStarted && (
              <Console
                variant="embedded"
                active={isOpen && tab === 'terminal'}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget
