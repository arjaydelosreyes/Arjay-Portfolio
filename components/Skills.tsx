'use client'

import { useEffect, useRef } from 'react'
import { skillCategories, type SkillCategory } from '@/lib/data'
import SkillsMarquee from '@/components/SkillsMarquee'
import { gsap } from '@/lib/gsap'

const hasIcon = (s: SkillCategory['skills'][number]) =>
  s.Icon || s.iconUrl || s.iconUrlLight || s.iconUrlDark

function CategoryRow({ category, index }: { category: SkillCategory; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const direction = index % 2 === 0 ? 'left' : 'right' as const
  const xFrom = direction === 'left' ? -24 : 24

  useEffect(() => {
    const el = rowRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        x: xFrom,
        opacity: 0,
        duration: 0.45,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [xFrom])

  return (
    <div ref={rowRef}>
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
  const sectionRef = useRef<HTMLElement>(null)

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
    }, el)

    return () => ctx.revert()
  }, [])

  const visibleCategories = skillCategories
    .map(cat => ({ ...cat, skills: cat.skills.filter(hasIcon) }))
    .filter(cat => cat.skills.length > 0)

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-36"
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
