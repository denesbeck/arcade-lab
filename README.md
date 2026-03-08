# Arcade Lab

Personal portfolio and technical blog of **Denes Beck** -- Software Engineer based in Budapest, Hungary.

Live at [arcade-lab.io](https://arcade-lab.io)

## Overview

Arcade Lab is a portfolio site featuring a retro/arcade-inspired dark theme with a custom monospace font (DepartureMono), animated UI elements, and a full-featured MDX-powered blog. The site showcases personal projects, technical writing, professional background, and provides a contact form backed by AWS Lambda.

## Pages

- **Home** -- Minimalist greeting with a contact CTA
- **About** -- Bio, skills (15 technologies), certificates (AWS, Terraform), and social links
- **Blog** -- 19 MDX-based technical posts covering topics like building a home server, developing a custom VCS in Go, CloudGoat ethical hacking write-ups, CI/CD pipelines, and AWS Lambda deployments. Supports tag-based filtering.
- **Contact** -- Form protected by Cloudflare Turnstile CAPTCHA, submitted via AWS Lambda

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, MUI Material |
| Content | MDX with rehype-highlight (Nord theme) and remark-gfm |
| Backend | AWS Lambda via `@aws-sdk/client-lambda`, Cloudflare Turnstile |
| Build | Turbopack |
| Code Quality | Biome (lint + format), Husky, lint-staged |
| CI/CD | GitHub Actions (Biome, npm audit, GitGuardian, SonarCloud) |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| SEO | JSON-LD structured data, dynamic sitemap, OpenGraph/Twitter cards |

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
├── blog/                # Blog listing + dynamic [id] pages
│   └── _config/
│       ├── data.tsx     # Blog entry metadata
│       └── markdown/    # MDX blog posts
├── contact/             # Contact form with Turnstile + Lambda
├── _components/         # Shared UI components
├── _config/             # Navigation config
└── _hooks/              # Shared hooks
public/
├── avatars/             # Profile image
├── blog/                # Blog cover images (sm, x, full)
├── fonts/               # DepartureMono-Regular.woff2
└── logo/                # Site logos
```

Underscore-prefixed directories (`_components`, `_config`, `_hooks`, `_utils`) are co-located with their routes but excluded from Next.js routing.

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes and PRs to `main` trigger the CI pipeline (GitHub Actions) which runs linting, security scanning, and code analysis before deployment.
