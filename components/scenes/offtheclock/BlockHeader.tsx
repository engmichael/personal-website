import { Reveal } from "@/components/motion/Reveal";

type Props = { numeral: string; title: string; lede: string; aside?: React.ReactNode };

/** Shared header for each Off-the-clock block, so the three read as one set. */
export function BlockHeader({ numeral, title, lede, aside }: Props) {
  return (
    <Reveal>
      <div className="mb-10 grid gap-4 border-t border-border/60 pt-6 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-accent">{numeral}</span>
          <h3 className="font-display text-xl leading-none">{title}</h3>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="max-w-[52ch] text-fg-muted">{lede}</p>
          {aside}
        </div>
      </div>
    </Reveal>
  );
}
