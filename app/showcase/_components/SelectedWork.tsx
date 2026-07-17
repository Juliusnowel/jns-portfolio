"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LineReveal from "./LineReveal";
import { selectedWork, type WorkItem } from "../_lib/work";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function WorkVisual({ item }: { item: WorkItem }) {
  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.image}
        alt={`${item.title} screenshot`}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#ebe8e1] via-[#f7f6f3] to-[#e4eaf2] px-6 text-center sm:min-h-[280px]">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[var(--sc-muted)]">
        Placeholder — swap screenshot
      </p>
      <p className="sc-display text-2xl text-[var(--sc-ink)] sm:text-3xl">{item.title}</p>
      <p className="max-w-xs text-sm text-[var(--sc-ink-soft)]">{item.domain}</p>
    </div>
  );
}

function WorkBlock({
  item,
  index,
  reducedMotion,
}: {
  item: WorkItem;
  index: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const visual = ref.current?.querySelector(".work-visual");
      if (!visual) return;

      const frame = ref.current?.querySelector(".work-frame");

      gsap.fromTo(
        visual,
        { yPercent: 14, scale: 1.08 },
        {
          yPercent: -14,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        },
      );

      if (frame) {
        gsap.fromTo(
          frame,
          { rotateZ: index % 2 === 0 ? -1.5 : 1.5, y: 40 },
          {
            rotateZ: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.8,
            },
          },
        );
      }
    },
    { scope: ref, dependencies: [reducedMotion, index] },
  );

  return (
    <article
      ref={ref}
      className={`grid items-center gap-8 py-16 sm:gap-12 sm:py-24 lg:grid-cols-2 lg:gap-16 ${
        index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div data-magnetic="16" className="will-change-transform">
        <div className="work-frame overflow-hidden rounded-2xl border border-[var(--sc-line)] bg-[var(--sc-bg-elevated)] will-change-transform">
          <div className="work-visual will-change-transform">
            <WorkVisual item={item} />
          </div>
        </div>
      </div>

      <div>
        <LineReveal
          as="p"
          lines={[item.domain]}
          reducedMotion={reducedMotion}
          className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--sc-muted)]"
        />
        <LineReveal
          as="h3"
          lines={[item.title]}
          reducedMotion={reducedMotion}
          className="sc-display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-[var(--sc-ink)]"
        />
        {item.caseStudy ? (
          <p className="mt-3 inline-block rounded-md bg-[var(--sc-accent-soft)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--sc-accent)]">
            Case study · internal
          </p>
        ) : null}
        <LineReveal
          as="p"
          lines={[item.summary]}
          reducedMotion={reducedMotion}
          className="mt-5 max-w-md text-base leading-relaxed text-[var(--sc-ink-soft)] sm:text-lg"
        />
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-[var(--sc-line)] px-2.5 py-1 text-xs text-[var(--sc-ink-soft)]"
            >
              {tech}
            </li>
          ))}
        </ul>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-medium text-[var(--sc-accent)] underline-offset-4 hover:underline"
          >
            View project →
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function SelectedWork({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="relative px-6 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl border-t border-[var(--sc-line)] pt-28 sm:pt-36">
        <LineReveal
          as="p"
          lines={["Selected work"]}
          reducedMotion={reducedMotion}
          className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--sc-muted)]"
        />
        <LineReveal
          as="h2"
          lines={["A few pieces that show the range."]}
          reducedMotion={reducedMotion}
          className="sc-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-[var(--sc-ink)]"
        />

        <div className="mt-6">
          {selectedWork.map((item, index) => (
            <WorkBlock
              key={item.id}
              item={item}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
