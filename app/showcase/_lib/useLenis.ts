"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis ↔ GSAP ScrollTrigger wiring.
 * Tuned for buttery (not floaty) Superlist-style feel.
 */
export function useLenis(enabled: boolean = true): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!enabled) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 0.92,
      smoothWheel: true,
      touchMultiplier: 1.1,
      // Slightly snappier than pure expo — premium weight without lag
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [enabled]);
}
