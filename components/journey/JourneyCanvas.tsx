"use client";

import { Suspense, useEffect, useState, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { WebGPURenderer } from "three/webgpu";
import SceneContent from "./scene/SceneContent";
import { PALETTE } from "@/lib/journey/chapters";

type Props = { progress: MutableRefObject<number> };

/**
 * The globe canvas. Uses Three's WebGPURenderer, which automatically falls back
 * to a WebGL2 backend on devices without WebGPU (many older iPhones) — the
 * fallback path is first-class, and we only use standard materials so both
 * backends render identically. Rendering pauses when the tab is hidden.
 */
export default function JourneyCanvas({ progress }: Props) {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.4], fov: 38, near: 0.1, far: 400 }}
      gl={async (props) => {
        const renderer = new WebGPURenderer({
          ...(props as ConstructorParameters<typeof WebGPURenderer>[0]),
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        try {
          await renderer.init();
        } catch (err) {
          // WebGPURenderer.init() already falls back to WebGL2 internally;
          // this only fires on a hard failure. Surface it for debugging.
          console.warn("[journey] renderer init issue:", err);
        }
        return renderer;
      }}
      style={{ background: `radial-gradient(120% 120% at 50% 30%, ${PALETTE.navy} 0%, ${PALETTE.navyDeep} 70%)` }}
    >
      <Suspense fallback={null}>
        <SceneContent progress={progress} />
      </Suspense>
    </Canvas>
  );
}
