"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { getLenis } from "@/lib/motion/lenisInstance";
import { ease } from "@/lib/motion/tokens";

const KEY = "v3-preloaded";

/**
 * Once-per-session title sequence: a 0→100 counter and a blur-to-focus name,
 * then a wipe-up reveal. Skippable (click / Skip button / Esc·Enter·Space).
 * Never re-fires on internal navigation (sessionStorage flag).
 *
 * An inline script in the root layout adds `is-preloading` to <html> before
 * paint (only when the flag is on, not reduced-motion, and not yet shown this
 * session) which hides content with no flash; this component owns removing it.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const shouldRun =
      site.flags.preloader &&
      !reduced &&
      root.classList.contains("is-preloading") &&
      !sessionStorage.getItem(KEY);

    if (!shouldRun) {
      root.classList.remove("is-preloading"); // reveal content if we're skipping
      return;
    }

    // One-time activation based on client-only state (sessionStorage + the
    // pre-paint <html> class); an effect is the correct place for this.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
    getLenis()?.stop();

    const start = performance.now();
    const DUR = 1100; // kept short: first-time visitors (recruiters) shouldn't wait
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      setCount(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduced]);

  function finish() {
    if (finished.current) return;
    finished.current = true;
    setCount(100);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setLeaving(true);
    window.setTimeout(() => {
      document.documentElement.classList.remove("is-preloading");
      getLenis()?.start();
      window.dispatchEvent(new Event("v3:preloaded")); // cue hero reveal
      setActive(false);
    }, 850);
  }

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base px-8 text-center"
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{ duration: 0.85, ease: [...ease.inOut] }}
      onClick={finish}
      role="status"
      aria-label="Loading"
    >
      <motion.p
        className="mono-label mb-8"
        style={{ color: "var(--accent-strong)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {site.role}
      </motion.p>
      <motion.div
        className="font-display text-3xl leading-[0.9]"
        initial={{ opacity: 0, filter: "blur(14px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [...ease.outExpo] }}
      >
        {site.name}
      </motion.div>

      <div className="mt-10 w-full max-w-xs">
        <div className="mb-2 flex items-center justify-between">
          <span className="mono-label">Loading</span>
          <span className="tabular-nums text-fg-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
            {count}%
          </span>
        </div>
        <div className="h-px w-full bg-border">
          <div className="h-full bg-accent" style={{ width: `${count}%` }} />
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="mono-label absolute bottom-8 right-8 text-fg-subtle transition-colors hover:text-fg"
        data-cursor
      >
        Skip →
      </button>
    </motion.div>
  );
}
