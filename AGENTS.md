# AGENTS.md — WorkCrew Company Website

This file helps AI agents (Claude Code and others) understand the project structure, conventions, and how to work effectively in this codebase.

---

## Project Overview

**Live URL:** https://workcrew.io (production) | https://oladipupoconsulting.co.uk (legacy redirect)
**Type:** Next.js 16 marketing site + client-facing tools
**Purpose:** WorkCrew Ltd's main website — AI automation agency for UK SMBs. Generates leads via AI tools, hosts client dashboards, and runs the AI Readiness Audit pipeline.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Deployment | Vercel Pro |
| Package Manager | **bun** (never npm) |
| Email | Resend (from hello@workcrew.io) |
| Database | Supabase (Phase 1 — not yet active) |
| AI | Claude Sonnet 3.5 (reports) + Claude Haiku (chat/audit) |
| Storage | Vercel Blob (audit reports, blueprint reports) |
| Analytics | Vercel Analytics + custom event tracking |
| CRM | Notion (via API + MCP) |
| Payments | Stripe |

---

## Directory Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage
  layout.tsx            # Root layout (header, footer, chat widget)
  globals.css           # Global styles + print media query
  api/                  # API routes (see below)
  audit/                # AI Readiness Audit wizard
  blueprint/            # AI Blueprint Generator (primary lead magnet)
  blog/                 # Blog posts (static content)
  case-studies/         # Case study pages
  client/               # Password-gated client dashboards
    emanuel/            # E'Emanuel Bakery dashboard
  services/             # Service pages + industry landing pages
  ai-automation-*/      # City-specific SEO landing pages (London, Manchester, etc.)
  reports/              # Hosted audit report viewer (Vercel Blob)
  tools/                # Free tools (rank-ready, etc.)

components/
  layout/               # Header, Footer — navigation and layout
  home/                 # Homepage sections (Hero, Services, CTA, etc.)
  shared/               # Reusable components (CTAButton, PersonalisedCTA, etc.)
  services/             # IndustryPageLayout — template for industry pages
  audit/                # Audit wizard components
  blueprint/            # BlueprintGenerator wizard (5-step form)
  case-studies/         # Case study layout components

lib/
  services-data.ts      # All 12 service definitions (name, slug, price, CTA)
  industry-pages-data.ts # Industry-specific page content (bakeries, property, etc.)
  case-studies-data.ts  # Case study content
  visitor-tracking.ts   # LocalStorage-based visitor profiling for personalised CTAs
  analytics.ts          # trackEvent() wrappers for Vercel Analytics
  notion-cms.ts         # Notion API calls (lead capture, pipeline updates)
  audit-system-prompt.ts # System prompt for instant AI audit
  chat-system-prompt.ts # System prompt for AI chat widget
  client-auth.ts        # httpOnly cookie auth for client dashboards
  client-config.ts      # Per-client configuration

agents/
  _shared/              # Shared agent files (cold-email-scripts, client configs)
  lead-scout/           # Cloud agent: researches prospects
  outreach-drafter/     # Cloud agent: writes cold emails
  follow-up-agent/      # Cloud agent: sends follow-ups
```

---

## API Routes

| Route | Purpose |
|---|---|
| `/api/instant-audit` | Generates AI score + findings instantly (Claude Haiku) |
| `/api/generate-report` | Generates full 5-section HTML report (Claude Sonnet) |
| `/api/blueprint/generate` | Generates AI Blueprint JSON (Claude Haiku) |
| `/api/blueprint/save` | Saves lead to Notion, subscribes to Beehiiv, emails HTML report |
| `/api/chat` | AI chat widget (Claude Haiku, streaming) |
| `/api/contact` | Contact form handler → Notion lead + auto-reply |
| `/api/leads` | Webhook receiver for lead events |
| `/api/notion-proxy` | Proxy for cloud agents that can't load Notion MCP directly |
| `/api/newsletter/subscribe` | Beehiiv newsletter subscription |
| `/api/auth/client` | Password login for client dashboards |
| `/api/client-sheets` | Fetches Google Sheets data for E'Emanuel dashboard |
| `/api/cron/*` | Scheduled cron jobs (triggered by Vercel cron) |

---

## Key Conventions

### Package Manager
**Always use `bun`, never `npm`.** Running `bun install`, `bun run dev`, `bun run build`.

### TypeScript
- All files are TypeScript. 0 type errors before merging.
- Run `bun run build` to typecheck — it also catches lint errors.

### CTAs
- Primary CTA: "Get Your Free AI Blueprint" → href="/blueprint"
- Secondary CTA: "Book a Strategy Call" → href="https://cal.com/workcrew/free-ai-strategy-call"
- NEVER link to /audit as a primary CTA — /blueprint replaced it

### Services Data
- All 12 services defined in `lib/services-data.ts`
- Each service has: `slug`, `name`, `heroHeadline`, `metaDescription`, `ctaText`, `ctaHref`, `setupPrice`, `monthlyPrice`
- Industry pages use `IndustryPageLayout` component with data from `lib/industry-pages-data.ts`

### Environment Variables (Vercel)
- `ANTHROPIC_API_KEY` — Claude API
- `RESEND_API_KEY` — Email delivery
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob (auto-injected)
- `NOTION_API_KEY` — Notion CRM
- `BEEHIIV_API_KEY` + `BEEHIIV_PUB_ID` — Newsletter
- `CLIENT_PASSWORD_EMANUEL` — Client dashboard auth
- `GOOGLE_SERVICE_ACCOUNT` — Sheets data (JSON, base64 encoded)

### Vercel Functions
- All API routes with AI calls need explicit `maxDuration` — Vercel Pro default is 15s
- Blueprint generate: `export const maxDuration = 30`
- Report generate: `export const maxDuration = 120`

---

## Client Dashboards

### E'Emanuel Bakery (`/client/emanuel`)
- Auth: password cookie (`CLIENT_PASSWORD_EMANUEL`)
- Data: Google Sheets via `@/lib/google-sheets.ts`
- Auto-refreshes every 5 minutes
- Shows: orders, production quantities, delivery stops, payment breakdown, system health

---

## Content Architecture

### Homepage (`app/page.tsx`)
Sections in order: Hero → Services → HowItWorks → CaseStudies → Pricing → Guarantee → PersonalisedCTA

### Blog
Static MDX-style content in `app/blog/` — no CMS. Add new posts as new route folders with `page.tsx`.

### City Landing Pages
Template-based. Add a new city by creating `app/ai-automation-[city]/page.tsx` following the existing pattern.

---

## Agent Notes

- **Cloud agents** (Lead Scout, Outreach Drafter, Follow-up Agent) run as Vercel scheduled tasks, not locally
- **Notion MCP** loads lazily in cloud sessions — front-load file reads to give it time to authenticate
- **Repomix** can pack this entire repo: `repomix --output /tmp/workcrew-packed.txt` then hand to Claude for full-codebase reasoning
- **No test suite** yet — manual QA via `bun run build` (zero errors = passing)
- **Deploy discipline**: batch changes, typecheck, QA, THEN push. Max 2-3 deploys/day on Vercel Pro.

---

## Recent Major Changes (2026)
- March 2026: WorkCrew rebrand (from Oladipupo Consulting)
- March 2026: 28-file Fliweel-inspired redesign, pricing removed, "Get a Quote" model
- April 2026: Railway n8n migration (self-hosted, was n8n Cloud)
- April 2026: AI Blueprint Generator built (replaced audit as primary CTA)
- April 2026: DMARC record added to fix email deliverability
