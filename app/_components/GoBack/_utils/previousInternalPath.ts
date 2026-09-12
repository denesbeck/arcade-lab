interface Context {
  nav?: Navigation
  referrer: string
  origin: string
  current: string
}

// Exposes same-origin entries only, so canGoBack already means "one of ours".
const fromNavigation = (nav: Navigation): string | null => {
  if (!nav.canGoBack) return null

  const index = nav.currentEntry?.index ?? 0
  const url = nav.entries()[index - 1]?.url
  return url ? new URL(url).pathname : null
}

// Set on full loads only, so a client-side hop reads as external here.
const fromReferrer = (referrer: string, origin: string): string | null => {
  if (!referrer) return null

  const url = new URL(referrer)
  return url.origin === origin ? url.pathname : null
}

// Null when a step back would leave the site, or land on the current path —
// an in-page anchor pushes a history entry of its own.
const previousInternalPath = ({
  nav,
  referrer,
  origin,
  current,
}: Context): string | null => {
  const previous = nav ? fromNavigation(nav) : fromReferrer(referrer, origin)
  return previous && previous !== current ? previous : null
}

export default previousInternalPath
