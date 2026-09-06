import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

interface SectionHeaderProps {
  /** Two-digit index, rendered as the section's terminal-style marker. */
  index: string
  title: string
  link?: { label: string; href: string }
}

// A hairline rule with an indexed label, used to separate the home sections
// without wrapping them in yet another box.
const SectionHeader = ({ index, title, link }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-primary text-xs tracking-widest">{index}</span>
      <h2 className="text-dark-100 text-xs tracking-widest uppercase">
        {title}
      </h2>
      <span className="bg-secondary h-0.5 flex-1" />
      {link && (
        <Link
          href={link.href}
          className="text-dark-300 hover:text-primary group flex shrink-0 items-center gap-1 text-xs tracking-widest uppercase transition-colors duration-200"
        >
          {link.label}
          <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
