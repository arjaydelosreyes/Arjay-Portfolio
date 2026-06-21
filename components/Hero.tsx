'use client'

import { useEffect, useRef } from 'react'
import { bio } from '@/lib/data'
import { gsap } from '@/lib/gsap'
import SplitType from 'split-type'

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null)
  const firstNameRef = useRef<HTMLSpanElement>(null)
  const lastNameRef  = useRef<HTMLSpanElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)
  const ruleRef      = useRef<HTMLDivElement>(null)
  const metaRef      = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const splitFirst = new SplitType(firstNameRef.current!, { types: 'chars' })
    const splitLast  = new SplitType(lastNameRef.current!,  { types: 'chars' })

    const chaosVars = {
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
      stagger: 0.04,
    }

    const tl = gsap.timeline()

    tl.from(badgeRef.current, { y: 16, opacity: 0, duration: 0.5, ease: 'expo.out' }, 0)
      .from(splitFirst.chars!, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
        rotation: () => gsap.utils.random(-180, 180),
        scale: 0,
        opacity: 0,
        ...chaosVars,
      }, 0.1)
      .from(splitLast.chars!, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
        rotation: () => gsap.utils.random(-180, 180),
        scale: 0,
        opacity: 0,
        ...chaosVars,
      }, 0.5)
      .from(ruleRef.current, { scaleX: 0, transformOrigin: 'left center', duration: 0.5, ease: 'expo.out' }, 1.3)
      .from(metaRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'expo.out' }, 1.6)
      .from(scrollCueRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'expo.out' }, 1.9)

    // Scroll cue float
    const line = scrollCueRef.current?.querySelector<HTMLElement>('.scroll-cue-line')
    if (line) {
      gsap.to(line, { y: -6, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5 })
    }

    return () => {
      tl.kill()
      splitFirst.revert()
      splitLast.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="film-grain relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* Ambient glow — top-right, very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 80% 5%, oklch(97% 0.004 65 / 0.04) 0%, transparent 100%)',
          animation: 'glow-pulse 6s ease-in-out infinite',
          zIndex: 1,
        }}
      />

      <div className="h-[22vh] max-h-52 shrink-0" />

      <div
        className="relative max-w-5xl mx-auto px-6 w-full pb-6"
        style={{ zIndex: 2 }}
      >
        {/* Available badge */}
        <div ref={badgeRef} className="mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-muted text-[11px] font-medium tracking-[0.12em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" aria-hidden="true" />
            Available for work
          </span>
        </div>

        {/* Kinetic name */}
        <h1
          className="font-heading font-black leading-[0.87] tracking-[-0.04em] mb-0 select-none"
          style={{ fontSize: 'clamp(36px, 10vw, 120px)' }}
          aria-label={bio.name}
        >
          <span ref={firstNameRef} className="block text-foreground" aria-hidden="true">
            Arjay
          </span>
          <span ref={lastNameRef} className="block text-muted/40" style={{ fontSize: '0.82em' }} aria-hidden="true">
            Delos Reyes
          </span>
        </h1>

        {/* Horizontal rule — GSAP animates scaleX from 0 */}
        <div ref={ruleRef} className="hero-rule my-8 md:my-10" />

        {/* Meta row: title + CTAs */}
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <p className="text-muted text-xs leading-relaxed max-w-[44ch] uppercase tracking-[0.07em]">
            {bio.title}
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_oklch(15%_0.015_65/0.12)] active:scale-[0.97] transition-[transform,box-shadow,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              View Projects
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                <path d="M2 8L8 2M8 2H4M8 2V6" />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download="Arjay_Delos_Reyes_Resume.pdf"
              aria-label="Download Resume"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-border text-muted text-sm font-medium hover:text-foreground hover:border-foreground/30 hover:-translate-y-[2px] active:scale-[0.97] transition-[transform,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="mt-auto flex flex-col items-center gap-3 text-muted py-8 w-full"
        aria-hidden="true"
        style={{ zIndex: 2 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="scroll-cue-line w-px h-8 bg-border" />
      </div>
    </section>
  )
}
