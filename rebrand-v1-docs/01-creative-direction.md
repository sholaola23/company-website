# WorkCrew Website — Creative Direction Memo

**From:** Creative Director (senior agent, $150k-tier rebrand)
**To:** Olushola + Typographer, Copywriter, UX
**Date:** 4 May 2026
**Status:** Direction lock for Phase-2 rebuild on `rebrand-v1`

---

## 1. The one thing this site has to feel like

**A working back-office, not a brochure.** The site should feel like opening the door to a quiet, well-run kitchen at 2pm — clean surfaces, prep already done, someone wiping down the pass. Not a showroom. Not a pitch deck.

Translation in operator language: **the homepage shouldn't sell us, it should show us already running.** Numbers, status, plain sentences, nothing aspirational. The reader should leave thinking *"these people will not break my booking system on a Friday night"* — not *"these people understand AI."*

**References:**
- **aesop.com** — restraint, generous Bone fields, no gradients. Skip the lifestyle photography.
- **stripe.com/customers** — editorial discipline: a single number, a single sentence, an attributable name. Skip the iridescent gradients and developer cleverness.
- **mailchimp.com (current)** — operator register in microcopy ("we send your emails"). Skip the freckles-and-mascots illustration system.

The seam: **editorial restraint with proof, not product marketing with promises.**

## 2. Hero — Option A, "The Ledger" (recommended)

60% Bone field on the left. Wordmark top-left, 18pt, set against a 96px margin. Drop 240px breathing space. Single Inter SemiBold 56pt headline in Char:

> **We run the back-office. You see the dashboard.**

Below the headline, one Inter Regular 18pt proof sentence:

> Last month: 1,247 leads answered. Average reply time, 4 minutes.

One Clay rectangle CTA, Bone text, no icon: **Book 15 minutes.**

Right 40%: **empty.** Bone, nothing else. Silence is the design.

A hairline Stone rule at the bottom edge with three small-caps labels:
`OPERATING · SINCE 2026 · ENGLAND & WALES`

**Why it wins:** Aesop move — confidence through omission. Proof number above the fold. The empty 40% is the brand statement.

(Options B "Status Page" and C "The Letter" rejected — see full memo.)

## 3. Three things to kill immediately

1. **Testimonial carousel.** Operator brand doesn't perform consensus. Replace with ONE client line set as editorial pull-quote, attributed in full, *with the number the work produced*: `"They've answered 312 enquiries since February. Three booked last Tuesday alone." — Jamie Osmore, Ashdown BD.` One quote per page. Never a carousel.
2. **Every gradient, shadow, and rounded-12 card.** Cards die. Replace with flat Bone surfaces separated by 1px Stone hairlines. The brand has *seams*, not shadows. Border-radius site-wide: 0 or 2px. Nothing else.
3. **The Services grid of six tiles with icons.** Universal SaaS tell. Replace with a vertical list (one row each, full-width, hairline-separated) of the four things we run: *Inbox · Bookings · Follow-up · Weekly reports.* No icons. The list IS the design.

## 4. The bold creative bet — "The Ledger"

A public, live counter on the homepage, top-right of the hero:

```
OPERATING NOW
47 inboxes · 1,247 leads answered this week · 4 min avg reply
```

Updates every 60 seconds from a Supabase view aggregating anonymised counters across active client n8n workflows. Tabular-nums Inter Regular, Char on Bone, no animation except digit-tick. No client names, no logos — just the running total of work being done *right now, while you read this page*.

Why on-brand: literal embodiment of "operator who shows up." Number, not claim. Measurable, plainspoken, impossible to fake. Rewards return visits. Shippable in week 2 (Supabase view + ISR endpoint + one React component).

**This becomes the thing people screenshot.**

## 5. What the brand foundation didn't anticipate

**Information density.** A business card has 84mm and one job. A homepage has infinite scroll and infinite temptation. The brand will fail on the web the moment a section creeps past three short paragraphs.

**Density rule to add to brand-foundation.md §6:**
- No page section longer than 3 short paragraphs
- No homepage longer than 5 sections
- Every section ends with a number or gets cut

Without this rule, the next agent will write 800 words of Operator-flavoured prose and the brand will quietly become a blog. Aesop's site works because every page is a held breath.

---

**Ship order:**
- Typographer locks type scale against Option A (56/18/14/12/10pt)
- Copywriter writes the hero copy + proof line + 4-item ops list, max 80 words total
- UX kills the 3 things in §3 + wireframes Option A + Ledger counter
- CD review at 70% before deploy
