"use client";

import { useEffect, useId, useRef, useState } from "react";
import { WU_PATH, WU_STROKES, WU_TRANSFORM, WU_VIEWBOX } from "@/lib/brand/wu";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

/** Catmull-Rom through the centerline points, emitted as cubic Béziers. */
function smoothPath(p: [number, number][]) {
  if (p.length < 3) return `M${p.map((q) => q.join(" ")).join(" L")}`;
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const SEGMENTS = WU_STROKES.flatMap((stroke, s) =>
  stroke.map((seg, i) => ({
    d: smoothPath(seg.p),
    w: seg.w,
    stroke: s,
    first: i === 0,
    last: i === stroke.length - 1,
  })),
);

const SPEED = 0.7; // path units per ms while the brush is moving
const LIFT = 170; // ms between strokes, while the brush lifts and resets
const EASE = {
  only: "cubic-bezier(0.45, 0, 0.25, 1)",
  land: "cubic-bezier(0.45, 0, 1, 1)",
  lift: "cubic-bezier(0, 0, 0.25, 1)",
  move: "linear",
};

type Props = {
  className?: string;
  /** Begin drawing (e.g. once the preloader lifts). */
  start?: boolean;
  /** Seconds to wait after `start` before the first stroke. */
  delay?: number;
};

/**
 * The 吳 mark drawn stroke by stroke in standard stroke order, like a brush.
 * Each stroke's centerline is a thick, slightly softened line in a mask over
 * the calligraphy; its dash grows from 0 to the full length (pathLength = 1).
 * When the last stroke lands, the solid mark fades in to settle any slivers.
 * Reduced motion: the finished mark, no animation. Fill uses currentColor.
 */
export function WuBrush({ className, start = true, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const maskRef = useRef<SVGGElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced || !start || !maskRef.current) return;
    const paths = Array.from(maskRef.current.querySelectorAll<SVGPathElement>("path"));
    const anims: Animation[] = [];
    let t = delay * 1000;
    paths.forEach((el, i) => {
      const seg = SEGMENTS[i];
      if (i > 0 && seg.first) t += LIFT;
      const duration = Math.max(160, el.getTotalLength() / SPEED);
      const easing = seg.first && seg.last ? EASE.only : seg.first ? EASE.land : seg.last ? EASE.lift : EASE.move;
      anims.push(
        el.animate([{ strokeDashoffset: 1.05 }, { strokeDashoffset: 0 }], {
          duration,
          delay: t,
          easing,
          fill: "both",
        }),
      );
      t += duration;
    });
    // Settle when the last stroke actually lands (not on a timer, which can
    // run ahead of the animation clock in throttled or background tabs).
    let alive = true;
    anims[anims.length - 1]?.finished.then(
      () => alive && setDone(true),
      () => {}, // cancelled on unmount
    );
    return () => {
      alive = false;
      anims.forEach((a) => a.cancel());
    };
  }, [reduced, start, delay]);

  const settled = reduced || done;

  return (
    <svg viewBox={WU_VIEWBOX} className={cn("block aspect-[756/1100]", className)} aria-hidden focusable="false">
      <defs>
        <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="760">
          <g ref={maskRef} filter={`url(#${id}-soft)`} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
            {SEGMENTS.map((s, i) => (
              <path
                key={i}
                d={s.d}
                strokeWidth={s.w}
                pathLength={1}
                strokeDasharray="1 2"
                strokeDashoffset={reduced ? 0 : 1.05}
              />
            ))}
          </g>
        </mask>
      </defs>
      <g transform={WU_TRANSFORM} fill="currentColor">
        <path fillRule="evenodd" d={WU_PATH} mask={`url(#${id}-mask)`} />
        <path
          fillRule="evenodd"
          d={WU_PATH}
          style={{ opacity: settled ? 1 : 0, transition: reduced ? undefined : "opacity 600ms ease-out" }}
        />
      </g>
    </svg>
  );
}
