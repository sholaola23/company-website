import { readFileSync } from "node:fs";
import path from "node:path";
import { caseStudies } from "@/lib/case-studies-data";
import { services } from "@/lib/services-data";

type KnowledgeSource = {
  id: string;
  title: string;
  path?: string;
  tags: string[];
  weight?: number;
};

type KnowledgeChunk = {
  source: KnowledgeSource;
  text: string;
  score: number;
};

export type RetrievedKnowledge = {
  context: string;
  sources: string[];
};

type RetrieveOptions = {
  query: string;
  pagePath?: string;
  maxChunks?: number;
};

const KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: "brand-foundation",
    title: "WorkCrew Brand Foundation",
    path: "content/chat-knowledge/brand-assets/brand-foundation.md",
    tags: ["brand", "voice", "operator", "banned words", "positioning"],
    weight: 3,
  },
  {
    id: "voice-one-pager",
    title: "WorkCrew Brand Voice One-Pager",
    path: "content/chat-knowledge/brand-assets/voice-one-pager.md",
    tags: ["brand", "voice", "tone", "copy", "human"],
    weight: 3,
  },
  {
    id: "creative-direction",
    title: "Website Creative Direction",
    path: "rebrand-v1-docs/01-creative-direction.md",
    tags: ["brand", "website", "operator", "homepage", "proof"],
    weight: 2.4,
  },
  {
    id: "voice-audit",
    title: "Website Voice Audit",
    path: "rebrand-v1-docs/04-voice-audit.md",
    tags: ["voice", "brand", "banned words", "copy"],
    weight: 2.4,
  },
  {
    id: "discovery-first",
    title: "Discovery-First Voice Rewrite",
    path: "rebrand-v1-docs/10-voice-rewrite-discovery-first.md",
    tags: ["discovery", "positioning", "services", "voice"],
    weight: 2.5,
  },
  {
    id: "session-quotes",
    title: "Brand Voice Session Quotes",
    path: "rebrand-v1-docs/09-session-insights-quotes.md",
    tags: ["voice", "quotes", "operator", "friction"],
    weight: 2,
  },
  {
    id: "services-data",
    title: "Current Services Data",
    path: "lib/services-data.ts",
    tags: ["services", "scope", "offer", "automation", "website", "training"],
    weight: 0.8,
  },
  {
    id: "case-studies-data",
    title: "Current Case Studies Data",
    path: "lib/case-studies-data.ts",
    tags: ["case study", "proof", "emanuel", "quantumfm", "ashdown"],
    weight: 0.8,
  },
  {
    id: "shared-voice",
    title: "Agent Shared Voice Rules",
    path: "agents/_shared/voice.md",
    tags: ["voice", "tone", "sales", "email"],
    weight: 1.6,
  },
  {
    id: "shared-case-studies",
    title: "Agent Shared Case Studies",
    path: "agents/_shared/case-studies.md",
    tags: ["case study", "proof", "client"],
    weight: 1.7,
  },
  {
    id: "shared-ctas",
    title: "Agent Shared CTAs",
    path: "agents/_shared/ctas.md",
    tags: ["cta", "contact", "blueprint", "call"],
    weight: 1.5,
  },
  {
    id: "whatsapp-architecture",
    title: "WhatsApp Ordering Bot Architecture",
    path: "content/chat-knowledge/knowledge/architectures/whatsapp-ordering-bot-kapso.md",
    tags: ["whatsapp", "ordering", "restaurant", "bakery", "architecture"],
    weight: 1.5,
  },
  {
    id: "fast-checkout-watcher",
    title: "n8n Fast Checkout Watcher Pattern",
    path: "content/chat-knowledge/knowledge/patterns/n8n-fast-checkout-watcher.md",
    tags: ["n8n", "payment", "order", "sumup", "checkout"],
    weight: 1.3,
  },
  {
    id: "directory-listings",
    title: "Directory Listings Guide",
    path: "docs/directory-listings-guide.md",
    tags: ["company description", "services", "directory", "seo"],
    weight: 1,
  },
];

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "and",
  "are",
  "ask",
  "but",
  "can",
  "does",
  "for",
  "from",
  "has",
  "have",
  "how",
  "into",
  "our",
  "out",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "this",
  "what",
  "when",
  "where",
  "which",
  "while",
  "with",
  "workcrew",
  "you",
  "your",
]);

const fileCache = new Map<string, string | null>();
let chunkCache: KnowledgeChunk[] | null = null;

function readKnowledgeFile(source: KnowledgeSource) {
  if (!source.path) return null;

  const absolutePath = path.resolve(process.cwd(), source.path);
  if (fileCache.has(absolutePath)) return fileCache.get(absolutePath) ?? null;

  try {
    const text = readFileSync(absolutePath, "utf8");
    fileCache.set(absolutePath, text);
    return text;
  } catch {
    fileCache.set(absolutePath, null);
    return null;
  }
}

