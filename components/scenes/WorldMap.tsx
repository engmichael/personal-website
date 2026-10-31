"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import landTopo from "@/content/land-110m.json";
import { places } from "@/content/places";

const W = 1000;
const H = 500;

/** Equirectangular world map with gold pins for each place. SVG (no rAF), so it
 *  renders statically and is fine under reduced-motion. Hover/tap a pin for the note. */
export function WorldMap() {
  const { landPath, pins } = useMemo(() => {
    const projection = geoEquirectangular().fitSize([W, H], { type: "Sphere" } as any);
    const path = geoPath(projection);
    const topo = landTopo as any;
    const land = feature(topo, topo.objects.land) as any;
    return {
      landPath: path(land) ?? "",
      pins: places.map((p) => {
        const c = projection([p.lng, p.lat]);
        return { ...p, x: c ? c[0] : 0, y: c ? c[1] : 0 };
      }),
    };
  }, []);

  const [active, setActive] = useState<string | null>(null);
  const activePlace = pins.find((p) => p.id === active);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="World map of the places Michael has spent time in"
      >
        <path d={landPath} fill="var(--surface-2)" stroke="var(--border)" strokeWidth={0.5} />
        {pins.map((p) => (
          <g
            key={p.id}
            transform={`translate(${p.x}, ${p.y})`}
            className="cursor-pointer"
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive((a) => (a === p.id ? null : p.id))}
          >
            <circle
              r={p.featured ? 5 : 3.5}
              fill="var(--accent)"
              opacity={active === p.id ? 1 : 0.85}
            />
            <circle r={12} fill="transparent" />
          </g>
        ))}
      </svg>

      {activePlace && (
        <div
          className="pointer-events-none absolute z-10 w-56 max-w-[70vw] -translate-x-1/2 -translate-y-[120%] rounded-[var(--radius)] border border-border bg-base/95 p-3 shadow-lg"
          style={{ left: `${(activePlace.x / W) * 100}%`, top: `${(activePlace.y / H) * 100}%` }}
        >
          <div className="font-display text-sm">{activePlace.name}</div>
          <div className="mt-1 text-fg-muted" style={{ fontSize: 12 }}>
            {activePlace.desc}
          </div>
        </div>
      )}
    </div>
  );
}
