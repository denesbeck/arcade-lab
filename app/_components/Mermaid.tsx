'use client'

import mermaid from 'mermaid'
import { useEffect, useRef, useState } from 'react'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
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
})

interface MermaidProps {
  chart: string
}

const Mermaid = ({ chart }: MermaidProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    const render = async () => {
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
      const { svg } = await mermaid.render(id, chart)
      setSvg(svg)
    }
    render()
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
