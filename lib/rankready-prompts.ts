// ============================================================================
// RankReady Local SEO Tool — Claude Prompt Chain
// ============================================================================
//
// Architecture: Sequential chain with shared context object.
// Model: Claude Sonnet (quality IS the product).
// Each prompt receives the business input + outputs from prior steps.
// The generateFullReport() function chains all 5 in sequence.
//
// ============================================================================

import { ANTHROPIC_API_URL, ANTHROPIC_VERSION } from "@/lib/constants";
import type {
  RankReadyInput,
  RankReadyReport,
  RankReadyFormData,
  CategoryAuditOutput,
  GBPDescriptionOutput,
  ReviewStrategyOutput,
  PostingCalendarOutput,
  ServiceDescriptionsOutput,
} from "@/lib/rankready-types";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 4096;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCompetitors(input: RankReadyInput): string {
  return input.competitors
    .map((c, i) => {
      let line = `${i + 1}. ${c.name}`;
      if (c.gbpUrl) line += ` (GBP: ${c.gbpUrl})`;
      if (c.website) line += ` (Website: ${c.website})`;
      return line;
    })
    .join("\n");
}

function formatServiceAreas(input: RankReadyInput): string {
  return input.serviceAreas.join(", ");
}

function formatAllServices(input: RankReadyInput): string {
  return [input.primaryService, ...input.secondaryServices]
    .filter(Boolean)
    .join(", ");
}

async function callClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorBody}`);
  }

  const data = (await response.json()) as {
    content: { type: string; text: string }[];
  };
  const textBlock = data.content.find((b) => b.type === "text");
  if (!textBlock) {
    throw new Error("No text block in Claude response");
  }
  return textBlock.text;
}

function extractJSON(raw: string): string {
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();
  return raw.trim();
}

// ============================================================================
// PROMPT 1: GBP Category Audit
// ============================================================================

const GBP_CATEGORY_AUDIT_SYSTEM = `You are an expert local SEO consultant with 14 years of experience optimising Google Business Profiles for service businesses across the UK.

Your speciality is GBP category optimisation — choosing the right primary and secondary categories to maximise visibility for high-intent local searches.

You know that:
- Wrong categories = invisible for high-intent searches
- Google allows 1 primary + up to 9 secondary categories
- Category selection directly impacts which search queries trigger the listing
- Competitors' categories reveal market positioning and untapped opportunities
- Some categories unlock features (booking, menus, service lists) that others don't

You MUST respond with ONLY valid JSON. No markdown, no code fences, no explanatory text outside the JSON.`;

function buildGBPCategoryAuditUserPrompt(input: RankReadyInput): string {
  return `BUSINESS DETAILS:
- Business name: ${input.businessName}
- Address: ${input.address}
- Industry/type: ${input.primaryService}
- Primary service: ${input.primaryService}
- Secondary services: ${input.secondaryServices.join(", ") || "None specified"}
- Service areas: ${formatServiceAreas(input)}
- Years in business: ${input.yearsInBusiness}
${input.gbpUrl ? `- GBP URL: ${input.gbpUrl}` : "- No GBP URL provided"}
${input.website ? `- Website: ${input.website}` : ""}

COMPETITORS:
${formatCompetitors(input)}

TASK:
Analyse the Google Business Profile categories for this business and its competitors.

1. Identify the optimal primary category for this type of business
2. Recommend up to 9 secondary categories, each with priority ranking
3. For each recommended category, list the specific search queries it helps rank for
4. Compare against what the competitors are likely using based on their business type and positioning
5. Identify categories that ALL competitors likely share (table stakes) vs unique opportunities
6. Flag any categories the business should avoid or remove

