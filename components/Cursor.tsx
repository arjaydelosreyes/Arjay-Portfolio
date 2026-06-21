'use client'

import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'

const TOKENS = ['{', '}', '(', ')', '[', ']', '/', '*', ';', '=', '>', '<', '=>', '.', ':', '//']
const SPAWN_DIST = 12

function spawnTrail(x: number, y: number) {
  const el = document.createElement('span')
  el.className = 'code-trail-char'
  el.textContent = TOKENS[Math.floor(Math.random() * TOKENS.length)]
  el.style.left = `${x + (Math.random() * 12 - 6)}px`
  el.style.top  = `${y - 4}px`
  document.body.appendChild(el)

  gsap.to(el, {
    y: -32,
    opacity: 0,
    duration: 0.55,
    ease: 'power2.out',
    onComplete: () => el.remove(),
  })
}

export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let lastX = 0, lastY = 0

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (Math.sqrt(dx * dx + dy * dy) > SPAWN_DIST) {
        lastX = e.clientX
        lastY = e.clientY
        spawnTrail(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
