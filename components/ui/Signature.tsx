"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

const SRC = "/brand/signature.svg";
const RATIO = "2425 / 964"; // the SVG's viewBox

type Props = {
  className?: string;
  /** Begin inking (e.g. once the preloader lifts). */
  start?: boolean;
  /** Seconds to wait after `start`. */
  delay?: number;
};

/**
 * Michael's signature (traced from a scan), inked left to right like a pen
 * crossing the page. The SVG is used as a mask over currentColor, so it takes
 * the text color. Decorative: the typed name beneath it is the text.
 */
export function Signature({ className, start = true, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mask = `url(${SRC}) center / contain no-repeat`;
  const shown = "inset(0% 0% 0% 0%)";
  const hidden = "inset(0% 100% 0% 0%)";

  return (
    <motion.span
      aria-hidden
      className={cn("block bg-current", className)}
      style={{ aspectRatio: RATIO, mask, WebkitMask: mask }}
      initial={reduced ? false : { clipPath: hidden }}
      animate={start || reduced ? { clipPath: shown } : { clipPath: hidden }}
      transition={{ duration: 1.6, delay, ease: [0.6, 0, 0.3, 1] }}
    />
  );
}
