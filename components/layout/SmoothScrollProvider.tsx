'use client'

// Initialises Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
// Rendered once at the root layout — children pass through unchanged.

import { ReactNode } from 'react'
import { useLenis } from '@/hooks/useLenis'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useLenis()
  return <>{children}</>
}
