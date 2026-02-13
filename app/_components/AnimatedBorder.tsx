import { ReactNode } from 'react'

interface IAnimatedBorder {
  children: ReactNode
}

const AnimatedBorder = ({ children }: IAnimatedBorder) => {
  return (
    <div className="relative group">
      <div className="hidden absolute w-[15%] h-[15%] border-t-2 border-r-2 transition-all duration-200 ease-in-out pointer-events-none sm:block border-primary -top-[24px] -right-[24px] group-hover:-top-[16px] group-hover:-right-[16px]" />
      <div className="hidden absolute w-[30%] h-[30%] border-t-2 border-l-2 transition-all duration-200 ease-in-out pointer-events-none sm:block border-primary -top-[24px] -left-[24px] group-hover:-top-[16px] group-hover:-left-[16px]" />
      <div className="hidden absolute w-[15%] h-[15%] border-b-2 border-l-2 transition-all duration-200 ease-in-out pointer-events-none sm:block border-primary -bottom-[24px] -left-[24px] group-hover:-bottom-[16px] group-hover:-left-[16px]" />
      <div className="hidden absolute w-[30%] h-[30%] border-r-2 border-b-2 transition-all duration-200 ease-in-out pointer-events-none sm:block border-primary -right-[24px] -bottom-[24px] group-hover:-right-[16px] group-hover:-bottom-[16px]" />
      {children}
    </div>
  )
}

export default AnimatedBorder
