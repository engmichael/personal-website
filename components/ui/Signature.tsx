"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: string;
  className?: string;
  /** Begin inking (e.g. once the preloader lifts). */
  start?: boolean;
  /** Seconds to wait after `start`. */
  delay?: number;
};

/**
 * The hand-signed sign-off, inked left to right like a pen crossing the page.
 * Set in a script face as a stand-in; swap in the real signature (SVG) here and
 * the reveal carries over. Decorative: the typed name beneath it is the text.
 * Insets run negative so the script's swashes aren't clipped once revealed.
 */
export function Signature({ children, className, start = true, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const shown = "inset(-60% -10% -60% -10%)";
  const hidden = "inset(-60% 110% -60% -10%)";

  return (
    <motion.span
      aria-hidden
      className={cn("block whitespace-nowrap font-signature", className)}
      // Inline, so a size class in `className` can't merge the leading away.
      style={{ lineHeight: 1 }}
      initial={reduced ? false : { clipPath: hidden }}
      animate={start || reduced ? { clipPath: shown } : { clipPath: hidden }}
      transition={{ duration: 1.6, delay, ease: [0.6, 0, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
}
