"use client";

import dynamic from "next/dynamic";
import type { SceneProps } from "./Scene";

/**
 * three / R3F are WebGL + browser only — the <Canvas> must never render on the
 * server. This dynamic ssr:false boundary also keeps three/drei code-split out
 * of the main site bundle (only /showcase pulls it in).
 */
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="h-full w-full rounded-[3px] bg-gradient-to-b from-[#e6f1f6] to-[#d8e6ec]"
    />
  ),
});

export default function Workstation3D(props: SceneProps) {
  return <Scene {...props} />;
}
