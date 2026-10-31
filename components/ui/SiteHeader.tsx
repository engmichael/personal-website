"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ease } from "@/lib/motion/tokens";

/**
 * Minimal persistent chrome: a name mark (→ home), section links, résumé, contact. Hides on
 * scroll-down and returns on scroll-up. Always visible under reduced-motion.
 */
const links = [
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Off the clock", href: "#off-the-clock" },
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
        <Link href="/" className="font-display text-lg tracking-tight" data-cursor>
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-fg-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-underline hidden hover:text-fg md:inline-block" data-cursor>
              {l.label}
            </a>
          ))}
          <a
            href={site.resume ?? site.linkedin}
            target={site.resume ? undefined : "_blank"}
            rel={site.resume ? undefined : "noopener noreferrer"}
            className="link-underline hover:text-fg"
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
