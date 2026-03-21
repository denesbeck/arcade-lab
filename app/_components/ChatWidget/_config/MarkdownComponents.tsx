import Link from 'next/link'
import type { Components } from 'react-markdown'

/**
 * Markdown rendering components for the chat widget.
 * Mirrors the style patterns from mdx-components.tsx (blog posts)
 * but scaled down for the compact chat bubble context.
 */
const chatMarkdownComponents: Components = {
  // Headings — scaled down from blog (4xl/3xl/2xl → base with bold)
  h1: ({ children }) => (
    <p className="mt-2 mb-1 text-sm font-extrabold break-words text-dark-100">
      {children}
    </p>
  ),
  h2: ({ children }) => (
    <p className="mt-2 mb-1 text-sm font-semibold break-words text-dark-100">
      {children}
    </p>
  ),
  h3: ({ children }) => (
    <p className="mt-1 mb-1 text-sm font-medium break-words text-dark-100">
      {children}
    </p>
  ),
  h4: ({ children }) => (
    <p className="mt-1 mb-1 text-sm font-medium break-words text-dark-100">
      {children}
    </p>
  ),
  h5: ({ children }) => (
    <p className="mt-1 mb-0.5 text-sm font-normal break-words text-dark-100">
      {children}
    </p>
  ),
  h6: ({ children }) => (
    <p className="mt-1 mb-0.5 text-sm font-normal break-words text-dark-100">
      {children}
    </p>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="my-1.5 text-sm leading-relaxed break-words text-dark-200">
      {children}
    </p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="pl-4 my-1.5 list-disc break-words text-dark-200">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="pl-6 my-1.5 list-decimal break-words text-dark-200">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="my-0.5 text-sm break-words text-dark-200">{children}</li>
  ),

  // Links — internal links (e.g., /blog/18) use Next.js Link for client-side navigation
  // (preserves chat state), external links open in a new tab
  a: ({ children, href }) => {
    const isInternal = href?.startsWith('/')
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="underline break-words underline-offset-2 text-active hover:brightness-125"
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        className="underline break-words underline-offset-2 text-active hover:brightness-125"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  },

  // Inline code — same style as blog
  code: ({ children }) => (
    <code className="inline-block py-0.5 px-1 max-w-full font-mono text-xs break-words rounded text-dark-200 bg-dark-900">
      {children}
    </code>
  ),

  // Code blocks — simplified (no MacOSBar/CopyButton in chat)
  pre: ({ children }) => (
    <pre className="relative p-3 my-2 text-xs rounded-lg text-dark-200 bg-dark-900">
      <span className="whitespace-pre-wrap break-words">{children}</span>
    </pre>
  ),

  // Blockquotes — same style as blog, scaled down
  blockquote: ({ children }) => (
    <blockquote className="pl-3 my-2 italic break-words border-l-2 text-dark-300 border-dark-400">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="my-2 border-t border-dark-500" />,

  // Strong — same as blog
  strong: ({ children }) => (
    <strong className="font-bold break-words text-dark-100">{children}</strong>
  ),

  // Emphasis — same as blog
  em: ({ children }) => (
    <em className="italic break-words text-dark-300">{children}</em>
  ),

  // Tables — same style as blog, scaled down
  table: ({ children }) => (
    <div className="overflow-x-auto my-2">
      <table className="min-w-full text-xs text-left text-dark-200">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="break-words text-dark-100 bg-dark-900">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="break-words border-b border-dark-500">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="py-1.5 px-2 text-xs font-semibold break-words text-dark-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-1.5 px-2 break-words text-dark-200">{children}</td>
  ),
}

export default chatMarkdownComponents
