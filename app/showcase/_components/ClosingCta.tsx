"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineReveal from "./LineReveal";
import { BRAND, CONTACT } from "../_lib/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Superlist-inspired closing band, adapted to the showcase system:
 * bold full-bleed ink panel (not Superlist red), centered display headline,
 * pill CTAs, and a quiet sub-footer with brand + links.
 * No email form — Contact routes to /contact.
 */
export default function ClosingCta({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        ".sc-footer-band",
        { y: 48 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  const year = new Date().getFullYear();

  return (
    <section ref={rootRef} className="relative mt-8 px-4 pb-6 sm:px-6 sm:pb-8 lg:px-10">
      <div className="sc-footer-band relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[var(--sc-ink)] text-[#f7f6f3] will-change-transform sm:rounded-[2.5rem]">
        {/* Soft geometric wash — Superlist-style depth without their red */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(247,246,243,0.08) 0%, transparent 42%), radial-gradient(ellipse 70% 55% at 85% 110%, rgba(44,74,110,0.45), transparent 60%)",
          }}
        />

        {/* Main CTA block */}
        <div className="relative z-10 flex flex-col items-center px-6 pb-16 pt-20 text-center sm:px-10 sm:pb-20 sm:pt-28">
          <LineReveal
            as="p"
            lines={["Next step"]}
            reducedMotion={reducedMotion}
            className="text-sm font-medium uppercase tracking-[0.28em] text-white/45"
          />
          <LineReveal
            as="h2"
            lines={["Ready when you are."]}
            reducedMotion={reducedMotion}
            className="sc-display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.05] text-[#f7f6f3]"
            delay={0.05}
          />
          <LineReveal
            as="p"
            lines={["See the full portfolio, or get in touch."]}
            reducedMotion={reducedMotion}
            className="mt-5 max-w-md text-base text-white/60 sm:text-lg"
            delay={0.1}
          />

          {/* Pill CTA group — Superlist capsule, adapted to dual actions */}
          <div className="mt-10 w-full max-w-xl">
            <div className="flex flex-col items-stretch gap-3 rounded-full border border-white/20 bg-white/5 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2 sm:pl-3 sm:pr-2">
              <span
                data-magnetic={reducedMotion ? undefined : "8"}
                className="inline-flex min-w-0 flex-1 will-change-transform"
              >
                <Link
                  href={CONTACT.portfolioHref}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#f7f6f3] px-6 py-3.5 text-sm font-medium text-[var(--sc-ink)] transition-opacity hover:opacity-90 sm:justify-start sm:pl-5"
                >
                  View full portfolio →
                </Link>
              </span>
              <span
                data-magnetic={reducedMotion ? undefined : "6"}
                className="inline-flex shrink-0 will-change-transform"
              >
                <Link
                  href={CONTACT.contactHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-[var(--sc-accent)] px-6 py-3.5 text-sm font-medium text-[#f7f6f3] transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Contact
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/25 text-xs"
                  >
                    →
                  </span>
                </Link>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/40">Build · debug · decide.</p>
          </div>
        </div>

        {/* Peek strip — thematic nod to the workstation, not Superlist's app chrome */}
        <div className="relative z-10 mx-auto w-[min(92%,36rem)] translate-y-3 overflow-hidden rounded-t-2xl border border-white/10 border-b-0 bg-[#1a1b1f] shadow-[0_-12px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
              dissect.ts — ready
            </span>
          </div>
          <div className="space-y-1 px-4 py-3 font-mono text-[0.65rem] leading-relaxed text-white/45">
            <p>
              <span className="text-[#ff7b72]">function</span>{" "}
              <span className="text-[#d2a8ff]">ship</span>
              <span className="text-white/70">() {"{"}</span>
            </p>
            <p className="pl-4 text-[#7ee787]">return &quot;let&apos;s build&quot;;</p>
            <p className="text-white/70">{"}"}</p>
          </div>
        </div>

        {/* Sub-footer bar */}
        <div className="relative z-10 border-t border-white/10 px-6 py-5 sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/55">
              <span className="sc-display text-base text-[#f7f6f3]">{BRAND.name}</span>
              <Link href="/" className="transition-colors hover:text-[#f7f6f3]">
                Portfolio
              </Link>
              <Link href="/projects" className="transition-colors hover:text-[#f7f6f3]">
                Projects
              </Link>
              <Link href="/about" className="transition-colors hover:text-[#f7f6f3]">
                About
              </Link>
              <Link
                href={CONTACT.contactHref}
                className="transition-colors hover:text-[#f7f6f3]"
              >
                Contact
              </Link>
            </div>
            <p className="text-sm text-white/40">
              © {year} {BRAND.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
