"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  arrow?: boolean;
  cursorLabel?: string;
  className?: string;
  /** Open http(s) links in a new tab. */
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[var(--radius)] px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast",
  outline: "border border-border text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg-muted hover:text-fg",
};

const sheen: Record<Variant, string> = {
  primary: "bg-accent-strong",
  outline: "bg-surface",
  ghost: "bg-surface",
};

/**
 * A button/link that animates on its own — a gentle lift, a fill that sweeps
 * up on hover, an optional arrow nudge, and a press scale. No cursor-magnetism.
 * All motion is disabled under prefers-reduced-motion (colors still transition).
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  arrow = false,
  cursorLabel,
  className,
  external,
}: Props) {
  const reduced = useReducedMotion();

  const common = {
    className: cn(base, variants[variant], className),
    whileHover: reduced ? undefined : { y: -2 },
    whileTap: reduced ? undefined : { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 30 } as const,
    "data-cursor": "",
    "data-cursor-label": cursorLabel,
  };

  const content = (
    <>
      {!reduced && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0",
            sheen[variant],
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <span className="inline-block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
            →
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        {...(external && href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...common}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} {...common}>
      {content}
    </motion.button>
  );
}
