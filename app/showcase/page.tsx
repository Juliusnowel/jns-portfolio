"use client";

import { useLenis } from "./_lib/useLenis";
import { useMotionPrefs } from "./_lib/useMotionPrefs";
import { usePointerField } from "./_lib/usePointerField";
import Hero from "./_components/Hero";
import KineticMarquee from "./_components/KineticMarquee";
import Capabilities from "./_components/Capabilities";
import WorkstationPin from "./_components/WorkstationPin";
import SelectedWork from "./_components/SelectedWork";
import RangeReveal from "./_components/RangeReveal";
import ClosingCta from "./_components/ClosingCta";
import TechFloaters from "./_components/TechFloaters";

/**
 * Logos stay at z-0 (behind). Content sits above with solid washes
 * so section text stays fully legible.
 */
export default function ShowcasePage() {
  const { prefersReducedMotion, isMobile, ready } = useMotionPrefs();

  useLenis(!prefersReducedMotion);
  usePointerField(ready && !prefersReducedMotion && !isMobile);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden antialiased">
      <TechFloaters reducedMotion={prefersReducedMotion} isMobile={isMobile} />

      <div className="relative z-10">
        <Hero reducedMotion={prefersReducedMotion} isMobile={isMobile} />
        <div className="relative bg-[#f7f6f3]">
          <KineticMarquee reducedMotion={prefersReducedMotion} />
          <Capabilities reducedMotion={prefersReducedMotion} />
        </div>
        <WorkstationPin reducedMotion={prefersReducedMotion} isMobile={isMobile} />
        <div className="relative bg-[#f7f6f3]">
          <SelectedWork reducedMotion={prefersReducedMotion} />
          <RangeReveal reducedMotion={prefersReducedMotion} isMobile={isMobile} />
          <ClosingCta reducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </main>
  );
}
