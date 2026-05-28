'use client'

import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import { bio } from '@/lib/data'

export default function Hero() {
  const { resolvedTheme } = useTheme()
  const photoSrc = resolvedTheme === 'dark' ? '/arjay-dark.jpg' : '/arjay-light.jpg'

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 w-full py-24 pt-28">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">

          {/* Text content — left */}
          <div style={{ animation: 'fade-in-up 600ms cubic-bezier(0.32,0.72,0,1) both' }}>
            {/* Eyebrow pill badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              Available for work
            </span>

            <h1
              className="font-heading font-extrabold text-foreground leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', textWrap: 'balance' } as React.CSSProperties}
            >
              {bio.name}
            </h1>
            <p className="font-heading font-semibold text-xl sm:text-2xl text-muted mb-4">
              {bio.title}
            </p>
            <p className="text-muted text-base max-w-[52ch] mb-10 leading-relaxed">
              {bio.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary CTA — Button-in-Button */}
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-semibold text-sm hover:opacity-95 transition-opacity duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                View Projects
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 8L8 2M8 2H4M8 2V6" />
                  </svg>
                </span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-surface transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Profile photo — right, desktop only */}
          <div
            className="hidden md:block"
            style={{ animation: 'fade-in-up 600ms 180ms cubic-bezier(0.32,0.72,0,1) both' }}
          >
            {/* Double-Bezel photo frame */}
            <div className="p-1.5 rounded-[1.75rem] border border-border/50 bg-surface/40">
              <div className="relative w-60 lg:w-68 aspect-[2/3] overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
                <Image
                  src={photoSrc}
                  alt="Arjay Delos Reyes"
                  fill
                  className="object-cover"
                  sizes="288px"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        aria-hidden="true"
        style={{ animation: 'fade-in-up 600ms 800ms cubic-bezier(0.32,0.72,0,1) both' }}
      >
        <span className="text-[10px] tracking-widest uppercase opacity-50">Scroll</span>
        <div className="w-px h-7 bg-border opacity-50" />
      </div>
    </section>
  )
}
