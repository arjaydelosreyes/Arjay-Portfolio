'use client'

import { useEffect } from 'react'
import type { Skill } from '@/lib/data'

type Props = {
  skills: Skill[]
  direction: 'left' | 'right'
  speed?: number
}

export default function SkillsMarquee({ skills, direction, speed = 30 }: Props) {
  // Suppress the package-level dataCircle prop warning from @thesvg/react's Nextdotjs icon.
  // The icon's generated code passes "dataCircle" (camelCased data-*) to a native circle element —
  // a build bug in the package that has no upstream fix.
  useEffect(() => {
    const original = console.error.bind(console)
    console.error = (...args: Parameters<typeof console.error>) => {
      if (typeof args[0] === 'string' && args[0].includes('dataCircle')) return
      original(...args)
    }
    return () => { console.error = original }
  }, [])

  const iconSkills = skills.filter(s => s.Icon)
  if (iconSkills.length === 0) return null

  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="overflow-hidden">
      {/* No gap-* on the track: spacing goes inside each item via px-4 so that
          -50% translateX lands exactly at the start of copy 2 (seamless loop). */}
      <div
        className={`flex w-max ${animClass}`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {[...iconSkills, ...iconSkills].map(({ name, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex flex-col items-center gap-2 w-20 px-4 shrink-0"
          >
            <div className="skill-icon flex items-center justify-center">
              {Icon && <Icon width={36} height={36} />}
            </div>
            <span className="text-[10px] text-muted text-center leading-tight font-body w-full">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
