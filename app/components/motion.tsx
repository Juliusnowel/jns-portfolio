"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* Scroll-motion primitives — no library.
   - Reveal: SCROLL-LINKED parallax. Each element's opacity + offset is a pure
     function of its position in the viewport, so scrolling down eases it into
     place and scrolling up sends it back. One shared scroll listener drives
     every registered element on a single rAF.
   - CountUp / ScrambleText: one-shot on first view (numbers counting back down
     on scroll-up would read as a glitch, so these do NOT reverse).
   Everything degrades to the final, static state under prefers-reduced-motion.
   Note: state is seeded with lazy initializers and only updated from async
   callbacks (rAF / observers), never synchronously inside an effect. */

function readReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState<boolean>(readReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

// ---- Shared scroll-linked engine -------------------------------------------

type Dir = "up" | "left" | "right" | "none";
type Item = { el: HTMLElement; dir: Dir; dist: number };

const registry = new Set<Item>();
let rafId = 0;
let scheduled = false;
let listeners = 0;

// Fully revealed once the element's top reaches ~45% down the viewport; hidden
// when it sits at the bottom edge. Above that band it clamps to 1 (stays shown)
// and only retreats when scrolled back down through the band.
const SPAN = 0.55;

function apply() {
  scheduled = false;
  const vh = window.innerHeight || 1;
  registry.forEach((it) => {
    const rect = it.el.getBoundingClientRect();
    let p = (vh - rect.top) / (vh * SPAN);
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    const inv = 1 - p;
    let tx = 0;
    let ty = 0;
    if (it.dir === "up") ty = inv * it.dist;
    else if (it.dir === "left") tx = -inv * it.dist;
    else if (it.dir === "right") tx = inv * it.dist;
    it.el.style.opacity = String(p);
    it.el.style.transform =
      tx !== 0 || ty !== 0
        ? `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`
        : "none";
  });
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  rafId = requestAnimationFrame(apply);
}

function addListener() {
  if (listeners === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  listeners += 1;
}

function removeListener() {
  listeners -= 1;
  if (listeners <= 0) {
    listeners = 0;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    cancelAnimationFrame(rafId);
  }
}

/** Scroll-linked fade + slide. `direction` picks where it eases in from. */
export function Reveal({
  children,
  className = "",
  direction = "up",
  distance,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Dir;
  distance?: number;
  /** Accepted for call-site compatibility; stagger now comes from scroll position. */
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const Comp = Tag as "div";

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const dist = distance ?? (direction === "up" ? 30 : 48);
    // A light easing smooths the per-frame steps without detaching from scroll.
    el.style.transition = "transform 120ms ease-out, opacity 120ms ease-out";
    el.style.willChange = "transform, opacity";
    const item: Item = { el, dir: direction, dist };
    registry.add(item);
    addListener();
    schedule();
    return () => {
      registry.delete(item);
      removeListener();
      el.style.transition = "";
      el.style.transform = "";
      el.style.opacity = "";
      el.style.willChange = "";
    };
  }, [reduce, direction, distance]);

  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}

// ---- One-shot in-view (numbers / scramble) ---------------------------------

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Seed true only where there is no observer (very old browsers / SSR paths);
  // otherwise the observer flips it from its own async callback.
  const [inView, setInView] = useState<boolean>(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/** Counts up from 0 when scrolled into view (keeps any non-digit suffix). */
export function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const duration = 1300;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className={className}>
      {reduce ? target : display}
      {suffix}
    </span>
  );
}

/** Scrambles through random glyphs and resolves to the real text on view. */
export function ScrambleText({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*";
    const totalFrames = 26;
    let frame = 0;
    let raf = 0;
    const rand = () => glyphs[Math.floor(Math.random() * glyphs.length)];
    const scramble = (revealed: number) =>
      value
        .split("")
        .map((ch, i) => (ch === " " ? " " : i < revealed ? value[i] : rand()))
        .join("");
    const tick = () => {
      if (frame >= totalFrames) {
        setDisplay(value);
        return;
      }
      setDisplay(scramble(Math.floor((frame / totalFrames) * value.length)));
      frame += 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
