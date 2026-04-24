'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'

const FEATURES = [
  {
    color: '#a78bfa',
    title: 'Automated Platform',
    body: 'Fully autonomous takeoff, mission execution, and recovery. Operators set mission parameters; the IQ Glider handles the rest — from waypoint navigation to safe return.',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx={14} cy={14} r={9} stroke={c} strokeWidth={1.3} />
        <circle cx={14} cy={14} r={4} stroke={c} strokeWidth={1} strokeDasharray="2 2" opacity={0.5} />
        <circle cx={14} cy={14} r={1.8} fill={c} />
        <line x1={14} y1={5}  x2={14} y2={9}  stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={14} y1={19} x2={14} y2={23} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={5}  y1={14} x2={9}  y2={14} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={19} y1={14} x2={23} y2={14} stroke={c} strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: '#0ea5e9',
    title: 'Persistent System',
    body: 'Designed for continuous, round-the-clock operations. The IQ Glider maintains persistent area coverage without fatigue, providing uninterrupted situational awareness over wide maritime zones.',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx={14} cy={14} r={9} stroke={c} strokeWidth={1.3} />
        <path d="M14 9 L14 14 L18 17" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={14} cy={14} r={1.2} fill={c} />
      </svg>
    ),
  },
  {
    color: '#34d399',
    title: 'Scalable',
    body: 'Deploy a single IQ Glider for targeted operations or a coordinated swarm for wide-area coverage. The system scales linearly with mission requirements — no infrastructure changes needed.',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x={4}  y={4}  width={7} height={7} rx={1.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={17} y={4}  width={7} height={7} rx={1.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={4}  y={17} width={7} height={7} rx={1.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <rect x={17} y={17} width={7} height={7} rx={1.5} stroke={c} strokeWidth={1.3} fill={`${c}10`} />
        <line x1={11} y1={7.5} x2={17} y2={7.5}   stroke={c} strokeWidth={0.9} opacity={0.5} />
        <line x1={7.5} y1={11} x2={7.5} y2={17}   stroke={c} strokeWidth={0.9} opacity={0.5} />
        <line x1={20.5} y1={11} x2={20.5} y2={17} stroke={c} strokeWidth={0.9} opacity={0.5} />
        <line x1={11} y1={20.5} x2={17} y2={20.5} stroke={c} strokeWidth={0.9} opacity={0.5} />
      </svg>
    ),
  },
  {
    color: '#fbbf24',
    title: 'Cost-Effective',
    body: 'The IQ Glider delivers ISR and comms-relay capability at a fraction of the cost of manned alternatives. Low acquisition cost, low maintenance overhead, and rapid manufacturing make it financially viable at scale.',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <path d="M6 22 L10 12 L14 16 L18 8 L22 14" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={10} cy={12} r={1.8} fill={c} opacity={0.8} />
        <circle cx={18} cy={8}  r={1.8} fill={c} opacity={0.8} />
        <line x1={4} y1={24} x2={24} y2={24} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    color: '#f97316',
    title: 'Communications Relay',
    body: 'Beyond ISR, the IQ Glider serves as an airborne communications relay node — extending the operational range of ground and naval communication networks far beyond line-of-sight limitations.',
    icon: (c: string) => (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx={14} cy={14} r={3} stroke={c} strokeWidth={1.3} />
        <path d="M8 8 Q6 11 6 14 Q6 17 8 20" stroke={c} strokeWidth={1.3} strokeLinecap="round" fill="none" />
        <path d="M20 8 Q22 11 22 14 Q22 17 20 20" stroke={c} strokeWidth={1.3} strokeLinecap="round" fill="none" />
        <path d="M5 5 Q2 9 2 14 Q2 19 5 23" stroke={c} strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.45} />
        <path d="M23 5 Q26 9 26 14 Q26 19 23 23" stroke={c} strokeWidth={1} strokeLinecap="round" fill="none" opacity={0.45} />
      </svg>
    ),
  },
]

function FeatureItem({ feat, index }: { feat: typeof FEATURES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5" style={{
        background: `${feat.color}10`, border: `1px solid ${feat.color}22`,
      }}>
        {feat.icon(feat.color)}
      </div>
      <div>
        <h4 className="font-display font-semibold text-white mb-1" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>{feat.title}</h4>
        <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.83rem' }}>{feat.body}</p>
      </div>
    </motion.div>
  )
}