OUTPUT FORMAT (strict JSON):
{
  "recommended_primary": {
    "category": "string",
    "reason": "string",
    "searches_it_unlocks": ["string"]
  },
  "recommended_secondary": [
    {
      "category": "string",
      "reason": "string",
      "searches_it_unlocks": ["string"],
      "priority": "high" | "medium" | "low"
    }
  ],
  "competitor_comparison": [
    {
      "competitor": "string",
      "likely_categories": ["string"],
      "unique_categories": ["string"]
    }
  ],
  "categories_to_remove": [
    { "category": "string", "reason": "string" }
  ],
  "shared_by_all_competitors": ["string"],
  "unique_opportunities": ["string"],
  "summary": "2-3 sentence plain English summary of the biggest category wins"
}`;
}

export async function generateGBPCategoryAudit(
  input: RankReadyInput
): Promise<string> {
  const raw = await callClaude(
    GBP_CATEGORY_AUDIT_SYSTEM,
    buildGBPCategoryAuditUserPrompt(input)
  );
  const json = extractJSON(raw);
  JSON.parse(json) as CategoryAuditOutput;
  return json;
}

// ============================================================================
// PROMPT 2: GBP Description
// ============================================================================

const GBP_DESCRIPTION_SYSTEM = `You are an expert local SEO copywriter who specialises in Google Business Profile descriptions for UK service businesses.

You know that:
- The GBP description has a STRICT 750 character limit — Google truncates beyond this
- The description is NOT a direct ranking factor but influences click-through rate and user trust
- Keywords in the description help Google understand what the business does
- Mentioning service areas signals geographic relevance
- Trust signals (years in business, qualifications, guarantees) increase conversion
- The description should read naturally — keyword stuffing hurts credibility

You MUST respond with ONLY valid JSON. No markdown, no code fences, no explanatory text outside the JSON.`;

function buildGBPDescriptionUserPrompt(input: RankReadyInput): string {
  return `BUSINESS DETAILS:
- Business name: ${input.businessName}
- Address: ${input.address}
- Primary service: ${input.primaryService}
- All services: ${formatAllServices(input)}
- Service areas: ${formatServiceAreas(input)}
- Years in business: ${input.yearsInBusiness}
- Target customer: ${input.targetCustomer}
${input.website ? `- Website: ${input.website}` : ""}

TASK:
Write 3 Google Business Profile descriptions for this business.

Each description MUST:
1. Be 750 characters or fewer (count EVERY character including spaces — this is a hard limit)
2. Include the business name naturally in the first sentence
3. Mention the primary city/town AND at least 2 additional service areas
4. Include at least 3 service keywords naturally
5. End with a call-to-action (call, visit website, book)
6. Sound human and trustworthy — not keyword-stuffed

VARIANTS:
- "keyword-focused": Maximise relevant service and location keywords while staying natural
- "conversion-focused": Focus on benefits, social proof, and urgency to drive action
- "trust-focused": Emphasise experience, qualifications, reliability, and guarantees

OUTPUT FORMAT (strict JSON):
{
  "variants": [
    {
      "label": "keyword-focused" | "conversion-focused" | "trust-focused",
      "text": "string (750 chars max)",
      "character_count": number,
      "keywords_used": ["string"],
      "areas_mentioned": ["string"]
    }
  ],
  "tips": ["string — 2-3 quick tips for when to update the description"]
}`;
}

export async function generateGBPDescription(
  input: RankReadyInput
): Promise<string> {
  const raw = await callClaude(
    GBP_DESCRIPTION_SYSTEM,
    buildGBPDescriptionUserPrompt(input)
  );
  const json = extractJSON(raw);
  JSON.parse(json) as GBPDescriptionOutput;
  return json;
}

// ============================================================================
// PROMPT 3: Review Strategy
// ============================================================================

const REVIEW_STRATEGY_SYSTEM = `You are a local SEO expert who specialises in review generation strategy for UK service businesses.

You know that:
- Reviews are the #1 local ranking factor according to every major SEO study
- Review VELOCITY (new reviews per month) matters more than total count
- Reviews containing service keywords + location naturally boost local rankings
- 10 keyword-rich reviews per month = 120 pieces of keyword content per year on the GBP
- Google penalises businesses that explicitly ask customers to include specific keywords
- The trick is to prompt natural keyword mentions through the way you frame the request
- Responding to EVERY review (positive and negative) signals engagement to Google
- Review responses are another opportunity to naturally include keywords and locations

