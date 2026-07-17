"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LineRevealProps = {
  /** Real text lines — kept in the DOM for SEO + a11y; revealed via mask */
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  reducedMotion?: boolean;
  /** Play on mount (hero) instead of scroll enter */
  playOnMount?: boolean;
  stagger?: number;
  delay?: number;
};

/**
 * Superlist-style line-mask reveal.
 * Text lives in the DOM inside overflow-hidden masks; we animate the inner
 * span with transform only (yPercent). Never injects copy via JS only.
 */
export default function LineReveal({
  lines,
  as: Tag = "div",
  className = "",
  lineClassName = "",
  reducedMotion = false,
  playOnMount = false,
  stagger = 0.1,
  delay = 0,
}: LineRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  // Polymorphic `as` breaks JSX prop inference under current React types;
  // all tags used here (div/h1/h2/p) share div-compatible props.
  const Root = Tag as "div";

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const inners = root.querySelectorAll<HTMLElement>(".lr-inner");
      if (!inners.length) return;

      if (reducedMotion) {
        gsap.set(inners, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inners, { yPercent: 110, opacity: 1 });

      const tween = {
        yPercent: 0,
        duration: 1.05,
        ease: "power3.out",
        stagger,
        delay,
      };

      if (playOnMount) {
        gsap.to(inners, tween);
        return;
      }

      gsap.to(inners, {
        ...tween,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    {
      dependencies: [reducedMotion, playOnMount, stagger, delay, lines.join("|")],
    },
  );

  return (
    <Root
      ref={rootRef as React.Ref<HTMLDivElement>}
      className={className}
    >
      {lines.map((line, i) => (
        <span
          key={`${i}-${line.slice(0, 24)}`}
          className={`block overflow-hidden ${lineClassName}`}
        >
          <span className="lr-inner block will-change-transform">{line}</span>
        </span>
      ))}
    </Root>
  );
}
