"use client";

import { useEffect, useState } from "react";

/**
 * A thin accent progress bar pinned to the top of the viewport — a quiet
 * cinematic wayfinding cue that also proves the scroll wiring. Reads window
 * scroll, so it works whether Lenis is active or native scrolling is in use.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (window.scrollY || el.scrollTop) / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[var(--z-nav)] h-[2px]">
      <div
        className="h-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
