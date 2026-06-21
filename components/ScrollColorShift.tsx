'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const SECTION_HUES: Record<string, number> = {
  hero:     50,
  about:    55,
  projects: 220,
  skills:   180,
  contact:  50,
}

function animateHue(targetHue: number) {
  const current = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--accent-hue') || '50'
  )
  const obj = { hue: current }
  gsap.to(obj, {
    hue: targetHue,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: true,
    onUpdate() {
      document.documentElement.style.setProperty('--accent-hue', String(Math.round(obj.hue)))
    },
  })
}

export default function ScrollColorShift() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const triggers = Object.entries(SECTION_HUES).map(([id, hue]) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateHue(hue),
        onEnterBack: () => animateHue(hue),
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [])

  return null
}
