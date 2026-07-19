'use client'

import { useEffect, useRef, useState } from 'react'

const themeConfig = {
  startOnLoad: false,
  theme: 'dark' as const,
  themeVariables: {
    darkMode: true,
    background: '#1a1a2e',
    primaryColor: '#3b82f6',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#4b5563',
    lineColor: '#6b7280',
    secondaryColor: '#1e293b',
    tertiaryColor: '#0f172a',
    noteTextColor: '#e2e8f0',
    noteBkgColor: '#1e293b',
    noteBorderColor: '#4b5563',
    fontFamily: 'ui-monospace, monospace',
    fontSize: '14px',
  },
}

let initialized = false

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    let cancelled = false

    const render = async () => {
      // Lazy-load mermaid so the (large) library is only fetched on pages that
      // actually contain a diagram, instead of every blog post.
      const { default: mermaid } = await import('mermaid')

      if (!initialized) {
        mermaid.initialize(themeConfig)
        initialized = true
      }

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
      const { svg } = await mermaid.render(id, chart)
      if (!cancelled) setSvg(svg)
    }
    render()

    return () => {
      cancelled = true
    }
  }, [chart])

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto rounded-lg bg-dark-700 p-5"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Mermaid
