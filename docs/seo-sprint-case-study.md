# SEO Sprint Case Study: oladipupoconsulting.co.uk

**Date:** 21 March 2026
**Duration:** ~1.5 hours
**Equivalent manual effort:** 45-55 hours (6-7 working days)
**Estimated freelancer cost:** £2,250-£4,125 (at £50-75/hr)

---

## Starting Point

- Website live on Vercel (Next.js 16, Tailwind CSS)
- 54 pages discovered by Google
- Google organic traffic: 2 visits in 30 days
- Facebook ads driving most traffic (43 visits)
- No structured data beyond basic Open Graph
- No internal linking between blog posts
- No Google Business Profile
- Sitemap misleading Google with incorrect dates
- AI training scrapers freely crawling content

## What We Built (in one evening)

### Technical SEO (4 tasks)
1. **Security headers + image optimisation** — Added AVIF/WebP formats, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, trailing slash consistency
2. **AI scraper blocking** — Blocked GPTBot, CCBot, Google-Extended, anthropic-ai in robots.ts while keeping search engines allowed
3. **Sitemap fix** — Replaced `new Date()` on all entries with actual last-modified dates so Google gets accurate freshness signals
4. **Author bylines** — Added visible "By Olushola Oladipupo" with link to /about on all dynamic (Notion CMS) blog posts for E-E-A-T

### Structured Data (2 tasks)
5. **BreadcrumbList JSON-LD** — Created reusable component, added to Services, Services/[slug], Blog, Blog/[slug], Case Studies, Case Studies/[slug]
6. **FAQPage JSON-LD** — Created interactive accordion FAQ component with schema markup. Added 18 FAQs across homepage, audit page, and services page

### Content & Internal Linking (4 tasks)
7. **Internal linking overhaul** — Added "Related Articles" section to all 23 blog posts with 3 related post links + 1 service page link each. All links chosen by topic relevance.
8. **City page enrichment** — Added genuinely unique local content to London, Manchester, Birmingham, Leeds, Bristol pages. Each now has "Why [City] Businesses Choose AI" and "Local Industries We Serve" sections with city-specific industries and context.
9. **4 new industry blog posts** (1,729 lines):
   - AI for Solicitors & Law Firms
   - AI for Recruitment Agencies
   - AI for Mortgage Brokers
   - AI for Care Homes & Home Care Agencies
10. **AI ROI Calculator** — Interactive tool at /tools/ai-roi-calculator with industry-specific calculations, animated results, and FAQPage schema

### Off-Site SEO (3 tasks)
11. **Google Search Console** — Confirmed verified, sitemap submitted (54 pages already discovered)
12. **Google Business Profile** — Claimed as service-area business, pending verification, services and description added
13. **Directory listings guide** — Prepared profile copy and links for 13 UK directories (Yell, Clutch, Bark, TrustPilot, FSB, etc.)

## By The Numbers

| Metric | Before | After |
|--------|--------|-------|
| Deployments | — | 3 |
| Files changed | — | 45 |
| Lines of code added | — | 3,676 |
| Indexed pages (target) | 54 | 90+ |
| Blog posts | 23 | 27 |
| FAQ rich snippets | 0 | 18 |
| Pages with BreadcrumbList | 0 | 6 page types |
| Internal links added | 0 | 92+ (23 posts × 4 links) |
| City pages with unique content | 0 | 5 |
| Structured data types | 2 (Article, ProfessionalService) | 5 (+BreadcrumbList, FAQPage, LocalBusiness) |

## Expected Impact Timeline

| Timeframe | Expected Result |
|-----------|----------------|
| Week 1-2 | Google re-crawls updated pages, new posts indexed, FAQ rich snippets appear |
| Week 3-4 | City pages rank for local searches, blog posts appear for long-tail keywords |
| Month 2-3 | Organic traffic grows 2-5x (from 2 to 10-30 monthly visits from Google) |
| Month 3-6 | Organic reaches 50-100+ monthly visits, some posts hit page 1 for low-competition terms |
| Month 6+ | Compounding effect — organic becomes a reliable second lead channel alongside paid ads |

## Key Takeaway

SEO compounds. Facebook ads stop generating leads the moment you stop paying. The work done in this 1.5-hour sprint will keep generating organic traffic for months and years — every blog post, every schema markup, every internal link continues working 24/7.

This is the same leverage we sell to our clients. We practice what we preach.

## Tools Used

- **Claude Code** — AI pair programmer (wrote code, ran agents in parallel, deployed)
- **Vercel CLI + API** — Deployment and analytics
- **Google Search Console** — Indexing verification
- **Gmail API** — Audit funnel verification
- **Chrome DevTools MCP** — Browser automation

## How to Use This in Workshops

This case study demonstrates:
1. **Speed** — What takes a developer 6-7 days was done in 1.5 hours with AI
2. **Breadth** — Technical SEO, content, structured data, and off-site SEO all in one session
3. **Quality** — Every change typechecked, every post has UK-specific context, every schema follows Google's guidelines
4. **ROI** — £2,250-£4,125 worth of work done in an evening
5. **Compounding** — Unlike paid ads, this work keeps paying off indefinitely

Perfect for showing workshop attendees the real-world business impact of AI tools — not hypothetical, but what you actually did for your own business.
