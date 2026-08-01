import { ReactNode } from 'react'

interface IAnimatedUnderline {
  children: ReactNode
}

// Wipes a 2px underline in on hover. Requires an ancestor with `group`.
// Inline + box-decoration-clone so every wrapped line gets its own bar,
// each sized to that line's text rather than the full column width.
const AnimatedUnderline = ({ children }: IAnimatedUnderline) => {
  return (
    <span className="bg-[linear-gradient(var(--color-primary),var(--color-primary))] box-decoration-clone bg-size-[0%_2px] bg-position-[0_100%] bg-no-repeat transition-[background-size] duration-200 ease-in-out group-hover:bg-size-[100%_2px]">
      {children}
    </span>
  )
}

export default AnimatedUnderline
