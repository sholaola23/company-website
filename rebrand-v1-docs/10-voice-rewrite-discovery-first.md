# Voice Rewrite — Discovery-First Pass

**From:** Senior copywriter agent (5-page focused brief, 5 May 2026 morning)
**Status:** Applied as a single commit batch.
**Origin trigger:** Olushola flagged that the previous voice pass boxed the offering — *"We run your inbox, your bookings, and your weekly reports"* and *"three things mostly: lead intake, content, customer ops"* prescribed deliverables that don't fit a knowledge-base chatbot for a marketing agency or any other custom shape.

## What changed conceptually

Pages now lead with the **shape of the engagement**, not a default deliverable list:

- "Where we usually start" instead of "AI Automation Services"
- "Examples" instead of "Services"
- "Whatever's draining your week" instead of fixed inbox/bookings/reports lists
- "We figure it out on a discovery call" before any prescription

## Files touched (5)

1. `app/page.tsx` — homepage (12 changes)
2. `app/about/page.tsx` — About (10 changes)
3. `components/layout/Footer.tsx` — Footer (3 changes)
4. `app/services/page.tsx` — Services index (9 changes)
5. `lib/services-data.ts` — Lead Intake service detail data (10 changes)

Plus universal find/replace patterns swept across all 5.

## Universal patterns swept

```
"AI Automation"            →  "AI automation" (eyebrow + nav)
"Free Consultation"        →  "Discovery call"
"highest-impact automations" → "what we'd build first"
"operational bottlenecks"  →  "where your week leaks time"
"projected ROI"            →  "what you should see in 30, 60, 90 days"
"deploy your solution"     →  "ship it"
"your solution"            →  "your system"        (banned: solutions)
"thought leadership"       →  delete
"Speed-to-Lead"            →  "lead intake"
"Speed-to-Lead agent"      →  "intake agent"
"interact with a simple dashboard" → "we hand over SOPs and a walkthrough"
"What's possible"          →  "what we'd build first"
"AI Readiness Audit"       →  "discovery call"
"Free Audit" (button)      →  "free blueprint"
"automation makes a real difference" → "where automation pays back fastest"
```

## DO NOT touch

- `RotatingHeadline` ("You Run Your Business. We Build the Systems.") — locked Title Case
- Statutory footer text (Companies Act / ICO disclosures)
- JSON-LD schema strings in `businessJsonLd`, `servicesJsonLd` — SEO crawler payloads

## Pages NOT yet covered

Sub-pages deferred (Tuesday/Wednesday session):
- `app/services/[slug]/page.tsx` template — auto-improves once `lib/services-data.ts` is updated
- 5 other service detail data entries (`email-assistant`, `whatsapp-bot`, `ai-workshop`, `business-website`, `seo-content`)
- 5 vertical SEO pages (`ai-for-{accountants,salons,hvac,dental-practices,cleaning-companies}`)
- 10 city pages — palette + banned-word swept; voice tightening deferred
- `app/audit/page.tsx`, `app/blueprint/page.tsx` — minor tweaks deferred
- Blog post body content — deferred (~30+ files)

## Page-level voice diagnoses

**Homepage.** Hero already on-brand. WhatWeBuild + How It Works step 4 + Strategy Call cards were the worst offenders. All fixed.

**About.** Story paragraph 2 was the largest violation (boxed product into 3 fixed deliverable lists). HOW_WE_WORK was 80% consultant-grade — replacement leans on operator verbs and verbatim voice lines.

**Footer.** Mostly skeleton — only voice surface is the brand blurb. Statutory line correctly factual, left alone.

**Services page.** The whole page used to read as a menu the customer picks from. Headline change ("Where we usually start" + "examples below") reframes the entire page as discovery-first. Tier cards keep prices vague (correct) but replace prescribed deliverables with shape-of-engagement language.

**lib/services-data.ts (lead-intake).** Mostly operator already. Big fixes: "Speed-to-Lead" jargon (3 instances), Title Case headlines, "KPI dashboard" prescription. The whatsIncluded list stays concrete because this IS the flagship productised offer — listing components is correct here, unlike the umbrella services page.
