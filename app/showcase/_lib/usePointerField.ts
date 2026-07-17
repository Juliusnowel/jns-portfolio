"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export type PointerField = {
  /** Normalized -0.5…0.5 from viewport center */
  nx: number;
  ny: number;
  x: number;
  y: number;
};

const field: PointerField = { nx: 0, ny: 0, x: 0, y: 0 };

/** Shared pointer sample — one listener for aurora + magnetic drift. */
export function getPointerField(): PointerField {
  return field;
}

type MagItem = {
  el: HTMLElement;
  strength: number;
  ox: number;
  oy: number;
};

/**
 * Tracks pointer once and gently pulls `[data-magnetic]` elements toward it.
 * Transform-only; skipped when `enabled` is false (reduced motion / mobile).
 */
export function usePointerField(enabled: boolean): void {
  const itemsRef = useRef<MagItem[]>([]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const collect = () => {
      itemsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      ).map((el) => ({
        el,
        strength: Number(el.dataset.magnetic) || 18,
        ox: 0,
        oy: 0,
      }));
    };

    // Defer until sections mount; refresh occasionally without MutationObserver cost
    const boot = window.setTimeout(collect, 120);
    const refresh = window.setInterval(collect, 2000);

    const onMove = (e: PointerEvent) => {
      field.x = e.clientX;
      field.y = e.clientY;
      field.nx = e.clientX / window.innerWidth - 0.5;
      field.ny = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      for (const item of itemsRef.current) {
        const rect = item.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = field.x - cx;
        const dy = field.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const radius = Math.max(rect.width, rect.height) * 1.6 + 80;
        const falloff = Math.max(0, 1 - dist / radius);
        const targetX = (dx / dist) * item.strength * falloff;
        const targetY = (dy / dist) * item.strength * falloff;
        item.ox += (targetX - item.ox) * 0.12;
        item.oy += (targetY - item.oy) * 0.12;
        item.el.style.transform = `translate3d(${item.ox.toFixed(2)}px, ${item.oy.toFixed(2)}px, 0)`;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.clearTimeout(boot);
      window.clearInterval(refresh);
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(tick);
      for (const item of itemsRef.current) {
        item.el.style.transform = "";
      }
    };
  }, [enabled]);
}
