import { site } from "@/content/site";

/** Gentle radial vignette to focus the frame — pure CSS, no motion. */
export function Vignette() {
  if (!site.flags.vignette) return null;
  return <div className="vignette-layer" aria-hidden />;
}
