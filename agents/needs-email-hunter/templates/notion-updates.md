# Notion Update Templates

## If email found — update the lead's Notion page:
- **Email:** set to the found email address
- **Needs Email:** set to false (uncheck)
- **Lead Intelligence:** APPEND (never overwrite existing content):
  ```
  [EMAIL HUNTER {today's date}] Found email: {email} via {source}. Search method: {which search found it}. Confidence: {high/medium}.
  ```
- **Last Agent Run:** set to today's date (`date:Last Agent Run:start`)

## If no email found after 4 searches — update the lead's Notion page:
- **Needs Email:** set to false (stop retrying — prevent infinite loops)
- **Lead Intelligence:** APPEND:
  ```
  [EMAIL HUNTER {today's date}] No email found after exhaustive search (4 attempts). Searched: {list what you searched}. Consider Facebook/Instagram DM outreach or phone contact instead.
  ```
- **Last Agent Run:** set to today's date (`date:Last Agent Run:start`)

## Daily Report (Sales Agent Reports)
- **Report Title:** "Email Hunter — {today's date}"
- **date:Date:start:** today's date in ISO format
- **Agent Name** (select): `needs-email-hunter`
- **Run Date** (date): today's ISO date
- **Status** (select): `completed`, `partial`, or `failed`
- **Output Summary:** (rich text):
  ```
  Processed {X} leads needing emails.
  - Found emails: {Y} ({list business names + email sources})
  - No email found: {Z} ({list business names})
  - Remaining in queue: {N} leads still need emails (will process next run)

  Top find: {best lead name} — {email} found via {source}
  ```
- **Issues/Errors:** any WebFetch failures, rate limits, blocked sites, or anomalies. "None" if clean run.
