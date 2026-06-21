'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface Props {
  children: string
  className?: string
  style?: React.CSSProperties
  delay?: number   // base offset before first word (ms)
  stagger?: number // gap between each word (ms)
}

export default function WordReveal({ children, className = '', style, delay = 0, stagger = 60 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const wordSpans = el.querySelectorAll<HTMLElement>('.wr-word')

    const ctx = gsap.context(() => {
      gsap.from(wordSpans, {
        y: '110%',
        opacity: 0,
        duration: 0.45,
        ease: 'expo.out',
        stagger: stagger / 1000,
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [delay, stagger])

  const words = children.split(' ').filter(Boolean)

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span className="wr-word inline-block">
            {word}
          </span>
        </span>
      ))}
    </div>
  )
}
