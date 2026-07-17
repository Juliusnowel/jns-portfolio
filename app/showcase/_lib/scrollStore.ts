/**
 * Mutable bridge between GSAP ScrollTrigger (DOM side) and the R3F scene.
 *
 * ScrollTrigger's onUpdate WRITES `progress` (0→1 across the pinned journey);
 * the workstation's useFrame READS it and lerps toward it every frame.
 * No React state → no re-renders per scroll tick, and it works across the
 * next/dynamic `ssr: false` boundary.
 */
export const scrollStore = {
  /** 0 → 1 progress through the pinned workstation journey */
  progress: 0,
};

export function resetScrollStore(): void {
  scrollStore.progress = 0;
}
