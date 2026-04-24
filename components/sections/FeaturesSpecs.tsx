'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

const SPECS = [
  {
    id: 'octa-rotor',
    color: '#00d4ff',
    tag: 'Power System',
    title: 'Octa Quad\nDrone',
    body: 'ZenaDrone has eight rotors increasing lift, power, agility, and maneuverability at high rates of speed. The redundant rotor system ensures continued stable flight even if a motor experiences issues.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <circle cx={20} cy={20} r={7} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <circle cx={20} cy={20} r={2.5} fill={c} opacity={0.9}/>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 * Math.PI) / 180
          const x1 = 20 + 7 * Math.cos(a), y1 = 20 + 7 * Math.sin(a)
          const x2 = 20 + 15 * Math.cos(a), y2 = 20 + 15 * Math.sin(a)
          const x3 = 20 + 18 * Math.cos(a), y3 = 20 + 18 * Math.sin(a)
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1.2} opacity={0.6} strokeLinecap="round"/>
              <circle cx={x3} cy={y3} r={3.5} stroke={c} strokeWidth={0.9} fill={`${c}0a`} opacity={0.75}/>
            </g>
          )
        })}
      </svg>
    ),
  },
  {
    id: 'vtol',
    color: '#fbbf24',
    tag: 'Flight Mode',
    title: 'VTOL\nFlight Mode',
    body: 'ZenaDrone is capable of vertical take-off and landing (VTOL), can hover steadily, and requires a small footprint for launch. No runway required — deploys from any location in seconds.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <path d="M20 6 L20 22" stroke={c} strokeWidth={1.5} strokeLinecap="round"/>
        <path d="M14 12 L20 6 L26 12" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 30 Q14 26 20 28 Q26 30 30 26" stroke={c} strokeWidth={1.3} strokeLinecap="round" fill="none"/>
        <path d="M8 34 Q14 30 20 32 Q26 34 32 30 L32 36 L8 36 Z" fill={`${c}15`} stroke={c} strokeWidth={0.7} opacity={0.6}/>
        <circle cx={20} cy={22} r={3} stroke={c} strokeWidth={1.2} fill={`${c}10`}/>
      </svg>
    ),
  },
  {
    id: 'carbon-fiber',
    color: '#34d399',
    tag: 'Frame Material',
    title: 'Carbon Fiber\nBody',
    body: "ZenaDrone's frame, body, and mounting plates are constructed using strong composite carbon fiber material, ensuring the drone's durability and resilience against environmental stress and impacts.",
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        {Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 4 }, (_, col) => {
            const hx = col * 9 + 5, hy = r * 9 + 4
            return (
              <polygon key={`${r}-${col}`}
                points={`${hx+4},${hy} ${hx+8},${hy+2} ${hx+8},${hy+6} ${hx+4},${hy+8} ${hx},${hy+6} ${hx},${hy+2}`}
                fill="none" stroke={c} strokeWidth="0.7" opacity="0.55"/>
            )
          })
        )}
        <rect x={6} y={6} width={28} height={28} rx={3} stroke={c} strokeWidth={1.2} fill="none" opacity={0.45}/>
      </svg>
    ),
  },
  {
    id: 'auto-charge',
    color: '#f97316',
    tag: 'Power Management',
    title: 'Automatic\nWireless Charging',
    body: "ZenaDrone's innovative renewable energy monitoring technology uses a patent-pending wireless charging pad that allows the drone to automatically detect and land on the power source for hands-free charging.",
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <ellipse cx={20} cy={30} rx={14} ry={4} stroke={c} strokeWidth={1.2} fill={`${c}08`}/>
        <ellipse cx={20} cy={30} rx={8}  ry={2.5} stroke={c} strokeWidth={1} fill={`${c}0a`} opacity={0.6}/>
        <path d="M20 8 L20 22" stroke={c} strokeWidth={1.4} strokeLinecap="round"/>
        <path d="M14 14 L20 8 L26 14" stroke={c} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 18 L20 13 L24 18 L21 18 L21 24 L19 24 L19 18 Z" fill={c} opacity={0.85}/>
        {[8, 12, 16].map(r => (
          <ellipse key={r} cx={20} cy={30} rx={r} ry={r * 0.3}
            stroke={c} strokeWidth={0.6} fill="none" opacity={0.25 - r * 0.01}/>
        ))}
      </svg>
    ),
  },
  {
    id: 'geo-thermal',
    color: '#a78bfa',
    tag: 'Sensors',
    title: 'Geo Tagging &\nThermal Detection',
    body: 'ZenaDrone can tag plants and predict health outcomes, detect potential problems in livestock management with its multispectral sensors. GPS tagging and thermal imaging combine for precise field analysis.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <circle cx={20} cy={16} r={9} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <circle cx={20} cy={16} r={4} stroke={c} strokeWidth={1} strokeDasharray="2 2" opacity={0.5}/>
        <circle cx={20} cy={16} r={1.5} fill={c} opacity={0.9}/>
        <path d="M20 25 L24 34 L20 31 L16 34 Z" fill={c} opacity={0.7}/>
        <path d="M10 12 Q9 8 12 6 Q16 4 20 7" stroke={c} strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.5}/>
        <path d="M30 12 Q31 8 28 6 Q24 4 20 7" stroke={c} strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.5}/>
      </svg>
    ),
  },
  {
    id: 'flight-time',
    color: '#ef4444',
    tag: 'Battery System',
    title: 'Extended\nFlight Time',
    body: 'ZenaDrone has a built-in and long-lasting battery for extended and uninterrupted flight time. The high-capacity Lithium Polymer battery provides sustained mission endurance for comprehensive area coverage.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <rect x={9} y={12} width={22} height={20} rx={2} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <rect x={16} y={9} width={8} height={5} rx={1} stroke={c} strokeWidth={1.1} fill={`${c}10`}/>
        <rect x={11} y={14} width={18} height={4} rx={1} fill={c} opacity={0.85}/>
        <rect x={11} y={20} width={14} height={4} rx={1} fill={c} opacity={0.55}/>
        <rect x={11} y={26} width={8}  height={4} rx={1} fill={c} opacity={0.25}/>
        <path d="M20 14 L18 20 L21 20 L19 28" stroke="white" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.6}/>
      </svg>
    ),
  },
]

