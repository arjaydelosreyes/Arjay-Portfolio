'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { bio } from '@/lib/data'

export default function Contact() {
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bio.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${bio.email}?subject=Opportunity%20%E2%80%94%20Arjay%20Delos%20Reyes`
    }
  }

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

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:opacity-90 transition-all duration-200 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            bio.email
          )}
        </button>

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
