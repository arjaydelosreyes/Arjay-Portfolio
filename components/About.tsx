'use client'

import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import { useInView } from '@/hooks/useInView'
import { bio } from '@/lib/data'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function staggerStyle(i: number, inView: boolean): React.CSSProperties {
  return {
    opacity: inView ? undefined : 0,
    animation: inView
      ? `fade-up-sm 500ms ${EASE} ${i * 80}ms both`
      : 'none',
  }
}

export default function About() {
  const { resolvedTheme } = useTheme()
  const photoSrc = resolvedTheme === 'dark' ? '/arjay-dark.jpg' : '/arjay-light.jpg'
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-12"
          style={staggerStyle(0, inView)}
        >
          About
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left: bio summary */}
          <p
            className="text-muted leading-relaxed max-w-[65ch]"
            style={staggerStyle(1, inView)}
          >
            {bio.summary}
          </p>

          {/* Right: credentials + location (desktop); hidden on mobile — photo takes this slot */}
          <div className="hidden md:flex flex-col gap-5">
            {/* Certification achievement card */}
            <div style={staggerStyle(2, inView)}>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface">
                <div className="mt-0.5 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className="text-accent"
                    aria-hidden="true"
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {bio.certification.name}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {bio.certification.issuer} · {bio.certification.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <p
              className="text-sm text-muted flex items-center gap-2"
              style={staggerStyle(3, inView)}
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className="text-muted shrink-0" aria-hidden="true"
              >
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {bio.location}
            </p>
          </div>

          {/* Mobile: certification + location (shown only below md) */}
          <div className="md:hidden flex flex-col gap-5">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface">
              <div className="mt-0.5 w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="text-accent" aria-hidden="true"
                >
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {bio.certification.name}
                </p>
                <p className="text-xs text-muted mt-1">
                  {bio.certification.issuer} · {bio.certification.date}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted flex items-center gap-2">
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className="text-muted shrink-0" aria-hidden="true"
              >
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {bio.location}
            </p>

            {/* Profile photo — mobile only */}
            <div className="flex justify-center mt-2">
              <div className="relative w-72 aspect-[2/3] overflow-hidden rounded-2xl border border-border">
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
    </section>
  )
}
