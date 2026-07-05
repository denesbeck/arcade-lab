import rehypeHighlight from 'rehype-highlight'
import { common } from 'lowlight'

/**
 * highlight.js language definition for HCL / Terraform.
 *
 * highlight.js core ships no HCL grammar, so we register a compact one here and
 * expose it to rehype-highlight. Kept in a standalone module (referenced by
 * absolute path from next.config.ts) because Turbopack serializes MDX loader
 * options — a grammar function can't be passed inline, but a module path can.
 */
export function hcl(hljs) {
  const INTERPOLATION = {
    className: 'subst',
    begin: /\$\{/,
    end: /\}/,
    keywords: { literal: 'true false null' },
    contains: [], // filled in below to allow nested strings/numbers
  }

  const STRING = {
    className: 'string',
    begin: '"',
    end: '"',
    contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
  }

  INTERPOLATION.contains = [STRING, hljs.NUMBER_MODE]

  const HEREDOC = {
    className: 'string',
    begin: /<<[-~]?(["']?)([A-Za-z_]\w*)\1/,
    end: /^\s*\2\b/,
    contains: [INTERPOLATION],
  }

  const KEYWORDS = {
    keyword:
      'resource variable provider output locals module data terraform ' +
      'dynamic moved import check removed for_each in for if endif',
    built_in:
      'var local module data path terraform each count self',
    literal: 'true false null',
  }

  return {
    name: 'HCL',
    aliases: ['terraform', 'tf'],
    keywords: KEYWORDS,
    contains: [
      hljs.COMMENT('#', '$'),
      hljs.COMMENT('//', '$'),
      hljs.COMMENT('/\\*', '\\*/'),
      HEREDOC,
      STRING,
      hljs.NUMBER_MODE,
      {
        // attribute name before `=`
        className: 'attr',
        begin: /[A-Za-z_]\w*(?=\s*=[^=])/,
        relevance: 0,
      },
      {
        // function calls: name(
        className: 'built_in',
        begin: /[A-Za-z_]\w*(?=\()/,
        relevance: 0,
      },
    ],
  }
}

export default function rehypeHighlightHcl(options = {}) {
  return rehypeHighlight({
    ...options,
    languages: { ...common, hcl, ...(options.languages || {}) },
  })
}
