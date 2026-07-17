"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineReveal from "./LineReveal";
import AuroraCanvas from "./AuroraCanvas";
import Workstation3D from "./workstation/Workstation3D";
import { scrollStore, resetScrollStore } from "../_lib/scrollStore";
import { selectedWork, capabilities, BRAND } from "../_lib/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The whole opening act in ONE pinned cinematic (replaces the old separate
 * hero + skills-pin + selected-work sections):
 *
 *   1. HERO — copy beside the assembled, front-facing workstation (intro
 *      assemble on load lives in the 3D scene itself).
 *   2. FOCUS — copy translates up + fades out; the stage centers and scales
 *      up; the scene turns to a 3/4 angle.
 *   3. DISSECT + EMIT — the workstation explodes while projects emerge one
 *      by one “out of the monitor screen” toward the viewer (DOM cards,
 *      transform+opacity only, anchored over the screen's spot). Subtle
 *      skill chips sit on the exploded parts.
 *   4. CLOSE — the workstation reassembles; the pin releases into the
 *      capabilities/range/CTA flow.
 *
 * One ScrollTrigger (pin, scrub 0.8) drives everything: its onUpdate writes
 * progress into scrollStore (read + lerped by the R3F scene in useFrame), and
 * the same scrubbed timeline (0–10 = progress × 10) runs the DOM beats, so 3D
 * and DOM stay in lockstep and fully reverse on scroll-up.
 */

// Timeline windows (0–10). Scene phases: turn 0.8→2.8, explode 3→5, reassemble 8.6→10.
const CARD_WINDOWS = [
  { in: 3.2, out: 4.9 },
  { in: 5.15, out: 6.85 },
  { in: 7.1, out: 8.55 },
];

const CHIP_POS = [
  "left-[4%] top-[10%]",
  "right-[4%] top-[16%]",
  "left-[6%] bottom-[18%]",
  "right-[6%] bottom-[12%]",
];

export default function HeroDissect({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => resetScrollStore, []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>(".hd-card");
      const chips = gsap.utils.toArray<HTMLElement>(".hd-chip");

      // Initial states — hero layout: copy left (mobile: top), stage offset
      gsap.set(
        ".hd-stage",
        isMobile ? { y: "16vh", scale: 0.72 } : { xPercent: 24, scale: 0.82 },
      );

      // Cards start AT the screen (small, transparent) — they scale toward
      // the viewer as they emit
      gsap.set(cards, { xPercent: -50, y: 0, scale: 0.55, autoAlpha: 0 });
      gsap.set(chips, { autoAlpha: 0, y: 8 });

      const pinEnd = isMobile ? 3000 : 4400;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${pinEnd}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollStore.progress = self.progress;
          },
        },
      });

      // Pad the timeline to a 0–10 scale so windows map 1:1 to scene phases
      tl.to({}, { duration: 10 }, 0);

      // —— FOCUS SHIFT: copy hides, workstation becomes sole focus ——
      tl.to(
        ".hd-copy",
        { y: -90, autoAlpha: 0, duration: 1.3, ease: "power2.in" },
        0.15,
      );
      tl.to(
        ".hd-stage",
        isMobile
          ? { y: 0, scale: 0.98, duration: 1.7 }
          : { xPercent: 0, scale: 1.08, duration: 1.7 },
        0.2,
      );
      tl.to(".hd-aurora", { autoAlpha: 0.22, duration: 1.6 }, 0.4);

      // —— Subtle skill chips on the exploded parts ——
      chips.forEach((chip, i) => {
        tl.to(chip, { autoAlpha: 0.8, y: 0, duration: 0.5 }, 2.7 + i * 0.12)
          .to(chip, { autoAlpha: 0, y: -8, duration: 0.4 }, 8.5);
      });

      // —— EMIT: projects out of the screen, one per scroll segment ——
      cards.forEach((card, i) => {
        const w = CARD_WINDOWS[i];
        if (!w) return;
        tl.to(
          card,
          {
            autoAlpha: 1,
            scale: 1,
            y: isMobile ? 84 : 116,
            duration: 0.7,
            ease: "power3.out",
          },
          w.in,
        ).to(
          card,
          {
            autoAlpha: 0,
            scale: 1.12,
            y: isMobile ? 120 : 160,
            duration: 0.5,
            ease: "power2.in",
          },
          w.out,
        );
      });
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile] },
  );

  // —— REDUCED MOTION: static hero + assembled workstation + projects listed ——
  if (reducedMotion) {
    return (
      <section className="relative bg-[#f7f6f3] px-6 pb-20 pt-24 sm:px-10 sm:pt-28 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <HeroCopy reducedMotion />
          <div className="mt-10 h-[300px] w-full sm:h-[420px]">
            <Workstation3D staticScene isMobile={isMobile} />
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {selectedWork.map((item, i) => (
              <li
                key={item.id}
                className="rounded-2xl border border-[var(--sc-line)] bg-white/80 p-5"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--sc-accent)]">
                  0{i + 1} · {item.domain}
                </p>
                <p className="sc-display mt-2 text-xl text-[var(--sc-ink)]">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-ink-soft)]">
                  {item.summary}
                </p>
                <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--sc-muted)]">
                  {item.stack.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative">
      <div ref={pinRef} className="relative min-h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#f7f6f3]" />

        <div className="hd-aurora pointer-events-none absolute inset-[-8%] -z-10 opacity-40 will-change-transform sm:opacity-50">
          <AuroraCanvas reducedMotion={reducedMotion} isMobile={isMobile} />
        </div>

        {/* 3D stage — centered; initial offset/scale applied via GSAP */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="hd-stage h-[52vh] w-[min(92vw,64rem)] will-change-transform sm:h-[64vh]">
            <Workstation3D staticScene={false} isMobile={isMobile} />
          </div>
        </div>

        {/* Subtle skill chips on the exploded parts (desktop only) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          {capabilities.map((cap, i) => (
            <span
              key={cap.id}
              className={`hd-chip absolute rounded-full border border-[var(--sc-line)] bg-white/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--sc-ink-soft)] will-change-transform ${CHIP_POS[i]}`}
            >
              {cap.title}
            </span>
          ))}
        </div>

        {/* Projects — emitted from the monitor screen, one per segment */}
        <div aria-live="polite" className="pointer-events-none absolute inset-0 z-20">
          {selectedWork.map((item, i) => (
            <div
              key={item.id}
              className="hd-card absolute left-1/2 top-[16%] w-[min(88vw,24rem)] will-change-transform sm:top-[15%]"
            >
              <div className="rounded-2xl border border-[var(--sc-line)] bg-white/95 p-5 shadow-[0_24px_60px_rgba(20,20,20,0.16)] sm:p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--sc-accent)]">
                  0{i + 1} / 03 · {item.domain}
                </p>
                <p className="sc-display mt-2 text-2xl leading-tight text-[var(--sc-ink)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-ink-soft)]">
                  {item.summary}
                </p>
                <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--sc-muted)]">
                  {item.stack.join(" · ")}
                  {item.caseStudy ? " · case study" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero copy — hides as the pin begins */}
        {/* Mobile: extra bottom padding keeps copy in the upper half, clear of the workstation */}
        <div className="hd-copy relative z-10 flex min-h-[100svh] flex-col justify-center px-6 pb-[32vh] pt-24 will-change-transform sm:px-10 sm:pb-20 sm:pt-28 lg:px-16">
          <div className="mx-auto w-full max-w-6xl">
            <HeroCopy reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCopy({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="max-w-xl">
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

      {!reducedMotion && (
        <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--sc-muted)]">
          Scroll to dissect →
        </p>
      )}
    </div>
  );
}
