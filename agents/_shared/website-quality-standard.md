# WorkCrew — Website Quality Standard

**Created:** 27 March 2026
**Source:** Deep research on 30 top Vercel/Next.js websites + 2026 design trends
**Purpose:** Every client website we deliver must meet this standard. This is our competitive moat — small agency, world-class output.

---

## The Quality Bar

Our websites should be indistinguishable from sites built by agencies charging 10x our price. The research shows that the gap between a £500 site and a £5,000 site is not technology — it's attention to detail, performance, and conversion psychology. We close that gap.

---

## 1. Hero Section (First 5 Seconds)

Users form opinions in 0.05 seconds. The hero decides whether they stay or bounce.

**Every client hero must have:**
- [ ] Benefit-driven headline (what the customer GETS, not what the business DOES)
- [ ] 1-2 sentence subheadline with a specific outcome or number
- [ ] Primary CTA button in a high-contrast colour with action language ("Get", "Book", "Start")
- [ ] Social proof element (client count, review score, or one powerful metric)
- [ ] Real imagery — photos of the actual business, team, or product (not stock photos)

**Hero patterns to choose from (match to client):**
| Pattern | Best For | Example |
|---------|----------|---------|
| Type-first (big headline, minimal imagery) | Service businesses, consultancies | WorkCrew |
| Photo-forward (full-bleed image + overlay text) | Churches, restaurants, venues, events | KCC, E'Manuel |
| Product-led (screenshot or demo in hero) | SaaS, apps, tools | Resume Radar |
| Video background | Entertainment, creative, high-energy brands | QuantumFM |

**What the best do that most skip:**
- Variable fonts (one file, multiple weights — faster loading)
- Subtle entrance animation on headline (Framer Motion fade-up, 0.6s)
- Text shadow or overlay on photo heroes for readability (KCC lesson)

---

## 2. Typography Rules

**Standard pairing for all client sites:**
- Headings: Serif OR bold sans-serif (one font, not mixed)
- Body: Clean sans-serif (Inter, DM Sans, or system fonts)
- Accent: Same as body but uppercase + tracked for labels

**Non-negotiable rules:**
- [ ] ONE heading font, ONE body font across the entire site (no mixing)
- [ ] Use `next/font` for self-hosting (zero external font requests)
- [ ] Desktop heading sizes: 36-64px. Mobile: 28-42px. Consistent per level.
- [ ] Body text: 16-18px minimum. Line height 1.6-1.75.
- [ ] High contrast hierarchy — big gap between heading and body sizes

**What the top sites do:**
| Element | Size Range | Weight |
|---------|-----------|--------|
| H1 (hero) | 48-72px desktop, 32-48px mobile | 700-800 |
| H2 (section) | 32-48px desktop, 24-36px mobile | 600-700 |
| H3 (card/subsection) | 20-28px | 600 |
| Body | 16-18px | 400-500 |
| Small/caption | 12-14px | 400-500 |

---

## 3. Layout & Spacing

**Rules:**
- [ ] Max content width: 1200-1280px (never wider)
- [ ] Section vertical padding: 80-120px desktop, 48-64px mobile
- [ ] Generous whitespace — sections should breathe, never feel cramped
- [ ] Alternating section backgrounds (white → cream/grey → white) for visual rhythm
- [ ] Cards: consistent border radius (8-16px), soft shadows, not hard borders

**Patterns from the best:**
- Full-bleed sections alternating with contained content
- Bento grid for feature showcases (varying card sizes)
- Progressive disclosure — don't dump everything above the fold
- Sticky navigation with primary CTA always visible
- Card-based feature sections (icon + headline + 1 sentence) — scannable and mobile-friendly

---

## 4. Colour

