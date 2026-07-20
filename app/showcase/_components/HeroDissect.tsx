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
 * The whole opening act in ONE pinned cinematic:
 *
 *   1. HERO — copy beside the assembled, front-facing workstation.
 *   2. FOCUS — copy translates up + fades out; the stage centers and scales
 *      up; the scene turns to a 3/4 angle.
 *   3. DISSECT + EMIT — the workstation explodes while projects fly out of
 *      the center monitor to the CORNERS, each tethered back to the monitor
 *      by an L-shaped connector (horizontal + vertical segments only).
 *   4. CLOSE — the workstation reassembles; the pin releases.
 *
 * One ScrollTrigger (pin, scrub 0.8) drives everything: onUpdate writes
 * progress into scrollStore (read + lerped by the R3F scene in useFrame) and
 * the same scrubbed timeline (0–10 = progress × 10) runs the DOM beats.
 * All DOM state uses fromTo so progress 0 is EXACTLY the rest layout — no
 * snapping at the pin boundaries (anticipatePin is deliberately off; it
 * jumps with smooth-scroll libraries like Lenis).
 *
 * The 3D stage fills the whole pinned viewport and the camera is framed with
 * margin, so the model is never clipped by a container at any scroll pos.
 */

// Timeline windows (0–10). Scene phases: turn 0.8→2.8, explode 3→5, reassemble 8.6→10.
const CARD_WINDOWS = [
  { in: 3.2, out: 4.9 },
  { in: 5.15, out: 6.85 },
  { in: 7.1, out: 8.55 },
];

/**
 * Corner layout (desktop). The monitor sits at viewport center, so every
 * connector is a right-angle elbow: a vertical run on the center axis, then
 * a horizontal run to the card — never a diagonal.
 * Elbows: top cards at y=21%, bottom card at y=76%; center axis x=50%.
 */
const CARD_LAYOUT = [
  {
    // top-left
    card: "left-[4%] top-[7%]",
    first: "v" as const,
    v: "left-1/2 top-[21%] h-[26%]",
    vOrigin: "50% 100%", // draws upward from the monitor
    h: "left-[26%] top-[21%] w-[24%]",
    hOrigin: "100% 50%", // draws leftward from the center axis
    // Dot where the line leaves the monitor; arrowhead where it meets the card
    dot: "left-1/2 top-[47%]",
    arrow: "left-[calc(26%+1px)] top-[21%]",
    arrowDir: "left" as const,
    fromX: 190,
    fromY: 170,
  },
  {
    // top-right
    card: "right-[4%] top-[7%]",
    first: "v" as const,
    v: "left-1/2 top-[21%] h-[26%]",
    vOrigin: "50% 100%",
    h: "right-[26%] top-[21%] w-[24%]",
    hOrigin: "0% 50%", // draws rightward from the center axis
    dot: "left-1/2 top-[47%]",
    arrow: "right-[calc(26%+1px)] top-[21%]",
    arrowDir: "right" as const,
    fromX: -190,
    fromY: 170,
  },
  {
    // bottom-left — routed off the MONITOR's left edge (screen height, 40%),
    // then a SHORT drop to the card. The card is anchored by its TOP edge
    // (not bottom) so the arrow meets it exactly on every viewport height.
    card: "left-[4%] top-[58%]",
    first: "h" as const, // horizontal leaves the monitor first, then drops
    v: "left-[16%] top-[40%] h-[16%]",
    vOrigin: "50% 0%", // draws downward from the elbow
    h: "left-[16%] top-[40%] w-[34%]",
    hOrigin: "100% 50%", // draws leftward out of the monitor
    dot: "left-1/2 top-[40%]",
    arrow: "left-[16%] top-[calc(56%+1px)]",
    arrowDir: "down" as const,
    fromX: 190,
    fromY: -170,
  },
];

/** Skill chips hug the model (the corners now belong to the project cards) */
const CHIP_POS = [
  "left-[21%] top-[34%]",
  "right-[21%] top-[30%]",
  "left-[23%] bottom-[32%]",
  "right-[23%] bottom-[28%]",
];

/** Connector styling — strong red + 3px weight so the tether clearly reads.
 *  (Literal class strings only: Tailwind can't compile interpolated names.) */
const LINE_CLASS =
  "absolute bg-[#d92d20] shadow-[0_0_0_1px_rgba(217,45,32,0.15)] will-change-transform";
/** CSS border-triangle arrowheads, centered on the 3px line */
const ARROW_BASE = "absolute h-0 w-0 will-change-transform";
const ARROW_DIR = {
  left: "-mt-[5px] border-y-[6px] border-y-transparent border-r-[10px] border-r-[#d92d20]",
  right: "-mt-[5px] border-y-[6px] border-y-transparent border-l-[10px] border-l-[#d92d20]",
  down: "-ml-[7px] border-x-[6px] border-x-transparent border-t-[10px] border-t-[#d92d20]",
};

