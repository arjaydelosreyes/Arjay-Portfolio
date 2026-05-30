'use client'

import { useTheme } from '@/components/ThemeProvider'
import type { Skill } from '@/lib/data'

type Props = {
  skills: Skill[]
  direction: 'left' | 'right'
  speed?: number
}

// Returns an inline style that normalises the icon's color for the current theme.
// Using inline styles (not CSS classes) guarantees the filter is always applied
// regardless of Tailwind v4's JIT processing of dynamically-constructed class names.
function iconFilter(monoOn: Skill['monoOn'], isDark: boolean): React.CSSProperties {
  if (!monoOn) return {}
  const mono  = { filter: 'brightness(0)',           opacity: 0.8 } as const
  const monoI = { filter: 'brightness(0) invert(1)', opacity: 0.8 } as const
  if (monoOn === 'light') return isDark ? {} : mono
  if (monoOn === 'dark')  return isDark ? monoI : {}
  if (monoOn === 'both')  return isDark ? monoI : mono
  return {}
}

export default function SkillsMarquee({ skills, direction, speed = 30 }: Props) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const iconSkills = skills.filter(s => s.Icon || s.iconUrl)
  if (iconSkills.length === 0) return null

  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="marquee-container overflow-hidden">
      {/* No gap-* on the track: spacing goes inside each item via px-4 so that
          -50% translateX lands exactly at the start of copy 2 (seamless loop). */}
      <div
        className={`flex w-max ${animClass}`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {[...iconSkills, ...iconSkills].map(({ name, Icon, iconUrl, monoOn }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex flex-col items-center gap-2 w-20 px-4 shrink-0"
          >
            <div
              className="flex items-center justify-center"
              style={iconFilter(monoOn, isDark)}
            >
              {iconUrl ? (
                // Plain <img> correctly uses viewBox to scale the SVG to the given CSS dimensions.
                // next/image with unoptimized fails on SVGs lacking intrinsic width/height attributes.
                <img src={iconUrl} alt={name} width={36} height={36} style={{ width: 36, height: 36, objectFit: 'contain' }} />
              ) : (
                Icon && <Icon width={36} height={36} />
              )}
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
