'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

const CAPABILITIES = [
  {
    id: 'maritime-launch',
    color: '#0ea5e9',
    tag: 'Maritime Launch & Recovery',
    title: 'Vessel-Based\nAutonomous Operations',
    body: 'The ZenaDrone 2000 is engineered for deployment from naval vessels, offshore platforms, and coastline stations. Its autonomous launch and recovery system handles wave motion, salt spray, and high-wind conditions without manual handling — enabling rapid redeployment cycles day or night.',
    badges: ['Auto Launch', 'Wave Compensation', 'Night Ops', 'Rapid Redeploy'],
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <path d="M4 30 Q10 22 16 26 Q20 28 24 22 Q28 16 36 20" stroke={c} strokeWidth={1.6} strokeLinecap="round" fill="none" opacity={0.4} />
        <path d="M4 34 Q10 28 16 30 Q20 32 24 28 Q28 24 36 26 L36 36 L4 36 Z" fill={`${c}18`} stroke={c} strokeWidth={0.8} opacity={0.5} />
        <rect x={14} y={16} width={12} height={8} rx={1.5} stroke={c} strokeWidth={1.4} fill={`${c}10`} />
        <line x1={20} y1={8} x2={20} y2={16} stroke={c} strokeWidth={1.3} strokeLinecap="round" />
        <path d="M16 11 L20 8 L24 11" stroke={c} strokeWidth={1.2} fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'gas-endurance',
    color: '#f97316',
    tag: 'Gas-Powered Endurance',
    title: 'Extended Mission\nEndurance',
    body: 'Powered by a gas propulsion system, the ZenaDrone 2000 achieves over 4 hours of continuous flight — far exceeding battery-limited platforms. This enables persistent maritime patrol, extended search-and-rescue operations, and long-range ISR sorties without returning to base.',
    badges: ['4+ Hours Flight', 'GAS Propulsion', 'Long Range', 'Persistent ISR'],
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <path d="M10 32 Q10 20 14 16 Q20 10 26 16 Q30 20 30 32" stroke={c} strokeWidth={1.5} fill={`${c}10`} strokeLinejoin="round" />
        <path d="M18 24 Q20 18 22 24" stroke={c} strokeWidth={1.2} strokeLinecap="round" fill={`${c}20`} />
        <circle cx={20} cy={26} r={3} stroke={c} strokeWidth={1.3} />
        <line x1={10} y1={32} x2={30} y2={32} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.5} />
        <path d="M22 14 Q26 8 24 4" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    id: 'ai-intercept',
    color: '#ef4444',
    tag: 'AI-Driven Intercept',
    title: 'Autonomous Threat\nNeutralisation',
    body: 'Advanced onboard AI continuously scans for aerial and surface threats, classifying targets by type, trajectory, and risk level. Once a threat is confirmed, the system autonomously coordinates intercept maneuvers — reducing human reaction time from minutes to milliseconds.',
    badges: ['Threat Detection', 'Auto Classification', 'Intercept Ops', 'Real-Time AI'],
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <circle cx={20} cy={20} r={13} stroke={c} strokeWidth={1.4} strokeDasharray="5 3" opacity={0.4} />
        <circle cx={20} cy={20} r={8}  stroke={c} strokeWidth={1.2} />
        <circle cx={20} cy={20} r={3}  fill={c} opacity={0.9} />
        <line x1={20} y1={7}  x2={20} y2={12} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={20} y1={28} x2={20} y2={33} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={7}  y1={20} x2={12} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={28} y1={20} x2={33} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
  },
]

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col p-7 rounded-3xl overflow-hidden"
      style={{
        background: 'var(--surface-card-el)',
        border: `1px solid ${cap.color}18`,
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cap.color}35` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cap.color}18` }}
    >
      {/* Corner glow */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none" style={{
        background: `radial-gradient(ellipse at top left, ${cap.color}0e 0%, transparent 70%)`,
      }} />

      {/* Tag row */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
          background: `${cap.color}10`, border: `1px solid ${cap.color}20`,
        }}>
          {cap.icon(cap.color)}
        </div>
        <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: cap.color }}>{cap.tag}</span>
      </div>

      <h3 className="font-display font-bold text-white mb-4" style={{
        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
        letterSpacing: '-0.025em', lineHeight: 1.15, whiteSpace: 'pre-line',
      }}>
        {cap.title}
      </h3>

      <p className="font-sans text-text-muted leading-relaxed mb-6 flex-1" style={{ fontSize: '1.125rem' }}>
        {cap.body}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {cap.badges.map(b => (
          <span key={b} className="px-2.5 py-1 rounded-lg font-mono" style={{
            background: `${cap.color}0a`, border: `1px solid ${cap.color}1e`,
            fontSize: '0.8125rem', color: cap.color,
          }}>
            {b}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px" style={{
        background: `linear-gradient(to right, transparent, ${cap.color}30, transparent)`,
      }} />
    </motion.div>
  )
}

export function ZD2000Capabilities() {
  return (
    <SectionWrapper id="zd2000-capabilities" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(14,165,233,0.12) 30%, rgba(14,165,233,0.12) 70%, transparent)',
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(14,165,233,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.025) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#0ea5e9' }}>
            Core Capabilities
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            letterSpacing: '-0.025em', lineHeight: 1.08,
          }}>
            Built for the Hardest<br />
            <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Maritime Missions
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 540, lineHeight: 1.7 }}>
            Five defining capabilities that set the ZenaDrone 2000 apart as the leading autonomous maritime defense platform.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #0ea5e9, transparent)' }} />
        </FadeIn>

        {/* 5-card grid: 3 top + 2 bottom centered */}
        <div className="grid md:grid-cols-3 gap-5">
          {CAPABILITIES.slice(0, 3).map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-5 md:max-w-2xl md:mx-auto">
          {CAPABILITIES.slice(3).map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={3 + i} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
