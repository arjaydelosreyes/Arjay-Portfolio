import { projects } from '@/lib/data'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-12">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <article
              key={project.name}
              className="bg-background border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-accent transition-colors"
            >
              <h3 className="font-heading font-bold text-lg text-foreground">
                {project.name}
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-1 rounded bg-surface border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo of ${project.name}`}
                    className="text-accent text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Live ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.name}`}
                    className="text-muted text-sm hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
