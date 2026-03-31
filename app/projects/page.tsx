"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useThemeMode } from "../hooks/useThemeMode";

type Project = {
  title: string;
  summary: string;
  languages: string[];
  demoUrl?: string;
};

const projects: Project[] = [
  {
    title: "Python Bulk Image Optimizer",
    summary:
      "Flask-based image conversion tool that processes bulk uploads, applies adaptive downscaling, and exports optimized WebP/PNG files inside a downloadable ZIP.",
    languages: ["Python", "Flask"],
  },
  {
    title: "Scrapping-Site",
    summary:
      "Python scraping project for collecting and structuring website data with template-based output pages and reusable crawler scripts.",
    languages: ["Python", "JavaScript", "Shell"],
  },
  {
    title: "business-list-scrap",
    summary:
      "Business directory crawler focused on scraping and normalizing listing data from businesslist.ph for practical lead and research workflows.",
    languages: ["Python", "JavaScript"],
  },
  {
    title: "Break Time Reminder + Telegram Integration",
    summary:
      "Desktop break reminder automation with full-screen alerts, countdown logic, and encrypted Telegram session integration to send BRB/BAT updates.",
    languages: ["Python", "Automation"],
  },
  {
    title: "translate (English to Korean)",
    summary:
      "Lightweight web translation utility that converts English to Korean with a simple interface for fast phrase checks and content drafting.",
    languages: ["JavaScript"],
  },
  {
    title: "Gemini SEO Glossary (Apps Script)",
    summary:
      "Google Apps Script tool that generates SEO glossary drafts from Google Sheets using Gemini with caching and quota-aware cooldown handling.",
    languages: ["JavaScript", "Apps Script"],
  },
  {
    title: "SEO Entity Map (Apps Script)",
    summary:
      "Sheets-based entity bucketing workflow for client and competitor terms that helps generate structured SEO specs and draft directions.",
    languages: ["JavaScript", "Apps Script"],
  },
  {
    title: "Vite Schema CSV Importer (MU Plugin)",
    summary:
      "WordPress admin importer for SEO/meta updates via CSV with dry-run mode, validation, logs, and controlled overwrite behavior.",
    languages: ["PHP", "WordPress"],
  },
  {
    title: "SEO Diagnostic Tool (MU Plugin)",
    summary:
      "Modular SEO scanner in WordPress admin that audits headings, metadata, links, indexability, and content quality with export-ready reports.",
    languages: ["PHP", "WordPress", "JavaScript"],
  },
  {
    title: "Vite SEO Guard (Posts)",
    summary:
      "Publishing guardrails for WordPress posts that require SEO title, meta description, and schema fields before content goes live.",
    languages: ["PHP", "WordPress", "JavaScript"],
  },
  {
    title: "Noyona Store Locator (MU Plugin)",
    summary:
      "Lightweight store management plugin for SEO/content teams with maintainable admin workflows and location-focused content support.",
    languages: ["PHP", "WordPress"],
  },
  {
    title: "Noyona Brand Carousel Manager (MU Plugin)",
    summary:
      "Custom WordPress plugin to manage and map review carousel entries per page template for flexible homepage/landing presentation.",
    languages: ["PHP", "WordPress"],
  },
  {
    title: "Allegiantairtickets (WP Child Theme)",
    summary:
      "Custom Twenty Twenty-Five child theme with reusable Gutenberg blocks and responsive travel-focused landing page sections.",
    languages: ["WordPress", "PHP", "JavaScript"],
    demoUrl: "https://allegiantairtickets.com/",
  },
  {
    title: "Noyonacosmetics (WP Child Theme)",
    summary:
      "WordPress child theme with custom design tokens, responsive typography, and reusable section patterns for brand-driven layouts.",
    languages: ["WordPress", "PHP", "JavaScript"],
    demoUrl: "https://noyonacosmetics.com/",
  },
  {
    title: "Viteseo (WP Child Theme)",
    summary:
      "Production-focused child theme setup with layout system controls, block spacing normalization, and reusable section components.",
    languages: ["WordPress", "PHP", "JavaScript"],
    demoUrl: "https://viteseo.ph/",
  },
  {
    title: "Creceri Website Maintenance",
    summary:
      "WordPress maintenance work using a child-theme approach, focused on safe updates, layout consistency, and ongoing content/section improvements.",
    languages: ["WordPress", "PHP", "JavaScript"],
    demoUrl: "https://creceri.com/",
  },
  {
    title: "YY Zhenshun Website Maintenance",
    summary:
      "WordPress maintenance support with child-theme workflow for stable customizations, compatibility updates, and day-to-day production fixes.",
    languages: ["WordPress", "PHP", "JavaScript"],
    demoUrl: "https://yyzhenshun.com/",
  },
  {
    title: "Vue + Laravel OJT Project",
    summary:
      "Full stack OJT project with Vue frontend and Laravel backend, focused on practical workflows and API-driven screens.",
    languages: ["Vue", "Laravel", "JavaScript", "PHP"],
  },
  {
    title: "React Native + Laravel Thesis",
    summary:
      "Mobile-first thesis application using React Native (Expo) with Laravel backend services and API integration.",
    languages: ["React Native", "Expo", "Laravel", "PHP", "JavaScript"],
  },
];

export default function ProjectsPage() {
  const { isDark } = useThemeMode();
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
              <p className="theme-text-muted text-sm font-medium uppercase tracking-[0.18em]">
                Projects
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Project Showcase
              </h1>
            </div>
            <Link
              href="/"
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                isDark
                  ? "border-zinc-600 text-zinc-100 hover:border-violet-400 hover:text-violet-300"
                  : "border-slate-300 text-slate-700 hover:border-violet-500 hover:text-violet-600"
              }`}
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
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? isDark
                        ? "border-violet-400 bg-violet-500/15 text-violet-200"
                        : "border-violet-500 bg-violet-600 text-white"
                      : isDark
                        ? "theme-chip hover:border-violet-400/70"
                        : "border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-violet-600"
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
              className={`rounded-2xl border p-5 ${
                isDark
                  ? "theme-border theme-surface"
                  : "bg-slate-100 border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="theme-text-primary text-xl font-semibold">{project.title}</h3>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex shrink-0 items-center rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      isDark
                        ? "border-violet-400/70 text-violet-200 hover:bg-violet-500/10"
                        : "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:border-violet-400"
                    }`}
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
