"use client";

import Link from "next/link";
import LineReveal from "./LineReveal";
import { BRAND, CONTACT } from "../_lib/work";

export default function ClosingCta({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="relative px-6 pb-28 pt-10 sm:px-10 sm:pb-36 lg:px-16">
      <div className="mx-auto w-full max-w-6xl border-t border-[var(--sc-line)] pt-24 sm:pt-28">
        <LineReveal
          as="h2"
          lines={["Ready when you are."]}
          reducedMotion={reducedMotion}
          className="sc-display max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.08] text-[var(--sc-ink)]"
        />
        <LineReveal
          as="p"
          lines={["See the full portfolio, or get in touch."]}
          reducedMotion={reducedMotion}
          className="mt-5 max-w-lg text-lg text-[var(--sc-ink-soft)]"
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <span data-magnetic="20" className="inline-flex will-change-transform">
            <Link
              href={CONTACT.portfolioHref}
              className="inline-flex items-center justify-center rounded-full bg-[var(--sc-ink)] px-7 py-3.5 text-sm font-medium text-[#f7f6f3] transition-opacity hover:opacity-90"
            >
              View full portfolio →
            </Link>
          </span>
          <span data-magnetic="16" className="inline-flex will-change-transform">
            <Link
              href={CONTACT.contactHref}
              className="inline-flex items-center justify-center rounded-full border border-[var(--sc-line)] bg-transparent px-7 py-3.5 text-sm font-medium text-[var(--sc-ink)] transition-colors hover:bg-white/60"
            >
              Contact
            </Link>
          </span>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-sm text-[var(--sc-muted)] underline-offset-4 hover:text-[var(--sc-ink)] hover:underline"
            title={CONTACT.emailIsPlaceholder ? "PLACEHOLDER email — confirm address" : undefined}
          >
            {CONTACT.email}
            {CONTACT.emailIsPlaceholder ? (
              <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--sc-accent)]">
                placeholder
              </span>
            ) : null}
          </a>
        </div>

        <p className="mt-16 text-sm text-[var(--sc-muted)]">
          © {new Date().getFullYear()} {BRAND.name}
        </p>
      </div>
    </section>
  );
}