You MUST respond with ONLY valid JSON. No markdown, no code fences, no explanatory text outside the JSON.`;

function buildReviewStrategyUserPrompt(
  input: RankReadyInput,
  priorContext: string
): string {
  return `BUSINESS DETAILS:
- Business name: ${input.businessName}
- Address: ${input.address}
- Primary service: ${input.primaryService}
- All services: ${formatAllServices(input)}
- Service areas: ${formatServiceAreas(input)}
- Target customer: ${input.targetCustomer}
- Current review count: ${input.currentReviewCount}
- Current star rating: ${input.currentStarRating}
- Years in business: ${input.yearsInBusiness}

PRIOR ANALYSIS CONTEXT (from GBP Category Audit and Description — use for consistency):
${priorContext}

TASK:
Create a complete review generation and management strategy for this business.

1. REVIEW VELOCITY TARGET:
   - Based on their current count, industry benchmarks, and competitor landscape
   - Realistic monthly target that compounds over 12 months

2. REVIEW REQUEST TEMPLATES (3 versions):
   - WhatsApp/SMS message (under 200 characters, includes {{REVIEW_LINK}} placeholder)
   - Email template (friendly, 4-5 sentences, includes {{REVIEW_LINK}} and {{CUSTOMER_NAME}})
   - In-person script (what staff should say after completing a job/service)
   Each template should naturally encourage the customer to mention:
   - The specific service they received
   - Their location/area
   WITHOUT explicitly saying "mention these keywords"

3. KEYWORD PHRASES FOR CUSTOMERS:
   - 5 phrases you WANT customers to naturally use in reviews
   - These inform the request template framing

4. REVIEW RESPONSE TEMPLATES (4 types):
   - 5-star response (thank them, naturally mention the service and area)
   - 4-star response (thank them, acknowledge room for improvement)
   - 3-star response (thank them, address concerns, invite back)
   - 1-2 star response (professional, empathetic, offer to resolve offline)
   Each response should naturally include the business name, service keyword, and area

5. PLAYBOOK:
   - When to ask (timing after service)
   - Who to ask first (prioritise)
   - How to maintain consistent velocity
   - Monthly plan for the first 3 months

OUTPUT FORMAT (strict JSON):
{
  "review_velocity_target": number,
  "current_assessment": "string",
  "request_templates": {
    "whatsapp": "string",
    "email": "string",
    "in_person": "string"
  },
  "response_templates": {
    "five_star": "string",
    "four_star": "string",
    "three_star": "string",
    "one_to_two_star": "string"
  },
  "keyword_phrases_for_customers": ["string"],
  "playbook": {
    "timing": "string",
    "who_to_ask": "string",
    "frequency": "string",
    "monthly_plan": ["Month 1: ...", "Month 2: ...", "Month 3: ..."]
  },
  "quick_wins": ["string — top 3 things to do this week"]
}`;
}

export async function generateReviewStrategy(
  input: RankReadyInput,
  priorContext: string
): Promise<string> {
  const raw = await callClaude(
    REVIEW_STRATEGY_SYSTEM,
    buildReviewStrategyUserPrompt(input, priorContext)
  );
  const json = extractJSON(raw);
  JSON.parse(json) as ReviewStrategyOutput;
  return json;
}

// ============================================================================
// PROMPT 4: GBP Posting Calendar
// ============================================================================

const POSTING_CALENDAR_SYSTEM = `You are a local SEO content strategist who creates Google Business Profile posting calendars for UK service businesses.

