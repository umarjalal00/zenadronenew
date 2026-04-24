'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Initialises Lenis smooth scrolling and syncs its scroll events with
 * GSAP ScrollTrigger so timeline scrubbing works correctly.
 *
 * Call once at the root layout level via SmoothScrollProvider.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.2,
      // Custom ease — feels weighty and premium
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Keep ScrollTrigger's scroll position in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP's ticker as the rAF source so both stay frame-locked
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])
}
