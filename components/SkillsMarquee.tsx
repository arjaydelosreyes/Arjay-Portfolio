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

const DEFAULT_ICON_STYLE = { width: 36, height: 36, objectFit: 'contain' as const }

export default function SkillsMarquee({ skills, direction, speed = 30 }: Props) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const iconSkills = skills.filter(s => s.Icon || s.iconUrl || s.iconUrlLight || s.iconUrlDark)
  if (iconSkills.length === 0) return null

  // Repeat enough copies so the track fills a 1920px viewport at -50% translateX.
  // Formula: copies = ceil(24 / N) * 2 — always even so the seamless loop holds.
  // Examples: N=2 → 24 copies; N=4 → 12; N=6 → 8; N=8 → 6.
  const copies = Math.max(2, Math.ceil(24 / iconSkills.length) * 2)
  const track = Array.from({ length: copies }, () => iconSkills).flat()

  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="marquee-container overflow-hidden">
      <div
        className={`flex w-max ${animClass}`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {track.map(({ name, Icon, iconUrl, iconUrlLight, iconUrlDark, iconStyle, monoOn }, i) => {
          // Resolve the correct CDN URL for the current theme.
          const resolvedUrl = iconUrl
            ?? (isDark ? iconUrlDark : iconUrlLight)
            ?? iconUrlLight
            ?? iconUrlDark

          return (
            <div
              key={`${name}-${i}`}
              className="flex flex-col items-center gap-2 w-20 px-4 shrink-0"
            >
              <div
                className="flex h-9 items-center justify-center"
                style={iconFilter(monoOn, isDark)}
              >
                {resolvedUrl ? (
                  <img src={resolvedUrl} alt={name} style={iconStyle ?? DEFAULT_ICON_STYLE} />
                ) : (
                  Icon && <Icon width={36} height={36} />
                )}
              </div>
              <span className="text-[10px] text-muted text-center leading-tight font-body w-full">
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
