import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { MotifArt } from "@/components/ui/Motifs";
import { achievements } from "@/content/achievements";

/** Chapter 2 — Leadership & Impact. Stat-led cards, each topped with an illustration. */
export function AchievementsScene() {
  return (
    <Chapter id="leadership" num="2" title="Leadership & Impact" kicker="Expanding educational access" glow="28% 55%">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={0.08 * i}>
            <div className="motif-host flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/40 transition-colors duration-500 hover:border-accent/50">
              {/* The art is absolutely placed so every panel keeps the same height, whatever its shape. */}
              <div className="motif-cover relative aspect-[16/10] border-b border-border/60">
                <div className="absolute inset-x-6 inset-y-5">
                  <MotifArt motif={a.motif} />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <div className="font-display text-2xl leading-none text-accent">{a.stat}</div>
                  <div className="mono-label mt-2" style={{ fontSize: 10 }}>
                    {a.unit}
                  </div>
                  <div className="mt-8 font-display text-lg">{a.title}</div>
                  <div className="mt-1 text-sm text-fg">{a.role}</div>
                  <div className="mono-label mt-1" style={{ fontSize: 10 }}>
                    {a.when}
                  </div>
                </div>
                <p className="mt-6 text-sm text-fg-muted">{a.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
