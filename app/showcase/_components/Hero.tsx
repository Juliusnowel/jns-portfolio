"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineReveal from "./LineReveal";
import AuroraCanvas from "./AuroraCanvas";
import CodeDissectMonitor from "./CodeDissectMonitor";
import { BRAND } from "../_lib/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Pinned hero journey — scroll drives the CSS-3D monitor dissect/tilt.
 * Tech floaters live at page level (fixed) and scrub independently.
 */
export default function Hero({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const journeyEnd = isMobile ? 2200 : 3200;

  useGSAP(
    () => {
      if (reducedMotion) return;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${journeyEnd}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      gsap.to(".hero-copy", {
        yPercent: isMobile ? -6 : -12,
        autoAlpha: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${journeyEnd}`,
          scrub: 0.8,
        },
      });

      gsap.to(".hero-stage", {
        yPercent: isMobile ? 6 : 12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${journeyEnd}`,
          scrub: 0.8,
        },
      });
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile, journeyEnd] },
  );

  return (
    <section ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-16"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#f7f6f3]" />

        <div className="hero-stage pointer-events-none absolute inset-[-8%] -z-10 opacity-40 will-change-transform sm:opacity-50">
          <AuroraCanvas reducedMotion={reducedMotion} isMobile={isMobile} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="hero-copy will-change-transform">
            <div data-magnetic="12" className="inline-block will-change-transform">
              <LineReveal
                as="p"
                lines={[BRAND.name]}
                reducedMotion={reducedMotion}
                playOnMount
                className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)] sm:text-base"
                delay={0.05}
              />
            </div>

            <div data-magnetic="20" className="mt-6 will-change-transform">
              <LineReveal
                as="h1"
                lines={["I build, debug,", "and decide."]}
                reducedMotion={reducedMotion}
                playOnMount
                className="sc-display max-w-xl text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] text-[var(--sc-ink)]"
                delay={0.18}
                stagger={0.12}
              />
            </div>

            <div data-magnetic="10" className="mt-8 will-change-transform">
              <LineReveal
                as="p"
                lines={[
                  "dissecting code · finding & fixing bugs ·",
                  "planning & decision-making · programming",
                ]}
                reducedMotion={reducedMotion}
                playOnMount
                className="max-w-md text-base leading-relaxed text-[var(--sc-ink-soft)] sm:text-lg"
                delay={0.45}
                stagger={0.08}
              />
            </div>

            <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--sc-muted)]">
              Scroll to dissect →
            </p>
          </div>

          <div className="hero-focal relative z-10">
            <CodeDissectMonitor
              reducedMotion={reducedMotion}
              isMobile={isMobile}
              journeyRef={pinRef}
              journeyEnd={journeyEnd}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
