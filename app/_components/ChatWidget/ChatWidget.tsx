'use client'
import { useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { IoChatbubbleEllipses, IoClose, IoSend } from 'react-icons/io5'
import Markdown from 'react-markdown'
import CopyButton from './_components/CopyButton'
import chatMarkdownComponents from './_config/MarkdownComponents'
import useChatWidgetMessages from './_hooks/useChatWidgetMessages'
import useChatWidgetScroll from './_hooks/useChatWidgetScroll'
import useChatWidgetSize from './_hooks/useChatWidgetSize'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

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
  const { messagesContainerRef, inputRef } = useChatWidgetScroll(
    messages,
    streamingContent,
    isOpen
  )

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex fixed right-6 bottom-6 z-50 justify-center items-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 bg-primary text-root hover:brightness-110"
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
          className="flex fixed right-6 bottom-24 z-50 flex-col rounded-lg border-2 shadow-2xl max-w-[90dvw] border-dark-600 bg-dark-900"
          style={{ width: size.width, height: size.height }}
        >
          {/* Resize handle — top-left corner */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 z-10 w-4 h-4 cursor-nw-resize"
            title="Drag to resize"
          >
            <svg
              className="m-0.5 w-3 h-3 text-dark-400"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <circle cx="2" cy="2" r="1.5" />
              <circle cx="6" cy="2" r="1.5" />
              <circle cx="2" cy="6" r="1.5" />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center py-3 px-4 rounded-t-lg border-b border-dark-600 bg-dark-800">
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
            className="overflow-y-auto flex-1 p-4 space-y-3"
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
                      : 'bg-dark-700 text-text-dark group relative'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <>
                      <Markdown components={chatMarkdownComponents}>
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
                <div className="flex gap-2 items-center py-2 px-3 rounded-lg bg-dark-700 text-text-dark">
                  <ImSpinner8 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center p-3 border-t border-dark-600">
            {isAtLimit ? (
              <div className="flex-1 py-2 px-3 text-xs text-dark-300">
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
                  className="flex-1 py-2 px-3 text-sm bg-transparent rounded-md border outline-none disabled:opacity-50 border-dark-500 text-text-dark placeholder:text-dark-400 focus:border-primary"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="flex justify-center items-center w-9 h-9 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-root hover:brightness-110"
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
