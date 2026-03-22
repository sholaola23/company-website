# Frontend Lead — Quality Checklist

## Verification Method
- [ ] Used `curl` (raw HTML) for ALL HTML/DOM checks — NEVER WebFetch
- [ ] Confirmed deploy was live before checking (commit hash or wait 2 min)
- [ ] Every FAIL is backed by raw HTML evidence (not markdown interpretation)
- [ ] No false negatives — if unsure, marked UNVERIFIED not FAIL

## Coverage
- [ ] All core pages checked (homepage, services, case-studies, about, blog, audit, contact, ROI calculator, privacy, terms)
- [ ] HTTP status 200 verified for each
- [ ] h1 structure verified on key pages
- [ ] Meta titles checked for length
- [ ] Sitemap completeness verified
- [ ] Navigation links verified
- [ ] Footer links verified

## Trust & Conversion
- [ ] Stats/proof section shows real numbers
- [ ] Contact email is branded (hello@oladipupoconsulting.co.uk)
- [ ] No personal Gmail visible on public pages
- [ ] CTAs are clear and working

## Accessibility
- [ ] Form inputs have labels
- [ ] ARIA states match visible state
- [ ] Images have alt text (spot check)

## Reporting
- [ ] Report emailed to Olushola (SENT, not drafted)
- [ ] Report logged to Notion
- [ ] Any code changes pass typecheck + lint
