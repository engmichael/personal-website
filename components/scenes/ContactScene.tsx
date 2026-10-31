import { Chapter } from "./Chapter";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

/** Chapter 05 — Contact / outro. */
export function ContactScene() {
  return (
    <Chapter id="contact" num="05" title="Contact" kicker="Recruiting · Summer 2027" glow="50% 38%">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <Reveal>
            <h3 className="font-display text-2xl leading-[1.06]">
              The best ideas start as a coffee, a long walk, or a{" "}
              <span className="text-accent">half-formed text</span>.
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-prose text-fg-muted">
              {site.seeking.sentence}, and always glad to talk shop. I&apos;m easy to reach, and I
              answer — whether it&apos;s a role, a project, or a restaurant I have to try.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} arrow cursorLabel="Email">
                Email me
              </Button>
              <Button href={site.resume ?? site.linkedin} variant="outline" cursorLabel="Open" external>
                {site.resume ? "Download résumé" : "View LinkedIn"}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="border-t border-border/60">
            {site.socials.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group flex items-center gap-4 border-b border-border/60 py-4"
                    data-cursor
                    data-cursor-label="Open"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <span className="mono-label w-20 shrink-0" style={{ fontSize: 10 }}>
                      {s.label}
                    </span>
                    <span className="text-fg-muted transition-colors group-hover:text-fg">
                      {s.handle}
                    </span>
                    <span className="ml-auto text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-6 text-sm text-fg-subtle">
        <span>© 2026 Michael Eng</span>
        <span className="mono-label" style={{ fontSize: 10 }}>
          A small record, kept honestly.
        </span>
      </footer>
    </Chapter>
  );
}
