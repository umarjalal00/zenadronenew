'use client'

import { useRef }               from 'react'
import Image                    from 'next/image'
import { motion, useInView }    from 'framer-motion'
import { Container }            from '@/components/ui/Container'
import { SectionWrapper }       from '@/components/ui/SectionWrapper'
import { FadeIn }               from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Key specs ────────────────────────────────────────────────────────────────
const SPECS = [
  { label: 'Footprint',        value: '41 × 41 in',      color: '#00d4ff' },
  { label: 'Flight Time',      value: '~20 min',          color: '#a78bfa' },
  { label: 'Design',           value: 'Rotary VTOL',      color: '#34d399' },
  { label: 'Landing',          value: 'Retractable Gear', color: '#fbbf24' },
  { label: 'Sensors',          value: 'Interchangeable',  color: '#f472b6' },
  { label: 'Collision Detect', value: 'Advanced AI',      color: '#22d3ee' },
]

// ─── Feature pill icons ───────────────────────────────────────────────────────
const FEATURES = [
  {
    label: 'Intuitive Controls',
    desc:  'Responsive flight controls designed for operators of any experience level.',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx={20} cy={20} r={12} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M16 20 L20 16 L24 20 L20 24 Z" stroke={c} strokeWidth={1.3} fill={`${c}20`} />
        <circle cx={20} cy={20} r={2.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Smooth Navigation',
    desc:  'AI-stabilized flight paths with precise waypoint tracking in any wind condition.',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M8 28 C12 22 16 16 20 16 C24 16 28 22 32 28" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={20} cy={12} r={4} stroke={c} strokeWidth={1.4} />
        <circle cx={20} cy={12} r={1.8} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Autonomous Recharge',
    desc:  'Lands on its own charging pad and resumes mission without operator intervention.',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={9} y={14} width={22} height={12} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <rect x={31} y={18} width={3} height={6} rx={1.5} stroke={c} strokeWidth={1.2} />
        <rect x={11} y={16} width={14} height={8} rx={2} fill={c} opacity={0.6} />
        <path d="M21 11 L18 19 L21 19 L18 27" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Collision Detection',
    desc:  'Advanced 360° sensing identifies and avoids obstacles in real time.',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M20 8 L32 28 L8 28 Z" stroke={c} strokeWidth={1.5} fill={`${c}10`} strokeLinejoin="round" />
        <line x1={20} y1={15} x2={20} y2={22} stroke={c} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={20} cy={25} r={1.4} fill={c} />
      </svg>
    ),
  },
  {
    label: 'Interchangeable Cameras',
    desc:  'Swap between 4K optical, thermal, and multispectral sensors in minutes.',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={5} y={12} width={22} height={16} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M27 18 L35 14 L35 26 L27 22 Z" stroke={c} strokeWidth={1.2} strokeLinejoin="round" />
        <circle cx={16} cy={20} r={4} stroke={c} strokeWidth={1.3} />
        <circle cx={16} cy={20} r={1.5} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Sleek VTOL Design',
    desc:  'Rotary takeoff and landing in tight spaces — no runway required.',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M20 6 L26 18 L34 20 L26 22 L20 34 L14 22 L6 20 L14 18 Z" stroke={c} strokeWidth={1.4} fill={`${c}08`} strokeLinejoin="round" />
        <circle cx={20} cy={20} r={4} fill={c} opacity={0.85} />
      </svg>
    ),
  },
]

