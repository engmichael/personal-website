/* Card illustrations for Leadership & Impact, ported from the v4 site's
   project covers and recoloured in the gold accent. Static SVG, the same on
   every render; hover motion lives in globals.css under "motifs" and
   triggers from a `.motif-host` ancestor. */

import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { Motif } from "@/content/achievements";

type Point = [number, number];

const delay = (ms: number) => ({ "--d": `${Math.round(ms)}ms` }) as CSSProperties;
const round = (n: number) => Math.round(n * 10) / 10;
const distance = (a: Point, b: Point) => Math.hypot(a[0] - b[0], a[1] - b[1]);

function Svg({ viewBox, className, children }: { viewBox: string; className: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      className={`${className} h-full w-full overflow-visible`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Seventeen campuses and their reach (EPOG Academy). */
function Rings() {
  const rows = [5, 4, 5, 3];
  const nodes = rows.flatMap((count, r) =>
    Array.from({ length: count }, (_, i) => [180 + (i - (count - 1) / 2) * 66, 50 + r * 60] as Point),
  );
  return (
    <Svg viewBox="0 0 360 280" className="m-rings">
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle className="ring" cx={x} cy={y} r={25} strokeOpacity={0.16} style={delay(i * 32)} />
          <circle className="ring" cx={x} cy={y} r={15} strokeOpacity={0.4} strokeWidth={1.5} style={delay(i * 32)} />
          <circle className="dot" cx={x} cy={y} r={4.5} />
        </g>
      ))}
    </Svg>
  );
}

/** 350 members, arranged like seeds in a sunflower (Texas Consulting). */
function Sunflower() {
  const count = 350;
  const golden = Math.PI * (3 - Math.sqrt(5));
  return (
    <Svg viewBox="0 0 300 300" className="m-sunflower">
      <g>
        {Array.from({ length: count }, (_, i) => {
          const r = 7.3 * Math.sqrt(i + 0.5);
          const a = i * golden;
          return (
            <circle
              key={i}
              cx={round(150 + r * Math.cos(a))}
              cy={round(150 + r * Math.sin(a))}
              r={round(1.6 + 1.5 * Math.sqrt(1 - i / count))}
              fillOpacity={round(1 - 0.62 * (i / count))}
            />
          );
        })}
      </g>
    </Svg>
  );
}

function bubblePath(x: number, y: number, w: number, h: number, r: number, sharp: "left" | "right") {
  const bl = sharp === "left" ? 3 : r;
  const br = sharp === "right" ? 3 : r;
  return [
    `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}`,
    `V${y + h - br}Q${x + w} ${y + h} ${x + w - br} ${y + h}`,
    `H${x + bl}Q${x} ${y + h} ${x} ${y + h - bl}`,
    `V${y + r}Q${x} ${y} ${x + r} ${y}Z`,
  ].join("");
}

/** Both sides of a debate round (Speech & Debate). */
function Dialogue() {
  const width = 360;
  const bubbles: { side: "left" | "right"; w: number; lines: number }[] = [
    { side: "left", w: 196, lines: 2 },
    { side: "right", w: 150, lines: 1 },
    { side: "left", w: 128, lines: 1 },
    { side: "right", w: 210, lines: 2 },
    { side: "left", w: 172, lines: 2 },
    { side: "right", w: 118, lines: 1 },
  ];
  let y = 6;
  const groups = bubbles.map((bubble, i) => {
    const h = bubble.lines === 2 ? 46 : 30;
    const x = bubble.side === "left" ? 6 : width - 6 - bubble.w;
    const top = y;
    y += h + 10;
    return (
      <g key={i} className={`bubble ${bubble.side}`} style={delay(i * 60)}>
        <path d={bubblePath(x, top, bubble.w, h, 13, bubble.side)} />
        {Array.from({ length: bubble.lines }, (_, j) => (
          <rect
            key={j}
            className="text"
            x={x + 14}
            y={top + 12.5 + j * 15}
            width={round((bubble.w - 28) * (bubble.lines === 2 && j === 1 ? 0.58 : 1))}
            height={5}
            rx={2.5}
          />
        ))}
      </g>
    );
  });
  return (
    <Svg viewBox={`0 0 ${width} ${y - 4}`} className="m-dialogue">
      {groups}
    </Svg>
  );
}

/** A 26.2-mile course with a marker at every mile (NYC Marathon). */
function Route() {
  const points: Point[] = [
    [26, 246],
    [80, 214],
    [64, 158],
    [128, 124],
    [188, 168],
    [240, 120],
    [214, 64],
    [282, 36],
    [334, 66],
  ];

  // Catmull-Rom through the points, as cubic Béziers.
  let d = `M${points[0][0]} ${points[0][1]}`;
  const samples: Point[] = [points[0]];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${p2[0]} ${p2[1]}`;
    for (let s = 1; s <= 40; s++) {
      const t = s / 40;
      const u = 1 - t;
      const at = (k: 0 | 1) => u * u * u * p1[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * p2[k];
      samples.push([at(0), at(1)]);
    }
  }

  const lengths = [0];
  for (let i = 1; i < samples.length; i++) lengths.push(lengths[i - 1] + distance(samples[i], samples[i - 1]));
  const total = lengths[lengths.length - 1];
  const miles = Array.from({ length: 26 }, (_, m) => {
    const target = (total * (m + 1)) / 26.2;
    const j = Math.max(1, lengths.findIndex((length) => length >= target));
    const f = (target - lengths[j - 1]) / (lengths[j] - lengths[j - 1] || 1);
    return [
      samples[j - 1][0] + (samples[j][0] - samples[j - 1][0]) * f,
      samples[j - 1][1] + (samples[j][1] - samples[j - 1][1]) * f,
    ] as Point;
  });
  const [start, finish] = [points[0], points[points.length - 1]];

  return (
    <Svg viewBox="0 0 360 280" className="m-route">
      <path className="road" d={d} />
      <path className="line" d={d} pathLength={1} />
      {miles.map(([x, y], i) => (
        <circle key={i} className="mile" cx={round(x)} cy={round(y)} r={2.3} />
      ))}
      <circle className="end" cx={start[0]} cy={start[1]} r={5.5} />
      <circle className="end" cx={finish[0]} cy={finish[1]} r={7} />
    </Svg>
  );
}

const MOTIFS: Record<Motif, () => ReactElement> = {
  rings: Rings,
  sunflower: Sunflower,
  dialogue: Dialogue,
  route: Route,
};

export function MotifArt({ motif }: { motif: Motif }) {
  const Art = MOTIFS[motif];
  return <Art />;
}
