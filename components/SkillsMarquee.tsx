'use client'

import type { Skill } from '@/lib/data'

type Props = {
  skills: Skill[]
  direction: 'left' | 'right'
  speed?: number
}

export default function SkillsMarquee({ skills, direction, speed = 30 }: Props) {
  const iconSkills = skills.filter(s => s.Icon)
  if (iconSkills.length === 0) return null

  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-8 w-max ${animClass}`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {[...iconSkills, ...iconSkills].map(({ name, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex flex-col items-center gap-2 w-16 shrink-0"
          >
            {Icon && (
              <Icon
                width={36}
                height={36}
                className="text-foreground"
              />
            )}
            <span className="text-[10px] text-muted text-center leading-tight font-body truncate w-full text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
