'use client'

import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

interface Props {
  children: string
  className?: string
  style?: React.CSSProperties
  delay?: number   // base offset before first word (ms)
  stagger?: number // gap between each word (ms)
}

// Splits text into words and reveals each one upward through an overflow:hidden
// mask as the container scrolls into view — the canonical premium editorial pattern.
export default function WordReveal({ children, className = '', style, delay = 0, stagger = 60 }: Props) {
  const { ref, inView } = useInView()
  const words = children.split(' ').filter(Boolean)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span
            className="inline-block"
            style={{
              transform: inView ? 'translateY(0)' : 'translateY(110%)',
              opacity: inView ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, opacity 0.4s ease ${delay + i * stagger}ms`,
            } as CSSProperties}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  )
}
