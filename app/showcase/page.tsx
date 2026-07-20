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

  useLenis(!prefersReducedMotion);
  // Magnetic hover is pointer-only — skip on touch/compact devices
  usePointerField(ready && !prefersReducedMotion && !isCompact);

  return (
    // The solid page bg lives on <main> — BELOW the fixed logo layer.
    // Sections stay transparent so the constellation shows through in the
    // gutters (an opaque bg on any section would cover the z-0 logos).
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#f7f6f3] antialiased">
      <TechFloaters reducedMotion={prefersReducedMotion} isMobile={isMobile} />

      <div className="relative z-10">
        <HeroDissect
          reducedMotion={prefersReducedMotion}
          isMobile={isMobile}
          isCompact={isCompact}
        />
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
