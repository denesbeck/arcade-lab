# Arcade Lab

Personal portfolio and technical blog of **Denes Beck** -- Software Engineer based in Budapest, Hungary.

Live at [arcade-lab.io](https://arcade-lab.io)

## Overview

Arcade Lab is a portfolio site featuring a retro/arcade-inspired dark theme with a custom monospace font (DepartureMono), animated UI elements, and a full-featured MDX-powered blog. The site showcases personal projects, technical writing, professional background, and provides a contact form backed by AWS Lambda.

It also includes an **MCP server** for Claude Code integration and an **AI-powered chat widget** that lets visitors ask questions about blog posts, projects, and the author.

## Pages

- **Home** -- Minimalist greeting with a contact CTA
- **About** -- Bio, skills (16 technologies), certificates (AWS, Terraform), and social links
- **Blog** -- 20 MDX-based technical posts covering topics like building a home server, developing a custom VCS in Go, CloudGoat ethical hacking write-ups, CI/CD pipelines, and AWS Lambda deployments. Supports tag-based filtering.
- **Contact** -- Form protected by Cloudflare Turnstile CAPTCHA, submitted via AWS Lambda

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, MUI Material |
| Content | MDX with rehype-highlight (Nord theme) and remark-gfm |
| Backend | AWS Lambda via `@aws-sdk/client-lambda`, Cloudflare Turnstile |
| AI / Chat | Claude API (`@anthropic-ai/sdk`), MCP SDK (`@modelcontextprotocol/sdk`) |
| Build | Turbopack |
| Code Quality | Biome (lint + format), Husky, lint-staged |
| CI/CD | GitHub Actions (Biome, npm audit, GitGuardian, SonarCloud) |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| SEO | JSON-LD structured data, dynamic sitemap, OpenGraph/Twitter cards |

## MCP Server

The `mcp-server/` directory contains a standalone [Model Context Protocol](https://modelcontextprotocol.io/) server that exposes blog posts, personal info, and projects as tools. It's designed for use with Claude Code via stdio transport.

### Available Tools

| Tool | Description |
|---|---|
| `search_blog_posts` | Keyword search across blog post titles, descriptions, and tags |
| `get_blog_post` | Retrieve full content of a specific blog post by ID |
| `list_blog_posts` | List all published blog posts with metadata |
| `get_about_info` | Get personal info, skills, certifications, and social links |
| `list_projects` | List portfolio projects with tech stack and highlights |
| `list_tags` | List all unique blog post tags |

### Setup for Claude Code

Add to your Claude Code MCP configuration:

```json
{
  "mcpServers": {
    "arcade-lab": {
      "command": "npx",
      "args": ["tsx", "src/index.ts"],
      "cwd": "/path/to/arcade-lab/mcp-server"
    }
  }
}
```

### MCP Server Development

```bash
cd mcp-server
npm install
npm run dev
```

## Chat Widget

A floating AI chat widget is available on every page. It uses the Claude API with the same tool definitions as the MCP server to answer visitor questions about blog posts, projects, and the author.

- Streaming responses (real-time token-by-token display)
- Markdown rendering matching the blog's design language
- Resizable chat window (drag the top-left handle)
- Rate limiting (per-IP and global caps)
- Client-side message cap (15 messages per session)

The chat widget calls `/api/chat`, which runs an agentic tool-use loop: Claude decides which tools to call, executes them server-side, and streams the final response back to the client.

## Getting Started

### Prerequisites

- Node.js
- npm

### Environment Variables

Create a `.env.local` file with the following variables:

```
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
NEXT_PUBLIC_DOMAIN=
NEXT_PUBLIC_TS_SITE_KEY=
CONTACT_LAMBDA=
ANTHROPIC_API_KEY=
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Lint & Format

```bash
npx @biomejs/biome check --write .
```

This also runs automatically on staged files via the pre-commit hook.

## Project Structure

```
app/
├── (home)/              # Home page (route group)
├── about/               # About page with bio, skills, certificates
├── api/
│   └── chat/            # Chat API route (Claude API + tool execution)
├── blog/                # Blog listing + dynamic [id] pages
│   └── _config/
│       ├── data.tsx     # Blog entry metadata
│       └── markdown/    # MDX blog posts
├── contact/             # Contact form with Turnstile + Lambda
├── _components/         # Shared UI components
│   └── ChatWidget/      # AI chat widget (floating, resizable, streaming)
├── _config/             # Navigation config
└── _hooks/              # Shared hooks
mcp-server/
├── src/
│   ├── index.ts         # MCP server entry point (stdio transport)
│   ├── tools.ts         # Tool definitions and execution logic
│   ├── search.ts        # Blog post keyword search
│   ├── types.ts         # Shared TypeScript interfaces
│   └── data/            # Data loaders (blog, about, projects)
├── package.json
└── tsconfig.json
public/
├── avatars/             # Profile image
├── blog/                # Blog cover images (sm, x, full)
├── fonts/               # DepartureMono-Regular.woff2
└── logo/                # Site logos
```

Underscore-prefixed directories (`_components`, `_config`, `_hooks`, `_utils`) are co-located with their routes but excluded from Next.js routing.

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes and PRs to `main` trigger the CI pipeline (GitHub Actions) which runs linting, security scanning, and code analysis before deployment.

The MCP server is not deployed -- it runs locally as a stdio process for Claude Code.
