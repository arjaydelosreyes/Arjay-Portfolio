import { bio } from '@/lib/data'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-accent font-mono text-sm mb-4 tracking-wide">
          Hi, I&apos;m
        </p>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-4">
          {bio.name}
        </h1>
        <p className="font-heading font-semibold text-xl sm:text-2xl text-muted mb-6">
          {bio.title}
        </p>
        <p className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {bio.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border text-foreground font-medium text-sm hover:bg-surface transition-colors"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}
