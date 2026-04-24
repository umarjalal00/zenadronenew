'use client'

import { useRef } from 'react'
import Link       from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const STATS = [
  { value: '<3s',  label: 'Response Time' },
  { value: 'VTOL', label: 'Deployment'    },
  { value: 'AI',   label: 'Guided Track'  },
  { value: '<$5K', label: 'Per Unit'      },
]

const ORBS = [
  { x: 12, y: 45, w: 620, h: 620, color: '#ef4444', op: 0.06,  d: 11 },
  { x: 82, y: 60, w: 440, h: 440, color: '#f97316', op: 0.038, d: 14 },
  { x: 48, y: 5,  w: 280, h: 280, color: '#a78bfa', op: 0.025, d: 8  },
]

// ─── Tactical HUD animated SVG ────────────────────────────────────────────────
function TacticalHUD() {
  const CX = 250, CY = 195

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 500 390" fill="none" className="w-full h-full">
        <defs>
          <pattern id="p1TGrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(239,68,68,0.065)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="p1AtmosGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.14"/>
            <stop offset="65%"  stopColor="#ef4444" stopOpacity="0.025"/>
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="p1DroneGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="500" height="390" fill="rgba(7,7,15,0.6)" rx="16"/>
        <rect width="500" height="390" fill="url(#p1TGrid)" rx="16"/>
        <ellipse cx={CX} cy={CY} rx={230} ry={205} fill="url(#p1AtmosGrad)"/>

        {/* Radar rings */}
        {[72, 138, 200].map((r, i) => (
          <circle key={i} cx={CX} cy={CY} r={r}
            stroke="#ef4444" strokeWidth={0.55} fill="none"
            opacity={0.16 - i * 0.03}/>
        ))}

        {/* Crosshair */}
        <line x1={CX} y1={8}   x2={CX} y2={382} stroke="#ef4444" strokeWidth={0.3} opacity={0.07}/>
        <line x1={8}  y1={CY}  x2={492} y2={CY} stroke="#ef4444" strokeWidth={0.3} opacity={0.07}/>

        {/* Range labels */}
        <text x={CX+6} y={CY-130} fill="#ef4444" fontSize="6" fontFamily="monospace" opacity={0.38}>1km</text>
        <text x={CX+6} y={CY-192} fill="#ef4444" fontSize="6" fontFamily="monospace" opacity={0.28}>2km</text>

        {/* Rotating radar sweep */}
        <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: 'p1Sweep 4.5s linear infinite' }}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - 202}
            stroke="#ef4444" strokeWidth={1.2} opacity={0.48} strokeLinecap="round"/>
          <path d={`M ${CX} ${CY - 202} A 202 202 0 0 0 ${CX + 70} ${CY - 190}`}
            stroke="#ef4444" strokeWidth={2} opacity={0.14} fill="none"/>
        </g>

        {/* === P-1 Drone at center === */}
        <g transform={`translate(${CX}, ${CY})`}>
          <circle cx={0} cy={0} r={30} fill="url(#p1DroneGlowGrad)"
            style={{ animation: 'p1DroneGlow 2.2s ease-in-out infinite' }}/>

          {/* Expanding pulse rings */}
          {[0, 1, 2].map(i => (
            <circle key={i} cx={0} cy={0} r={20}
              stroke="#ef4444" strokeWidth={0.8} fill="none"
              style={{ animation: 'p1RingExpand 3s ease-out infinite', animationDelay: `${i}s`, transformOrigin: '0px 0px' }}/>
          ))}

          {/* Drone silhouette — top-down interceptor */}
          <g style={{ animation: 'p1Hover 3.8s ease-in-out infinite' }}>
            <path d="M 0,-15 C 2.5,-11 3,-5 3,3 L 0,10 L -3,3 C -3,-5 -2.5,-11 0,-15 Z"
              fill="#ef4444" opacity={0.92}/>
            <path d="M -2.5,-2 L -20,8 L -2.5,8 Z" fill="#ef4444" opacity={0.82}/>
            <path d="M  2.5,-2 L  20,8 L  2.5,8 Z" fill="#ef4444" opacity={0.82}/>
            <path d="M -2.5,6 L -8,15 L -2.5,11 Z" fill="#ef4444" opacity={0.68}/>
            <path d="M  2.5,6 L  8,15 L  2.5,11 Z" fill="#ef4444" opacity={0.68}/>
            <ellipse cx={0} cy={13} rx={2} ry={4} fill="#f97316" opacity={0.65}
              style={{ animation: 'p1Engine 0.28s ease-in-out infinite alternate' }}/>
          </g>
          <circle cx={0} cy={0} r={2.5} fill="#ef4444" opacity={0.9}/>
          <text x={0} y={30} textAnchor="middle" fill="#ef4444" fontSize="6" fontFamily="monospace" opacity={0.55} letterSpacing="1">P-1</text>
        </g>

        {/* === THREAT ALPHA — LOCKED === */}
        <g transform="translate(358, 88)">
          <g style={{ animation: 'p1AlphaMove 15s ease-in-out infinite' }}>
            <line x1={-108} y1={107} x2={-2} y2={2}
              stroke="#ef4444" strokeWidth={0.8} strokeDasharray="5 4" opacity={0.28}/>
            <polygon points="0,-7 7,0 0,7 -7,0" fill="#ef4444" opacity={0.95}
              style={{ animation: 'p1ThreatBlink 0.9s ease-in-out infinite' }}/>
            <g style={{ animation: 'p1BracketPulse 0.85s ease-in-out infinite' }}>
              <path d="M-21,-21 L-11,-21 M-21,-21 L-21,-11" stroke="#ef4444" strokeWidth={1.3} strokeLinecap="round"/>
              <path d="M 21,-21 L 11,-21 M 21,-21 L 21,-11" stroke="#ef4444" strokeWidth={1.3} strokeLinecap="round"/>
              <path d="M-21, 21 L-11, 21 M-21, 21 L-21, 11" stroke="#ef4444" strokeWidth={1.3} strokeLinecap="round"/>
              <path d="M 21, 21 L 11, 21 M 21, 21 L 21, 11" stroke="#ef4444" strokeWidth={1.3} strokeLinecap="round"/>
            </g>
            <rect x={-23} y={-34} width={46} height={11} rx={2}
              fill="rgba(239,68,68,0.14)" stroke="rgba(239,68,68,0.5)" strokeWidth={0.6}/>
            <text x={0} y={-25.5} textAnchor="middle" fill="#ef4444"
              fontSize="6.5" fontFamily="monospace" fontWeight="bold">LOCKED</text>
          </g>
        </g>

        {/* === THREAT BRAVO — TRACKING === */}
        <g transform="translate(142, 290)">
          <g style={{ animation: 'p1BravoMove 19s ease-in-out infinite', animationDelay: '3s' }}>
            <polygon points="0,-6 6,0 0,6 -6,0" fill="#f97316" opacity={0.75}
              style={{ animation: 'p1ThreatBlink 1.5s ease-in-out infinite', animationDelay: '0.6s' }}/>
            <path d="M-16,-16 L-8,-16 M-16,-16 L-16,-8 M16,-16 L8,-16 M16,-16 L16,-8 M-16,16 L-8,16 M-16,16 L-16,8 M16,16 L8,16 M16,16 L16,8"
              stroke="#f97316" strokeWidth={0.9} opacity={0.48} strokeLinecap="round"/>
            <rect x={-23} y={-30} width={46} height={10} rx={2}
              fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.32)" strokeWidth={0.5}/>
            <text x={0} y={-22} textAnchor="middle" fill="#f97316" fontSize="5.5" fontFamily="monospace">TRACKING</text>
          </g>
        </g>

        {/* === THREAT CHARLIE — DETECTED === */}
        <g transform="translate(390, 292)">
          <g style={{ animation: 'p1CharlieMove 12s ease-in-out infinite', animationDelay: '6s' }}>
            <polygon points="0,-5 5,0 0,5 -5,0" fill="#ef4444" opacity={0.32}/>
            <rect x={-25} y={-26} width={50} height={9} rx={2}
              fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.2)" strokeWidth={0.4}/>
            <text x={0} y={-19} textAnchor="middle" fill="#ef4444" fontSize="5" fontFamily="monospace" opacity={0.55}>DETECTED</text>
          </g>
        </g>

        {/* Corner brackets */}
        <path d="M14,14 L32,14 M14,14 L14,32" stroke="#ef4444" strokeWidth={1.2} opacity={0.55} strokeLinecap="round"/>
        <path d="M486,14 L468,14 M486,14 L486,32" stroke="#ef4444" strokeWidth={1.2} opacity={0.55} strokeLinecap="round"/>
        <path d="M14,376 L32,376 M14,376 L14,358" stroke="#ef4444" strokeWidth={1.2} opacity={0.55} strokeLinecap="round"/>
        <path d="M486,376 L468,376 M486,376 L486,358" stroke="#ef4444" strokeWidth={1.2} opacity={0.55} strokeLinecap="round"/>

        {/* HUD panels */}
        <rect x={18} y={18} width={152} height={42} rx={4}
          fill="rgba(7,7,15,0.8)" stroke="rgba(239,68,68,0.22)" strokeWidth={0.6}/>
        <circle cx={27} cy={27} r={2.5} fill="#ef4444"
          style={{ animation: 'p1ThreatBlink 1.2s ease-in-out infinite' }}/>
        <text x={36} y={30} fill="#ef4444" fontSize="6.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">INTERCEPTOR P-1</text>
        <text x={23} y={43} fill="#ef4444" fontSize="5.5" fontFamily="monospace" opacity={0.6}>INTERCEPT IN PROGRESS</text>
        <text x={23} y={52} fill="#f97316" fontSize="5" fontFamily="monospace" opacity={0.48}>AUTONOMOUS MODE: ON</text>

        <rect x={334} y={18} width={148} height={22} rx={3}
          fill="rgba(7,7,15,0.8)" stroke="rgba(0,212,255,0.22)" strokeWidth={0.5}/>
        <text x={342} y={32} fill="#00d4ff" fontSize="5.5" fontFamily="monospace" letterSpacing="0.3">AI TRACK: 97.4% | ONLINE</text>

        <rect x={18} y={354} width={194} height={22} rx={3}
          fill="rgba(7,7,15,0.8)" stroke="rgba(239,68,68,0.18)" strokeWidth={0.5}/>
        <text x={26} y={368} fill="#ef4444" fontSize="5.5" fontFamily="monospace" opacity={0.72}>
          THREATS: 3  |  LOCKED: 1  |  ETA: &lt;3s
        </text>

        <rect x={334} y={354} width={148} height={22} rx={3}
          fill="rgba(7,7,15,0.8)" stroke="rgba(249,115,22,0.18)" strokeWidth={0.5}/>
        <text x={342} y={368} fill="#f97316" fontSize="5.5" fontFamily="monospace" opacity={0.72}>
          RESPONSE: &lt;3s  |  VTOL READY
        </text>
      </svg>

      <style>{`
        @keyframes p1Sweep       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes p1ThreatBlink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes p1BracketPulse{ 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.2);opacity:0.38} }
        @keyframes p1AlphaMove   { 0%,100%{transform:translate(0,0)} 25%{transform:translate(11px,-7px)} 50%{transform:translate(20px,5px)} 75%{transform:translate(6px,14px)} }
        @keyframes p1BravoMove   { 0%,100%{transform:translate(0,0)} 38%{transform:translate(-10px,7px)} 72%{transform:translate(7px,-9px)} }
        @keyframes p1CharlieMove { 0%,100%{transform:translate(0,0)} 40%{transform:translate(8px,8px)} 70%{transform:translate(-9px,5px)} }
        @keyframes p1DroneGlow   { 0%,100%{opacity:0.9} 50%{opacity:0.3} }
        @keyframes p1RingExpand  { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(5.5);opacity:0} }
        @keyframes p1Hover       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2.5px)} }
        @keyframes p1Engine      { from{opacity:0.25} to{opacity:0.78} }
      `}</style>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function P1Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)
  const scanRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } })
    tl.from('.p1-word', { y: '120%', opacity: 0, stagger: 0.08 }, 0.3)
      .from('.p1-sub',  { y: 24, opacity: 0 }, '-=0.6')
      .from('.p1-stat', { y: 16, opacity: 0, stagger: 0.07 }, '-=0.5')
      .from('.p1-cta',  { y: 12, opacity: 0, stagger: 0.1  }, '-=0.4')
    if (displayRef.current) {
      tl.from(displayRef.current, { opacity: 0, scale: 0.95, duration: 1.1 }, 0.15)
    }
    tl.from('.p1-hud', { x: 24, opacity: 0, stagger: 0.1 }, '-=0.85')

    if (scanRef.current) {
      gsap.fromTo(scanRef.current,
        { top: '0%' },
        { top: '100%', duration: 2.8, ease: 'none', repeat: -1,
          onRepeat: () => { if (scanRef.current) gsap.set(scanRef.current, { top: '0%' }) } }
      )
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="p1-hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background pt-[68px]">

      {/* Orbs */}
      {ORBS.map((o, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${o.x}%`, top: `${o.y}%`, width: o.w, height: o.h,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse at center, ${o.color} 0%, transparent 70%)`,
          opacity: o.op, filter: 'blur(70px)',
          animation: `p1OrbFloat ${o.d}s ease-in-out infinite`,
          animationDelay: `${i * 3.5}s`,
        }}/>
      ))}

      {/* Tactical grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(239,68,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.03) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }}/>

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-[68px] h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.35) 30%, rgba(239,68,68,0.45) 50%, rgba(239,68,68,0.35) 70%, transparent)',
        boxShadow: '0 0 12px rgba(239,68,68,0.15)',
      }}/>

      {/* Scan line */}
      <div ref={scanRef} className="absolute inset-x-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.5) 40%, rgba(239,68,68,0.7) 50%, rgba(239,68,68,0.5) 60%, transparent)',
        boxShadow: '0 0 8px rgba(239,68,68,0.3)',
      }}/>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center py-16 md:py-20">

          {/* ── Text column ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 self-start" style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
            }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444', animation: 'p1HudBlink 1.4s ease-in-out infinite' }}/>
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>ZenaDrone Interceptor P-1</span>
            </div>

            {/* Title */}
            {['Track.', 'Intercept.'].map((word) => (
              <div key={word} className="overflow-hidden">
                <h1 className="font-display font-bold text-white" style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>
                  <span className="p1-word inline-block">{word}</span>
                </h1>
              </div>
            ))}
            <div className="overflow-hidden mb-7">
              <h1 className="font-display font-bold" style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 1.0 }}>
                <span className="p1-word inline-block" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Neutralize.
                </span>
              </h1>
            </div>

            <p className="p1-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem', maxWidth: 480 }}>
              A fast-response disposable AI-guided drone built for autonomous aerial threat intercept through direct physical contact — making expensive missile interceptors unnecessary.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2.5 mb-10">
              {STATS.map((s) => (
                <div key={s.label} className="p1-stat flex flex-col gap-1 p-3 rounded-xl text-center" style={{
                  background: 'var(--surface-card-el)', border: '1px solid rgba(239,68,68,0.14)',
                }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: '#ef4444', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</span>
                  <span className="font-mono text-text-muted uppercase tracking-[0.15em]" style={{ fontSize: '0.48rem' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <motion.div className="p1-cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="#p1-capabilities" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300" style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#fff', fontSize: '0.9rem',
                  boxShadow: '0 0 28px rgba(239,68,68,0.35)',
                }}>
                  View Capabilities
                  <svg viewBox="0 0 16 16" fill="none" width={13} height={13}>
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div className="p1-cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="#p1-contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-medium transition-all duration-300" style={{
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.28)',
                  color: '#ef4444', fontSize: '0.9rem',
                }}>
                  Contact Defense Team
                </Link>
              </motion.div>
            </div>
          </div>

          {/* ── Visual column ── */}
          <div ref={displayRef} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '5/4' }}>
            <TacticalHUD />
          </div>
        </div>

        {/* HUD badges */}
        <div className="flex flex-wrap gap-3 pb-10 -mt-4">
          {/* Badge 1 */}
          <div className="p1-hud flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{
            background: 'var(--surface-card-el)', border: '1px solid rgba(239,68,68,0.22)',
            backdropFilter: 'blur(16px)',
          }}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444', animation: 'p1HudBlink 1.1s ease-in-out infinite' }}/>
              <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.42rem', color: '#ef4444', writingMode: 'vertical-rl' }}>THREAT</span>
            </div>
            <div>
              <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.48rem', color: 'rgba(239,68,68,0.65)' }}>Intercept Mode</p>
              <p className="font-display font-bold text-white" style={{ fontSize: '0.96rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Targets: 3</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="p1-hud flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{
            background: 'var(--surface-card-el)', border: '1px solid rgba(249,115,22,0.22)',
            backdropFilter: 'blur(16px)',
          }}>
            <div>
              <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.48rem', color: 'rgba(249,115,22,0.7)' }}>Deployment</p>
              <div className="flex items-center gap-2 mt-0.5">
                {['VTOL', 'AI-GUIDED', 'RAPID'].map(t => (
                  <span key={t} className="font-mono font-bold" style={{ fontSize: '0.8125rem', color: '#f97316' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="p1-hud flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{
            background: 'var(--surface-card-el)', border: '1px solid rgba(0,212,255,0.18)',
            backdropFilter: 'blur(16px)',
          }}>
            <div>
              <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.48rem', color: 'rgba(0,212,255,0.65)' }}>AI Status</p>
              <p className="font-display font-bold" style={{ fontSize: '0.9rem', color: '#00d4ff', letterSpacing: '-0.02em' }}>Track: Active</p>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes p1OrbFloat { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes p1HudBlink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
      `}</style>
    </section>
  )
}
