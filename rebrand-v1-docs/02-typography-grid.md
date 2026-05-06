# WorkCrew — Type, Grid & Mark System v1.0

**From:** Senior art director / typographer (senior agent, $150k-tier rebrand)
**Status:** Implementation spec for `rebrand-v1` Phase 2

## Reference brands

Stripe (lowercase wordmark, single weight, ruthless). Aesop (single-column editorial, generous margins, weight-only hierarchy). Mailchimp current (operator register).
**Reject:** Linear, Vercel, every B2B SaaS that uses gradient hero text on white.

## Diagnosis of current state

`globals.css` is correct (Clay/Bone/Char hooked up, single-family declared). The homepage is **not** — `app/page.tsx` is still wearing Phase-0 clothes: `bg-blue-600`, `text-slate-*`, `bg-white` heroes, `rounded-full` pill buttons, amber stars, gradient blobs, `tracking-widest` eyebrows. The type system below presupposes a sweep that strips every `text-slate-*`, `bg-white`, `bg-slate-*`, `bg-blue-*`, `rounded-full`, and amber colour token from page-level files. Without that sweep, no type system survives contact.

## 1. Type scale — 10 steps, 1.250 ratio off 16px

| # | Token | rem / px | line-height | tracking | weight | Use case |
|---|---|---|---|---|---|---|
| 1 | `text-display` | **3.815rem / 61px** | 1.05 | -0.035em | 600 | Hero H1, single per page |
| 2 | `text-h1` | **3.052rem / 48.8px** | 1.08 | -0.03em | 600 | Page H1 (non-hero) |
| 3 | `text-h2` | **2.441rem / 39px** | 1.15 | -0.025em | 600 | Section heads |
| 4 | `text-h3` | **1.953rem / 31.25px** | 1.2 | -0.02em | 500 | Sub-section, card cluster head |
| 5 | `text-h4` | **1.563rem / 25px** | 1.25 | -0.015em | 500 | Card title, FAQ question |
| 6 | `text-lead` | **1.25rem / 20px** | 1.55 | -0.01em | 400 | Hero sub, section dek |
| 7 | `text-body` | **1rem / 16px** | 1.65 | 0 | 400 | Default body |
| 8 | `text-small` | **0.875rem / 14px** | 1.6 | 0 | 400 | Captions, footer links |
| 9 | `text-eyebrow` | **0.75rem / 12px** | 1.4 | **+0.14em** | 500, **uppercase** | Section eyebrows |
| 10 | `text-micro` | **0.6875rem / 11px** | 1.4 | +0.04em | 500 | Legal, tabular labels |

**Tabular numerals:** wherever a stat appears (`AnimatedCounter`, hero stats), set `font-variant-numeric: tabular-nums`. `47` and `4 minutes` should never reflow.

## 2. Permitted weight pairings within Inter

- **600 SemiBold over 400 Regular** at 1.4× line-height ratio — Hero H1 + sub-paragraph
- **500 Medium uppercase tracked +0.14em over 400 Regular** — Eyebrow over body
- **600 SemiBold over 500 Medium** — H3 inside a card over H4 sub-cluster

**Forbidden:**
- No 700 Bold anywhere (SemiBold is the ceiling)
- No 300 Light / 200 ExtraLight / 100 Thin (translucent on Bone)
- No italic outside body copy (foundation §4 explicit)
- No Title Case anywhere (lock to sentence case site-wide)
- No mixing tracking direction in one block

## 3. Page layout grid — single editorial column

12-col underlying, used as 8-col content + 4-col gutter editorial. Not a Bootstrap grid.

| Tier | Max-width | Use |
|---|---|---|
| `--content-prose` | **40rem / 640px** | Long-form reading (blog, case-study body, legal) |
| `--content-narrow` | **52rem / 832px** | Centered hero copy, single-column section heads |
| `--content-default` | **72rem / 1152px** | Services grid, case-study cards, 3-up |
| `--content-wide` | **84rem / 1344px** | Footer, full-bleed image sections only |

