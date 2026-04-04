# Notion API Direct Access (Cloud Agents)

## Why This Exists
The built-in Notion MCP connector does NOT work in Claude Code scheduled task sessions (Anthropic platform bug as of April 2026). Cloud sessions also block outbound `curl` to `api.notion.com` directly.

**Use the Notion Proxy instead** — a lightweight API route on the WorkCrew website that forwards requests to Notion. Cloud agents can call it via WebFetch (POST requests supported).

## Notion Proxy (PRIMARY — use this first)

**Endpoint:** `https://workcrew.io/api/notion-proxy`

**How to call (WebFetch — cloud agents):**
Use `WebFetch` with a POST request. Include the `secret` field INSIDE the JSON body (WebFetch cannot set custom headers).

```
WebFetch url="https://workcrew.io/api/notion-proxy" method="POST" body='{"secret":"<NOTION_PROXY_SECRET>","path":"/databases/34cbc272c1904ac887542435270bea79/query","method":"POST","body":{"page_size":10}}'
```

**Request body format:**
```json
{
  "secret": "<NOTION_PROXY_SECRET from task instructions>",
  "path": "/databases/{database_id}/query",
  "method": "POST",
  "body": { ...notion filter/sort object... }
}
```

**IMPORTANT:** The `secret` field goes IN the JSON body, NOT as a header. This is required because cloud WebFetch cannot set custom headers. curl is blocked in cloud sessions.

**Supported paths:** `/databases/`, `/pages`, `/blocks/`, `/search`

### Example — Query Sales Pipeline
```json
{
  "secret": "<NOTION_PROXY_SECRET>",
  "path": "/databases/34cbc272c1904ac887542435270bea79/query",
  "method": "POST",
  "body": {
    "filter": { "property": "Status", "select": { "equals": "new" } },
    "sorts": [{ "property": "Lead Score", "direction": "descending" }],
    "page_size": 10
  }
}
```

### Example — Fetch a Page (Agent Config / Lead Details)
```json
{
  "secret": "<NOTION_PROXY_SECRET>",
  "path": "/pages/326c6399294e8197b25dfa35c6e51669",
  "method": "GET"
}
```

### Example — Update a Page
```json
{
  "secret": "<NOTION_PROXY_SECRET>",
  "path": "/pages/{page_id}",
  "method": "PATCH",
  "body": {
    "properties": {
      "Status": { "select": { "name": "sent" } }
    }
  }
}
```

### Example — Append to Page Body (Lead Intelligence)
```json
{
  "secret": "<NOTION_PROXY_SECRET>",
  "path": "/blocks/{page_id}/children",
  "method": "PATCH",
  "body": {
    "children": [{
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{ "text": { "content": "[SCOUT 2026-04-04] Found via Google..." } }]
      }
    }]
  }
}
```

### Example — Create a Report Page
```json
{
  "secret": "<NOTION_PROXY_SECRET>",
  "path": "/pages",
  "method": "POST",
  "body": {
    "parent": { "database_id": "2e5017a6fa3c419590e1c26fe14bfc6f" },
    "properties": {
      "Name": { "title": [{ "text": { "content": "Lead Scout Report — 2026-04-04" } }] },
      "Agent": { "select": { "name": "Lead Scout" } },
      "Date": { "date": { "start": "2026-04-04" } }
    },
    "children": [{
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{ "text": { "content": "Report content here..." } }]
      }
    }]
  }
}
```

**Note:** The NOTION_PROXY_SECRET is passed in the task instructions. curl and Python requests are BLOCKED in cloud sessions — always use WebFetch.

---

## Fallback: Direct curl (local agents only — blocked in cloud)

## Authentication
The NOTION_API_KEY is passed in the **task instructions** (not in this file — the repo is public). Read it from your initial prompt. It starts with `ntn_`.

## API Base
```
https://api.notion.com/v1
```

## Required Headers
Every request needs:
```bash
-H "Authorization: Bearer $NOTION_API_KEY" \
-H "Notion-Version: 2022-06-28" \
-H "Content-Type: application/json"
```

## Common Operations

### Query a Database (filter/sort leads)
```bash
curl -s -X POST "https://api.notion.com/v1/databases/{database_id}/query" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "filter": {
      "property": "Status",
      "select": { "equals": "sent" }
    },
    "sorts": [
      { "property": "Lead Score", "direction": "descending" }
    ],
    "page_size": 20
  }'
```

### Get a Page (read Agent Config or lead details)
```bash
curl -s "https://api.notion.com/v1/pages/{page_id}" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28"
```

### Get Page Content (read blocks/body text like Lead Intelligence)
```bash
curl -s "https://api.notion.com/v1/blocks/{page_id}/children?page_size=100" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28"
```

### Create a Page (add new lead to Sales Pipeline)
```bash
curl -s -X POST "https://api.notion.com/v1/pages" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": { "database_id": "{database_id}" },
    "properties": {
      "Business Name": { "title": [{ "text": { "content": "Example Business" } }] },
      "Status": { "select": { "name": "new" } },
      "Email": { "email": "contact@example.com" },
      "Lead Score": { "number": 75 }
    }
  }'
```

### Update a Page (change status, increment follow-up count)
```bash
curl -s -X PATCH "https://api.notion.com/v1/pages/{page_id}" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "properties": {
      "Status": { "select": { "name": "follow_up_1" } },
      "Follow-up Count": { "number": 1 },
      "Last Follow-up Date": { "date": { "start": "2026-04-04" } }
    }
  }'
```

### Append to Page Body (append to Lead Intelligence)
```bash
curl -s -X PATCH "https://api.notion.com/v1/blocks/{page_id}/children" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [{ "text": { "content": "[SCOUT 2026-04-04] Found via Google. Website quality: good." } }]
        }
      }
    ]
  }'
```

### Create a Report Page (Sales Agent Reports)
```bash
curl -s -X POST "https://api.notion.com/v1/pages" \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": { "database_id": "2e5017a6fa3c419590e1c26fe14bfc6f" },
    "properties": {
      "Name": { "title": [{ "text": { "content": "Lead Scout Report — 2026-04-04" } }] },
      "Agent": { "select": { "name": "Lead Scout" } },
      "Date": { "date": { "start": "2026-04-04" } }
    },
    "children": [
      {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [{ "text": { "content": "Report content here..." } }]
        }
      }
    ]
  }'
```

## Key Database IDs
See `notion-ids.md` for all IDs. Quick reference:
- **Sales Pipeline:** `34cbc272c1904ac887542435270bea79`
- **Sales Agent Reports:** `2e5017a6fa3c419590e1c26fe14bfc6f`
- **Agent Config Page:** `326c6399294e8197b25dfa35c6e51669`

## Error Handling
- **401:** API key invalid or expired
- **404:** Page/database ID wrong or not shared with integration
- **400:** Malformed request body — check JSON syntax
- **429:** Rate limited — wait and retry

## Tips
- Always set `NOTION_API_KEY` as a Bash variable at the start: `NOTION_API_KEY="ntn_..."` (read from task instructions)
- Use `jq` if available for parsing JSON responses, otherwise parse with simple grep/string matching
- Paginate results using `has_more` and `next_cursor` fields in query responses
- Property names are CASE-SENSITIVE — match exactly what's in Notion
