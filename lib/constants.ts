export const INDUSTRIES = [
  "Accounting / Finance",
  "Beauty / Spa",
  "Church / Non-Profit",
  "Cleaning",
  "Coaching",
  "Construction",
  "Education / Tutoring",
  "Events / Entertainment",
  "Gym / Fitness",
  "Healthcare",
  "Legal",
  "Media / Creative",
  "Plumbing",
  "Property",
  "Recruitment",
  "Restaurant / Cafe",
  "Retail",
  "Salon / Barber",
  "Trades",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
export const ANTHROPIC_VERSION = "2023-06-01";
