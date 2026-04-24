'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container }    from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }       from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    num: '01',
    title: 'Octocopter Drone',
    desc: 'ZenaDrone 1000 has 8 rotors giving the drone greater lift, stability, and maneuverability in any operating environment.',
    color: '#00d4ff',
    specs: ['8 Rotors', 'High Lift', 'Full Stability'],
    icon: (c: string) => (
      <svg viewBox="0 0 80 80" fill="none" width={72} height={72}>
        {/* Orbit rings */}
        <circle cx={40} cy={40} r={34} stroke={c} strokeWidth={0.6} strokeDasharray="5 7" opacity={0.2} className="zdft-spin" style={{ transformOrigin: '40px 40px' }} />
        <circle cx={40} cy={40} r={26} stroke={c} strokeWidth={0.5} strokeDasharray="2 8" opacity={0.12} className="zdft-spin-rev" style={{ transformOrigin: '40px 40px' }} />
        {/* 8 arms + rotors */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const r = deg * Math.PI / 180
          const ax = 40 + 14 * Math.cos(r), ay = 40 + 14 * Math.sin(r)
          const rx = 40 + 24 * Math.cos(r), ry = 40 + 24 * Math.sin(r)
          return (
            <g key={i}>
              <line x1={40+4*Math.cos(r)} y1={40+4*Math.sin(r)} x2={ax} y2={ay} stroke={c} strokeWidth={1.5} opacity={0.55} />
              <line x1={ax} y1={ay} x2={rx} y2={ry} stroke={c} strokeWidth={1} opacity={0.4} />
              <circle cx={rx} cy={ry} r={6} stroke={c} strokeWidth={0.8} fill={`${c}08`} />
              <line x1={rx-5*Math.sin(r)} y1={ry+5*Math.cos(r)} x2={rx+5*Math.sin(r)} y2={ry-5*Math.cos(r)} stroke={c} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} className="zdft-rotor" style={{ transformOrigin: `${rx}px ${ry}px`, animationDelay: `${i*0.04}s` }} />
              <circle cx={rx} cy={ry} r={1.5} fill={c} opacity={0.85} />
            </g>
          )
        })}
        {/* Body */}
        <circle cx={40} cy={40} r={5} fill={`${c}20`} stroke={c} strokeWidth={1.3} />
        <circle cx={40} cy={40} r={2} fill={c} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'VTOL Flight Mode',
    desc: 'ZenaDrone boasts VTOL capability, steady hovering, requiring minimal footprint for take-off and landing.',
    color: '#a78bfa',
    specs: ['Vertical T/O', 'Steady Hover', '< 1m² Footprint'],
    icon: (c: string) => (
      <svg viewBox="0 0 80 80" fill="none" width={72} height={72}>
        {/* Altitude arrow */}
        <path d="M40 68 L40 20" stroke={c} strokeWidth={1} strokeDasharray="4 4" opacity={0.3} />
        <path d="M36 26 L40 18 L44 26" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
        {/* Drone body — floating */}
        <g className="zdft-float" style={{ transformOrigin: '40px 44px' }}>
          <rect x={26} y={38} width={28} height={12} rx={3} stroke={c} strokeWidth={1.3} fill={`${c}12`} />
          <circle cx={40} cy={50} r={3.5} stroke={c} strokeWidth={1} opacity={0.5} />
          {[[-14,-6],[14,-6],[-14,6],[14,6]].map(([dx,dy],i) => {
            const ex = 40+dx+(dx>0?16:-16), ey = 44+dy
            return (
              <g key={i}>
                <line x1={40+dx} y1={44+dy} x2={ex} y2={ey} stroke={c} strokeWidth={1.1} opacity={0.55} />
                <circle cx={ex} cy={ey} r={8} stroke={c} strokeWidth={0.8} fill={`${c}06`} />
                <line x1={ex-7*Math.sin(i*Math.PI/2)} y1={ey+7*Math.cos(i*Math.PI/2)} x2={ex+7*Math.sin(i*Math.PI/2)} y2={ey-7*Math.cos(i*Math.PI/2)} stroke={c} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} className="zdft-rotor" style={{ transformOrigin: `${ex}px ${ey}px`, animationDelay: `${i*0.05}s` }} />
              </g>
            )
          })}
          {/* Downwash */}
          {[30,34,38,42,46,50].map((x,i) => (
            <line key={i} x1={x} y1={52} x2={x-1} y2={60} stroke={c} strokeWidth={0.6} opacity={0.15} strokeDasharray="2 3" />
          ))}
        </g>
        {/* Ground */}
        <line x1={12} y1={68} x2={68} y2={68} stroke={c} strokeWidth={1} opacity={0.3} />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Carbon Fiber Body',
    desc: 'Constructed with a durable frame, body, and mounting plates made of resilient composite carbon fiber for long-lasting performance.',
    color: '#34d399',
    specs: ['Composite Frame', '< 4.2 kg', 'IP54 Rated'],
    icon: (c: string) => (
      <svg viewBox="0 0 80 80" fill="none" width={72} height={72}>
        {/* Carbon hex grid */}
        {Array.from({length:5}).map((_,row) =>
          Array.from({length:5}).map((_,col) => {
            const cx = 16 + col*14 + (row%2)*7, cy = 14 + row*12
            if (cx<5||cx>75||cy<5||cy>75) return null
            const pts = [0,1,2,3,4,5].map(k=>{ const a=(k*60-30)*Math.PI/180; return `${cx+6*Math.cos(a)},${cy+6*Math.sin(a)}` }).join(' ')
            const dist = Math.sqrt((cx-40)**2+(cy-40)**2)
            return <polygon key={`${row}-${col}`} points={pts} stroke={c} strokeWidth={0.6} fill={dist<20?`${c}15`:`${c}05`} opacity={Math.max(0.1, 0.6-dist/60)} />
          })
        )}
        <circle cx={40} cy={40} r={16} stroke={c} strokeWidth={1} strokeDasharray="4 3" opacity={0.2} className="zdft-spin" style={{ transformOrigin: '40px 40px' }} />
        <circle cx={40} cy={40} r={10} fill={`${c}10`} stroke={c} strokeWidth={1.2} />
        <circle cx={40} cy={40} r={4}  fill={c} opacity={0.8} />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Automatic Charging',
    desc: "Plant tracking technology uses sensors to detect the charging pad, land, and start the charge cycle automatically — zero human intervention.",
    color: '#fbbf24',
    specs: ['Auto Land', 'Sensor Detect', 'Full Auto Cycle'],
    icon: (c: string) => (
      <svg viewBox="0 0 80 80" fill="none" width={72} height={72}>
        {/* Charging platform */}
        <ellipse cx={40} cy={64} rx={22} ry={5} stroke={c} strokeWidth={1} fill={`${c}08`} />
        <ellipse cx={40} cy={64} rx={14} ry={3} stroke={c} strokeWidth={0.7} opacity={0.4} />
        <line x1={33} y1={64} x2={47} y2={64} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.7} />
        <line x1={40} y1={58} x2={40} y2={70} stroke={c} strokeWidth={1.3} strokeLinecap="round" opacity={0.7} />
        {/* Wireless rings */}
        {[0,1,2].map(i => (
          <ellipse key={i} cx={40} cy={64} rx={8+i*10} ry={5+i*7} stroke={c} strokeWidth={0.8}
            opacity={0.4-i*0.1} strokeDasharray={i%2===0?'5 4':'3 6'}
            className={`zdft-charge-${i}`} style={{ transformOrigin: '40px 64px' }}
          />
        ))}
        {/* Drone descending */}
        <g className="zdft-descend" style={{ transformOrigin: '40px 30px' }}>
          <rect x={29} y={24} width={22} height={10} rx={2.5} stroke={c} strokeWidth={1.2} fill={`${c}12`} />
          <circle cx={40} cy={34} r={3} stroke={c} strokeWidth={1} opacity={0.55} />
          {[[-12,-4],[12,-4],[-12,4],[12,4]].map(([dx,dy],i) => {
            const ex=40+dx+(dx>0?12:-12), ey=29+dy
            return (
              <g key={i}>
                <line x1={40+dx} y1={29+dy} x2={ex} y2={ey} stroke={c} strokeWidth={0.9} opacity={0.5} />
                <circle cx={ex} cy={ey} r={5.5} stroke={c} strokeWidth={0.7} fill={`${c}06`} />
                <line x1={ex-4.5} y1={ey} x2={ex+4.5} y2={ey} stroke={c} strokeWidth={2} strokeLinecap="round" opacity={0.7} className="zdft-rotor" style={{ transformOrigin: `${ex}px ${ey}px`, animationDelay: `${i*0.05}s` }} />
              </g>
            )
          })}
        </g>
        {/* Guide line */}
        <line x1={40} y1={34} x2={40} y2={58} stroke={c} strokeWidth={0.7} strokeDasharray="3 4" opacity={0.25} />
        {/* Lightning */}
        <path d="M44 44 L38 52 L42 52 L36 62" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="zdft-bolt" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Scanning & Detection',
    desc: 'Monitor, track, and scan objects, people, places, and animals using its 4K camera and advanced multispectral imaging.',
    color: '#f472b6',
    specs: ['4K 60fps', 'Thermal IR', 'Multispectral'],
    icon: (c: string) => (
      <svg viewBox="0 0 80 80" fill="none" width={72} height={72}>
        {/* Viewfinder */}
        <rect x={8} y={8} width={64} height={64} rx={2} stroke={c} strokeWidth={0.7} fill={`${c}03`} />
        {/* Corner brackets */}
        {([[8,8],[64,8],[8,64],[64,64]] as [number,number][]).map(([x,y],i) => (
          <path key={i}
            d={i===0?`M${x},${y+14} L${x},${y} L${x+14},${y}`:i===1?`M${x+8},${y+14} L${x+8},${y} L${x-6},${y}`:i===2?`M${x},${y-6} L${x},${y+8} L${x+14},${y+8}`:`M${x+8},${y-6} L${x+8},${y+8} L${x-6},${y+8}`}
            stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
          />
        ))}
        {/* Bounding boxes */}
        <rect x={18} y={18} width={18} height={24} rx={1.5} stroke={c} strokeWidth={0.9} strokeDasharray="3 2" opacity={0.6} />
        <rect x={48} y={24} width={22} height={16} rx={1.5} stroke={c} strokeWidth={0.9} strokeDasharray="3 2" opacity={0.5} />
        {/* Crosshair on target */}
        <circle cx={27} cy={30} r={8} stroke={c} strokeWidth={0.9} opacity={0.4} />
        <circle cx={27} cy={30} r={3} stroke={c} strokeWidth={1.2} opacity={0.75} />
        <circle cx={27} cy={30} r={1} fill={c} />
        <line x1={20} y1={30} x2={24} y2={30} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.7} />
        <line x1={30} y1={30} x2={34} y2={30} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.7} />
        <line x1={27} y1={22} x2={27} y2={27} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.7} />
        <line x1={27} y1={33} x2={27} y2={38} stroke={c} strokeWidth={0.9} strokeLinecap="round" opacity={0.7} />
        {/* Scan line */}
        <line x1={10} y1={40} x2={70} y2={40} stroke={c} strokeWidth={1.2} opacity={0.45} className="zdft-scanline" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Extended Flight Time',
    desc: 'Rechargeable or replaceable long-lasting battery ensures extended and uninterrupted flight time for demanding missions.',
    color: '#22d3ee',
    specs: ['45 Min Flight', 'Hot-Swap', 'Auto Recharge'],
    icon: (c: string) => (
      <svg viewBox="0 0 80 80" fill="none" width={72} height={72}>
        {/* Flight arc progress */}
        <circle cx={40} cy={40} r={30} stroke={c} strokeWidth={0.6} strokeDasharray="5 7" opacity={0.15} />
        <circle cx={40} cy={40} r={30} stroke={c} strokeWidth={2}
          strokeDasharray="104 188" strokeDashoffset="-47"
          strokeLinecap="round" opacity={0.75} className="zdft-arc" style={{ transformOrigin: '40px 40px' }} />
        {/* Orbit drone */}
        <g className="zdft-orbit" style={{ transformOrigin: '40px 40px' }}>
          <circle cx={40} cy={10} r={4.5} fill={`${c}18`} stroke={c} strokeWidth={1.2} />
          <line x1={36} y1={10} x2={44} y2={10} stroke={c} strokeWidth={2} strokeLinecap="round" className="zdft-rotor" style={{ transformOrigin: '40px 10px' }} />
          <circle cx={40} cy={10} r={1.5} fill={c} opacity={0.9} />
        </g>
        {/* Battery */}
        <rect x={22} y={32} width={36} height={22} rx={3} stroke={c} strokeWidth={1.3} fill={`${c}08`} />
        <rect x={58} y={38} width={5} height={10} rx={2.5} stroke={c} strokeWidth={1} fill={`${c}10`} />
        <rect x={24} y={34} width={32} height={18} rx={2} fill={c} opacity={0.15} className="zdft-battfill" style={{ transformOrigin: '24px 43px' }} />
        {[1,2,3].map(i => <line key={i} x1={24+i*8} y1={34} x2={24+i*8} y2={52} stroke={c} strokeWidth={0.5} opacity={0.2} />)}
        {/* Bolt */}
        <path d="M44 35 L36 44 L41 44 L33 53" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} className="zdft-bolt" />
        {/* Time display */}
        <text x={40} y={64} fill={c} fontSize="8" fontFamily="monospace" textAnchor="middle" opacity={0.6} className="zdft-timer">45:00</text>
      </svg>
    ),
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export function ZD1000Features() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <SectionWrapper className="bg-surface">
      {/* Separator */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>Capabilities</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            ZenaDrone Features
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '0.92rem', maxWidth: 500 }}>
            Purpose-built hardware and smart software engineered for real-world mission success.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.num}
              variants={itemVariants}
              className="group relative flex flex-col p-6 rounded-2xl cursor-default transition-all duration-300"
              style={{
                background: hovered === i ? `${f.color}0c` : 'var(--surface-card)',
                border: `1px solid ${hovered === i ? f.color + '35' : 'rgba(255,255,255,0.07)'}`,
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300" style={{
                opacity: hovered === i ? 1 : 0,
                background: `radial-gradient(ellipse 80% 60% at 30% 20%, ${f.color}10 0%, transparent 65%)`,
              }} />

              {/* Number + top accent */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono font-bold tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: hovered === i ? f.color : 'rgba(255,255,255,0.2)' }}>
                  {f.num}
                </span>
                {/* Top accent line */}
                <div className="h-px w-16 transition-opacity duration-300" style={{
                  background: `linear-gradient(to left, transparent, ${f.color})`,
                  opacity: hovered === i ? 1 : 0.25,
                }} />
              </div>

              {/* Icon */}
              <div className="mb-5 flex items-center justify-center w-18 h-18 rounded-2xl self-start transition-all duration-300" style={{
                background: hovered === i ? `${f.color}12` : `${f.color}08`,
                border: `1px solid ${hovered === i ? f.color + '30' : f.color + '15'}`,
                width: 72,
                height: 72,
                boxShadow: hovered === i ? `0 0 20px ${f.color}20` : 'none',
              }}>
                {f.icon(f.color)}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-white mb-2.5 transition-colors duration-200" style={{
                fontSize: '1.2rem',
                letterSpacing: '-0.015em',
                color: hovered === i ? '#fff' : '#e0e8f8',
              }}>
                {f.title}
              </h3>

              <div className="w-8 h-px mb-3 transition-all duration-300" style={{
                background: f.color,
                opacity: hovered === i ? 1 : 0.35,
                width: hovered === i ? 40 : 28,
              }} />

              <p className="font-sans text-text-muted leading-relaxed flex-1 mb-4" style={{ fontSize: '0.84rem' }}>
                {f.desc}
              </p>

              {/* Spec chips */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {f.specs.map(s => (
                  <span key={s} className="font-mono font-semibold px-2.5 py-1 rounded-lg tracking-wide" style={{
                    fontSize: '0.8125rem',
                    color: f.color,
                    background: `${f.color}0d`,
                    border: `1px solid ${f.color}25`,
                    letterSpacing: '0.1em',
                    transition: 'all 0.2s',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeIn className="text-center mt-14">
          <Link href="/zenadrone-1000#book-demo" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
              color: '#07070f',
              fontSize: '0.92rem',
              boxShadow: '0 0 28px rgba(0,212,255,0.3)',
            }}>
            Book a Demo
            <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </FadeIn>
      </Container>

      <style>{`
        .zdft-rotor     { animation: zdftSpin 0.2s linear infinite; }
        .zdft-spin      { animation: zdftSpin 20s linear infinite; }
        .zdft-spin-rev  { animation: zdftSpin 14s linear infinite reverse; }
        .zdft-float     { animation: zdftFloat 2.8s ease-in-out infinite; }
        .zdft-descend   { animation: zdftDescend 3.2s ease-in-out infinite; }
        .zdft-bolt      { animation: zdftBolt 2s step-end infinite; }
        .zdft-arc       { animation: zdftArc 8s linear infinite; }
        .zdft-orbit     { animation: zdftSpin 8s linear infinite; }
        .zdft-battfill  { animation: zdftBatt 3s ease-in-out infinite; }
        .zdft-scanline  { animation: zdftScan 2.4s ease-in-out infinite; }
        .zdft-timer     { font-variant-numeric: tabular-nums; }
        .zdft-charge-0  { animation: zdftPulse 2.0s ease-out infinite; }
        .zdft-charge-1  { animation: zdftPulse 2.0s ease-out infinite 0.55s; }
        .zdft-charge-2  { animation: zdftPulse 2.0s ease-out infinite 1.1s; }

        @keyframes zdftSpin     { to { transform: rotate(360deg); } }
        @keyframes zdftFloat    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes zdftDescend  { 0%,100% { transform: translateY(-18px); opacity:0.5; } 65% { transform: translateY(8px); opacity:1; } }
        @keyframes zdftBolt     { 0%,100%,48%,52% { opacity:0.85; } 50% { opacity:0.1; } }
        @keyframes zdftArc      { to { stroke-dashoffset: -188; } }
        @keyframes zdftBatt     { 0%,100% { transform: scaleX(0.12); } 60% { transform: scaleX(0.92); } }
        @keyframes zdftScan     { 0%,100% { transform: translateY(-20px); opacity: 0.2; } 50% { transform: translateY(20px); opacity: 0.7; } }
        @keyframes zdftPulse    { 0% { transform: scale(1); opacity:0.5; } 100% { transform: scale(1.7); opacity:0; } }
      `}</style>
    </SectionWrapper>
  )
}