function GliderVisual() {
  return (
    <svg viewBox="0 0 400 260" fill="none" className="w-full h-full" style={{ maxHeight: 260 }}>
      {/* Background atmosphere */}
      <defs>
        <radialGradient id="gliderAtmos" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gliderBlip" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="url(#gliderAtmos)" rx="16" />

      {/* Orbit rings */}
      {[120, 80, 46].map((r, i) => (
        <ellipse key={i} cx={200} cy={130} rx={r * 1.8} ry={r * 0.7}
          stroke="#a78bfa" strokeWidth={0.7} strokeDasharray={i === 0 ? '4 6' : '3 4'}
          opacity={0.18 - i * 0.04} fill="none" />
      ))}

      {/* Center hub */}
      <circle cx={200} cy={130} r={22} stroke="#a78bfa" strokeWidth={1.2} fill="rgba(167,139,250,0.06)" />
      <circle cx={200} cy={130} r={8}  fill="rgba(167,139,250,0.18)" stroke="#a78bfa" strokeWidth={1} />
      <circle cx={200} cy={130} r={3}  fill="#a78bfa" opacity={0.9} />

      {/* Glider units orbiting */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const ex = 200 + Math.cos(rad) * 110
        const ey = 130 + Math.sin(rad) * 43
        return (
          <g key={i} style={{ animation: `zd2kGliderPulse ${2.4 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
            <circle cx={ex} cy={ey} r={7} stroke="#a78bfa" strokeWidth={1} fill="rgba(167,139,250,0.1)" />
            <circle cx={ex} cy={ey} r={3} fill="#a78bfa" opacity={0.85} />
            <line x1={200} y1={130} x2={ex} y2={ey} stroke="#a78bfa" strokeWidth={0.5} opacity={0.2} />
          </g>
        )
      })}

      {/* Comms waves from one unit */}
      {[14, 22, 30].map((r, i) => (
        <circle key={i} cx={310} cy={87} r={r}
          stroke="#f97316" strokeWidth={0.6} fill="none"
          opacity={0.3 - i * 0.08}
          style={{ animation: `zd2kWave 2s ease-out infinite`, animationDelay: `${i * 0.5}s` }}
        />
      ))}

      {/* Labels */}
      <text x={200} y={162} textAnchor="middle" fill="#a78bfa" fontSize="6" fontFamily="monospace" opacity={0.6} letterSpacing="2">IQ GLIDER SWARM</text>
      <text x={308} y={112} textAnchor="middle" fill="#f97316" fontSize="5" fontFamily="monospace" opacity={0.6} letterSpacing="1">COMMS RELAY</text>
    </svg>
  )
}

export function ZD2000Glider() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <SectionWrapper id="zd2000-iq-glider" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.18) 30%, rgba(167,139,250,0.18) 70%, transparent)',
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>
        <div ref={ref} className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{
              background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>IQ Glider System</span>
            </div>

            <h2 className="font-display font-bold text-white mb-5" style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.45rem)',
              letterSpacing: '-0.03em', lineHeight: 1.08,
            }}>
              Persistent Aerial<br />
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Intelligence Asset
              </span>
            </h2>

            <p className="font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem' }}>
              The IQ Glider is a purpose-designed unmanned aerial vehicle deployed from the ZenaDrone 2000 platform. Operating as a persistent ISR asset and communications relay node, it extends the operational reach and awareness of the entire system far beyond line-of-sight boundaries.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-5">
              {FEATURES.map((feat, i) => (
                <FeatureItem key={feat.title} feat={feat} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Image / visual column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Glider SVG diagram */}
            <div className="rounded-3xl overflow-hidden p-6" style={{
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(167,139,250,0.18)',
              boxShadow: '0 0 60px rgba(167,139,250,0.06)',
            }}>
              <GliderVisual />
            </div>

            {/* IQ Glider side-view animated illustration */}
            <div className="relative rounded-3xl overflow-hidden" style={{
              aspectRatio: '16/7',
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(167,139,250,0.18)',
            }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 210" fill="none" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="gliderBgGlow" cx="45%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="gliderTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Background */}
                <rect width="480" height="210" fill="rgba(7,7,15,0.5)" />
                <rect width="480" height="210" fill="url(#gliderBgGlow)" />

                {/* Altitude grid */}
                {[40,70,100,130,160].map(y => (
                  <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#a78bfa" strokeWidth="0.3" opacity="0.07" />
                ))}
                {[0,60,120,180,240,300,360,420,480].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="210" stroke="#a78bfa" strokeWidth="0.3" opacity="0.07" />
                ))}

                {/* Flight path trail */}
                <path d="M60 108 Q120 90 200 105" stroke="url(#gliderTrail)" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" fill="none" />
                <path d="M30 120 Q90 100 200 105" stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" fill="none" />

                {/* IQ Glider body — side view */}
                <g className="zd2k-glider-body" style={{ animation: 'zd2kGliderFloat 5s ease-in-out infinite' }}>
                  {/* Fuselage */}
                  <path d="M160 102 C175 96 210 98 240 100 C260 101 270 104 275 108 C270 112 260 115 240 116 C210 118 175 120 160 114 Z"
                    fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth="1" opacity="0.9" />
                  {/* Nose cone */}
                  <path d="M160 102 L145 108 L160 114 Z" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="0.8" opacity="0.9" />
                  {/* Sensor pod under nose */}
                  <ellipse cx="153" cy="112" rx="5" ry="3" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" strokeWidth="0.7" opacity="0.8" />
                  <circle cx="153" cy="112" r="1.8" fill="#a78bfa" opacity="0.7" className="zd2k-glider-sensor" />

                  {/* Main wing — long swept */}
                  <path d="M195 100 L185 66 L175 67 L192 100 Z" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="0.8" opacity="0.85" />
                  <path d="M195 116 L185 150 L175 149 L192 116 Z" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="0.8" opacity="0.85" />
                  {/* Wing detail line */}
                  <line x1="191" y1="100" x2="182" y2="72" stroke="#a78bfa" strokeWidth="0.4" opacity="0.3" strokeDasharray="3 4" />
                  <line x1="191" y1="116" x2="182" y2="144" stroke="#a78bfa" strokeWidth="0.4" opacity="0.3" strokeDasharray="3 4" />

                  {/* Tail — V-tail */}
                  <path d="M264 104 L285 82 L288 85 L268 107 Z" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="0.7" opacity="0.8" />
                  <path d="M264 112 L285 134 L288 131 L268 109 Z" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="0.7" opacity="0.8" />

                  {/* Propeller at tail */}
                  <circle cx="276" cy="108" r="3" fill="#a78bfa" opacity="0.8" />
                  <ellipse cx="276" cy="108" rx="2" ry="9" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="0.5" opacity="0.55" className="zd2k-prop-spin" />

                  {/* Cockpit/sensor window */}
                  <rect x="170" y="103" width="20" height="10" rx="3" fill="rgba(167,139,250,0.18)" stroke="#a78bfa" strokeWidth="0.5" opacity="0.7" />
                </g>

                {/* Comms relay waves */}
                {[14, 24, 36].map((r, i) => (
                  <circle key={i} cx="155" cy="108" r={r}
                    stroke="#f97316" strokeWidth="0.6" fill="none"
                    opacity={0.35 - i * 0.09}
                    style={{ animation: `zd2kWave 2.2s ease-out infinite`, animationDelay: `${i * 0.55}s` }} />
                ))}

                {/* ISR camera beam */}
                <path d="M153 115 L130 160 L178 160 Z" fill="rgba(167,139,250,0.04)" stroke="#a78bfa" strokeWidth="0.4" strokeDasharray="3 4" opacity="0.4" />

                {/* Ground horizon */}
                <line x1="0" y1="170" x2="480" y2="170" stroke="#a78bfa" strokeWidth="0.5" opacity="0.15" />

                {/* Altitude indicator */}
                <text x="380" y="75" fill="#a78bfa" fontSize="7" fontFamily="monospace" opacity="0.45">ALT: 1,200ft</text>
                <text x="380" y="87" fill="#f97316" fontSize="7" fontFamily="monospace" opacity="0.4">COMMS: RELAY ON</text>
                <text x="380" y="99" fill="#34d399" fontSize="7" fontFamily="monospace" opacity="0.4">ISR: ACTIVE</text>

                {/* Corner brackets */}
                <path d="M14 14 L14 24 M14 14 L24 14" stroke="#a78bfa" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                <path d="M466 14 L466 24 M466 14 L456 14" stroke="#a78bfa" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                <path d="M14 196 L14 186 M14 196 L24 196" stroke="#a78bfa" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                <path d="M466 196 L466 186 M466 196 L456 196" stroke="#a78bfa" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
              </svg>

              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, transparent 60%)' }} />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg" style={{
                background: 'rgba(7,7,15,0.8)', border: '1px solid rgba(167,139,250,0.25)',
                backdropFilter: 'blur(10px)',
              }}>
                <p className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>IQ Glider — ISR / Comms Mode</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <style>{`
        @keyframes zd2kGliderPulse  { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
        @keyframes zd2kWave          { 0% { opacity:0.4; transform:scale(0.6); } 100% { opacity:0; transform:scale(1.5); } }
        @keyframes zd2kGliderFloat   { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-6px); } }
        .zd2k-glider-sensor          { animation: zd2kGliderPulse 1.8s ease-in-out infinite; }
        .zd2k-prop-spin              { animation: zd2kPropSpin 0.4s linear infinite; transform-origin: 276px 108px; }
        @keyframes zd2kPropSpin      { to { transform: rotate(180deg); } }
      `}</style>
    </SectionWrapper>
  )
}
