"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { scrollTo } from "@/lib/motion/lenisInstance";
import { ease } from "@/lib/motion/tokens";

/**
 * Runs on every route change (App Router re-mounts templates). Provides the
 * cinematic arrival: an overlay panel wipes up off-screen while the incoming
 * content fades/rises in. Resets scroll to the top. Instant under reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    scrollTo(0, { immediate: true });
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[var(--z-overlay)] bg-base"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.7, ease: [...ease.inOut] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [...ease.outExpo] }}
      >
        {children}
      </motion.div>
    </>
  );
}