**For every client, define a palette with these 6-8 roles:**
| Role | Purpose | Example |
|------|---------|---------|
| Primary | Headers, nav, buttons, links | Brand's main colour |
| Secondary/Accent | CTAs, highlights, hover states | Complementary or contrast |
| Background | Page backgrounds | White or warm-white (#FAFAF8) |
| Surface | Card backgrounds, alternating sections | Soft cream/grey |
| Text Primary | Body text | Dark charcoal (not pure black) |
| Text Secondary | Subtitles, captions | Warm grey |
| Success/Error | Form states | Green/Red |
| Footer | Footer background | Dark navy or charcoal |

**Rules:**
- [ ] CTA button must be the most visually distinct element on the page
- [ ] Text on images must have sufficient contrast (text shadow, overlay, or solid background)
- [ ] Never use pure black (#000000) for text — use charcoal (#1a1a2e or #1E293B)
- [ ] Never use pure white (#FFFFFF) for backgrounds — use warm white (#FAFAF8 or #FAFAFA)
- [ ] Dark mode only for tech/developer audiences. Light mode for SMBs, churches, service businesses.

---

## 5. Performance (Non-Negotiable)

Every site must pass these before delivery:

- [ ] **LCP < 2.5 seconds** on mobile (Largest Contentful Paint)
- [ ] **INP < 200ms** (Interaction to Next Paint)
- [ ] **CLS < 0.1** (no layout shift on load)
- [ ] **Lighthouse Performance score 90+**
- [ ] All images use `next/image` with correct width/height
- [ ] Hero image has `priority` prop (loads immediately)
- [ ] Fonts loaded via `next/font` (self-hosted)
- [ ] Third-party scripts loaded with `afterInteractive` strategy
- [ ] React Server Components by default, Client Components only for interactivity
- [ ] No unused JavaScript shipped to the client

**Quick wins that the best sites all do:**
- AVIF/WebP image format (30-50% smaller than JPEG)
- Lazy loading for below-fold images
- Code splitting per route (automatic in Next.js)
- ISR for pages with dynamic data (revalidate on-demand)

---

## 6. Conversion Architecture

**The 7-section page structure (proven by top Vercel sites):**

```
1. HERO — Benefit headline + product visual + CTA + social proof
2. PAIN — 3 problems the visitor recognises ("Sound familiar?")
3. SOLUTION — How the service/product solves each pain
4. PROOF — Case study with before/after metrics + testimonial + mid-page CTA
5. HOW IT WORKS — 3-4 numbered steps + timeline
6. PRICING — 2-3 tiers, recommended highlighted + FAQ
7. FINAL CTA — Summary + button + risk reducer (guarantee)
```

**CTA rules:**
- [ ] Repeat CTA in 3 positions: hero, mid-page, bottom
- [ ] Use action verbs: "Get", "Book", "Start" — never "Submit" or "Learn More"
- [ ] Minimum button size: 44x44px (thumb-friendly)
- [ ] Consider a sticky CTA in the navigation for high-intent pages

**Social proof rules:**
- [ ] Logo bar above the fold (even 2-3 clients is better than none)
- [ ] Quantified results with specific numbers (not "we helped them grow")
- [ ] Real photos and names on testimonials (anonymous = ineffective)
- [ ] Social proof near pricing increases conversion 15-25%

**Friction reduction:**
- [ ] First interaction asks for email only (not name + phone + company)
- [ ] Provide instant value before asking for commitment (free audit, free tool)
- [ ] Inline form validation (don't wait until submit)
- [ ] Remove unnecessary nav links on landing pages

---

## 7. Animation & Interaction

**Rules:**
- [ ] Scroll-triggered fade-up on section entry (Framer Motion, 0.6s, once)
- [ ] Subtle hover states on all interactive elements
- [ ] Smooth page transitions between routes
- [ ] Number counters for metrics/statistics
- [ ] **Restraint** — animate purposefully, not everywhere

**What to avoid:**
- Heavy parallax (performance killer on mobile)
- Auto-playing video with sound
- Animations that block content visibility
- Anything that causes layout shift during animation

---

## 8. Mobile (60%+ of traffic)

- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scroll
- [ ] Text readable without zooming (16px+ body)
- [ ] Forms usable with one thumb
- [ ] Images responsive with `srcset`
- [ ] Navigation collapses to hamburger menu
- [ ] Test on actual phones, not just browser resize

---

## 9. SEO Baseline

Every client site ships with:
- [ ] Unique title tag per page (< 60 characters)
- [ ] Meta description per page (< 160 characters)
- [ ] JSON-LD structured data (LocalBusiness, Organization, or appropriate type)
- [ ] Sitemap.xml generated automatically
- [ ] robots.txt configured
- [ ] Open Graph + Twitter card meta tags
- [ ] Google Business Profile created/claimed
- [ ] H1 → H2 → H3 heading hierarchy (no skipping levels)
- [ ] Alt text on all images
- [ ] Clean URL structure (no query params for pages)

---

## 10b. Local SEO Delivery Checklist

Every client website we deliver for a LOCAL business must also ship with these items. This is non-negotiable for any business that serves a geographic area.

- [ ] **GBP description written and optimised** — 3 versions provided (short/medium/full 750-char), keywords + service areas + trust signals baked in
- [ ] **GBP categories audited against competitors** — primary + all relevant secondary categories set, documented with reasoning
- [ ] **GBP service descriptions written for all services** — each service listed with keyword-rich description
- [ ] **Review request script + 3 template variations provided** — casual (WhatsApp), professional (email), in-person script. Each includes keyword-seeding guidance (e.g. "mention the service and area")
- [ ] **4-week GBP posting calendar created** — 2-3 posts/week, industry-specific topics, service keywords + city names in every post
- [ ] **Citation consistency checked across top 15 directories** — Yell, Thomson Local, Yelp, FreeIndex, Bark, Checkatrade (if trades), Google, Bing Places, Apple Maps, Facebook, 192.com, Scoot, Cylex, Hotfrog, TrustATrader. NAP (Name, Address, Phone) must match exactly everywhere.
- [ ] **JSON-LD LocalBusiness schema on homepage** — includes business name, address, phone, opening hours, geo coordinates, service area, sameAs links
- [ ] **Service+city pages for top 3 service areas** — dedicated landing page per service per city (e.g. "Nigerian Bakery Kettering", "AI Automation Manchester"), with unique content, not just city name swapped
- [ ] **Review response templates provided** — 5-star (thank + reinforce keyword), 4-star (thank + ask what could be better), 3-star (acknowledge + offer to fix), 1-2 star (empathise + take offline + resolve)
- [ ] **Monthly SEO report template set up** — tracks: GBP impressions, search queries, direction requests, phone calls, website clicks, review count + average, local pack ranking for top 5 keywords

---

## 10. Tech Stack Standard

**Default stack for all new client projects:**

| Layer | Tool | Why |
|-------|------|-----|
| Framework | Next.js (latest stable) | Industry standard, best DX, Vercel deployment |
| Styling | Tailwind CSS | Fast development, no CSS bloat, consistent |
| Components | shadcn/ui (if needed) | Accessible, customisable, Tailwind-native |
| Animation | Framer Motion | Best React animation library, scroll triggers |
| CMS | Sanity (if client manages content) | Real-time preview, webhook revalidation |
| Images | next/image | Automatic optimisation, lazy loading, AVIF |
| Fonts | next/font | Self-hosted, no external requests |
| Forms | React Hook Form + Resend | Validation + email delivery |
| Analytics | Vercel Analytics | Free, privacy-friendly, Core Web Vitals |
| Hosting | Vercel | Edge deployment, auto-scaling, SSL |

**When to deviate:**
- WordPress + Property Hive for property websites (Jenkins use case)
- WordPress for clients who need non-technical self-management
- Static HTML for ultra-simple single-page sites

---

## 11. Delivery Checklist (Before Handover)

Run through this for EVERY client site before saying "it's done":

### Design
- [ ] Consistent typography (one heading font, one body font, no mixing)
- [ ] Colour palette applied consistently (no rogue colours)
- [ ] Hero section follows the 5-element formula
- [ ] Mobile responsive on real devices (not just browser resize)
- [ ] All images are real (no placeholder/stock unless approved)
- [ ] Favicon and touch icon set

### Performance
- [ ] Lighthouse Performance 90+
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] All images optimised via next/image
- [ ] Fonts self-hosted via next/font
- [ ] No console errors

### Conversion
- [ ] CTA in 3 positions (hero, mid-page, bottom)
- [ ] Social proof visible above the fold
- [ ] Contact form works and sends email
- [ ] Thank-you/confirmation after form submission
- [ ] Phone number clickable on mobile

### SEO
- [ ] Title tags and meta descriptions on all pages
- [ ] JSON-LD structured data
- [ ] Sitemap and robots.txt
- [ ] OG image configured
- [ ] Google Business Profile linked

### Legal
- [ ] Privacy policy page
- [ ] Cookie consent (if using analytics)
- [ ] Business contact details visible
- [ ] Terms of service (if applicable)

### Client Handover
- [ ] Training session completed (how to update content)
- [ ] Login credentials documented and shared securely
- [ ] Backup/export of content provided
- [ ] Support contact confirmed (email/phone)

---

## 12. What Sets Us Apart

Most small agencies deliver:
- A template with the client's logo pasted in
- Generic stock photos
- No performance optimisation
- No conversion thinking
- No SEO setup
- "It's done" with no training or support

We deliver:
- **Research-backed design** — hero formula, conversion architecture, colour psychology
- **World-class performance** — same stack as ChatGPT, Nike, Stripe
- **Built-in conversion** — CTA placement, social proof, friction reduction
- **SEO from day one** — structured data, meta tags, Google Business Profile
- **Ongoing support** — monthly retainer covers updates, monitoring, optimisation

This is why we can charge £500 and still deliver more value than agencies charging £5,000. Our quality standard IS the moat.
