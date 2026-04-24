'use client'

import { useRef }  from 'react'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Deterministic particles ──────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 44 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 53.7) % 100).toFixed(2)),
  y:  parseFloat(((i * 71.3) % 100).toFixed(2)),
  s:  0.8 + (i % 3) * 0.5,
  d:  3.5 + (i % 5),
  dl: parseFloat(((i * 0.19) % 4).toFixed(2)),
  op: parseFloat((0.08 + (i % 4) * 0.06).toFixed(2)),
}))

const STATS = [
  { value: '4h',    unit: 'ENDURANCE',     color: '#0ea5e9' },
  { value: 'GAS',   unit: 'POWERED',       color: '#38bdf8' },
  { value: 'AI',    unit: 'INTERCEPT',     color: '#ef4444' },
  { value: 'SWARM', unit: 'READY',         color: '#a78bfa' },
]

// ─── Maritime radar SVG ───────────────────────────────────────────────────────
function MaritimeRadar() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Ocean wave lines */}
      {[380, 400, 420, 440].map((y, i) => (
        <path key={y}
          d={`M0 ${y} Q125 ${y - 12} 250 ${y} Q375 ${y + 12} 500 ${y}`}
          stroke="#0ea5e9" strokeWidth={0.5} opacity={0.05 + i * 0.01}
        />
      ))}
      {/* Radar rings */}
      {[180, 145, 105, 65].map((r, i) => (
        <circle key={r} cx={250} cy={240} r={r}
          stroke="#0ea5e9" strokeWidth={0.5}
          strokeDasharray={i % 2 === 0 ? '6 8' : '2 10'}
          opacity={0.08 + i * 0.015}
        />
      ))}
      {/* Sweep arm */}
      <line x1={250} y1={240} x2={250} y2={62} stroke="#0ea5e9" strokeWidth={0.8} opacity={0.25} className="zd2k-sweep" style={{ transformOrigin: '250px 240px' }} />
      {/* Threat blips */}
      <circle cx={320} cy={170} r={4} fill="#ef4444" opacity={0.6} className="zd2k-blip1" />
      <circle cx={320} cy={170} r={9} stroke="#ef4444" strokeWidth={0.7} opacity={0.3} className="zd2k-blip1" />
      <circle cx={175} cy={195} r={3} fill="#ef4444" opacity={0.45} className="zd2k-blip2" />
      <circle cx={175} cy={195} r={7} stroke="#ef4444" strokeWidth={0.6} opacity={0.22} className="zd2k-blip2" />
      <circle cx={295} cy={130} r={2.5} fill="#ef4444" opacity={0.4} className="zd2k-blip3" />
      {/* Crosshairs */}
      <line x1={50}  y1={240} x2={450} y2={240} stroke="#0ea5e9" strokeWidth={0.35} opacity={0.08} />
      <line x1={250} y1={50}  x2={250} y2={430} stroke="#0ea5e9" strokeWidth={0.35} opacity={0.08} />
      {/* Corner HUD brackets */}
      <path d="M85 85 L85 105 M85 85 L105 85"   stroke="#0ea5e9" strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />
      <path d="M415 85 L415 105 M415 85 L395 85" stroke="#0ea5e9" strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />
      <path d="M85 415 L85 395 M85 415 L105 415" stroke="#0ea5e9" strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />
      <path d="M415 415 L415 395 M415 415 L395 415" stroke="#0ea5e9" strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />
      {/* Range rings labels */}
      <text x="258" y="80"  fill="#0ea5e9" fontSize="8" fontFamily="monospace" opacity={0.3}>5km</text>
      <text x="258" y="116" fill="#0ea5e9" fontSize="8" fontFamily="monospace" opacity={0.25}>3km</text>
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ZD2000Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo('.zd2k-word',
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }
    )
    tl.fromTo('.zd2k-sub',
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo('.zd2k-stat',
      { y: 18, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 },
      '-=0.4'
    )
    tl.fromTo('.zd2k-cta',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
    tl.fromTo(droneRef.current,
      { x: 90, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' },
      '-=1.2'
    )
    tl.fromTo('.zd2k-hud',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.12 },
      '-=0.3'
    )

    // Radar sweep
    gsap.to('.zd2k-sweep', { rotation: 360, duration: 5, ease: 'none', repeat: -1, transformOrigin: '250px 240px' })
    // Threat blips
    gsap.to('.zd2k-blip1', { opacity: 0, scale: 0.5, duration: 0.8, ease: 'power2.in', repeat: -1, yoyo: true, delay: 0.5 })
    gsap.to('.zd2k-blip2', { opacity: 0, scale: 0.5, duration: 1.1, ease: 'power2.in', repeat: -1, yoyo: true, delay: 1.2 })
    gsap.to('.zd2k-blip3', { opacity: 0, duration: 0.6, ease: 'power2.in', repeat: -1, yoyo: true, delay: 0.9 })
    // Scan line
    gsap.to('.zd2k-scan', { top: '100%', duration: 3.2, ease: 'none', repeat: -1, delay: 1.5,
      onRepeat() { gsap.set('.zd2k-scan', { top: '0%' }) } })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="zd2000-hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
      style={{ paddingTop: 68 }}
    >
      {/* Ocean grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(14,165,233,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Bottom ocean gradient */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(14,165,233,0.04) 0%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[650px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.06) 0%, transparent 68%)',
        filter: 'blur(55px)', animation: 'zd2kOrb1 10s ease-in-out infinite',
      }} />
      <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.04) 0%, transparent 68%)',
        filter: 'blur(60px)', animation: 'zd2kOrb2 13s ease-in-out infinite',
      }} />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.04) 0%, transparent 70%)',
        filter: 'blur(50px)', animation: 'zd2kOrb3 8s ease-in-out infinite',
      }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.s,
            background: p.id % 4 === 0 ? '#ef4444' : p.id % 3 === 0 ? '#a78bfa' : '#0ea5e9',
            opacity: p.op,
            animation: `zd2kParticle ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Text ────────────────────────────────────────────────── */}
          <div className="relative z-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0ea5e9', animation: 'zd2kBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#0ea5e9' }}>
                Maritime Defense System
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="font-display font-bold text-white mb-6 overflow-hidden"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.4rem)', letterSpacing: '-0.03em', lineHeight: 0.98, perspective: '900px' }}>
              <span className="block overflow-hidden">
                <span className="zd2k-word inline-block" style={{ opacity: 0 }}>Zena<span className="text-primary">Drone</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="zd2k-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2000</span>
                  {' '}
                  <span style={{ fontSize: '0.45em', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', verticalAlign: 'middle' }}>+</span>
                  {' '}
                  <span style={{ fontSize: '0.5em', background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IQ Glider</span>
                </span>
              </span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-mono font-bold uppercase tracking-[0.22em] mb-4"
              style={{ fontSize: '0.8125rem', color: '#0ea5e9' }}
            >
              Autonomous Maritime Launch &amp; Recovery Platform
            </motion.p>

            <p className="zd2k-sub font-sans text-text-muted leading-relaxed mb-8"
              style={{ fontSize: '1.125rem', maxWidth: 520, opacity: 0 }}>
              High-endurance, gas-powered UAV engineered for sea-based and coastal defense. Counter slow-moving aerial threats and drone swarms with extended flight time, autonomous AI intercept, and scalable maritime deployment.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map(s => (
                <div key={s.unit} className="zd2k-stat flex flex-col items-center py-3 px-2 rounded-xl text-center" style={{
                  background: `${s.color}09`, border: `1px solid ${s.color}22`, opacity: 0,
                }}>
                  <span className="font-display font-bold" style={{ fontSize: '1.35rem', color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </span>
                  <span className="font-mono text-text-muted mt-1 tracking-[0.12em]" style={{ fontSize: '0.8125rem' }}>
                    {s.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="#zd2000-demo"
                className="zd2k-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  boxShadow: '0 0 24px rgba(14,165,233,0.35), 0 4px 20px rgba(14,165,233,0.2)',
                  color: '#fff', fontSize: '0.88rem', opacity: 0,
                }}>
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#zd2000-overview"
                className="zd2k-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', opacity: 0 }}>
                Learn More
              </Link>
            </div>
          </div>

          {/* ── Right: Drone visual ───────────────────────────────────────── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[480px] h-[480px] relative flex items-center justify-center">
                <MaritimeRadar />
              </div>
            </div>

            {/* Spinning rings */}
            <div className="absolute w-[440px] h-[440px] rounded-full zd2k-ring1" style={{ border: '1px solid rgba(14,165,233,0.08)' }} />
            <div className="absolute w-[330px] h-[330px] rounded-full zd2k-ring2" style={{ border: '1px solid rgba(167,139,250,0.06)' }} />

            {/* Pulse rings */}
            <div className="zd2k-pulse absolute w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(14,165,233,0.35)', opacity: 0.5 }} />
            <div className="zd2k-pulse absolute w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(239,68,68,0.2)', opacity: 0.3 }} />

            {/* Glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.07) 0%, transparent 70%)',
              animation: 'zd2kGlow 3.5s ease-in-out infinite',
            }} />

            {/* Drone */}
            <div className="relative z-10 w-[340px] h-[340px]" style={{ animation: 'zd2kFloat 4.5s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(14,165,233,0.2) 0%, transparent 70%)',
                filter: 'blur(8px)', animation: 'zd2kShadow 4.5s ease-in-out infinite',
              }} />
              {/* ZenaDrone 2000 — animated top-down illustration */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" fill="none"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(14,165,233,0.22)) drop-shadow(0 0 28px rgba(14,165,233,0.12))' }}>
                <defs>
                  <radialGradient id="zd2kBodyFill" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.06" />
                  </radialGradient>
                  <radialGradient id="zd2kWingFill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.04" />
                  </radialGradient>
                  <radialGradient id="zd2kCenterGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Body glow */}
                <ellipse cx="150" cy="150" rx="85" ry="65" fill="url(#zd2kCenterGlow)" />

                {/* Main wings — swept */}
                <path d="M138 132 L32 168 L38 180 L144 148 Z" fill="url(#zd2kWingFill)" stroke="#0ea5e9" strokeWidth="0.9" opacity="0.85" />
                <path d="M162 132 L268 168 L262 180 L156 148 Z" fill="url(#zd2kWingFill)" stroke="#0ea5e9" strokeWidth="0.9" opacity="0.85" />
                {/* Wing panel lines */}
                <line x1="137" y1="134" x2="65" y2="155" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.3" strokeDasharray="5 4" />
                <line x1="163" y1="134" x2="235" y2="155" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.3" strokeDasharray="5 4" />
                <line x1="138" y1="138" x2="88" y2="150" stroke="#0ea5e9" strokeWidth="0.3" opacity="0.2" strokeDasharray="3 5" />
                <line x1="162" y1="138" x2="212" y2="150" stroke="#0ea5e9" strokeWidth="0.3" opacity="0.2" strokeDasharray="3 5" />

                {/* Engine nacelles under wings */}
                <ellipse cx="96" cy="158" rx="12" ry="5.5" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.75" />
                <ellipse cx="204" cy="158" rx="12" ry="5.5" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.75" />
                <ellipse cx="96" cy="158" rx="4.5" ry="2.5" fill="#0ea5e9" opacity="0.35" className="zd2k-eng-l" />
                <ellipse cx="204" cy="158" rx="4.5" ry="2.5" fill="#0ea5e9" opacity="0.35" className="zd2k-eng-r" />

                {/* Fuselage */}
                <path d="M150 48 C162 52 172 72 173 105 L174 190 C173 204 163 214 150 217 C137 214 127 204 126 190 L127 105 C128 72 138 52 150 48 Z"
                  fill="url(#zd2kBodyFill)" stroke="#0ea5e9" strokeWidth="1.1" opacity="0.92" />
                {/* Fuselage center line */}
                <line x1="150" y1="54" x2="150" y2="212" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.22" strokeDasharray="7 5" />
                {/* Fuselage panel lines */}
                <path d="M132 118 Q150 123 168 118" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.2" fill="none" />
                <path d="M130 148 Q150 153 170 148" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.18" fill="none" />
                <path d="M130 172 Q150 177 170 172" stroke="#0ea5e9" strokeWidth="0.4" opacity="0.15" fill="none" />

                {/* Cockpit/sensor array */}
                <ellipse cx="150" cy="108" rx="13" ry="20" fill="rgba(14,165,233,0.12)" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.7" />
                <ellipse cx="150" cy="108" rx="6" ry="10" fill="rgba(14,165,233,0.22)" opacity="0.85" />

                {/* Nose sensor ball */}
                <circle cx="150" cy="62" r="10" fill="rgba(14,165,233,0.18)" stroke="#0ea5e9" strokeWidth="1" opacity="0.9" />
                <circle cx="150" cy="62" r="4" fill="#0ea5e9" opacity="0.65" className="zd2k-sensor-pulse" />

                {/* IQ Glider payload bay */}
                <rect x="142" y="155" width="16" height="22" rx="3" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="0.7" opacity="0.75" />
                <text x="150" y="169" textAnchor="middle" fill="#a78bfa" fontSize="4.5" fontFamily="monospace" opacity="0.7">GLR</text>

                {/* Horizontal stabilizers */}
                <path d="M138 198 L88 214 L90 222 L144 205 Z" fill="url(#zd2kWingFill)" stroke="#0ea5e9" strokeWidth="0.7" opacity="0.7" />
                <path d="M162 198 L212 214 L210 222 L156 205 Z" fill="url(#zd2kWingFill)" stroke="#0ea5e9" strokeWidth="0.7" opacity="0.7" />

                {/* Vertical tail fin */}
                <path d="M146 204 L141 245 L150 250 L159 245 L154 204 Z" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9" strokeWidth="0.9" opacity="0.8" />

                {/* Pusher propeller at tail */}
                <ellipse cx="150" cy="248" rx="18" ry="4" fill="rgba(14,165,233,0.06)" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.5" strokeDasharray="4 4" />
                <circle cx="150" cy="248" r="3.5" fill="#0ea5e9" opacity="0.75" />

                {/* Wing tip nav lights */}
                <circle cx="34" cy="173" r="3.5" fill="#ef4444" opacity="0.85" className="zd2k-nav-l" />
                <circle cx="266" cy="173" r="3.5" fill="#34d399" opacity="0.85" className="zd2k-nav-r" />
                {/* Wingtip glow halos */}
                <circle cx="34" cy="173" r="7" stroke="#ef4444" strokeWidth="0.6" opacity="0.3" className="zd2k-nav-l" />
                <circle cx="266" cy="173" r="7" stroke="#34d399" strokeWidth="0.6" opacity="0.3" className="zd2k-nav-r" />

                {/* Corner HUD brackets */}
                <path d="M55 55 L55 68 M55 55 L68 55" stroke="#0ea5e9" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
                <path d="M245 55 L245 68 M245 55 L232 55" stroke="#0ea5e9" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
                <path d="M55 245 L55 232 M55 245 L68 245" stroke="#0ea5e9" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
                <path d="M245 245 L245 232 M245 245 L232 245" stroke="#0ea5e9" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />

                {/* Altitude / telemetry labels */}
                <text x="58" y="60" fill="#0ea5e9" fontSize="5" fontFamily="monospace" opacity="0.4">ALT 2400ft</text>
                <text x="180" y="248" fill="#a78bfa" fontSize="5" fontFamily="monospace" opacity="0.35">GAS PWR</text>
              </svg>
              <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 0, bottom: 0, pointerEvents: 'none' }}>
                <div className="zd2k-scan absolute left-0 right-0 h-[2px]" style={{
                  top: '0%',
                  background: 'linear-gradient(to right, transparent, rgba(14,165,233,0.5) 30%, rgba(14,165,233,0.88) 50%, rgba(14,165,233,0.5) 70%, transparent)',
                  boxShadow: '0 0 12px rgba(14,165,233,0.45)',
                }} />
              </div>
            </div>

            {/* HUD badges */}
            <div className="zd2k-hud absolute left-[-12px] top-[20%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(239,68,68,0.28)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ animation: 'zd2kBlink 1.2s ease-in-out infinite' }} />
                <span className="font-mono font-bold tracking-[0.18em] uppercase" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>Threat Active</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'rgba(239,68,68,0.7)' }}>TARGETS: 3</span>
            </div>

            <div className="zd2k-hud absolute right-[-12px] top-1/3 px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(14,165,233,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#0ea5e9' }}>
                <div>PWR: <span className="text-white">GAS</span></div>
                <div>FLT: <span className="text-white">3-4 hrs</span></div>
                <div>AI: <span className="text-white">TRACKING</span></div>
              </div>
            </div>

            <div className="zd2k-hud absolute right-[8%] bottom-[18%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(167,139,250,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>
                <div>GLIDER: <span className="text-white">LINKED</span></div>
                <div>DOCK: <span className="text-white">READY</span></div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-text-muted tracking-[0.32em] uppercase" style={{ fontSize: '0.8125rem' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(14,165,233,0.7), transparent)', animation: 'zd2kBlink 2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)',
      }} />

      <style>{`
        .zd2k-ring1 { animation: zd2kSpin 22s linear infinite; }
        .zd2k-ring2 { animation: zd2kSpin 15s linear infinite reverse; }

        @keyframes zd2kSpin      { to { transform: rotate(360deg); } }
        @keyframes zd2kFloat     { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes zd2kShadow    { 0%,100% { opacity: 0.55; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.28; transform: translateX(-50%) scaleX(0.75); } }
        @keyframes zd2kGlow      { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.12); } }
        @keyframes zd2kBlink     { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes zd2kParticle  { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes zd2kOrb1      { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(26px,-18px) scale(1.06); } }
        @keyframes zd2kOrb2      { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,16px) scale(0.96); } }
        @keyframes zd2kOrb3      { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(14px,-22px) scale(1.08); } }
        .zd2k-sensor-pulse { animation: zd2kSensorPulse 2s ease-in-out infinite; }
        .zd2k-nav-l        { animation: zd2kNavL 1.4s ease-in-out infinite; }
        .zd2k-nav-r        { animation: zd2kNavR 1.8s ease-in-out infinite; }
        .zd2k-eng-l        { animation: zd2kEngGlow 2.2s ease-in-out infinite; }
        .zd2k-eng-r        { animation: zd2kEngGlow 2.2s ease-in-out infinite 0.4s; }
        @keyframes zd2kSensorPulse { 0%,100% { opacity:0.65; r:4px; } 50% { opacity:1; r:5.5px; } }
        @keyframes zd2kNavL { 0%,100% { opacity:0.85; } 50% { opacity:0.2; } }
        @keyframes zd2kNavR { 0%,100% { opacity:0.85; } 50% { opacity:0.2; } }
        @keyframes zd2kEngGlow { 0%,100% { opacity:0.35; } 50% { opacity:0.75; } }
      `}</style>
    </section>
  )
}
