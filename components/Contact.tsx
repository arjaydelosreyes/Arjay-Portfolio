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
            className="text-muted hover:text-foreground transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" />
            </svg>
          </a>
        </div>

        <p className="text-muted text-xs mt-12">
          {bio.name} · {bio.location}
        </p>
      </div>
    </section>
  )
}
