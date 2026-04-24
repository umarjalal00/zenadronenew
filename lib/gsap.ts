// Central GSAP export with plugin registration.
// Import `gsap` and `ScrollTrigger` from here — never directly from 'gsap' —
// to guarantee plugins are registered before any component uses them.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

// ─── Shared easing presets ───────────────────────────────────────────────────
export const ease = {
  smooth:  'power2.out',
  snappy:  'power4.out',
  in:      'power2.in',
  inOut:   'power3.inOut',
  bounce:  'back.out(1.4)',
  elastic: 'elastic.out(1, 0.3)',
  linear:  'none',
} as const

// ─── Shared animation defaults ───────────────────────────────────────────────
export const defaults = {
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to:   { opacity: 1, y: 0, duration: 0.8, ease: ease.smooth },
  },
  fadeIn: {
    from: { opacity: 0 },
    to:   { opacity: 1, duration: 0.6, ease: ease.smooth },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.92 },
    to:   { opacity: 1, scale: 1, duration: 0.7, ease: ease.snappy },
  },
} as const
