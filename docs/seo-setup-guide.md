# SEO Setup Guide — WorkCrew

Complete guide for search engine submission, directory listings, and technical SEO for oladipupoconsulting.co.uk.

---

## 1. Google Search Console Setup

**Time required:** 5-10 minutes
**URL:** https://search.google.com/search-console

### Steps:

1. **Go to** https://search.google.com/search-console and sign in with your Google account (olusholaoladipupo1@gmail.com).

2. **Add Property:**
   - Click "Add property" (top-left dropdown)
   - Choose **"URL prefix"** method
   - Enter: `https://oladipupoconsulting.co.uk`
   - Click "Continue"

3. **Verify Ownership** (choose ONE method):

   **Option A — DNS TXT Record (Recommended for Cloudflare):**
   - Google will show you a TXT record value like `google-site-verification=XXXXXXXXXXXX`
   - Go to Cloudflare dashboard > oladipupoconsulting.co.uk > DNS
   - Click "Add record"
   - Type: `TXT`
   - Name: `@`
   - Content: paste the verification string Google gave you
   - TTL: Auto
   - Save, then go back to Google and click "Verify"
   - Note: DNS can take up to 48 hours but usually works within minutes on Cloudflare

   **Option B — HTML Meta Tag:**
   - Google will give you a meta tag like `<meta name="google-site-verification" content="XXXX" />`
   - Add it to `app/layout.tsx` metadata:
     ```ts
     export const metadata: Metadata = {
       verification: {
         google: "XXXX", // paste just the content value
       },
       // ... rest of metadata
     };
     ```
   - Deploy the site, then verify in GSC

4. **Submit Sitemap:**
   - In the left sidebar, click **Indexing > Sitemaps**
   - In the "Add a new sitemap" field, type: `sitemap.xml`
   - Click "Submit"
   - Status should show "Success" after a few moments

5. **Request Indexing for Key Pages:**
   - Go to the URL inspection tool (top search bar)
   - Enter each key URL one by one and click "Request Indexing":
     - `https://oladipupoconsulting.co.uk/`
     - `https://oladipupoconsulting.co.uk/services`
     - `https://oladipupoconsulting.co.uk/case-studies`
     - `https://oladipupoconsulting.co.uk/audit`
     - `https://oladipupoconsulting.co.uk/blog`
     - `https://oladipupoconsulting.co.uk/contact`

---

## 2. Bing Webmaster Tools Setup

**Time required:** 5 minutes
**URL:** https://www.bing.com/webmasters

### Steps:

1. **Go to** https://www.bing.com/webmasters and sign in with a Microsoft, Google, or Facebook account.

2. **Import from Google Search Console (Fastest):**
   - If GSC is already set up, click "Import from GSC"
   - Sign in with the same Google account
   - Select oladipupoconsulting.co.uk
   - Click Import — verification is automatic

   **OR Manual Setup:**
   - Click "Add your site manually"
   - Enter: `https://oladipupoconsulting.co.uk`
   - Verify via XML file upload or HTML meta tag
   - For meta tag, add to `app/layout.tsx`:
     ```ts
     export const metadata: Metadata = {
       verification: {
         google: "XXXX",
         // Bing uses 'other' in Next.js metadata
         other: {
           "msvalidate.01": "BING_VERIFICATION_CODE",
         },
       },
     };
     ```

3. **Submit Sitemap:**
   - Go to Sitemaps in the left menu
   - Click "Submit sitemap"
   - Enter: `https://oladipupoconsulting.co.uk/sitemap.xml`
   - Click Submit

4. **Enable IndexNow (optional but recommended):**
   - Bing supports IndexNow for instant indexing of new/updated content
   - Consider adding the `next-sitemap` IndexNow integration later

---

## 3. Schema Markup (JSON-LD) — Already Implemented

The following JSON-LD structured data has been added to the website:

- **Homepage:** `ProfessionalService` schema with business name, contact, services, and pricing
- **Services page:** `ItemList` schema listing all 12 services with pricing
- **Blog posts:** `Article` schema with author, date, headline (static posts)
- **Dynamic blog posts:** `Article` schema via the [slug] template

These help Google display rich results (star ratings, pricing, service lists) in search results.

---

## 4. UK Business Directory Listings

List your business on these directories for SEO citation building and direct traffic. **Keep NAP (Name, Address, Phone) consistent across ALL listings.**

**Business details to use everywhere:**
- **Name:** WorkCrew Ltd
- **Website:** https://oladipupoconsulting.co.uk
- **Email:** hello@workcrew.io
- **Phone:** +44 7469 347654
- **Category:** IT Consulting / AI Automation / Business Consulting
- **Description:** AI automation systems, professional websites, and AI training for small businesses. We help SMBs save time and grow with intelligent automation — delivered in 7 days.

### Priority 1 — Essential (do these first)

#### 1. Google Business Profile
- **URL:** https://business.google.com
- **Category:** "IT Consulting", "Business Consulting Service"
- **Cost:** Free
- **SEO Value:** HIGHEST — controls local map pack rankings
- **Steps:**
  1. Go to business.google.com, sign in
  2. Click "Add your business"
  3. Enter "WorkCrew Ltd"
  4. Select category "IT Consulting" (add "Business Consulting Service" as secondary)
  5. Since you serve clients remotely, select "I deliver goods and services to my customers" and choose "Yes" for service area
  6. Set service area to "United Kingdom" or specific cities
  7. Add phone, website, hours, description, photos
  8. Verify via postcard, phone, or email (Google will offer options)

