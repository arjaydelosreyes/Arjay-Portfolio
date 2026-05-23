# Design System

## Color Strategy
Restrained: tinted neutrals + one teal accent at ≤10% of the surface.

## Colors (OKLCH, via CSS variables)

Light mode:
- Background: oklch(98.5% 0.005 250)
- Surface:     oklch(96% 0.006 250)
- Foreground:  oklch(16% 0.010 250)
- Muted:       oklch(45% 0.012 250)
- Accent:      oklch(55% 0.150 195) — deep teal
- Border:      oklch(90% 0.006 250)

Dark mode:
- Background: oklch(11% 0.008 250)
- Surface:    oklch(15% 0.008 250)
- Foreground: oklch(95% 0.005 250)
- Muted:      oklch(62% 0.010 250)
- Accent:     oklch(72% 0.130 195)
- Border:     oklch(22% 0.008 250)

## Typography
- Headings: Plus Jakarta Sans 700-800
- Body: Inter 400-500
- Tags/code: Geist Mono 400
- Body line length: max 65ch

## Motion
- fade-in-up on section entry: 400ms ease-out-quart, translateY(24px to 0)
- Respects prefers-reduced-motion

## Absolute Bans
- No gradient text (background-clip: text)
- No glassmorphism cards
- No side-stripe border accents
- No animated skill bars
