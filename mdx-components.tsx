import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  // Wrapper for all MDX content (e.g., for margin, padding, and layout)
  wrapper: ({ children }) => (
    <div className="overflow-auto px-5 max-w-screen w-4xl">{children}</div>
  ),

  // Headings (h1 - h6)
  h1: ({ children }) => (
    <h1 className="my-8 text-4xl font-extrabold break-words text-dark-100">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="my-7 text-3xl font-semibold break-words text-dark-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="my-6 text-2xl font-medium break-words text-dark-100">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="my-4 text-xl font-medium break-words text-dark-100">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="my-3 text-lg font-normal break-words text-dark-100">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="my-2 text-base font-normal break-words text-dark-100">
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="my-4 text-base leading-relaxed break-words text-dark-200">
      {children}
    </p>
  ),

  // Lists (ordered and unordered)
  ul: ({ children }) => (
    <ul className="pl-5 my-4 list-disc break-words text-dark-200">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="pl-5 my-4 list-decimal break-words text-dark-200">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="my-1 text-base break-words text-dark-200">{children}</li>
  ),

  // Links
  a: ({ children, href }) => (
    <a
      href={href}
      className="break-words hover:underline text-active"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  // Inline Code
  code: ({ children }) => (
    <code className="py-1 font-mono text-sm break-words rounded text-dark-200 bg-dark-700">
      {children}
    </code>
  ),

  // Code Block (preformatted code)
  pre: ({ children }) => (
    <pre className="overflow-x-auto p-5 my-6 text-sm rounded-lg text-dark-200 bg-dark-700">
      {children}
    </pre>
  ),

  // Images
  img: ({ src, alt }) => {
    return (
      <Image
        src={src}
        alt={alt}
        width={Number(alt.split("+")[0].split("_")[0])}
        height={Number(alt.split("+")[0].split("_")[1])}
        className="my-8 mx-auto rounded-lg"
      />
    );
  },

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="pl-5 my-6 mx-8 italic text-gray-600 break-words border-l-4 border-gray-300">
      {children}
    </blockquote>
  ),

  // Horizontal Rule (divider)
  hr: () => <hr className="my-8 border-t border-dark-500" />,

  // Strong (bold text)
  strong: ({ children }) => (
    <strong className="font-bold break-words text-dark-300">{children}</strong>
  ),

  // Emphasis (italic text)
  em: ({ children }) => (
    <em className="italic break-words text-dark-300">{children}</em>
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full text-sm text-left text-dark-200">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="text-white break-words bg-dark-800">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="break-words border-b border-dark-500">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="py-3 px-5 text-lg font-semibold break-words text-dark-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-3 px-5 break-words text-dark-200">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
