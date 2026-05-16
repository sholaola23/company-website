# WhatsApp Ordering Bot — Reference Architecture (Kapso-based)

**Status:** battle-tested on E'Manuel Bakery (live, £100-200+/week orders)
**Last validated:** 24 April 2026
**Reusable for:** any SMB taking orders/bookings over WhatsApp with card payment

## When to use this pattern
- Customer places orders via WhatsApp natural language
- You need to: parse → store → accept card payment → reconcile → confirm instantly
- Payment provider is SumUp / Stripe / any hosted checkout with a `return_url`
- Bookkeeping is Google Sheets (not a DB) — works fine at small scale

## Stack

| Component | Role | Why |
|---|---|---|
| **Kapso** | WhatsApp agent + workflow + functions | Managed Meta WABA connection, visual workflow, code-level extensibility via Cloudflare-Workers functions |
| **n8n on Railway (self-hosted)** | Reconciliation, polling, fallback | No per-execution cost, full API access, error workflow support |
| **Google Sheets** | Source of truth for orders | Client can edit manually, no DB ops knowledge needed |
| **SumUp / Stripe hosted checkout** | Payment collection | No PCI burden, Apple Pay support, instant setup |
| **Claude (Anthropic)** | Agent model in Kapso | Structured extraction + tool use |

## Three-layer reconciliation pipeline

Real-time UX without relying on platform webhooks that may not fire:

```
Layer 1: Fast Watcher (n8n webhook, 5s polling, 5-10 min cap)
  ↓ fires the instant a checkout is created
  ↓ polls GET /checkouts/{id} until PAID/EXPIRED/FAILED/timeout
  ↓ on PAID: write sheet + send customer "payment received" WhatsApp
  ↓ 99% of successful payments captured in <30 sec

Layer 2: SumUp Transaction Polling (n8n cron, every 2 min during biz hours)
  ↓ scans recent SumUp transactions vs unpaid orders
  ↓ scored matching (timestamp + amount + name)
  ↓ catches anything Layer 1 missed (customer paid late, watcher crashed, etc.)

Layer 3: Provider webhook (if available) via /api/webhooks/sumup on our Vercel app
  ↓ fires on browser redirect post-payment (works for desktop/card, NOT Apple Pay)
  ↓ idempotent: can fire in addition to Layers 1 and 2 safely
```

**Why three layers:** SumUp's webhook (`return_url`) only fires on browser redirect. Apple Pay and closed-tab payments skip it. Pure-polling is slow (every N minutes). Combining them gives real-time + guaranteed-eventual consistency.

## Critical design decisions (battle-learned)

### 1. Kapso agent model: **Claude Sonnet 4.6**, temperature 0.1
- Haiku 4.5 leaks internal planning ("I'll save that and ask next question…") → customer sees it
- Temperature 0.3+ adds unwanted creative variance to structured extraction
- Sonnet 4.6 at temp 0.1 gives clean extraction + reliable tool use
- **System prompt MUST include anti-narration rule**: *"NEVER narrate your tool calls. Never say 'I'll save', 'let me note'. Perform tool calls SILENTLY."*

### 2. Timezone discipline
- **Write timestamps as ISO 8601 with offset** (`2026-04-23T22:54:20+01:00`), not naïve local format
- If you MUST use local format in the sheet (for human readability): the downstream matching code must know the timezone. Add a `parseUKDate()`-style helper that detects BST/GMT.
- Bug we hit: Railway n8n is UTC, local-format timestamps from the bot parsed as UTC → 60-min phantom gap during BST → auto-match failed silently.

### 3. Dedupe ALL side-effects on `submission_id`
- Order-writer: KV key `confirmed:${submission_id}`, 10-min TTL (prevents duplicate row on rapid resend)
- Payment confirmation sender: KV key `confirm-sent:${submission_id}`, 7-day TTL (prevents "payment received" double-send)
- Never rely on Sheets uniqueness — it's append-only

### 4. Matching engine threshold: auto-match at 70+, enable "review" node for 40-69
- Scoring: `timestamp (0-50) + amount (0-30) + name (−10 to 20)` = 100 max
- SumUp often returns empty `card_holder_name` → name_score = 0 → clean matches score 80
- **NEVER disable the Review node** unless you also drop matching threshold to 40 — middle-band matches get silently lost otherwise

### 5. Schedule window in UTC, not local
- Customer-facing business hours: 9am-midnight local
- Cron expression: `*/2 8-23 * * 3,4,5,6` (UTC, Wed-Sat, 9am-midnight BST)
- Beware: renaming a n8n node breaks `connections[]` which keys by node NAME (not ID) — don't rename triggers

### 6. Headers in Google Sheets can drift
- A column labeled "Submission ID" in the UI can show as `b50PER2` to the API (emoji, frozen-row render quirk)
- **Always add tolerant lookup** to any code that reads the sheet by header name — try canonical name first, then known aliases, then scan all columns for expected value shape

## Component checklist (per new client)

### Kapso setup
- [ ] WhatsApp phone connected via Kapso onboarding
- [ ] Workflow created with: start → agent → decide (router function) → function (order-writer) → function (create-checkout) → send_text (payment link) → end
- [ ] Agent: Sonnet 4.6, temp 0.1, system prompt includes anti-narration + save_variable patterns
- [ ] Functions deployed: `router`, `order-writer`, `create-sumup-checkout`, `send-payment-confirmation`, `escalation-notifier`
- [ ] Function secrets: `KAPSO_API_KEY`, `PHONE_NUMBER_ID`, `GOOGLE_SERVICE_ACCOUNT` (JSON), `SHEET_ID`, `TUNMISE_PHONE` (for escalation), `N8N_WEBHOOK_URL`, `N8N_ESCALATION_WEBHOOK`

