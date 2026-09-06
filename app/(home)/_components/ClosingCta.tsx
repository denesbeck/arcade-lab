import Link from 'next/link'
import { Suspense } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import ContactButton from './ContactButton'

const ClosingCta = () => {
  return (
    <section className="ring-secondary animate-text-focus flex flex-col gap-8 p-8 ring-2 backdrop-blur-md sm:p-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-dark-400 text-xs tracking-widest">
          <span className="text-primary">$</span> ./say-hello
        </p>
        <h2 className="text-dark-50 text-2xl font-semibold sm:text-3xl">
          Let&apos;s make shipping boring.
        </h2>
        <p className="text-dark-200 max-w-xl text-sm leading-relaxed">
          I enjoy building systems that improve developer experience and reduce
          operational friction. If that&apos;s the kind of problem you&apos;re
          working on, say hello.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Suspense>
          <ContactButton label="Contact me" />
        </Suspense>
        <Link
          href="/about"
          className="text-dark-300 hover:text-primary group flex items-center gap-1 text-sm transition-colors duration-200"
        >
          More about me
          <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  )
}

export default ClosingCta
