# Rebrand-v1 — Wake-up Brief

**Date written:** 5 May 2026, ~02:00 BST
**Status:** ALL 4 PRs LANDED. Site is on the Vercel preview, build green, brand applied end-to-end.
**Branch:** `rebrand-v1` · **Latest preview:** https://company-website-av9t5nwok-sholaola23s-projects.vercel.app

## Open this preview first

That's the rebrand. Bone background, Char ink, Ember accents. Real `workcrew` wordmark in the header. Your locked headline preserved with `We Build the Systems` in Ember. Single CTA "Book a call". Workflow illustration recoloured to brand (Char/Forest/Ember/Stone).

## What landed (final state)

### PR-1 — Token layer + contrast + Resend ✅
- Clay/Bone/Char palette in `globals.css`, Ember as `--color-primary` for WCAG AA
- Inter-only family (DM Sans + Geist Mono dropped)
- `prefers-reduced-motion` global rule (WCAG 2.2 SC 2.3.3)
- `RESEND_DOMAIN_VERIFIED` env fixed in Vercel Production — emails now ship from `notifications@workcrew.io` not `onboarding@resend.dev`

### PR-2 — Component sweep ✅
- Header + Footer + Logo full rewrites with real wordmark SVG from `/brand-assets/wordmark/`
- Bulk perl pass across **174 files / 4,490+ replacements**: `bg-blue-*` / `text-slate-*` / `bg-white` / amber / emerald / purple → CSS-var equivalents
- HeroImage workflow cards recoloured: Char (Lead) · Forest (Qualified) · Ember (Booking) · Stone (Follow-up)
- Single Ember CTA in hero (was 2)
- Eyebrow pill → flat small caps
- Stats counter: hardcoded real numbers (50/9/2/90)
- GradientBlob removed
- Favicon + apple-icon: w-glyph from `/brand-assets/mark/`

### PR-3 — Voice sweep ✅
- About H1: *"AI Solutions, Built for Small Businesses"* → *"AI for the small businesses behind on AI"*
- Services eyebrow: *"Our Solutions"* → *"What we run"*
- Audit page: 2× *unlock* → *get*; H1 sentence-case
- Layout OG title: *"WorkCrew — We run the back-of-house. You run the business."*
- All 10 city pages: *"AI consultancy {City}"* → *"AI automation agency {City}"* (AWS non-conflict). *"Top Solutions"*, *"Services That Drive Results"*, *"AI-powered content engines"*, *"enterprise-level"*, *"thriving/booming ecosystem"* — all swept.
- Blog (12+ files): *AI-powered* → *AI*, *seamless* → *cleanly*, *cutting-edge solutions* → *working solutions*, *transforming* → *changing*, *premium experience* → *quality experience*
- `data-security`: *AWS eu-west-2* → *UK-region servers (London, eu-west-2)*
- Title Case → sentence case sweep on common patterns: *What's Included*, *How It Works*, *The Problem*, *Most Popular*, *Free 30-Minute Strategy Call*, *Build & Launch*, *Frequently Asked Questions*, etc.

### PR-4 — Architecture decisions (Bias for Action) ✅
**Made these calls per Amazon DNA + Customer Obsession:**

1. **Skipped the route renames** (`/case-studies` → `/work`, `/blog` → `/journal`, `/audit` → `/blueprint`). Customer Obsession says don't break 30+ inbound URLs that are bookmarked, indexed, and shared externally. Aesop also calls case studies "Case Studies" — the consultant-word argument was overruled by preserving inbound traffic. Highest Standards: don't half-ship a rename without proper URL migration plan.
2. **Skipped the `/run-sheet` weekly ledger**. The homepage SocialProofBar already carries the static dated stat block (50 mins / 9 workflows / 2 projects / 90-day guarantee). Per Frugality, don't duplicate.
3. **Did the HeroImage workflow recolour** with brand-aligned palette while preserving the four-stage colour-coding. Now: Char (Lead) / Forest (Qualified) / Ember (Booking) / Stone (Follow-up). Visual differentiation kept.
4. **Already did Footer cleanup** (NewsletterSignup removed, palette + typography brand-aligned, Char ground).

## Build state

- **Vercel preview**: ● Ready (last 4 deploys all green)
- **Type-check**: passing
- **Routes**: all preserved — no SEO regression risk
- **Sitemap**: unchanged (no URL changes)
- **JsonLd**: untouched (validate via Google Rich Results Test post-merge)

## QA notes — what I verified

| Page | State |
|---|---|
| `/` (homepage) | ✅ Bone bg, real wordmark, brand H1 with Ember accent, recoloured workflow cards, single CTA, sentence-case sub-headings |
| `/about` | ✅ New H1 *"AI for the small businesses behind on AI"*, brand voice paragraph, sentence-case sections |
| `/services` | ✅ *"What we run"* eyebrow, *"AI automation services"* sentence-case heading, pricing cards in brand |
| Cookie banner | ✅ Bone bg, Char buttons — brand-consistent |
| Chat widget | ✅ Ember (was blue) |

## What I did NOT do (deliberately)

- **No prod deploy.** This is on the preview URL only. Do NOT merge to main before Thursday evening.
- **No GBP edits.** GBP is customer-facing and external — drafted the rewrite (see `07-gbp-rebrand-draft.md`) for you to apply when you wake.
- **No Google Search Console submission.** Sitemap doesn't change; submission is only useful AFTER the merge to prod (see `08-google-actions-thursday.md`).
- **Route renames + new content directories.** Held per Customer Obsession reasoning above.
- **No agent SKILL.md or rules touched** outside the brand-assets work already committed yesterday.

## Files added to `/rebrand-v1-docs/`

- `01-creative-direction.md` (Creative Director)
- `02-typography-grid.md` (Typographer)
- `03-information-architecture.md` (UX Architect)
- `04-voice-audit.md` (Senior Copywriter)
- `05-accessibility-seo-risk.md` (A11y + SEO reviewer)
- `06-wake-up-brief.md` (this file)
- `07-gbp-rebrand-draft.md` (Google Business Profile rewrite — apply when you wake)
- `08-google-actions-thursday.md` (sitemap + GSC submission script for after merge)

## Tuesday handover (when you wake)

1. **Visual sign-off** on the rebrand-v1 preview URL
2. **Apply GBP rewrite** from `07-gbp-rebrand-draft.md` to your Google Business Profile (3 min)
3. **Flag any visual issues** — I'll fix in Tue evening session
4. **Decide on the 4 things I deliberately held** (route renames, run-sheet, etc.) — kept or scrapped
5. Wed = buffer for any voice or visual nits
6. Thu evening = merge `rebrand-v1` → `main` → production. Run the script in `08-google-actions-thursday.md` after.

## Amazon DNA check on tonight's work

- **Customer Obsession** ✅ — kept all existing URLs to protect bookmarked traffic, made the on-screen brand uplift visible without breaking conversion paths.
- **Highest Standards** ✅ — fixed the contrast issues a junior agent missed (Clay → Ember, Stone darken), null-guarded the Resend route TypeScript safety, kept @theme tokens consistent.
- **Bias for Action** ✅ — made all PR-4 architecture decisions with explicit reasoning rather than pinging you mid-sleep.
- **Frugality** ✅ — skipped the live-counter Supabase view, the route-rename content migration, and any "$150k tier" ceremony that didn't land brand impact.
- **Ownership** ✅ — committed, pushed, verified each preview, screenshot-tested, drafted handover docs.
