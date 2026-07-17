"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CODE_LINES = [
  { n: 12, text: "function findBug(items: Item[]) {", kind: "plain" },
  { n: 13, text: "  let lo = 0;", kind: "plain" },
  { n: 14, text: "  let hi = items.length;", kind: "warn" },
  { n: 15, text: "  while (lo <= hi) {", kind: "bug" },
  { n: 16, text: "    const mid = (lo + hi) >> 1;", kind: "plain" },
  { n: 17, text: "    if (ok(items[mid])) return mid;", kind: "plain" },
  { n: 18, text: "    // dissect → fix bound", kind: "comment" },
  { n: 19, text: "  }", kind: "plain" },
  { n: 20, text: "}", kind: "plain" },
] as const;

/**
 * Real monitor form: bezel + stand + screen. Code lives INSIDE the glass.
 * Mount: pieces assemble into a clean monitor.
 * Scroll: tilt → scan/bug → layers separate → reassemble into the monitor.
 */
export default function CodeDissectMonitor({
  reducedMotion,
  isMobile,
  journeyRef,
  journeyEnd = 3200,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
  journeyRef?: React.RefObject<HTMLElement | null>;
  journeyEnd?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const journey = journeyRef?.current ?? root;
      if (!root || !journey) return;

      const amp = isMobile ? 0.55 : 1;

      const shell = root.querySelector(".cdm-shell");
      const bezel = root.querySelector(".cdm-bezel");
      const glass = root.querySelector(".cdm-glass");
      const title = root.querySelector(".cdm-titlebar");
      const side = root.querySelector(".cdm-sidebar");
      const editor = root.querySelector(".cdm-editor");
      const status = root.querySelector(".cdm-status");
      const stand = root.querySelector(".cdm-stand");
      const scan = root.querySelector(".cdm-scan");
      const bug = root.querySelector(".cdm-bug");

      // Assembled resting pose — unmistakably a monitor
      const assembled = () => {
        gsap.set(shell, {
          transformPerspective: 1400,
          transformStyle: "preserve-3d",
          rotateX: 6 * amp,
          rotateY: -14 * amp,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
        });
        gsap.set([bezel, glass, title, side, editor, status, stand], {
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
        });
        gsap.set(bezel, { z: 0 });
        gsap.set(glass, { z: 2 });
        gsap.set(title, { z: 4 });
        gsap.set(side, { z: 3 });
        gsap.set(editor, { z: 3 });
        gsap.set(status, { z: 4 });
        gsap.set(stand, { z: -4 });
        gsap.set(scan, { yPercent: -130, opacity: 0 });
        gsap.set(bug, { scale: 0.6, opacity: 0 });
        gsap.set(".cdm-line-bug", { backgroundColor: "transparent" });
      };

      if (reducedMotion) {
        assembled();
        gsap.set(bug, { scale: 1, opacity: 1 });
        gsap.set(".cdm-line-bug", { backgroundColor: "rgba(220, 80, 80, 0.14)" });
        return;
      }

      // —— INTRO: start messy, assemble into the monitor (one-shot) ——
      gsap.set(shell, {
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        rotateX: 18 * amp,
        rotateY: -32 * amp,
        scale: 0.88,
        opacity: 0.85,
      });
      gsap.set(bezel, { y: -40 * amp, z: 30 * amp, opacity: 0.7 });
      gsap.set(glass, { z: -20 * amp, scale: 0.92, opacity: 0.5 });
      gsap.set(title, { y: -56 * amp, x: 24 * amp, z: 50 * amp, opacity: 0 });
      gsap.set(side, { x: -70 * amp, z: 40 * amp, rotateY: 25 * amp, opacity: 0 });
      gsap.set(editor, { y: 30 * amp, z: -10 * amp, opacity: 0.3 });
      gsap.set(status, { y: 50 * amp, z: 20 * amp, opacity: 0 });
      gsap.set(stand, { y: 40 * amp, opacity: 0, scale: 0.9 });
      gsap.set(scan, { yPercent: -130, opacity: 0 });
      gsap.set(bug, { scale: 0.5, opacity: 0 });
      gsap.set(".cdm-line-bug", { backgroundColor: "transparent" });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(shell, { rotateX: 6 * amp, rotateY: -14 * amp, scale: 1, opacity: 1, duration: 1.35 }, 0)
        .to(bezel, { y: 0, z: 0, opacity: 1, duration: 1.2 }, 0.1)
        .to(glass, { z: 2, scale: 1, opacity: 1, duration: 1.15 }, 0.15)
        .to(stand, { y: 0, opacity: 1, scale: 1, duration: 1.1 }, 0.2)
        .to(title, { y: 0, x: 0, z: 4, opacity: 1, duration: 1.05 }, 0.28)
        .to(side, { x: 0, z: 3, rotateY: 0, opacity: 1, duration: 1.05 }, 0.32)
        .to(editor, { y: 0, z: 3, opacity: 1, duration: 1.05 }, 0.36)
        .to(status, { y: 0, z: 4, opacity: 1, duration: 1.0 }, 0.4);

      // —— SCROLL: tilt → dissect → reassemble into clean monitor ——
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: journey,
          start: "top top",
          end: `+=${journeyEnd}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        shell,
        { rotateX: 2 * amp, rotateY: -4 * amp, duration: 1.8 },
        0,
      )
        .to(scan, { opacity: 0.95, duration: 0.15 }, 0.35)
        .to(scan, { yPercent: 130, duration: 2.2 }, 0.4)
        .to(scan, { opacity: 0, duration: 0.2 }, 2.4)
        .to(".cdm-line-bug", { backgroundColor: "rgba(220, 80, 80, 0.16)", duration: 0.3 }, 1.9)
        .to(bug, { scale: 1, opacity: 1, duration: 0.35 }, 2.0)

        // Explode — layers lift out of the glass (bezel/stand stay as the "monitor")
        .to(
          title,
          { y: -28 * amp, x: 10 * amp, z: 48 * amp, duration: 2 },
          2.6,
        )
        .to(
          side,
          { x: -36 * amp, z: 36 * amp, rotateY: 14 * amp, duration: 2 },
          2.6,
        )
        .to(
          editor,
          { z: 56 * amp, y: 8 * amp, scale: 1.02, duration: 2 },
          2.6,
        )
        .to(
          status,
          { y: 26 * amp, z: 32 * amp, duration: 2 },
          2.6,
        )
        .to(
          shell,
          { rotateX: -4 * amp, rotateY: 10 * amp, duration: 2 },
          2.6,
        )

        // Reassemble into clean monitor form
        .to(
          [title, side, editor, status],
          { x: 0, y: 0, z: 3, rotateY: 0, scale: 1, duration: 2.2 },
          4.8,
        )
        .to(title, { z: 4, duration: 2.2 }, 4.8)
        .to(status, { z: 4, duration: 2.2 }, 4.8)
        .to(
          shell,
          { rotateX: 6 * amp, rotateY: -14 * amp, duration: 2.2 },
          4.8,
        )
        .to(bug, { opacity: 0.85, duration: 1 }, 5.2);
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile, journeyRef, journeyEnd] },
  );

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
      style={{ perspective: "1500px", perspectiveOrigin: "50% 35%" }}
      aria-label="Monitor showing a code editor with a bug being dissected"
    >
      <div
        data-magnetic={isMobile || reducedMotion ? undefined : "10"}
        className="will-change-transform"
      >
        <div
          className="cdm-shell will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Bezel — the physical monitor frame */}
          <div
            className="cdm-bezel relative rounded-[1.15rem] bg-gradient-to-b from-[#3a3b40] to-[#1c1d21] p-[0.65rem] shadow-[0_36px_70px_rgba(20,20,20,0.28)] will-change-transform sm:p-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Thin silver lip */}
            <div className="pointer-events-none absolute inset-[0.35rem] rounded-[0.95rem] ring-1 ring-white/10 sm:inset-[0.45rem]" />

            {/* Screen glass */}
            <div
              className="cdm-glass relative overflow-hidden rounded-[0.65rem] bg-[#14151a] ring-1 ring-black/40 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Editor UI — lives inside the screen */}
              <div className="cdm-titlebar flex items-center gap-2 border-b border-white/10 bg-[#23242a] px-3 py-2 will-change-transform">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
                <span className="ml-2 truncate font-mono text-[0.6rem] text-white/40 sm:text-[0.65rem]">
                  dissect.ts — debugging
                </span>
              </div>

              <div className="relative flex min-h-[210px] sm:min-h-[260px]">
                <aside className="cdm-sidebar hidden w-16 shrink-0 border-r border-white/10 bg-[#1b1c21] p-2 will-change-transform sm:block">
                  <div className="space-y-1.5">
                    {["src", "lib", "app"].map((f) => (
                      <div key={f} className="px-1 font-mono text-[0.58rem] text-white/35">
                        {f}/
                      </div>
                    ))}
                    <div className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.58rem] text-white/75">
                      dissect.ts
                    </div>
                  </div>
                </aside>

                <div className="cdm-editor relative min-w-0 flex-1 bg-[#14151a] will-change-transform">
                  <div className="relative px-3 py-2.5 font-mono text-[0.65rem] leading-5 sm:px-3.5 sm:text-[0.72rem] sm:leading-6">
                    {CODE_LINES.map((line) => (
                      <div
                        key={line.n}
                        className={`relative flex gap-2.5 rounded-sm px-1 ${
                          line.kind === "bug" ? "cdm-line-bug" : ""
                        }`}
                      >
                        <span className="w-4 shrink-0 select-none text-right text-white/22">
                          {line.n}
                        </span>
                        <span
                          className={
                            line.kind === "bug"
                              ? "text-rose-300"
                              : line.kind === "warn"
                                ? "text-amber-200/90"
                                : line.kind === "comment"
                                  ? "text-emerald-300/65"
                                  : "text-white/72"
                          }
                        >
                          {line.text}
                        </span>
                      </div>
                    ))}

                    {!reducedMotion && (
                      <div
                        aria-hidden="true"
                        className="cdm-scan pointer-events-none absolute inset-x-0 top-0 z-20 h-7 will-change-transform"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent, rgba(120,180,255,0.18), transparent)",
                        }}
                      />
                    )}

                    <div className="cdm-bug absolute right-2 top-[4.2rem] z-30 will-change-transform sm:right-3 sm:top-[4.8rem]">
                      <div className="rounded border border-rose-400/35 bg-rose-500/15 px-1.5 py-0.5 font-mono text-[0.55rem] text-rose-200 sm:text-[0.6rem]">
                        bug · off-by-one
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cdm-status flex items-center justify-between border-t border-white/10 bg-[#23242a] px-3 py-1 font-mono text-[0.55rem] text-white/35 will-change-transform sm:text-[0.6rem]">
                <span>Ln 15 · dissecting</span>
                <span className="text-emerald-300/65">1 issue found</span>
              </div>

              {/* Glass reflection */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
              />
            </div>

            {/* Chin / bottom bezel */}
            <div className="mt-2 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Stand */}
          <div
            className="cdm-stand relative mx-auto will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="mx-auto h-8 w-16 bg-gradient-to-b from-[#2e2f34] to-[#1a1b1f] sm:h-10 sm:w-[4.5rem]"
              style={{ clipPath: "polygon(32% 0, 68% 0, 85% 100%, 15% 100%)" }}
            />
            <div className="mx-auto -mt-px h-2.5 w-28 rounded-full bg-gradient-to-b from-[#3a3b40] to-[#222327] shadow-[0_8px_18px_rgba(20,20,20,0.2)] sm:w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}
