'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── Data flow animation paths ────────────────────────────────────────────────
function DataFlowSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 80" fill="none" className="w-full" style={{ maxWidth: 300 }}>
      {/* Flow line */}
      <path d="M20 40 C70 40 90 40 150 40 C210 40 230 40 300 40"
        stroke={color} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.35} />
      {/* Animated dot */}
      <circle cx={0} cy={40} r={5} fill={color} opacity={0.9} className="iqn-flow-dot" />
      {/* Left node */}
      <circle cx={20} cy={40} r={8} stroke={color} strokeWidth={1.2} fill={`${color}12`} />
      <circle cx={20} cy={40} r={3} fill={color} opacity={0.8} />
      {/* Right node */}
      <circle cx={300} cy={40} r={8} stroke={color} strokeWidth={1.2} fill={`${color}12`} />
      <circle cx={300} cy={40} r={3} fill={color} opacity={0.8} />
      {/* Packets */}
      {[80, 140, 200].map((x, i) => (
        <rect key={i} x={x - 8} y={32} width={16} height={16} rx={2}
          fill={color} opacity={0.08 + i * 0.03} stroke={color} strokeWidth={0.7} />
      ))}
    </svg>
  )
}

// ─── Docking station visual ───────────────────────────────────────────────────
function DockingVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 280 }}>
      {/* Platform base */}
      <svg viewBox="0 0 320 200" fill="none" className="absolute inset-0 w-full h-full">
        {/* Docking pad */}
        <ellipse cx={160} cy={165} rx={90} ry={18} fill="rgba(52,211,153,0.05)" stroke="rgba(52,211,153,0.15)" strokeWidth={1} />
        <ellipse cx={160} cy={165} rx={60} ry={11} fill="rgba(52,211,153,0.08)" stroke="rgba(52,211,153,0.2)" strokeWidth={0.8} />
        <ellipse cx={160} cy={165} rx={30} ry={5} fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.3)" strokeWidth={0.7} />
        {/* H marker */}
        <text x={148} y={170} fontSize={18} fontFamily="monospace" fill="rgba(52,211,153,0.35)" fontWeight="bold">H</text>
        {/* Legs */}
        <line x1={120} y1={145} x2={105} y2={165} stroke="rgba(52,211,153,0.25)" strokeWidth={2} strokeLinecap="round" />
        <line x1={200} y1={145} x2={215} y2={165} stroke="rgba(52,211,153,0.25)" strokeWidth={2} strokeLinecap="round" />
        <line x1={145} y1={150} x2={138} y2={165} stroke="rgba(52,211,153,0.2)" strokeWidth={1.5} strokeLinecap="round" />
        <line x1={175} y1={150} x2={182} y2={165} stroke="rgba(52,211,153,0.2)" strokeWidth={1.5} strokeLinecap="round" />
        {/* Charge indicator ring */}
        <circle cx={160} cy={165} r={78} stroke="rgba(52,211,153,0.07)" strokeWidth={1} strokeDasharray="4 8" />
        {/* Pulse rings */}
        <circle cx={160} cy={165} r={50} stroke="rgba(52,211,153,0.12)" strokeWidth={0.8} className="iqn-dock-pulse1" />
        <circle cx={160} cy={165} r={70} stroke="rgba(52,211,153,0.07)" strokeWidth={0.6} className="iqn-dock-pulse2" />
        {/* Power bolts */}
        <path d="M148 130 L144 145 L152 145 L148 160" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} />
        <path d="M172 128 L168 143 L176 143 L172 158" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />
        {/* Data stream lines */}
        <line x1={60} y1={165} x2={95} y2={165} stroke="rgba(0,212,255,0.2)" strokeWidth={1} strokeDasharray="3 5" />
        <line x1={225} y1={165} x2={260} y2={165} stroke="rgba(0,212,255,0.2)" strokeWidth={1} strokeDasharray="3 5" />
        {/* Cloud arrows */}
        <path d="M50 155 Q50 140 60 135 Q55 125 65 120 Q60 108 72 108 Q74 100 83 100 Q92 100 93 108 Q104 106 106 115 Q115 115 115 124 Q115 135 104 135 L55 135 Q48 135 48 145 Z"
          fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.8} />
        <path d="M76 115 L76 108" stroke="rgba(0,212,255,0.5)" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M72 112 L76 108 L80 112" stroke="rgba(0,212,255,0.5)" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQNanoDataStation() {
  const dataRef  = useRef<HTMLDivElement>(null)
  const dockRef  = useRef<HTMLDivElement>(null)
  const dataView = useInView(dataRef, { once: true, amount: 0.12 })
  const dockView = useInView(dockRef, { once: true, amount: 0.12 })

  return (
    <SectionWrapper id="iq-nano-data" className="bg-background">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.28) 50%, rgba(0,212,255,0.2) 70%, transparent)',
        boxShadow: '0 0 10px rgba(0,212,255,0.1)',
      }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-18">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            Data & Infrastructure
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Seamless Integration &<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Autonomous Docking
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }} />
        </FadeIn>

        {/* ── Data Transmission ─────────────────────────────────────────────── */}
        <div ref={dataRef} className="mb-20">
          <FadeIn className="text-center mb-10">
            <p className="font-mono font-bold uppercase tracking-[0.22em] mb-2" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>Data Transmission</p>
            <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)', letterSpacing: '-0.022em' }}>
              Connected to Your Systems
            </h3>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">

            {/* AWS S3 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={dataView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 rounded-2xl"
              style={{ background: 'rgba(255,153,0,0.05)', border: '1px solid rgba(255,153,0,0.15)' }}
            >
              {/* AWS orange glow */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at top right, rgba(255,153,0,0.1) 0%, transparent 70%)',
              }} />

              {/* AWS logo shape */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl" style={{
                  background: 'rgba(255,153,0,0.1)', border: '1px solid rgba(255,153,0,0.25)',
                }}>
                  <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
                    <path d="M6 20 Q6 10 14 8 Q12 2 18 2 Q24 2 24 8 Q30 8 32 14 Q36 14 36 20 Q36 28 28 28 L8 28 Q4 28 4 22 Z"
                      fill="rgba(255,153,0,0.12)" stroke="rgba(255,153,0,0.5)" strokeWidth={1.2} />
                    <path d="M13 21 L13 15" stroke="rgba(255,153,0,0.7)" strokeWidth={1.3} strokeLinecap="round" />
                    <path d="M10 18 L13 15 L16 18" stroke="rgba(255,153,0,0.7)" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 15 L20 21" stroke="rgba(255,153,0,0.7)" strokeWidth={1.3} strokeLinecap="round" />
                    <path d="M17 18 L20 21 L23 18" stroke="rgba(255,153,0,0.7)" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: '#ff9900' }}>Cloud Storage</p>
                  <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>Amazon S3 — Scalable & Secure</p>
                </div>
              </div>

              <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '0.86rem' }}>
                All scanned images are securely uploaded to Amazon&apos;s simple storage service (AWS S3), which provides reliable and scalable storage solutions for all drone-captured data.
              </p>

              <DataFlowSVG color="#ff9900" />

              <div className="flex flex-wrap gap-2 mt-4">
                {['Secure Upload', 'Scalable Storage', 'Auto-Backup', 'Global CDN'].map(b => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{
                    background: 'rgba(255,153,0,0.08)', border: '1px solid rgba(255,153,0,0.2)',
                    fontSize: '0.8125rem', color: '#ff9900', fontFamily: 'monospace',
                  }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: '#ff9900', opacity: 0.85 }} />
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* SAP Integration Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={dataView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 rounded-2xl"
              style={{ background: 'rgba(0,170,85,0.05)', border: '1px solid rgba(0,170,85,0.15)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at top right, rgba(0,170,85,0.1) 0%, transparent 70%)',
              }} />

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl" style={{
                  background: 'rgba(0,170,85,0.1)', border: '1px solid rgba(0,170,85,0.25)',
                }}>
                  <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
                    <rect x={4} y={4} width={28} height={28} rx={4} stroke="rgba(0,170,85,0.7)" strokeWidth={1.4} fill="rgba(0,170,85,0.08)" />
                    <line x1={4} y1={13} x2={32} y2={13} stroke="rgba(0,170,85,0.35)" strokeWidth={0.8} />
                    <line x1={4} y1={23} x2={32} y2={23} stroke="rgba(0,170,85,0.35)" strokeWidth={0.8} />
                    <line x1={13} y1={4} x2={13} y2={32} stroke="rgba(0,170,85,0.35)" strokeWidth={0.8} />
                    <circle cx={18} cy={18} r={4} fill="rgba(0,170,85,0.6)" />
                    <path d="M16 18 L18 20 L21 15" stroke="white" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
                  </svg>
                </div>
                <div>
                  <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: '#00aa55' }}>SAP Integration</p>
                  <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>API-Powered · Real-Time Sync</p>
                </div>
              </div>

              <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '0.86rem' }}>
                Scanned data is seamlessly transmitted to SAP programs via an application programming interface (API), ensuring smooth integration into existing inventory management processes or systems.
              </p>

              <DataFlowSVG color="#00aa55" />

              <div className="flex flex-wrap gap-2 mt-4">
                {['API Integration', 'Real-Time Sync', 'ERP Compatible', 'Seamless Transfer'].map(b => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{
                    background: 'rgba(0,170,85,0.08)', border: '1px solid rgba(0,170,85,0.2)',
                    fontSize: '0.8125rem', color: '#00aa55', fontFamily: 'monospace',
                  }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: '#00aa55', opacity: 0.85 }} />
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Automated Docking Station ──────────────────────────────────────── */}
        <div ref={dockRef} className="relative">
          {/* Section separator */}
          <div className="absolute inset-x-0 -top-10 h-px" style={{
            background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.15) 30%, rgba(52,211,153,0.2) 50%, rgba(52,211,153,0.15) 70%, transparent)',
          }} />

          <FadeIn className="text-center mb-10">
            <p className="font-mono font-bold uppercase tracking-[0.22em] mb-2" style={{ fontSize: '0.8125rem', color: '#34d399' }}>Autonomous System</p>
            <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)', letterSpacing: '-0.022em' }}>
              Automated Docking Station
            </h3>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={dockView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden p-8"
              style={{ background: 'var(--surface-card-el)', border: '1px solid rgba(52,211,153,0.15)', minHeight: 320 }}
            >
              {/* Background dots */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(52,211,153,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />
              <DockingVisual />

              {/* Status badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="px-2.5 py-1.5 rounded-lg" style={{
                  background: 'rgba(7,7,15,0.8)', border: '1px solid rgba(52,211,153,0.25)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399', animation: 'iqnDockBlink 1.5s ease-in-out infinite' }} />
                    <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: '#34d399' }}>Auto-Charge</span>
                  </div>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg" style={{
                  background: 'rgba(7,7,15,0.8)', border: '1px solid rgba(251,191,36,0.25)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>Legs: LOCKED</span>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={dockView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start" style={{
                background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.28)',
              }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399', animation: 'iqnDockBlink 2s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#34d399' }}>IQ Nano</span>
              </div>

              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
                The drone comes with a docking station that facilitates automatic charging. Its legs enable secure docking, allowing it to recharge without human intervention, ensuring it&apos;s always ready for the next operation.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Automatic Recharging',    desc: 'Docks and charges without any human intervention', color: '#34d399' },
                  { label: 'Secure Leg Docking',      desc: 'Precision landing legs lock the drone in place',   color: '#00d4ff' },
                  { label: 'Always Mission-Ready',     desc: 'Charged and prepared before the next operation',   color: '#fbbf24' },
                  { label: 'Wireless Integration',     desc: 'Eliminates cables and manual battery swaps',       color: '#a78bfa' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 p-3.5 rounded-xl" style={{
                    background: `${item.color}07`, border: `1px solid ${item.color}18`,
                  }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color, opacity: 0.85 }} />
                    <div>
                      <p className="font-sans font-semibold text-white" style={{ fontSize: '0.82rem', marginBottom: 2 }}>{item.label}</p>
                      <p className="font-mono text-text-muted" style={{ fontSize: '1.125rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <style>{`
        .iqn-flow-dot { animation: iqnFlowMove 2.4s linear infinite; }
        @keyframes iqnFlowMove { from { transform: translateX(0); } to { transform: translateX(280px); } }

        .iqn-dock-pulse1 { animation: iqnDockPulse 2.5s ease-out infinite; }
        .iqn-dock-pulse2 { animation: iqnDockPulse 2.5s ease-out infinite 0.8s; }
        @keyframes iqnDockPulse { 0% { opacity: 0.5; transform: scale(0.85); } 100% { opacity: 0; transform: scale(1.15); } }
        @keyframes iqnDockBlink { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </SectionWrapper>
  )
}
