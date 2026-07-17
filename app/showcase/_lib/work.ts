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
    id: "vite-seo-systems",
    title: "Vite SEO Systems",
    domain: "Platform",
    summary:
      "A unified HRIS + CRM + PMS platform — one system for people, clients, and projects. Built as an internal case study (Laravel + Next.js). No live link; no client or employee data shown.",
    stack: ["Laravel", "Next.js", "MySQL"],
    image: null,
    href: null,
    caseStudy: true,
  },
  {
    id: "business-lead-scraper",
    title: "Business-lead Python scraper",
    domain: "Automation / Data",
    summary:
      "A practical crawler that collects and normalizes business listing data for research and lead workflows — structured output, reusable scripts.",
    stack: ["Python", "JavaScript"],
    image: null,
    href: null,
  },
  {
    id: "wp-store-locator",
    title: "WordPress store-locator plugin",
    domain: "Plugin",
    summary:
      "A custom WordPress MU-plugin for store management — maintainable admin workflows and location-focused content support for SEO/content teams.",
    stack: ["PHP", "WordPress"],
    image: null,
    href: null,
  },
];

/** Breadth tiles for the light zoom-out / range moment */
export const rangeTiles = [
  { id: "hris", label: "HRIS" },
  { id: "crm", label: "CRM" },
  { id: "pms", label: "PMS" },
  { id: "scraper", label: "Scraper" },
  { id: "image-optimizer", label: "Image optimizer" },
  { id: "plugin", label: "WP plugin" },
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
} as const;

/** Kinetic marquee band */
export const marqueeItems = [
  "Dissecting code",
  "Debugging",
  "Decision-making",
  "Programming",
  "Laravel",
  "Next.js",
  "WordPress",
  "Python",
  "Automation",
  "Plugins",
] as const;