You know that:
- GBP posts signal activity to Google and contain keyword-rich content that aids ranking
- 2-3 posts per week is the optimal frequency — enough to stay active without overwhelming
- Posts expire after 6 months but their SEO value compounds
- Every post should mention at least 1 service keyword AND 1 location naturally
- Post types should rotate: service spotlight, area spotlight, tips, before/after, seasonal, offers
- Posts with photos get 2x engagement — always suggest a specific image
- CTA buttons (Book, Call, Learn More) drive direct conversions from the listing
- Almost nobody does GBP posting consistently — this is a massive competitive advantage

You MUST respond with ONLY valid JSON. No markdown, no code fences, no explanatory text outside the JSON.`;

function buildPostingCalendarUserPrompt(
  input: RankReadyInput,
  priorContext: string
): string {
  return `BUSINESS DETAILS:
- Business name: ${input.businessName}
- Address: ${input.address}
- Primary service: ${input.primaryService}
- All services: ${formatAllServices(input)}
- Service areas: ${formatServiceAreas(input)}
- Target customer: ${input.targetCustomer}
- Years in business: ${input.yearsInBusiness}
- Biggest SEO problem: ${input.biggestSeoProblem}

PRIOR ANALYSIS CONTEXT (from GBP Category Audit, Description, and Review Strategy — use for consistency):
${priorContext}

TASK:
Create a 4-week Google Business Profile posting calendar.

REQUIREMENTS:
- 3 posts per week (Tuesday, Thursday, Saturday) = 12 posts total
- Each post needs: title (max 58 chars), body (100-150 words), CTA type, image suggestion
- Post types to rotate across the 4 weeks:
  Week 1: Service spotlight, Area spotlight, Customer tip
  Week 2: Before/after or case study style, Service spotlight, Seasonal/timely
  Week 3: FAQ answer, Area spotlight, Service spotlight
  Week 4: Special offer/promotion, Customer tip, Before/after
- EVERY post must mention at least 1 service keyword AND 1 location naturally
- Vary the service areas mentioned across posts — don't just repeat the primary city
- Use keywords and categories identified in the prior analysis for consistency
- Include relevant CTA: "Book online", "Call now", "Learn more", "Get offer", or "Sign up"
- Tone: professional but approachable, not salesy
- UK English spelling throughout

OUTPUT FORMAT (strict JSON):
{
  "calendar": [
    {
      "week": number,
      "day_of_week": "Tuesday" | "Thursday" | "Saturday",
      "post_type": "string",
      "title": "string (max 58 chars)",
      "body": "string (100-150 words)",
      "cta_type": "Book online" | "Call now" | "Learn more" | "Get offer" | "Sign up",
      "image_suggestion": "string — specific photo idea the owner can take",
      "keywords_used": ["string"],
      "areas_mentioned": ["string"]
    }
  ],
  "posting_tips": ["string — 3 tips for maximising GBP post performance"],
  "next_month_preview": "string — what next month's calendar would focus on"
}`;
}

export async function generatePostingCalendar(
  input: RankReadyInput,
  priorContext: string
): Promise<string> {
  const raw = await callClaude(
    POSTING_CALENDAR_SYSTEM,
    buildPostingCalendarUserPrompt(input, priorContext)
  );
  const json = extractJSON(raw);
  JSON.parse(json) as PostingCalendarOutput;
  return json;
}

// ============================================================================
// PROMPT 5: Service Descriptions
// ============================================================================

const SERVICE_DESCRIPTIONS_SYSTEM = `You are a local SEO copywriter specialising in service page content for UK service businesses.

You know that:
- Google ranks PAGES, not websites — if you don't have a page about a service in a city, you won't rank for it
- The GBP services section allows a short description per service (under 300 chars)
- Each service description should be 40-60 words with the service + city in the first sentence
- Each description should target 3-5 specific search queries
- Cross-linking between related services improves internal SEO structure
- Natural language is better than keyword stuffing — Google's NLP is sophisticated
- Include a CTA in every service description
- UK English spelling throughout

