'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

const STATS = [
  { value: '4+ Hours', label: 'Endurance', color: '#0ea5e9' },
  { value: 'GAS',      label: 'Propulsion', color: '#0ea5e9' },
  { value: 'AI',       label: 'Target Intercept', color: '#a78bfa' },
  { value: 'SWARM',    label: 'Multi-Unit Ops', color: '#ef4444' },
]

const HIGHLIGHTS = [
  {
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <path d="M4 28 Q4 20 10 18 Q16 16 22 18 Q28 20 28 28" stroke={c} strokeWidth={1.4} fill={`${c}10`} strokeLinejoin="round" />
        <path d="M10 18 Q8 10 12 7 Q16 4 20 7 Q24 10 22 18" stroke={c} strokeWidth={1.2} fill="none" />
        <circle cx={16} cy={12} r={3} stroke={c} strokeWidth={1.3} />
        <line x1={16} y1={9} x2={16} y2={5} stroke={c} strokeWidth={1} strokeLinecap="round" />
      </svg>
    ),
    color: '#0ea5e9',
    title: 'Maritime Launch & Recovery',
    body: 'Autonomous platform designed for vessel-based deployment and retrieval in challenging open-ocean environments.',
  },
  {
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <circle cx={16} cy={16} r={11} stroke={c} strokeWidth={1.3} />
        <circle cx={16} cy={16} r={6}  stroke={c} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
        <circle cx={16} cy={16} r={2}  fill={c} opacity={0.9} />
        <line x1={16} y1={5}  x2={16} y2={9}  stroke={c} strokeWidth={1.4} strokeLinecap="round" />
        <line x1={16} y1={23} x2={16} y2={27} stroke={c} strokeWidth={1.4} strokeLinecap="round" />
        <line x1={5}  y1={16} x2={9}  y2={16} stroke={c} strokeWidth={1.4} strokeLinecap="round" />
        <line x1={23} y1={16} x2={27} y2={16} stroke={c} strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    ),
    color: '#a78bfa',
    title: 'IQ Glider Deployment',
    body: 'Launch IQ Glider drones mid-mission for persistent ISR coverage and communications relay across wide maritime areas.',
  },
  {
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <path d="M6 20 L12 8 L20 14 L26 6" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={12} cy={8}  r={2.2} fill={c} opacity={0.85} />
        <circle cx={26} cy={6}  r={2.2} fill={c} opacity={0.85} />
        <path d="M5 26 Q10 22 16 24 Q22 26 27 22" stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
    color: '#ef4444',
    title: 'AI-Driven Intercept',
    body: 'Onboard AI identifies, classifies, and intercepts aerial and surface threats in real time with minimal operator intervention.',
  },
  {
    icon: (c: string) => (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <rect x={5}  y={5}  width={9}  height={9}  rx={2} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={18} y={5}  width={9}  height={9}  rx={2} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={5}  y={18} width={9}  height={9}  rx={2} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={18} y={18} width={9}  height={9}  rx={2} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <line x1={14} y1={9.5} x2={18} y2={9.5} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.6} />
        <line x1={9.5} y1={14} x2={9.5} y2={18} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.6} />
        <line x1={22.5} y1={14} x2={22.5} y2={18} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.6} />
        <line x1={14} y1={22.5} x2={18} y2={22.5} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
    color: '#34d399',
    title: 'Swarm-Ready Architecture',
    body: 'Coordinate multiple ZenaDrone 2000 units and IQ Gliders in synchronized swarm operations for area saturation coverage.',
  },
]

function StatPill({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl"
      style={{ background: 'var(--surface-card-el)', border: `1px solid ${stat.color}20` }}
    >
      <span className="font-display font-bold" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: stat.color, letterSpacing: '-0.03em' }}>
        {stat.value}
      </span>
      <span className="font-mono font-bold uppercase tracking-[0.2em] text-text-muted" style={{ fontSize: '0.8125rem' }}>
        {stat.label}
      </span>
    </motion.div>
  )
}

