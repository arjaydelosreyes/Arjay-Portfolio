'use client'

import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import { useInView } from '@/hooks/useInView'
import { bio } from '@/lib/data'

export default function About() {
  const { resolvedTheme } = useTheme()
  const photoSrc = resolvedTheme === 'dark' ? '/arjay-dark.jpg' : '/arjay-light.jpg'
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="py-24 px-6"
      style={{
        opacity: inView ? 1 : 0,
        animation: inView ? 'fade-in-up 600ms ease-out both' : 'none',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-12">
          About
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio + certification */}
          <div>
            <p className="text-muted leading-relaxed mb-6 max-w-[65ch]">
              {bio.summary}
            </p>
            <p className="text-muted text-sm mt-3">{bio.location}</p>
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/8 border border-accent/20">
              <div>
                <p className="text-foreground text-sm font-semibold">{bio.certification.name}</p>
                <p className="text-muted text-xs mt-0.5">{bio.certification.issuer} · {bio.certification.date}</p>
              </div>
            </div>
          </div>

          {/* Profile photo — mobile only (desktop users see it in Hero) */}
          <div className="flex justify-center md:hidden">
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
    </section>
  )
}
