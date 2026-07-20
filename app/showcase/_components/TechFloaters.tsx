"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { codeSnippets, techLogos } from "../_lib/techStack";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Path = {
  /** Resting assembled spot (vw/vh) — side gutters only */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Intro scatter offset from rest */
  sx: number;
  sy: number;
  r0: number;
  r1: number;
  r2: number;
};

/**
 * Paths stay in left (~2–16vw) or right (~84–96vw) gutters
 * so central content columns stay clear.
 */
const LOGO_PATHS: Record<string, Path> = {
  js: { x0: 4, y0: 22, x1: 6, y1: 48, x2: 3, y2: 72, sx: -18, sy: -20, r0: -8, r1: 10, r2: -6 },
  ts: { x0: 8, y0: 58, x1: 5, y1: 28, x2: 10, y2: 78, sx: -22, sy: 24, r0: 6, r1: -12, r2: 8 },
  php: { x0: 3, y0: 40, x1: 9, y1: 70, x2: 4, y2: 18, sx: -16, sy: 18, r0: 4, r1: -8, r2: 10 },
  python: { x0: 10, y0: 12, x1: 4, y1: 8, x2: 8, y2: 36, sx: -14, sy: -28, r0: -4, r1: 8, r2: -10 },
  react: { x0: 90, y0: 18, x1: 94, y1: 42, x2: 88, y2: 68, sx: 20, sy: -18, r0: 0, r1: 14, r2: -10 },
  next: { x0: 94, y0: 48, x1: 88, y1: 72, x2: 92, y2: 24, sx: 24, sy: 16, r0: -6, r1: 8, r2: 12 },
  laravel: { x0: 88, y0: 66, x1: 93, y1: 86, x2: 86, y2: 40, sx: 18, sy: 22, r0: 8, r1: -12, r2: 6 },
  wp: { x0: 92, y0: 10, x1: 86, y1: 6, x2: 94, y2: 32, sx: 16, sy: -24, r0: -2, r1: 10, r2: -6 },
  mysql: { x0: 95, y0: 58, x1: 90, y1: 34, x2: 93, y2: 80, sx: 22, sy: 12, r0: 10, r1: -8, r2: 4 },
  tw: { x0: 86, y0: 80, x1: 92, y1: 62, x2: 88, y2: 90, sx: 14, sy: 28, r0: -10, r1: 6, r2: 12 },
  gsap: { x0: 6, y0: 78, x1: 12, y1: 88, x2: 5, y2: 52, sx: -20, sy: 20, r0: 4, r1: -14, r2: 8 },
};

const SNIP_PATHS: Record<string, Path> = {
  "snip-bug": {
    x0: 3, y0: 68, x1: 8, y1: 84, x2: 4, y2: 44,
    sx: -24, sy: 18, r0: -4, r1: 8, r2: -8,
  },
  "snip-plan": {
    x0: 86, y0: 52, x1: 92, y1: 28, x2: 88, y2: 74,
    sx: 22, sy: -14, r0: 5, r1: -10, r2: 6,
  },
};

function KeyboardAccent({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="116" height="36" rx="6" fill="#e8e6e0" stroke="rgba(20,20,20,0.12)" />
      <rect x="10" y="16" width="14" height="10" rx="2" fill="#d4d2cb" />
      <rect x="28" y="16" width="14" height="10" rx="2" fill="#d4d2cb" />
      <rect x="46" y="16" width="14" height="10" rx="2" fill="#d4d2cb" />
      <rect x="64" y="16" width="14" height="10" rx="2" fill="#d4d2cb" />
      <rect x="82" y="16" width="14" height="10" rx="2" fill="#d4d2cb" />
      <rect x="100" y="16" width="10" height="10" rx="2" fill="#d4d2cb" />
      <rect x="22" y="30" width="76" height="8" rx="2" fill="#c9c7c0" />
    </svg>
  );
}

function MouseAccent({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 56" fill="none" aria-hidden="true">
      <rect x="8" y="2" width="24" height="40" rx="12" fill="#e8e6e0" stroke="rgba(20,20,20,0.12)" />
      <line x1="20" y1="8" x2="20" y2="18" stroke="rgba(20,20,20,0.2)" strokeWidth="1.5" />
      <circle cx="20" cy="12" r="2" fill="rgba(20,20,20,0.18)" />
    </svg>
  );
}