function HighlightCard({ item, index }: { item: typeof HIGHLIGHTS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 p-5 rounded-2xl"
      style={{ background: 'var(--surface-card-el)', border: `1px solid ${item.color}16` }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}12`, border: `1px solid ${item.color}22` }}>
        {item.icon(item.color)}
      </div>
      <div>
        <h4 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.2rem', letterSpacing: '-0.015em' }}>{item.title}</h4>
        <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.6 }}>{item.body}</p>
      </div>
    </motion.div>
  )
}

export function ZD2000Overview() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <SectionWrapper id="zd2000-overview" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(14,165,233,0.2) 30%, rgba(14,165,233,0.2) 70%, transparent)',
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>
        <div ref={ref} className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{
              aspectRatio: '4/3',
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(14,165,233,0.2)',
              boxShadow: '0 0 60px rgba(14,165,233,0.08)',
            }}>
              {/* Maritime tactical display — animated SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 360" fill="none" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="ovOceanGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="ovVesselGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ocean background */}
                <rect width="480" height="360" fill="rgba(7,7,15,0.6)" />
                <rect width="480" height="360" fill="url(#ovOceanGlow)" />

                {/* Grid overlay */}
                {Array.from({length: 9}).map((_,i) => (
                  <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="360" stroke="#0ea5e9" strokeWidth="0.3" opacity="0.07" />
                ))}
                {Array.from({length: 7}).map((_,i) => (
                  <line key={`h${i}`} x1="0" y1={i*60} x2="480" y2={i*60} stroke="#0ea5e9" strokeWidth="0.3" opacity="0.07" />
                ))}

                {/* Ocean wave lines */}
                {[60,90,120,150,180].map((y,i) => (
                  <path key={y} d={`M0 ${290+i*12} Q120 ${282+i*12} 240 ${290+i*12} Q360 ${298+i*12} 480 ${290+i*12}`}
                    stroke="#0ea5e9" strokeWidth="0.6" opacity={0.06 + i*0.01} fill="none" />
                ))}

                {/* Coverage rings from vessel */}
                {[80,130,180].map((r,i) => (
                  <circle key={r} cx="240" cy="200" r={r} stroke="#0ea5e9" strokeWidth="0.6"
                    strokeDasharray={i===0?"none":"6 6"} opacity={0.12 - i*0.03} fill="none" />
                ))}

                {/* Naval vessel — top-down silhouette */}
                <g transform="translate(190, 155)">
                  {/* Hull */}
                  <path d="M50 0 C70 0 90 8 95 25 L95 70 C95 82 85 88 50 90 C15 88 5 82 5 70 L5 25 C10 8 30 0 50 0 Z"
                    fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" strokeWidth="1.2" opacity="0.8" />
                  {/* Deck center line */}
                  <line x1="50" y1="5" x2="50" y2="85" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.25" strokeDasharray="6 4" />
                  {/* Bridge/superstructure */}
                  <rect x="30" y="28" width="40" height="28" rx="3" fill="rgba(14,165,233,0.12)" stroke="#0ea5e9" strokeWidth="0.7" opacity="0.7" />
                  {/* Launch rail */}
                  <rect x="42" y="8" width="16" height="22" rx="2" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9" strokeWidth="0.6" opacity="0.8" />
                  {/* Mast */}
                  <line x1="50" y1="28" x2="50" y2="8" stroke="#0ea5e9" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
                  <line x1="40" y1="16" x2="60" y2="16" stroke="#0ea5e9" strokeWidth="0.7" opacity="0.5" />
                </g>

                {/* ZD2000 drone above vessel */}
                <g className="zd2k-ov-drone" style={{ animation: 'zd2kOvFloat 4s ease-in-out infinite' }}>
                  <ellipse cx="240" cy="115" rx="28" ry="8" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.7" />
                  <ellipse cx="240" cy="115" rx="8" ry="14" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9" strokeWidth="1" opacity="0.9" />
                  <line x1="212" y1="115" x2="268" y2="115" stroke="#0ea5e9" strokeWidth="0.6" opacity="0.5" />
                  <circle cx="240" cy="108" r="3.5" fill="#0ea5e9" opacity="0.8" />
                  {/* Launch trajectory arc */}
                  <path d="M240 200 Q255 155 240 115" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.4" fill="none" />
                </g>

                {/* IQ Glider units */}
                {[
                  {cx: 340, cy: 100, delay: '0s'},
                  {cx: 160, cy: 90,  delay: '0.8s'},
                  {cx: 380, cy: 200, delay: '1.4s'},
                ].map((g,i) => (
                  <g key={i} style={{ animation: `zd2kOvGlider 3s ease-in-out infinite`, animationDelay: g.delay }}>
                    <ellipse cx={g.cx} cy={g.cy} rx="12" ry="4" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="0.7" opacity="0.7" />
                    <circle cx={g.cx} cy={g.cy} r="3" fill="#a78bfa" opacity="0.75" />
                    <line x1="240" y1="115" x2={g.cx} y2={g.cy} stroke="#a78bfa" strokeWidth="0.4" strokeDasharray="4 5" opacity="0.2" />
                  </g>
                ))}

                {/* Threat blips */}
                <circle cx="380" cy="80" r="4" fill="#ef4444" opacity="0.7" className="zd2k-blip1" />
                <circle cx="380" cy="80" r="10" stroke="#ef4444" strokeWidth="0.6" opacity="0.3" className="zd2k-blip1" />
                <circle cx="110" cy="130" r="3" fill="#ef4444" opacity="0.5" className="zd2k-blip2" />

                {/* Coordinate labels */}
                <text x="12" y="16" fill="#0ea5e9" fontSize="7" fontFamily="monospace" opacity="0.35">GRID: 14°N 120°E</text>
                <text x="12" y="348" fill="#0ea5e9" fontSize="7" fontFamily="monospace" opacity="0.35">ZD-2000 · MARITIME OPS</text>
                <text x="390" y="16" fill="#0ea5e9" fontSize="7" fontFamily="monospace" opacity="0.35">RANGE: 5km</text>
              </svg>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.18) 0%, transparent 60%)' }} />

              {/* Corner brackets */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                {[
                  { x1:3,y1:3,x2:11,y2:3},{x1:3,y1:3,x2:3,y2:12},
                  {x1:97,y1:3,x2:89,y2:3},{x1:97,y1:3,x2:97,y2:12},
                  {x1:3,y1:97,x2:11,y2:97},{x1:3,y1:97,x2:3,y2:88},
                  {x1:97,y1:97,x2:89,y2:97},{x1:97,y1:97,x2:97,y2:88},
                ].map((l,i) => (
                  <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
                    stroke="#0ea5e9" strokeWidth="1" opacity="0.7" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>

              {/* Status badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl" style={{
                background: 'rgba(7,7,15,0.82)', border: '1px solid rgba(14,165,233,0.28)',
                backdropFilter: 'blur(12px)',
              }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#0ea5e9', boxShadow: '0 0 8px #0ea5e9', animation: 'zd2kPulse 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#0ea5e9' }}>Maritime Platform — Active</span>
              </div>

              {/* Threat counter */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                backdropFilter: 'blur(8px)',
              }}>
                <span className="font-mono font-bold uppercase tracking-wider" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>Threats: 0 / Clear</span>
              </div>
            </div>

            {/* Floating stat */}
            <div className="absolute -bottom-5 -right-5 p-4 rounded-2xl hidden md:block" style={{
              background: 'var(--surface-card-el)', border: '1px solid rgba(14,165,233,0.22)',
              backdropFilter: 'blur(16px)',
            }}>
              <p className="font-display font-bold" style={{ fontSize: '1.5rem', color: '#0ea5e9', letterSpacing: '-0.04em', lineHeight: 1 }}>4+</p>
              <p className="font-mono font-bold uppercase tracking-[0.18em] text-text-muted mt-0.5" style={{ fontSize: '0.8125rem' }}>Hour Endurance</p>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{
              background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.22)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0ea5e9', boxShadow: '0 0 6px #0ea5e9' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#0ea5e9' }}>System Overview</span>
            </div>

            <h2 className="font-display font-bold text-white mb-5" style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.45rem)',
              letterSpacing: '-0.03em', lineHeight: 1.08,
            }}>
              Autonomous Maritime<br />
              <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Defense Platform
              </span>
            </h2>

            <p className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '1.125rem' }}>
              The ZenaDrone 2000 is an autonomous maritime drone launch and recovery platform engineered for naval vessels, offshore installations, and coast guard operations. It provides persistent situational awareness, AI-driven threat intercept, and IQ Glider deployment capability — all without requiring manual intervention.
            </p>

            <p className="font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem' }}>
              Purpose-built as a force multiplier, the ZenaDrone 2000 delivers defense-grade capability at a fraction of traditional system costs, enabling navies and maritime security forces to extend operational coverage far beyond the reach of conventional assets.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map((s, i) => <StatPill key={s.label} stat={s} delay={0.15 + i * 0.06} />)}
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <FadeIn delay={0.2} className="grid sm:grid-cols-2 gap-4 mt-16">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={item.title} item={item} index={i} />
          ))}
        </FadeIn>
      </Container>

      <style>{`
        @keyframes zd2kPulse    { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes zd2kOvFloat  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes zd2kOvGlider { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </SectionWrapper>
  )
}
