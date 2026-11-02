import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { Orbits } from "@/components/ui/Motifs";
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
          <div className="aspect-square w-40 md:w-full md:max-w-[17rem]">
            <Orbits />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display text-2xl leading-[0.98] tracking-[-0.02em]">
            A life <span className="text-accent">in motion.</span>
          </p>
          <p className="mt-6 max-w-prose text-fg-muted">{offTheClock.intro}</p>
          <div className="mt-6 space-y-3">
            <ChipRow label="Hobbies" items={offTheClock.hobbies} />
            <ChipRow label="Interests" items={offTheClock.interests} />
          </div>
          <p className="mt-5 max-w-prose text-sm text-fg-subtle">{offTheClock.licensed}</p>
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
