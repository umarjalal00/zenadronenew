'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
  title:      string
  desc:       string
  stat:       string
  statLabel:  string
  accent:     string
  span:       'wide' | 'normal'
  floatDelay: number
  icon:       React.ReactNode
}

const FEATURES: Feature[] = [
  {
    title:      'AI Autonomous Navigation',
    desc:       'Onboard neural processing adapts flight paths in real-time, identifying and avoiding obstacles without human input at speeds up to 72 km/h.',
    stat:       '< 0.3s',
    statLabel:  'Reaction time',
    accent:     '#00d4ff',
    span:       'wide',
    floatDelay: 0,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={44} height={44}>
        <circle cx="24" cy="24" r="4"  fill="#00d4ff" opacity="0.9" />
        <circle cx="8"  cy="12" r="3"  stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.12)" />
        <circle cx="40" cy="12" r="3"  stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.12)" />
        <circle cx="8"  cy="36" r="3"  stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.12)" />
        <circle cx="40" cy="36" r="3"  stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.12)" />
        <circle cx="24" cy="6"  r="2.5" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.12)" />
        <circle cx="24" cy="42" r="2.5" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.12)" />
        <line x1="24" y1="24" x2="8"  y2="12" stroke="#00d4ff" strokeWidth="1"   opacity="0.4" />
        <line x1="24" y1="24" x2="40" y2="12" stroke="#00d4ff" strokeWidth="1"   opacity="0.4" />
        <line x1="24" y1="24" x2="8"  y2="36" stroke="#00d4ff" strokeWidth="1"   opacity="0.4" />
        <line x1="24" y1="24" x2="40" y2="36" stroke="#00d4ff" strokeWidth="1"   opacity="0.4" />
        <line x1="24" y1="24" x2="24" y2="6"  stroke="#00d4ff" strokeWidth="1"   opacity="0.55" />
        <line x1="24" y1="24" x2="24" y2="42" stroke="#00d4ff" strokeWidth="1"   opacity="0.55" />
        <line x1="8"  y1="12" x2="24" y2="6"  stroke="#00d4ff" strokeWidth="0.8" opacity="0.25" />
        <line x1="40" y1="12" x2="24" y2="6"  stroke="#00d4ff" strokeWidth="0.8" opacity="0.25" />
      </svg>
    ),
  },
  {
    title:      'Dual Thermal Imaging',
    desc:       'Simultaneous 4K visible-light and thermal sensor array delivers complete situational awareness in any lighting condition.',
    stat:       '4K',
    statLabel:  'Dual sensor',
    accent:     '#22d3ee',
    span:       'normal',
    floatDelay: 0.6,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={44} height={44}>
        <ellipse cx="24" cy="24" rx="10" ry="7" stroke="#22d3ee" strokeWidth="1.4" fill="rgba(34,211,238,0.08)" />
        <circle  cx="24" cy="24" r="3.5" fill="#22d3ee" opacity="0.9" />
        <path d="M6 24 Q15 10 24 24 Q33 38 42 24" stroke="#22d3ee" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M10 20 Q18 9  24 20 Q30 31 38 20" stroke="#22d3ee" strokeWidth="1"   fill="none" opacity="0.25" />
        <line x1="4"  y1="24" x2="10" y2="24" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="38" y1="24" x2="44" y2="24" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M14 34 Q19 40 24 34 Q29 40 34 34" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
    ),
  },
  {
    title:      '8 km HD Transmission',
    desc:       'Crystal-clear 1080p live feed transmitted up to 8 kilometres with sub-100ms latency over an encrypted dual-band link.',
    stat:       '8 km',
    statLabel:  'Live range',
    accent:     '#a78bfa',
    span:       'normal',
    floatDelay: 0.3,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={44} height={44}>
        <circle  cx="24" cy="30" r="3"   fill="#a78bfa" />
        <path d="M16 23 Q24 14 32 23" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M10 18 Q24 6  38 18" stroke="#a78bfa" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M4  13 Q24 -1 44 13" stroke="#a78bfa" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.3" />
        <line x1="24" y1="30" x2="24" y2="42" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="18" y1="42" x2="30" y2="42" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    title:      'Military-Grade Build',
    desc:       'IP67-certified airframe engineered to operate in rain, sand, and extreme temperatures from -20°C to +55°C without performance loss.',
    stat:       'IP67',
    statLabel:  'Certification',
    accent:     '#34d399',
    span:       'wide',
    floatDelay: 0.9,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={44} height={44}>
        <path d="M24 4 L38 10 L38 26 Q38 36 24 44 Q10 36 10 26 L10 10 Z"
              stroke="#34d399" strokeWidth="1.4" fill="rgba(52,211,153,0.08)" strokeLinejoin="round" />
        <path d="M24 10 L33 14 L33 26 Q33 33 24 39 Q15 33 15 26 L15 14 Z"
              stroke="#34d399" strokeWidth="1" fill="rgba(52,211,153,0.05)" strokeLinejoin="round" opacity="0.6" />
        <path d="M19 24 L23 28 L30 20" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title:      '45-Min Flight Endurance',
    desc:       'Extended endurance battery pack with hot-swap capability. Swap cells in under 60 seconds — zero downtime between missions.',
    stat:       '45 min',
    statLabel:  'Per charge',
    accent:     '#fbbf24',
    span:       'normal',
    floatDelay: 1.2,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={44} height={44}>
        <circle cx="24" cy="24" r="16" stroke="#fbbf24" strokeWidth="1.3" opacity="0.35" />
        <path   d="M24 8 A16 16 0 1 1 8.7 34" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="24" x2="24" y2="13" stroke="#fbbf24" strokeWidth="2"   strokeLinecap="round" />
        <line x1="24" y1="24" x2="32" y2="28" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="2.2" fill="#fbbf24" />
        <path d="M7 34 L4 40 L10 40 Z" fill="#fbbf24" opacity="0.7" />
      </svg>
    ),
  },
  {
    title:      'AI Threat Detection',
    desc:       'Onboard AI classifies objects, vehicles, and individuals in real-time — flagging anomalies and transmitting alerts before a human operator reacts.',
    stat:       '99.2%',
    statLabel:  'Accuracy',
    accent:     '#f87171',
    span:       'normal',
    floatDelay: 1.5,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={44} height={44}>
        <circle cx="24" cy="24" r="10" stroke="#f87171" strokeWidth="1.3" fill="rgba(248,113,113,0.08)" />
        <circle cx="24" cy="24" r="3"  fill="#f87171" opacity="0.9" />
        <line x1="24" y1="4"  x2="24" y2="14" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="34" x2="24" y2="44" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4"  y1="24" x2="14" y2="24" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="24" x2="44" y2="24" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="16" stroke="#f87171" strokeWidth="1" opacity="0.2" strokeDasharray="4 3" />
        <path d="M18 10 Q24 6 30 10" stroke="#f87171" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M18 38 Q24 42 30 38" stroke="#f87171" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

// Row groupings for staggered entrance
const ROWS = [
  [0, 1], // wide + normal
  [2, 3], // normal + wide
  [4, 5], // normal + normal
]

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
  feature,
  cardRef,
}: {
  feature: Feature
  cardRef: (el: HTMLDivElement | null) => void
}) {
  const isWide = feature.span === 'wide'

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl p-6 md:p-7 overflow-hidden',
        isWide ? 'md:col-span-2' : 'md:col-span-1',
      )}
      style={{
        background:  'var(--surface-card-el)',
        border:      `1px solid ${feature.accent}18`,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        willChange: 'transform',
      }}
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 inset-x-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${feature.accent}80 30%, ${feature.accent} 50%, ${feature.accent}80 70%, transparent)`,
          boxShadow:  `0 0 12px ${feature.accent}60`,
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${feature.accent}10, transparent 70%)`,
        }}
      />

      {/* Top row: icon + stat */}
      <div className="flex items-start justify-between mb-5">
        {/* Icon chip */}
        <div
          className="rounded-xl p-2.5"
          style={{
            background: `${feature.accent}12`,
            border:     `1px solid ${feature.accent}25`,
          }}
        >
          {feature.icon}
        </div>

        {/* Stat */}
        <div className="text-right">
          <p
            className="font-display font-bold leading-none"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: feature.accent, letterSpacing: '-0.03em' }}
          >
            {feature.stat}
          </p>
          <p
            className="font-sans text-text-muted mt-1"
            style={{ fontSize: '0.8125rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            {feature.statLabel}
          </p>
        </div>
      </div>

      {/* Text */}
      <h3
        className="font-display font-bold text-white mb-2"
        style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', letterSpacing: '-0.02em' }}
      >
        {feature.title}
      </h3>
      <p
        className="font-sans text-text-muted leading-relaxed"
        style={{ fontSize: '1.125rem' }}
      >
        {feature.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${feature.accent}20, transparent)` }}
      />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    ROWS.forEach((row) => {
      const [leftIdx, rightIdx] = row
      const leftEl  = cardRefs.current[leftIdx]
      const rightEl = cardRefs.current[rightIdx]
      if (!leftEl || !rightEl) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftEl,
          start:   'top 82%',
          once:    true,
        },
      })

      // Both cards animate simultaneously — left from left, right from right
      tl.fromTo(leftEl,
        { opacity: 0, x: -100, filter: 'blur(6px)' },
        { opacity: 1, x: 0,   filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
        0,
      )
      tl.fromTo(rightEl,
        { opacity: 0, x: 100,  filter: 'blur(6px)' },
        { opacity: 1, x: 0,    filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' },
        0,
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32"
      aria-label="ZenaDrone features"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        }}
      />

      {/* Ambient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p
            className="font-sans font-medium tracking-[0.32em] uppercase mb-3"
            style={{ fontSize: '0.8125rem', color: '#00d4ff' }}
          >
            Engineering
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
            }}
          >
            What Sets Us Apart
          </h2>
          <p
            className="font-sans text-text-muted mt-3 mx-auto"
            style={{ fontSize: '1.125rem', maxWidth: '440px' }}
          >
            Every system in ZenaDrone is engineered to outperform in the most demanding operational environments.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={feature.span === 'wide' ? 'md:col-span-2' : 'md:col-span-1'}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration:   3.2 + i * 0.25,
                repeat:     Infinity,
                ease:       'easeInOut',
                delay:      feature.floatDelay,
                repeatType: 'loop',
              }}
            >
              <FeatureCard
                feature={feature}
                cardRef={el => { cardRefs.current[i] = el }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
