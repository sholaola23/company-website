# Email Sender Identity & Method

## Email Tool: GAM CLI (MANDATORY)

**ALL email operations use GAM CLI via Bash.** Never use Gmail MCP, Zapier MCP, or any other tool for email.

Binary: `/Users/olushola/bin/gamadv-xtd3/gam` (aliased as `gam`)
Account: `hello@workcrew.io`

### Send Email
```bash
# Single recipient
gam user hello@workcrew.io sendemail recipient someone@example.com subject "Subject" message "Body"

# Multiple recipients
gam user hello@workcrew.io sendemail to "person1@example.com,person2@example.com" singlemessage subject "Subject" message "Body"

# Body from file (preferred for longer emails)
gam user hello@workcrew.io sendemail recipient someone@example.com subject "Subject" file /tmp/email-body.txt

# With CC/BCC
gam user hello@workcrew.io sendemail to "main@example.com" cc "copy@example.com" subject "Subject" file /tmp/email-body.txt
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
gam user hello@workcrew.io sendemail to "recipient@example.com" subject "Re: Original Subject" file /tmp/reply.txt threadid <ThreadID> header "In-Reply-To" "<original-message-id>"
```

## Sender Identity

### For ALL client/prospect-facing emails (sends AND drafts)
- **from:** `hello@workcrew.io` (automatic with GAM — this is the account)
- **from_name:** `Olushola from WorkCrew`

### For internal notifications to Olushola
- **to:** `olusholaoladipupo1@gmail.com`
- **from:** `hello@workcrew.io` (still via GAM)

## Rules
- NEVER use Gmail MCP tools (`mcp__f6ee3950-*`) — those are for personal email only
- NEVER use Zapier MCP tools (`mcp__8ccf50b7-*`) for email
- NEVER send or draft client-facing emails from the personal Gmail address
- Always write email body to a temp file for emails longer than one sentence
- Always use the business email `hello@workcrew.io` for ALL outbound communication
