# Business Health Score Methodology

Calculate an overall Business Health Score (0-100) each week using these weighted dimensions:

## Dimensions & Weights

| Dimension | Weight | Score 0-100 Based On |
|-----------|--------|---------------------|
| Pipeline Health | 25% | Lead volume, quality distribution, conversion rates, pipeline value trend |
| Revenue | 20% | MRR, revenue vs costs, collection rate, growth trend |
| Client Health | 20% | Active client satisfaction, system uptime, renewal outlook |
| Marketing & Growth | 15% | Ad performance (CPL, ROAS), content output, SEO progress |
| Agent Fleet | 10% | % of agents meeting quotas, error rates, quality scores |
| Website & Infrastructure | 10% | Uptime, Core Web Vitals, conversion rate |

## Scoring Guide

### Pipeline (25%)
- 90-100: 50+ active leads, 5+ hot prospects, conversion rate >10%
- 70-89: 30-49 leads, 3-4 hot, conversion 5-10%
- 50-69: 15-29 leads, 1-2 hot, conversion 2-5%
- 30-49: 5-14 leads, 0 hot, conversion <2%
- 0-29: <5 leads, pipeline stagnant or shrinking

### Revenue (20%)
- 90-100: MRR growing, costs <30% of revenue, all invoices paid
- 70-89: MRR stable, costs <50%, most invoices on time
- 50-69: MRR flat, costs 50-70%, some overdue invoices
- 30-49: MRR declining or zero, costs >70% of revenue
- 0-29: No revenue, costs unsustainable

### Client Health (20%)
- 90-100: All clients active, systems 99%+ uptime, testimonials received
- 70-89: All clients active, minor issues resolved quickly
- 50-69: 1+ clients with unresolved issues, renewal at risk
- 30-49: Client complaints, systems failing, churn likely
- 0-29: Client lost or about to churn

### Marketing & Growth (15%)
- 90-100: CPL <£5, organic traffic growing 20%+/month, 5+ content pieces/week
- 70-89: CPL £5-8, traffic growing 10-20%, 3-4 pieces/week
- 50-69: CPL £8-12, traffic flat, 1-2 pieces/week
- 30-49: CPL >£12, traffic declining, inconsistent content
- 0-29: No marketing activity or all campaigns failing

### Agent Fleet (10%)
- 90-100: 100% of agents running, all meeting quotas, zero errors
- 70-89: 90%+ running, most meeting quotas
- 50-69: 75-89% running, some missing quotas
- 30-49: <75% running, multiple agents failing
- 0-29: Major fleet failures

### Website & Infrastructure (10%)
- 90-100: All pages loading <2s, 99.9% uptime, CWV all green
- 70-89: Most pages fast, occasional issues resolved
- 50-69: Some slow pages or errors, needs attention
- 30-49: Multiple broken features or slow pages
- 0-29: Site down or major issues

## Traffic Light Summary
Include a traffic light for each dimension in the briefing:
- 🟢 GREEN: Score 70+ (healthy)
- 🟡 AMBER: Score 50-69 (needs attention)
- 🔴 RED: Score <50 (urgent action required)

## Week-over-Week Trending
Always show direction: ↑ improving, → flat, ↓ declining
Example: "Pipeline: 72/100 🟢 ↑ (was 65 last week)"
