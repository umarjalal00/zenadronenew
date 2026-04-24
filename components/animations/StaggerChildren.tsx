'use client'

// Framer Motion stagger container — animates direct children in sequence.
// Wrap a list of cards, features, or icons to get a cascading reveal.

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number   // seconds between each child
  initialDelay?: number   // seconds before the first child animates
  once?: boolean
}

const containerVariants = (staggerDelay: number, initialDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
})

export const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  once         = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants(staggerDelay, initialDelay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Re-export so consuming components don't need a second import
export { itemVariants as StaggerItem }
