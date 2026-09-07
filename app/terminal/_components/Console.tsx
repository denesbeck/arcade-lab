'use client'
import REGISTRY, { SUGGESTIONS } from '../_config/registry'
import Terminal from './Terminal'

interface ConsoleProps {
  /** Command typed out on first paint. */
  autoRun?: string
}

// The registry holds functions for `cd` and `open`, which cannot be handed
// across the server/client boundary as a prop — so the client owns the import
// and server pages only pass the string to run.
const Console = ({ autoRun = 'whoami' }: ConsoleProps) => (
  <Terminal registry={REGISTRY} suggestions={SUGGESTIONS} autoRun={autoRun} />
)

export default Console
