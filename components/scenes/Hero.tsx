"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { letter } from "@/content/letter";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsTouch } from "@/lib/hooks/useIsTouch";
import { ease } from "@/lib/motion/tokens";
import { Button } from "@/components/ui/Button";
import { Signature } from "@/components/ui/Signature";
import { cn } from "@/lib/utils/cn";

// Heavy: Three/R3F are code-split and only fetched when we actually render this.
// Parked behind site.flags.brushMark; lazy so it costs nothing while off.
const WuBrush = dynamic(() => import("@/components/ui/WuBrush").then((m) => m.WuBrush), {
  ssr: false,
});

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

const facts: { label: string; value: string; href?: string }[] = [
  { label: "Previously", value: "Strategy @ Accenture" },
  { label: "Focus", value: "Strategy · Partnerships · Education" },
  { label: "Off the Clock", value: "Travel · Food · Photography", href: "#off-the-clock" },
];

/**
 * The hero is a short signed letter beside the portrait, like a CEO's letter:
 * an opening line, two paragraphs, the signature and a typed sign-off. The
 * name lives in the header and the sign-off, so there's no display headline;
 * the h1 is kept for search and screen readers.
 */
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
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
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
      {site.flags.brushMark && (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="shell relative h-full">
            <WuBrush
              start={start}
              delay={0.55}
              className="absolute right-[var(--gutter)] top-[15%] h-[44%] w-auto text-fg/90"
            />
          </div>
        </div>
      )}

      <div className="shell flex flex-1 items-center pt-28 pb-10">
        <h1 className="sr-only">{site.name}</h1>
        <div className="grid w-full gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center md:gap-16">
          <div>
            <motion.div
              className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-3"
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

            <motion.p
              className="max-w-[22ch] font-display text-[clamp(2.1rem,1.4rem+2.1vw,3.4rem)] leading-[1.04]"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={start || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1, delay: 0.2, ease: [...ease.outExpo] }}
            >
              Strategy and operations for businesses{" "}
              <em className="italic text-accent">in motion.</em>
            </motion.p>

            <motion.div
              className="mt-6 max-w-[58ch] space-y-4 text-fg-muted"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={start || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [...ease.outExpo] }}
            >
              {letter.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
              <div>
                <Signature start={start || reduced} delay={0.9} className="w-[12.5rem] text-fg/90 md:w-[15rem]" />
                <motion.div
                  className="mt-3"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={start || reduced ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <div className="font-display text-md leading-none">{letter.signoff.name}</div>
                  <div className="mono-label mt-2" style={{ fontSize: 10 }}>
                    {letter.signoff.title}
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={start || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [...ease.outExpo] }}
              >
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
              </motion.div>
            </div>
          </div>

          {/* Portrait — first on phones (a face before the words), beside the letter from md. */}
          <motion.figure
            className="order-first w-full max-w-[13rem] md:order-none md:max-w-[min(26rem,46svh)] md:justify-self-end"
            initial={reduced ? false : { opacity: 0, scale: 1.03 }}
            animate={start || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [...ease.outExpo] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
              <Image
                src={letter.portrait.src}
                alt={letter.portrait.alt}
                fill
                preload
                sizes="(max-width: 768px) 13rem, 26rem"
                className="object-cover object-[52%_30%]"
              />
            </div>
          </motion.figure>
        </div>
      </div>

      {/* Fact strip — the at-a-glance read. Hobbies are named as hobbies. */}
      <motion.div
        className="shell pb-8"
        initial={reduced ? false : { opacity: 0 }}
        animate={start || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <dl className="grid grid-cols-2 border-t border-border/70 md:grid-cols-3">
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
