"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Project = {
  title: string;
  summary: string;
  languages: string[];
  demoUrl?: string;
};

const projects: Project[] = [
  {
    title: "Zerem — AI Customer-Engagement",
    summary:
      "AI customer-engagement layer for a CRM: Meta Messenger/Instagram inbound + outbound with an OpenRouter (gpt-4o-mini) reply-draft and auto-reply pipeline, safety guardrails (allowlist, rate caps, sanitization) and human handoff. v1 built, feature-flagged, pending Meta app review.",
    languages: ["Laravel", "Next.js", "OpenRouter / LLM", "Meta API"],
  },
  {
    title: "Slotflo — Booking SaaS",
    summary:
      "Multi-tenant appointment-booking platform: timezone-aware availability engine, transactional row-locking to prevent double-booking, prepaid package-credit lifecycle, public self-booking with bot/rate-limit hardening, and email + push reminders. ~97 feature tests; pre-launch.",
    languages: ["Laravel", "Next.js", "Multi-tenant", "PHP"],
  },
  {
    title: "Stockflo — Inventory SaaS",
    summary:
      "Multi-tenant inventory/stock system: single-source-of-truth stock-movement ledger with negative-stock and concurrency guards, FEFO batch/expiry and serial tracking, moving-average costing/valuation, and purchase/sales orders with reservations. ~37 feature tests; pre-launch.",
    languages: ["Laravel", "Next.js", "Multi-tenant", "PHP"],
  },
  {
    title: "ViteSEO Systems — Unified Platform",
    summary:
      "Unified HRIS + CRM + PMS behind one login. As technical lead I merged three standalone systems into one multi-tenant platform (Sanctum auth, org-scoping across 57 tables), owned cross-team integration and release, and built the HR access-lifecycle (auto-provision on hire, close on separation) test-first.",
    languages: ["Laravel", "Next.js", "Multi-tenant", "PHP"],
  },
  {
    title: "Accounting Module",
    summary:
      "Accounting module within the platform — recurring invoices, revenue recognition, and subscription billing, scoped per tenant. (Not yet CPA-validated.)",
    languages: ["Laravel", "Next.js", "PHP"],
  },
  {
    title: "Kiosk Module",
    summary:
      "Lead-gen kiosk module — access grants, product catalog, and geofenced access control enforced through middleware.",
    languages: ["Laravel", "Next.js", "PHP"],
  },
  {
    title: "Kiplo NFC",
    summary:
      "Account-based NFC digital-card platform — multi-section profiles, themes, per-link analytics, and admin-controlled Basic/Premium tiers. Live.",
    languages: ["Next.js", "Laravel", "PHP"],
    demoUrl: "https://tap.kiplosolutions.com/",
  },
  {
    title: "Production WordPress Client Sites",
    summary:
      "Production client websites built and maintained with custom child themes (Allegiant Air Tickets, Noyona Cosmetics, ViteSEO, Creceri) — custom Gutenberg blocks, WooCommerce, and maintainable, business-focused structure.",
    languages: ["WordPress", "PHP", "JavaScript"],
    demoUrl: "https://noyonacosmetics.com/",
  },
  {
    title: "SEO Production Plugins (WordPress)",
    summary:
      "Custom WordPress plugins used in real SEO workflows — a CSV meta importer with dry-run + validation, a modular SEO diagnostic scanner, and publish-time SEO guardrails.",
    languages: ["PHP", "WordPress", "JavaScript"],
  },
];

export default function ProjectsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const languageFilters = useMemo(() => {
    const unique = new Set<string>();
    projects.forEach((project) => {
      project.languages.forEach((language) => unique.add(language));
    });
    return ["All", ...Array.from(unique)];
  }, []);

  const filteredProjects = useMemo(() => {
    const list =
      selectedLanguage === "All"
        ? projects
        : projects.filter((project) =>
            project.languages.includes(selectedLanguage),
          );

    return [...list].sort((a, b) => {
      const aHasDemo = Boolean(a.demoUrl);
      const bHasDemo = Boolean(b.demoUrl);
      return Number(bHasDemo) - Number(aHasDemo);
    });
  }, [selectedLanguage]);

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
            Filter projects by language or stack. Demo CTA appears only for
            projects with a demo URL.
          </p>
        </header>

        <section className="pt-8">
          <h2 className="text-xl font-semibold">Filter by Language</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {languageFilters.map((language) => {
              const isActive = selectedLanguage === language;
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => setSelectedLanguage(language)}
                  className={`rounded-[3px] border px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                      : "theme-chip hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
                  }`}
                >
                  {language}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.title}
              className="theme-border theme-surface rounded-[3px] border p-5 shadow-[var(--shadow-sm)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="theme-text-primary text-xl font-semibold">{project.title}</h3>
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
        </section>
      </div>
    </main>
  );
}
