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

export const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
export const ANTHROPIC_VERSION = "2023-06-01";
