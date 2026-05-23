import { bio } from '@/lib/data'

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
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
            <p className="text-muted text-sm">
              📍 {bio.location}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-md bg-surface border border-border">
              <span className="text-accent text-lg">🏅</span>
              <div>
                <p className="text-foreground text-sm font-medium">{bio.certification.name}</p>
                <p className="text-muted text-xs">{bio.certification.issuer} · {bio.certification.date}</p>
              </div>
            </div>
          </div>

          {/* Profile photo placeholder */}
          <div className="flex justify-center md:justify-end">
            <div className="w-56 h-56 rounded-2xl bg-surface border border-border flex items-center justify-center">
              <span className="text-muted text-sm">Photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
