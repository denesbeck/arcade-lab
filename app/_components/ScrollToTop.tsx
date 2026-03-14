'use client'
import { useCallback, useEffect, useState } from 'react'
import { IoArrowUp } from 'react-icons/io5'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    if (window.scrollY > 200) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      {visible && (
        <button
          className="fixed right-6 bottom-24 z-50 flex justify-center items-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 cursor-pointer bg-primary text-root hover:brightness-110 hover:scale-105 active:scale-95"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <IoArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
