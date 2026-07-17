"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getPointerField } from "../_lib/usePointerField";

type Blob = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
};

/**
 * Single-canvas Stripe-style aurora — continuous soft blobs, GPU-friendly.
 * One RAF via gsap.ticker; static wash when reduced motion.
 */
export default function AuroraCanvas({
  reducedMotion,
  isMobile,
}: {
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const colors = [
      "rgba(44, 74, 110, 0.38)",
      "rgba(180, 150, 120, 0.32)",
      "rgba(90, 120, 160, 0.28)",
      "rgba(210, 180, 150, 0.22)",
    ];

    const blobCount = isMobile ? 3 : 4;
    const blobs: Blob[] = Array.from({ length: blobCount }, (_, i) => ({
      x: 0.2 + (i % 3) * 0.28,
      y: 0.25 + (i % 2) * 0.35,
      r: 0.22 + (i % 3) * 0.06,
      vx: (0.00012 + i * 0.00003) * (i % 2 === 0 ? 1 : -1),
      vy: (0.0001 + i * 0.00002) * (i % 2 === 0 ? -1 : 1),
      color: colors[i % colors.length],
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f7f6f3";
      ctx.fillRect(0, 0, w, h);
      for (const b of blobs) {
        const gx = b.x * w;
        const gy = b.y * h;
        const gr = b.r * Math.min(w, h) * 1.35;
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, b.color);
        g.addColorStop(1, "rgba(247,246,243,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy, gr, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();

    if (reducedMotion) {
      drawStatic();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    const midColors = [
      "rgba(44, 74, 110, 0.12)",
      "rgba(180, 150, 120, 0.1)",
      "rgba(90, 120, 160, 0.1)",
      "rgba(210, 180, 150, 0.08)",
    ];

    let t = 0;
    const tick = (_time: number, delta: number) => {
      // gsap.ticker delta is seconds
      t += delta;
      const ptr = getPointerField();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#f7f6f3";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        b.x += b.vx + Math.sin(t * 0.35 + i) * 0.00015;
        b.y += b.vy + Math.cos(t * 0.28 + i * 1.3) * 0.00012;
        if (b.x < -0.1) b.x = 1.1;
        if (b.x > 1.1) b.x = -0.1;
        if (b.y < -0.1) b.y = 1.1;
        if (b.y > 1.1) b.y = -0.1;

        const px = (b.x + ptr.nx * 0.04) * w;
        const py = (b.y + ptr.ny * 0.04) * h;
        const pulse = 1 + Math.sin(t * 0.6 + i) * 0.06;
        const gr = b.r * Math.min(w, h) * 1.4 * pulse;

        const g = ctx.createRadialGradient(px, py, 0, px, py, gr);
        g.addColorStop(0, b.color);
        g.addColorStop(0.55, midColors[i % midColors.length]);
        g.addColorStop(1, "rgba(247,246,243,0)");
        ctx.globalCompositeOperation = i === 0 ? "source-over" : "multiply";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, gr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    gsap.ticker.add(tick);
    window.addEventListener("resize", resize);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
