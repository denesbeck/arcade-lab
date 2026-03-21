import { useCallback, useRef, useState } from 'react'
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from '../_config/chat-widget'

const useChatWidgetSize = () => {
  const [size, setSize] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  })

  const isResizing = useRef(false)
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })

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

  return { size, handleResizeStart }
}

export default useChatWidgetSize
