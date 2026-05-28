'use client'

import { useActionState } from 'react'
import { useInView } from '@/hooks/useInView'
import { bio } from '@/lib/data'
import { sendContactEmail } from '@/app/actions'

const inputClass =
  'w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-shadow'

export default function Contact() {
  const { ref, inView } = useInView()
  const [state, action, pending] = useActionState(sendContactEmail, null)

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

        {state?.success ? (
          <div className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-accent/15 text-accent font-semibold text-sm mb-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Message sent. I&apos;ll reply within a day.
          </div>
        ) : (
          <form action={action} className="flex flex-col gap-3 text-left mb-10">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              autoComplete="name"
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              autoComplete="email"
              className={inputClass}
            />
            <textarea
              name="message"
              rows={4}
              placeholder="What's on your mind?"
              required
              className={`${inputClass} resize-none`}
            />
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="self-end inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-accent text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {pending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

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
