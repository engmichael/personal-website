"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsTouch } from "@/lib/hooks/useIsTouch";

/**
 * A restrained custom cursor: a precise center dot plus a thin ring that softly
 * trails behind it. Both use `mix-blend-mode: difference`, so the cursor stays
 * legible over any background and reads as elegant rather than loud. The ring
 * grows a little over interactive elements. Native cursor returns on touch
 * devices and under reduced-motion.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const enabled = !reduced && !touch;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    // Add to <body> (not <html>): <html> is React-controlled via the layout's
    // className, and mutating it would trip hydration reconciliation.
    const root = document.body;
    root.classList.add("cursor-none");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      setHovering(!!(e.target as Element | null)?.closest?.("a, button, [data-cursor]"));
    };
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("blur", hide);
    document.body.addEventListener("pointerleave", hide);

    return () => {
      root.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("blur", hide);
      document.body.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[var(--z-cursor)]"
      style={{ mixBlendMode: "difference" }}
    >
      {/* Trailing ring */}
      <motion.div className="fixed left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="rounded-full border"
          style={{ transform: "translate(-50%, -50%)", borderColor: "#f4f1ea" }}
          animate={{
            width: hovering ? 46 : 26,
            height: hovering ? 46 : 26,
            opacity: visible ? (hovering ? 0.8 : 0.45) : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        />
      </motion.div>

      {/* Precise dot */}
      <motion.div className="fixed left-0 top-0" style={{ x, y }}>
        <motion.div
          className="h-1 w-1 rounded-full"
          style={{ transform: "translate(-50%, -50%)", backgroundColor: "#f4f1ea" }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
}
