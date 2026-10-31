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
          <div className="mb-12 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border/60 pb-5">
            <span className="font-display text-lg italic leading-none text-accent">{num}</span>
            <h2 className="font-display text-2xl leading-none">{title}</h2>
            {kicker && <span className="ml-auto text-sm text-fg-subtle">{kicker}</span>}
          </div>
        </Reveal>
      </div>
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}
