# Lead Intelligence — Shared Templates & Standards

## Purpose
The Lead Intelligence field on each Notion lead page is a shared cross-agent memory log. Every agent that touches a lead MUST append to it. Never overwrite — always append a new line.

## Standard Append Format (ALL AGENTS)
```
[AGENT_CODE YYYY-MM-DD] [Brief action]. Key detail: [specific observation]. Confidence: [1-10]. Next: [what should happen next for this lead].
```

**Agent codes:**
- `SCOUT` — Lead Scout
- `DRAFT` — Outreach Drafter
- `QUAL` — Lead Qualifier
- `FOLLOWUP` — Follow-up Agent
- `HUNTER` — Email Hunter
- `AUDIT` — Proactive Audit Agent

**Examples:**
- `[SCOUT 2026-03-28] Found via Google Maps. Website: no online booking. Pain: manual scheduling. Confidence: 8. Next: draft outreach.`
- `[DRAFT 2026-03-28] Sent response_time template, Opening A. Subject: "I tested [Biz]'s response time". Personalization: 8/10. Confidence: 7. Next: qualifier checks reply.`
- `[QUAL 2026-03-28] Replied "tell me more". Sentiment: interested. Key interest: pricing. Confidence: 9. Next: discovery call brief created.`
- `[FOLLOWUP 2026-03-28] FU1 sent (bump angle). No prior reply. Confidence: 6. Next: FU2 in 3 days if no reply.`
- `[HUNTER 2026-03-28] Email found via Hunter.io (source: website footer). Confidence: 9. Next: ready for outreach.`

## Email Discovery Workflow (Lead Scout + Email Hunter)
Try in this order — stop as soon as you find a verified email:
1. Check website footer, contact page, About page
2. Check LinkedIn company page
3. Try Hunter.io (free tier)
4. Try clearbit or mail-tester.com
5. If email still not found after all steps: set `Needs Email = true`, append: `[SCOUT] Email not found — queued for Email Hunter agent.`

Always log the source: `[SOURCE: website / hunter / linkedin / clearbit / manual]`

## Deduplication Logic (Lead Scout)
Before creating a new Notion lead:
1. Check existing leads by email (exact match)
2. Check by domain
3. Check by business name (fuzzy match)
4. Duplicate with LOWER score → update existing record instead of creating new
5. Duplicate with HIGHER score → skip, log "Duplicate — existing record scores higher"