function tokenise(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9£]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function cleanText(input: string) {
  return input
    .replace(/\r/g, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function splitIntoChunks(text: string) {
  const sections = cleanText(text)
    .split(/(?=^#{1,3}\s+)/m)
    .map((section) => section.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  const sourceSections = sections.length > 0 ? sections : [cleanText(text)];

  for (const section of sourceSections) {
    if (section.length <= 1800) {
      chunks.push(section);
      continue;
    }

    for (let start = 0; start < section.length; start += 1400) {
      chunks.push(section.slice(start, start + 1800).trim());
    }
  }

  return chunks;
}

function buildChunks() {
  if (chunkCache) return chunkCache;

  const structuredServiceChunks: KnowledgeChunk[] = services.map((service) => ({
    source: {
      id: `service-${service.slug}`,
      title: `Service: ${service.name}`,
      path: "lib/services-data.ts",
      tags: [
        "service",
        service.slug,
        service.name,
        service.idealFor,
        service.pain,
        ...(service.deliverables ?? []),
      ],
      weight: 3,
    },
    text: [
      `Service: ${service.name}`,
      `Slug: ${service.slug}`,
      `Best for: ${service.idealFor}`,
      `Pain: ${service.pain}`,
      "Pricing: scoped after the free AI audit and discovery call",
      `Delivery: ${service.deliveryDays}`,
      `Deliverables: ${service.deliverables.join(", ")}`,
      service.heroHeadline ? `Hero line: ${service.heroHeadline}` : "",
      service.proof
        ? `Proof: ${service.proof.heading}. ${service.proof.description} ${
            service.proof.stats
              ?.map((stat) => `${stat.label}: ${stat.value}`)
              .join("; ") ?? ""
          }`
        : "",
      service.faq
        ? `FAQs: ${service.faq
            .slice(0, 4)
            .map((faq) => `${faq.question} ${faq.answer}`)
            .join(" ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
    score: 0,
  }));

  const structuredCaseStudyChunks: KnowledgeChunk[] = caseStudies.map((study) => ({
    source: {
      id: `case-study-${study.slug}`,
      title: `Case Study: ${study.name}`,
      path: "lib/case-studies-data.ts",
      tags: [
        "case study",
        "proof",
        study.slug,
        study.name,
        study.industry,
        study.location,
      ],
      weight: 2.8,
    },
    text: [
      `Case study: ${study.name}`,
      `Industry: ${study.industry}`,
      `Location: ${study.location}`,
      `Problem: ${study.problemExpanded ?? study.problem}`,
      `Build: ${study.solutionExpanded ?? study.solution}`,
      `Results: ${study.results.map((result) => `${result.label}: ${result.value}`).join("; ")}`,
      `Deliverables: ${study.deliverables.join(", ")}`,
      study.timeline ? `Timeline: ${study.timeline}` : "",
      study.annualSaving ? `Annual saving: ${study.annualSaving}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    score: 0,
  }));

  const fileChunks = KNOWLEDGE_SOURCES.flatMap((source) => {
    const text = readKnowledgeFile(source);
    if (!text) return [];

    return splitIntoChunks(text).map((chunk) => ({
      source,
      text: chunk,
      score: 0,
    }));
  });

  chunkCache = [...structuredServiceChunks, ...structuredCaseStudyChunks, ...fileChunks];

  return chunkCache;
}

function scoreChunk(chunk: KnowledgeChunk, queryTerms: Set<string>, rawQuery: string) {
  const chunkTerms = tokenise(
    `${chunk.source.title} ${chunk.source.tags.join(" ")} ${chunk.text}`
  );
  const titleAndTags = tokenise(`${chunk.source.title} ${chunk.source.tags.join(" ")}`);

  let score = 0;
  for (const term of chunkTerms) {
    if (queryTerms.has(term)) score += 1;
  }

  for (const term of titleAndTags) {
    if (queryTerms.has(term)) score += 4;
  }

  const rawLower = rawQuery.toLowerCase();
  for (const tag of chunk.source.tags) {
    if (rawLower.includes(tag.toLowerCase())) score += 6;
  }

  return score * (chunk.source.weight ?? 1);
}

export function retrieveChatKnowledge({
  query,
  pagePath,
  maxChunks = 6,
}: RetrieveOptions): RetrievedKnowledge {
  const rawQuery = `${query} ${pagePath ?? ""}`;
  const queryTerms = new Set(tokenise(rawQuery));
  if (queryTerms.size === 0) {
    return { context: "", sources: [] };
  }

  const ranked = buildChunks()
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(chunk, queryTerms, rawQuery),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks);

  if (ranked.length === 0) return { context: "", sources: [] };

  const sources = Array.from(new Set(ranked.map((chunk) => chunk.source.title)));
  const context = ranked
    .map((chunk, index) => {
      const excerpt =
        chunk.text.length > 1600 ? `${chunk.text.slice(0, 1600).trim()}...` : chunk.text;
      return `[${index + 1}] ${chunk.source.title}\n${excerpt}`;
    })
    .join("\n\n---\n\n");

  return { context, sources };
}
