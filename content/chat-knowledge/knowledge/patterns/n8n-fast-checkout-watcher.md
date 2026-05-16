# n8n Pattern — Fast Checkout Watcher

**Reusable for:** any hosted-checkout payment (SumUp, Stripe, Square) where you want near-real-time confirmation without relying on provider webhooks.

## The problem
- Provider webhooks (SumUp `return_url`, Stripe endpoints) don't fire 100% of the time — Apple Pay, closed-tab, edge cases drop them silently
- Cron-based reconciliation has a minimum lag = cron interval (typically 2-15 min)
- Customer gets anxious if "payment received" confirmation doesn't arrive in < 60 sec

## The solution
An n8n webhook-triggered workflow that polls ONE SPECIFIC checkout every few seconds for a bounded window (5-10 min), fires side-effects immediately on success.

## Architecture

```
[Webhook] → [Set: init iter=0 + pass-through vars] → [HTTP GET provider checkout]
             ↓                                          ↓
  (upstream                                        [Set: merge fields]
   fires the                                            ↓
   watcher                                         [IF: status == PAID?]
   when it                                           /         \
   creates                                       YES              NO
   the checkout)                                 ↓                 ↓
                                          [Update sheet]   [IF: terminal (EXPIRED|FAILED)?]
                                                 ↓                 /         \
                                          [POST confirmation    STOP (log)    NO
                                           function]                          ↓
                                                 ↓                        [IF: iter < MAX?]
                                          [Log processed]                    /       \
                                                                          YES         STOP
                                                                           ↓          (log)
                                                                       [Wait 5s]
                                                                           ↓
                                                                       [Set: iter+1]
                                                                           ↓
                                                                    → back to [HTTP GET]
```

## Node list
1. **Webhook** (`POST /webhook/X`, `responseMode: onReceived`, `responseCode: 202`)
2. **Init loop state** (Set node) — seeds `iter=0`, pulls body fields into top-level json
3. **GET provider checkout** (HTTP Request) — auth header via credential reference
4. **Merge status** (Set node, `includeOtherFields: false`) — explicit field mapping using `$('Init loop state').first().json.X` + `$json.status` from HTTP
5. **Paid?** (IF node) — `{{ $json.sumup_status }} == "PAID"`
6. **Mark order paid** (Google Sheets update) — match by identity column, write payment fields
7. **Send confirmation** (HTTP POST) — call downstream function (e.g. WhatsApp send)
8. **Log processed** (Google Sheets append) — audit log
9. **Terminal non-paid?** (IF node, on NO branch of Paid?) — EXPIRED or FAILED → stop
10. **More iterations left?** (IF node, on NO branch of Terminal) — `iter < 60` (for 5-min budget)
11. **Wait 5s** (Wait node)
12. **Increment iter** (Set node, `iter + 1`) → loops back to node 3

## Critical gotchas (learned the hard way)

### 1. `responseMode: onReceived` not `responseNode`
Using `responseNode` with a parallel Respond node somehow skips execution persistence on self-hosted n8n. Use `onReceived` with `responseCode: 202`. The webhook responds `{"message":"Workflow was started"}` immediately, execution runs async, persistence works.

### 2. Code nodes can't run for >300s (task-runner WebSocket timeout)
A single Code node doing `while { await fetch; await sleep(5000) }` for 10 min is killed with `InternalTaskRunnerDisconnectAnalyzer.toDisconnectError`. Use native HTTP + Wait + IF loopback instead — each node finishes in <10s.

### 3. `$json` changes after every node
After an HTTP Request node or a Sheets update, `$json` is the node's OUTPUT, not the pipeline's state. Must use `$('NodeName').item.json.X` to pull specific upstream values. Key node to explicitly reference: the Set node that has your canonical state (`Merge status` or similar).

### 4. Set node's `includeOtherFields: true` doesn't preserve fields across HTTP
Setting `includeOtherFields: true` on a Set node after an HTTP Request only preserves fields in the HTTP's OUTPUT, not pre-HTTP state. To carry state across HTTP: explicit references (`$('Init loop state').first().json.X`).

### 5. Loop iter tracking
On loopback iterations, which node holds the "current iter"? Use the Increment node (which runs AFTER Wait). But on first iteration, Increment hasn't run. Solution in Merge status:
```
{{ $('Increment iter').isExecuted ? $('Increment iter').item.json.iter : $('Init loop state').first().json.iter }}
```

### 6. Google Sheets update operation requires EXACT header match
If your identity column header is `b50PER2` (weird but real — frozen row + emoji = API sees garbled name), you must use `b50PER2` as the matching column. Fix the sheet OR fix the workflow.

## Saving executions
Always enable on settings:
```json
{
  "saveDataSuccessExecution": "all",
  "saveDataErrorExecution": "all",
  "saveExecutionProgress": true
}
```
Without these, self-hosted n8n may skip persisting executions for async webhooks — makes debugging impossible.

## Perf budget
- Each iteration: ~500ms HTTP call + 5s wait = 5.5s cycle
- 60 iterations = ~5.5 min max runtime
- Customer pays within 30-60s typically → 6-12 iterations → <90s to confirmation
- SumUp API rate limit: 100 req/sec per merchant — not a concern at our volume

## Reusability across providers
- **SumUp**: `GET /v0.1/checkouts/{id}` → `status` in `PENDING|PAID|EXPIRED|FAILED`
- **Stripe**: `GET /v1/checkout/sessions/{id}` → `payment_status` in `unpaid|paid|no_payment_required`, `status` in `open|complete|expired`
- **Square**: `GET /v2/orders/{id}` → `state` in `OPEN|COMPLETED|CANCELED`

Each needs: auth header, status extraction, terminal-status set. Rest of the workflow is identical.

## When NOT to use this pattern
- **Very low volume** (< 1 order/day): cron polling every 2 min is enough, don't build this
- **High volume** (> 100 orders/hour): polling in-flight checkouts individually doesn't scale — use provider server webhook with retry queue
- **No provider polling API**: some providers (older Square, some regional banks) don't expose a `GET /checkout/{id}` — then you can only rely on webhook + cron reconciliation

## Files
Live reference: `clients/emanuel-bakery/n8n-workflows/09-fast-checkout-watcher.json`
Active on n8n: workflow ID `AOlFd1sRT3NoFlI7` (E'Manuel tenant, Railway)
