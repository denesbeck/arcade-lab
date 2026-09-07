'use client'
import REGISTRY, { SUGGESTIONS } from '../_config/registry'
import Terminal from './Terminal'

interface ConsoleProps {
  /** Command typed out on first paint. */
  autoRun?: string
  variant?: 'page' | 'embedded'
  active?: boolean
}

// The registry holds functions for `cd` and `open`, which cannot be handed
// across the server/client boundary as a prop — so the client owns the import
// and server pages only pass the string to run.
const Console = ({ autoRun = 'whoami', variant, active }: ConsoleProps) => (
  <Terminal
    registry={REGISTRY}
    suggestions={SUGGESTIONS}
    autoRun={autoRun}
    variant={variant}
    active={active}
  />
)

export default Console
