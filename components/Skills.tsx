'use client'

import { useInView } from '@/hooks/useInView'
import { skillCategories } from '@/lib/data'
import SkillsMarquee from '@/components/SkillsMarquee'

export default function Skills() {
  const { ref, inView } = useInView()

  const visibleCategories = skillCategories
    .map(cat => ({ ...cat, skills: cat.skills.filter(s => s.Icon || s.iconUrl) }))
    .filter(cat => cat.skills.length > 0)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="py-24"
      style={{
        opacity: inView ? 1 : 0,
        animation: inView ? 'fade-in-up 600ms ease-out both' : 'none',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-12">
          Skills
        </h2>
      </div>

      <div className={`flex flex-col gap-10 ${inView ? 'stagger-active' : ''}`}>
        {visibleCategories.map((category, i) => (
          <div key={category.name}>
            <div className="max-w-5xl mx-auto px-6 mb-4">
              <h3
                className="font-heading font-semibold text-xs text-muted uppercase tracking-[0.15em] animate-slide-in-left"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {category.name}
              </h3>
            </div>
            <SkillsMarquee
              skills={category.skills}
              direction={i % 2 === 0 ? 'left' : 'right'}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
