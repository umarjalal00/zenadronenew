'use client'

import { motion }  from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    label: 'Stability',
    desc: 'Quad Rotor configuration provides excellent stability during flight to capture precise geospatial or topographic data.',
    color: '#fbbf24',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M8 24 L20 12 L32 24" stroke={c} strokeWidth={1.6} strokeLinejoin="round" />
        <line x1={20} y1={12} x2={20} y2={32} stroke={c} strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
        <line x1={8} y1={32} x2={32} y2={32} stroke={c} strokeWidth={1.4} strokeLinecap="round" />
        {/* Level indicator */}
        <line x1={10} y1={28} x2={30} y2={28} stroke={c} strokeWidth={0.8} strokeDasharray="2 3" opacity={0.4} />
        <circle cx={20} cy={28} r={2} fill={c} opacity={0.8} />
      </svg>
    ),
  },
  {
    label: 'Obstacle Avoidance',
    desc: 'Real-time GPS enables the IQ Quad to detect and avoid any site obstacles during autonomous flight.',
    color: '#00d4ff',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx={20} cy={20} r={12} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M14 14 L26 26 M14 26 L26 14" stroke={c} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
        <circle cx={20} cy={20} r={4} stroke={c} strokeWidth={1.2} />
        {/* Sensor beams */}
        <line x1={20} y1={5} x2={20} y2={8} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={20} y1={32} x2={20} y2={35} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={5} y1={20} x2={8} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={32} y1={20} x2={35} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    label: 'Retractable Gear',
    desc: 'Improves aerodynamics when retracted and provides unobstructed views for cameras and sensors during surveys.',
    color: '#a78bfa',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={12} y={8} width={16} height={10} rx={2} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        {/* Body */}
        <path d="M10 18 L30 18 L32 24 L8 24 Z" stroke={c} strokeWidth={1.2} fill={`${c}08`} strokeLinejoin="round" />
        {/* Retracted leg hinge */}
        <path d="M14 24 L14 32 L18 32" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
        <path d="M26 24 L26 32 L22 32" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
        {/* Camera unobstructed */}
        <circle cx={20} cy={28} r={3} stroke={c} strokeWidth={1} opacity={0.5} />
        <circle cx={20} cy={28} r={1.2} fill={c} opacity={0.6} />
      </svg>
    ),
  },
  {
    label: 'Payload Capacity',
    desc: 'Possesses 2 to 3 kg payload capacity, ensuring it can meet all survey project requirements including LiDAR.',
    color: '#34d399',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x={12} y={18} width={16} height={14} rx={2} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M15 18 L15 14 Q15 10 20 10 Q25 10 25 14 L25 18" stroke={c} strokeWidth={1.3} strokeLinejoin="round" />
        {/* Weight arrow */}
        <line x1={20} y1={22} x2={20} y2={28} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M16 26 L20 30 L24 26" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Folding Arms',
    desc: 'Increases use versatility while enhancing portability and simplifying storage for field deployment.',
    color: '#fb923c',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx={20} cy={20} r={5} stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        {/* Arms folded */}
        <path d="M20 15 L20 6" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
        <path d="M20 25 L20 34" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
        <path d="M15 20 L6 20" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
        <path d="M25 20 L34 20" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
        {/* Fold hinges */}
        <circle cx={20} cy={7} r={2} stroke={c} strokeWidth={1} opacity={0.7} />
        <circle cx={20} cy={33} r={2} stroke={c} strokeWidth={1} opacity={0.7} />
        <circle cx={7} cy={20} r={2} stroke={c} strokeWidth={1} opacity={0.7} />
        <circle cx={33} cy={20} r={2} stroke={c} strokeWidth={1} opacity={0.7} />
      </svg>
    ),
  },
  {
    label: 'Endurance',
    desc: 'Up to 45 minutes of flight time with maximum operational range of 5 km before recharging is required.',
    color: '#f472b6',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx={20} cy={20} r={13} stroke={c} strokeWidth={1.3} fill={`${c}06`} />
        {/* Clock face */}
        <line x1={20} y1={9} x2={20} y2={12} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={20} y1={28} x2={20} y2={31} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={9} y1={20} x2={12} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <line x1={28} y1={20} x2={31} y2={20} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        {/* Hands — ~45 min mark */}
        <line x1={20} y1={20} x2={20} y2={11} stroke={c} strokeWidth={1.6} strokeLinecap="round" />
        <line x1={20} y1={20} x2={28} y2={22} stroke={c} strokeWidth={1.2} strokeLinecap="round" opacity={0.7} />
        <circle cx={20} cy={20} r={2} fill={c} opacity={0.9} />
      </svg>
    ),
  },
  {
    label: 'Autonomous Recharging',
    desc: 'Automatically lands on a charging station to recharge its batteries, minimizing downtime between missions.',
    color: '#22d3ee',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <ellipse cx={20} cy={33} rx={11} ry={3} stroke={c} strokeWidth={1.1} opacity={0.3} />
        <path d="M10 33 L10 28 Q10 24 14 22 L20 20 L26 22 Q30 24 30 28 L30 33" stroke={c} strokeWidth={1.3} fill={`${c}08`} strokeLinejoin="round" />
        <path d="M22 10 L18 19 L22 19 L18 29" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={20} cy={7} r={3} stroke={c} strokeWidth={1.2} opacity={0.5} />
      </svg>
    ),
  },
  {
    label: 'Durable Airframe',
    desc: 'Weather resistant, carbon-fiber airframe ensures consistent performance in diverse and challenging conditions.',
    color: '#6ee7b7',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" stroke={c} strokeWidth={1.4} fill={`${c}07`} strokeLinejoin="round" />
        <polygon points="20,11 29,16 29,24 20,29 11,24 11,16" stroke={c} strokeWidth={0.7} opacity={0.35} strokeLinejoin="round" />
        <circle cx={20} cy={20} r={3.5} fill={c} opacity={0.85} />
        {/* Weather lines */}
        <line x1={30} y1={7} x2={32} y2={9} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <line x1={33} y1={5} x2={35} y2={7} stroke={c} strokeWidth={0.8} strokeLinecap="round" opacity={0.3} />
      </svg>
    ),
  },
  {
    label: 'Data Security',
    desc: 'Integrated, cellular-based transmission system for secure, enterprise-level, real-time data transfer in the field.',
    color: '#818cf8',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M20 4 L32 9 L32 20 C32 28 26.5 34 20 36 C13.5 34 8 28 8 20 L8 9 Z" stroke={c} strokeWidth={1.4} fill={`${c}08`} />
        <path d="M14 20 L17.5 23.5 L26 15" stroke={c} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
        {/* Signal waves */}
        <path d="M28 10 Q31 12 31 16" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} fill="none" />
        <path d="M30 8 Q34 11 34 16" stroke={c} strokeWidth={0.8} strokeLinecap="round" opacity={0.3} fill="none" />
      </svg>
    ),
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQQuadFeatures() {
  return (
    <SectionWrapper id="iq-quad-features" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.28) 30%, rgba(251,191,36,0.38) 50%, rgba(251,191,36,0.28) 70%, transparent)',
        boxShadow: '0 0 12px rgba(251,191,36,0.1)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 70%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
            IQ Quad Key Features
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Built for<br />
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Survey-Grade Performance
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 500, lineHeight: 1.7 }}>
            Every component engineered to deliver precise, reliable geospatial data across all terrain types and conditions.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }} />
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.07}>
          {FEATURES.map(f => (
            <motion.div
              key={f.label}
              variants={itemVariants}
              className="group relative p-5 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.02]"
              style={{ background: `${f.color}07`, border: `1px solid ${f.color}18` }}
              whileHover={{ borderColor: `${f.color}42` }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: `radial-gradient(ellipse at top right, ${f.color}18 0%, transparent 70%)`,
              }} />
              <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110" style={{
                background: `${f.color}10`, border: `1px solid ${f.color}25`,
              }}>
                {f.icon(f.color)}
              </div>
              <p className="font-sans font-semibold text-white/85 group-hover:text-white transition-colors mb-2" style={{ fontSize: '0.84rem', lineHeight: 1.3 }}>
                {f.label}
              </p>
              <p className="font-sans text-text-muted" style={{ fontSize: '1.125rem', lineHeight: 1.55 }}>
                {f.desc}
              </p>
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
