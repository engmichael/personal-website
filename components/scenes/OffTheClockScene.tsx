import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { Photography } from "./offtheclock/Photography";
import { Travel } from "./offtheclock/Travel";
import { Food } from "./offtheclock/Food";
import { offTheClock } from "@/content/offtheclock";

/** Chapter 04 — Off the Clock. Travel, food and photography as one set of hobbies. */
export function OffTheClockScene() {
  return (
    <Chapter id="off-the-clock" num="04" title="Off the Clock" kicker={offTheClock.label} glow="70% 30%">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <div className="mono-label" style={{ fontSize: 10 }}>
            The life around the work
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-display text-2xl leading-[0.98] tracking-[-0.02em]">
            A life <span className="text-accent">in motion.</span>
          </p>
          <p className="mt-6 max-w-prose text-fg-muted">{offTheClock.intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mono-label mr-2" style={{ fontSize: 10 }}>
              Also
            </span>
            {offTheClock.also.map((a) => (
              <span
                key={a}
                className="rounded-[var(--radius)] border border-border px-3 py-1.5 text-sm text-fg-muted"
              >
                {a}
              </span>
            ))}
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
