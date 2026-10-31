import type Lenis from "lenis";

// Module-level handle to the active Lenis instance so any component can request
// a smooth scroll without threading a context through the tree. Falls back to
// native scrolling when Lenis is disabled (reduced-motion) or not yet mounted.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

type ScrollTarget = string | number | HTMLElement;

export function scrollTo(target: ScrollTarget, opts?: Record<string, unknown>) {
  if (instance) {
    instance.scrollTo(target, opts);
    return;
  }
  if (typeof window === "undefined") return;
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
