import type { Metadata } from "next";
import Link from "next/link";

const coreHighlights = [
  "Works as a technical lead and full-stack developer in a lean startup.",
  "Guides a small team while staying hands-on in day-to-day delivery.",
  "Builds websites, internal business systems, and deployment workflows.",
  "Graduated summa cum laude and applies that same consistency to delivery.",
];

const journey = [
  {
    label: "Current Role",
    title: "Technical Lead & Full-Stack Developer",
    details:
      "Guides a small team and builds across websites, internal business systems, and deployment, while owning the day-to-day technical calls.",
  },
  {
    label: "OJT / Internship",
    title: "Vue + Laravel",
    details:
      "Worked on full stack development using Vue for frontend interfaces and Laravel for backend logic and APIs.",
  },
  {
    label: "Thesis Project",
    title: "React Native + Laravel",
    details:
      "Developed a mobile-first project with React Native (Expo) connected to a Laravel backend.",
  },
];

const practicalWork = [
  {
    title: "Custom WordPress Store Locator Plugin",
    description:
      "Implemented store search, map markers, region filtering, quick filters, open/closed status, and an admin page for store entry management.",
  },
  {
    title: "Python Bulk Image Optimizer",
    description:
      "Built an internal utility that accepts PNG/JPEG files, converts them to WebP, and compresses outputs to 250 KB below.",
  },
];

export const metadata: Metadata = {
  title: "About | Julius Nowel B. Santiago",
  description:
    "About Julius Nowel B. Santiago, a technical lead and full-stack developer working across web apps, internal business systems, and deployment.",
};

export default function AboutPage() {
  return (
    <main className="theme-page min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <header className="theme-border flex flex-wrap items-center justify-between gap-3 border-b pb-6">
          <div>
            <p className="text-[var(--accent-ink)] text-sm font-semibold uppercase tracking-[0.18em]">
              About
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Julius Nowel B. Santiago
            </h1>
          </div>
          <Link
            href="/"
            className="theme-outline-btn rounded-[3px] border px-4 py-2 text-sm font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
          >
            Back to Home
          </Link>
        </header>

        <section className="grid gap-8 pt-8 lg:grid-cols-[1.1fr_1fr]">
          <article className="space-y-4">
            <h2 className="text-2xl font-semibold">Who I Am</h2>
            <p className="theme-text-secondary text-lg leading-8">
              I am a technical lead and full-stack developer. I guide a small
              team while staying hands-on across custom web solutions, internal
              business systems, and deployment — focused on maintainable work
              that solves real operational needs.
            </p>
            <ul className="space-y-3">
              {coreHighlights.map((item) => (
                <li key={item} className="theme-text-secondary flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="theme-border theme-surface rounded-[3px] border p-6">
            <h3 className="text-xl font-semibold">What I Focus On</h3>
            <p className="theme-text-secondary mt-3 leading-7">
              My day-to-day centers on full-stack development, custom WordPress,
              and the practical technical decisions that keep projects stable,
              shippable, and easy to maintain.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "WordPress",
                "PHP",
                "Laravel",
                "Vue",
                "React Native",
                "Python",
              ].map((tech) => (
                <span
                  key={tech}
                  className="theme-chip rounded-md border px-3 py-1.5 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="pt-10">
          <h2 className="text-2xl font-semibold">Professional Journey</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {journey.map((step) => (
              <article
                key={step.title}
                className="theme-border theme-surface rounded-[3px] border p-5"
              >
                <p className="text-[var(--accent-ink)] text-xs font-semibold uppercase tracking-[0.14em]">
                  {step.label}
                </p>
                <h3 className="theme-text-primary mt-2 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="theme-text-secondary mt-3 text-sm leading-6">
                  {step.details}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-2xl font-semibold">Selected Practical Work</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {practicalWork.map((item) => (
              <article
                key={item.title}
                className="theme-border theme-surface rounded-[3px] border p-5"
              >
                <h3 className="theme-text-primary text-lg font-semibold">{item.title}</h3>
                <p className="theme-text-secondary mt-3 text-sm leading-6">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-10">
          <div className="theme-border theme-surface rounded-[3px] border p-6 text-center">
            <h2 className="text-2xl font-semibold">Let&apos;s Connect</h2>
            <p className="theme-text-secondary mx-auto mt-3 max-w-2xl">
              Open to opportunities where I can contribute to product delivery,
              full-stack development, and technical leadership.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:juliusnowels@gmail.com"
                className="rounded-[3px] bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)] transition-all hover:bg-[var(--accent-hover)]"
              >
                Email Me
              </a>
              <a
                href="https://github.com/Juliusnowel"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-outline-btn rounded-[3px] border px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/julius-nowel-santiago-74923b292/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-outline-btn rounded-[3px] border px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                LinkedIn
              </a>
              {/* <a
                href="/contact"
                className="rounded-[3px] border border-zinc-600 px-5 py-2.5 text-sm font-semibold text-zinc-100 hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                Contact Me
              </a> */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
