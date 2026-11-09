/* Site-wide configuration + feature flags. Single source of truth for
   identity, links, and the global toggles the brief calls for. Editing
   content here must never require touching components. */

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const site = {
  name: "Michael Eng",
  shortName: "Michael",
  // Shown on the loading screen and in the page title. Photography, travel and food
  // are framed as the life around the work (see the "Off the Clock" chapter).
  role: "MBA Candidate @ Chicago Booth",
  tagline: "A life in motion.",
  // Shown in the hero badge, the Contact kicker, and the Contact copy.
  seeking: {
    badge: "Recruiting · Summer 2027",
    sentence: "I'm recruiting for Summer 2027 internships",
  },
  // Current résumé (public/Michael-Eng-Resume.pdf). Set to null to fall back to LinkedIn.
  resume: "/Michael-Eng-Resume.pdf" as string | null,
  linkedin: "https://www.linkedin.com/in/eng-michael/",
  instagram: "https://instagram.com/engmichael_",
  // Shown under Travel and Food.
  flighty: "https://friends.flighty.com/0ea041ea-7961-4768-9b10-26d2cbfa77a6",
  beli: "https://beliapp.co/app/engmichael",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://michaeleng.me",
  email: "engmichael@icloud.com",
  socials: [
    { label: "Email", handle: "engmichael@icloud.com", href: "mailto:engmichael@icloud.com" },
    { label: "LinkedIn", handle: "in/eng-michael", href: "https://www.linkedin.com/in/eng-michael/" },
    { label: "Instagram", handle: "@engmichael_", href: "https://instagram.com/engmichael_" },
    // Beli link omitted until a real profile URL is available.
  ] satisfies SocialLink[],

  /* Feature flags — global toggles (§3, §7 of the brief). All motion-
     related flags additionally defer to prefers-reduced-motion at runtime. */
  flags: {
    preloader: true, // once-per-session title sequence
    grain: true, // film-grain overlay
    vignette: true,
    customCursor: false, // native cursor — the custom ring read as too much
    webglHero: true, // the WebGL "wow moment" (lazy, static fallback)
    brushMark: false, // 吳 drawn stroke by stroke in the hero (components/ui/WuBrush) — parked for now
    sound: false, // opt-in ambient/SFX — never autoplay
  },
} as const;

export type Site = typeof site;
