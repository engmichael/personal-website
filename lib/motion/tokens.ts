/* JS-side motion constants — mirror styles/tokens.css so GSAP and Motion
   share the site's easing + timing language. Import these instead of
   hard-coding durations/curves in components. */

/** Cubic-bezier control points for Motion (`transition={{ ease }}`). */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOut: [0.76, 0, 0.24, 1],
  outBack: [0.34, 1.56, 0.64, 1],
} as const;

/** Seconds. */
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  slower: 1.4,
} as const;

/** Stagger steps (seconds). */
export const stagger = {
  tight: 0.04,
  base: 0.06,
  wide: 0.1,
} as const;

/** Named springs for interactions. */
export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 1 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.5 },
} as const;

/** GSAP string easings (for `gsap.to(..., { ease })`). */
export const gsapEase = {
  outExpo: "expo.out",
  outQuart: "quart.out",
  inOut: "power4.inOut",
} as const;

/** Common reveal transition for enter animations. */
export const reveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease: ease.outExpo },
} as const;
