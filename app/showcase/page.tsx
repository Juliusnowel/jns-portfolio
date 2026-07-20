"use client";

import { useLenis } from "./_lib/useLenis";
import { useMotionPrefs } from "./_lib/useMotionPrefs";
import { usePointerField } from "./_lib/usePointerField";
import HeroDissect from "./_components/HeroDissect";
import KineticMarquee from "./_components/KineticMarquee";
import Capabilities from "./_components/Capabilities";
import RangeReveal from "./_components/RangeReveal";
import ClosingCta from "./_components/ClosingCta";
import TechFloaters from "./_components/TechFloaters";

/**
 * Logos stay at z-0 (behind). Content sits above with solid washes
 * so section text stays fully legible.
 */
export default function ShowcasePage() {
  const { prefersReducedMotion, isMobile, isCompact, ready } = useMotionPrefs();

  // Lenis + pinned ScrollTrigger fights native touch momentum on phones and
  // feels "locked". Use native scroll on compact/touch; Lenis on desktop only.
  useLenis(ready && !prefersReducedMotion && !isCompact);
  // Magnetic hover is pointer-only — skip on touch/compact devices
  usePointerField(ready && !prefersReducedMotion && !isCompact);

  return (
    // The solid page bg lives on <main> — BELOW the fixed logo layer.
    // Sections stay transparent so the constellation shows through in the
    // gutters (an opaque bg on any section would cover the z-0 logos).
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#f7f6f3] antialiased">
      <TechFloaters reducedMotion={prefersReducedMotion} isMobile={isMobile} />

      <div className="relative z-10">
        {/* Wait for matchMedia so phones don't mount the desktop hero layout
            first (that left the 3D stage invisible / zero-sized on iOS). */}
        {ready ? (
          <HeroDissect
            reducedMotion={prefersReducedMotion}
            isMobile={isMobile}
            isCompact={isCompact}
          />
        ) : (
          <div className="min-h-[100svh] bg-[#f7f6f3]" aria-hidden="true" />
        )}
        <div className="relative">
          <KineticMarquee reducedMotion={prefersReducedMotion} />
          <Capabilities reducedMotion={prefersReducedMotion} />
          <RangeReveal reducedMotion={prefersReducedMotion} isMobile={isMobile} />
          <ClosingCta reducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </main>
  );
}
