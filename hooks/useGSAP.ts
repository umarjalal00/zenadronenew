'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Only register plugins in the browser — GSAP's ScrollTrigger accesses the DOM
// during registration, which throws on the server and silently kills the page.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export { useGSAP }
