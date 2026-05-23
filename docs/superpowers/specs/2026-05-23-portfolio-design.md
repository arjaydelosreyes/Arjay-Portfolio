# Arjay Delos Reyes — Portfolio Design Spec

**Date:** 2026-05-23
**Author:** Arjay Delos Reyes
**Status:** Approved

---

## Context

Arjay is a graduating BSIT student and full-stack developer seeking employment. The portfolio's job is to convert recruiter visits into interview conversations by demonstrating technical depth and standing out from other applicants. It must load fast, read cleanly, and make the most important information (projects, skills, contact) instantly accessible.

---

## Architecture

**Stack:** Next.js 15 (App Router) + Tailwind CSS + TypeScript

**Single-page application** at `/` — one route, all sections on one page, smooth scroll navigation. No API routes. Contact section uses `mailto:` link.

**Deployment:** Vercel (consistent with existing experience from Instroom).

```
arjay-portfolio/
├── app/
│   ├── layout.tsx         # root layout, fonts, ThemeProvider
│   ├── page.tsx           # composes all section components
│   └── globals.css        # OKLCH CSS variables, base resets
├── components/
│   ├── Navbar.tsx         # sticky, transparent-to-solid on scroll, dark/light toggle
│   ├── Hero.tsx           # full-viewport, name + tagline + CTAs
│   ├── About.tsx          # bio text + photo + certification
│   ├── Projects.tsx       # card grid, featured projects
│   ├── Skills.tsx         # grouped tag/pill layout
│   └── Contact.tsx        # centered, mailto CTA
├── lib/
│   └── data.ts            # all content as typed TS constants (projects, skills, bio)
└── public/
    ├── resume.pdf
    └── (project screenshots, profile photo)
```

All content is centralized in `lib/data.ts` — updating the portfolio never requires touching component logic.

---

## Sections

### Navbar
- Sticky. Starts transparent, transitions to solid background on scroll.
- Left: name or logo mark.
- Right: nav links (`About`, `Projects`, `Skills`, `Contact`) + dark/light toggle button.
- Mobile: hamburger menu, full-screen overlay nav.

### Hero
- Full viewport height (`min-h-screen`).
- Large heading: "Hi, I'm Arjay Delos Reyes"
- Subtitle: "Full-Stack Developer & AI Engineer"
- Tagline (1 line): "Building production-grade web applications with modern full-stack and AI tooling."
- Two CTAs: `View Projects` (smooth scroll to #projects) and `Download Resume` (links to `/resume.pdf`).
- Background: subtle static dot-grid pattern (CSS radial-gradient dots) — tasteful, not distracting.

### About
- Two-column layout (desktop), stacked (mobile).
- Left: 3-4 sentence bio drawn from resume summary. Certification badge (Certiport/CertNexus, Dec 2025).
- Right: profile photo placeholder (300x300, rounded).

### Projects
- 2-column card grid (desktop), 1-column (mobile).
- Each card: project name, short description (2 sentences max), tech stack tags, links (GitHub + live URL if available).
- Featured projects from `lib/data.ts`:
  1. **Instroom Post Tracker** — Multi-tenant B2B SaaS for influencer marketing agencies. Next.js 16, Supabase/PostgreSQL, Railway, Vercel. Live: posttracker.instroom.io
  2. **SagiTech** — AI platform for banana ripeness and yield prediction for Filipino farmers. React 18, Django REST, FastAPI, YOLOv8, Socket.IO.

### Skills
- Grouped by category, pill/tag layout. No animated progress bars.
- Categories (from resume):
  - Frontend: HTML, CSS, JavaScript, TypeScript, React 18, Next.js, Tailwind CSS, Vite
  - Backend: Node.js, Express, Python, Django REST, FastAPI, Socket.IO
  - Databases: MySQL, PostgreSQL, Supabase, Firebase, SQLite
  - AI/ML: YOLOv8, OpenCV, NumPy, PIL, Google Colab, Roboflow
  - Tools: Git/GitHub, Vercel, Railway, Google Drive API, Upstash Redis

### Contact
- Centered section, minimal.
- Short line: "Open to full-time and freelance opportunities."
- Email CTA button: `Get In Touch` (mailto:arjay09.adr43@gmail.com)
- Secondary links: GitHub icon, LinkedIn icon (if available).

---

## Styling System

### Register
Brand — the portfolio IS the product, not a tool that serves a product.

### Color Strategy
Restrained: tinted neutrals + one accent used at 10% or less of the surface.

### OKLCH Palette

All colors use OKLCH. Neutrals are tinted toward hue 250 (blue-cool). Accent is deep teal (hue 195) — uncommon in developer portfolios, professional, subtly references the AI/tech work.

```css
/* Light mode */
--color-bg:         oklch(98.5% 0.005 250);
--color-surface:    oklch(96%   0.006 250);
--color-text:       oklch(16%   0.010 250);
--color-text-muted: oklch(45%   0.012 250);
--color-accent:     oklch(55%   0.150 195);
--color-border:     oklch(90%   0.006 250);

/* Dark mode */
--color-bg:         oklch(11%   0.008 250);
--color-surface:    oklch(15%   0.008 250);
--color-text:       oklch(95%   0.005 250);
--color-text-muted: oklch(62%   0.010 250);
--color-accent:     oklch(72%   0.130 195);
--color-border:     oklch(22%   0.008 250);
```

Dark/light mode via `next-themes`.

### Typography

| Role | Font | Weight |
|---|---|---|
| Headings | Plus Jakarta Sans | 700–800 |
| Body | Inter | 400–500 |
| Tags / code | Geist Mono | 400 |

All fonts loaded via `next/font`. Body line length capped at 65ch. Heading-to-body size ratio: minimum 1.25 per step.

### Motion
- `fade-in-up` on section entry: 400ms, `ease-out-quart`, `translateY(24px → 0)`.
- No bounce, no elastic, no layout property animations.
- Respects `prefers-reduced-motion`.

### Absolute Bans (per impeccable)
- No gradient text (`background-clip: text`)
- No glassmorphism cards
- No side-stripe border accents
- No hero-metric template (big number + gradient accent)
- No identical repeated icon+heading+text cards

---

## Dark / Light Mode

- Default: **light mode** (scene: recruiter reading in a daylit office).
- Toggle: in navbar, icon-only button. Persists via `localStorage` through `next-themes`.
- No flash on load — `ThemeProvider` with `attribute="class"` and `disableTransitionOnChange`.

---

## Deployment

- **Platform:** Vercel
- **Domain:** Custom domain or `arjaydelosreyes.vercel.app`
- **Performance targets:** Lighthouse score 90+ on Performance, Accessibility, SEO

---

## Verification

1. `npm run dev` — all sections render, no console errors
2. Dark/light toggle works without flash; persists on refresh
3. Smooth scroll from nav links lands on correct sections
4. `Download Resume` link opens PDF in new tab
5. `Get In Touch` button opens email client with pre-filled address
6. Mobile layout (375px): hamburger menu opens, cards stack to 1 column
7. Lighthouse audit: Performance 90+, Accessibility 90+, SEO 90+
8. Deploy to Vercel: build succeeds, live URL works
