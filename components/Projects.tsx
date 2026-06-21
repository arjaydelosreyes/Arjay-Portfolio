'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { projects, type Project } from '@/lib/data'
import WordReveal from '@/components/WordReveal'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function AccordionCard({
  project,
  isActive,
  anyActive,
  onEnter,
}: {
  project: Project
  isActive: boolean
  anyActive: boolean
  onEnter: () => void
}) {
  return (
    <article
      data-cursor="card"
      onMouseEnter={onEnter}
      className="project-card relative overflow-hidden rounded-2xl cursor-pointer shrink-0"
      style={{
        flex: isActive ? '3 1 0%' : anyActive ? '0.45 1 0%' : '1 1 0%',
        transition: 'flex 0.55s cubic-bezier(0.23, 1, 0.32, 1)',
        minWidth: 0,
      }}
      aria-label={project.name}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, oklch(5% 0.005 65 / 0.92) 0%, oklch(5% 0.005 65 / 0.4) 50%, transparent 100%)',
          opacity: isActive ? 1 : 0.75,
        }}
      />

      {/* Details panel — pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3">
        {project.liveUrl && (
          <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full bg-live/20 border border-live/40 text-live text-[10px] font-semibold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" aria-hidden="true" />
            Live
          </span>
        )}

        <h3
          className="font-heading font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(16px, 1.5vw, 22px)' }}
        >
          {project.name}
        </h3>

        {/* Expandable details — fade in on active */}
        <div
          className="flex flex-col gap-3"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          <p className="text-white/75 text-xs leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
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
                onClick={e => e.stopPropagation()}
                className="group text-white/70 text-xs hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
              >
                GitHub
                <span className="inline-block transition-transform duration-150 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelector('.section-label'), {
        y: 16,
        opacity: 0,
        duration: 0.45,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })

      ScrollTrigger.batch('#projects .project-card', {
        onEnter: (els) => {
          gsap.from(els, {
            opacity: 0,
            y: 24,
            scale: 0.98,
            duration: 0.5,
            ease: 'expo.out',
            stagger: 0.1,
          })
        },
        once: true,
        start: 'top 88%',
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:py-24 px-6 bg-surface"
    >
      <div className="max-w-5xl mx-auto">

        <div className="section-label">Projects</div>

        <WordReveal
          className="font-heading font-extrabold text-foreground mb-12"
          style={{ fontSize: 'clamp(22px, 3.5vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.03em' }}
          delay={60}
          stagger={55}
        >
          {`Things I've shipped to production.`}
        </WordReveal>

        {/* Desktop: horizontal accordion */}
        <div
          className="hidden md:flex gap-3"
          style={{ height: 480 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {projects.map((project, i) => (
            <AccordionCard
              key={project.name}
              project={project}
              isActive={activeIndex === i}
              anyActive={activeIndex !== null}
              onEnter={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Mobile: vertical stack, all details always visible */}
        <div className="flex flex-col gap-4 md:hidden">
          {projects.map((project) => (
            <article
              key={project.name}
              className="relative overflow-hidden rounded-2xl"
              style={{ height: 320 }}
            >
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, oklch(5% 0.005 65 / 0.95) 0%, oklch(5% 0.005 65 / 0.5) 55%, transparent 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
                {project.liveUrl && (
                  <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full bg-live/20 border border-live/40 text-live text-[10px] font-semibold uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" aria-hidden="true" />
                    Live
                  </span>
                )}
                <h3 className="font-heading font-bold text-white text-lg leading-tight">{project.name}</h3>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent text-white text-xs font-semibold"
                    >
                      View Live ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-xs hover:text-white inline-flex items-center gap-1 font-medium"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
