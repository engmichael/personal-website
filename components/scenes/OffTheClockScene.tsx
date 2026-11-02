import Image from "next/image";
import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { Photography } from "./offtheclock/Photography";
import { Travel } from "./offtheclock/Travel";
import { Food } from "./offtheclock/Food";
import { offTheClock } from "@/content/offtheclock";

/** Chapter 3 — Off the Clock. Travel, food and photography as one set of hobbies. */
export function OffTheClockScene() {
  return (
    <Chapter id="off-the-clock" num="3" title="Off the Clock" kicker={offTheClock.label} glow="70% 30%">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <figure className="w-full max-w-[15rem] md:max-w-[17rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
              <Image
                src={offTheClock.photo.src}
                alt={offTheClock.photo.alt}
                fill
                sizes="(max-width: 768px) 15rem, 17rem"
                className="object-cover object-[50%_28%]"
              />
            </div>
            {/* Two lines on purpose; together they're too wide for the column. */}
            <figcaption className="mono-label mt-3 space-y-1" style={{ fontSize: 10 }}>
              <span className="block">{offTheClock.photo.caption}</span>
              <span className="block text-fg-subtle">{offTheClock.photo.date}</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display text-2xl leading-[0.98] tracking-[-0.02em]">
            A life <span className="text-accent">in motion.</span>
          </p>
          <p className="mt-6 max-w-prose text-fg-muted">{offTheClock.intro}</p>
          <div className="mt-6 space-y-5">
            <ChipRow label="Hobbies" items={offTheClock.hobbies} />
            <ChipRow label="Interests" items={offTheClock.interests} />
            <ChipRow label="Licenses" items={offTheClock.licenses} />
          </div>
        </Reveal>
      </div>

      <div className="mt-24 space-y-28">
        <Travel />
        <Food />
        <Photography />
      </div>
    </Chapter>
  );
}

function ChipRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex items-baseline gap-4">
      {/* Fixed width so both rows' chips start on the same line. */}
      <span className="mono-label w-20 shrink-0" style={{ fontSize: 10 }}>
        {label}
      </span>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-[var(--radius)] border border-border px-3 py-1.5 text-sm text-fg-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
