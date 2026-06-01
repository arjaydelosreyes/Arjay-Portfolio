'use client'

import type { CSSProperties } from 'react'
import { bio } from '@/lib/data'

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

function charStyle(delay: number): CSSProperties {
  return { animation: `charReveal 600ms ${EASE} ${delay}ms both` }
}

export default function Hero() {
  const firstName = 'Arjay'
  const lastName  = 'Delos Reyes'

  return (
    <section
      id="hero"
      className="film-grain relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Ambient glow — top-right, very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 80% 5%, oklch(97% 0.004 65 / 0.04) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 w-full pb-20 pt-28" style={{ zIndex: 2 }}>

        {/* Available badge */}
        <div className="mb-12" style={{ animation: `fade-in-up 500ms ${EASE} 200ms both` }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-muted text-[11px] font-medium tracking-[0.12em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" aria-hidden="true" />
            Available for work
          </span>
        </div>

        {/* Kinetic name — characters animate in individually */}
        <h1
          className="font-heading font-black leading-[0.87] tracking-[-0.04em] mb-0 select-none"
          style={{ fontSize: 'clamp(64px, 12vw, 140px)' }}
          aria-label={bio.name}
        >
          {/* "Arjay" — foreground */}
          <span className="block text-foreground" aria-hidden="true">
            {firstName.split('').map((c, i) => (
              <span key={i} className="inline-block" style={charStyle(300 + i * 55)}>
                {c}
              </span>
            ))}
          </span>
          {/* "Delos Reyes" — ghost tone for typographic depth */}
          <span className="block text-muted/40" aria-hidden="true">
            {lastName.split('').map((c, i) => (
              <span key={i} className="inline-block" style={charStyle(550 + i * 45)}>
                {c === ' ' ? ' ' : c}
              </span>
            ))}
          </span>
        </h1>

        {/* Horizontal rule — grows from left after name finishes */}
        <div className="hero-rule my-8 md:my-10" />

        {/* Meta row: title + CTAs */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ animation: `fade-in-up 700ms ${EASE} 1050ms both` }}
        >
          <p className="text-muted text-xs leading-relaxed max-w-[44ch] uppercase tracking-[0.07em]">
            {bio.title}
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              View Projects
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 8L8 2M8 2H4M8 2V6" />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download="Arjay_Delos_Reyes_Resume.pdf"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-border text-muted text-sm font-medium hover:text-foreground hover:border-foreground/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted"
        aria-hidden="true"
        style={{ animation: `fade-in-up 600ms ${EASE} 1300ms both`, zIndex: 2 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-border" />
      </div>
    </section>
  )
}
