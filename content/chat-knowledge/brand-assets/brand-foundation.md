# WorkCrew — Brand Foundation

**Version:** 1.0 — locked 4 May 2026
**Status:** Tonight's foundation. Not the full brand guidelines — just the irreducible core. Full guidelines is a week-two job.

---

## 1. Brand idea

**The Operator.**

WorkCrew is the back-of-house. Not the consultant in the meeting room — the person who keeps the kitchen running. The till that doesn't go down on a Friday night. The booking confirmation that arrives in 90 seconds, not 4 hours.

Every brand decision passes through this filter: *"Does this feel like an operator who shows up, or a consultant who pitches?"*

| Operator says | Consultant says |
|---|---|
| "We answered 47 of your leads last week." | "Strategic AI transformation for your business." |
| "Here's what's broken. Here's the fix." | "We unlock value through emerging technologies." |
| Plainspoken. | Aspirational. |
| Workwear. | Lifestyle. |
| Ink and paper. | Gradients and animations. |

Reference brand: **Aesop**, applied to operations rather than skincare. Rigorous, restrained, never twee.

---

## 2. Brand voice

Six rules. Hard.

1. **Plain language. Always.** If a non-technical SMB owner wouldn't say it, don't write it.
2. **Concrete over abstract.** "Answered 47 leads in 5 minutes each" beats "improved customer response times."
3. **Numbers earn the right to claims.** Anything you say about WorkCrew should be measurable or shut up.
4. **First person plural for the company, second person for the reader.** "We run your inbox. You see who's a real lead." Never "the WorkCrew team" or "our customers."
5. **Never aspirational tech vocabulary.** Banned: *unlock, transform, leverage, synergy, AI-powered, next-gen, journey, ecosystem, infrastructure, platform, solutions, robust, seamless.*
6. **British register.** No exclamation marks. No emoji. Comma-separated lists end with the Oxford comma. Spelling: -ise not -ize, organisation not organization.

### Five words to use
*operate, run, answer, fix, ship*

### Five words to avoid
*solutions, transform, journey, leverage, unlock*

---

## 3. Colour system

Warm-shifted, single tonal family. No pure greys, no pure blacks, no cool greens.

| Role | Name | Hex | RGB | CMYK approx | Pantone (uncoated) |
|---|---|---|---|---|---|
| **Primary** | Clay | `#C2451E` | 194 / 69 / 30 | 0 / 75 / 90 / 15 | **PMS 7579 U** (verify proof) |
| **Primary tint** | Clay 60 | `#E8896B` | 232 / 137 / 107 | — | — |
| **Ground** | Bone | `#F4EDE0` | 244 / 237 / 224 | 4 / 6 / 12 / 0 | — |
| **Ink** | Char | `#1C1814` | 28 / 24 / 20 | 60 / 65 / 70 / 80 | — |
| **Neutral 1** | Stone | `#8B8278` | 139 / 130 / 120 | 45 / 45 / 50 / 25 | — |
| **Neutral 2** | Mist | `#D8D2C5` | 216 / 210 / 197 | 12 / 14 / 22 / 0 | — |
| **Functional success** | Forest | `#3F6B4E` | 63 / 107 / 78 | 70 / 30 / 75 / 30 | — |
| **Functional alert** | Ember | `#A8341F` | 168 / 52 / 31 | 20 / 90 / 95 / 25 | — |

**Usage rules:**
- **Bone is the dominant ground.** Ink is the dominant text. Clay is the *accent* — used sparingly: the seam, the QR, the underline, the small mark. A surface that's mostly Clay reads as a tapas restaurant.
- **Never pair Clay with pure white** (`#FFFFFF`). Always Clay on Bone, or Bone on Clay.
- **Neutrals are for hairlines and subtext only**, never large fills.
- **Forest and Ember are functional only** — confirmation toasts, error states. Never decorative.

**Print risk:** Clay shifts ~5–10% darker on uncoated 600gsm Mohawk. The CMYK values above are approximate — verify against Pantone 7579 U on a Pantone uncoated swatch book before final order. Do not match by hex.

---

## 4. Type system

**Single family: Inter.** Variable, all weights, intentional weight contrast does the work that a second family would do in a more mature brand.

| Use | Spec |
|---|---|
| Display / wordmark | Inter Medium 500 — tight tracking (-10 to -20 units) |
| H1 | Inter SemiBold 600 — tight tracking (-10) |
| H2 / H3 | Inter Medium 500 |
| Body | Inter Regular 400 — normal tracking |
| Small caps / labels | Inter Medium 500 — letter-spaced +40, uppercase |
| Tabular numbers | Inter Regular 400 with `font-variant-numeric: tabular-nums` |

