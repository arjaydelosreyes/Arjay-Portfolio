'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import { bio } from '@/lib/data'
import WordReveal from '@/components/WordReveal'
import { gsap } from '@/lib/gsap'

export default function About() {
  const { resolvedTheme } = useTheme()
  const photoSrc = resolvedTheme === 'dark' ? '/arjay-dark.jpg' : '/arjay-light.jpg'
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 24,
        opacity: 0,
        duration: 0.45,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">

        <div data-reveal className="section-label">About</div>

        <WordReveal
          className="font-heading font-extrabold text-foreground mb-14"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          delay={80}
          stagger={55}
        >
          {`Fresh Graduate. Full-Stack Developer building production-grade apps and AI automations.`}
        </WordReveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <p data-reveal className="text-muted leading-relaxed max-w-[65ch]">
            {bio.summary}
          </p>

          {/* Right: photo + credentials + location (desktop) */}
          <div className="hidden md:flex flex-col gap-5">
            <div data-reveal className="group relative w-full aspect-[2/3] overflow-hidden rounded-2xl border border-border">
              <Image src={photoSrc} alt="Arjay Delos Reyes" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" sizes="(min-width: 768px) 50vw, 0px" unoptimized />
            </div>
            <div data-reveal>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface hover:border-accent/40 hover:shadow-[0_4px_24px_oklch(60%_0.195_50/0.07)] transition-[border-color,box-shadow] duration-300">
                <div className="mt-0.5 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{bio.certification.name}</p>
                  <p className="text-xs text-muted mt-1">{bio.certification.issuer} · {bio.certification.date}</p>
                </div>
              </div>
            </div>

            <p data-reveal className="group text-sm text-muted flex items-center gap-2 hover:text-foreground transition-colors duration-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {bio.location}
            </p>
          </div>

          {/* Mobile: credentials + photo */}
          <div className="md:hidden flex flex-col gap-5">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface">
              <div className="mt-0.5 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{bio.certification.name}</p>
                <p className="text-xs text-muted mt-1">{bio.certification.issuer} · {bio.certification.date}</p>
              </div>
            </div>

            <p className="text-sm text-muted flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="shrink-0" aria-hidden="true">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {bio.location}
            </p>

            <div className="flex justify-center mt-2">
              <div className="relative w-72 aspect-[2/3] overflow-hidden rounded-2xl border border-border">
                <Image src={photoSrc} alt="Arjay Delos Reyes" fill className="object-cover" sizes="288px" priority unoptimized />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
