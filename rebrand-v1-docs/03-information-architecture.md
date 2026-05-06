# WorkCrew.io — Information Architecture Proposal

**From:** UX architect (senior agent, $150k-tier rebrand)
**Status:** IA + conversion-flow recommendation for `rebrand-v1`

## Verdict

The current site has the assets of a productised agency but the navigation of a freelancer's portfolio. We dilute by listing seven service variants in the dropdown, run four parallel free-tool funnels, and stack five sections on the homepage that fight for the same click.

## 1. Site map — current vs proposed

**KEPT:** `/`, `/about`, `/services` (pruned to 4 items in nav), `/blueprint`, `/contact`, `/services/ai-for-*` vertical SEO pages (URL-only, never in nav), city pSEO pages.

**RENAMED + 301'd:**
- `/case-studies` → `/work` (consultant word → operator word)
- `/blog` → `/journal` (operator stories, not "thought leadership")
- `/audit` → `/blueprint` (one funnel, one promise)

**KILLED from nav (URLs may persist for SEO):**
- `/services/seo-content`, `/services/business-website` (move to "What else we run" strip)
- `/tools` index, `/offers/quick-start`
- `/services/[slug]` dynamic route still serves SEO

## 2. Primary nav — max 5

```
[wordmark]   Work   Services   Journal   About                Book a call →
```

- **Work** — proof first. Replaces "Case Studies."
- **Services** — pruned to 4: Lead Intake & Booking · Email Assistant · WhatsApp Bot · AI Workshops.
- **Journal** — operator notes. Sparse, dated.
- **About** — last. Least urgent for a buyer.
- **Contact** removed from nav. Single CTA "Book a call" replaces it.

**Mobile:** full-screen overlay on Bone ground, four nav items stacked at body-large, sticky Clay CTA at bottom. Kill nested Services accordion on mobile.

## 3. Conversion flow — homepage CTA hierarchy

**Primary (above fold, only one):** `Book a 30-min call` → `cal.com/workcrew/free-ai-strategy-call`. Direct revenue path. The Blueprint is a step on this path, not a parallel one.

**Secondary (after proof bar):** `See how we run an inbox` → `/work/emanuel-bakery`. Concrete, not generic.

**Tertiary (one only, after StrategyCallCTA):** `Not ready? Get the Blueprint instead.` → `/blueprint`. Consolation door, never the front.

**Why call, not Blueprint, is primary:** Blueprint is a slow path to revenue. Call is the closer. We have a 5-day setup sprint to sell. Operators close on calls, not PDFs.

## 4. Free-tool architecture — six → three

| Tool | Verdict | Reason |
|---|---|---|
| **AI Blueprint** | KEEP — promote to homepage hero | Diagnostic-first, matches Operator brand |
| **Instant Audit** | MERGE into Blueprint (301) | Two names for the same thing. Audit = consultant; Blueprint = operator |
| **10-Hour Framework** | BURY — link only from /journal + workshop service page | Workshop sales tool, not top-of-funnel |
| **Action Plan generator** | KILL or fold into Blueprint output | Too close to Blueprint, confuses buyers |
| **AI ROI Calculator** | KEEP as URL, link from pricing/services | Decision-support, earns its place |
| **Rank Ready** | KILL or move to subdomain | SEO tool, off-brand for operator agency |

Net: one lead magnet, one decision tool, one workshop tool. Three free things, three jobs.

## 5. Below-the-fold homepage — six sections, each with one job

1. **Hero** — imprint + primary CTA. Sub-line: "We answered 47 of your leads last week. Average reply time: 4 minutes." (real client number, swappable). Primary CTA: Book a call.
2. **Proof bar** — kept, but rewritten with dated claims. "50 minutes saved daily at E'Manuel Bakery — week of 28 Apr." Operators date their claims.
3. **What we run** — three categories max. Kill gradient blob and amber pill. Bone ground, Char ink, Clay underline only.
4. **One case study, in depth** — replace 2-card carousel with single E'Manuel deep dive: workflow diagram, actual number, actual stack ("Built on n8n. Hosts on Railway. We answer alerts on Telegram."). Carousels imply no flagship; we have one.
5. **Strategy Call** — kept but stripped. Loses dark slate. Char + Bone. Kill three numbered steps inside right-hand card.
6. **Footer** — contact, sitemap, legal, ICO. Kill newsletter signup from footer.

**Killed sections:** TestimonialSection (single Google review presented as plural — move quote into case study). HowItWorks (move to `/services/lead-intake`). FAQs (move to `/services` index). PersonalisedCTA (unless converting >2%).

## 6. Two specific IA mistakes

1. **Services dropdown is à-la-carte when the business is productised.** Seven items signal "they do everything, specialise in nothing." Cut to four; move SEO Content + Websites to Services index as "What else we run."
2. **Three free assets compete on the same homepage.** Hero CTA → `/blueprint`. Header CTA → `/blueprint`. Strategy Call CTA → `cal.com`. Hero secondary button also → `cal.com`. Within 600px of viewport, two different things asked. Buyers who can't decide bounce.

## 7. The one missing thing — a "Run sheet" / `/run-sheet`

A public, dated, numbered ledger of work shipped this week.

```
WK 18 — 30 Apr 2026
· Ashdown BD: 7 workflows live on Railway. 12 invitations sent, 3 booked.
· E'Manuel: 47 orders auto-confirmed. Average response 4 min.
· MATAS: Financial OS deployed.
```

What Aesop's "Read" section would be if Aesop ran ops. (a) On-brand — concrete, numbered, dated. (b) Safe under AWS non-conflict — documents operational work, not architecture. (c) Fresh SEO content with zero LLM-slop risk. (d) The single best argument an Operator can make.

URL: `/run-sheet`. Updated weekly Sunday 20:00 BST in Olushola's maintenance window. Surface latest entry on homepage proof bar.

## SEO regression handling

Three 301 redirects in `next.config.js` before deploy:
- `/case-studies` → `/work` (+ `/case-studies/[slug]` → `/work/[slug]`)
- `/blog` → `/journal` (+ child slugs)
- `/audit` → `/blueprint`

All city pSEO pages, all `/services/ai-for-*` vertical pages, all `/services/*` URLs stay at current URLs — only nav exposure changes. Sitemap regenerates automatically. Verify Google Search Console after deploy.
