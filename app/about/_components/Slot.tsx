import { ReactNode } from 'react'

interface SlotProps {
  /** 1-based position, printed in the cell's corner like an inventory index. */
  index: number
  children: ReactNode
}

/** The numeral shared by every inventory and trophy cell. */
const Slot = ({ index, children }: SlotProps) => (
  <>
    <span className="text-dark-600 absolute top-1 left-1.5 text-[0.5rem]">
      {String(index).padStart(2, '0')}
    </span>
    {children}
  </>
)

export default Slot
