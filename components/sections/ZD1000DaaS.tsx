'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container }    from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }       from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Service models ───────────────────────────────────────────────────────────
const MODELS = [
  {
    num: '01',
    title: 'Purchase',
    subtitle: 'Full Ownership',
    color: '#00d4ff',
    desc: 'Own the ZenaDrone 1000 outright. Full control over deployment, scheduling, and long-term missions with no recurring fees.',
    perks: ['Full hardware ownership', 'Custom configuration', 'Priority support', 'Software updates'],
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        <rect x={8} y={12} width={32} height={24} rx={4} stroke={c} strokeWidth={1.5} fill={`${c}10`} />
        <circle cx={24} cy={24} r={6} stroke={c} strokeWidth={1.5} />
        <circle cx={24} cy={24} r={2.5} fill={c} opacity={0.9} />
        <path d="M16 36 L16 42" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M32 36 L32 42" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M12 42 L36 42" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        {/* Ownership crown */}
        <path d="M16 12 L16 8 L20 11 L24 7 L28 11 L32 8 L32 12" stroke={c} strokeWidth={1.3} strokeLinejoin="round" fill={`${c}15`} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Rental',
    subtitle: 'Flexible Duration',
    color: '#a78bfa',
    desc: 'Rent the ZenaDrone 1000 for a specific period. Ideal for project-based work, seasonal operations, and trial deployments.',
    perks: ['No upfront capital', 'Short or long term', 'Maintenance included', 'Flexible upgrade paths'],
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        <circle cx={24} cy={20} r={10} stroke={c} strokeWidth={1.5} fill={`${c}10`} />
        <path d="M24 12 L24 20 L29 25" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={24} cy={20} r={2} fill={c} opacity={0.9} />
        {/* Calendar icon */}
        <rect x={10} y={30} width={28} height={14} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <line x1={16} y1={27} x2={16} y2={33} stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
        <line x1={32} y1={27} x2={32} y2={33} stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
        <line x1={10} y1={35} x2={38} y2={35} stroke={c} strokeWidth={1} opacity={0.3} />
        <circle cx={17} cy={39} r={1.5} fill={c} opacity={0.6} />
        <circle cx={24} cy={39} r={1.5} fill={c} opacity={0.6} />
        <circle cx={31} cy={39} r={1.5} fill={c} opacity={0.6} />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Subscribe',
    subtitle: 'Shared Service',
    color: '#34d399',
    desc: 'Subscribe to our service and share costs with other entities in your area. Expert drone engineers and pilots support every mission from start to finish.',
    perks: ['Shared cost model', 'Expert drone crews', 'Full mission support', 'Data analytics included'],
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        {/* Network nodes */}
        <circle cx={24} cy={12} r={5} stroke={c} strokeWidth={1.5} fill={`${c}12`} />
        <circle cx={12} cy={32} r={5} stroke={c} strokeWidth={1.5} fill={`${c}12`} />
        <circle cx={36} cy={32} r={5} stroke={c} strokeWidth={1.5} fill={`${c}12`} />
        {/* Connections */}
        <line x1={21} y1={16} x2={15} y2={28} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <line x1={27} y1={16} x2={33} y2={28} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <line x1={17} y1={32} x2={31} y2={32} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        {/* Center dots */}
        <circle cx={24} cy={12} r={2} fill={c} opacity={0.9} />
        <circle cx={12} cy={32} r={2} fill={c} opacity={0.9} />
        <circle cx={36} cy={32} r={2} fill={c} opacity={0.9} />
        {/* Orbit ring */}
        <circle cx={24} cy={24} r={14} stroke={c} strokeWidth={0.6} strokeDasharray="3 6" opacity={0.25} />
      </svg>
    ),
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export function ZD1000DaaS() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <SectionWrapper className="bg-background">
      {/* Separator */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">

          {/* Left: header + description */}
          <div>
            <FadeIn>
              <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-4" style={{ fontSize: '0.8125rem' }}>DaaS</p>
              <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Drone as a<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Service
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="w-12 h-px mb-6" style={{ background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '1.125rem' }}>
                ZenaDrone is enhancing its ecosystem to offer flexible options for businesses seeking scanning and surveillance capabilities. Choose to purchase outright, rent for a specific period, or subscribe to our shared service model.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem' }}>
                Our team of expert drone engineers and pilots will support your mission from start to finish, ensuring a seamless experience for data collection, image and video capture, and land surveying.
              </p>
            </FadeIn>

            {/* Capabilities included */}
            <FadeIn delay={0.25}>
              <div className="space-y-2">
                {['Drone Mapping & Surveying', 'Real-time Surveillance', 'AI Data Analytics', 'Mission Planning & Execution'].map(feat => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}>
                      <svg viewBox="0 0 10 10" fill="none" width={8} height={8}>
                        <path d="M2 5 L4 7 L8 3" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-sans text-text-muted" style={{ fontSize: '0.85rem' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Service model cards */}
          <StaggerChildren className="space-y-4" staggerDelay={0.1} initialDelay={0.2}>
            {MODELS.map((m, i) => (
              <motion.div
                key={m.num}
                variants={itemVariants}
                className="relative p-5 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: hovered === i ? `${m.color}0e` : 'var(--surface-card-el)',
                  border: `1px solid ${hovered === i ? m.color + '30' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ x: 6, transition: { duration: 0.25 } }}
              >
                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-2xl overflow-hidden transition-opacity duration-300" style={{ opacity: hovered === i ? 1 : 0 }}>
                  <div className="absolute top-0 right-0 w-full h-full" style={{
                    background: `radial-gradient(ellipse at top right, ${m.color}18 0%, transparent 65%)`,
                  }} />
                </div>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300" style={{
                    background: hovered === i ? `${m.color}18` : `${m.color}0d`,
                    border: `1px solid ${hovered === i ? m.color + '35' : m.color + '20'}`,
                  }}>
                    {m.icon(m.color)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold tracking-[0.15em]" style={{ fontSize: '0.8125rem', color: m.color, opacity: 0.7 }}>{m.num}</span>
                      <span className="font-mono font-bold tracking-[0.12em] uppercase" style={{ fontSize: '0.8125rem', color: m.color }}>{m.subtitle}</span>
                    </div>

                    <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.25rem', letterSpacing: '-0.015em' }}>
                      {m.title}
                    </h3>

                    <p className="font-sans text-text-muted mb-3 leading-relaxed" style={{ fontSize: '0.82rem' }}>
                      {m.desc}
                    </p>

                    {/* Perks */}
                    <div className="flex flex-wrap gap-1.5">
                      {m.perks.map(p => (
                        <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono" style={{
                          fontSize: '0.8125rem',
                          color: m.color,
                          background: `${m.color}0d`,
                          border: `1px solid ${m.color}20`,
                        }}>
                          <span className="w-0.5 h-0.5 rounded-full" style={{ background: m.color }} />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Left accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-opacity duration-300" style={{
                  background: m.color,
                  opacity: hovered === i ? 1 : 0.2,
                  boxShadow: hovered === i ? `0 0 8px ${m.color}` : 'none',
                }} />
              </motion.div>
            ))}
          </StaggerChildren>
        </div>

        {/* Bottom CTA */}
        <FadeIn className="text-center mt-14">
          <Link href="/zenadrone-1000#book-demo" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #34d399 100%)',
              color: '#07070f',
              fontSize: '0.92rem',
              boxShadow: '0 0 28px rgba(0,212,255,0.25)',
            }}>
            Get in Touch
            <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
