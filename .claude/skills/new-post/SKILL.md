---
name: new-post
description: Add a new blog post to the site — choose its slug, title, description and tags for findability, then wire it into metadata and covers. Use when publishing a post, adding blog metadata, picking a slug, or when an .mdx exists in app/blog/_config/markdown/ with no entry in metadata.ts.
---

# Publishing a blog post

The `.mdx` is written by hand. This skill picks the metadata and wires it in.

## Hard rules

1. **Read the `.mdx` in full before proposing anything.** The slug and title must
   come from what the post actually says — the literal error string, flag name or
   command a stuck reader would paste into Google. Proposing metadata from the
   filename produces generic slop.
2. **Slugs are permanent.** Never change a published post's slug. If asked, say
   no and explain: it breaks every existing link and needs a redirect entry.
3. **Propose, then wait.** Never write metadata without the author approving the
   slug, title, description and tags.

## Procedure

**1. Gather.** Read the post. Then:

```sh
npx tsx -e "import M from './app/blog/_config/metadata'; \
console.log('next id:', Math.max(...M.map(m=>m.id))+1); \
console.log([...new Set(M.flatMap(m=>m.tags))].sort().join(' '))"
```

**2. Propose** slug, title, description, tags — with one line of reasoning each,
and any tag not already in the vocabulary called out explicitly.

**3. Write**, once approved:

- `app/blog/_config/metadata.ts` — the entry (`id, slug, title, description,
  date, hidden, tags, file`). Newest first.
- `app/blog/_config/data.tsx` — a `COVERS[id]` entry. Reuse an existing cover
  for a post in an existing series; a new one needs three files in
  `public/blog/covers/`: `name.png`, `name_sm.png`, `name_x.png`.
- `app/work/_config/data.ts` — add the id to the matching project's `blogPosts`,
  if there is one.

**4. Verify.** `npm test` covers the mechanical invariants (unique slugs, slug
format, mdx exists, no orphans, tag casing, description length). Then
`npm run build` to confirm it prerenders.

## Choosing the slug and title

The goal is that someone with this problem finds the post. Both should carry the
phrase they'd actually type.

- Prefer the concrete artefact: `docker-restart-always-start-limit`,
  `irsa-without-eks-self-hosted-oidc`. An error string or flag name beats a
  description of the topic.
- Never encode series position. `home-lab-p14` is unsearchable. The series lives
  in the title prefix and tags, not the URL.
- Keep it under ~60 characters and don't stuff keywords — two or three real terms.
- The title may differ from the slug and should read naturally, but the
  searchable phrase belongs in both where possible.

## Description

One sentence, under 160 characters (enforced by test — Google truncates past
that). State the specific problem and what came of it, not the topic area.

## Tags

**Tags are on-site navigation, not SEO.** Google ranks the post on its title,
headings and body; a tag page with one result will never rank. So the test for a
tag is "would a reader click this to find related posts?"

- Reuse the existing vocabulary. Check every tag against the list from step 1.
- A new tag is fine when it names a real technology that will recur — `cilium`,
  `irsa`. It is not fine for generic descriptors — `remote`, `chat`, `testing`
  when the post already carries better handles.
- Kebab-case, lowercase. `nextjs` not `next.js`, `secrets-manager` not
  `secrets_manager`. A test fails on separator and case collisions.
- Aim for 5–12 tags. Fewer than 4 usually means the post is under-described.

## Scheduling

`hidden: true` keeps a post out of the blog index, sitemap, recommendations and
the MCP/chat tools. A future `date` does the same until that date passes.
