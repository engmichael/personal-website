# PROGRESS — Personal Website v3 ("The Experience")

Running log of decisions, assumptions, and open items.

## Orientation
- **Live site is `../v2`** (`michaeleng.me`, static, Netlify, repo `engmichael/personal-website`). `../v1` is the 2023 original. **This build lives in `v3/` and is fully isolated** — the live site is never touched. (The brief calls the new build "v2"; on disk it is `v3`.)
- **Deploy target** (assumption, confirm at Phase 8): a **separate subdomain**, e.g. `experience.michaeleng.me`, on Vercel. Live site untouched.

## Locked decisions (kickoff Q&A)
1. **Direction:** Active-life story, cinematic — a life in motion; photography woven throughout.
2. **Photography:** Build the full system now (grid→detail morph, EXIF/caption data model, hover shader) with drop-in-ready, clearly-labeled placeholders + the few real shots.
3. **Look & type:** Dark, near-monochrome, warm **amber accent `#E8A15C`**; oversized **grotesk display + Inter** body.
4. **Wow moment:** **WebGL hero** (cursor-reactive), lazy-loaded + static fallback. **Opt-in sound** (off by default, persistent mute, never autoplay).

## DECISIONS (made by me — flag if you disagree)
- **Toolchain:** machine originally had **no Node** (only Python), so I bootstrapped Node 24.18 locally to unblock. **You have since installed Node v24.18.0 system-wide** (`/usr/local/bin`). Now using system Node + **`corepack pnpm`** (pinned via `packageManager: pnpm@11.15.0` in package.json) — no PATH prefix, no sudo. The dev-server launch config uses `corepack pnpm dev`. The old local `~/.local/node` is now redundant and safe to delete.
- **Fonts:** display = **Bricolage Grotesque** (variable, expressive modern grotesque), body = **Inter**, meta/EXIF = **Geist Mono** — all self-hosted via `next/font/google` (fetched at build, served from our origin; no runtime third-party requests). _Alt if you want a sharper fashion-grotesk: Clash Display (Fontshare) via next/font/local — I'll swap on request._
- **Framer Motion** installed under its current package name **`motion`** (`motion/react`); same library.
- **sharp** added as a direct dep for production image optimization (perf budget).

## Stack (installed)
Next.js 16.2.10 (App Router, Turbopack) · React 19.2.4 · TypeScript 5.9.3 · Tailwind CSS v4.3.3 · gsap 3.15 (+ScrollTrigger) · motion 12.42 · lenis 1.3.25 · three 0.185 · @react-three/fiber 9.6.1 · @react-three/drei 10.7.7 · sharp 0.35.3 · clsx + tailwind-merge.

## Phase log
### Phase 0 — Recon & scaffold ✅
- Inspected v1/v2; extracted real content (bio voice, full work history, 14 cities, eats guides, contact links, type pairing).
- Scaffolded Next.js in `v3/` (TS, Tailwind v4, ESLint, no `src` dir). typecheck / lint / build all green.
- Created brief's dir structure, `PROGRESS.md`, `NEEDS-ASSETS.md`, `.nvmrc`.

### Phase 1 — Design system + /styleguide  ✅ (awaiting sign-off)
- `styles/tokens.css` (color/type/motion/spacing/texture) → Tailwind `@theme` mapping in `app/globals.css`.
- Self-hosted fonts via `next/font/google`: Bricolage Grotesque (display), Inter (body), Geist Mono (meta).
- `lib/motion/tokens.ts` (JS easings/durations/springs mirroring the CSS).
- Grain + vignette overlays (reduced-motion → static/off), custom cursor (dot + follower + contextual labels), `useMagnetic` / `useReducedMotion` / `useIsTouch`, `MagneticButton`, `.link-underline`, skip-link.
- `/styleguide` route renders palette, type scale, controls, motion, cursor, texture, and feature flags.
- **Verified:** typecheck / lint / production build all green; `/styleguide` + `/` render with no console errors; computed styles confirm tokens (fg `#F4F1EA`, accent button `#17130C` on `#E8A15C`, mono `#A7A29A`); fluid type confirmed on desktop (~200px display) and mobile (375px → 54px, no overflow).
- **Bundle:** ~232 KB gzip total client JS across both routes combined; `motion` loads only on routes that use it; Three/GSAP/Lenis not yet in any bundle (code-split discipline intact). Precise per-route First Load JS → Phase 8 analyzer.
- Local review: `pnpm dev` → http://localhost:3000/styleguide (Node on PATH via `~/.local/node/bin`).

