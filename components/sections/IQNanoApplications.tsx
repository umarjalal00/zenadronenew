'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Application data ─────────────────────────────────────────────────────────
const APPLICATIONS = [
  {
    label: 'Inventory Management',
    desc: 'Automate scanning processes, reduce human error and increase efficiency within your inventory management systems.',
    color: '#34d399',
    metric: '99.9%',
    metricLabel: 'Scan Accuracy',
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        {/* Warehouse shelves */}
        <rect x={6} y={6} width={36} height={36} rx={3} stroke={c} strokeWidth={1.3} fill={`${c}06`} />
        {/* Shelf lines */}
        <line x1={6} y1={18} x2={42} y2={18} stroke={c} strokeWidth={0.8} opacity={0.4} />
        <line x1={6} y1={30} x2={42} y2={30} stroke={c} strokeWidth={0.8} opacity={0.4} />
        {/* Boxes on shelves */}
        <rect x={10} y={8} width={8} height={8} rx={1} fill={c} opacity={0.55} />
        <rect x={20} y={8} width={8} height={8} rx={1} fill={c} opacity={0.35} />
        <rect x={30} y={8} width={8} height={8} rx={1} fill={c} opacity={0.45} />
        {/* QR pattern */}
        <rect x={10} y={20} width={5} height={5} rx={0.5} fill={c} opacity={0.5} />
        <rect x={10} y={26} width={5} height={3} rx={0.5} fill={c} opacity={0.3} />
        <rect x={16} y={20} width={3} height={3} rx={0.5} fill={c} opacity={0.4} />
        {/* Scan beam */}
        <line x1={6} y1={24} x2={42} y2={24} stroke={c} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
        <circle cx={24} cy={24} r={2.5} fill={c} opacity={0.7} />
      </svg>
    ),
  },
  {
    label: 'Warehouse Mapping',
    desc: 'Generate precise 3D maps of warehouse layouts for better planning and optimal space utilization.',
    color: '#00d4ff',
    metric: '3D',
    metricLabel: 'Precision Maps',
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        {/* 3D box outline */}
        <path d="M24 8 L38 16 L38 32 L24 40 L10 32 L10 16 Z" stroke={c} strokeWidth={1.4} fill={`${c}06`} strokeLinejoin="round" />
        <line x1={24} y1={8} x2={24} y2={40} stroke={c} strokeWidth={0.7} opacity={0.35} />
        <line x1={10} y1={16} x2={38} y2={16} stroke={c} strokeWidth={0.7} opacity={0.35} />
        {/* Floor grid */}
        <path d="M10 32 L24 40 L38 32" stroke={c} strokeWidth={0.8} opacity={0.4} />
        {/* Drone dot */}
        <circle cx={24} cy={24} r={3.5} fill={c} opacity={0.85} />
        <circle cx={24} cy={24} r={6} stroke={c} strokeWidth={0.8} opacity={0.3} strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    label: 'Maintenance & Compliance',
    desc: 'Enhance safety protocols by monitoring areas that may be challenging or unsafe for personnel to reach or observe.',
    color: '#a78bfa',
    metric: '24/7',
    metricLabel: 'Monitoring',
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        <path d="M24 6 L38 12 L38 26 C38 34.8 31.2 41.8 24 44 C16.8 41.8 10 34.8 10 26 L10 12 Z" stroke={c} strokeWidth={1.4} fill={`${c}06`} />
        <path d="M17 24 L21.5 28.5 L31 19" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {/* Gears */}
        <circle cx={34} cy={38} r={4} stroke={c} strokeWidth={1.2} opacity={0.5} />
        <circle cx={34} cy={38} r={1.5} fill={c} opacity={0.6} />
        <line x1={34} y1={33} x2={34} y2={35} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={34} y1={41} x2={34} y2={43} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={29} y1={38} x2={31} y2={38} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={37} y1={38} x2={39} y2={38} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    label: 'Safety & Security',
    desc: 'Ensure the maintenance and good working order of buildings, assets, and machinery in hard-to-access indoor locations.',
    color: '#fbbf24',
    metric: 'LIVE',
    metricLabel: 'Monitoring Feed',
    icon: (c: string) => (
      <svg viewBox="0 0 48 48" fill="none" width={42} height={42}>
        {/* Camera */}
        <rect x={6} y={14} width={28} height={20} rx={3} stroke={c} strokeWidth={1.4} fill={`${c}06`} />
        <path d="M34 20 L42 16 L42 32 L34 28 Z" stroke={c} strokeWidth={1.2} strokeLinejoin="round" />
        <circle cx={20} cy={24} r={5.5} stroke={c} strokeWidth={1.3} />
        <circle cx={20} cy={24} r={2} fill={c} opacity={0.85} />
        {/* Recording dot */}
        <circle cx={39} cy={10} r={3} fill={c} opacity={0.7} style={{ animation: 'iqnAppBlink 1.5s ease-in-out infinite' }} />
        <circle cx={39} cy={10} r={5} stroke={c} strokeWidth={0.7} opacity={0.3} />
      </svg>
    ),
  },
]

