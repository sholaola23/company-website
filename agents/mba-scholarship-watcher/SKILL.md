# MBA Scholarship Watcher — Weekly Brief Agent

## Mission

Run every Sunday 17:00 BST (16:00 UTC). Read the **MBA Scholarship Pipeline** Notion DB. Surface outstanding/overdue/new-opportunity items per the filter rules below. Email Olushola at his personal Gmail with a clickable HTML brief — but ONLY if there are outstanding actions. Silent week if zero pending. Always update Notion timestamps regardless.

## Notion Database

- **Database URL:** https://www.notion.so/3f57a80303fd4a8ba39550f7973f33a5
- **Database ID:** `3f57a80303fd4a8ba39550f7973f33a5`
- **Data Source ID:** `e0e7cf5b-9665-459b-a0ca-6476e648fa6a`
- **Parent page (for context links):** https://www.notion.so/34dc6399294e810394b7f1477331aa87

## Outstanding-Action Filter (apply ALL conditions per row)

A row is "outstanding" if ANY of these are true:

- **(a)** `Status` IN [`Identified`, `Researching`] AND `Deadline` ≤ 30 days from today
- **(b)** `Status` IN [`Emailed Admissions`, `Awaiting Reply`] AND `Last Updated` > 7 days ago
- **(c)** `Status` = `Drafting App` AND `Deadline` ≤ 14 days from today
- **(d)** Row was created in the last 8 days (since last run) AND `AI Score` ≥ 7

Skip rows with `Status` IN [`Submitted`, `Awarded`, `Rejected`, `Dropped`] — these are terminal states.

## Schedule

Cron: `0 16 * * 0` (every Sunday 16:00 UTC = 17:00 BST). Set in the routine config.

---

## Critical Sandbox Notes (learned from existing cloud agents)

### Personal-only constraint (Olushola's MBA hunt)
This agent is for Olushola's PERSONAL MBA pursuit. It must NOT touch business/work infrastructure:
- ❌ **NEVER use `hello@workcrew.io`** — that's the WorkCrew business identity
- ❌ **NEVER use GAM CLI** — GAM authenticates to hello@workcrew.io
- ❌ **NEVER use the "Send mail as hello@workcrew.io" alias** — same reason
- ❌ **NEVER use `https://workcrew.io/api/*` proxies** — workcrew.io is business infra
- ✅ **ONLY use his personal Gmail (`olusholaoladipupo1@gmail.com`)** for both sender and recipient
- ✅ **Notion DB lives under the "Personal — MBA Scholarship Hunt" parent page** — separation maintained

### Sandbox capabilities
- ❌ **GAM CLI is NOT installed** in this sandbox (`gam: command not found`)
- ❌ **`api.resend.com` is BLOCKED from this sandbox** — do NOT call Resend API directly. Use the Worker proxy below.
- ❌ **`api.instantly.ai`, Supabase project domains** also blocked
- ❌ **Zapier MCP `gmail_send_email`** — Olushola's Zapier free tier is OUT of tasks. Do NOT use.
- ❌ **Anthropic Gmail MCP `send_email` does NOT exist** — only `create_draft`. Verified empirically. Don't waste time trying.
- ✅ **External APIs allowed:** `api.anthropic.com`, `github.com`, Anthropic Notion MCP, Anthropic Gmail MCP (drafts only), AND `*.workers.dev` domains (this is how the email-relay Worker is reachable)
- ⚠️ **Notion MCP tools are DEFERRED** — read files first to give MCP time to authenticate, then ToolSearch.

### Email mechanism (PRIMARY — personal Cloudflare Worker + Resend)

**Verified empirically**: Anthropic's Gmail MCP only exposes `create_draft` in the cloud routine context (no `send_email`). Same for the local tool inventory. So we use a small personal Cloudflare Worker that proxies to Resend.

