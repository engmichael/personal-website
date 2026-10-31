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
  // Recruiter-first: what I do leads; photography, travel and food are framed
  // as the life around it (see the "Off the clock" chapter).
  role: "Strategy & Operations · MBA Candidate, Chicago Booth",
  tagline: "A life in motion.",
  // Shown in the hero badge, the Contact kicker, and the Contact copy.
  seeking: {
    badge: "Recruiting · Summer 2027 strategy consulting",
    sentence: "I'm recruiting for Summer 2027 strategy consulting internships",
  },
  // Drop a current PDF at public/resume.pdf and set this to "/resume.pdf".
  // While null, résumé buttons fall back to LinkedIn.
  resume: null as string | null,
  linkedin: "https://www.linkedin.com/in/eng-michael/",
  instagram: "https://instagram.com/engmichael_",
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
    customCursor: true,
    webglHero: true, // the WebGL "wow moment" (lazy, static fallback)
    sound: false, // opt-in ambient/SFX — never autoplay
  },
} as const;

export type Site = typeof site;
