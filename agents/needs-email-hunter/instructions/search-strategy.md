# Email Search Strategy

Run these searches in order for each lead, stopping as soon as you find a verified email. Max 4 searches per lead.

## Search 1 — Direct domain email patterns
- WebSearch: `"contact@{domain}"` OR `"info@{domain}"` OR `"hello@{domain}"`
- If the lead has a Contact Name, also try: `"{first name}@{domain}"`

## Search 2 — Website contact page
- If the lead has a website/domain, WebFetch their contact page: `https://{domain}/contact` or `https://{domain}/contact-us`
- If WebFetch returns 403, WebSearch: `site:{domain} contact email`
- Scan for any email address on the page

## Search 3 — Business directories
- WebSearch: `"{business name}" "{location}" email` OR `"{business name}" site:yell.com` OR `"{business name}" site:facebook.com`
- Check Google Maps / Google Business Profile listings
- Check Facebook About page if found

## Search 4 — Owner name + business search
- WebSearch: `"{contact name}" "{business name}" email`
- WebSearch: `"{business name}" "{location}" "email us"` OR `"get in touch"`

## Email Validation
When you find a potential email, do a basic sanity check:
- Does the domain match the business website?
- Is the format reasonable (not a noreply@ or auto-generated address)?
- Did it come from a credible source (official website, directory, social page)?

If the email looks suspicious or the domain doesn't match, note it as "unverified" in Lead Intelligence but still record it — mark it clearly.

## Edge Cases
- **Lead has no website/domain:** Skip Search 1 and 2, go straight to directory and name-based searches (Search 3 and 4).
- **Lead has no Contact Name:** Skip name-based searches, focus on domain and directory searches.
- **Lead's website is down:** Note in Lead Intelligence: "Website appears down as of {date}." Try directory searches only.
- **Multiple emails found:** Use the most specific one (personal > info@ > contact@ > hello@). Record all found emails in Lead Intelligence.
- **Email found but for wrong person/business:** Do NOT record it. Note in Lead Intelligence what you found and why you rejected it.
