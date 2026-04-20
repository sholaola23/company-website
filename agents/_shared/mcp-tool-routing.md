# MCP Tool Routing — Agent Fleet Reference

## IMPORTANT: Local vs Cloud Tool Names

MCP tools have **different names** depending on where the agent runs:

| Environment | How tools load | How to call them |
|---|---|---|
| **Local** (Claude Code desktop) | Deferred — findable via ToolSearch | UUID-prefixed names (see below) |
| **Cloud** (claude.ai/code scheduled tasks) | Deferred — findable via ToolSearch with exact select syntax | `mcp__ServiceName__tool-name` format (see below) |

**Rule for cloud agents:** Use `ToolSearch` with the **exact select syntax** to load cloud connector tools before calling them. Example:
```
ToolSearch  select:mcp__Notion__notion-fetch,mcp__Notion__notion-search,mcp__Notion__notion-update-page
ToolSearch  select:mcp__Zapier__gmail_send_email,mcp__Zapier__gmail_create_draft
```
**NEVER use keyword search** (`ToolSearch notion` or `ToolSearch gmail`) — keyword search will NOT find connector tools. Always use `select:` with the exact `mcp__ServiceName__tool-name`.

---

## Email Tools — GAM CLI (ALL environments)

**ALL email operations use GAM CLI via Bash.** This applies to both local and cloud agents. Never use Gmail MCP or Zapier MCP for email.

### Send Email
```bash
gam user hello@workcrew.io sendemail recipient someone@example.com subject "Subject" message "Body"
# Or with file body:
gam user hello@workcrew.io sendemail recipient someone@example.com subject "Subject" file /tmp/email-body.txt
# Multiple recipients:
gam user hello@workcrew.io sendemail to "a@example.com,b@example.com" singlemessage subject "Subject" file /tmp/email-body.txt
```

### Search Email
```bash
gam user hello@workcrew.io print messages query "is:unread in:inbox" headers subject,from,date showsnippet max_to_print 20
```

### Read Email
```bash
gam user hello@workcrew.io show messages ids <MessageID> showbody showdate
```

### Reply to Thread
```bash
gam user hello@workcrew.io sendemail to "recipient@example.com" subject "Re: Original" file /tmp/reply.txt threadid <ThreadID> header "In-Reply-To" "<message-id>"
```

**NEVER use:** Gmail MCP (`mcp__f6ee3950-*`), Zapier MCP (`mcp__8ccf50b7-*__gmail_*`), or any other tool for email.
**Account:** `hello@workcrew.io` — all outbound email goes from the company address.
**Internal notifications to Olushola:** send to `olusholaoladipupo1@gmail.com` via GAM (still from hello@workcrew.io).

---

## Notion Tools

### Local (Claude Code desktop)
- All Notion read/write: `mcp__7ce036d0-a091-4c5b-8498-e155ede16e1a__notion-*`

### Cloud (claude.ai/code scheduled tasks)
Load these tools FIRST via ToolSearch: `ToolSearch  select:mcp__Notion__notion-fetch,mcp__Notion__notion-search,mcp__Notion__notion-create-pages,mcp__Notion__notion-update-page`
- **Fetch page/database:** `mcp__Notion__notion-fetch`
- **Search workspace:** `mcp__Notion__notion-search`
- **Create pages:** `mcp__Notion__notion-create-pages`
- **Update page:** `mcp__Notion__notion-update-page`
- **Move pages:** `mcp__Notion__notion-move-pages`
- **Get comments:** `mcp__Notion__notion-get-comments`
- **Create comment:** `mcp__Notion__notion-create-comment`
- **Get users:** `mcp__Notion__notion-get-users`

---

## Browser / Web Tools
- **Public pages (no login required):** `mcp__plugin_chrome-devtools-mcp_chrome-devtools__*`
- **Authenticated sessions (Vercel, Meta Ads, Gmail UI, Beehiiv):** `mcp__Claude_in_Chrome__*`
- **NEVER use WebFetch for HTML/DOM verification** — it returns raw HTML without rendering. Use the browser tools above.
- **For simple JSON APIs and public content:** WebFetch / WebSearch are fine.

---

## Google Docs / Drive (Zapier)

### Local
- Create document: `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__google_docs_create_document_from_text`

### Cloud
Load via ToolSearch first: `ToolSearch  select:mcp__Zapier__google_docs_create_document_from_text`
- Create document: `mcp__Zapier__google_docs_create_document_from_text`