function FloaterCard({
  path,
  children,
  className = "",
  kind = "accent",
}: {
  path: Path;
  children: ReactNode;
  className?: string;
  kind?: "logo" | "snip" | "accent";
}) {
  return (
    <div
      data-floater
      data-kind={kind}
      data-x0={path.x0}
      data-y0={path.y0}
      data-x1={path.x1}
      data-y1={path.y1}
      data-x2={path.x2}
      data-y2={path.y2}
      data-sx={path.sx}
      data-sy={path.sy}
      data-r0={path.r0}
      data-r1={path.r1}
      data-r2={path.r2}
      className={`absolute left-0 top-0 will-change-transform ${className}`}
    >
      <div className="tf-orbit will-change-transform">{children}</div>
    </div>
  );
}

const CARD =
  "flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--sc-line)] bg-white/70 shadow-[0_8px_20px_rgba(20,20,20,0.06)] sm:h-11 sm:w-11";

/** Post-scatter resting opacity — soft but clearly visible in the gutters */
const SETTLE = { desktop: 0.52, mobile: 0.38, blur: "blur(1.5px)" };

/**
 * Preloader + backdrop constellation.
 *
 * On first load the logos act as the PRELOADER: they pop in clustered at the
 * viewport center on a solid #f7f6f3 veil (the root is temporarily raised to
 * z-60), then SCATTER outward to their gutter resting spots while the veil
 * fades — load + scatter ≈ 2.5s total. After scattering, the root drops back
 * to z-0 and the logos settle to low opacity with a slight blur, staying
 * behind content. Scroll paths/orbits take over from there.
 */