### Phase 1a — Design revisions (per your feedback)
- **Removed magnetic-to-cursor on buttons.** New `components/ui/Button.tsx` animates on its own: gentle lift, a fill that sweeps up on hover, optional arrow nudge, press scale. Fully stilled under reduced-motion. (Deleted `useMagnetic` + `MagneticButton`.)
- **Cursor made subtler / more aesthetic:** a precise dot + a thin softly-trailing ring, both `mix-blend-mode: difference` so it stays legible on any background; grows a little over interactive elements; no text labels. Native cursor on touch / reduced-motion.
- **Accent: keeping amber `#E8A15C` for now** (may revisit later). Explored warm (gold/ember/coral) and cool (cyan/electric-blue/iris-violet/emerald) alternatives on `/styleguide`; amber retained. Alternatives kept as a labeled reference strip on the styleguide for a future swap.

### Phase 2 — Global shell  ✅
- **Smooth scroll:** Lenis (`components/motion/SmoothScroll.tsx`) driven by the GSAP ticker and synced to ScrollTrigger (`lib/motion/gsap.ts`); window-scroller so no scrollerProxy. Off under reduced-motion. Module-level handle (`lib/motion/lenisInstance.ts`) exposes `scrollTo`.
- **Scroll progress:** thin accent bar pinned top (`ScrollProgress`) — verified fills 0→1 on scroll.
- **Page transitions:** `app/template.tsx` re-mounts per route → overlay wipe-up + content fade/rise, resets scroll to top. Instant under reduced-motion. Verified client-nav / → /styleguide.
- **Preloader:** once-per-session, flag-gated, reduced-motion-skipped title sequence (0→100 counter + blur-to-focus name + wipe reveal), skippable (click / Skip / Esc·Enter·Space). No-flash via a pre-paint `<html>.is-preloading` script; never re-fires on internal nav. Verified visually.
- **Chrome:** minimal `SiteHeader` (name mark + Contact), hides on scroll-down.
- **Hydration:** client libs mutate `<html>` (`lenis`) and `<body>` (`cursor-none`); resolved with `suppressHydrationWarning` on both + cursor moved off `<html>`. **Console clean, no errors.**
- typecheck / lint / build all green.

