'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── SVG Visuals ─────────────────────────────────────────────────────────────

function FlightPathSVG() {
  const waypoints = [
    { x: 68,  y: 220, n: '01' },
    { x: 148, y: 110, n: '02' },
    { x: 255, y: 160, n: '03' },
    { x: 340, y: 75,  n: '04' },
    { x: 400, y: 180, n: '05' },
  ]

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 460 280" fill="none" className="w-full h-full">
        <defs>
          <pattern id="flightGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="flightAtmos" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width="460" height="280" fill="rgba(7,7,15,0.5)" rx="12"/>
        <rect width="460" height="280" fill="url(#flightGrid)" rx="12"/>
        <ellipse cx={230} cy={140} rx={200} ry={130} fill="url(#flightAtmos)"/>

        {/* Ground terrain */}
        <path d="M0,240 Q60,220 100,230 Q140,240 180,225 Q220,210 260,228 Q300,245 340,230 Q380,215 420,235 L460,240 L460,280 L0,280 Z"
          fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.12)" strokeWidth={0.8}/>

        {/* Flight path */}
        <path d={`M ${waypoints.map(w => `${w.x},${w.y}`).join(' L ')}`}
          stroke="#00d4ff" strokeWidth={1.2} strokeDasharray="6 4" opacity={0.45} fill="none"/>

        {/* Animated flight trail */}
        <path d={`M ${waypoints.map(w => `${w.x},${w.y}`).join(' L ')}`}
          stroke="#00d4ff" strokeWidth={2} fill="none"
          opacity={0.25}
          style={{ strokeDasharray: 400, strokeDashoffset: 400, animation: 'flightTrail 4s ease-in-out infinite' }}/>

        {/* Waypoints */}
        {waypoints.map((w, i) => (
          <g key={i}>
            <circle cx={w.x} cy={w.y} r={16} stroke="#00d4ff" strokeWidth={0.8}
              fill="rgba(0,212,255,0.06)" opacity={0.6}
              style={{ animation: 'flightWptPulse 2.4s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}/>
            <circle cx={w.x} cy={w.y} r={7}  stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.1)"/>
            <circle cx={w.x} cy={w.y} r={2.5} fill="#00d4ff" opacity={0.9}/>
            <text x={w.x} y={w.y - 22} textAnchor="middle" fill="#00d4ff" fontSize="6" fontFamily="monospace" opacity={0.65}>{`WPT ${w.n}`}</text>
          </g>
        ))}

        {/* Animated drone icon on path */}
        <g style={{ animation: 'flightDroneMove 4s ease-in-out infinite' }}>
          {/* Drone at WPT 01 position, moves along */}
          <circle cx={68} cy={220} r={9} stroke="#fbbf24" strokeWidth={1.3} fill="rgba(251,191,36,0.1)"/>
          <path d="M68,217 L68,223 M65,220 L71,220" stroke="#fbbf24" strokeWidth={1.4} strokeLinecap="round"/>
          <circle cx={68} cy={220} r={2} fill="#fbbf24"/>
          <text x={68} y={210} textAnchor="middle" fill="#fbbf24" fontSize="5.5" fontFamily="monospace" fontWeight="bold">P-1</text>
        </g>

        {/* Altitude indicators */}
        {waypoints.slice(1, 4).map((w, i) => (
          <g key={i}>
            <line x1={w.x} y1={w.y} x2={w.x} y2={250}
              stroke="#00d4ff" strokeWidth={0.6} strokeDasharray="3 4" opacity={0.25}/>
            <text x={w.x} y={265} textAnchor="middle" fill="#00d4ff" fontSize="5.5" fontFamily="monospace" opacity={0.45}>
              {`${(3 - i) * 40}m`}
            </text>
          </g>
        ))}

        {/* Status panels */}
        <rect x={14} y={12} width={130} height={36} rx={3} fill="rgba(7,7,15,0.8)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.5}/>
        <text x={22} y={25} fill="#00d4ff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">AUTO FLIGHT</text>
        <text x={22} y={38} fill="#00d4ff" fontSize="5.5" fontFamily="monospace" opacity={0.6}>5 WAYPOINTS LOADED</text>

        <rect x={312} y={12} width={134} height={22} rx={3} fill="rgba(7,7,15,0.8)" stroke="rgba(251,191,36,0.2)" strokeWidth={0.5}/>
        <text x={320} y={26} fill="#fbbf24" fontSize="5.5" fontFamily="monospace" opacity={0.7}>SPEED: 15m/s | ALT: 120m</text>
      </svg>

      <style>{`
        @keyframes flightTrail    { 0%{stroke-dashoffset:400} 60%{stroke-dashoffset:0} 100%{stroke-dashoffset:-400} }
        @keyframes flightWptPulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.3);opacity:0.2} }
        @keyframes flightDroneMove{ 0%,100%{transform:translate(0,0)} 40%{transform:translate(180px,-110px)} 80%{transform:translate(332px,-45px)} }
      `}</style>
    </div>
  )
}

