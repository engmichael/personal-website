"use client";

import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Vignette } from "@/components/ui/Vignette";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/ui/Preloader";

/**
 * Global client-side chrome mounted once in the root layout: smooth scroll,
 * texture overlays, scroll progress, custom cursor, and the preloader.
 */
export function ClientProviders() {
  return (
    <>
      <SmoothScroll />
      <Vignette />
      <GrainOverlay />
      <ScrollProgress />
      <Cursor />
      <Preloader />
    </>
  );
}
