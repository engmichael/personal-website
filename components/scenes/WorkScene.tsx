"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { experience, education } from "@/content/work";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Chapter 02 — Experience. Engagements on a scroll-linked rail, then education. */
export function WorkScene() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Chapter
      id="experience"
      num="02"
      title="Experience"
      kicker={`${experience.employer} ${experience.practice} → Chicago Booth`}
      glow="76% 40%"
    >
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <div className="md:sticky md:top-28">
            <div className="font-display text-xl leading-none">{experience.employer}</div>
            <div className="mt-2 text-fg-muted">
              {experience.practice} · {experience.location}
            </div>
            <div className="mono-label mt-3" style={{ fontSize: 10 }}>
              {experience.years}
            </div>
          </div>
        </Reveal>

        <div ref={ref} className="relative">
          <div className="absolute left-0 top-0 h-full w-px bg-border" aria-hidden />
          {!reduced && (
            <motion.div
              className="absolute left-0 top-0 w-px bg-accent"
              style={{ height: fillHeight }}
              aria-hidden
            />
          )}
          <div className="space-y-16">
            {experience.engagements.map((e) => (
              <Reveal key={e.client}>
                <article className="relative pl-8 md:pl-10">
                  <span className="absolute left-0 top-[0.55em] h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-[var(--base)]" />
                  <div className="mono-label" style={{ fontSize: 11 }}>
                    {e.years}
                  </div>
                  <h3 className="mt-2 font-display text-lg">
                    {e.client} <span className="text-fg-subtle">·</span> {e.focus}
                  </h3>
                  <p className="mt-3 max-w-prose text-fg-muted">{e.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
                    {e.stat && (
                      <div>
                        <div className="font-display text-xl leading-none text-accent">
                          {e.stat.value}
                        </div>
                        <div className="mono-label mt-1.5" style={{ fontSize: 10 }}>
                          {e.stat.label}
                        </div>
                      </div>
                    )}
                    <ul className="flex flex-wrap gap-2">
                      {e.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-[var(--radius)] border border-border px-2.5 py-1 text-xs text-fg-muted"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mt-24 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <div className="mono-label" style={{ fontSize: 10 }}>
            Education
          </div>
        </Reveal>
        <div className="divide-y divide-border/60">
          {education.map((ed) => (
            <Reveal key={ed.school}>
              <div className="grid gap-1 py-5 first:pt-0 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <div className="font-display text-md">{ed.school}</div>
                  <div className="mt-1 text-sm text-fg-muted">{ed.degree}</div>
                  {ed.note && <p className="mt-2 max-w-prose text-sm text-fg-subtle">{ed.note}</p>}
                </div>
                <div className="mono-label md:text-right" style={{ fontSize: 10 }}>
                  {ed.years}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
