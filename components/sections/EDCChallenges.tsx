'use client'

import { useState } from 'react'
import { motion }   from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const CHALLENGES = [
  {
    num: '01',
    title: 'Time-Consuming Processes',
    desc: 'Old methods take too long and delay critical decisions. Teams lose competitive advantage waiting on slow data pipelines.',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth={1.3} />
        <path d="M14 8v6l4 3" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'High Error Rates',
    desc: 'Manual processes lead to inconsistent drone data management and costly mistakes that undermine accuracy and reliability.',
    color: '#f87171',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 L25 22 L3 22 Z" stroke="#f87171" strokeWidth={1.3} strokeLinejoin="round" fill="rgba(248,113,113,0.08)" />
        <line x1="14" y1="12" x2="14" y2="17" stroke="#f87171" strokeWidth={2} strokeLinecap="round" />
        <circle cx="14" cy="20" r="1.2" fill="#f87171" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Unsafe & Remote Areas',
    desc: 'Collecting data in hazardous or hard-to-reach locations puts field workers at serious risk, creating liability and coverage gaps.',
    color: '#fbbf24',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 3 L22 7 L22 17 C22 21 18.4 24 14 25 C9.6 24 6 21 6 17 L6 7 Z" stroke="#fbbf24" strokeWidth={1.3} fill="rgba(251,191,36,0.08)" />
        <path d="M14 10 L14 16" stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" />
        <circle cx="14" cy="19.5" r="1.2" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Delayed Reporting',
    desc: 'Slow processing affects aerial data collection and analysis, reducing accuracy and delaying the decisions that drive efficiency.',
    color: '#a78bfa',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="5" width="20" height="18" rx="2" stroke="#a78bfa" strokeWidth={1.3} fill="rgba(167,139,250,0.08)" />
        <path d="M9 10h10M9 14h7M9 18h5" stroke="#a78bfa" strokeWidth={1.2} strokeLinecap="round" />
        <line x1="20" y1="16" x2="24" y2="20" stroke="#a78bfa" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="21" cy="19" r="4" stroke="#a78bfa" strokeWidth={1.2} />
        <line x1="21" y1="17" x2="21" y2="19.5" stroke="#a78bfa" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'High Operational Costs',
    desc: 'Excess labor, repeated site visits, and manual equipment raise costs significantly without adding clear operational value.',
    color: '#34d399',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="10" stroke="#34d399" strokeWidth={1.3} fill="rgba(52,211,153,0.06)" />
        <path d="M14 8v2M14 18v2M10.5 10.5 Q14 9 17 11.5 Q19 14 17 16.5 Q14 19 10.5 17.5" stroke="#34d399" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="14" y1="12" x2="14" y2="16" stroke="#34d399" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    ),
  },
]

export function EDCChallenges() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <SectionWrapper id="challenges" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#f87171' }}>
            The Problem
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Challenges in Traditional<br />
            <span style={{ background: 'linear-gradient(135deg, #f87171, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Data Collection
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540, lineHeight: 1.7 }}>
            Legacy approaches create friction, risk, and delays that undermine operational performance across every industry.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHALLENGES.map((c, i) => (
            <motion.div
              key={c.num}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: hovered === i ? `${c.color}0c` : 'var(--surface-elevated)',
                border: `1px solid ${hovered === i ? c.color + '35' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: hovered === i ? `0 0 40px ${c.color}10` : 'none',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Number */}
              <div className="absolute top-4 right-5 font-mono font-bold" style={{ fontSize: '1.6rem', color: `${c.color}18`, letterSpacing: '-0.05em' }}>
                {c.num}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300" style={{
                background: hovered === i ? `${c.color}18` : `${c.color}0c`,
                border: `1px solid ${hovered === i ? c.color + '40' : c.color + '20'}`,
              }}>
                {c.icon}
              </div>

              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                {c.title}
              </h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                {c.desc}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-300" style={{
                background: hovered === i ? `linear-gradient(to right, transparent, ${c.color}60, transparent)` : 'transparent',
              }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
