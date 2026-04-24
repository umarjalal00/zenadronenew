'use client'

// Framer Motion scroll-triggered fade-in wrapper.
// Wraps any content to animate it into view as the user scrolls.

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?:     number        // seconds
  duration?:  number        // seconds
  direction?: Direction
  once?:      boolean       // animate only on first enter
  amount?:    number | 'some' | 'all'  // how much of element must be in view
}

// Maps direction to the initial transform offset
const offsets: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: 40 },
  right: { x: -40 },
  none:  {},
}

export function FadeIn({
  children,
  className,
  delay     = 0,
  duration  = 0.65,
  direction = 'up',
  once      = true,
  amount    = 0.15,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const initial = { opacity: 0, ...offsets[direction] }
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
