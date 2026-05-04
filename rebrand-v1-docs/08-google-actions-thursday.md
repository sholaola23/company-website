# Google Actions — After Thursday's Merge to Main

**Trigger:** AFTER you merge `rebrand-v1` → `main` and Vercel deploys to `workcrew.io`.
**Time required:** ~10 minutes
**Why now and not earlier:** Submitting an updated sitemap before the deploy points Google at old content.

## Step 1 — Verify the deploy

```bash
curl -s -o /dev/null -w "HTTP %{http_code} | Title: " https://workcrew.io/
curl -s https://workcrew.io/ | grep -oE '<title>[^<]+</title>' | head -1
```

Expected: `HTTP 200 | Title: <title>WorkCrew — We run the back-of-house. You run the business.</title>`

If the title doesn't match, the deploy hasn't propagated yet — wait 5 min and retry.

## Step 2 — Submit fresh sitemap to Google Search Console

```bash
# Open Search Console
open "https://search.google.com/search-console"
```

In the GSC web UI:
1. Property → `workcrew.io`
2. Left sidebar → **Sitemaps**
3. Add a new sitemap → `https://workcrew.io/sitemap.xml`
4. Click Submit

If the sitemap is already listed, click it and hit **Resubmit** to force a re-crawl.

## Step 3 — Request indexing for the homepage

```
URL Inspection → enter: https://workcrew.io/
→ Click "Request indexing"
```

This fast-tracks Google noticing the new title + meta description. Usually picked up within 24-48h.

Repeat for the high-priority pages where copy changed:
- `/about`
- `/services`
- `/audit`

## Step 4 — Validate structured data (JsonLd)

```
open "https://search.google.com/test/rich-results?url=https%3A%2F%2Fworkcrew.io%2F"
open "https://search.google.com/test/rich-results?url=https%3A%2F%2Fworkcrew.io%2Fai-automation-london"
```

For each:
- Should show `Organization` and/or `LocalBusiness` schema valid
- No errors. Warnings about missing optional fields (review count, etc.) are fine.

If a test fails, the JsonLd needs a fix in code — flag to me, NOT a Search Console issue.

## Step 5 — GA4 / Google Analytics check

```bash
# Visit the live site
open "https://workcrew.io/"
```

In another tab, open GA4 → Reports → Realtime. You should see your visit show up within 60s.

If GA4 isn't tracking:
- Check `app/layout.tsx` and any GA4 helper script
- Verify `NEXT_PUBLIC_META_PIXEL_ID` env still in place (it's separate from GA4)
- Verify the cookie consent banner allows analytics cookies — it has an opt-in flow now

## Step 6 — Bing Webmaster Tools (low priority, 2 min)

```
open "https://www.bing.com/webmasters"
```

- Submit `https://workcrew.io/sitemap.xml` if the URL changed.
- Microsoft Bing copilot ranks small businesses — worth keeping fresh.

## Step 7 — GBP refresh

After applying the GBP rewrite from `07-gbp-rebrand-draft.md`:
- Hit "Update" on GBP — Google usually picks up changes within an hour
- Search "WorkCrew Ltd" or "WorkCrew Northampton" in incognito Chrome → verify the knowledge panel matches the new description

## Step 8 — Newsletter / Beehiiv announcement (optional)

Memory says you have "The AI Operator" newsletter on Beehiiv. Issue #1 is pending. The rebrand IS the natural Issue #1 hook — *"New look. Same operator brand. Here's what we run."*

If you want to draft Issue #1 around the rebrand, ping me — quick 200-word draft.

## Rollback plan (if something breaks after merge)

```bash
cd "/Users/olushola/AI Projects/company-website"
git checkout main
git revert <merge-commit-hash> --no-edit
git push
# Vercel auto-deploys the revert to prod within 2 min
```

Keep the `rebrand-v1` branch alive for a week post-merge so you can fix-forward without re-doing the work.

## Don't do these

- ❌ Don't submit `/case-studies → /work` or `/blog → /journal` redirects in `next.config.ts` — those URLs were intentionally KEPT, not renamed.
- ❌ Don't push the rebrand to prod before Thursday evening.
- ❌ Don't touch GA4 property settings or Tag Manager unless something is broken.
- ❌ Don't add structured-data fields manually in GSC — the site already has JsonLd inline.
