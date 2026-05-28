'use client'

import { useInView } from '@/hooks/useInView'
import { skillCategories } from '@/lib/data'

export default function Skills() {
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="py-24 px-6"
      style={{
        opacity: inView ? 1 : 0,
        animation: inView ? 'fade-in-up 600ms ease-out both' : 'none',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-12">
          Skills
        </h2>

        <div className="flex flex-col gap-10">
          {skillCategories.map(category => (
            <div key={category.name}>
              <h3 className="font-heading font-semibold text-xs text-muted uppercase tracking-[0.15em] mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-md bg-surface border border-border text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
