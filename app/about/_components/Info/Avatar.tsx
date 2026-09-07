'use client'
import { Skeleton, ThemeProvider } from '@mui/material'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import profile from '@/../public/avatars/ghibli_avatar.png'
import { darkTheme } from '@/theme'

interface IAvatar {
  /** Rendered edge length in px — the frame is always a circle. */
  size?: number
  autoHide?: boolean
}

const Avatar = ({ size = 160, autoHide = true }: IAvatar) => {
  const [loading, setLoading] = useState(true)

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    // Sized inline rather than by utility class: the value is a prop, so
    // Tailwind has nothing to scan at build time.
    <div
      style={{ width: size, height: size }}
      className={`${autoHide ? 'hidden sm:block' : ''} ring-primary shrink-0 overflow-hidden rounded-full ring-2`}
    >
      {loading && (
        <ThemeProvider theme={darkTheme}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={size}
            height={size}
            className="!bg-dark-800"
          />
        </ThemeProvider>
      )}

      <Image
        src={profile}
        alt="profile"
        width={size}
        height={size}
        quality={100}
        style={{ width: size, height: size }}
        className="animate-text-focus rounded-full object-cover transition-transform duration-200 ease-in-out hover:scale-110"
        onLoad={handleLoad}
      />
    </div>
  )
}

export default Avatar
