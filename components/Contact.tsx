'use client'

import { useInView } from '@/hooks/useInView'
import { bio } from '@/lib/data'

export default function Contact() {
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="py-24 px-6 bg-surface"
      style={{
        opacity: inView ? 1 : 0,
        animation: inView ? 'fade-in-up 600ms ease-out both' : 'none',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="font-heading font-extrabold text-foreground mb-6"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: '1.05' }}
        >
          Let&apos;s build<br />something.
        </h2>
        <p className="text-muted mb-10 leading-relaxed max-w-[45ch] mx-auto">
          Open to full-time roles and freelance. Reach out and I&apos;ll reply within a day.
        </p>

        <a
          href={`mailto:${bio.email}`}
          className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-accent text-white font-semibold text-sm hover:opacity-90 transition-opacity mb-10"
        >
          {bio.email}
        </a>

        <div className="flex justify-center gap-6">
          <a
            href={bio.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-foreground transition-colors text-sm font-medium"
          >
            GitHub ↗
          </a>
        </div>

        <p className="text-muted text-xs mt-12">
          {bio.name} · {bio.location}
        </p>
      </div>
    </section>
  )
}
