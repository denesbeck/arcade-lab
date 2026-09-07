'use client'
import { usePathname } from 'next/navigation'
import { Console } from './terminal/_components'

// The terminal types the path that failed and answers it the way a shell would.
// `cd` only resolves the site's real routes, so whatever got here errors out.
const NotFound = () => {
  const pathname = usePathname()

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 overflow-x-clip px-4 pt-6 pb-24 sm:px-6">
      <div className="animate-text-focus flex flex-col gap-2">
        <h1 className="text-dark-50 text-2xl font-semibold">
          404 — no such file or directory
        </h1>
        <p className="text-dark-400 text-sm">
          Nothing lives at <span className="text-primary">{pathname}</span>. Run{' '}
          <span className="text-primary">ls</span> to see what does.
        </p>
      </div>
      <Console autoRun={`cd ${pathname}`} />
    </div>
  )
}

export default NotFound
