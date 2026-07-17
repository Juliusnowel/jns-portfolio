"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Workstation3D from "./workstation/Workstation3D";
import { scrollStore, resetScrollStore } from "../_lib/scrollStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Signature pinned section — the 3D exploded workstation.
 *
 * One pinned ScrollTrigger (scrub 0.8):
 *   • onUpdate writes self.progress → scrollStore.progress (the R3F scene
 *     reads + lerps it in useFrame — no React state per tick).
 *   • The same timeline scrubs the DOM annotation cards (transform+opacity
 *     only) so each label appears while its part is separated.
 *
 * Part → skill mapping:
 *   screen (code)     → Dissecting code
 *   screen (bug line) → Finding & fixing bugs
 *   keyboard/keycaps  → Programming
 *   PCB / logic board → Planning & decision-making
 */

const NOTES = [
  {
    id: "dissect",
    part: "Monitor · screen",
    title: "Dissecting code",
    detail: "Reading the system top-to-bottom until its logic is obvious.",
    pos: "left-0 top-2 sm:left-2 sm:top-6",
  },
  {
    id: "bugs",
    part: "Screen · highlighted line",
    title: "Finding & fixing bugs",
    detail: "Isolating the off-by-one, the race, the edge case — then closing it.",
    pos: "right-0 top-8 sm:right-2 sm:top-14",
  },
  {
    id: "program",
    part: "Keyboard · keycaps",
    title: "Programming",
    detail: "Turning the decision into clean, working, shippable code.",
    pos: "left-0 bottom-10 sm:left-4 sm:bottom-16",
  },
  {
    id: "plan",
    part: "Logic board",
    title: "Planning & decision-making",
    detail: "Weighing trade-offs and picking the approach before writing a line.",
    pos: "right-0 bottom-4 sm:right-4 sm:bottom-8",
  },
] as const;

// Annotation windows on the 0–10 timeline (scene turn ends ~2.2, explode 2.4→4.4,
// reassemble starts at 8.0)
const WINDOWS = [
  { in: 2.5, out: 4.4 },
  { in: 4.55, out: 6.0 },
  { in: 6.15, out: 7.4 },
  { in: 7.55, out: 8.7 },
];

export default function WorkstationPin({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // The scene lerps toward scrollStore — make sure a remount starts clean.
  useEffect(() => resetScrollStore, []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const notes = gsap.utils.toArray<HTMLElement>(".ws-note");
      const sides = gsap.utils.toArray<HTMLElement>(".ws-side");

      gsap.set(notes, { autoAlpha: 0, y: 14 });
      gsap.set(sides, { autoAlpha: 0.35 });

      const pinEnd = isMobile ? 2400 : 3600;

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

      // Timeline spans 0→10 so windows line up with the scene's phase mapping.
      tl.to({}, { duration: 10 }, 0);

      WINDOWS.forEach((w, i) => {
        if (!notes[i]) return;
        tl.to(notes[i], { autoAlpha: 1, y: 0, duration: 0.45 }, w.in)
          .to(notes[i], { autoAlpha: 0, y: -10, duration: 0.4 }, w.out);
        if (sides[i]) {
          tl.to(sides[i], { autoAlpha: 1, duration: 0.35 }, w.in).to(
            sides[i],
            { autoAlpha: 0.35, duration: 0.35 },
            w.out,
          );
        }
      });
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile] },
  );

  // —— Reduced motion: still 3D render, everything labeled, no pin/scrub ——
  if (reducedMotion) {
    return (
      <section className="relative px-6 py-24 sm:px-10 sm:py-32 lg:px-16" style={{ background: "#f3f1ec" }}>
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)]">
            The workstation
          </p>
          <h2 className="sc-display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] text-[var(--sc-ink)]">
            Every part maps to a skill.
          </h2>

          <div className="mt-10 h-[320px] w-full sm:h-[420px]">
            <Workstation3D staticScene isMobile={isMobile} />
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {NOTES.map((n) => (
              <li key={n.id} className="rounded-xl border border-[var(--sc-line)] bg-white/70 p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--sc-accent)]">
                  {n.part}
                </p>
                <p className="sc-display mt-1 text-xl text-[var(--sc-ink)]">{n.title}</p>
                <p className="mt-1 text-sm text-[var(--sc-ink-soft)]">{n.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 py-14 sm:px-10 lg:px-16"
        style={{ background: "#f3f1ec" }}
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Side copy */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)]">
              The workstation
            </p>
            <h2 className="sc-display mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.1] text-[var(--sc-ink)]">
              Scroll to dissect it — every part maps to a skill.
            </h2>
            <ol className="mt-8 space-y-3.5">
              {NOTES.map((n, i) => (
                <li key={n.id} className="ws-side flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[var(--sc-muted)]">0{i + 1}</span>
                  <span className="text-base text-[var(--sc-ink)] sm:text-lg">{n.title}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 3D stage + annotation overlay */}
          <div className="relative">
            <div className="h-[340px] w-full sm:h-[460px] lg:h-[520px]">
              <Workstation3D staticScene={false} isMobile={isMobile} />
            </div>

            {/* Annotations — real DOM text, transform/opacity only */}
            <div aria-live="polite" className="pointer-events-none absolute inset-0">
              {NOTES.map((n) => (
                <div
                  key={n.id}
                  className={`ws-note absolute max-w-[13rem] will-change-transform sm:max-w-[15rem] ${n.pos}`}
                >
                  <div className="rounded-xl border border-[var(--sc-line)] bg-white/95 p-3 shadow-[0_14px_36px_rgba(20,20,20,0.1)]">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[var(--sc-accent)]">
                      {n.part}
                    </p>
                    <p className="sc-display mt-1 text-lg leading-tight text-[var(--sc-ink)] sm:text-xl">
                      {n.title}
                    </p>
                    <p className="mt-1 hidden text-xs leading-relaxed text-[var(--sc-ink-soft)] sm:block">
                      {n.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
