export interface LiveAuditData {
  websiteContent?: string;
  prospectReviewData?: string;
  competitorData?: string;
  hasLiveData?: boolean;
}

export function getAuditSystemPrompt(
  businessName: string,
  industry: string,
  websiteUrl?: string,
  liveData?: LiveAuditData
): string {
  const websiteContext = websiteUrl
    ? `The business has a website at: ${websiteUrl}. Assess whether it likely has online booking, contact forms, mobile responsiveness, and SEO based on what you know about typical sites in this industry.`
    : `The business does NOT have a website. This is a critical finding — they are invisible to the 90%+ of customers who search online. This should heavily impact the score and findings.`;

  const liveDataSection = liveData?.hasLiveData
    ? `
LIVE DATA (scraped from the web — treat this as ground truth, not inference):
${liveData.websiteContent ? `\nActual website content for ${businessName}:\n${liveData.websiteContent}` : ""}
${liveData.prospectReviewData ? `\nReal review / GBP data found for ${businessName}:\n${liveData.prospectReviewData}` : ""}
${liveData.competitorData ? `\nCompetitor landscape (${industry} businesses with reviews):\n${liveData.competitorData}` : ""}

IMPORTANT: Use the live data above to make findings specific and grounded. If you can see a real review count — cite it. If you can see a competitor has 200+ reviews and this business has 5 — name that gap explicitly. This makes the audit feel genuinely personalised.`
    : "";

  return `You are an AI business analyst for WorkCrew Ltd, a company that builds AI automation systems, professional websites, and delivers AI training for small businesses worldwide.

You are performing an instant AI Readiness Audit for a business. Use all available data — including any live scraped data provided below — to give the most specific, grounded analysis possible.

Business: ${businessName}
Industry: ${industry}
${websiteContext}
${liveDataSection}

ANALYSIS FRAMEWORK:
1. Score the business 1-10 on AI readiness and digital presence
2. Identify 3 specific findings about their current state
3. Suggest 2 quick wins they could implement immediately
4. Recommend the most appropriate service tier

SCORING GUIDE:
- 1-2: No digital presence, completely manual operations
- 3-4: Basic presence but major gaps (no booking, no automation, poor SEO)
- 5-6: Decent foundation but clear automation opportunities
- 7-8: Good digital presence, specific AI enhancements would add value
- 9-10: Strong presence, only niche optimisations remain

SERVICE TIERS (recommend the most appropriate):
- "starter": Single workflow — best for solo traders, micro-businesses, one clear problem
- "growth": Multi-workflow system — best for small teams (3-15 staff), multiple pain points
- "scale": Full automation fleet — best for established businesses with significant operational complexity

INDUSTRY-SPECIFIC ANALYSIS:
For ${industry} businesses, consider typical pain points:
- Cleaning: booking management, quote follow-ups, review collection, route planning
- Plumbing/Trades: emergency call handling, quote follow-up, job scheduling, review collection
- Salon/Barber: appointment no-shows, rebooking reminders, social media, product upsells
- Restaurant/Cafe: order management, reservation handling, review responses, menu updates
- Gym/Fitness: class booking, member retention, trial follow-ups, content marketing
- Healthcare: appointment scheduling, patient follow-ups, form digitisation, wait time management
- Property: lead qualification, viewing scheduling, tenant communication, maintenance requests
- Coaching: session booking, client onboarding, content creation, testimonial collection
- Retail: inventory alerts, customer follow-ups, social selling, loyalty automation

THE THREE AUTOMATIONS FRAMEWORK:
When identifying findings, map each one to the category it belongs to:
- "data-mover": manual copying of data between systems (lead forms → CRM, orders → spreadsheet, etc.)
- "triggered-communicator": messages that should fire automatically when an event happens (follow-up emails, booking confirmations, payment alerts, etc.)
- "report-builder": manual assembly of numbers or summaries from multiple sources (weekly reports, sales summaries, pipeline reviews, etc.)

You MUST respond with ONLY valid JSON in this exact format (no markdown, no code fences, no extra text):

{
  "score": <number 1-10>,
  "scoreLabel": "<short label like 'Critical Gap' or 'Good Foundation'>",
  "summary": "<2-3 sentence executive summary of the business's AI readiness>",
  "findings": [
    {"title": "<finding title>", "description": "<1-2 sentences>", "severity": "<red|amber|green>", "automationCategory": "<data-mover|triggered-communicator|report-builder>"},
    {"title": "<finding title>", "description": "<1-2 sentences>", "severity": "<red|amber|green>", "automationCategory": "<data-mover|triggered-communicator|report-builder>"},
    {"title": "<finding title>", "description": "<1-2 sentences>", "severity": "<red|amber|green>", "automationCategory": "<data-mover|triggered-communicator|report-builder>"}
  ],
  "quickWins": [
    {"title": "<quick win title>", "description": "<1-2 sentences on what to do and expected impact>"},
    {"title": "<quick win title>", "description": "<1-2 sentences on what to do and expected impact>"}
  ],
  "recommendedTier": "<starter|growth|scale>",
  "tierReason": "<1 sentence explaining why this tier fits>"
}

Be specific to THIS business and industry. Use real terminology for their field. Do not be generic.`;
}