// ─── Animated paragraph ───────────────────────────────────────────────────────
function AnimPara({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref    = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.p
      ref={ref}
      className="font-sans text-text-muted leading-relaxed"
      style={{ fontSize: '1.125rem' }}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {text}
    </motion.p>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQSquareOverview() {
  return (
    <SectionWrapper id="iq-square-overview" className="bg-background">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Dot pattern bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.055) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>State-of-the-Art</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Practical Drone<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Technology
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }} />
        </FadeIn>

        {/* Two-column: text + image */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 mb-20 items-center">
          <div className="space-y-5">
            <AnimPara text="The IQ Square is built for multiple outdoor line-of-site inspection uses, including building and construction site inspections, power line inspections, and short-range land surveys. It can also be equipped for power washing applications." />
            <AnimPara delay={0.12} text="It is also built for the defense sector for various inspection, surveillance, security, and short distance reconnaissance missions. The drone can be equipped with interchangeable cameras and sensors and offers a flight time of approximately 20 minutes before autonomously landing on its recharging pad." />
            <AnimPara delay={0.22} text="The IQ Square features a rotary VTOL (Vertical Takeoff and Landing) design with a footprint of approximately 41×41 inches, retractable landing gear, and a sleek streamlined body. It is engineered for intuitive operator controls, smooth navigation, and advanced collision detection." />
          </div>

          {/* Image card */}
          <FadeIn delay={0.2} direction="left">
            <div className="relative rounded-2xl overflow-hidden" style={{
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(0,212,255,0.15)',
              aspectRatio: '4/3',
            }}>
              {/* Glow corners */}
              <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.14) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(251,191,36,0.1) 0%, transparent 70%)' }} />

              <Image
                src="/images/sequre.jpeg"
                alt="ZenaDrone IQ Square side view"
                fill
                className="object-cover"
                style={{ opacity: 0.88 }}
              />

              {/* Overlay label */}
              <div className="absolute bottom-4 left-4 z-20 px-3 py-2 rounded-xl" style={{
                background: 'rgba(7,7,15,0.75)',
                border: '1px solid rgba(0,212,255,0.2)',
                backdropFilter: 'blur(12px)',
              }}>
                <p className="font-mono font-bold text-primary uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>ZenaDrone IQ Square</p>
                <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>41×41&quot; · VTOL · ~20 min</p>
              </div>

              {/* Corner brackets overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                {[
                  { x1: 4, y1: 4, x2: 14, y2: 4 }, { x1: 4, y1: 4, x2: 4, y2: 14 },
                  { x1: 96, y1: 4, x2: 86, y2: 4 }, { x1: 96, y1: 4, x2: 96, y2: 14 },
                  { x1: 4, y1: 96, x2: 14, y2: 96 }, { x1: 4, y1: 96, x2: 4, y2: 86 },
                  { x1: 96, y1: 96, x2: 86, y2: 96 }, { x1: 96, y1: 96, x2: 96, y2: 86 },
                ].map((l, i) => (
                  <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`} stroke="#00d4ff" strokeWidth="0.8" opacity="0.55" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            </div>
          </FadeIn>
        </div>

        {/* Specs grid */}
        <FadeIn className="text-center mb-10">
          <p className="font-mono font-bold uppercase tracking-[0.25em] mb-2" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Technical Specifications</p>
          <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Engineered for Precision
          </h3>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {SPECS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.07}>
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{
                background: `${s.color}07`,
                border: `1px solid ${s.color}18`,
              }}>
                <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: s.color, opacity: 0.7 }} />
                <div>
                  <p className="font-mono font-bold" style={{ fontSize: '0.88rem', color: s.color }}>{s.value}</p>
                  <p className="font-mono text-text-muted uppercase tracking-[0.12em]" style={{ fontSize: '0.8125rem' }}>{s.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Feature cards */}
        <FadeIn className="text-center mb-12">
          <p className="font-mono font-bold uppercase tracking-[0.25em] mb-3" style={{ fontSize: '0.8125rem', color: '#34d399' }}>Capabilities</p>
          <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Built for Every Mission
          </h3>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.6 }}>
            Six core capabilities that make IQ Square ready for inspection, surveillance, and defense operations in any environment.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {FEATURES.map(f => (
            <motion.div
              key={f.label}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl cursor-default overflow-hidden"
              style={{ background: `${f.color}07`, border: `1px solid ${f.color}1e` }}
              whileHover={{ y: -4, borderColor: `${f.color}55`, transition: { duration: 0.3 } }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px]" style={{
                background: `linear-gradient(to right, transparent, ${f.color}90, transparent)`,
                opacity: 0.45,
              }} />

              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: `radial-gradient(ellipse at top right, ${f.color}20 0%, transparent 70%)`,
              }} />

              {/* Icon + header row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 group-hover:scale-110" style={{
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}30`,
                  boxShadow: `0 0 20px ${f.color}15`,
                }}>
                  {f.icon(f.color)}
                </div>
                <svg viewBox="0 0 16 16" fill="none" width={16} height={16} className="mt-1 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5">
                  <path d="M5 8 H12 M9 5 L12 8 L9 11" stroke={f.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Label */}
              <p className="font-display font-semibold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                {f.label}
              </p>

              {/* Description */}
              <p className="font-sans leading-relaxed" style={{ fontSize: '0.875rem', color: 'rgb(136,153,180)', lineHeight: 1.55 }}>
                {f.desc}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{
                background: f.color,
                boxShadow: `0 0 8px ${f.color}`,
              }} />
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTAs */}
        <FadeIn className="flex justify-center gap-4 mt-12">
          <a href="/iq-square#iq-square-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#07070f', fontSize: '0.88rem', boxShadow: '0 0 20px rgba(0,212,255,0.3)' }}>
            Contact Us
          </a>
          <a href="/iq-square#iq-square-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem' }}>
            Book A Service
          </a>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
