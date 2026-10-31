"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsTouch } from "@/lib/hooks/useIsTouch";
import { ease } from "@/lib/motion/tokens";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { WuBrush } from "@/components/ui/WuBrush";

// Heavy: Three/R3F are code-split and only fetched when we actually render this.
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

const nameParts = ["Michael", "Eng"];

const facts: { label: string; value: string; href?: string }[] = [
  { label: "Now", value: "MBA/MPCS @ Chicago Booth" },
  { label: "Previously", value: "Strategy @ Accenture" },
  { label: "Focus", value: "Strategy · Partnerships · Education" },
  { label: "Off the Clock", value: "Travel · Food · Photography", href: "#off-the-clock" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(false);

  // Resolve capabilities after mount so we never fetch the WebGL chunk on
  // touch / reduced-motion, and so the reveal waits for the preloader to lift.
  useEffect(() => {
    const trigger = () => {
      setReady(true);
      setStart(true);
    };
    if (!document.documentElement.classList.contains("is-preloading")) {
      // setTimeout (not rAF) so the reveal still fires if the tab loads in the
      // background; rAF is paused when the document isn't visible.
      const id = window.setTimeout(trigger, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("v3:preloaded", trigger, { once: true });
    const fallback = window.setTimeout(trigger, 4000); // safety net
    return () => {
      window.removeEventListener("v3:preloaded", trigger);
      window.clearTimeout(fallback);
    };
  }, []);

  const enableWebgl = ready && site.flags.webglHero && !reduced && !touch;

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Background: static gradient always (also the WebGL fallback), canvas on top when allowed. */}
      <div className="hero-gradient absolute inset-0 -z-10" aria-hidden />
      {enableWebgl && (
        <div className="absolute inset-0 -z-10" aria-hidden>
          <HeroCanvas />
        </div>
      )}
      {/* Readability scrim: guarantees text contrast over the dynamic field. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,11,0.72) 0%, rgba(10,10,11,0.36) 45%, transparent 78%)",
        }}
      />

      {/* The 吳 mark, drawn stroke by stroke once the page is ready (md+). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="shell relative h-full">
          <WuBrush
            start={start}
            delay={0.55}
            className="absolute right-[var(--gutter)] top-[15%] h-[44%] w-auto text-fg/90"
          />
        </div>
      </div>

      <div className="shell pt-24 pb-8">
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          initial={reduced ? false : { opacity: 0 }}
          animate={start || reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="mono-label">MBA/MPCS Candidate · Chicago Booth</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-base/40 px-3 py-1 text-xs text-fg-muted backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {site.seeking.badge}
          </span>
        </motion.div>

        <h1 className="font-display text-display leading-[0.95]">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.26em]">
            {nameParts.map((part, i) => (
              <span key={part} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: "110%" }}
                  animate={start || reduced ? { y: 0 } : { y: "110%" }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: [...ease.outExpo] }}
                >
                  {part}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={start || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [...ease.outExpo] }}
        >
          <div>
            <p className="max-w-[30ch] font-display text-xl leading-[1.12]">
              Strategy and operations for businesses{" "}
              <em className="italic text-accent">in motion.</em>
            </p>
            <p className="mt-4 max-w-[56ch] text-fg-muted">
              Most recently a Strategy Consultant at Accenture, where I helped scale Waymo&apos;s
              autonomous fleet from 20 vehicles to 500. Now pursuing a joint MBA and MS in
              Computer Science at Chicago Booth.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href="#contact" arrow cursorLabel="Contact">
              Get in touch
            </Button>
            <Button
              href={site.resume ?? site.linkedin}
              variant="outline"
              cursorLabel="Open"
              external
            >
              {site.resume ? "Résumé" : "LinkedIn"}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Fact strip — the at-a-glance read. Hobbies are named as hobbies. */}
      <motion.div
        className="shell pb-8"
        initial={reduced ? false : { opacity: 0 }}
        animate={start || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <dl className="grid grid-cols-2 border-t border-border/70 md:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "py-4 pr-4 md:py-5",
                i > 0 && "md:border-l md:border-border/70 md:pl-5",
                i % 2 === 1 && "border-l border-border/70 pl-4 md:pl-5",
              )}
            >
              <dt className="mono-label" style={{ fontSize: 10 }}>
                {f.label}
              </dt>
              <dd className="mt-1.5 text-sm text-fg">
                {f.href ? (
                  <a href={f.href} className="link-underline" data-cursor>
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