function AINetworkSVG() {
  const nodes = [
    { x: 230, y: 140, r: 24, label: 'AI', color: '#00d4ff', main: true },
    { x: 100, y: 75,  r: 16, label: 'AGR', color: '#34d399' },
    { x: 230, y: 55,  r: 14, label: 'RE', color: '#fbbf24' },
    { x: 360, y: 75,  r: 16, label: 'DEF', color: '#ef4444' },
    { x: 390, y: 175, r: 14, label: 'SAR', color: '#f97316' },
    { x: 330, y: 240, r: 16, label: 'UTL', color: '#a78bfa' },
    { x: 130, y: 240, r: 16, label: 'ENV', color: '#34d399' },
    { x: 70,  y: 175, r: 14, label: 'MED', color: '#00d4ff' },
  ]

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 460 280" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="aiAtmos" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width="460" height="280" fill="rgba(7,7,15,0.5)" rx="12"/>
        <ellipse cx={230} cy={140} rx={200} ry={150} fill="url(#aiAtmos)"/>

        {/* Connection lines */}
        {nodes.slice(1).map((n, i) => (
          <g key={i}>
            <line x1={230} y1={140} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth={0.8} opacity={0.2}/>
            {/* Animated pulse dot */}
            <circle r={2.5} fill={n.color} opacity={0.8}
              style={{ animation: `aiPulse${i} 3s ease-in-out infinite`, animationDelay: `${i * 0.38}s` }}>
              <animateMotion
                path={`M230,140 L${n.x},${n.y}`}
                dur={`${2.5 + i * 0.2}s`}
                repeatCount="indefinite"
                begin={`${i * 0.38}s`}/>
            </circle>
          </g>
        ))}

        {/* Outer ring */}
        <circle cx={230} cy={140} r={130} stroke="#00d4ff" strokeWidth={0.5}
          strokeDasharray="6 8" opacity={0.15}
          style={{ transformOrigin: '230px 140px', animation: 'aiRingRotate 22s linear infinite' }}/>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            {n.main && (
              <>
                <circle cx={n.x} cy={n.y} r={40} fill={`${n.color}08`}
                  style={{ animation: 'aiCenterPulse 2.5s ease-in-out infinite', transformOrigin: `${n.x}px ${n.y}px` }}/>
                <circle cx={n.x} cy={n.y} r={32} stroke={n.color} strokeWidth={0.6}
                  fill="none" opacity={0.2}/>
              </>
            )}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill={`${n.color}10`} stroke={n.color} strokeWidth={1.2} opacity={0.85}/>
            <text x={n.x} y={n.y + (n.main ? 4 : 4)} textAnchor="middle"
              fill={n.color} fontSize={n.main ? 9 : 7} fontFamily="monospace" fontWeight="bold">{n.label}</text>
          </g>
        ))}

        {/* Full industry labels */}
        {[
          { x: 100, y: 55,  label: 'Agriculture',  color: '#34d399' },
          { x: 230, y: 34,  label: 'Real Estate',  color: '#fbbf24' },
          { x: 374, y: 55,  label: 'Defense',       color: '#ef4444' },
          { x: 410, y: 175, label: 'Search & Rescue', color: '#f97316' },
          { x: 344, y: 258, label: 'Utilities',     color: '#a78bfa' },
          { x: 116, y: 258, label: 'Environment',   color: '#34d399' },
          { x: 46,  y: 175, label: 'Media',         color: '#00d4ff' },
        ].map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor="middle"
            fill={l.color} fontSize="5.5" fontFamily="monospace" opacity={0.55}>{l.label}</text>
        ))}
      </svg>

      <style>{`
        @keyframes aiCenterPulse { 0%,100%{transform:scale(1);opacity:0.08} 50%{transform:scale(1.15);opacity:0.04} }
        @keyframes aiRingRotate  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  )
}

function CarbonFiberSVG() {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 460 280" fill="none" className="w-full h-full">
        <defs>
          <pattern id="hexPat" width="36" height="31.18" patternUnits="userSpaceOnUse">
            <polygon points="18,0 36,9.09 36,22.09 18,31.18 0,22.09 0,9.09"
              fill="none" stroke="rgba(52,211,153,0.18)" strokeWidth="0.8"/>
          </pattern>
          <radialGradient id="cfAtmos" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width="460" height="280" fill="rgba(7,7,15,0.5)" rx="12"/>
        <rect width="460" height="280" fill="url(#hexPat)" rx="12"/>
        <ellipse cx={230} cy={140} rx={200} ry={140} fill="url(#cfAtmos)"/>

        {/* Drone body outline — top-down */}
        <g transform="translate(230, 140)">
          {/* Main body */}
          <ellipse cx={0} cy={0} rx={55} ry={38} stroke="#34d399" strokeWidth={1.4}
            fill="rgba(52,211,153,0.06)" opacity={0.85}/>

          {/* Arms */}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 * Math.PI) / 180
            const x1 = Math.cos(a) * 38, y1 = Math.sin(a) * 38
            const x2 = Math.cos(a) * 78, y2 = Math.sin(a) * 78
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#34d399" strokeWidth={1.4} opacity={0.6} strokeLinecap="round"/>
                <circle cx={x2} cy={y2} r={9}
                  stroke="#34d399" strokeWidth={1} fill="rgba(52,211,153,0.08)" opacity={0.7}/>
              </g>
            )
          })}

          {/* Camera */}
          <circle cx={0} cy={0} r={10} stroke="#34d399" strokeWidth={1.2} fill="rgba(52,211,153,0.1)"/>
          <circle cx={0} cy={0} r={4} fill="#34d399" opacity={0.85}/>

          {/* Body detail lines */}
          <line x1={-55} y1={0} x2={55} y2={0} stroke="#34d399" strokeWidth={0.6} opacity={0.25}/>
          <line x1={0} y1={-38} x2={0} y2={38} stroke="#34d399" strokeWidth={0.6} opacity={0.25}/>
        </g>

        {/* Material callouts */}
        {[
          { x: 80, y: 55, label: 'Carbon Fiber', sub: 'Body & Frame' },
          { x: 370, y: 60, label: 'Foldable Arms', sub: 'CF Propellers' },
          { x: 78, y: 220, label: 'Heat Resistant', sub: 'UV + Humidity' },
          { x: 370, y: 218, label: 'Lightweight', sub: '~3kg MTOW' },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x - 46} y={c.y - 16} width={92} height={32} rx={3}
              fill="rgba(7,7,15,0.8)" stroke="rgba(52,211,153,0.2)" strokeWidth={0.5}/>
            <text x={c.x} y={c.y - 4} textAnchor="middle" fill="#34d399" fontSize="6.5" fontFamily="monospace" fontWeight="bold">{c.label}</text>
            <text x={c.x} y={c.y + 8}  textAnchor="middle" fill="#34d399" fontSize="5.5" fontFamily="monospace" opacity={0.6}>{c.sub}</text>
          </g>
        ))}

        {/* Scanning beam */}
        <line x1={0} y1={140} x2={460} y2={140}
          stroke="#34d399" strokeWidth={1.5} opacity={0}
          style={{ animation: 'cfScan 3s ease-in-out infinite' }}/>

        {/* Corner brackets */}
        <path d="M10,10 L28,10 M10,10 L10,28" stroke="#34d399" strokeWidth={1} opacity={0.4} strokeLinecap="round"/>
        <path d="M450,10 L432,10 M450,10 L450,28" stroke="#34d399" strokeWidth={1} opacity={0.4} strokeLinecap="round"/>
        <path d="M10,270 L28,270 M10,270 L10,252" stroke="#34d399" strokeWidth={1} opacity={0.4} strokeLinecap="round"/>
        <path d="M450,270 L432,270 M450,270 L450,252" stroke="#34d399" strokeWidth={1} opacity={0.4} strokeLinecap="round"/>
      </svg>

      <style>{`
        @keyframes cfScan { 0%,100%{opacity:0;transform:translateY(-100px)} 50%{opacity:0.15;transform:translateY(0)} }
      `}</style>
    </div>
  )
}

// ─── Highlight data ────────────────────────────────────────────────────────────
const HIGHLIGHTS = [
  {
    id: 'self-flying',
    color: '#00d4ff',
    tag: 'Self-Flying Smart Drone',
    title: 'Pre-Scheduled\nAutomatic Flight Plans',
    body: 'ZenaDrone 1000 can fly on a pre-scheduled automatic flight plan. The pilot controller can create pre-determined flight routes in the field using mobile software or by using web-based flight planning software based on all available data.',
    badges: ['Auto Waypoints', 'Mobile Control', 'Web Planning', 'Field Routes'],
    visual: <FlightPathSVG />,
    imgRight: false,
  },
  {
    id: 'ai-industry',
    color: '#fbbf24',
    tag: 'AI for Multi-Industries',
    title: 'AI Across Every\nMajor Industry',
    body: "ZenaDrone's artificial intelligence and integrated software capabilities help agriculture, real estate inspection, power grid companies, media, entertainment, search and rescue, and other industries with GPS tagging, thermal scanning, and terrain mapping functions.",
    badges: ['GPS Tagging', 'Thermal Scan', 'Terrain Mapping', 'Multi-Industry'],
    visual: <AINetworkSVG />,
    imgRight: true,
  },
  {
    id: 'carbon-fiber',
    color: '#34d399',
    tag: 'Durable Carbon Fiber Body',
    title: 'Built to Withstand\nAny Environment',
    body: "ZenaDrone's portable size is fitted with foldable carbon fiber propellers for quicker speed and steadfast hovering in the air. Its body is enveloped and reinforced with durable carbon fiber wrap to resist humidity, heat, moisture, and other atmospheric impacts.",
    badges: ['Carbon Fiber', 'Humidity Proof', 'Heat Resistant', 'Foldable Arms'],
    visual: <CarbonFiberSVG />,
    imgRight: false,
  },
]

function HighlightRow({ h, index }: { h: typeof HIGHLIGHTS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: h.imgRight ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 self-start" style={{
        background: `${h.color}0e`, border: `1px solid ${h.color}28`,
      }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: h.color }}/>
        <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: h.color }}>{h.tag}</span>
      </div>

      <h3 className="font-display font-bold text-white mb-5" style={{
        fontSize: 'clamp(1.85rem, 3.5vw, 2.9rem)',
        letterSpacing: '-0.025em', lineHeight: 1.1, whiteSpace: 'pre-line',
      }}>
        {h.title}
      </h3>

      <p className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '1.125rem' }}>
        {h.body}
      </p>

      <div className="flex flex-wrap gap-2">
        {h.badges.map(b => (
          <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{
            background: `${h.color}0a`, border: `1px solid ${h.color}20`,
            fontSize: '0.8125rem', color: h.color, fontFamily: 'monospace',
          }}>
            <span className="w-1 h-1 rounded-full" style={{ background: h.color, opacity: 0.8 }}/>
            {b}
          </span>
        ))}
      </div>
    </motion.div>
  )

  const visCol = (
    <motion.div
      initial={{ opacity: 0, x: h.imgRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/10', background: 'var(--surface-card-el)', border: `1px solid ${h.color}18` }}
    >
      {h.visual}
    </motion.div>
  )

  return (
    <div ref={ref} id={h.id} className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
      {h.imgRight ? <>{textCol}{visCol}</> : <>{visCol}{textCol}</>}
    </div>
  )
}

export function FeaturesHighlights() {
  return (
    <SectionWrapper id="features-highlights" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 30%, rgba(0,212,255,0.15) 70%, transparent)',
      }}/>

      <Container>
        <FadeIn className="text-center mb-20">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            Core Technology
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            letterSpacing: '-0.025em', lineHeight: 1.08,
          }}>
            Intelligence Built<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Into Every Flight
            </span>
          </h2>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }}/>
        </FadeIn>

        <div className="flex flex-col gap-24">
          {HIGHLIGHTS.map((h, i) => <HighlightRow key={h.id} h={h} index={i}/>)}
        </div>
      </Container>
    </SectionWrapper>
  )
}