**Drop the `2xl` breakpoint.** Stripe doesn't go beyond ~1280; anything wider is dashboard territory.

## 4. Vertical rhythm — 8px base

```
--space-1: 0.5rem;   /*  8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px card padding */
--space-6: 3rem;     /* 48px sub-section gap */
--space-8: 4rem;     /* 64px intra-section gap */
--space-12: 6rem;    /* 96px section-padding NEW DEFAULT */
--space-16: 8rem;    /* 128px hero + final CTA only */
```

**Verdict on current `--section-padding: 8rem`:** reduce to `6rem` default, reserve `8rem` for hero + final CTA only. 8rem on every section produces "lonely landing page" feel. Mobile drops to 4rem.

**Clay rule usage — strict:**
- ≤4 per page max
- Between eyebrow and H2, only when H2 anchors a major section
- 24×2px above footer column heads, dataline-style
- NEVER between every paragraph, between cards, as decoration
- Replace `<hr>` between blocks with negative space

## 5. Wordmark + glyph usage — strict mutual-exclusivity

| Surface | Mark | Size | Colour | Notes |
|---|---|---|---|---|
| Header (desktop) | **wordmark SVG** | h-7 (28px) | Char on Bone | Replace `<Logo size="sm">` with `workcrew-wordmark.svg` |
| Header (scrolled) | wordmark | h-6 (24px) | Char on Bone with `backdrop-blur-md` | Stripe-style 8px shrink |
| Header (mobile) | wordmark | h-7 (28px) | same | No glyph swap |
| Footer | wordmark | h-8 (32px) | Bone-on-Char | Footer is Char, not slate-900 |
| Favicon (16/32) | **glyph** | 32 | Char-on-Bone | Already generated |
| Favicon (apple-touch 180) | **glyph** | 180 | Bone-on-Clay | Resize 256 source |
| OG/social card 1200×630 | wordmark | ~120px tall, upper-third left | Char on Bone, 96px margin | One short body line, never a CTA |
| Loading state / 404 | **glyph** | 64-128px | Char-on-Bone | Only moments where glyph stands alone |
| Inline body mention | **neither — set as text** | inherits | Char | Don't replace "WorkCrew" with the mark |

**Header: wordmark SVG, not live text.** The custom kerning, thinned `w` strokes, lifted `c` aperture in the locked SVG are exactly what differentiates "I typed it" from "I drew it." Setting as live text throws away every brand decision in §5.

## 6. Three "do not do" rules

1. **No gradient text.** Brand is ink on paper. If a headline needs more presence, +0.5 weight step or -0.005em tracking. Never gradient.
2. **No Title Case headlines.** Lock sentence case site-wide. Currently mixed: "Numbers That Speak for Themselves" (Title Case, twee) → kill.
3. **No oversized italic pull-quotes, no decorative `"` glyphs, no centred poetry quotes.** Quote = body-lead size (20px), Regular weight, left-aligned, attribution one size below in Stone.

## Implementation sequence for senior frontend (priority order)

1. Add type scale + spacing tokens to `globals.css` under `@theme inline`
2. Sweep every `text-slate-*` / `bg-white` / `bg-blue-*` / `bg-slate-*` / `border-slate-*` / `text-amber-*` on `app/page.tsx` → CSS-var equivalents
3. Replace every `rounded-full` CTA → `rounded-[4px]` (Stripe rectangle)
4. Drop all `GradientBlob` components from Hero
5. Sentence-case sweep across H1/H2/H3/buttons
6. Header `bg-white` → `bg-[var(--color-bg)]/95 backdrop-blur-md`, border → `border-[var(--color-border)]`
7. Swap header `<Logo>` for actual wordmark SVG (copy to `public/brand/`)
8. `--section-padding` → 6rem, hero/final-CTA → 8rem, mobile clamp 4rem
9. Add `font-variant-numeric: tabular-nums` to `AnimatedCounter`

Steps 1-9 are the difference between "brand colours pasted on top" and a site that *is* the brand.
