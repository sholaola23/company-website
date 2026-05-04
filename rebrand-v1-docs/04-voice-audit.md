# WorkCrew Site — Senior Voice Audit

**From:** Senior copywriter (senior agent, $150k-tier rebrand)
**Date:** 4 May 2026
**Voice locked:** `voice-one-pager.md` (4 May 2026)

## Headline verdict

The site is **two brands stacked on top of each other.** The hero (`RotatingHeadline.tsx` + page.tsx p.59) and the StrategyCallCTA H2 are clean Operator voice — they survive any kitchen-table read. Everything south of the testimonial — and 100% of the city pages — is generic UK B2B SaaS: Title-Case headlines mid-sentence, "Solutions" ribbons, "AI-powered content engines", "ecosystem", "premium experience." The brand is being undermined by exactly the vocabulary §2.5 of `brand-foundation.md` bans by name.

**Estimated voice debt:** ~85 strings to rewrite, ~25 banned-word swaps, all 10 city pages running the same cookie-cutter consultant register.

## Best lines on the site (don't lose these)

1. `app/page.tsx:59` — *"We run your inbox, your bookings, and your weekly reports. Set up in 7 days. Results in 90 or your money back."* — three concrete nouns + two numbers + guarantee in 21 words. **This line is the brand.**
2. `app/page.tsx:180` — *"Three things, mostly. Each one set up in days, not months — measured in hours saved and leads booked, not features shipped."* — defines the brand by what it isn't.
3. `app/services/[slug]/page.tsx:470-472` — *"If you don't save at least 5 hours per week within 90 days, we'll refund your setup fee. No questions asked."* — model for every guarantee on the site.

## Banned-word hit list (file:line)

**`unlock`** — `app/audit/page.tsx:32`, `:59` · `app/tools/rank-ready/report/page.tsx:65, 107, 502, 553, 554, 591, 724, 781`

**`solutions`/`Solutions`** — `app/services/page.tsx:155` (eyebrow "Our Solutions") · `app/services/[slug]/page.tsx:59` · `app/about/page.tsx:42, 85` (H1 "AI Solutions, Built for Small Businesses") · all 10 city pages line ~150-235 · 9+ blog posts

**`AI-powered`/`AI-Powered`** — `app/offers/quick-start/QuickStartClient.tsx:337` · all 10 city pages line ~230 · `app/ai-automation-kettering/page.tsx:161` · 15+ blog hits

**`ecosystem`** — `app/ai-automation-leeds/page.tsx:165` · `app/ai-automation-manchester/page.tsx:166`

**`platform/platforms`** — `app/about/page.tsx:120` · 5 blog posts

**`infrastructure`** — `app/blog/n8n-vs-zapier-vs-make/page.tsx:304, 470` · `app/blog/what-it-costs-63-agent-ai-business/page.tsx:301, 465`

**`transform/transforming`** — 4 blog posts: recruitment-agencies, mortgage-brokers, dentists, gyms

**`seamless/seamlessly`** — 3 blog posts

**`cutting-edge`** — 2 blog posts

**`premium`** — 3 blog posts (when used as marketing puff, not literal quality term)

**`journey`** — `app/blog/ai-for-coaches/page.tsx:154` (others are literal travel)

## Title Case mid-sentence H1s (British register fail)

- `app/about/page.tsx:85` — *"AI Solutions, Built for Small Businesses"* **(highest priority)**
- `app/audit/page.tsx:77` — *"Your Free AI Readiness Audit"*
- `app/blueprint/page.tsx:35` — *"Your Free AI Blueprint"*
- `app/contact/page.tsx:36` — *"Let's Talk"*
- `app/page.tsx:258` — *"Numbers That Speak for Themselves"*
- `app/page.tsx:338` — *"Your Dashboard. 60 Seconds a Day."*
- `app/page.tsx:659` — *"Hear From Our Clients"*
- `app/services/page.tsx` — eyebrow *"Our Solutions"*
- All city pages — *"Top Solutions for ${CITY} Businesses"*, *"Services That Drive Results"*
- `app/about/page.tsx:213` — *"Why You Can Trust Us"*

**Pattern:** every H1 on the site uses Title Case. Sweep H1/H2/H3 to **sentence case** site-wide.

## AWS slips (banned per aws-non-conflict.md)

**Hard hits:**
- All 10 city pages `metadata.keywords`: `"AI consultancy ${CITY}"` → **`"AI automation ${CITY}"`**
- `app/data-security/page.tsx:65, 188` — *"AWS eu-west-2"* → *"London (eu-west-2)"* or *"UK-region servers (London)"*

**No body slips found:** *Solutions Architect*, *cloud architecture*, *cloud migration*, *AI infrastructure* — all clean.

## Single best homepage hero rewrite

OG / page title currently: *"WorkCrew — We run the AI that runs your business."*

**Stronger:** *"WorkCrew — We run the back-of-house. You run the business."*

Why: lifts the locked RotatingHeadline construction. *Back-of-house* is the brand idea (§1). Parallel construction prospects read once and remember. Drops into `app/layout.tsx:19, 45, 51` plus OG image renderer in one pass.

## Page-by-page rewrite tables

(Full table per page in the agent's original output — applied to /, /contact, /audit, /blueprint, /services, /services/[slug], /about, /ai-automation-{city}, Footer.)

Highest-impact 8 fixes:
1. `about/page.tsx:85` — H1 *"AI Solutions"* → *"AI for the small businesses behind on AI"*
2. `services/page.tsx:155` — eyebrow *"Our Solutions"* → *"What we run"*
3. City template eyebrow *"Top Solutions for ${CITY}"* → *"What we run for ${CITY} businesses"* (10 pages improve)
4. Site-wide H1/H2 Title Case → sentence case
5. `audit/page.tsx` — kill 2× *unlock* → *get*
6. City keyword arrays: *AI consultancy* → *AI automation*
7. `data-security` — strip *AWS* from public-facing geo string
8. Layout OG title — adopt back-of-house master line

## Priority sequence (Phase-2 sweep)

1. About H1 — *"AI Solutions"* (60s, biggest brand uplift)
2. Services eyebrow — *"Our Solutions"*
3. City-page template — single file edit, 10 pages improve
4. All H1s — sweep Title Case → sentence case
5. `audit/page.tsx` — 2× *unlock*
6. All 10 city pages — `metadata.keywords` swap
7. `data-security` — strip AWS
8. Layout OG title — back-of-house

Total: ~2 hours of editing for ~85 strings. Most of the site's structure, IA, and strongest copy already pass — the brand lives in the hero, RotatingHeadline, WhatWeBuild section, and guarantee block. Phase-2 is a clean-up pass, not a rewrite.
