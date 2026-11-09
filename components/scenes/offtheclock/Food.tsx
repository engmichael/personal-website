import { Reveal } from "@/components/motion/Reveal";
import { BlockHeader, BlockLink } from "./BlockHeader";
import { eats } from "@/content/eats";
import { offTheClock } from "@/content/offtheclock";
import { site } from "@/content/site";

/** Ranked list in two columns, then three notes. */
export function Food() {
  const block = offTheClock.blocks.food;
  return (
    <div id="food">
      <BlockHeader
        numeral="3.2"
        title={block.title}
        lede={block.lede}
        aside={<BlockLink href={site.beli}>Follow me on Beli</BlockLink>}
      />

      <Reveal>
        <div className="mono-label mb-4">{eats.rankedHeading}</div>
      </Reveal>
      <Reveal>
        <ol className="border-t border-border/60 md:columns-2 md:gap-12">
          {eats.ranked.map((r) => (
            <li
              key={r.num}
              className="flex break-inside-avoid items-baseline gap-4 border-b border-border/60 py-3"
            >
              <span className="mono-label w-6 shrink-0" style={{ fontSize: 11 }}>
                {r.num}
              </span>
              <span className="font-display">{r.name}</span>
              <span className="ml-auto text-right text-sm text-fg-subtle">{r.cuisine}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal>
        <div className="mono-label mb-4 mt-14">{eats.featuredHeading}</div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {eats.featured.slice(0, 3).map((f, i) => (
          <Reveal key={f.rank} delay={0.06 * i}>
            <div className="h-full rounded-[var(--radius-lg)] border border-border bg-surface/30 p-6">
              <div className="mono-label" style={{ fontSize: 10, color: "var(--accent-strong)" }}>
                {f.kicker}
              </div>
              <div className="mt-3 font-display text-lg">{f.name}</div>
              <div className="mono-label mt-1" style={{ fontSize: 10 }}>
                {f.rank} · {f.info}
              </div>
              <p
                className="mt-4 text-sm text-fg-muted [&_em]:not-italic [&_em]:text-fg"
                dangerouslySetInnerHTML={{ __html: f.body }}
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-sm text-fg-subtle">{eats.footer}</p>
      </Reveal>
    </div>
  );
}
