import { bio } from '@/lib/data'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-surface">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">
          Get In Touch
        </h2>
        <p className="text-muted mb-10 leading-relaxed">
          Open to full-time and freelance opportunities. Feel free to reach out.
        </p>

        <a
          href={`mailto:${bio.email}`}
          className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-accent text-white font-medium text-sm hover:opacity-90 transition-opacity mb-10"
        >
          Get In Touch
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
