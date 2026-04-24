'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Config {
  from?:    gsap.TweenVars
  to?:      gsap.TweenVars
  start?:   string
  end?:     string
  scrub?:   boolean | number
  pin?:     boolean
  markers?: boolean     // set true only during dev to visualise trigger points
}

/**
 * Attaches a GSAP ScrollTrigger animation to a ref'd element.
 * Returns a ref to attach to the element you want to animate.
 *
 * Example:
 *   const ref = useScrollAnimation({ from: { opacity: 0, y: 60 } })
 *   return <div ref={ref}>...</div>
 */
export function useScrollAnimation(config: Config = {}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from    = { opacity: 0, y: 50 },
      to      = { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      start   = 'top 85%',
      end     = 'bottom 15%',
      scrub   = false,
      pin     = false,
      markers = false,
    } = config

    const tween = gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: { trigger: el, start, end, scrub, pin, markers },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill()
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
