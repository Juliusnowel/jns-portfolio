"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineReveal from "./LineReveal";
import { rangeTiles } from "../_lib/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Zoom-out range moment — start tight on one tile, open to the full grid.
 */
export default function RangeReveal({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const startScale = isMobile ? 1.45 : 1.85;

      gsap.set(".range-tile", { autoAlpha: 0, scale: 0.85, y: 24 });
      gsap.set(".range-tile-focus", { autoAlpha: 1, scale: 1.12, y: 0 });
      gsap.set(".range-stage-inner", { scale: startScale, rotate: isMobile ? -2 : -4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 85%",
          end: isMobile ? "+=700" : "+=1100",
          scrub: 0.85,
        },
      });

      tl.to(".range-stage-inner", {
        scale: 1,
        rotate: 0,
        duration: 1.5,
        ease: "power2.out",
      }).to(
        ".range-tile",
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: { each: 0.1, from: "center" },
          ease: "power3.out",
        },
        0.25,
      );
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile] },
  );

  return (
    <section ref={rootRef} className="relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <LineReveal
          as="p"
          lines={["Range"]}
          reducedMotion={reducedMotion}
          className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)]"
        />
        <LineReveal
          as="h2"
          lines={["One focus. Broader practice."]}
          reducedMotion={reducedMotion}
          className="sc-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] text-[var(--sc-ink)]"
        />

        <div
          ref={stageRef}
          className="mt-14 overflow-hidden rounded-3xl border border-[var(--sc-line)] bg-[#f3f1ec] px-4 py-10 sm:px-8 sm:py-14"
        >
          <div className="range-stage-inner origin-center will-change-transform">
            <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {rangeTiles.map((tile, i) => (
                <li
                  key={tile.id}
                  className={`range-tile will-change-transform ${
                    i === 0 ? "range-tile-focus" : ""
                  }`}
                >
                  <div
                    data-magnetic={reducedMotion || isMobile ? undefined : "10"}
                    className="flex min-h-[88px] items-center justify-center rounded-2xl border border-[var(--sc-line)] bg-[var(--sc-bg-elevated)] px-4 text-center will-change-transform sm:min-h-[110px]"
                  >
                    <span className="sc-display text-lg text-[var(--sc-ink)] sm:text-xl">
                      {tile.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
