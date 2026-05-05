# Quotes from session-insights-reference.md — site placement candidates

**Source:** `/Users/olushola/AI Projects/clients/darren-vulcan/session-insights-reference.md`
**Filtered for:** Operator brand voice (concrete, plainspoken, numbers earn claims, never aspirational tech vocab).

## Tier 1 — strongest brand-voice fits, ship them

These line up with the locked Operator voice and would land cleanly on the website with zero rewrite.

| Quote | Source | Best site placement |
|---|---|---|
| **"AI drafts. Humans decide."** | Workshop synthesis (boiled down from "AI drafts, sorts, summarises, and prepares; humans approve, decide, and own the customer relationship") | About page — pull-quote section. Or new homepage trust strip. Or footer of every Service page. The single most concise statement of the operator philosophy. |
| **"Start with friction, not tools."** | Diagnostic-first framing throughout the file | About page Process section, opening line. Or homepage "How we work" eyebrow. |
| **"Where does your week leak time?"** | The 10-Hour Framework anchor question | Homepage CTA secondary text. Or pre-form question on `/audit`. Or `/blueprint` step 1. |
| **"AI takes the bits of work people dislike most off the plate."** (paraphrased from Sunak's "remove the bits of their job that they dislike the most") | UK gov panel | About page — explains the why without judging the audience. Pairs with the new "Why this matters" section. |
| **"You start. You learn. You adjust."** | Sunak closing | Service page closing line. Or proposal/quote page rhythm. |

## Tier 2 — strong but need light editing

Voice-aligned but might want a one-word swap for the WorkCrew register (e.g., dropping "race for everyday AI" because it sounds like a slogan).

| Quote (raw) | WorkCrew rewrite | Best placement |
|---|---|---|
| "Adopt, adopt, adopt." | **"Adopt. Test. Keep what works."** (operator triplet — testable, not slogan-y) | Footer above the legal block. Or the close of the homepage strategy-call section. |
| "First useful prototype before perfect automation." | **"First useful prototype. Polish later."** | Service detail page (`/services/lead-intake`) — the implementation philosophy section. |
| "AI is a mirror, not an oracle." (Amjad/Replit) | **"AI is a mirror, not an oracle. We treat it that way."** | About page founder card — keep small, single line, italic-free. |
| "AI usage is leverage, not just software spend." | **"AI is leverage, not subscription spend."** | Pricing FAQ on `/services` — answers "is it worth it?" |
| "If AI got this wrong, what would the consequence be?" | Keep verbatim. | `/data-security` page intro — frames human review as standard practice. |

## Tier 3 — strong concept, off-brand wording, skip or re-imagine

Don't lift these as quotes; the underlying idea is right but the framing is too consultant-y.

- *"The race for everyday AI"* — too marketing. Skip.
- *"AI is not a silver bullet. It is silver pellets."* — twee. Skip.
- *"The bottleneck moves from coding to clarity."* — accurate, but needs editorial framing to land on the site. Could become an About-page section header: *"Clarity is the new bottleneck."* But low priority.

## Recommended placement plan

**Highest leverage — apply tonight if there's time:**

1. **About page — pull quote in the founder section.** *"AI drafts. Humans decide."* Set as a Stone-rule-flanked editorial pull-quote in the founder card area. Aesop pattern.
2. **Homepage — new "Why this matters" section** (already added in this commit) carries the redirect-the-time message. Doesn't quote directly but channels the same energy.
3. **`/audit` and `/blueprint` page top — eyebrow line.** *"Start with friction, not tools."* Replaces the current "Free, no obligation" eyebrow on the Audit page (which was already brand-aligned but this is sharper).

**Medium leverage — Tuesday review:**

4. **Service detail page implementation section** — "First useful prototype. Polish later."
5. **Footer dataline** — "Adopt. Test. Keep what works."

**Lower leverage — week 2:**

6. About page — second body paragraph could open with *"AI takes the bits of work people dislike most off the plate."* Replaces the slightly-judgmental original.
7. `/data-security` — open with the consequence-framing question.

## What I'd hold off on

- **Don't quote Sunak by name.** Politicians age the brand quickly. The ideas are gold; attribution would skew political. Use the words, drop the source.
- **Don't quote Jensen, Amjad, or anyone external.** The Operator brand earns its lines by saying them itself. We're not Notion's testimonial wall.
- **Don't import "Adopt, adopt, adopt." verbatim.** Reads as borrowed slogan. The Tier-2 rewrite earns it.

## Brand-foundation update worth making

`brand-foundation.md` §2 (voice) currently has 6 hard rules. Worth adding a 7th:

> **7. Concrete + dated > general + clever.** Numbers, dates, and named clients beat clever framings. *"E'Manuel saves 50 minutes a day, week of 28 Apr"* beats *"AI is a leverage tool"* every time.

This codifies the *"numbers earn the right to claims"* rule (already in §3) into a positive directive that catches generalising-clever-line drift.
