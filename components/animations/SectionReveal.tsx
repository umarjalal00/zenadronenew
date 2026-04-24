'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

// Premium expo-out ease — snappy entrance, smooth settle
const EASE = [0.16, 1, 0.3, 1] as const

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <div ref={ref} className={cn('relative', className)}>

      {/* ── Main reveal: clip-path card-expand + slide + fade ──────────────── */}
      <motion.div
        initial={{
          clipPath: 'inset(5% 1.5% 5% 1.5% round 18px)',
          opacity: 0,
          y: 55,
          scale: 0.98,
        }}
        animate={
          inView
            ? { clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1, y: 0, scale: 1 }
            : { clipPath: 'inset(5% 1.5% 5% 1.5% round 18px)', opacity: 0, y: 55, scale: 0.98 }
        }
        transition={{
          duration: 1.05,
          delay,
          ease: EASE,
          clipPath: { duration: 1.0, delay, ease: EASE },
          opacity:  { duration: 0.6, delay },
        }}
      >
        {children}
      </motion.div>

      {/* ── Scan line — glowing beam sweeps left→right on reveal ───────────── */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none overflow-hidden"
        style={{
          top: 0, height: '3px', zIndex: 20,
          background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.9) 40%, rgba(0,212,255,1) 50%, rgba(0,212,255,0.9) 60%, transparent)',
          boxShadow: '0 0 18px 2px rgba(0,212,255,0.55)',
          transformOrigin: 'left center',
        }}
        initial={{ scaleX: 0, opacity: 0, originX: 0 }}
        animate={
          inView
            ? { scaleX: [0, 1, 1], opacity: [0, 1, 0] }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 1.1,
          delay: delay + 0.05,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        }}
      />

      {/* ── Edge glow flash — briefly illuminates the top border ───────────── */}
      <motion.div
        className="absolute inset-x-0 top-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.18, 0] } : { opacity: 0 }}
        transition={{ duration: 1.0, delay: delay + 0.1, times: [0, 0.3, 1] }}
        style={{
          height: '120px',
          zIndex: 15,
          background: 'linear-gradient(to bottom, rgba(0,212,255,0.22) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
