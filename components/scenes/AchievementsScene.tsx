import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { achievements, boothGroups } from "@/content/achievements";

/** Chapter 03 — Leadership & impact. Stat-led cards, then current Booth groups. */
export function AchievementsScene() {
  return (
    <Chapter id="leadership" num="3" title="Leadership & impact" kicker="Built, led, raised" glow="28% 55%">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={0.08 * i}>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-border bg-surface/40 p-7 transition-colors duration-500 hover:border-accent/50">
              <div>
                <div className="font-display text-2xl leading-none text-accent">{a.stat}</div>
                <div className="mono-label mt-2" style={{ fontSize: 10 }}>
                  {a.unit}
                </div>
                <div className="mt-10 font-display text-lg">{a.title}</div>
                <div className="mt-1 text-sm text-fg">{a.role}</div>
                <div className="mono-label mt-1" style={{ fontSize: 10 }}>
                  {a.when}
                </div>
              </div>
              <p className="mt-6 text-sm text-fg-muted">{a.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <div className="mono-label" style={{ fontSize: 10 }}>
            At Booth
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="flex flex-wrap gap-2">
            {boothGroups.map((group) => (
              <li
                key={group}
                className="rounded-[var(--radius)] border border-border px-3 py-1.5 text-sm text-fg-muted"
              >
                {group}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Chapter>
  );
}
