"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ease, duration } from "@/lib/motion/tokens";
import { site } from "@/content/site";

const colors = [
  { name: "base", varName: "--base", hex: "#0A0A0B" },
  { name: "base-raised", varName: "--base-raised", hex: "#0F0F11" },
  { name: "surface", varName: "--surface", hex: "#141416" },
  { name: "surface-2", varName: "--surface-2", hex: "#1B1B1F" },
  { name: "border", varName: "--border", hex: "#26262B" },
  { name: "fg", varName: "--fg", hex: "#F4F1EA" },
  { name: "fg-muted", varName: "--fg-muted", hex: "#A7A29A" },
  { name: "fg-subtle", varName: "--fg-subtle", hex: "#6D685F" },
  { name: "accent", varName: "--accent", hex: "#E8A15C" },
  { name: "accent-strong", varName: "--accent-strong", hex: "#F2B478" },
  { name: "accent-deep", varName: "--accent-deep", hex: "#C9823F" },
];

// Accent: keeping amber for now (first). The rest are alternatives kept on
// hand for a future revisit. `on` = text color for a filled button.
const accents = [
  { name: "Amber (current)", hex: "#E8A15C", note: "soft tan-gold", on: "#17130C" },
  { name: "Gold", hex: "#E0A02E", note: "richer, saturated", on: "#17130C" },
  { name: "Ember", hex: "#EA5A2B", note: "warm red-orange", on: "#ffffff" },
  { name: "Cyan", hex: "#22D3EE", note: "cool alt — electric aqua", on: "#05171B" },
];

const typeScale = [
  { name: "display", varName: "--fs-display", sample: "Aa" },
  { name: "3xl", varName: "--fs-3xl", sample: "A life in motion" },
  { name: "2xl", varName: "--fs-2xl", sample: "A life in motion" },
  { name: "xl", varName: "--fs-xl", sample: "A life in motion" },
  { name: "lg", varName: "--fs-lg", sample: "A life in motion" },
  { name: "md", varName: "--fs-md", sample: "A life in motion" },
  { name: "base", varName: "--fs-base", sample: "A life in motion — the body copy size." },
  { name: "sm", varName: "--fs-sm", sample: "A life in motion — smaller supporting text." },
  { name: "xs", varName: "--fs-xs", sample: "A LIFE IN MOTION" },
];

const eases = [
  { name: "outExpo", note: "reveals, entrances", value: ease.outExpo },
  { name: "outQuart", note: "movement, parallax", value: ease.outQuart },
  { name: "inOut", note: "state changes", value: ease.inOut },
  { name: "outBack", note: "playful pops", value: ease.outBack },
];

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="mono-label">§ {num}</span>
      <h2 className="font-display text-xl">{title}</h2>
    </div>
  );
}