You MUST respond with ONLY valid JSON. No markdown, no code fences, no explanatory text outside the JSON.`;

function buildServiceDescriptionsUserPrompt(
  input: RankReadyInput,
  priorContext: string
): string {
  const servicesList = [input.primaryService, ...input.secondaryServices]
    .filter(Boolean)
    .map((s, i) => `${i + 1}. ${s}`)
    .join("\n");

  return `BUSINESS DETAILS:
- Business name: ${input.businessName}
- Address: ${input.address}
- Primary service: ${input.primaryService}
- All services: ${formatAllServices(input)}
- Service areas: ${formatServiceAreas(input)}
- Target customer: ${input.targetCustomer}
- Years in business: ${input.yearsInBusiness}

PRIOR ANALYSIS CONTEXT (from all 4 prior outputs — use for keyword and category consistency):
${priorContext}

TASK:
Write optimised service descriptions for EACH service this business offers.

Services to write for:
${servicesList}

REQUIREMENTS per service:
1. Full description: 40-60 words, naturally including the service keyword + primary location in the first sentence
2. GBP short version: under 300 characters, for the GBP services section
3. Include at least 2 service areas mentioned naturally
4. List 3-5 target search queries this description is optimised for
5. Suggest 1-2 related services to cross-link to
6. Use the categories and keywords identified in prior analysis for consistency
7. End with a clear CTA
8. UK English spelling throughout

