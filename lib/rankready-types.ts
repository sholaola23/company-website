// ---------------------------------------------------------------------------
// RankReady Local SEO Audit — Shared Types
// ---------------------------------------------------------------------------

/** Competitor info from intake form */
export interface RankReadyCompetitor {
  name: string;
  gbpUrl?: string;
  website?: string;
}

/** Intake form data submitted by the user (matches the spec input schema) */
export interface RankReadyInput {
  businessName: string;
  address: string;
  phone: string;
  website?: string;
  gbpUrl?: string;
  yearsInBusiness: number;
  primaryService: string;
  secondaryServices: string[]; // up to 4
  serviceAreas: string[]; // up to 5 cities
  targetCustomer: string;
  competitors: RankReadyCompetitor[]; // up to 3
  currentReviewCount: number;
  currentStarRating: number;
  biggestSeoProblem: string;
}

/** A single GBP category recommendation */
export interface CategoryRecommendation {
  category: string;
  reason: string;
  searches_it_unlocks: string[];
  priority: "high" | "medium" | "low";
}

/** Output 1: GBP Category Audit */
export interface CategoryAuditOutput {
  recommended_primary: {
    category: string;
    reason: string;
    searches_it_unlocks: string[];
  };
  recommended_secondary: CategoryRecommendation[];
  competitor_comparison: {
    competitor: string;
    likely_categories: string[];
    unique_categories: string[];
  }[];
  categories_to_remove: {
    category: string;
    reason: string;
  }[];
  shared_by_all_competitors: string[];
  unique_opportunities: string[];
  summary: string;
}

/** Output 2: GBP Description variants */
export interface GBPDescriptionOutput {
  variants: {
    label: "keyword-focused" | "conversion-focused" | "trust-focused";
    text: string;
    character_count: number;
    keywords_used: string[];
    areas_mentioned: string[];
  }[];
  tips: string[];
}

/** Output 3: Review Strategy */
export interface ReviewStrategyOutput {
  review_velocity_target: number;
  current_assessment: string;
  request_templates: {
    whatsapp: string;
    email: string;
    in_person: string;
  };
  response_templates: {
    five_star: string;
    four_star: string;
    three_star: string;
    one_to_two_star: string;
  };
  keyword_phrases_for_customers: string[];
  playbook: {
    timing: string;
    who_to_ask: string;
    frequency: string;
    monthly_plan: string[];
  };
  quick_wins: string[];
}

/** Output 4: GBP Posting Calendar */
export interface GBPPost {
  week: number;
  day_of_week: string;
  post_type: string;
  title: string;
  body: string;
  cta_type: string;
  image_suggestion: string;
  keywords_used: string[];
  areas_mentioned: string[];
}

export interface PostingCalendarOutput {
  calendar: GBPPost[];
  posting_tips: string[];
  next_month_preview: string;
}

/** Output 5: Service Descriptions */
export interface ServiceDescription {
  service_name: string;
  full_description: string;
  word_count: number;
  gbp_short_version: string;
  target_queries: string[];
  areas_mentioned: string[];
  cross_link_suggestions: string[];
}

export interface ServiceDescriptionsOutput {
  services: ServiceDescription[];
  overall_tips: string[];
}

/** Full report combining all 5 outputs */
export interface RankReadyReport {
  businessName: string;
  generatedAt: string;
  gbpCategoryAudit: CategoryAuditOutput;
  gbpDescription: GBPDescriptionOutput;
  reviewStrategy: ReviewStrategyOutput;
  postingCalendar: PostingCalendarOutput;
  serviceDescriptions: ServiceDescriptionsOutput;
}

/**
 * Alias for routes that use the simpler form data shape.
 * Maps RankReadyInput fields to a flatter structure for the intake form API.
 */
export interface RankReadyFormData {
  businessName: string;
  address: string;
  phone: string;
  website?: string;
  gbpUrl?: string;
  yearsInBusiness: number;
  primaryService: string;
  secondaryServices: string[];
  serviceAreas: string[];
  targetCustomer: string;
  competitors: { name: string; url?: string }[];
  reviewCount?: number;
  starRating?: number;
  biggestProblem?: string;
  email?: string;
}
