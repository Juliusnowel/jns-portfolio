import type { Metadata } from "next";
import Link from "next/link";

const contactMethods = [
  {
    label: "Email",
    value: "juliusnowels@gmail.com",
    href: "mailto:juliusnowels@gmail.com",
    note: "Best for opportunities and project discussions.",
  },
  {
    label: "GitHub",
    value: "github.com/Juliusnowel",
    href: "https://github.com/Juliusnowel",
    note: "View repositories, code samples, and project work.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/julius-nowel-santiago-74923b292",
    href: "https://www.linkedin.com/in/julius-nowel-santiago-74923b292/",
    note: "Connect professionally and message me directly.",
  },
];

const collaborationNotes = [
  "Full stack WordPress development and plugin customization",
  "Custom business tools and internal workflow automation",
  "Frontend and backend implementation for practical product needs",
  "Project-based work, team collaboration, and long-term growth roles",
];

export const metadata: Metadata = {
  title: "Contact | Julius Nowel B. Santiago",
  description:
    "Get in touch with Julius Nowel B. Santiago for full stack and WordPress-focused opportunities.",
};

export default function ContactPage() {
  return (
    <main className="theme-page min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <header className="theme-border flex flex-wrap items-center justify-between gap-3 border-b pb-6">
          <div>
            <p className="theme-text-muted text-sm font-medium uppercase tracking-[0.18em]">
              Contact
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Let&apos;s Work Together
            </h1>
          </div>
          <Link
            href="/"
            className="theme-outline-btn rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:border-violet-400 hover:text-violet-300"
          >
            Back to Home
          </Link>
        </header>

        <section className="grid gap-6 pt-8 lg:grid-cols-[1.1fr_1fr]">
          <article className="theme-border theme-surface rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">Reach Out</h2>
            <p className="theme-text-secondary mt-3 leading-7">
              I&apos;m open to full stack and WordPress-focused opportunities
              where I can contribute to practical product and business goals.
              Feel free to contact me through any of the channels below.
            </p>

            <div className="mt-6 space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="theme-border theme-surface-solid block rounded-xl border p-4 transition-colors hover:border-violet-400/60"
                >
                  <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.14em]">
                    {method.label}
                  </p>
                  <p className="theme-text-primary mt-2 break-all text-base font-medium">
                    {method.value}
                  </p>
                  <p className="theme-text-muted mt-1 text-sm">{method.note}</p>
                </a>
              ))}
            </div>
          </article>

          <article className="theme-border theme-surface rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">How I Can Help</h2>
            <p className="theme-text-secondary mt-3">
              If your needs align with the areas below, I&apos;d be glad to
              discuss how I can contribute.
            </p>
            <ul className="mt-5 space-y-3">
              {collaborationNotes.map((item) => (
                <li key={item} className="theme-text-secondary flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="theme-border theme-surface-solid mt-6 rounded-xl border p-4">
              <p className="theme-text-muted text-sm uppercase tracking-[0.14em]">
                Preferred First Step
              </p>
              <p className="theme-text-secondary mt-2">
                Send a short message with your project scope, timeline, and
                goals so I can respond with the most relevant next steps.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
