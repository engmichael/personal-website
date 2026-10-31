"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { experience, type Note, type Org, type Project } from "@/content/work";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

// The rail runs down the start of the right-hand column: 0.8fr of 2.4fr plus
// the 4rem gap = a third of the width + 8/3rem. On phones, the left edge.
const RAIL_X = "left-0 md:left-[calc(33.333%+2.667rem)]";

/** Chapter 1 — Experience. Chicago Booth → Accenture → UT on one continuous, scroll-linked rail. */
export function WorkScene() {
  return (
    <Chapter
      id="experience"
      num="1"
      title="Experience"
      kicker="Chicago Booth · Accenture · UT Austin"
      glow="76% 40%"
    >
      {experience.map((org, i) => (
        <OrgBlock key={org.id} org={org} last={i === experience.length - 1} />
      ))}
    </Chapter>
  );
}

/** One organization: its name on the left (sticky from md), entries on the rail. */
function OrgBlock({ org, last }: { org: Org; last: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Every block fills against the same viewport line, so each segment picks up
  // where the one above ended and the rail reads as a single line.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      // Spacing between organizations is padding, not margin, so the rail has no gaps.
      className={cn(
        "relative grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-16",
        !last && "pb-20 md:pb-28",
      )}
    >
      <div className={cn("absolute top-0 h-full w-px bg-border", RAIL_X)} aria-hidden />
      {!reduced && (
        <motion.div
          className={cn("absolute top-0 w-px bg-accent", RAIL_X)}
          style={{ height: fillHeight }}
          aria-hidden
        />
      )}
      {/* Node where the rail enters this organization; doubles as the first entry's dot from md. */}
      <span
        className={cn(
          "absolute top-[0.3rem] flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-[var(--base)]",
          RAIL_X,
        )}
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      <Reveal className="pl-8 md:pl-0">
        <div className="md:sticky md:top-28">
          <h3 className="font-display text-xl leading-none">{org.name}</h3>
          <div className="mt-2 text-fg-muted">{org.meta}</div>
          <div className="mono-label mt-3" style={{ fontSize: 10 }}>
            {org.years}
          </div>
        </div>
      </Reveal>

      <div className="space-y-16">
        {org.entries.map((e, i) => (
          <Reveal key={e.kind === "project" ? e.client : e.label}>
            <article className="relative pl-8 md:pl-10">
              <span
                className={cn(
                  "absolute left-0 top-[0.45em] h-2 w-2 -translate-x-1/2 rounded-full bg-accent ring-4 ring-[var(--base)]",
                  i === 0 && "md:hidden",
                )}
              />
              {e.kind === "project" ? <ProjectEntry p={e} /> : <NoteEntry n={e} />}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ProjectEntry({ p }: { p: Project }) {
  return (
    <>
      <div className="mono-label" style={{ fontSize: 11 }}>
        {p.years}
      </div>
      <h4 className="mt-3 font-display text-lg">
        {p.client} <span className="text-fg-subtle">·</span> {p.focus}
      </h4>
      <p className="mt-3 max-w-prose text-fg-muted">{p.summary}</p>

      <div className="mt-6 flex max-w-2xl flex-wrap gap-x-10 gap-y-5 border-y border-border/60 py-5">
        {p.stats.map((st) => (
          <div key={st.label}>
            <div className="font-display text-xl leading-none text-accent">{st.value}</div>
            <div className="mono-label mt-2" style={{ fontSize: 10 }}>
              {st.label}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-5 max-w-prose space-y-2.5 text-sm text-fg-muted">
        {p.bullets.map((b) => (
          <li
            key={b}
            className="relative pl-5 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2.5 before:bg-accent/70"
          >
            {b}
          </li>
        ))}
      </ul>
    </>
  );
}

function NoteEntry({ n }: { n: Note }) {
  return (
    <>
      <div className="mono-label" style={{ fontSize: 11 }}>
        {n.label}
      </div>
      {n.title && <h4 className="mt-3 font-display text-lg">{n.title}</h4>}
      {n.summary && <p className="mt-3 max-w-prose text-fg-muted">{n.summary}</p>}
      {n.tags && (
        <ul className="mt-4 flex max-w-2xl flex-wrap gap-2">
          {n.tags.map((t) => (
            <li
              key={t}
              className="rounded-[var(--radius)] border border-border px-3 py-1.5 text-sm text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
