"use client";

import { useEffect, useState } from "react";

/**
 * Motion / device guardrails for the /showcase experience.
 *
 * SSR-safety: all flags default to `false` on the server (and on the very
 * first client render, so hydration matches). The real values are read inside
 * an effect after mount, then kept live via matchMedia change listeners.
 *
 * Two independent tiers:
 *  - `isMobile`  (PERF tier, <768px) → lighter 3D: fewer keycaps, dpr 1,
 *    shorter pin. Phones only.
 *  - `isCompact` (LAYOUT tier, <1024px OR touch) → compact layouts: centered
 *    project cards instead of corners, no connector lines/chips, no
 *    cursor-reactive effects. Covers tablets and touch laptops.
 *
 * A tablet is therefore `isCompact` but NOT `isMobile`: it gets the compact
 * layout with the full-quality 3D scene.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 767px)";
const COMPACT_QUERY = "(max-width: 1023px), (pointer: coarse)";

export interface MotionPrefs {
  /** User asked the OS to minimize motion. */
  prefersReducedMotion: boolean;
  /** Phone-sized screen — lightest perf budget. */
  isMobile: boolean;
  /** Tablet-or-smaller viewport, or touch device — compact layout. */
  isCompact: boolean;
  /** True once the client has read the real media-query values post-mount. */
  ready: boolean;
}

export function useMotionPrefs(): MotionPrefs {
  const [prefs, setPrefs] = useState<MotionPrefs>({
    prefersReducedMotion: false,
    isMobile: false,
    isCompact: false,
    ready: false,
  });

  useEffect(() => {
    // Guard: matchMedia is browser-only.
    if (typeof window === "undefined" || !window.matchMedia) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobile = window.matchMedia(MOBILE_QUERY);
    const compact = window.matchMedia(COMPACT_QUERY);

    const sync = () => {
      setPrefs({
        prefersReducedMotion: reducedMotion.matches,
        isMobile: mobile.matches,
        isCompact: compact.matches || mobile.matches,
        ready: true,
      });
    };

    sync(); // read the real values now that we're mounted
    reducedMotion.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    compact.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
    };
  }, []);

  return prefs;
}