const INDUSTRIES = [
  { name: 'Military',                      color: '#ef4444' },
  { name: 'Industrial Zoning',             color: '#f97316' },
  { name: 'Insurance Claims',              color: '#fbbf24' },
  { name: 'Weather Prediction',            color: '#00d4ff' },
  { name: 'Livestock Management',          color: '#34d399' },
  { name: 'Property Management',           color: '#a78bfa' },
  { name: 'Film & Media',                  color: '#f97316' },
  { name: 'Search & Rescue',               color: '#ef4444' },
  { name: 'Architecture & Construction',   color: '#fbbf24' },
  { name: 'Mining',                        color: '#34d399' },
  { name: 'City Planning',                 color: '#00d4ff' },
  { name: 'Emergency Services',            color: '#ef4444' },
  { name: 'Cargo & Logistics',             color: '#a78bfa' },
  { name: 'Power Lines & Grids',           color: '#fbbf24' },
  { name: 'Renewable Energy',              color: '#34d399' },
  { name: 'Oil & Gas Industry',            color: '#f97316' },
  { name: 'Security & Surveillance',       color: '#ef4444' },
  { name: 'Warehousing & Inventory',       color: '#00d4ff' },
  { name: 'Agriculture & Farming',         color: '#34d399' },
  { name: 'Environmental Monitoring',      color: '#a78bfa' },
]