### Phase 3 — Hero (Scene 01)  ✅
- **WebGL wow moment:** cursor-reactive flowing amber fbm field (`components/three/HeroCanvas.tsx`, GLSL as template strings). Lazy via `next/dynamic({ ssr:false })` — Three/R3F land in a separate ~228 KB-gz chunk fetched only when the hero mounts, never in the critical path. Skipped on touch + reduced-motion.
- **Static fallback:** `.hero-gradient` (amber-on-near-black) for reduced-motion / touch / pre-WebGL paint, plus a left-weighted readability scrim so copy always has contrast.
- **Kinetic type:** masked line reveal ("A life" / "in motion.") with staggered expo easing; eyebrow + sub fade/rise. Reveal waits for the preloader to lift (`v3:preloaded` event) or fires immediately; instant under reduced-motion. Scroll cue animates (static under reduced-motion).
- Fix: reveal trigger uses `setTimeout`, not rAF (rAF pauses in hidden/background tabs).
- Verified: canvas mounts, shader renders a rich amber field, composition/type read well; typecheck/lint/build green. (rAF-driven motion can't be captured in the headless preview since the tab reports `hidden`.)
- **Bundle:** three/R3F isolated in the lazy ~228 KB-gz chunk; ~512 KB-gz total across all routes incl. that lazy chunk. Precise per-route First Load JS → Phase 8.

### Phase 4 — Scroll-storytelling chapters  ✅
- **8 chapters, your order**, data-driven from typed `/content/*` (edit content without touching components): `about`, `timeline`, `achievements`, `work`, `photos`, `places`, `eats`.
  1. **Motion / who I am** — real About voice (+ hobbies woven in).
  2. **Now / Trajectory** — timeline with a scroll-linked accent line (Plano → UT → Accenture/NYC → **Booth ’26**).
  3. **Achievements** — Kilimanjaro (19,341 ft), NYC Marathon (26.2 mi, $5,500), EPOG (500+ students) stat cards.
  4. **Work** — Waymo, Splunk & Kinaxis, Texas Consulting, Convergent.
  5. **Gallery** — GSAP-pinned **horizontal-scroll** strip (native swipe on touch/reduced-motion); real 2022 stand-ins + labeled placeholders (drop-in ready).
  6. **Places** — interactive **d3-geo world map** (vendored `land-110m.json`, lazy-loaded) with all 14 city pins + hover/tap notes.
  7. **Eats** — NYC ranked 15 + 5 featured write-ups.
  8. **Contact** — outro with real links + footer.
- Mechanics: `Chapter` wrapper (numbered header + per-scene accent grade), `Reveal` (scroll-in, reduced-motion aware), pinned horizontal (Gallery), scroll-linked timeline. Covers the brief's pinned/horizontal/parallax/color-graded variety.
- Verified: typecheck / lint / build green; Achievements + Work captured; map renders (14 pins); console clean. (Below-the-fold reveal animations can't be screenshotted in the headless preview — best seen live.)
- **This also delivers Phase 6** (animated Now/Trajectory timeline + Contact). Remaining: **Phase 5** photography centerpiece (needs your photos), **Phase 7** sound, **Phase 8** polish/perf/a11y/deploy.
- **Bundle:** ~554 KB-gz total across all routes incl. the lazy three (~228 KB) + map chunks; initial critical path excludes both.

## Open items / ASK (to resolve with you)
- **Chapter list** — proposed spine: Motion (who I am) → Photography → Endeavors (Kilimanjaro, Marathon) → Now/trajectory (LIC → Chicago/Booth) → Contact. Confirm order + which photos/projects headline each.
- **Scope:** feature the **résumé** (a PDF exists in `../v1/assets`)? the **Sik Wu app** (no details on hand)? **writing**? Fold in existing **Places/Eats**? _Assumption for now: résumé = quiet download; Sik Wu excluded pending details; writing out of scope; Places/Eats available as an optional "Explorer" chapter._
- **Photo set** — the big one (see `NEEDS-ASSETS.md`).
- **Facts:** ✅ **New York** (not Long Island City) — applied across `site`, `about`, `timeline`. Hobbies reframed as an **"Off the clock"** block in the Motion chapter (throughline line + tags: Photography · Guitar · Volleyball · Pickleball · Travel · Food · Design). Still to confirm: the **Sony A7 IV** framing (kept for now).
- **Deploy subdomain** name.

### Phase 8 (partial) — Polish & deploy prep
- Added site `url` (env `NEXT_PUBLIC_SITE_URL`, default `https://experience.michaeleng.me` — assumed), canonical, OpenGraph/Twitter metadata, theme-color, generated OG image (`app/opengraph-image.tsx`), `robots.txt`, `sitemap.xml`, favicons (`app/icon.png`, `app/apple-icon.png` from v2).
- `/styleguide` now `noindex` and disallowed in robots.
- Removed dead Beli link (`href="#"`); add the real URL in `content/site.ts`.
- tsc, lint, production build green; head tags verified; no horizontal scroll at 375px.
- Still open: confirm domain, real photos, sound, timeline wording (Booth "Fall 2026" is now current), Lighthouse pass.

- Copy updated: Booth is now current (Chicago "Based in", timeline, places, metadata). Assumed Chicago-based — revert if not.

### Recruiter-first reframe (2026-10-29)
- **New order:** Hero → 01 Who I am → 02 Experience → 03 Leadership & impact → 04 Off the clock (04.1 Photography · 04.2 Travel · 04.3 Food) → 05 Contact. Timeline chapter removed (folded into Experience + Education).
- **Hero:** name as H1, "Strategy and operations for businesses in motion.", Waymo proof point, "Recruiting for Summer 2027" pill, Get in touch + LinkedIn/Résumé CTAs, and a fact strip (Now · Previously · Focus · Off the clock). "A life in motion." now opens the hobbies chapter.
- **Header:** Experience · Leadership · Off the clock · LinkedIn/Résumé · Contact. Lenis `anchors: true` for smooth in-page links. Preloader shortened to 1.1s.
- **About:** headshot added; hobby blocks moved to Off the clock. **Leadership:** EPOG, Texas Consulting, NYC Marathon + Booth groups.
- **Gallery:** removed placeholders and two non-photos (`naruto.jpeg` fan art, `rainbow.jpeg` wallpaper); fixed years (2020/2021 per EXIF) and orientations; pinned horizontal scroll replaced with an editorial grid.
- **Food:** Atomix note rewritten (visited); 3 featured notes shown; ranked list in two columns.
- **Confirmed:** recruiting for Summer 2027 strategy consulting internships (`site.seeking`).
- **To confirm:** UT majors in `content/work.ts`, Booth MBA years (2026–2028), Atomix note wording. `site.resume` is null until a current PDF is added at `public/resume.pdf` (the 2021 PDF in v1 is too old to link).
