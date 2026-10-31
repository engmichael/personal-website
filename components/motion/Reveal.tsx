"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ease } from "@/lib/motion/tokens";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Scroll-into-view reveal (fade + rise), once. Renders statically under reduced-motion. */
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, delay, ease: [...ease.outExpo] }}
    >
      {children}
    </motion.div>
  );
}