// ─── Animated metric badge ────────────────────────────────────────────────────
function MetricBadge({ value, label, color }: { value: string; label: string; color: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className="flex flex-col items-center"
    >
      <span className="font-display font-bold" style={{ fontSize: '1.8rem', color, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </span>
      <span className="font-mono text-text-muted uppercase tracking-[0.14em] mt-1" style={{ fontSize: '0.8125rem' }}>{label}</span>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQNanoApplications() {
  return (
    <SectionWrapper id="iq-nano-applications" className="bg-background">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
      }} />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(52,211,153,0.04) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
            Applications
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Transforming Indoor<br />
            <span style={{ background: 'linear-gradient(135deg, #34d399, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Operations
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 520, lineHeight: 1.7 }}>
            The IQ Nano delivers measurable efficiency gains across the full spectrum of warehouse and facility operations.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #34d399, transparent)' }} />
        </FadeIn>

        {/* Application cards — 2×2 large format */}
        <StaggerChildren className="grid md:grid-cols-2 gap-6 mb-16" staggerDelay={0.1}>
          {APPLICATIONS.map(app => (
            <motion.div
              key={app.label}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.015]"
              style={{ background: `${app.color}07`, border: `1px solid ${app.color}1a` }}
              whileHover={{ borderColor: `${app.color}42` }}
            >
              {/* Glow corners */}
              <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `radial-gradient(ellipse at top right, ${app.color}18 0%, transparent 70%)`,
              }} />
              <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `radial-gradient(ellipse at bottom left, ${app.color}10 0%, transparent 70%)`,
              }} />

              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 group-hover:scale-110" style={{
                  background: `${app.color}10`, border: `1px solid ${app.color}28`,
                }}>
                  {app.icon(app.color)}
                </div>

                <div className="flex-1">
                  {/* Label */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-sans font-bold text-white group-hover:text-white transition-colors" style={{ fontSize: '0.95rem', lineHeight: 1.25 }}>
                      {app.label}
                    </h3>
                    {/* Metric badge */}
                    <div className="flex-shrink-0 text-right">
                      <MetricBadge value={app.metric} label={app.metricLabel} color={app.color} />
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.82rem' }}>
                    {app.desc}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `linear-gradient(to right, transparent, ${app.color}55, transparent)`,
              }} />
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Impact stats strip */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(52,211,153,0.12)',
          }}>
            {[
              { val: '99.9%',  label: 'Scan Accuracy',   color: '#34d399' },
              { val: '60%',    label: 'Faster Counts',    color: '#00d4ff' },
              { val: '0',      label: 'GPS Dependency',   color: '#a78bfa' },
              { val: '20 min', label: 'Flight Time',      color: '#fbbf24' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-7 px-4 text-center" style={{ background: 'var(--surface-card-el)' }}>
                <span className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: s.color, letterSpacing: '-0.03em' }}>
                  {s.val}
                </span>
                <span className="font-mono text-text-muted uppercase tracking-[0.14em]" style={{ fontSize: '0.8125rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      <style>{`
        @keyframes iqnAppBlink { 0%,100% { opacity: 0.7; } 50% { opacity: 0.2; } }
      `}</style>
    </SectionWrapper>
  )
}