export default function HeroDissect({
  reducedMotion,
  isMobile,
  isCompact,
}: {
  reducedMotion: boolean;
  /** Perf tier (phones): shorter pin, lighter 3D */
  isMobile: boolean;
  /** Layout tier (tablets + phones + touch): centered cards, no connectors */
  isCompact: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => resetScrollStore, []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>(".hd-card");
      const vLines = gsap.utils.toArray<HTMLElement>(".hd-linkv");
      const hLines = gsap.utils.toArray<HTMLElement>(".hd-linkh");
      const linkDots = gsap.utils.toArray<HTMLElement>(".hd-linkdot");
      const linkArrows = gsap.utils.toArray<HTMLElement>(".hd-linkarrow");
      const chips = gsap.utils.toArray<HTMLElement>(".hd-chip");

      const pinEnd = isMobile ? 3000 : isCompact ? 3400 : 4400;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${pinEnd}`,
          pin: true,
          // 1:1 with the scroll position. Lenis already eases the scroll
          // itself, so any scrub delay here made the workstation trail the
          // page and visibly "catch up" (grow/shrink) after every pause.
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollStore.progress = self.progress;
          },
        },
      });

      // Pad the timeline to a 0–10 scale so windows map 1:1 to scene phases
      tl.to({}, { duration: 10 }, 0);

      // —— FOCUS SHIFT: copy hides, workstation becomes sole focus ——
      // fromTo everywhere: the recorded start state IS the rest layout,
      // so scrolling back to the very top can never snap.
      tl.fromTo(
        ".hd-copy",
        { y: 0, autoAlpha: 1 },
        { y: -90, autoAlpha: 0, duration: 1.3, ease: "power2.in" },
        0.15,
      );
      // Compact/phone: stage already sits in a dedicated bottom slot — only
      // scale up. Don't shove it with y/vh (that was pushing it off-screen).
      tl.fromTo(
        ".hd-stage",
        isCompact ? { y: 0, scale: 0.92 } : { xPercent: 20, scale: 0.9 },
        isCompact
          ? { y: 0, scale: 1.06, duration: 1.7 }
          : { xPercent: 0, scale: 1.05, duration: 1.7 },
        0.2,
      );
      tl.to(".hd-aurora", { autoAlpha: 0.22, duration: 1.6 }, 0.4);

      // —— Subtle skill chips on the exploded parts ——
      chips.forEach((chip, i) => {
        tl.fromTo(
          chip,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 0.8, y: 0, duration: 0.5 },
          2.7 + i * 0.12,
        ).to(chip, { autoAlpha: 0, y: -8, duration: 0.4 }, 8.5);
      });

      // —— EMIT: projects fly from the monitor to the corners ——
      cards.forEach((card, i) => {
        const w = CARD_WINDOWS[i];
        const layout = CARD_LAYOUT[i];
        if (!w || !layout) return;

        // Connector draws first: vertical run off the monitor, then the
        // horizontal run to the card slot (large screens only — lines are
        // hidden below lg via CSS, so skip the tweens too)
        if (!isCompact && vLines[i] && hLines[i]) {
          // `first` says which segment leaves the monitor (draws at w.in);
          // the other segment continues from the elbow 0.22 later
          const vAt = layout.first === "v" ? w.in : w.in + 0.22;
          const hAt = layout.first === "h" ? w.in : w.in + 0.22;

          tl.fromTo(
            linkDots[i],
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.15 },
            w.in,
          )
            .fromTo(
              vLines[i],
              { scaleY: 0, autoAlpha: 0, transformOrigin: layout.vOrigin },
              { scaleY: 1, autoAlpha: 1, duration: 0.3, ease: "power1.inOut" },
              vAt,
            )
            .fromTo(
              hLines[i],
              { scaleX: 0, autoAlpha: 0, transformOrigin: layout.hOrigin },
              { scaleX: 1, autoAlpha: 1, duration: 0.3, ease: "power1.inOut" },
              hAt,
            )
            // Arrowhead pops as the line reaches the card
            .fromTo(
              linkArrows[i],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.15 },
              w.in + 0.48,
            )
            .to(
              [vLines[i], hLines[i], linkDots[i], linkArrows[i]],
              { autoAlpha: 0, duration: 0.3 },
              w.out,
            );
        }

        tl.fromTo(
          card,
          {
            // GSAP owns the transform, so compact centering (xPercent) lives
            // here rather than in a CSS translate class it would overwrite
            xPercent: isCompact ? -50 : 0,
            x: isCompact ? 0 : layout.fromX,
            y: isCompact ? 60 : layout.fromY,
            scale: 0.55,
            autoAlpha: 0,
          },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          w.in + 0.15,
        ).to(
          card,
          { autoAlpha: 0, scale: 0.94, duration: 0.45, ease: "power2.in" },
          w.out,
        );
      });
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile, isCompact] },
  );

  // —— REDUCED MOTION: static hero + assembled workstation + projects listed ——
  if (reducedMotion) {
    return (
      <section className="relative px-6 pb-20 pt-24 sm:px-10 sm:pt-28 lg:px-16">
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

  // Compact/phone: copy on top + dedicated 3D stage below (explicit height
  // so the canvas always has a real size — absolute full-bleed was leaving
  // phones with a zero/hidden WebGL view behind the hero text).
  // Desktop: full-bleed absolute stage beside the copy.
  return (
    <section ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className={`relative overflow-hidden ${
          isCompact
            ? "flex min-h-[100svh] flex-col"
            : "min-h-[100svh]"
        }`}
      >
        <div className="hd-aurora pointer-events-none absolute inset-[-8%] -z-10 opacity-40 will-change-transform sm:opacity-50">
          <AuroraCanvas reducedMotion={reducedMotion} isMobile={isMobile} />
        </div>

        {/* L-connectors — desktop only, below the canvas */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
          {CARD_LAYOUT.map((layout, i) => (
            <div key={i}>
              <span
                className={`hd-linkdot absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d92d20] shadow-[0_0_0_3px_rgba(217,45,32,0.2)] ${layout.dot}`}
              />
              <span className={`hd-linkv ${LINE_CLASS} w-[3px] -ml-px ${layout.v}`} />
              <span className={`hd-linkh ${LINE_CLASS} h-[3px] ${layout.h}`} />
              <span
                className={`hd-linkarrow ${ARROW_BASE} ${ARROW_DIR[layout.arrowDir]} ${layout.arrow}`}
              />
            </div>
          ))}
        </div>

        {/* Hero copy */}
        <div
          className={`hd-copy relative z-10 will-change-transform ${
            isCompact
              ? "flex shrink-0 flex-col justify-end px-6 pb-4 pt-20 sm:px-10"
              : "flex min-h-[100svh] flex-col justify-center px-6 pb-20 pt-24 sm:px-10 sm:pt-28 lg:px-16"
          }`}
        >
          <div className="mx-auto w-full max-w-6xl">
            <HeroCopy reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* 3D stage — dedicated height on compact so WebGL always paints */}
        <div
          className={`hd-stage will-change-transform ${
            isCompact
              ? "relative z-[5] mx-auto h-[min(52svh,420px)] w-full max-w-lg shrink-0 px-2"
              : "absolute inset-0 z-[5]"
          }`}
        >
          <Workstation3D
            staticScene={false}
            isMobile={isMobile || isCompact}
            tilt={!isCompact}
          />
        </div>

        {/* Subtle skill chips — large screens only */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
          {capabilities.map((cap, i) => (
            <span
              key={cap.id}
              className={`hd-chip absolute rounded-full border border-[var(--sc-line)] bg-white/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--sc-ink-soft)] will-change-transform ${CHIP_POS[i]}`}
            >
              {cap.title}
            </span>
          ))}
        </div>

        {/* Project cards */}
        <div aria-live="polite" className="pointer-events-none absolute inset-0 z-20">
          {selectedWork.map((item, i) => (
            <div
              key={item.id}
              className={`hd-card absolute w-[min(88vw,21rem)] will-change-transform ${
                isCompact ? "left-1/2 top-[8%]" : CARD_LAYOUT[i]?.card ?? ""
              }`}
            >
              <div className="rounded-2xl border border-[var(--sc-line)] bg-white/95 p-5 shadow-[0_24px_60px_rgba(20,20,20,0.16)]">
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
      </div>
    </section>
  );
}

function HeroCopy({ reducedMotion }: { reducedMotion: boolean }) {
  // Reveals wait for the preloader veil to clear (~0.9s); reduced motion
  // renders statically so the offset is irrelevant there
  const base = reducedMotion ? 0 : 0.95;

  return (
    <div className="max-w-xl">
      <div data-magnetic="12" className="inline-block will-change-transform">
        <LineReveal
          as="p"
          lines={[BRAND.name]}
          reducedMotion={reducedMotion}
          playOnMount
          className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)] sm:text-base"
          delay={base + 0.05}
        />
      </div>

      <div data-magnetic="20" className="mt-6 will-change-transform">
        <LineReveal
          as="h1"
          lines={["I build, debug,", "and decide."]}
          reducedMotion={reducedMotion}
          playOnMount
          className="sc-display max-w-xl text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] text-[var(--sc-ink)]"
          delay={base + 0.18}
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
          delay={base + 0.45}
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