### Google Sheet structure (Orders tab, A:X minimum)
- A: Submission ID (ALWAYS name this column literally, no emojis)
- B: Respondent ID (conversation ID)
- C: Submitted at (ISO 8601 with TZ)
- D: Full Name
- E: Phone Number (can be empty for BSUID-only customers post-2026)
- F-K: product quantity columns
- L: Delivery Address, M: Postcode, N: Town
- O: Delivery Time, P: Special Instructions
- Q-R: Consent / channel
- S: Basket Total
- T: BSUID, U: Username, V: Parent BSUID (WhatsApp BSUID migration)
- W: Payment Status
- X: Payment Reference
- Y: Payment Amount
- Z: Payment Match
- AA-AD: Refund Amount / Date / Reason / Method

### n8n workflows (minimum 3)
- [ ] **SumUp Transaction Polling** — cron `*/2 8-23 * * 3-6`, 3-tier matching, marks orders paid
- [ ] **Fast Checkout Watcher** — webhook-triggered, polls single checkout, short-circuit on PAID
- [ ] **Central Error Handler** — errorTrigger, sends ntfy on any workflow failure

### Vercel dashboard (company-website monorepo)
- [ ] `/api/webhooks/sumup` route with POST + GET handlers
- [ ] `lib/google-sheets.ts` `updatePaymentStatus` with tolerant header lookup
- [ ] Client dashboard at `/client/[slug]` reading from Sheets

### Secrets required
| Secret | Where | Value |
|---|---|---|
| `KAPSO_API_KEY` | Kapso function env, n8n workflow env | from Kapso console |
| `KAPSO_API_BASE_URL` | as above | `https://api.kapso.ai` |
| `PHONE_NUMBER_ID` | Kapso function env | from Kapso's `/whatsapp/phone_numbers` |
| `GOOGLE_SERVICE_ACCOUNT` | Kapso function env, Vercel env | JSON string |
| `SHEET_ID` | Kapso function env, n8n workflow inline | Google Sheets ID |
| `SUMUP_API_KEY` | n8n credentials, Vercel env | `sup_sk_...` — NOTE: normal merchant accounts don't have `eu-bank` scope so webhook-register API is blocked |
| `N8N_API_KEY` | local tooling only | JWT from n8n Settings |
| `N8N_FAST_WATCHER_URL` | Kapso `create-sumup-checkout` env | webhook URL of Fast Watcher n8n workflow |

## Rollout sequence (first client, new deployment)
1. Set up Kapso project + WhatsApp phone
2. Set up Google Sheet (copy template with correct headers)
3. Deploy Kapso functions (no workflow yet) — just test function invocation
4. Deploy n8n SumUp Transaction Polling workflow — run manually against test order
5. Build Kapso workflow graph, connect functions
6. Deploy Fast Watcher workflow, set N8N_FAST_WATCHER_URL in Kapso
7. Deploy Vercel dashboard
8. Test end-to-end: place a £0.50 order, complete payment, verify sheet + WhatsApp confirmation both fire
9. Go live

## Known blockers / things that always bite
- **SumUp `return_url` behavior varies by payment method** — Apple Pay doesn't redirect reliably. Don't rely on it.
- **SumUp webhook register API (`/me/settings/webhook_url`) requires `eu-bank` scope** — not available on normal merchant accounts. Don't attempt — use polling.
- **n8n Code node has a 300s task-runner WebSocket timeout** — can't use Code for long-running polling loops. Use native HTTP + Wait + IF + loopback instead.
- **Kapso workflow graph is stored server-side; local file exports go stale** — always pull fresh before editing (`get-graph.js --workflow-id X`), NEVER push an old local copy
- **n8n connections key by node NAME**, not ID — renaming a trigger breaks downstream routing silently
- **n8n webhook `responseMode: responseNode` doesn't record executions reliably on self-hosted** — use `onReceived` with `responseCode: 202` for fire-and-forget webhooks

## Files to copy for new client
```
clients/NEW_CLIENT/
├─ whatsapp-bot/
│  ├─ workflow-graph.json         # copy from E'Manuel, rewire products/pricing
│  ├─ functions/
│  │  ├─ order-writer.js          # reusable with minor config
│  │  ├─ create-sumup-checkout.js # reusable, change SumUp merchant_code
│  │  ├─ send-payment-confirmation.js # reusable as-is
│  │  ├─ escalation-notifier.js   # reusable, change TUNMISE_PHONE
│  │  └─ router.js                # reusable, change product detection
│  ├─ agent-system-prompt.md      # rewrite products/catalogue
│  └─ .env                        # client-specific IDs
├─ n8n-workflows/
│  ├─ 01-sumup-transaction-polling.json
│  ├─ 03-sumup-checkout-links.json (schedule-based fallback)
│  └─ 09-fast-checkout-watcher.json
└─ CLAUDE.md                      # client dossier
```

## Reference examples
- **E'Manuel Bakery** — `/clients/emanuel-bakery/` — original implementation
- **Tasty E Kitchen** — `/clients/tasty-e-kitchen/` — variant (restaurant, no SumUp yet)
