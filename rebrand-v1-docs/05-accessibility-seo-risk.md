# WorkCrew Rebrand Risk Register — A11y + SEO

**From:** Senior accessibility + SEO reviewer (senior agent, $150k-tier rebrand)
**Target:** WCAG 2.2 AA

## Critical contrast failures

| Pair | Ratio | AA normal (≥4.5:1) | AA large (≥3:1) | Notes |
|---|---|---|---|---|
| **Clay `#C2451E` on Bone `#F4EDE0`** | **4.33:1** | **FAIL** | PASS | Primary accent |
| Char `#1C1814` on Bone | 15.16:1 | PASS | PASS | Body — safe |
| Body `#2C2823` on Bone | 12.57:1 | PASS | PASS | Body copy — safe |
| **Stone `#8B8278` on Bone** | **3.24:1** | **FAIL** | PASS | Muted/eyebrow — fails at 12px |
| **Subtle `#B0A89E` on Bone** | **2.02:1** | **FAIL** | **FAIL** | Tertiary — fails everything |
| **Clay-tint `#E8896B` on Bone** | **2.19:1** | **FAIL** | **FAIL** | Decorative only |

**Required fixes:**
1. **Darken `--color-primary` Clay → `#A8341F` Ember** (already in palette as hover state, ~5.6:1 on Bone)
2. **Darken `--color-muted` Stone → `#6B6459`** (~5.0:1 on Bone)
3. **Ban `--color-subtle` from text** — decorative borders only, never text
4. **Add CSS comment** flagging `--color-accent` as decoration-only

## Top 5 must-fix issues

| # | Severity | Where | Fix |
|---|---|---|---|
| 1 | **CRITICAL** | All 10 city pages metadata keywords | Remove `"AI consultancy {City}"` — AWS non-conflict violation |
| 2 | **HIGH** | All components (Header, Footer, forms, city pages) | Replace 103+ hardcoded `bg-blue-*`/`text-slate-*`/`bg-white` with CSS-var equivalents — without this the rebrand palette is dead code |
| 3 | **HIGH** | `AnimatedSection`, `HeroImage`, `GradientBlob` | Add `prefers-reduced-motion` via Framer Motion's `useReducedMotion()` hook or global CSS |
| 4 | **HIGH** | `globals.css` `--color-muted` / `--color-subtle` | Stone fails 3.24:1, Subtle fails 2.02:1 — darken Stone, ban Subtle from text |
| 5 | **CRITICAL** | `globals.css:13` `--color-primary` | Clay fails AA normal text — darken to Ember |

## The thing nobody else caught — "the rebrand palette is a ghost"

Every CSS custom property is correctly defined in `globals.css` — Clay, Bone, Char, Stone, Mist — **but not a single component actually consumes them.** The Header uses `bg-white`, the Footer uses `bg-slate-900`, the forms use `bg-blue-600`, the city pages use `text-blue-600` and `bg-slate-50`. The only places the new palette is actually rendered are the body background (`style={{ background: "var(--color-bg)" }}` in `layout.tsx:74`) and the focus ring.

**What this means:** if you merge `rebrand-v1` today, the site will have a warm Bone body background with cool blue buttons, white section backgrounds, and slate text. **The branch is not merge-ready as a visual rebrand.**

The token layer landed in PR-1 (this branch) — that's the foundation. The **component migration must follow** as PR-2 with a systematic find-and-replace of every hardcoded Tailwind colour class. The contrast fix (Clay→Ember as primary, darken Stone) must land in the same PR as the colour migration.

## A11y additional risks

- **Skip link contrast** at 14px on Clay = 4.33:1, fails normal-text — bump to text-base font-semibold (large text passes) or change bg to Char
- **Services dropdown is hover-only** — no keyboard support (no `onFocus`/`onBlur`/`onKeyDown` handlers in `Header.tsx:80-84`)
- **Reduced motion** — Framer Motion infinite animations in HeroImage + GradientBlob with no `useReducedMotion()` checks. WCAG SC 2.3.3.

## SEO findings

- **3 orphaned routes not in sitemap:** `/data-security`, `/offers/quick-start`, `/reports/[slug]` — add to `app/sitemap.ts` or noindex them
- **`LocalBusiness` JSON-LD on city pages incomplete** — only `addressCountry: "GB"`, missing `addressLocality: CITY`. Google Rich Results test will flag.
- **Banned framing in city keywords** (already in critical list above)
- **Framer Motion is heavy** — consider replacing `AnimatedSection` with CSS `@starting-style` + IntersectionObserver, `GradientBlob` with pure CSS `@keyframes`
- All other SEO checks PASS — canonicals, OG, sitemap (apart from the 3 orphans), robots, image alt, heading hierarchy

## Sequence for the rebrand to ship cleanly

1. **PR-1 (this branch as-is, after fixes below):** token layer + Resend route fix + contrast adjustments to globals.css
2. **PR-2 (next branch `rebrand-v2-components`):** Component migration — find/replace all 103+ hardcoded classes. Fix contrast on muted/subtle. Add `prefers-reduced-motion`.
3. **PR-3:** Voice sweep per copywriter audit (~85 strings)
4. **PR-4:** IA changes per UX architect (3× 301 redirects, nav restructure, hero rebuild, RunSheet)

Land in this order. Do NOT skip from PR-1 straight to merge — the branch will look broken.
