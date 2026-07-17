"use client";

import { useEffect, useState } from "react";

/**
 * Motion / device guardrails for the /showcase experience.
 *
 * SSR-safety: both flags default to `false` on the server (and on the very
 * first client render, so hydration matches). The real values are read inside
 * an effect after mount, then kept live via matchMedia change listeners.
 *
 * Consumers use these to:
 *  - `prefersReducedMotion` → skip/attenuate GSAP animations and Lenis smooth
 *    scroll, falling back to the browser's native scroll.
 *  - `isMobile` → render a lighter (or no) 3D scene and cheaper effects.
 *
 * Phase 1+ can read the same hook so every scene branches consistently.
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
// Coarse pointer OR narrow viewport → treat as "mobile" for perf budgeting.
const MOBILE_QUERY = "(max-width: 768px), (pointer: coarse)";

export interface MotionPrefs {
  /** User asked the OS to minimize motion. */
  prefersReducedMotion: boolean;
  /** Small screen or touch device — render a lighter experience. */
  isMobile: boolean;
  /** True once the client has read the real media-query values post-mount. */
  ready: boolean;
}

export function useMotionPrefs(): MotionPrefs {
  const [prefs, setPrefs] = useState<MotionPrefs>({
    prefersReducedMotion: false,
    isMobile: false,
    ready: false,
  });

  useEffect(() => {
    // Guard: matchMedia is browser-only.
    if (typeof window === "undefined" || !window.matchMedia) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobile = window.matchMedia(MOBILE_QUERY);

    const sync = () => {
      setPrefs({
        prefersReducedMotion: reducedMotion.matches,
        isMobile: mobile.matches,
        ready: true,
      });
    };

    sync(); // read the real values now that we're mounted
    reducedMotion.addEventListener("change", sync);
    mobile.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);

  return prefs;
}