OUTPUT FORMAT (strict JSON):
{
  "services": [
    {
      "service_name": "string",
      "full_description": "string (40-60 words)",
      "word_count": number,
      "gbp_short_version": "string (under 300 chars)",
      "target_queries": ["string"],
      "areas_mentioned": ["string"],
      "cross_link_suggestions": ["string"]
    }
  ],
  "overall_tips": ["string — 2-3 tips for using these descriptions effectively"]
}`;
}

export async function generateServiceDescriptions(
  input: RankReadyInput,
  priorContext: string
): Promise<string> {
  const raw = await callClaude(
    SERVICE_DESCRIPTIONS_SYSTEM,
    buildServiceDescriptionsUserPrompt(input, priorContext)
  );
  const json = extractJSON(raw);
  JSON.parse(json) as ServiceDescriptionsOutput;
  return json;
}

// ============================================================================
// FULL REPORT — Sequential Chain
// ============================================================================

/**
 * Generates a complete RankReady local SEO report by running all 5 prompts
 * in sequence. Each prompt receives the accumulated context from prior steps
 * so outputs are consistent and cross-referenced.
 *
 * Total time estimate: 30-60 seconds (5 sequential Claude Sonnet calls).
 */
export async function generateFullReport(
  input: RankReadyInput
): Promise<RankReadyReport> {
  // Step 1: GBP Category Audit (no prior context needed)
  const categoryAuditRaw = await generateGBPCategoryAudit(input);
  const gbpCategoryAudit: CategoryAuditOutput = JSON.parse(categoryAuditRaw);

  let rollingContext = `=== GBP Category Audit Results ===\n${categoryAuditRaw}\n`;

  // Step 2: GBP Description
  const descriptionRaw = await generateGBPDescription(input);
  const gbpDescription: GBPDescriptionOutput = JSON.parse(descriptionRaw);

  rollingContext += `\n=== GBP Description Results ===\n${descriptionRaw}\n`;

  // Step 3: Review Strategy (references prior outputs)
  const reviewStrategyRaw = await generateReviewStrategy(
    input,
    rollingContext
  );
  const reviewStrategy: ReviewStrategyOutput = JSON.parse(reviewStrategyRaw);

  rollingContext += `\n=== Review Strategy Results ===\n${reviewStrategyRaw}\n`;

  // Step 4: Posting Calendar (references all prior outputs)
  const postingCalendarRaw = await generatePostingCalendar(
    input,
    rollingContext
  );
  const postingCalendar: PostingCalendarOutput = JSON.parse(postingCalendarRaw);

  rollingContext += `\n=== Posting Calendar Results ===\n${postingCalendarRaw}\n`;

  // Step 5: Service Descriptions (references ALL prior outputs for full consistency)
  const serviceDescriptionsRaw = await generateServiceDescriptions(
    input,
    rollingContext
  );
  const serviceDescriptions: ServiceDescriptionsOutput = JSON.parse(
    serviceDescriptionsRaw
  );

  return {
    businessName: input.businessName,
    generatedAt: new Date().toISOString(),
    gbpCategoryAudit,
    gbpDescription,
    reviewStrategy,
    postingCalendar,
    serviceDescriptions,
  };
}

// ============================================================================
// COMPATIBILITY EXPORTS — for API routes that use the simpler prompt-only API
// ============================================================================
// The generate/route.ts and preview/route.ts use these functions to get
// system prompts as strings. They handle the Claude API calls themselves.
// ============================================================================

function formDataToInput(data: RankReadyFormData): RankReadyInput {
  return {
    businessName: data.businessName,
    address: data.address,
    phone: data.phone,
    website: data.website,
    gbpUrl: data.gbpUrl,
    yearsInBusiness: data.yearsInBusiness,
    primaryService: data.primaryService,
    secondaryServices: data.secondaryServices,
    serviceAreas: data.serviceAreas,
    targetCustomer: data.targetCustomer,
    competitors: data.competitors.map((c) => ({
      name: c.name,
      website: c.url,
    })),
    currentReviewCount: data.reviewCount ?? 0,
    currentStarRating: data.starRating ?? 0,
    biggestSeoProblem: data.biggestProblem ?? "",
  };
}

/** Returns the GBP Category Audit system prompt for a given form submission */
export function getCategoryAuditPrompt(data: RankReadyFormData): string {
  const input = formDataToInput(data);
  return `${GBP_CATEGORY_AUDIT_SYSTEM}\n\n${buildGBPCategoryAuditUserPrompt(input)}`;
}

/** Returns the GBP Description system prompt for a given form submission */
export function getGBPDescriptionPrompt(data: RankReadyFormData): string {
  const input = formDataToInput(data);
  return `${GBP_DESCRIPTION_SYSTEM}\n\n${buildGBPDescriptionUserPrompt(input)}`;
}

/** Returns the Review Strategy system prompt for a given form submission */
export function getReviewStrategyPrompt(data: RankReadyFormData): string {
  const input = formDataToInput(data);
  return `${REVIEW_STRATEGY_SYSTEM}\n\n${buildReviewStrategyUserPrompt(input, "")}`;
}

/** Returns the GBP Posting Calendar system prompt for a given form submission */
export function getPostingCalendarPrompt(data: RankReadyFormData): string {
  const input = formDataToInput(data);
  return `${POSTING_CALENDAR_SYSTEM}\n\n${buildPostingCalendarUserPrompt(input, "")}`;
}

/** Returns the Service Descriptions system prompt for a given form submission */
export function getServiceDescriptionsPrompt(data: RankReadyFormData): string {
  const input = formDataToInput(data);
  return `${SERVICE_DESCRIPTIONS_SYSTEM}\n\n${buildServiceDescriptionsUserPrompt(input, "")}`;
}

// ============================================================================
// SAMPLE TEST DATA — E'Manuel Bakery
// ============================================================================

export const SAMPLE_EMANUEL_INPUT: RankReadyInput = {
  businessName: "E'Manuel Bakery",
  address: "Kettering, Northamptonshire, UK",
  phone: "+44 7000 000000",
  website: undefined,
  gbpUrl: undefined,
  yearsInBusiness: 3,
  primaryService: "Artisan bread and pastries",
  secondaryServices: [
    "Custom celebration cakes",
    "Weekly bread subscriptions",
    "Catering for events",
    "Wholesale to cafes and restaurants",
  ],
  serviceAreas: [
    "Kettering",
    "Corby",
    "Wellingborough",
    "Northampton",
    "Rushden",
  ],
  targetCustomer:
    "Local families, cafe owners, and event planners who want fresh, handmade baked goods delivered to their door",
  competitors: [
    { name: "Greggs", website: "https://www.greggs.co.uk" },
    { name: "Birds Bakery" },
    { name: "Hampsons Bakery Kettering" },
  ],
  currentReviewCount: 12,
  currentStarRating: 4.8,
  biggestSeoProblem:
    "Nobody can find us on Google when they search for bakery delivery in Kettering or nearby areas",
};

// ============================================================================
// SAMPLE OUTPUT — E'Manuel Bakery (GBP Category Audit)
// ============================================================================

export const SAMPLE_CATEGORY_AUDIT_OUTPUT: CategoryAuditOutput = {
  recommended_primary: {
    category: "Bakery",
    reason:
      "Bakery is the most direct primary category and will trigger the widest range of bakery-related searches in Kettering and surrounding areas.",
    searches_it_unlocks: [
      "bakery near me",
      "bakery Kettering",
      "fresh bread Kettering",
      "local bakery Northamptonshire",
    ],
  },
  recommended_secondary: [
    {
      category: "Cake Shop",
      reason:
        "Unlocks searches for celebration cakes, birthday cakes, and custom cakes — a key revenue stream.",
      searches_it_unlocks: [
        "cake shop Kettering",
        "birthday cake Kettering",
        "custom cakes near me",
      ],
      priority: "high",
    },
    {
      category: "Catering Service",
      reason:
        "Enables visibility for event catering searches, which is a listed service.",
      searches_it_unlocks: [
        "catering Kettering",
        "event catering Northampton",
        "party food delivery near me",
      ],
      priority: "high",
    },
    {
      category: "Wholesale Bakery",
      reason:
        "Targets B2B searches from cafes and restaurants looking for wholesale bread suppliers.",
      searches_it_unlocks: [
        "wholesale bakery Northamptonshire",
        "bread supplier for cafes",
        "wholesale pastries near me",
      ],
      priority: "medium",
    },
    {
      category: "Food Delivery Service",
      reason:
        "Critical for delivery-related searches — directly addresses the biggest SEO problem.",
      searches_it_unlocks: [
        "bakery delivery Kettering",
        "bread delivery near me",
        "cake delivery Corby",
      ],
      priority: "high",
    },
    {
      category: "Patisserie",
      reason:
        "Positions as premium/artisan, differentiating from Greggs and other high-street chains.",
      searches_it_unlocks: [
        "patisserie Kettering",
        "artisan pastries near me",
        "French pastries Northampton",
      ],
      priority: "medium",
    },
  ],
  competitor_comparison: [
    {
      competitor: "Greggs",
      likely_categories: [
        "Bakery",
        "Sandwich Shop",
        "Fast Food Restaurant",
        "Cafe",
      ],
      unique_categories: ["Sandwich Shop", "Fast Food Restaurant"],
    },
    {
      competitor: "Birds Bakery",
      likely_categories: ["Bakery", "Cake Shop", "Cafe", "Sandwich Shop"],
      unique_categories: ["Cafe"],
    },
    {
      competitor: "Hampsons Bakery Kettering",
      likely_categories: ["Bakery", "Cake Shop", "Catering Service"],
      unique_categories: [],
    },
  ],
  categories_to_remove: [],
  shared_by_all_competitors: ["Bakery"],
  unique_opportunities: [
    "Food Delivery Service — none of the competitors appear to have this category, yet delivery is the key differentiator",
    "Wholesale Bakery — targets an entirely different customer segment (B2B) that competitors are not optimising for",
    "Patisserie — positions as artisan/premium which no local competitor claims",
  ],
  summary:
    "E'Manuel Bakery should keep Bakery as primary and add Cake Shop, Catering Service, Food Delivery Service, Wholesale Bakery, and Patisserie as secondary categories. The biggest quick win is adding Food Delivery Service — this directly addresses the main SEO problem and none of the three competitors appear to use this category.",
};