export default function StyleGuide() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-[100dvh] pb-40">
      {/* Masthead */}
      <header className="shell flex min-h-[62vh] flex-col justify-end py-20">
        <p className="mono-label mb-6">Design System · v3 · The Experience</p>
        <h1 className="font-display text-3xl leading-[0.9]">
          The <span className="text-accent">language</span>,
          <br />
          before the film.
        </h1>
        <p className="mt-8 max-w-[52ch] text-md text-fg-muted">
          Tokens, type, motion, and texture — locked here so every scene downstream
          speaks the same visual grammar.{" "}
          <Link href="/" className="link-underline text-accent" data-cursor>
            ← Home
          </Link>
        </p>
      </header>

      <div className="shell space-y-32">
        {/* Color */}
        <section>
          <SectionLabel num="01" title="Color — near-monochrome, one warm accent" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
                <div className="h-24 w-full" style={{ background: `var(${c.varName})` }} />
                <div className="flex items-center justify-between gap-2 bg-surface px-3 py-2">
                  <span className="text-sm">{c.name}</span>
                  <span className="mono-label" style={{ fontSize: 10 }}>{c.hex}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Accent candidates — awaiting your pick */}
          <div className="mt-14">
            <div className="mono-label mb-4" style={{ color: "var(--accent-strong)" }}>
              Accent — amber locked for now · alternatives for later
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {accents.map((a, i) => (
                <div key={a.hex} className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
                  <div className="mb-4 h-14 w-full rounded-[var(--radius)]" style={{ background: a.hex }} />
                  <div className="font-display text-2xl leading-none" style={{ color: a.hex }}>
                    in&nbsp;motion.
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm">
                      {i + 1}. {a.name}
                    </span>
                    <span className="mono-label" style={{ fontSize: 10 }}>{a.hex}</span>
                  </div>
                  <div className="mt-1 text-fg-subtle" style={{ fontSize: 11 }}>{a.note}</div>
                  <div
                    className="mt-4 inline-flex rounded-[var(--radius)] px-4 py-2 text-xs font-medium"
                    style={{ background: a.hex, color: a.on }}
                  >
                    Sample button
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <SectionLabel num="02" title="Type — Bricolage Grotesque × Inter × Geist Mono" />
          <div className="space-y-6">
            {typeScale.map((t) => (
              <div key={t.name} className="flex flex-col gap-1 border-b border-border/60 pb-6 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="w-28 shrink-0">
                  <div className="mono-label" style={{ fontSize: 10 }}>{t.name}</div>
                  <div className="text-fg-subtle" style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}>{t.varName}</div>
                </div>
                <div
                  className="font-display leading-[0.95]"
                  style={{ fontSize: `var(${t.varName})`, letterSpacing: "var(--tracking-display)" }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <div>
              <div className="mono-label mb-4">Display · Bricolage Grotesque</div>
              <p className="font-display text-2xl leading-[0.95]">Chapters, scenes, and cuts.</p>
            </div>
            <div>
              <div className="mono-label mb-4">Body · Inter</div>
              <p className="max-w-prose text-base text-fg-muted">
                I travel constantly, eat enthusiastically, design things on the side, and shoot
                most of what I see. Type does the cinematic lifting — big, tight, and confident,
                with generous negative space around it.
              </p>
              <p className="mono-label mt-6" style={{ fontSize: 11 }}>
                SONY A7 IV · 35MM · f/1.8 · 1/250 · ISO 400
              </p>
            </div>
          </div>
        </section>

        {/* Buttons & links */}
        <section>
          <SectionLabel num="03" title="Controls — self-animating buttons, drawing links" />
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary" arrow cursorLabel="Go">Primary action</Button>
            <Button variant="outline" cursorLabel="Open">Outline</Button>
            <Button variant="ghost" cursorLabel="More">Ghost</Button>
            <a href="#" className="link-underline text-fg" data-cursor>
              A text link that draws its underline
            </a>
          </div>
          <p className="mt-6 text-sm text-fg-subtle">
            Hover and press the buttons — they lift, a fill sweeps up, and the arrow nudges. No
            cursor-magnetism. All of it stills under reduced-motion (colors still shift).
          </p>
        </section>

        {/* Motion */}
        <section>
          <SectionLabel num="04" title="Motion — shared easings & timing" />
          <div className="space-y-6">
            {eases.map((e) => (
              <div key={e.name} className="flex items-center gap-6">
                <div className="w-32 shrink-0">
                  <div className="text-sm">{e.name}</div>
                  <div className="mono-label" style={{ fontSize: 10 }}>{e.note}</div>
                </div>
                <div className="relative h-9 flex-1 rounded-full bg-surface">
                  <motion.div
                    className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-accent"
                    initial={{ left: "2%" }}
                    animate={reduced ? { left: "2%" } : { left: ["2%", "92%", "2%"] }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 3.2, ease: [...e.value], repeat: Infinity, repeatDelay: 0.4 }
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-fg-muted">
            Durations: fast {duration.fast}s · base {duration.base}s · slow {duration.slow}s · slower {duration.slower}s
          </div>
        </section>

        {/* Texture */}
        <section>
          <SectionLabel num="05" title="Texture — film grain & vignette" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-8">
              <div className="mono-label mb-3">Grain</div>
              <p className="text-sm text-fg-muted">
                An animated SVG-noise layer at 5% opacity drifts across the whole viewport —
                it&apos;s live on this page right now. Under{" "}
                <code className="text-accent">prefers-reduced-motion</code> it freezes to a static
                grain.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border p-8">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
              />
              <div className="relative mono-label mb-3">Vignette</div>
              <p className="relative text-sm text-fg-muted">
                A gentle radial darkening focuses the frame toward center — shown inside this card,
                applied globally site-wide.
              </p>
            </div>
          </div>
        </section>

        {/* Cursor */}
        <section>
          <SectionLabel num="06" title="Custom cursor — refined dot + trailing ring" />
          <div className="flex flex-wrap gap-4">
            {["one", "two", "three", "four"].map((k) => (
              <div
                key={k}
                data-cursor
                className="grid h-32 w-40 place-items-center rounded-[var(--radius-lg)] border border-border bg-surface text-fg-muted transition-colors hover:border-accent hover:text-fg"
              >
                hover me
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-fg-subtle">
            A precise dot plus a thin ring that softly trails, blended against the background so it
            stays legible anywhere. The ring grows subtly over interactive elements. Native cursor
            returns on touch devices and under reduced-motion.
          </p>
        </section>

        {/* Flags */}
        <section>
          <SectionLabel num="07" title="Feature flags (content/site.ts)" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.entries(site.flags).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-4 py-3">
                <span className="text-sm">{k}</span>
                <span className="mono-label" style={{ fontSize: 10, color: v ? "var(--accent)" : "var(--fg-subtle)" }}>
                  {v ? "ON" : "OFF"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
