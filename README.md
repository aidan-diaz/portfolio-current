# portfolio-current

Retro pixel-art portfolio for Aidan Diaz. Built with **Vite + React 19 + TypeScript**, plain **CSS Modules**, **framer-motion** for in-view section transitions, and **Howler.js** (with a WebAudio synth fallback) for 8-bit SFX. Deploys to **Netlify** with **Netlify Forms** wired into the contact section.

Live site: https://aidandiaz.netlify.app/ (replaces the old HTML5Up build)

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # strict tsc --noEmit
```

Node 20+ recommended (matches `netlify.toml`).

---

## Project structure

```
portfolio-current/
  index.html               # contains the hidden Netlify form for build-time detection
  netlify.toml             # build + redirects + asset caching
  vite.config.ts
  public/
    sounds/                # optional 8-bit SFX (see public/sounds/README.md)
    projects/              # project thumbnails (optional — placeholder used if missing)
    avatar.png             # your headshot for the About Me section (optional)
    favicon.png
  src/
    main.tsx               # bootstraps React + SoundProvider
    App.tsx                # shell: IntroScreen + Navbar + sections + Footer + ScanlineOverlay
    types.ts               # shared types: Project, SocialLink
    data/
      projects.ts          # <-- ADD NEW PORTFOLIO ENTRIES HERE
      socials.ts           # <-- UPDATE SOCIAL LINK URLs HERE
    sound/
      SoundContext.ts
      SoundProvider.tsx
    hooks/
      useSound.ts          # Howler + WebAudio synth fallback, respects global mute
      useReducedMotion.ts
    styles/
      tokens.css           # palette, fonts, spacing — single source of truth for the look
      global.css           # resets + base typography + reduced-motion overrides
    components/
      IntroScreen/         # "PRESS START" splash, dismiss on key/click
      Navbar/              # sticky pixel nav + skip link + sound toggle
      Hero/                # title, tagline, pixel avatar, primary CTAs, social row
      Portfolio/           # grid + reusable ProjectCard
      AboutMe/             # photo + bio + "stats"
      Contact/             # Netlify form + status dialog + email fallback
      SocialLinks/         # icon row used in Hero / Contact
      PixelButton/         # reusable retro <button>/<a> with hover+click SFX
      DialogBox/           # RPG-style bordered panel (available for new sections)
      SectionTransition/   # framer-motion fade+slide in-view wrapper
      SoundToggle/         # mute/unmute (uses SoundContext)
      ScanlineOverlay/     # CRT scanlines + vignette
      Footer/
```

---

## How to update content

Most things are data-driven so you don't need to touch the markup:

| Want to change…                  | Edit                                                    |
| -------------------------------- | ------------------------------------------------------- |
| Hero title / tagline             | `TITLE` and `TAGLINE` in `src/components/Hero/Hero.tsx` |
| Bio paragraphs                   | `BIO` array in `src/components/AboutMe/AboutMe.tsx`     |
| "Player stats" next to the photo | `STATS` array in `src/components/AboutMe/AboutMe.tsx`   |
| Headshot                         | Drop `public/avatar.png`                                |
| Add / edit / remove a project    | `src/data/projects.ts`                                  |
| Project thumbnails               | Drop into `public/projects/` and reference in the data  |
| Social URLs (GitHub, etc.)       | `src/data/socials.ts`                                   |
| Color palette / fonts / spacing  | `src/styles/tokens.css`                                 |
| Sound effects                    | Drop wav files into `public/sounds/` (optional)         |

### Adding a new project

```ts
// src/data/projects.ts
export const PROJECTS: ReadonlyArray<Project> = [
  // ...existing entries
  {
    id: "my-new-project",
    title: "My New Project",
    description: "One or two short sentences describing what it does.",
    thumbnail: "/projects/my-new-project.png", // optional
    githubUrl: "https://github.com/aidanldiaz/my-new-project",
    liveUrl: "https://my-new-project.example.com", // omit if no live site
    techStack: ["React", "TypeScript"], // optional
  },
];
```

That's it — `<Portfolio />` will render a new `<ProjectCard />` automatically and the responsive grid will reflow.

---

## Sound effects

`public/sounds/` is optional. If a `.wav` is missing, `useSound` falls back to a chiptune-style WebAudio beep so the UX still has audio without bundling assets. See `public/sounds/README.md` for the file slots and recommended sources.

The mute toggle defaults to **off** (muted) on first visit and persists to `localStorage` under `portfolio:sound-muted`.

---

## Contact form (Netlify Forms)

The contact form uses Netlify's no-config form handling.

1. The hidden static form in [`index.html`](index.html) registers the `contact` form at build time.
2. The React form in [`src/components/Contact/Contact.tsx`](src/components/Contact/Contact.tsx) submits to `/` via `fetch` with `Content-Type: application/x-www-form-urlencoded` and `form-name=contact`, then shows an inline success or error message.
3. Submissions appear in your Netlify dashboard under **Forms → contact**. Configure email notifications there.
4. A `mailto:` button is shown alongside as a graceful fallback if the form ever fails.

A simple honeypot field (`bot-field`) is included; for stronger protection enable Netlify's reCAPTCHA from the dashboard.

If you ever want richer email handling, swap to [Resend](https://resend.com) + a Netlify Function — keep the same form fields and only the submit handler changes.

---

## Deployment

Already on Netlify? Connect this repo, and Netlify will pick up `netlify.toml` automatically.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
[build.environment]
  NODE_VERSION = "20"
```

Manually:

```bash
npm install
npm run build
# upload dist/ to Netlify
```

---

## Accessibility notes

- Skip-to-content link is the first focusable element.
- Sound defaults to muted; toggle is keyboard-reachable and labelled.
- Intro screen auto-skips when `prefers-reduced-motion` is set.
- All animations (intro, scanlines, section transitions, avatar bob, brand pulse) are gated on `prefers-reduced-motion`.
- Pixel display font is reserved for short headings/UI; body text uses `VT323` at ≥18px for legibility.
- Form errors include text + iconography, not just color.
- Project cards have semantic `<article>` + `aria-labelledby` linked to the project title.

---

## Tech stack

- [Vite](https://vitejs.dev/) — build tool
- [React 19](https://react.dev/) + TypeScript (strict mode, `verbatimModuleSyntax`)
- [framer-motion](https://www.framer.com/motion/) — section in-view animations
- [Howler.js](https://howlerjs.com/) — audio playback (with WebAudio synth fallback)
- [Netlify](https://www.netlify.com/) — hosting + Forms
- Google Fonts: **Press Start 2P** + **VT323**
