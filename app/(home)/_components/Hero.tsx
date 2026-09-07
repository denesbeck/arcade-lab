import Link from 'next/link'
import { Suspense } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { CONNECTIONS, INFO } from '@/about/_config/data'
import ContactButton from './ContactButton'
import SystemPanel from './SystemPanel'

const DISCIPLINES = [
  'Platforms Engineering',
  'Developer Experience',
  'Infrastructure Automation',
]

const Hero = () => {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <p className="text-dark-400 animate-text-focus text-xs tracking-widest">
            <span className="text-primary">$</span> whoami
            <span className="text-primary ml-1 inline-block animate-caret">
              ▊
            </span>
          </p>

          <h1 className="text-dark-50 mt-4 animate-text-focus text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
            {INFO.Name}
          </h1>

          <p className="text-primary mt-4 animate-text-focus text-lg [animation-delay:100ms] [animation-fill-mode:backwards] sm:text-xl">
            {INFO.FullRole} @ {INFO.Company}
          </p>

          <p className="text-dark-200 mt-6 max-w-xl animate-text-focus leading-relaxed [animation-delay:200ms] [animation-fill-mode:backwards]">
            👋🏻 Hi, I&apos;m {INFO.Name.split(' ')[0]}. I build internal
            platforms, cloud infrastructure, and the developer tooling
            engineering teams ship on — and I write about what breaks along the
            way.
          </p>

          <div className="mt-7 flex animate-text-focus flex-wrap gap-2 [animation-delay:300ms] [animation-fill-mode:backwards]">
            {DISCIPLINES.map((discipline) => (
              <span
                key={discipline}
                className="ring-dark-500 text-dark-300 px-3 py-1 text-xs tracking-widest uppercase ring-1"
              >
                {discipline}
              </span>
            ))}
          </div>

          <div className="mt-9 flex animate-text-focus flex-wrap items-center gap-4 [animation-delay:400ms] [animation-fill-mode:backwards]">
            <Suspense>
              <ContactButton label="Contact me" />
            </Suspense>
            <Link
              href="/work"
              className="ring-dark-500 text-dark-100 hover:ring-primary hover:text-primary group flex w-max items-center px-3 py-2 ring-2 backdrop-blur-md transition-colors duration-200 ease-in-out"
            >
              View work
              <FiArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <div className="ml-1 flex items-center gap-4">
              {CONNECTIONS.map(({ name, url, icon: Icon }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-dark-300 hover:text-primary transition-colors duration-200 ease-in-out"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <SystemPanel />
      </div>
    </section>
  )
}

export default Hero
