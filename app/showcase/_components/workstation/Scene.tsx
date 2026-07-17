"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "../../_lib/scrollStore";

/*
 * Stylized low-poly dev workstation (monitor + keyboard) built from primitives.
 * NO external model. Scroll progress arrives via scrollStore (see _lib/scrollStore).
 *
 * Journey mapping (t = smoothed scrollStore.progress):
 *   0.00–0.22  TURN      — rotate to a 3/4 angle so depth reads
 *   0.24–0.44  EXPLODE   — parts translate outward along their axes
 *   0.44–0.80  HOLD      — exploded; annotations cycle (DOM overlay, WorkstationPin)
 *   0.80–1.00  REASSEMBLE— parts return, rotation eases back
 *
 * Intro: on mount the parts start slightly exploded and assemble (~1.6s),
 * independent of scroll (explode = max(scrollExplode, introFactor)).
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export interface SceneProps {
  /** Reduced motion — render a still, assembled 3/4 view; no animation loop */
  staticScene: boolean;
  isMobile: boolean;
}

const CODE_LINES = [
  { text: "function findBug(items) {", color: "#c9d1d9" },
  { text: "  let lo = 0;", color: "#c9d1d9" },
  { text: "  let hi = items.length;", color: "#e3b341" },
  { text: "  while (lo <= hi) {", color: "#ff7b72", bug: true },
  { text: "    const mid = (lo + hi) >> 1;", color: "#c9d1d9" },
  { text: "    if (ok(items[mid])) return mid;", color: "#c9d1d9" },
  { text: "    // fix: hi = length - 1", color: "#7ee787" },
  { text: "  }", color: "#c9d1d9" },
  { text: "}", color: "#c9d1d9" },
];

/** One-time canvas-drawn “code editor” texture — never redrawn per frame. */
function useCodeTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 640;
    c.height = 400;
    const ctx = c.getContext("2d")!;

    ctx.fillStyle = "#14151a";
    ctx.fillRect(0, 0, 640, 400);

    // Title bar
    ctx.fillStyle = "#23242a";
    ctx.fillRect(0, 0, 640, 40);
    const dots = ["#ff5f57", "#febc2e", "#28c840"];
    dots.forEach((d, i) => {
      ctx.fillStyle = d;
      ctx.beginPath();
      ctx.arc(26 + i * 24, 20, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "14px monospace";
    ctx.fillText("dissect.ts — debugging", 110, 25);

    // Sidebar
    ctx.fillStyle = "#1b1c21";
    ctx.fillRect(0, 40, 84, 360);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "12px monospace";
    ["src/", "lib/", "app/"].forEach((f, i) => ctx.fillText(f, 14, 70 + i * 24));
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(8, 132, 68, 20);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("dissect", 14, 146);

    // Code lines
    ctx.font = "16px monospace";
    CODE_LINES.forEach((line, i) => {
      const y = 76 + i * 30;
      if (line.bug) {
        ctx.fillStyle = "rgba(220, 80, 80, 0.18)";
        ctx.fillRect(92, y - 18, 540, 26);
      }
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText(String(12 + i), 100, y);
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 136, y);
    });

    // Bug badge
    ctx.fillStyle = "rgba(220, 80, 80, 0.9)";
    ctx.font = "bold 13px monospace";
    ctx.fillText("● bug · off-by-one", 470, 172);

    // Status bar
    ctx.fillStyle = "#23242a";
    ctx.fillRect(0, 372, 640, 28);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "12px monospace";
    ctx.fillText("Ln 15 · dissecting", 14, 390);
    ctx.fillStyle = "rgba(126, 231, 135, 0.8)";
    ctx.fillText("1 issue found", 540, 390);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 2;
    return tex;
  }, []);
}

/** Base (assembled) transforms — explode offsets are added on top each frame. */
const BASE = {
  screen: { y: 0.55, z: 0.09 },
  bezel: { y: 0.55, z: 0 },
  neck: { y: -0.78, z: -0.05 },
  base: { y: -1.12, z: 0.05 },
  kb: { y: -1.28, z: 1.5 },
  keys: { y: 0.075 },
  pcb: { y: 0.0 },
  case_: { y: -0.02 },
};

const EXPLODE = {
  screen: { z: 1.15 },
  bezel: { z: 0.4 },
  neck: { y: -0.42, z: -0.35 },
  base: { y: -0.8, z: -0.15 },
  kb: { z: 0.75 },
  keys: { y: 0.55 },
  pcb: { y: 0.16 },
  case_: { y: -0.34 },
};

