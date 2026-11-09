import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { BlockHeader, BlockLink } from "./BlockHeader";
import { photos } from "@/content/photos";
import { offTheClock } from "@/content/offtheclock";
import { site } from "@/content/site";

/** Masonry of uncropped frames: 1 column on phones, 2 from sm, 3 from md. */
export function Photography() {
  const block = offTheClock.blocks.photography;
  return (
    <div id="photography">
      <BlockHeader
        numeral="3.3"
        title={block.title}
        lede={block.lede}
        aside={<BlockLink href={site.instagram}>More on Instagram</BlockLink>}
      />
      <div className="gap-4 sm:columns-2 md:columns-3 md:gap-5">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={0.04 * (i % 3)} className="mb-6 break-inside-avoid md:mb-7">
            <figure className="group">
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 640px) 92vw, (max-width: 768px) 46vw, 31vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mono-label mt-3 flex items-center justify-between gap-4" style={{ fontSize: 10 }}>
                <span className="text-fg">{p.title}</span>
                <span>{p.year ? `${p.location} · ${p.year}` : p.location}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
