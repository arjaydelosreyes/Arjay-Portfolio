'use client'

import { useInView } from '@/hooks/useInView'
import { skillCategories, type SkillCategory } from '@/lib/data'
import SkillsMarquee from '@/components/SkillsMarquee'

const hasIcon = (s: SkillCategory['skills'][number]) =>
  s.Icon || s.iconUrl || s.iconUrlLight || s.iconUrlDark

// Each category row manages its own IntersectionObserver so rows animate in
// independently as the user scrolls, not all at once when the section appears.
function CategoryRow({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, inView } = useInView()
  const direction = index % 2 === 0 ? 'left' : 'right' as const

  // Scale animation duration to item count so all rows scroll at the same
  // visual pace (~21 px/s). Formula: N × 3.75s (= 8 items × 80px / 30s baseline).
  const iconCount = category.skills.filter(hasIcon).length
  const speed = Math.max(iconCount * 3.75, 8)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : `translateX(${direction === 'left' ? '-24px' : '24px'})`,
        transition: 'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 mb-4">
        <h3 className="font-heading font-semibold text-xs text-muted uppercase tracking-[0.15em]">
          {category.name}
        </h3>
      </div>
      <SkillsMarquee skills={category.skills} direction={direction} speed={speed} />
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

      <div className="flex flex-col gap-10">
        {visibleCategories.map((category, i) => (
          <CategoryRow key={category.name} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