function Workstation({ staticScene, isMobile }: SceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const bezelRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const kbRef = useRef<THREE.Group>(null);
  const keysRef = useRef<THREE.Group>(null);
  const pcbRef = useRef<THREE.Group>(null);
  const caseRef = useRef<THREE.Group>(null);

  const lerped = useRef(0);
  const codeTex = useCodeTexture();

  const keyPositions = useMemo(() => {
    const rows = isMobile ? 3 : 4;
    const cols = isMobile ? 9 : 12;
    const arr: [number, number, number][] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push([
          (c - (cols - 1) / 2) * 0.2,
          0,
          (r - (rows - 1) / 2) * 0.2,
        ]);
      }
    }
    return arr;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (staticScene) return;
    const root = rootRef.current;
    if (!root) return;

    // Lerp toward the scrubbed scroll progress (scrub already smooths; this
    // just removes the last bit of stepping).
    lerped.current += (scrollStore.progress - lerped.current) * Math.min(1, delta * 7);
    const t = lerped.current;

    const turn = smooth(clamp01(t / 0.22));
    const ret = smooth(clamp01((t - 0.8) / 0.18));
    let explode = smooth(clamp01((t - 0.24) / 0.2)) * (1 - ret);

    // Intro assemble — one-shot, independent of scroll
    const intro = 1 - smooth(clamp01(state.clock.elapsedTime / 1.6));
    explode = Math.max(explode, intro);

    // Root pose: front → 3/4 angle → back toward front on reassemble
    root.rotation.y = -0.85 * turn * (1 - 0.75 * ret) - 0.3 * intro;
    root.rotation.x = 0.12 * turn * (1 - ret) + 0.05 * intro;
    root.position.y = 0.15 * explode;

    const set = (
      ref: React.RefObject<THREE.Group | null>,
      base: { y?: number; z?: number },
      off: { y?: number; z?: number },
    ) => {
      const g = ref.current;
      if (!g) return;
      g.position.y = (base.y ?? 0) + (off.y ?? 0) * explode;
      g.position.z = (base.z ?? 0) + (off.z ?? 0) * explode;
    };

    set(screenRef, BASE.screen, EXPLODE.screen);
    set(bezelRef, BASE.bezel, EXPLODE.bezel);
    set(neckRef, BASE.neck, EXPLODE.neck);
    set(baseRef, BASE.base, EXPLODE.base);
    set(kbRef, BASE.kb, EXPLODE.kb);
    set(keysRef, BASE.keys, EXPLODE.keys);
    set(pcbRef, BASE.pcb, EXPLODE.pcb);
    set(caseRef, BASE.case_, EXPLODE.case_);
  });

  return (
    <group
      ref={rootRef}
      rotation={staticScene ? [0.1, -0.55, 0] : [0, 0, 0]}
      position={[0, 0.1, 0]}
    >
      {/* —— MONITOR —— */}
      <group ref={bezelRef} position={[0, BASE.bezel.y, BASE.bezel.z]}>
        <RoundedBox args={[3.5, 2.25, 0.14]} radius={0.05} smoothness={2}>
          <meshStandardMaterial color="#26272c" roughness={0.6} metalness={0.25} />
        </RoundedBox>
      </group>

      <group ref={screenRef} position={[0, BASE.screen.y, BASE.screen.z]}>
        <mesh>
          <planeGeometry args={[3.24, 2.0]} />
          {/* Unlit — reads bright like a real display */}
          <meshBasicMaterial map={codeTex} toneMapped={false} />
        </mesh>
      </group>

      <group ref={neckRef} position={[0, BASE.neck.y, BASE.neck.z]}>
        <RoundedBox args={[0.22, 0.62, 0.12]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color="#3a3b40" roughness={0.55} metalness={0.35} />
        </RoundedBox>
      </group>

      <group ref={baseRef} position={[0, BASE.base.y, BASE.base.z]}>
        <RoundedBox args={[1.5, 0.09, 0.95]} radius={0.04} smoothness={2}>
          <meshStandardMaterial color="#3a3b40" roughness={0.55} metalness={0.35} />
        </RoundedBox>
      </group>

      {/* —— KEYBOARD —— */}
      <group ref={kbRef} position={[0, BASE.kb.y, BASE.kb.z]} rotation={[-0.1, 0, 0]}>
        <group ref={caseRef} position={[0, BASE.case_.y, 0]}>
          <RoundedBox args={[2.75, 0.14, 1.1]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color="#2e2f34" roughness={0.6} metalness={0.25} />
          </RoundedBox>
        </group>

        {/* PCB / logic board — the planning layer */}
        <group ref={pcbRef} position={[0, BASE.pcb.y, 0]}>
          <mesh>
            <boxGeometry args={[2.5, 0.035, 0.92]} />
            <meshStandardMaterial color="#1f6f43" roughness={0.7} />
          </mesh>
          {/* A few chips so it reads as a logic board */}
          {[-0.7, 0, 0.7].map((x) => (
            <mesh key={x} position={[x, 0.035, 0]}>
              <boxGeometry args={[0.24, 0.035, 0.24]} />
              <meshStandardMaterial color="#15161a" roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Keycaps — one instanced draw call */}
        <group ref={keysRef} position={[0, BASE.keys.y, 0]}>
          <Instances limit={keyPositions.length}>
            <boxGeometry args={[0.165, 0.06, 0.165]} />
            <meshStandardMaterial color="#ece9e2" roughness={0.75} />
            {keyPositions.map((p, i) => (
              <Instance key={i} position={p} />
            ))}
          </Instances>
        </group>
      </group>
    </group>
  );
}

/** R3F canvas — ONLY loaded via next/dynamic { ssr: false } (Workstation3D). */
export default function Scene({ staticScene, isMobile }: SceneProps) {
  return (
    <Canvas
      // Transparent over the light section bg — the 3D area is never black.
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      frameloop={staticScene ? "demand" : "always"}
      camera={{ position: [0, 0.35, 6.4], fov: 34 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[3.5, 4, 5]} intensity={0.85} />
      <directionalLight position={[-3, 2, -2]} intensity={0.25} />
      <Workstation staticScene={staticScene} isMobile={isMobile} />
    </Canvas>
  );
}
