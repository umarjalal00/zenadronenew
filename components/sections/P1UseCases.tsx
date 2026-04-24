'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

const USE_CASES = [
  {
    n: '01',
    color: '#ef4444',
    title: 'Military & Tactical Defense',
    body: 'Deployed at forward operating bases and naval assets for rapid-response interception of enemy surveillance and attack drones. Operates autonomously in contested airspace without relying on GPS or external communication links.',
    tags: ['Forward Base', 'Naval Deploy', 'GPS-Denied Ops'],
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <path d="M18 4 L32 12 L32 24 C32 29 25 33 18 35 C11 33 4 29 4 24 L4 12 Z"
          stroke={c} strokeWidth={1.4} fill={`${c}08`} strokeLinejoin="round"/>
        <path d="M13 18 L16 21 L23 14" stroke={c} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    n: '02',
    color: '#f97316',
    title: 'Border & Edge Security',
    body: 'Protects national borders and sensitive edge zones from drone-based incursions, reconnaissance flights, and payload delivery attempts. Rapid-deployment systems can be pre-positioned at high-risk crossing points.',
    tags: ['Border Control', 'Perimeter', 'Pre-Positioned'],
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <rect x={4} y={14} width={28} height={14} rx={2} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <path d="M4 14 L18 6 L32 14" stroke={c} strokeWidth={1.3} strokeLinejoin="round"/>
        <line x1={18} y1={28} x2={18} y2={32} stroke={c} strokeWidth={1.3} strokeLinecap="round"/>
        <line x1={12} y1={32} x2={24} y2={32} stroke={c} strokeWidth={1.3} strokeLinecap="round"/>
        <circle cx={18} cy={18} r={3} stroke={c} strokeWidth={1.2}/>
      </svg>
    ),
  },
  {
    n: '03',
    color: '#fbbf24',
    title: 'Critical Infrastructure Protection',
    body: 'Guards power plants, water facilities, data centers, and transport hubs against drone-based attacks or surveillance. Integrates with existing security systems for automated, layered air defense coverage.',
    tags: ['Power Plants', 'Data Centers', 'Transport Hubs'],
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <rect x={5}  y={18} width={10} height={13} rx={1} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <rect x={13} y={12} width={10} height={19} rx={1} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <rect x={21} y={20} width={10} height={11} rx={1} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <line x1={3} y1={31} x2={33} y2={31} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5}/>
        <path d="M18 6 L21 12 L15 12 Z" fill={c} opacity={0.8}/>
      </svg>
    ),
  },
  {
    n: '04',
    color: '#a78bfa',
    title: 'Sensitive Area Drone Protection',
    body: 'Prevents unauthorized drone access over prisons, government facilities, stadiums, and VIP locations. The P-1 provides a fast, silent intercept layer that complements camera and jamming-based detection systems.',
    tags: ['Government Sites', 'Prisons', 'Stadiums', 'VIP Security'],
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <circle cx={18} cy={18} r={12} stroke={c} strokeWidth={1.3} strokeDasharray="4 3" opacity={0.5}/>
        <circle cx={18} cy={18} r={7}  stroke={c} strokeWidth={1.2}/>
        <circle cx={18} cy={18} r={2.5} fill={c} opacity={0.9}/>
        <path d="M12 6 L18 4 L24 6" stroke={c} strokeWidth={1} opacity={0.45} strokeLinecap="round"/>
        <path d="M6 12 L4 18 L6 24" stroke={c} strokeWidth={1} opacity={0.45} strokeLinecap="round"/>
        <path d="M30 12 L32 18 L30 24" stroke={c} strokeWidth={1} opacity={0.45} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: '05',
    color: '#34d399',
    title: 'Urban Airspace Monitoring',
    body: 'Monitors and enforces city airspace restrictions, protecting urban populations from rogue drones delivering contraband, conducting illegal surveillance, or posing collision risks to air traffic.',
    tags: ['Urban Ops', 'Air Traffic Safety', 'No-Fly Zones'],
    icon: (c: string) => (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <rect x={4}  y={20} width={7}  height={11} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}08`}/>
        <rect x={14} y={14} width={8}  height={17} rx={1} stroke={c} strokeWidth={1.2} fill={`${c}08`}/>
        <rect x={25} y={22} width={7}  height={9}  rx={1} stroke={c} strokeWidth={1.2} fill={`${c}08`}/>
        <line x1={2} y1={31} x2={34} y2={31} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4}/>
        <path d="M8 14 Q12 8 18 10 Q22 12 26 8" stroke={c} strokeWidth={1.2} strokeLinecap="round" fill="none"/>
        <circle cx={26} cy={8} r={2} fill={c} opacity={0.8}
          style={{ animation: 'p1UseCasePulse 1.8s ease-in-out infinite' }}/>
      </svg>
    ),
  },
]

function UseCaseCard({ uc, index }: { uc: typeof USE_CASES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-5 p-6 rounded-2xl"
      style={{ background: 'var(--surface-card-el)', border: `1px solid ${uc.color}14` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${uc.color}30` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${uc.color}14` }}
    >
      {/* Number */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{
          background: `${uc.color}0e`, border: `1px solid ${uc.color}22`,
        }}>
          {uc.icon(uc.color)}
        </div>
        <span className="font-mono font-bold" style={{ fontSize: '0.8125rem', color: uc.color, opacity: 0.5 }}>{uc.n}</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.015em' }}>
          {uc.title}
        </h3>
        <p className="font-sans text-text-muted leading-relaxed mb-3" style={{ fontSize: '0.84rem' }}>
          {uc.body}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {uc.tags.map(t => (
            <span key={t} className="px-2 py-1 rounded-md font-mono" style={{
              background: `${uc.color}08`, border: `1px solid ${uc.color}18`,
              fontSize: '0.8125rem', color: uc.color,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Why Choose animated diagram ──────────────────────────────────────────────
function ThreatWaveDiagram() {
  return (
    <svg viewBox="0 0 420 280" fill="none" className="w-full" style={{ maxHeight: 280 }}>
      <defs>
        <radialGradient id="p1ThreatGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="420" height="280" fill="url(#p1ThreatGrad)" rx="12"/>

      {/* Grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 52 + 4} y1={0} x2={i * 52 + 4} y2={280}
          stroke="#ef4444" strokeWidth={0.4} opacity={0.07}/>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 50 + 15} x2={420} y2={i * 50 + 15}
          stroke="#ef4444" strokeWidth={0.4} opacity={0.07}/>
      ))}

      {/* Threat drones incoming — left side */}
      {[
        { y: 55,  delay: '0s',    label: 'THREAT A' },
        { y: 130, delay: '0.7s',  label: 'THREAT B' },
        { y: 205, delay: '1.4s',  label: 'THREAT C' },
      ].map((t, i) => (
        <g key={i}>
          {/* Trail */}
          <line x1={20} y1={t.y} x2={90} y2={t.y}
            stroke="#ef4444" strokeWidth={0.7} strokeDasharray="4 3" opacity={0.25}/>
          {/* Drone body */}
          <g style={{ animation: 'p1ThreatIncoming 3s ease-in-out infinite', animationDelay: t.delay }}>
            <rect x={14} y={t.y - 5} width={14} height={10} rx={2}
              fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth={0.9}/>
            <line x1={14} y1={t.y - 3} x2={8} y2={t.y - 8}  stroke="#ef4444" strokeWidth={0.9} opacity={0.7}/>
            <line x1={28} y1={t.y - 3} x2={34} y2={t.y - 8} stroke="#ef4444" strokeWidth={0.9} opacity={0.7}/>
            <line x1={14} y1={t.y + 3} x2={8} y2={t.y + 8}  stroke="#ef4444" strokeWidth={0.9} opacity={0.7}/>
            <line x1={28} y1={t.y + 3} x2={34} y2={t.y + 8} stroke="#ef4444" strokeWidth={0.9} opacity={0.7}/>
            <text x={21} y={t.y - 9} textAnchor="middle" fill="#ef4444" fontSize="5.5" fontFamily="monospace" opacity={0.6}>{t.label}</text>
          </g>
        </g>
      ))}

      {/* P-1 interceptors — right side */}
      {[
        { x: 310, y: 55,  delay: '0.4s',  color: '#ef4444' },
        { x: 320, y: 130, delay: '1s',    color: '#ef4444' },
        { x: 305, y: 205, delay: '1.8s',  color: '#f97316' },
      ].map((p, i) => (
        <g key={i}>
          {/* Intercept trajectory */}
          <line x1={p.x} y1={p.y} x2={110} y2={[55,130,205][i]}
            stroke={p.color} strokeWidth={0.7} strokeDasharray="4 3" opacity={0.22}/>
          {/* P-1 shape */}
          <g transform={`translate(${p.x}, ${p.y})`}
            style={{ animation: 'p1Intercept 3s ease-in-out infinite', animationDelay: p.delay }}>
            <path d="M -7,0 C -5,-3 0,-5 0,-8 C 0,-5 5,-3 7,0 L 3,5 L 0,3 L -3,5 Z"
              fill={p.color} opacity={0.92}/>
            <ellipse cx={0} cy={6} rx={1.5} ry={3} fill="#f97316" opacity={0.6}
              style={{ animation: 'p1Engine 0.3s ease-in-out infinite alternate', animationDelay: p.delay }}/>
          </g>
        </g>
      ))}

      {/* Center intercept zone */}
      <circle cx={210} cy={140} r={40} stroke="#ef4444" strokeWidth={0.8} fill="rgba(239,68,68,0.04)"
        strokeDasharray="5 4" opacity={0.4}/>
      <circle cx={210} cy={140} r={20} stroke="#ef4444" strokeWidth={0.6} fill="none" opacity={0.25}/>
      <text x={210} y={144} textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" fontWeight="bold" opacity={0.5}>INTERCEPT</text>
      <text x={210} y={152} textAnchor="middle" fill="#ef4444" fontSize="5" fontFamily="monospace" opacity={0.4}>ZONE</text>

      {/* Neutralize markers */}
      {[[130, 55], [130, 130], [130, 205]].map(([x, y], i) => (
        <g key={i} style={{ animation: 'p1NeutBlink 1.5s ease-in-out infinite', animationDelay: `${i * 0.5 + 1.5}s` }}>
          <circle cx={x} cy={y} r={8} stroke="#34d399" strokeWidth={0.9} fill="rgba(52,211,153,0.08)" opacity={0.7}/>
          <path d={`M ${x-4} ${y} L ${x-1} ${y+4} L ${x+5} ${y-4}`}
            stroke="#34d399" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.8}/>
        </g>
      ))}

      {/* Cost annotations */}
      <rect x={340} y={18} width={72} height={32} rx={4} fill="rgba(7,7,15,0.7)" stroke="rgba(239,68,68,0.2)" strokeWidth={0.5}/>
      <text x={376} y={31} textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" fontWeight="bold">THREAT</text>
      <text x={376} y={40} textAnchor="middle" fill="#ef4444" fontSize="5.5" fontFamily="monospace" opacity={0.6}>~$500</text>

      <rect x={340} y={58} width={72} height={32} rx={4} fill="rgba(7,7,15,0.7)" stroke="rgba(249,115,22,0.2)" strokeWidth={0.5}/>
      <text x={376} y={71} textAnchor="middle" fill="#f97316" fontSize="6" fontFamily="monospace" fontWeight="bold">P-1 COST</text>
      <text x={376} y={80} textAnchor="middle" fill="#f97316" fontSize="5.5" fontFamily="monospace" opacity={0.6}>&lt;$5,000</text>

      <rect x={340} y={98} width={72} height={32} rx={4} fill="rgba(7,7,15,0.7)" stroke="rgba(239,68,68,0.3)" strokeWidth={0.5}/>
      <text x={376} y={111} textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" fontWeight="bold">MISSILE</text>
      <text x={376} y={120} textAnchor="middle" fill="#ef4444" fontSize="5.5" fontFamily="monospace" opacity={0.6}>$100K+</text>

      <style>{`
        @keyframes p1ThreatIncoming { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes p1Intercept { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,0)} }
        @keyframes p1NeutBlink { 0%,70%{opacity:0} 80%,100%{opacity:1} }
        @keyframes p1Engine { from{opacity:0.25} to{opacity:0.75} }
        @keyframes p1UseCasePulse { 0%,100%{opacity:0.8} 50%{opacity:0.2} }
      `}</style>
    </svg>
  )
}

export function P1UseCases() {
  return (
    <SectionWrapper id="p1-use-cases" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.14) 30%, rgba(239,68,68,0.14) 70%, transparent)',
      }}/>

      <Container>
        {/* Use Cases */}
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>
            Use Cases
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            letterSpacing: '-0.025em', lineHeight: 1.08,
          }}>
            Protecting What<br />
            <span style={{ background: 'linear-gradient(135deg, #ef4444, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Matters Most
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 500, lineHeight: 1.7 }}>
            The Interceptor P-1 is purpose-built for environments where speed, flexibility, and low cost are non-negotiable.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)' }}/>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {USE_CASES.map((uc, i) => <UseCaseCard key={uc.n} uc={uc} index={i}/>)}
        </div>

        {/* Built for Modern Threats + Why Choose */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <FadeIn>
            <div className="rounded-3xl overflow-hidden p-6" style={{
              background: 'var(--surface-card-el)', border: '1px solid rgba(239,68,68,0.14)',
            }}>
              <ThreatWaveDiagram />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-8">
            {/* Built for Modern */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444' }}/>
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>Built for Modern Threats</span>
              </div>
              <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                The New Era of<br />
                <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Aerial Threats
                </span>
              </h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
                The growing use of cheap drones for surveillance and attack has created new security challenges. Interceptor P-1 addresses these challenges by offering a rapid-response interception system that is both efficient and scalable — particularly effective where fast response time and operational flexibility are essential.
              </p>
            </div>

            {/* Why Choose */}
            <div className="p-5 rounded-2xl" style={{
              background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.14)',
            }}>
              <h4 className="font-display font-bold text-white mb-3" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>
                Why Choose Interceptor P-1?
              </h4>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
                A single platform that is fast, easy to use, and cheap. Designed for places where traditional air defense systems are too slow, too expensive, or too complex to set up. Operates independently and deploys in seconds — making it the optimal choice for modern anti-drone strategies.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Fast Deployment', 'Low Cost', 'No Infrastructure', 'Autonomous Ops', 'Scalable'].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg font-mono" style={{
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
                    fontSize: '0.8125rem', color: '#ef4444',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </SectionWrapper>
  )
}
