'use client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'

interface IGoBack {
  fallbackUrl: string
}

const GoBack = ({ fallbackUrl }: IGoBack) => {
  const { back, push } = useRouter()

  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      back()
    } else {
      push(fallbackUrl)
    }
  }, [back, push, fallbackUrl])

  return (
    <div className="flex justify-end px-6 pb-2 w-full">
      <button
        onClick={handleGoBack}
        className="flex items-center space-x-2 underline whitespace-nowrap cursor-pointer underline-offset-4 text-dark-100 hover:decoration-dashed"
      >
        <FaArrowCircleLeft />
        <span>Go back</span>
      </button>
    </div>
  )
}

export default GoBack
