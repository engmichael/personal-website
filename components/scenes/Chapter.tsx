import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  id: string;
  num: string;
  title: ReactNode;
  kicker?: string;
  children: ReactNode;
  className?: string;
  /** When true, children render full-bleed (only the header sits in the content shell). */
  bleed?: boolean;
  /** Subtle per-chapter accent glow position, e.g. "20% 30%", for color-graded cuts. */
  glow?: string;
};

/** Consistent scene wrapper: section rhythm, numbered header, optional accent grade. */
export function Chapter({ id, num, title, kicker, children, className, bleed, glow }: Props) {
  return (
    <section id={id} className={cn("relative py-[var(--section-y)]", className)}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(40% 40% at ${glow}, rgba(232,161,92,0.06), transparent 70%)`,
          }}
        />
      )}
      <div className="shell">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border/60 pb-5">
            <span className="inline-flex h-8 min-w-9 items-center justify-center rounded-[var(--radius)] border border-accent/70 bg-accent/10 px-2 font-sans text-xs font-medium tabular-nums tracking-[0.1em] text-accent">
              {num}
            </span>
            <h2 className="font-display text-2xl leading-none">{title}</h2>
            {kicker && <span className="ml-auto text-sm text-fg-subtle">{kicker}</span>}
          </div>
        </Reveal>
      </div>
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}