function SpecCard({ spec, index }: { spec: typeof SPECS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col p-6 rounded-2xl"
      style={{ background: 'var(--surface-card-el)', border: `1px solid ${spec.color}16` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${spec.color}32` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${spec.color}16` }}
    >
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{
        background: `radial-gradient(ellipse at top left, ${spec.color}0c 0%, transparent 70%)`,
      }}/>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: `${spec.color}0e`, border: `1px solid ${spec.color}1e`,
        }}>
          {spec.icon(spec.color)}
        </div>
        <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: spec.color }}>{spec.tag}</span>
      </div>
      <h3 className="font-display font-bold text-white mb-3" style={{
        fontSize: '1.15rem', letterSpacing: '-0.02em', lineHeight: 1.15, whiteSpace: 'pre-line',
      }}>
        {spec.title}
      </h3>
      <p className="font-sans text-text-muted leading-relaxed text-sm flex-1">{spec.body}</p>
      <div className="absolute bottom-0 left-6 right-6 h-px" style={{
        background: `linear-gradient(to right, transparent, ${spec.color}28, transparent)`,
      }}/>
    </motion.div>
  )
}

export function FeaturesSpecs() {
  return (
    <SectionWrapper id="features-specs" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.12) 30%, rgba(0,212,255,0.12) 70%, transparent)',
      }}/>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
      }}/>

      <Container>
        {/* Header + description */}
        <FadeIn className="max-w-5xl mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px" style={{ width: 32, background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
            <p className="font-mono font-bold uppercase tracking-[0.28em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
              ZenaDrone 1000 Features
            </p>
          </div>

          {/* Title */}
          <h2 className="font-display font-bold text-white mb-6" style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
            letterSpacing: '-0.03em', lineHeight: 1.04,
          }}>
            Evolved for Multi-Industrial{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Excellence
            </span>
          </h2>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { value: '8',    label: 'Rotor System' },
              { value: '20+',  label: 'Industries' },
              { value: 'AI',   label: 'Autonomous' },
              { value: 'VTOL', label: 'Flight Mode' },
            ].map(s => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-display font-bold" style={{ fontSize: '1.5rem', color: '#00d4ff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span className="font-mono uppercase tracking-[0.12em]" style={{ fontSize: '0.72rem', color: 'rgb(136,153,180)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="font-sans text-text-muted leading-relaxed mb-4" style={{ fontSize: '1.125rem' }}>
            ZenaDrone has upgraded its prototype features and functionalities in its current iteration, the ZenaDrone 1000. Since its initial release, ZenaDrone has evolved into a multi-industrial solution for aerial surveillance, inspection, monitoring, and data gathering.
          </p>
          <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
            It is the first proven AI-powered agricultural drone that has produced outstanding results in multiple business and government fields — combining original drone features, artificial intelligence, and machine learning software systems to meet the demand for technological innovation.
          </p>
        </FadeIn>

        {/* 6 spec cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {SPECS.map((spec, i) => <SpecCard key={spec.id} spec={spec} index={i}/>)}
        </div>

        {/* Industries section */}
        <FadeIn>
          <div className="relative p-8 md:p-10 rounded-3xl overflow-hidden" style={{
            background: 'var(--surface-card-el)',
            border: '1px solid rgba(0,212,255,0.12)',
          }}>
            <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.06) 0%, transparent 70%)',
            }}/>
            <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(52,211,153,0.05) 0%, transparent 70%)',
            }}/>

            <p className="font-mono font-bold uppercase tracking-[0.25em] mb-2" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
              Industry Applications
            </p>
            <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Beneficial Across Complex
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Industrial Environments</span>
            </h3>
            <p className="font-sans text-text-muted mb-8" style={{ fontSize: '0.9rem', maxWidth: 620 }}>
              Including but not limited to the following sectors where aerial intelligence delivers measurable operational impact:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {INDUSTRIES.map((ind, i) => (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: 'backOut' }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono" style={{
                    background: `${ind.color}08`, border: `1px solid ${ind.color}1e`,
                    fontSize: '1.125rem', color: ind.color,
                  }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ind.color, opacity: 0.8 }}/>
                    {ind.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
