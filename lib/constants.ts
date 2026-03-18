export const INDUSTRIES = [
  "Cleaning",
  "Plumbing",
  "Salon / Barber",
  "Restaurant / Cafe",
  "Gym / Fitness",
  "Trades",
  "Healthcare",
  "Property",
  "Coaching",
  "Retail",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
export const ANTHROPIC_VERSION = "2023-06-01";
