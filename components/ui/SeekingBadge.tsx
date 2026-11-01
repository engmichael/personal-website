"use client";

import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

/** The "Recruiting · Summer 2027" status pill, with a softly pinging dot. */
export function SeekingBadge({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-base/40 px-3 py-1 text-xs text-fg-muted backdrop-blur",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {!reduced && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {site.seeking.badge}
    </span>
  );
}