export default function TechFloaters({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const logos = techLogos.filter((t) => !(isMobile && t.desktopOnly));
  const snips = codeSnippets.filter((s) => !(isMobile && "desktopOnly" in s && s.desktopOnly));

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const nodes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-floater]"));
      if (!nodes.length) return;

      const logoNodes = nodes.filter((n) => n.dataset.kind === "logo");
      const otherNodes = nodes.filter((n) => n.dataset.kind !== "logo");
      const settleOpacity = isMobile ? SETTLE.mobile : SETTLE.desktop;

      if (reducedMotion) {
        // Instant state — no preloader, nothing blocking
        gsap.set(root, { zIndex: 0 });
        gsap.set(".tf-veil", { autoAlpha: 0 });
        nodes.forEach((node) => {
          gsap.set(node, {
            x: `${node.dataset.x0}vw`,
            y: `${node.dataset.y0}vh`,
            rotation: Number(node.dataset.r0) || 0,
            opacity: settleOpacity,
            filter: SETTLE.blur,
          });
        });
        return;
      }

      const amp = isMobile ? 0.6 : 1;

      // —— PRELOADER: logos clustered center, crisp, on the solid veil ——
      const cols = isMobile ? 3 : 4;
      const rows = Math.ceil(logoNodes.length / cols);
      logoNodes.forEach((node, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        gsap.set(node, {
          x: `${50 + (col - (cols - 1) / 2) * (isMobile ? 16 : 7)}vw`,
          y: `${44 + (row - (rows - 1) / 2) * (isMobile ? 9 : 11)}vh`,
          xPercent: -50,
          yPercent: -50,
          rotation: 0,
          scale: 0.4,
          opacity: 0,
        });
      });
      // Snips/accents wait at their resting spots, hidden until after scatter
      otherNodes.forEach((node) => {
        gsap.set(node, {
          x: `${node.dataset.x0}vw`,
          y: `${node.dataset.y0}vh`,
          rotation: Number(node.dataset.r0) || 0,
          opacity: 0,
        });
      });

      // Load-in (~0.9s) → scatter (~1.2s) → settle: ≈ 2.4s total
      gsap.set(".tf-label", { autoAlpha: 0, y: 8 });
      const intro = gsap.timeline();
      intro
        .to(".tf-label", { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.05)
        .to(
          logoNodes,
          { scale: 1, opacity: 1, duration: 0.45, stagger: 0.05, ease: "back.out(1.6)" },
          0.1,
        )
        // SCATTER outward to the gutter resting spots
        .to(
          logoNodes,
          {
            x: (_, el) => `${(el as HTMLElement).dataset.x0}vw`,
            y: (_, el) => `${(el as HTMLElement).dataset.y0}vh`,
            rotation: (_, el) => Number((el as HTMLElement).dataset.r0) || 0,
            duration: 1.2,
            stagger: 0.035,
            ease: "power3.inOut",
          },
          0.95,
        )
        .to(".tf-label", { autoAlpha: 0, duration: 0.3 }, 0.95)
        .to(".tf-veil", { autoAlpha: 0, duration: 0.6, ease: "power1.inOut" }, 1.0)
        // Hand the layer back to the background
        .set(root, { zIndex: 0 }, 1.65)
        // Settle: stay visible but blurred + low opacity behind content
        .to(
          logoNodes,
          { opacity: settleOpacity, filter: SETTLE.blur, duration: 0.7, ease: "power1.inOut" },
          1.7,
        )
        .to(
          otherNodes,
          { opacity: settleOpacity, filter: "blur(1px)", duration: 0.7 },
          1.9,
        );

      // SCROLL paths — explicit fromTo from rest so intro doesn't fight scrub
      const scrollTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      scrollTl.to(root, { autoAlpha: 0.65, duration: 1 }, 0.8);

      nodes.forEach((node, i) => {
        const t0 = 0.04 + (i % 4) * 0.02;
        const x0 = `${node.dataset.x0}vw`;
        const y0 = `${node.dataset.y0}vh`;
        const r0 = Number(node.dataset.r0) || 0;
        scrollTl
          .fromTo(
            node,
            { x: x0, y: y0, rotation: r0 },
            {
              x: `${node.dataset.x1}vw`,
              y: `${node.dataset.y1}vh`,
              rotation: Number(node.dataset.r1) * amp,
              duration: 0.42,
              immediateRender: false,
            },
            t0,
          )
          .to(
            node,
            {
              x: `${node.dataset.x2}vw`,
              y: `${node.dataset.y2}vh`,
              rotation: Number(node.dataset.r2) * amp,
              duration: 0.42,
            },
            t0 + 0.42,
          );

        const orbit = node.querySelector(".tf-orbit");
        if (orbit) {
          gsap.to(orbit, {
            x: (i % 2 === 0 ? 8 : -8) * amp,
            y: (i % 3 === 0 ? -10 : 9) * amp,
            duration: 6 + (i % 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            // Idle orbits start after the preloader scatter settles
            delay: 2.2 + i * 0.2,
          });
        }
      });
    },
    { scope: rootRef, dependencies: [reducedMotion, isMobile, logos.length, snips.length] },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      // Raised above content only while the preloader plays; GSAP drops it
      // back to 0 as the veil clears (reduced motion sets 0 immediately)
      style={{ opacity: 1, zIndex: 60 }}
    >
      {/* Solid light veil — never a black flash */}
      <div className="tf-veil absolute inset-0 bg-[#f7f6f3]" />

      <div className="h-full w-full">
        {logos.map((tech) => {
          const path = LOGO_PATHS[tech.id];
          if (!path) return null;
          const Icon = tech.Icon;
          return (
            <FloaterCard key={tech.id} path={path} kind="logo">
              <div className={CARD}>
                <Icon size={20} color={tech.color} aria-label={tech.label} />
              </div>
            </FloaterCard>
          );
        })}

        {snips.map((snip) => {
          const path = SNIP_PATHS[snip.id];
          if (!path) return null;
          return (
            <FloaterCard key={snip.id} path={path} kind="snip" className="hidden sm:block">
              <div className="w-[8.5rem] rounded-xl border border-[var(--sc-line)] bg-white/65 p-2 shadow-[0_8px_20px_rgba(20,20,20,0.05)]">
                <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-[var(--sc-muted)]">
                  {snip.title}
                </p>
                <div className="mt-1 space-y-0.5 font-mono text-[0.55rem] leading-tight text-[var(--sc-ink-soft)]">
                  {snip.lines.map((line, i) => (
                    <p key={i}>{line.t}</p>
                  ))}
                </div>
              </div>
            </FloaterCard>
          );
        })}

        {!isMobile && !reducedMotion && (
          <>
            <FloaterCard
              path={{
                x0: 5, y0: 88, x1: 10, y1: 92, x2: 3, y2: 84,
                sx: -12, sy: 16, r0: -4, r1: 6, r2: -6,
              }}
            >
              <KeyboardAccent className="h-8 w-auto opacity-70" />
            </FloaterCard>
            <FloaterCard
              path={{
                x0: 93, y0: 36, x1: 96, y1: 20, x2: 91, y2: 54,
                sx: 14, sy: -12, r0: 6, r1: -8, r2: 10,
              }}
            >
              <MouseAccent className="h-10 w-auto opacity-70" />
            </FloaterCard>
          </>
        )}
      </div>

      {/* Preloader caption — fades with the scatter */}
      <div className="absolute inset-x-0 top-[72%] flex justify-center">
        <p className="tf-label font-mono text-[0.65rem] uppercase tracking-[0.26em] text-[var(--sc-muted)] opacity-0">
          Julius Nowel — loading
        </p>
      </div>
    </div>
  );
}
