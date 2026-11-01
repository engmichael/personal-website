"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ease } from "@/lib/motion/tokens";
import { SeekingBadge } from "./SeekingBadge";

/**
 * Minimal persistent chrome: the 吳 mark, a hairline divider and the name (→ home),
 * section links, the recruiting pill (xl+), résumé, contact. Hides on
 * scroll-down and returns on scroll-up. Always visible under reduced-motion.
 */
const links = [
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Off the Clock", href: "#off-the-clock" },
];

export function SiteHeader() {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 140 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[var(--z-nav)]"
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [...ease.outExpo] }}
    >
      <div className="shell flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-4" data-cursor aria-label={`${site.name}, home`}>
          <Image
            src="/brand/wu-white.svg"
            alt=""
            width={756}
            height={1100}
            unoptimized
            priority
            className="h-8 w-auto"
          />
          <span aria-hidden className="h-6 w-px bg-fg/25" />
          <span className="font-display text-[0.95rem] font-semibold uppercase leading-none tracking-[0.3em]">
            {site.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-fg-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-underline hidden hover:text-fg md:inline-block" data-cursor>
              {l.label}
            </a>
          ))}
          <SeekingBadge className="hidden xl:inline-flex" />
          <a
            href={site.resume ?? site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hidden hover:text-fg sm:inline-block"
            data-cursor
          >
            {site.resume ? "Résumé" : "LinkedIn"}
          </a>
          <a
            href="#contact"
            className="rounded-[var(--radius)] border border-border px-3 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent"
            data-cursor
          >
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