**Forbidden:** all italics except in body copy. No display italics. They fight the wordmark.

**Mono fallback** (for code/data only): JetBrains Mono Regular. Should appear so rarely that a reader doesn't notice.

**Optional second family** (week-two, not tonight): a serif for editorial moments — proposal cover pages, brand statements. Candidates: GT Sectra, Tiempos, or free Source Serif 4. Not used in card or core surfaces.

---

## 5. Wordmark spec

**"workcrew"** — lowercase, single word, no space.

**Construction:**
- Inter Medium 500 baseline
- Optical kerning, tightened -15 units overall
- Manual adjustments (this is the bit a junior would skip):
  - Thin the `w` outer strokes by ~2%
  - Tighten the `r-k` pair (-5 extra)
  - Tighten the `e-w` pair (-5 extra)
  - Lift the `c` aperture by +2-3% (otherwise it reads closed at small sizes)
  - Accept the `k-c` collision — kern carefully, let rhythm do the work; do NOT add a syllable break
- Set in Char `#1C1814` on Bone `#F4EDE0` (light contexts) or Bone on Clay (dark/coloured contexts)

**Sub-10pt usage:** swap to Inter SemiBold 600. Inter Medium 500 strokes thin too much on uncoated stock.

**Reference brands to study:** Stripe wordmark (lowercase, single weight, custom-drawn but reads as type). Mailchimp current wordmark (friendly but operational register). **Avoid:** Linear (too tech).

**Avatar mark:** the lowercase **`w` alone**, drawn with the same custom adjustments. Two colourways:
- **Light context:** Char ink-on-Bone
- **Dark/coloured context:** Bone-on-Clay

NOT a solid coloured square with a white letter inside. Every B2B SaaS does that.

**Mutual exclusivity rule (added 4 May 2026 after card QA):** the `w`-glyph avatar mark and the full `workcrew` wordmark are **mutually exclusive on a single surface**. One or the other, never both — including ghost / low-opacity / "decorative" placements. Aesop never sets `Æ` next to "Aesop". Stripe never sets `S` next to "stripe". Putting the same letter twice on one surface, at any opacity, reads as a system error. The mark is for surfaces too small or square-cropped to carry the wordmark (favicon, app icon, profile avatar, social square). The wordmark is for everything else.

---

## 6. Card layout principles (Moo Luxe MOO Size, 84×55mm trim)

- **Front = identity. Back = utility.** No exceptions.
- **Front anchor:** the name. Inter SemiBold 600 ~14pt, top-left, generous left margin.
- **Front contains:** name, role line, small wordmark (bottom corner), nothing else.
- **Back contains:** phone, email, workcrew.io URL, QR code (18-20mm bottom-right, error correction H).
- **Omit from card:** address (Companies House registered address shouldn't be on a personal card), social handles (the QR handles those), tagline (the brand isn't earned yet).
- **Grid:** 4mm baseline grid off the trim, 6-7mm safe margin. Nothing within 4mm of any edge.
- **Seam:** Chili Red on Luxe is `~#E03C31` — brighter and cooler than Clay primary. Embraced as a deliberate **third accent colour**, not pretending it matches Clay. Don't fight it.

---

## 7. Print specs (Moo Luxe MOO Size)

| Spec | Value |
|---|---|
| Trim | 84 × 55 mm |
| Bleed (artboard) | 88 × 59 mm — add 2mm per side |
| Safe area | 80 × 51 mm — keep all content 2mm inside trim |
| Resolution | 300 DPI minimum |
| Format | PDF/X-1a:2001 (preferred), PDF accepted |
| Colour mode | CMYK |
| Fonts | Outlined / converted to paths before export |
| Stock | 600gsm Mohawk Superfine, uncoated only on Luxe line |
| Seam (this order) | Chili Red — next-day-eligible |
| Cost | £61 cards + £8.99 next-day delivery = ~£70 inc VAT for 100 |
| Cutoff | 12pm UK time, Mon–Fri |

---

## 8. AWS non-conflict — visual & language

**Visual:** Clay `#C2451E` is far enough from AWS `#FF9900` to be safe. Never drift toward brighter orange in print correction. Hold the deeper clay tone.

**Language:** banned anywhere on WorkCrew brand surface — *AWS, Solutions Architect, cloud migration, AI infrastructure, AI transformation, enterprise AI, generative AI consultancy, infrastructure, platform, solutions, ecosystem.*

Safe phrases — *AI automation for small businesses, AI operator, done-for-you AI operations, productised AI for service businesses, workflow automation.*

The card's role line is **"Founder, WorkCrew"** — never "Solutions Architect" or anything AWS-adjacent.
