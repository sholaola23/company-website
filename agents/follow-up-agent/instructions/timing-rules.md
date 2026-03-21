# Follow-up Timing Rules

## Group A: First follow-up due
- Status = `sent`
- Sent Date is 3+ days ago (NOT Outreach Date — Sent Date is when Olushola actually sent)
- Follow-up Count = 0

## Group B: Second follow-up due
- Status = `follow_up_1`
- Last Follow-up Date is 3+ days ago
- Follow-up Count = 1

## Group C: Third follow-up due
- Status = `follow_up_2`
- Last Follow-up Date is 4+ days ago (extra day for final touch)
- Follow-up Count = 2

## Group D: Max follow-ups reached — mark cold
- Status = `follow_up_3` (shouldn't normally exist, but catch any)
- OR: Follow-up Count = 3
- Action: Update Status → `cold`, add Notes "Marked cold after 3 follow-ups with no reply"

## Critical: Check for Replies FIRST
Before drafting ANY follow-up, search Gmail: `from:{lead's email address}`
If a reply exists (any reply, even auto-responder): SKIP this lead. Agent 4 (Qualifier) handles replies.

## Stale Draft Detection
Also check for:
- Status = `drafted` AND Outreach Date is 3+ days ago → flag as stale
- Status = `sent` AND Sent Date is 10+ days ago AND Follow-up Count = 0 → flag as missed

## Status Updates After Follow-up
- `sent` → `follow_up_1` (Follow-up Count: 0→1)
- `follow_up_1` → `follow_up_2` (Follow-up Count: 1→2)
- `follow_up_2` → `follow_up_3` (Follow-up Count: 2→3)
