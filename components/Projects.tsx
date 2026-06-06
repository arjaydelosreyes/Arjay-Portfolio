'use client'

import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'
import { projects, type Project } from '@/lib/data'
import WordReveal from '@/components/WordReveal'

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView()
  const isFeatured = !!project.liveUrl

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      data-cursor="card"
      style={{
        opacity: inView ? undefined : 0,
        animation: inView ? `card-enter 450ms ${EASE} ${index * 150}ms both` : 'none',
      }}
      className={`
        rounded-xl p-6 flex flex-col gap-4
        border will-change-transform
        hover:-translate-y-[3px] hover:shadow-[0_8px_32px_oklch(0%_0_0/0.08)]
        transition-[transform,box-shadow,border-color] duration-[250ms]
        ${isFeatured
          ? 'bg-accent/5 border-accent/30 hover:border-accent/60'
          : 'bg-background border-border hover:border-accent'}
      `}
    >
      {isFeatured && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-live/10 border border-live/25 text-live text-[10px] font-semibold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" aria-hidden="true" />
            Live
          </span>
        </div>
      )}

      <h3 className="font-heading font-bold text-lg text-foreground leading-tight">
        {project.name}
      </h3>

      <p className="text-muted text-sm leading-relaxed flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 rounded bg-surface border border-border text-muted hover:border-accent/30 hover:text-foreground transition-colors duration-150 cursor-default">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-1 flex-wrap">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.name}`}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-white text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-[transform,opacity] duration-200"
          >
            View Live
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
              <path d="M2 8L8 2M8 2H4M8 2V6" />
            </svg>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub for ${project.name}`}
            className="group text-muted text-sm hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            GitHub
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className="py-16 md:py-24 px-6 bg-surface"
      style={{ opacity: inView ? 1 : 0, animation: inView ? 'fade-in-up 600ms ease-out both' : 'none' }}
    >
      <div className="max-w-5xl mx-auto">

        <div className="section-label">Projects</div>

        {/* Word-reveal subheading */}
        <WordReveal
          className="font-heading font-extrabold text-foreground mb-12"
          style={{ fontSize: 'clamp(22px, 3.5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.03em' } as CSSProperties}
          delay={60}
          stagger={55}
        >
          {`Things I've shipped to production.`}
        </WordReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
