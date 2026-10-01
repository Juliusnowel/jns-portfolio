/**
 * Selected work + range tiles — swap screenshots/copy here later.
 * Placeholders are intentional and labeled in the UI.
 */

export type WorkItem = {
  id: string;
  title: string;
  domain: string;
  summary: string;
  stack: string[];
  /** Path under /public, or null for labeled placeholder */
  image: string | null;
  /** Omit or null when there is no public demo */
  href: string | null;
  caseStudy?: boolean;
};

export const selectedWork: WorkItem[] = [
  {
    id: "zerem-ai",
    title: "Zerem — AI Customer-Engagement",
    domain: "Applied AI",
    summary:
      "An AI layer for a CRM: Meta Messenger/Instagram conversations drafted and auto-replied by an LLM (OpenRouter), with safety guardrails and human handoff. Built and feature-flagged, pending Meta app review.",
    stack: ["Laravel", "Next.js", "OpenRouter / LLM", "Meta API"],
    image: null,
    href: null,
    caseStudy: true,
  },
  {
    id: "slotflo-booking",
    title: "Slotflo — Booking SaaS",
    domain: "Product",
    summary:
      "A multi-tenant appointment-booking platform: timezone-aware availability, row-locking against double-booking, prepaid package credits, and public self-booking. ~97 feature tests; pre-launch.",
    stack: ["Laravel", "Next.js", "Multi-tenant"],
    image: null,
    href: null,
    caseStudy: true,
  },
  {
    id: "stockflo-inventory",
    title: "Stockflo — Inventory SaaS",
    domain: "Product",
    summary:
      "A multi-tenant inventory system: transactional stock-movement ledger with concurrency guards, FEFO batch/expiry tracking, moving-average valuation, and purchase & sales orders. ~37 feature tests; pre-launch.",
    stack: ["Laravel", "Next.js", "Multi-tenant"],
    image: null,
    href: null,
    caseStudy: true,
  },
];

/** Breadth tiles for the light zoom-out / range moment */
export const rangeTiles = [
  { id: "booking", label: "Booking SaaS" },
  { id: "inventory", label: "Inventory SaaS" },
  { id: "ai", label: "AI Engagement" },
  { id: "platform", label: "Multi-tenant Platform" },
  { id: "accounting", label: "Accounting" },
  { id: "nfc", label: "NFC" },
] as const;

export const capabilities = [
  {
    id: "dissect",
    title: "Dissecting code",
    detail: "Reading a system top-to-bottom until its logic is obvious.",
  },
  {
    id: "bugs",
    title: "Finding & fixing bugs",
    detail: "Isolating the off-by-one, the race, the edge case — then closing it.",
  },
  {
    id: "plan",
    title: "Planning & decision-making",
    detail: "Weighing trade-offs and picking the approach before writing a line.",
  },
  {
    id: "code",
    title: "Programming",
    detail: "Turning the decision into clean, working, shippable code.",
  },
] as const;

export const CONTACT = {
  portfolioHref: "/",
  contactHref: "/contact",
} as const;

/** Easy-to-change hero brand */
export const BRAND = {
  name: "Julius Nowel",
  role: "Technical Lead & Full-Stack Developer",
} as const;

/** Kinetic marquee band */
export const marqueeItems = [
  "Laravel",
  "Next.js",
  "TypeScript",
  "Multi-tenant SaaS",
  "OpenRouter / LLM",
  "AI automation",
  "Concurrency",
  "TDD",
  "Python",
  "Docker",
] as const;
