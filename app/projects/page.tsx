"use client";

import Link from "next/link";

type Group = "ViteSEO Business" | "Independent Products — Kiplo" | "Client & Other Work";

type Project = {
  title: string;
  summary: string;
  languages: string[];
  group: Group;
  featured?: boolean;
  demoUrl?: string;
};

const GROUP_ORDER: Group[] = [
  "ViteSEO Business",
  "Independent Products — Kiplo",
  "Client & Other Work",
];

const projects: Project[] = [
  // ── ViteSEO Business (work) ──
  {
    title: "AI Customer-Engagement (CRM)",
    summary:
      "AI customer-engagement layer for a CRM: Meta Messenger/Instagram inbound + outbound with an OpenRouter (gpt-4o-mini) reply-draft and auto-reply pipeline, safety guardrails (allowlist, rate caps, sanitization) and human handoff. v1 built, feature-flagged, pending Meta app review.",
    languages: ["Laravel", "Next.js", "OpenRouter / LLM", "Meta API"],
    group: "ViteSEO Business",
    featured: true,
  },
  {
    title: "ViteSEO Systems — Unified Platform",
    summary:
      "Unified HRIS + CRM + PMS behind one login. As technical lead I merged three standalone systems into one multi-tenant platform (Sanctum auth, org-scoping across 57 tables), owned cross-team integration and release, and built the HR access-lifecycle (auto-provision on hire, close on separation) test-first.",
    languages: ["Laravel", "Next.js", "Multi-tenant", "PHP"],
    group: "ViteSEO Business",
    featured: true,
  },
  {
    title: "Accounting Module",
    summary:
      "Accounting module within the platform — recurring invoices, revenue recognition, and subscription billing, scoped per tenant. (Not yet CPA-validated.)",
    languages: ["Laravel", "Next.js", "PHP"],
    group: "ViteSEO Business",
  },
  {
    title: "Kiosk Module",
    summary:
      "Lead-gen kiosk module — access grants, product catalog, and geofenced access control enforced through middleware.",
    languages: ["Laravel", "Next.js", "PHP"],
    group: "ViteSEO Business",
  },

  // ── Independent Products — Kiplo ──
  {
    title: "Appointment-Booking SaaS",
    summary:
      "Multi-tenant appointment-booking platform: timezone-aware availability engine, transactional row-locking to prevent double-booking, prepaid package-credit lifecycle, public self-booking with bot/rate-limit hardening, and email + push reminders. ~97 feature tests; pre-launch.",
    languages: ["Laravel", "Next.js", "Multi-tenant", "PHP"],
    group: "Independent Products — Kiplo",
    featured: true,
  },
  {
    title: "Inventory Management SaaS",
    summary:
      "Multi-tenant inventory/stock system: single-source-of-truth stock-movement ledger with negative-stock and concurrency guards, FEFO batch/expiry and serial tracking, moving-average costing/valuation, and purchase/sales orders with reservations. ~37 feature tests; pre-launch.",
    languages: ["Laravel", "Next.js", "Multi-tenant", "PHP"],
    group: "Independent Products — Kiplo",
    featured: true,
  },
  {
    title: "NFC Digital Business-Card Platform",
    summary:
      "Account-based NFC digital business cards — multi-section profiles, themes, per-link analytics, and admin-controlled Basic/Premium tiers. Live.",
    languages: ["Next.js", "Laravel", "PHP"],
    group: "Independent Products — Kiplo",
    demoUrl: "https://tap.kiplosolutions.com/",
  },
  {
    title: "Photo Booth Software",
    summary:
      "Event photo-booth software with a custom flipbook engine — the full capture-to-print/share flow. Pre-launch.",
    languages: ["Node.js", "React"],
    group: "Independent Products — Kiplo",
  },
  {
    title: "Kiplo Website",
    summary:
      "Brand/studio site for Kiplo — a data-driven marketing site where the products live.",
    languages: ["Next.js", "React"],
    group: "Independent Products — Kiplo",
    demoUrl: "https://kiplosolutions.com/",
  },

  // ── Client & Other Work ──
  {
    title: "Noyona Cosmetics",
    summary:
      "WooCommerce e-commerce website coded and built solo — custom child theme, product/shop experience, and maintainable, brand-driven layout.",
    languages: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
    group: "Client & Other Work",
    demoUrl: "https://noyonacosmetics.com/",
  },
  {
    title: "Production WordPress Client Sites",
    summary:
      "Production client websites built and maintained with custom child themes (Allegiant Air Tickets, ViteSEO, Creceri) — custom Gutenberg blocks and maintainable, business-focused structure.",
    languages: ["WordPress", "PHP", "JavaScript"],
    group: "Client & Other Work",
  },
  {
    title: "SEO Production Plugins (WordPress)",
    summary:
      "Custom WordPress plugins used in real SEO workflows — a CSV meta importer with dry-run + validation, a modular SEO diagnostic scanner, and publish-time SEO guardrails.",
    languages: ["PHP", "WordPress", "JavaScript"],
    group: "Client & Other Work",
  },
];

export default function ProjectsPage() {
  return (
    <main className="theme-page min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <header className="theme-border border-b pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[var(--accent-ink)] text-sm font-semibold uppercase tracking-[0.18em]">
                Projects
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Project Showcase
              </h1>
            </div>
            <Link
              href="/"
              className="rounded-[3px] border px-4 py-2 text-sm font-semibold transition-colors border-[var(--outline-btn-border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
            >
              Back to Home
            </Link>
          </div>
          <p className="theme-text-secondary mt-3 max-w-3xl">
            Grouped by where the work lives. A ★ marks the headline projects
            featured on the home page.
          </p>
        </header>

        {GROUP_ORDER.map((group) => {
          const items = projects.filter((p) => p.group === group);
          if (items.length === 0) return null;
          return (
            <section key={group} className="pt-10">
              <h2 className="text-[var(--accent-ink)] text-sm font-semibold uppercase tracking-[0.18em]">
                {group}
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {items.map((project) => (
                  <article
                    key={project.title}
                    className="theme-border theme-surface rounded-[3px] border p-5 shadow-[var(--shadow-sm)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="theme-text-primary flex items-center gap-2 text-xl font-semibold">
                        {project.featured ? (
                          <span
                            aria-label="Headline project"
                            title="Featured on the home page"
                            className="text-[var(--accent-ink)]"
                          >
                            ★
                          </span>
                        ) : null}
                        {project.title}
                      </h3>
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center rounded-[3px] border px-3 py-2 text-sm font-semibold transition-colors border-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-soft)] hover:border-[var(--accent)]"
                        >
                          View Demo
                        </a>
                      ) : null}
                    </div>
                    <p className="theme-text-secondary mt-3 text-sm leading-6">
                      {project.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.languages.map((language) => (
                        <span
                          key={language}
                          className="theme-chip rounded-md border px-2.5 py-1 text-xs font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
