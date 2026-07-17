"use client";

import LineReveal from "./LineReveal";
import { capabilities } from "../_lib/work";

export default function Capabilities({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
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

        <ul className="mt-16 space-y-0 border-t border-[var(--sc-line)]">
          {capabilities.map((cap, i) => (
            <li
              key={cap.id}
              className="grid gap-3 border-b border-[var(--sc-line)] py-8 sm:grid-cols-[5rem_1fr] sm:gap-10 sm:py-10"
            >
              <LineReveal
                as="span"
                lines={[`0${i + 1}`]}
                reducedMotion={reducedMotion}
                className="font-mono text-sm text-[var(--sc-muted)]"
                delay={i * 0.04}
              />
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
