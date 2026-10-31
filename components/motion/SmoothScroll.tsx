"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { setLenis } from "@/lib/motion/lenisInstance";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Site-wide momentum scroll (Lenis), driven by GSAP's ticker and kept in sync
 * with ScrollTrigger so pinning/scroll-linked timelines stay accurate. Lenis
 * runs on the window scroller (default), so no scrollerProxy is required.
 *
 * Under reduced-motion we skip Lenis entirely and use native scrolling.
 * Touch devices keep native scrolling (smoothWheel only) for a better feel.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      anchors: true, // smooth-scroll in-page #links (header nav, hero CTAs)
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return null;
}
