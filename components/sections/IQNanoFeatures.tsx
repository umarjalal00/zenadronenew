'use client'

import { motion }  from 'framer-motion'
import { Container }   from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }      from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    label: 'Charging Pad',
    desc: 'Convenient cordless charging solution — no cables required, making it easy to maintain multiple drones simultaneously.',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <ellipse cx={20} cy={32} rx={12} ry={3} stroke={c} strokeWidth={1.2} opacity={0.4} />
        <path d="M9 32 L9 26 Q9 22 13 20 L20 18 L27 20 Q31 22 31 26 L31 32" stroke={c} strokeWidth={1.3} fill={`${c}08`} strokeLinejoin="round" />
        <path d="M22 10 L18 18 L22 18 L18 28" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={20} cy={7} r={3} stroke={c} strokeWidth={1.2} opacity={0.5} />
      </svg>
    ),
  },
  {
    label: 'Intelligent Battery',
    desc: 'Fly for up to 20 minutes with an intelligent flight battery system that optimizes power consumption for maximum air time.',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={7} y={13} width={26} height={14} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <rect x={33} y={17} width={3} height={6} rx={1.5} stroke={c} strokeWidth={1.2} />
        <rect x={9} y={15} width={18} height={10} rx={2} fill={c} opacity={0.65} />
        <path d="M22 10 L18 19 L22 19 L18 29" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Safe for Indoor Use',
    desc: 'Equipped with obstacle avoidance systems and propeller guards, suitable for confined spaces where traditional drones pose a risk.',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M20 4 L32 9 L32 20 C32 28 26.5 34 20 36 C13.5 34 8 28 8 20 L8 9 Z" stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M14 20 L17.5 23.5 L26 15" stroke={c} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Reliable Video',
    desc: 'Enhanced video transmission and sensing systems make it highly reliable in gathering visual data in the air for real-time operations.',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={4} y={11} width={22} height={18} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M26 17 L36 13 L36 27 L26 23 Z" stroke={c} strokeWidth={1.2} strokeLinejoin="round" />
        <circle cx={15} cy={20} r={4} stroke={c} strokeWidth={1.3} />
        <circle cx={15} cy={20} r={1.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Portability',
    desc: 'Designed to fit in a case for quick deployment from site to site. Unobtrusive and stackable for easy storage and transport.',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={7} y={14} width={26} height={18} rx={2.5} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M14 14 L14 11 Q14 8 17 8 L23 8 Q26 8 26 11 L26 14" stroke={c} strokeWidth={1.3} strokeLinejoin="round" />
        <line x1={7} y1={22} x2={33} y2={22} stroke={c} strokeWidth={0.8} opacity={0.4} />
        <circle cx={20} cy={22} r={2.5} stroke={c} strokeWidth={1.2} />
      </svg>
    ),
  },
  {
    label: 'Durability',
    desc: 'Carbon-fiber shell that withstands impact without severe damage, with propeller guards protecting rotors to ensure uninterrupted flight.',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <polygon points="20,4 35,12 35,28 20,36 5,28 5,12" stroke={c} strokeWidth={1.4} fill={`${c}08`} strokeLinejoin="round" />
        <polygon points="20,11 28,15 28,25 20,29 12,25 12,15" stroke={c} strokeWidth={0.8} opacity={0.35} strokeLinejoin="round" />
        <circle cx={20} cy={20} r={3.5} fill={c} opacity={0.85} />
      </svg>
    ),
  },
  {
    label: 'User-Friendly Controls',
    desc: 'Controls work alongside the onboard sensing system and video transmission to provide smooth, intuitive operability even for new pilots.',
    color: '#fb923c',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx={20} cy={20} r={13} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M15 20 L20 15 L25 20 L20 25 Z" stroke={c} strokeWidth={1.3} fill={`${c}20`} />
        <circle cx={20} cy={20} r={3} fill={c} opacity={0.9} />
        <line x1={20} y1={7} x2={20} y2={10} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
        <line x1={20} y1={30} x2={20} y2={33} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
        <line x1={7} y1={20} x2={10} y2={20} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
        <line x1={30} y1={20} x2={33} y2={20} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
  },
  {
    label: 'Tethered Cable',
    desc: 'Stable power and data connection for extended flight times or hovering, enabling real-time data transmission during indoor inspections.',
    color: '#6ee7b7',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M20 8 C20 8 14 12 10 18 C8 22 10 28 16 30" stroke={c} strokeWidth={1.6} strokeLinecap="round" fill="none" />
        <path d="M20 8 C20 8 26 12 30 18 C32 22 30 28 24 30" stroke={c} strokeWidth={1.6} strokeLinecap="round" fill="none" opacity={0.6} />
        <line x1={20} y1={30} x2={20} y2={38} stroke={c} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        <circle cx={20} cy={8} r={3.5} stroke={c} strokeWidth={1.3} fill={`${c}15`} />
        <circle cx={20} cy={8} r={1.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQNanoFeatures() {
  return (
    <SectionWrapper id="iq-nano-features" className="bg-background">
      {/* Top border with green accent */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.28) 30%, rgba(52,211,153,0.38) 50%, rgba(52,211,153,0.28) 70%, transparent)',
        boxShadow: '0 0 12px rgba(52,211,153,0.12)',
      }} />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(52,211,153,0.04) 0%, transparent 70%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
            IQ Nano Key Features
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Engineered for<br />
            <span style={{ background: 'linear-gradient(135deg, #34d399, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Indoor Excellence
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 500, lineHeight: 1.7 }}>
            Every component of the IQ Nano is purpose-built to maximize performance, safety, and efficiency in demanding indoor environments.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #34d399, transparent)' }} />
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
          {FEATURES.map(f => (
            <motion.div
              key={f.label}
              variants={itemVariants}
              className="group relative p-5 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.02]"
              style={{ background: `${f.color}07`, border: `1px solid ${f.color}18` }}
              whileHover={{ borderColor: `${f.color}42` }}
            >
              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `radial-gradient(ellipse at top right, ${f.color}18 0%, transparent 70%)`,
              }} />

              {/* Icon */}
              <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110" style={{
                background: `${f.color}10`, border: `1px solid ${f.color}25`,
              }}>
                {f.icon(f.color)}
              </div>

              {/* Label */}
              <p className="font-sans font-semibold text-white/85 group-hover:text-white transition-colors duration-200 mb-2" style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>
                {f.label}
              </p>

              {/* Description */}
              <p className="font-sans text-text-muted" style={{ fontSize: '1.125rem', lineHeight: 1.55 }}>
                {f.desc}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `linear-gradient(to right, transparent, ${f.color}60, transparent)`,
              }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
