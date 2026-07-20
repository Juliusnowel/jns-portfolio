"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineReveal from "./LineReveal";
import { capabilities } from "../_lib/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Capabilities list with layered 2D parallax: the heading, the row numbers,
 * and two soft gradient orbs all drift at different speeds while scrolling
 * (transform-only, scrubbed). Row bodies stay put so the ruled borders
 * remain perfectly aligned.
 */
export default function Capabilities({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const drift = (
        target: gsap.TweenTarget,
        fromY: number,
        toY: number,
        scrub = 0.6,
      ) =>
        gsap.fromTo(
          target,
          { y: fromY },
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub,
            },
          },
        );

      // Slow layer: heading
      drift(".cap-head", 48, -36);

      // Mid layers: row numbers, each slightly faster than the last
      gsap.utils.toArray<HTMLElement>(".cap-num").forEach((el, i) => {
        drift(el, 26 + i * 12, -(18 + i * 10));
      });

      // Deep layer: gradient orbs, opposing directions
      drift(".cap-orb-a", 110, -90, 0.8);
      drift(".cap-orb-b", -90, 110, 0.8);
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      {/* Parallax gradient orbs — deep background layer (desktop only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div
          className="cap-orb-a absolute -left-32 top-[12%] h-[28rem] w-[28rem] rounded-full opacity-70 blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,132,94,0.16), rgba(255,132,94,0) 70%)",
          }}
        />
        <div
          className="cap-orb-b absolute -right-36 bottom-[6%] h-[32rem] w-[32rem] rounded-full opacity-70 blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(112,140,255,0.14), rgba(112,140,255,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="cap-head will-change-transform">
          <LineReveal
            as="p"
            lines={["What I do"]}
            reducedMotion={reducedMotion}
            className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)]"
          />
          <LineReveal
            as="h2"
            lines={["Capabilities, one at a time."]}
            reducedMotion={reducedMotion}
            className="sc-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-[var(--sc-ink)]"
            delay={0.05}
          />
        </div>

        <ul className="mt-16 space-y-0 border-t border-[var(--sc-line)]">
          {capabilities.map((cap, i) => (
            <li
              key={cap.id}
              className="grid gap-3 border-b border-[var(--sc-line)] py-8 sm:grid-cols-[5rem_1fr] sm:gap-10 sm:py-10"
            >
              <span className="cap-num inline-block will-change-transform">
                <LineReveal
                  as="span"
                  lines={[`0${i + 1}`]}
                  reducedMotion={reducedMotion}
                  className="font-mono text-sm text-[var(--sc-muted)]"
                  delay={i * 0.04}
                />
              </span>
              <div>
                <LineReveal
                  as="h3"
                  lines={[cap.title]}
                  reducedMotion={reducedMotion}
                  className="sc-display text-[clamp(1.5rem,3vw,2.25rem)] text-[var(--sc-ink)]"
                  delay={0.04 + i * 0.04}
                />
                <LineReveal
                  as="p"
                  lines={[cap.detail]}
                  reducedMotion={reducedMotion}
                  className="mt-2 max-w-xl text-base text-[var(--sc-ink-soft)] sm:text-lg"
                  delay={0.08 + i * 0.04}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
