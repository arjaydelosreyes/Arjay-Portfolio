'use client'

import { useInView } from '@/hooks/useInView'
import { skillCategories, type SkillCategory } from '@/lib/data'
import SkillsMarquee from '@/components/SkillsMarquee'

const hasIcon = (s: SkillCategory['skills'][number]) =>
  s.Icon || s.iconUrl || s.iconUrlLight || s.iconUrlDark

function CategoryRow({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, inView } = useInView()
  const direction = index % 2 === 0 ? 'left' : 'right' as const

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : `translateX(${direction === 'left' ? '-24px' : '24px'})`,
        transition: 'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 mb-4 text-center">
        <h3 className="font-heading font-semibold text-xs text-muted uppercase tracking-[0.15em]">
          {category.name}
        </h3>
      </div>
      <SkillsMarquee skills={category.skills} direction={direction} />
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView()

  const visibleCategories = skillCategories
    .map(cat => ({ ...cat, skills: cat.skills.filter(hasIcon) }))
    .filter(cat => cat.skills.length > 0)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="py-24"
      style={{ opacity: inView ? 1 : 0, animation: inView ? 'fade-in-up 600ms ease-out both' : 'none' }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="sr-only">Skills</h2>
        <div className="section-label justify-center mb-12">Skills</div>
      </div>

      <div className="flex flex-col gap-10">
        {visibleCategories.map((category, i) => (
          <CategoryRow key={category.name} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
