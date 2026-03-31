# E'Manuel Bakery — Client Configuration
## Last updated: 23 March 2026

**ALL agents monitoring or working on E'Manuel MUST read this file before acting.**
**If something here contradicts your SKILL.md, THIS FILE WINS.**

---

## Active Workflows (verified 23 March 2026)

| WF | Name | ID | Schedule | Notes |
|----|------|----|----------|-------|
| WF02 | HSBC CSV Bank Match | NHBBHmLemmxWbQPV | Event-driven | Fires when bank statement uploaded via dashboard. No alert unless inactive 14+ days. |
| WF03 | SumUp Checkout Links | KtoalRNhFVKa9AVf | Every 30 min | |
| WF04 | Production Summary Alert | YfZPwpngWEg0uyYv | Thu 2pm | |
| WF05 | Delivery Route | xp6rs4YDco1n3oXg | Fri 2pm | Cron can desync — deactivate/reactivate if it doesn't fire |
| WF06 | Baking List / Daily Exceptions | UqXddNGPu0q0IgNj | Thu 7pm | Banana bread REMOVED 23 March 2026 |
| WF07 | SumUp Transaction Polling | fLLDdF34MDxYGlEf | **Thu-Sat ONLY** | Client requested. Do NOT alert Sun-Wed. |
| WF08 | SumUp Checkout Links | YYTlfccah2LHZ207 | Every 30 min (Wed-Fri) | |
| WF09 | Monday Cleanup | PDJfPcqZq8c4Za6B | Mon 8am | |
| Bank Upload | Dashboard Bank Upload | E7XYOSjWisrhQqpF | Event-driven | Fires when client uploads bank CSV via dashboard |

## Workflows That DON'T Exist (don't alert about these)

- **WF01 (Tally Order Sync)** — Does NOT exist in n8n. Tally syncs directly to Google Sheets via native Tally integration. This is working correctly.

## Client Decisions (things Tunmise requested)

| Date | Decision | Impact |
|------|----------|--------|
| 23 Mar 2026 | SumUp polling Thu-Sat only | WF07 schedule. Don't alert Sun-Wed. |
| 23 Mar 2026 | Banana bread removed from menu | WF06 baking list updated. Tally form updated. Mini/Midi/Maxi loaf fields disabled. |
| 23 Mar 2026 | Bank statement upload via dashboard | New feature. Tunmise uploads HSBC CSV on dashboard, matching happens automatically. |
| 23 Mar 2026 | Refund button on dashboard | Tunmise processes refunds via dashboard, not Google Sheets directly. |
| 23 Mar 2026 | Dashboard shows "All systems running" when healthy | Don't show past errors. Only current state matters. |

## Dashboard

- **URL:** app.workcrew.io/emanuelbakery
- **Password:** emanuel2026 (client), 0ladipup0Admin! (admin)
- **Features:** Orders, production, payments (SumUp + bank), deliveries, unpaid tracking, bank statement upload, one-click refund, This Week / All Time toggle
- **Health banner:** Shows "All systems running" when all workflows currently healthy. Past errors don't count.

## Google Sheet

- **ID:** 1Ns6S_2Nt7-OxQv2As5iof62_6wYu-qb2jK42MPUa8vw
- **Tabs:** Orders, Production Summary, Delivery Manifest, Payment Tracking, Config, Bank Review, Processed Transactions, Match Log, Checkout Links
- **Service account:** dashboard-reader@oladipupo-consulting.iam.gserviceaccount.com (Editor access)
- **Refund columns:** AA (Amount), AB (Date), AC (Reason), AD (Method) — added 23 March 2026

## What NOT to flag as issues

1. WF07 not running on Sunday-Wednesday — EXPECTED
2. WF01 missing from n8n — EXPECTED (Tally native sync)
3. Bank Upload workflow idle for days — EXPECTED (only fires when Tunmise uploads)
4. WF02 idle for days — EXPECTED (event-driven, fires when bank CSV uploaded)
5. Dashboard showing "All systems running" despite past errors — THIS IS CORRECT BEHAVIOUR
6. Banana bread fields empty in new orders — EXPECTED (product removed from menu)
