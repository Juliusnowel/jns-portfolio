"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { marqueeItems } from "../_lib/work";

gsap.registerPlugin(useGSAP);

/**
 * Kinetic skills/tech band — single track, transform translateX loop.
 */
export default function KineticMarquee({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const track = rootRef.current?.querySelector(".mq-track");
      if (!track) return;

      const half = (track as HTMLElement).scrollWidth / 2;
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -half,
          duration: 28,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  const sequence = [...marqueeItems, ...marqueeItems];

  return (
    <section
      ref={rootRef}
      aria-label="Skills and technologies"
      className="relative bg-[var(--sc-ink)] py-6"
    >
      <div className="overflow-hidden">
        <div className="mq-track flex w-max will-change-transform">
          {sequence.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-5 inline-flex items-center gap-5 text-sm uppercase tracking-[0.22em] text-[#e6f1f6]/70 sm:mx-8 sm:text-base"
            >
              <span className="sc-display normal-case tracking-normal text-[clamp(1.35rem,2.5vw,1.85rem)] text-[#e6f1f6]">
                {item}
              </span>
              <span aria-hidden="true" className="text-[var(--sc-accent)]">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
