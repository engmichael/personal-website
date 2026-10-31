import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { BlockHeader } from "./BlockHeader";
import { photos } from "@/content/photos";
import { offTheClock } from "@/content/offtheclock";
import { site } from "@/content/site";
import { cn } from "@/lib/utils/cn";

/** Editorial grid: 3 columns on desktop with a tall frame spanning two rows. */
export function Photography() {
  const block = offTheClock.blocks.photography;
  return (
    <div id="photography">
      <BlockHeader
        numeral="4.3"
        title={block.title}
        lede={block.lede}
        aside={
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-fg"
            data-cursor
          >
            More on Instagram →
          </a>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={0.05 * i} className={cn(p.tall && "sm:row-span-2")}>
            <figure className="group h-full">
              <div
                className={cn(
                  "relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
                  p.tall ? "aspect-[3/4] sm:aspect-auto sm:h-[calc(100%-2.25rem)]" : "aspect-[4/3]",
                )}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 768px) 46vw, 31vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mono-label mt-3 flex items-center justify-between" style={{ fontSize: 10 }}>
                <span className="text-fg">{p.title}</span>
                <span>
                  {p.location} · {p.year}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
