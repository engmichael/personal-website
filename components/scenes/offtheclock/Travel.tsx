"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/motion/Reveal";
import { BlockHeader } from "./BlockHeader";
import { places } from "@/content/places";
import { offTheClock } from "@/content/offtheclock";

// Lazy: d3-geo + the vendored topojson only load when this block is reached.
const WorldMap = dynamic(() => import("@/components/scenes/WorldMap").then((m) => m.WorldMap), {
  ssr: false,
  loading: () => (
    <div className="aspect-[2/1] w-full animate-pulse rounded-[var(--radius-lg)] border border-border bg-surface/40" />
  ),
});

export function Travel() {
  const block = offTheClock.blocks.travel;
  const featured = places.filter((p) => p.featured);

  return (
    <div id="travel">
      <BlockHeader
        numeral="3.1"
        title={block.title}
        lede={block.lede}
        aside={<span className="mono-label">{places.length} places</span>}
      />
      <Reveal>
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface/30 p-4 sm:p-8">
          <WorldMap />
        </div>
      </Reveal>
      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <Reveal key={p.id}>
            <div className="border-t border-border/60 pt-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display">{p.name}</span>
                {p.stat && <span className="font-display text-md italic leading-none text-accent">{p.stat}</span>}
              </div>
              <p className="mt-1 text-sm text-fg-muted">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
