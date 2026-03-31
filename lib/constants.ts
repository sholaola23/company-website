export const INDUSTRIES = [
  "Accounting / Finance",
  "Automotive",
  "Beauty / Spa",
  "Childcare / Nursery",
  "Church / Non-Profit",
  "Cleaning",
  "Coaching",
  "Construction",
  "Dentist / Dental",
  "Education / Tutoring",
  "Electrician",
  "Estate Agent",
  "Events / Entertainment",
  "Gym / Fitness",
  "Healthcare",
  "Hospitality / Hotels",
  "IT Services",
  "Legal",
  "Logistics / Delivery",
  "Marketing Agency",
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

// Route all Claude API calls through Helicone for observability (cost, latency, errors)
export const ANTHROPIC_API_URL = "https://anthropic.helicone.ai/v1/messages";
export const ANTHROPIC_VERSION = "2023-06-01";

export function heliconeHeaders(): Record<string, string> {
  const key = process.env.HELICONE_API_KEY;
  if (!key) return {};
  return { "Helicone-Auth": `Bearer ${key}` };
}
