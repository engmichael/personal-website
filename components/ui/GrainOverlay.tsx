import { site } from "@/content/site";

/**
 * Animated film-grain overlay. GPU-cheap (a translated SVG-noise layer).
 * Goes static automatically under prefers-reduced-motion (see globals.css).
 */
export function GrainOverlay() {
  if (!site.flags.grain) return null;
  return <div className="grain-layer" aria-hidden />;
}
