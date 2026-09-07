'use client'
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material'
import { ReactNode } from 'react'

interface ITooltip extends Omit<TooltipProps, 'children'> {
  children: ReactNode
}

/**
 * MUI's Tooltip does `isValidElement(children) ? children : <span>{children}</span>`.
 * An element handed down from a Server Component fails that check on the client
 * but passes it during SSR, so the server rendered the child and the client
 * wrapped it in a span — a hydration mismatch on every server-rendered tooltip.
 *
 * Owning the wrapper here fixes it: this file is a client boundary, so the span
 * is created on the client too and both passes agree. It also means `children`
 * can be any node rather than strictly an element.
 */
const Tooltip = ({ children, ...props }: ITooltip) => {
  return (
    <MuiTooltip
      {...props}
      arrow
      slotProps={{
        tooltip: {
          className: '!bg-dark-700 border border-dark-500 text-sm',
        },
        arrow: {
          className: 'before:!bg-dark-700 before:border before:border-dark-500',
        },
      }}
    >
      <span className="inline-flex">{children}</span>
    </MuiTooltip>
  )
}

export default Tooltip
