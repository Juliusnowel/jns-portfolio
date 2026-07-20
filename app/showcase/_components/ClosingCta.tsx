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
 * Superlist-inspired closing band — full-bleed ink panel, equal CTAs
 * (no pill wrapper), quiet sub-footer without redundant Portfolio/Contact.
 */
export default function ClosingCta({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        ".sc-footer-band",
        { y: 36 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top 45%",
            scrub: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  const year = new Date().getFullYear();

  return (
    <section ref={rootRef} className="relative mt-10">
      <div className="sc-footer-band relative w-full overflow-hidden bg-[var(--sc-ink)] text-[#f7f6f3] will-change-transform">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(247,246,243,0.07) 0%, transparent 42%), radial-gradient(ellipse 70% 55% at 85% 110%, rgba(44,74,110,0.45), transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-20 text-center sm:px-10 sm:pb-20 sm:pt-28 lg:px-16">
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

          {/* Equal CTAs — no outer capsule; hover via transform + opacity only */}
          <div className="mt-10 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <span
              data-magnetic={reducedMotion ? undefined : "8"}
              className="inline-flex will-change-transform"
            >
              <Link
                href={CONTACT.portfolioHref}
                className="group inline-flex w-full items-center justify-center rounded-full bg-[#f7f6f3] px-6 py-3.5 text-sm font-medium text-[var(--sc-ink)] transition-[transform,opacity,background-color] duration-300 ease-out hover:scale-[1.03] hover:bg-white hover:opacity-100 active:scale-[0.98]"
              >
                <span className="inline-flex items-center gap-2">
                  View full portfolio
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </span>
            <span
              data-magnetic={reducedMotion ? undefined : "8"}
              className="inline-flex will-change-transform"
            >
              <Link
                href={CONTACT.contactHref}
                className="group inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-[var(--sc-accent)] px-6 py-3.5 text-sm font-medium text-[#f7f6f3] transition-[transform,opacity,background-color,border-color] duration-300 ease-out hover:scale-[1.03] hover:border-white/45 hover:bg-[#3a5f8c] active:scale-[0.98]"
              >
                <span className="inline-flex items-center gap-2">
                  Contact
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </span>
          </div>

          <p className="mt-5 text-sm text-white/40">Build · debug · decide.</p>

          {/* Sub-nav — no border / container; just open type */}
          <div className="mt-14 flex w-full flex-col gap-4 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/55 sm:justify-start">
              <span className="sc-display text-base text-[#f7f6f3]">{BRAND.name}</span>
              <Link href="/projects" className="transition-colors duration-200 hover:text-[#f7f6f3]">
                Projects
              </Link>
              <Link href="/about" className="transition-colors duration-200 hover:text-[#f7f6f3]">
                About
              </Link>
            </div>
            <p className="text-sm text-white/40 sm:text-right">
              © {year} Copyright
            </p>
          </div>
        </div>

        {/* IDE peek sits at the bottom of the band */}
        <div className="relative z-10 mx-auto mt-10 w-[min(92%,36rem)] overflow-hidden rounded-t-2xl border border-white/10 border-b-0 bg-[#1a1b1f] shadow-[0_-12px_40px_rgba(0,0,0,0.25)] sm:mt-14">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
              dissect.ts — ready
            </span>
          </div>
          <div className="px-4 py-3 font-mono text-[0.65rem] leading-relaxed text-white/45">
            <p className="truncate whitespace-nowrap">
              <span className="text-[#ff7b72]">function</span>{" "}
              <span className="text-[#d2a8ff]">ship</span>
              <span className="text-white/70">() {"{"} </span>
              <span className="text-[#7ee787]">return &quot;let&apos;s build&quot;;</span>
              <span className="text-white/70"> {"}"}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
