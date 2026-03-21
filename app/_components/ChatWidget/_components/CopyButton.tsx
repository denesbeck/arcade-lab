'use client'
import { useCallback, useState } from 'react'
import { IoCheckmark, IoCopy } from 'react-icons/io5'

interface ICopyButton {
  content: string
}

const CopyButton = ({ content }: ICopyButton) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [content])

  return (
    <button
      onClick={handleCopy}
      className="absolute right-1.5 bottom-1.5 p-1.5 rounded opacity-0 transition-opacity cursor-pointer group-hover:opacity-100 bg-dark-600 text-dark-300 hover:text-dark-100"
      aria-label="Copy message"
    >
      {copied ? (
        <IoCheckmark className="w-4 h-4 text-alert-success" />
      ) : (
        <IoCopy className="w-4 h-4 text-dark-200" />
      )}
    </button>
  )
}

export default CopyButton