The Worker:
- Hosted at the URL provided in your routine prompt (under `WORKER_URL`)
- Lives in Olushola's PERSONAL Cloudflare account (`olusholaoladipupo1@gmail.com`) — not WorkCrew
- Calls Resend with a dedicated MBA-only API key from Olushola's PERSONAL Resend account
- Sends FROM `MBA Hunt <onboarding@resend.dev>` (Resend's free dev sender — no domain attached, zero workcrew.io contamination)
- Allowlist enforces TO == `olusholaoladipupo1@gmail.com` only

**To send an email from this agent:**
```bash
curl -sS -X POST "$WORKER_URL" \
  -H "X-Auth-Token: $WORKER_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"to":"olusholaoladipupo1@gmail.com","subject":"[MBA Hunt] ...","html":"..."}'
```

`WORKER_URL` and `WORKER_AUTH_TOKEN` are provided in your routine prompt at runtime — do NOT hard-code them in the repo.

Response shape:
- Success: `{"ok": true, "status": 200, "resend_response": {"id": "..."}}`
- Failure: `{"ok": false, "status": <4xx/5xx>, "resend_response": {...}}` or `{"ok": false, "error": "..."}`

### Email fallback (only if the Worker is unreachable)
If the Worker POST fails or returns a 5xx:
1. Use Gmail MCP `create_draft` to put the email as a draft in personal Gmail
2. ntfy push to `ntfy.sh/oladipupo-mba-alerts` (NOT the WorkCrew P1 channel)

---

## Execution Steps

### Step 1 — Date check (mandatory, no guessing)

```bash
date -u '+%Y-%m-%d %H:%M UTC'
date '+%A, %d %B %Y %H:%M %Z'
```

Store `TODAY_YMD` (UTC date), `TODAY_HUMAN` (e.g. "Sunday, 26 April 2026").

### Step 2 — Read this SKILL.md and shared references first

Reading files first gives the MCP layer 5–10s to authenticate connectors in the background. Read in this order:

1. `agents/mba-scholarship-watcher/SKILL.md` (this file — re-read for the prompt)
2. `agents/_shared/notion-api-direct.md` (proxy fallback if Notion MCP fails — this is the WorkCrew Notion proxy; safe to read for technique, but DO NOT use the workcrew.io endpoint per the personal-only constraint above; only use Notion MCP directly)
3. (Optional) `agents/_shared/reasoning-principles.md`

DO NOT read `agents/_shared/email-sender.md` — it's WorkCrew GAM-focused and would suggest the wrong email path for this personal agent.

### Step 3 — Load Notion MCP tools

After file reads, run:

```
ToolSearch select:mcp__Notion__notion-fetch,mcp__Notion__notion-search,mcp__Notion__notion-update-page
```

If the tools don't appear after 1 retry, do 1 minute of WebSearch warm-up work (e.g. search "MBA scholarship deadline updates April 2026") then retry ToolSearch. If after 3 retries the Notion MCP tools are still missing, fall back to the proxy described in `agents/_shared/notion-api-direct.md`.

### Step 4 — Fetch the pipeline data source

Call `mcp__Notion__notion-fetch` with `id: "collection://e0e7cf5b-9665-459b-a0ca-6476e648fa6a"` to retrieve all rows + their schema. Read all rows into memory.

### Step 5 — Apply the outstanding-action filter

For each row, check the four filter conditions (a, b, c, d) above. Skip terminal-status rows. Build the `OUTSTANDING` list with:

- Programme name
- Scholarship
- School
- Deadline (formatted as DD MMM YYYY — and "in N days" or "PASSED N days ago")
- Status
- Action Required (verbatim)
- Source URL
- Notion row URL (the page `url` field returned by Notion fetch)
- Reason flagged (which filter condition triggered, e.g. "Deadline in 12 days; status still Identified")

Sort by deadline urgency (smallest days-to-deadline first), then by AI Score descending, then by Win Probability descending.

### Step 6 — Quick delta scan (web research, optional but valuable)

For the top 5 rows by urgency, run a brief WebSearch checking for status updates (e.g. "Imperial Global Online MBA scholarship 2026 deadline" or "NNPC Agip scholarship 2026 deadline change"). If you find a confirmed deadline change or new scholarship from an official source (school page, government page — NOT a listicle), add it to a `DELTA_NOTES` section in the email and queue a Notion update for that row.

Cap delta scan at 10 minutes total. Skip if you're running long.

### Step 7 — Compose the email (only if `OUTSTANDING` is non-empty)

If `len(OUTSTANDING) == 0`, skip to Step 9 (silent week).

Build an HTML email body:

```html
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 720px; line-height: 1.55; color: #1a1a1a;">

<h2 style="margin-top: 0;">MBA Hunt Weekly Brief — {TODAY_HUMAN}</h2>

<p><strong>{N_OUTSTANDING} action(s) outstanding</strong> in your MBA Scholarship Pipeline.</p>

<p style="color: #666;">Sorted by deadline urgency. Update <a href="https://www.notion.so/3f57a80303fd4a8ba39550f7973f33a5">the pipeline DB</a> when you act on a row — agent picks up your status changes automatically next Sunday.</p>

<hr/>

<!-- For each row in OUTSTANDING: -->
<div style="margin: 24px 0; padding: 16px; border-left: 4px solid {COLOR}; background: #fafafa;">
  <h3 style="margin: 0 0 8px;">{RANK}. {Programme}</h3>
  <p style="margin: 4px 0; color: #444;"><strong>Scholarship:</strong> {Scholarship}</p>
  <p style="margin: 4px 0; color: #444;"><strong>School:</strong> {School}</p>
  <p style="margin: 4px 0; color: #444;"><strong>Deadline:</strong> {Deadline_Formatted} <em>({Days_To_Deadline_Phrase})</em></p>
  <p style="margin: 4px 0; color: #444;"><strong>Status:</strong> {Status}</p>
  <p style="margin: 8px 0; padding: 8px; background: #fff3cd; border-radius: 4px;"><strong>Action:</strong> {Action_Required}</p>
  <p style="margin: 12px 0;">
    <a href="{Source_URL}" style="margin-right: 16px; color: #0066cc;">📄 Programme page</a>
    <a href="{Notion_Row_URL}" style="margin-right: 16px; color: #0066cc;">🔗 Update Notion row</a>
  </p>
  <p style="margin: 4px 0; font-size: 12px; color: #888;"><em>Why flagged: {Reason_Flagged}</em></p>
</div>

<!-- If DELTA_NOTES non-empty: -->
<hr/>
<h3>🔄 Delta updates from this week's web scan</h3>
<ul>
  {DELTA_NOTES_BULLETS}
</ul>

<hr/>

<p style="font-size: 13px; color: #888; margin-top: 32px;">
This brief was generated by the <strong>mba-scholarship-watcher</strong> cloud routine. It runs every Sunday 17:00 BST. Silent weeks (zero outstanding actions) skip the email.<br/>
Manage routine: <a href="https://claude.ai/code/routines">claude.ai/code/routines</a><br/>
Update DB: <a href="https://www.notion.so/3f57a80303fd4a8ba39550f7973f33a5">MBA Scholarship Pipeline</a>
</p>

</body>
</html>
```

`{COLOR}` per urgency:
- ≤7 days to deadline → `#dc2626` (red)
- 8–14 days → `#ea580c` (orange)
- 15–30 days → `#ca8a04` (yellow)
- >30 days OR overdue email follow-up → `#2563eb` (blue)

`{Days_To_Deadline_Phrase}`:
- 0 → "TODAY"
- 1 → "tomorrow"
- 2-7 → "in N days — URGENT"
- 8-30 → "in N days"
- past → "PASSED N days ago — review status"

### Step 8 — Send the email (personal Worker → Resend)

POST the HTML body from Step 7 to the personal email-relay Worker. `WORKER_URL` and `WORKER_AUTH_TOKEN` are provided in your routine prompt — read them from there, do NOT hard-code.

```bash
# Save the HTML body to /tmp first (large bodies don't survive shell escaping)
cat > /tmp/mba-email-body.json <<'JSON_EOF'
{
  "to": "olusholaoladipupo1@gmail.com",
  "subject": "[MBA Hunt] {N_OUTSTANDING} action(s) outstanding — w/c {TODAY_YMD}",
  "html": "{ESCAPED_HTML_BODY_FROM_STEP_7}"
}
JSON_EOF

# POST to the Worker
curl -sS -X POST "$WORKER_URL" \
  -H "X-Auth-Token: $WORKER_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary @/tmp/mba-email-body.json
```

**Better — use Python for proper JSON escaping** (avoid shell-quoting hell with HTML containing quotes/newlines):

```bash
python3 <<PY_EOF
import json, urllib.request, os

worker_url = os.environ["WORKER_URL"]
auth_token = os.environ["WORKER_AUTH_TOKEN"]

with open("/tmp/mba-email-body.html", "r") as f:
    html_body = f.read()

payload = json.dumps({
    "to": "olusholaoladipupo1@gmail.com",
    "subject": "[MBA Hunt] {N_OUTSTANDING} action(s) outstanding — w/c {TODAY_YMD}",
    "html": html_body,
}).encode()

req = urllib.request.Request(worker_url, data=payload, method="POST", headers={
    "X-Auth-Token": auth_token,
    "Content-Type": "application/json",
})

try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print("STATUS:", r.status)
        print("BODY:", r.read().decode())
except urllib.error.HTTPError as e:
    print("ERROR_STATUS:", e.code)
    print("ERROR_BODY:", e.read().decode())
PY_EOF
```

A successful response is `{"ok": true, "status": 200, "resend_response": {"id": "..."}}`.

**Fallback if Worker POST fails (after 2 retries with brief sleep):**
1. Use Gmail MCP `create_draft` to put the email as a draft in personal Gmail (visible in your Drafts folder)
2. ntfy push to the personal MBA topic:
```bash
curl -s -H "Title: [MBA Hunt] Email send failed" -H "Priority: high" -H "Tags: warning" \
  -d "Email-relay Worker unreachable for week of {TODAY_YMD}. {N_OUTSTANDING} actions waiting. Draft created in personal Gmail. DB: https://www.notion.so/3f57a80303fd4a8ba39550f7973f33a5" \
  ntfy.sh/oladipupo-mba-alerts
```

### Step 9 — Update Notion timestamps

For every row examined this run (whether flagged or not), call `mcp__Notion__notion-update-page` to touch the row — Notion auto-updates `Last Updated` on any property write. Easiest: write back the existing `Status` value (no actual change, but updates the timestamp).

For rows where the delta scan found a confirmed update (Step 6), update the relevant property (Deadline, Source URL, Notes) accordingly.

### Step 10 — Print run summary

At the end of the session, print a concise diagnostic:

```
=== MBA Scholarship Watcher Run Summary ===
Run date (UTC): {TIMESTAMP}
Total rows examined: {N_TOTAL}
Outstanding actions: {N_OUTSTANDING}
Email sent: {YES / NO (silent week) / FAILED — reason}
Delta updates applied: {N_DELTAS}
Run duration: {SECONDS}
=========================================
```

---

## Silent Week Behaviour

If `len(OUTSTANDING) == 0`:
- Do NOT send email.
- Print the run summary with `Email sent: NO (silent week)`.
- Still touch all rows to update timestamps.
- Optionally append a one-line entry to the parent page's content noting "Silent run on {TODAY_HUMAN} — 0 outstanding."

---

## Hard Rules

1. **Never email anyone except `olusholaoladipupo1@gmail.com`.** No client emails, no admissions emails — those are Olushola's personal action.
2. **Never modify rows with terminal status** (Submitted/Awarded/Rejected/Dropped) — they're frozen for record-keeping.
3. **Use the personal email-relay Worker for ALL emails** in this sandbox (POST to `WORKER_URL` from your routine prompt). NEVER use GAM (not installed), NEVER use Zapier (out of tasks), NEVER call `api.resend.com` directly (blocked from sandbox), NEVER use Anthropic Gmail MCP send (does not exist — only create_draft), NEVER use the hello@workcrew.io alias.
4. **Use `date` command output — never guess the date.**
5. **If Notion MCP can't be loaded after 3 retries**, log the failure and skip this run with a ntfy push to `ntfy.sh/oladipupo-mba-alerts`. Do NOT use the workcrew.io Notion proxy — it's business infrastructure.
6. **AWS COI red line:** if your delta scan surfaces a new scholarship funded by Microsoft, Google, Oracle, or IBM, mark it as `Status: Dropped` with note "AWS competitor — COI exclusion".
7. **Personal-only:** never reference `hello@workcrew.io`, `workcrew.io`, `WorkCrew Ltd`, AWS, or any client-related identity in the email body. The MBA hunt is Olushola's personal pursuit — keep all communication purely personal in tone and identity.

---

## Why this exists

Olushola is hunting MBA scholarships while running a full-time AWS day job + WorkCrew side venture. He doesn't have weekly bandwidth to manually re-check 15+ programmes for deadline movements, status updates, and follow-up timing. This agent does the boring weekly bookkeeping so he only sees the actions that matter, when they matter, with one-click links to act.

Cycle 1 brief (the master strategy doc that informed the seed pipeline): `/Users/olushola/AI Projects/personal/mba-scholarships/cycles/2026-04-25-cycle-1-report.md` — local-only, NOT in this repo.
