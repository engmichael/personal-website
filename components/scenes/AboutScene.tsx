import Image from "next/image";
import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { about } from "@/content/about";

/** Chapter 01 — Who I am. Portrait + quick facts, then the bio. */
export function AboutScene() {
  return (
    <Chapter id="about" num="01" title="Who I am" glow="24% 34%">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              fill
              priority={false}
              sizes="(max-width: 768px) 90vw, 32vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <dl className="mt-8 space-y-4">
            {about.meta.map((m) => (
              <div key={m.label} className="border-t border-border/60 pt-3">
                <dt className="mono-label" style={{ fontSize: 10 }}>
                  {m.label}
                </dt>
                <dd className="mt-1 text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-display text-xl leading-[1.2]">{about.lead}</p>
          </Reveal>
          <div className="mt-8 max-w-prose space-y-5 text-fg-muted">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
