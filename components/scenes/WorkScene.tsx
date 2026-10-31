"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { experience, education } from "@/content/work";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Chapter 02 — Experience. Roles on a scroll-linked rail, then earlier roles and education. */
export function WorkScene() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Chapter
      id="experience"
      num="2"
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
          <div className="space-y-20">
            {experience.roles.map((r) => (
              <Reveal key={r.title}>
                <article className="relative pl-8 md:pl-10">
                  <span className="absolute left-0 top-[0.45em] h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-[var(--base)]" />
                  <div className="mono-label" style={{ fontSize: 11 }}>
                    {r.years}
                  </div>

                  <h3 className="mt-3 font-display text-lg">
                    {r.project.client} <span className="text-fg-subtle">·</span> {r.project.focus}
                  </h3>
                  <p className="mt-3 max-w-prose text-fg-muted">{r.project.summary}</p>

                  <div className="mt-6 flex max-w-2xl flex-wrap gap-x-10 gap-y-5 border-y border-border/60 py-5">
                    {r.project.stats.map((st) => (
                      <div key={st.label}>
                        <div className="font-display text-xl leading-none text-accent">{st.value}</div>
                        <div className="mono-label mt-2" style={{ fontSize: 10 }}>
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-5 max-w-prose space-y-2.5 text-sm text-fg-muted">
                    {r.project.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-5 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2.5 before:bg-accent/70"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Earlier roles */}
      <div className="mt-24 grid gap-6 border-t border-border/60 pt-8 md:grid-cols-[0.8fr_1.6fr] md:gap-16">
        <Reveal>
          <div className="mono-label" style={{ fontSize: 10 }}>
            Earlier
          </div>
        </Reveal>
        <div className="divide-y divide-border/60">
          {experience.earlier.map((e) => (
            <Reveal key={e.org}>
              <div className="grid gap-1 py-5 first:pt-0 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <div className="font-display text-md">
                    {e.org} <span className="text-fg-subtle">·</span> {e.title}
                  </div>
                  <div className="mt-1 text-sm text-fg-muted">{e.location}</div>
                  <p className="mt-2 max-w-prose text-sm text-fg-subtle">{e.summary}</p>
                </div>
                <div className="mono-label md:text-right" style={{ fontSize: 10 }}>
                  {e.years}
                </div>
              </div>
            </Reveal>
          ))}
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
