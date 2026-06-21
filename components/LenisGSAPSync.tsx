'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function LenisGSAPSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return null
}