#### 2. Bing Places for Business
- **URL:** https://www.bingplaces.com
- **Category:** IT Consulting
- **Cost:** Free
- **SEO Value:** HIGH — powers Bing Maps, Cortana, and Edge browser
- **Steps:** Can import directly from Google Business Profile. Click "Import from Google" after signing in.

#### 3. Apple Business Connect
- **URL:** https://businessconnect.apple.com
- **Category:** Technology Consulting
- **Cost:** Free
- **SEO Value:** HIGH — powers Apple Maps, Siri, and Safari suggestions
- **Steps:** Sign in with Apple ID, claim your business, fill in details.

### Priority 2 — High Value (do these within 1 week)

#### 4. Yell.com
- **URL:** https://www.yell.com/free-listing/
- **Category:** IT Consultants / Business Consultants
- **Cost:** Free basic listing (paid upgrades available, skip them)
- **SEO Value:** HIGH — DA 72, largest UK-specific directory
- **Steps:** Click "Add your business for free", fill in business details, verify via phone/email.

#### 5. FreeIndex
- **URL:** https://www.freeindex.co.uk
- **Category:** IT Consultants / Computer Consultants
- **Cost:** Free
- **SEO Value:** HIGH — DA 55, frequently crawled by Google (indexed within 24 hours)
- **Steps:** Register, add business details, select categories. Ask clients for reviews here too.

#### 6. Thomson Local
- **URL:** https://www.thomsonlocal.com/business-signup
- **Category:** IT Consultants
- **Cost:** Free
- **SEO Value:** MEDIUM-HIGH — DA 52, established UK directory
- **Steps:** Sign up, verify business, complete profile with description and services.

#### 7. Clutch.co
- **URL:** https://clutch.co/register
- **Category:** IT Services / AI Development / Consulting
- **Cost:** Free basic profile
- **SEO Value:** HIGH — DA 72, specifically for B2B service providers
- **Steps:** Register as a service provider, complete company profile, list services. Great for credibility with business clients.

### Priority 3 — Good to Have (do these within 2 weeks)

#### 8. Bark.com
- **URL:** https://www.bark.com/en/gb/company-registration/
- **Category:** IT Consultant / Business Consultant
- **Cost:** Free to list (pay per lead if you want leads from their platform)
- **SEO Value:** MEDIUM — DA 60, UK-focused lead gen platform
- **Steps:** Register as a professional, complete profile, set service area.

#### 9. Yelp UK
- **URL:** https://biz.yelp.co.uk
- **Category:** IT Services & Computer Repair / Professional Services
- **Cost:** Free
- **SEO Value:** MEDIUM — DA 93, well-established
- **Steps:** Claim or add your business, verify, complete profile.

#### 10. Cylex UK
- **URL:** https://www.cylex-uk.co.uk
- **Category:** IT Consulting / Computer Services
- **Cost:** Free
- **SEO Value:** MEDIUM — DA 47, helps with citation consistency
- **Steps:** Register, add business, verify via phone or email.

### Bonus Directories (worth doing if you have time)

| Directory | URL | Cost | Notes |
|-----------|-----|------|-------|
| 192.com | business.192.com | Free | Consumer directory |
| Hotfrog | hotfrog.co.uk | Free | UK business listings |
| Bizify | bizify.co.uk | Free | UK focused |
| Scoot | scoot.co.uk | Free | Syndicates to 6 other directories |
| Trustpilot | trustpilot.com | Free | Review platform, high DA |
| Foursquare | foursquare.com | Free | Feeds data to Apple Maps, Uber |

### Tips for Directory Listings

1. **NAP Consistency is critical** — use the EXACT same business name, address format, and phone number everywhere. Inconsistencies hurt local SEO.
2. **Complete every profile fully** — add description, services, hours, photos, website link.
3. **Use the same description** across all directories (the one provided above).
4. **Add photos** — your logo at minimum. Business photos if you have them.
5. **Request reviews** on Google Business Profile and FreeIndex first — these carry the most weight.
6. **Track your listings** — create a spreadsheet to track which directories you have listed on, login credentials, and date listed.

---

## 5. Internal Linking Improvements — Already Implemented

The following internal links have been added to blog posts:

### Blog: "5 Ways AI Can Save Your Small Business 10+ Hours a Week"
- Section 1 (Appointment Booking) links to `/services/lead-intake`
- Section 2 (Email Responses) links to `/services/email-assistant`
- Section 5 (Social Media) links to `/services/social-media`

### Blog: "Why Every Local Business Needs a Website in 2026"
- Section 3 (Clear Contact/Booking) links to `/services/lead-intake`
- Section about our offering links to `/services/business-website`
- Case study mention links to `/case-studies/quantumfm-media`

---

## Checklist

- [ ] Google Search Console — verify property
- [ ] Google Search Console — submit sitemap
- [ ] Google Search Console — request indexing for key pages
- [ ] Bing Webmaster Tools — verify property
- [ ] Bing Webmaster Tools — submit sitemap
- [ ] Google Business Profile — create and verify listing
- [ ] Bing Places — import from Google
- [ ] Apple Business Connect — create listing
- [ ] Yell.com — create free listing
- [ ] FreeIndex — create listing
- [ ] Thomson Local — create listing
- [ ] Clutch.co — create profile
- [ ] Bark.com — register
- [ ] Yelp UK — claim listing
- [ ] Cylex UK — create listing
- [ ] Verify JSON-LD shows correctly in Google Rich Results Test (https://search.google.com/test/rich-results)
