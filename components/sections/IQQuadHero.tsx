'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Deterministic particles ──────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 46 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 47.3) % 100).toFixed(2)),
  y:  parseFloat(((i * 69.1) % 100).toFixed(2)),
  s:  0.9 + (i % 3) * 0.55,
  d:  3.2 + (i % 5),
  dl: parseFloat(((i * 0.23) % 4).toFixed(2)),
  op: parseFloat((0.1 + (i % 4) * 0.07).toFixed(2)),
}))

const STATS = [
  { value: '45m',  unit: 'FLIGHT TIME',   color: '#fbbf24' },
  { value: '5km',  unit: 'RANGE',         color: '#00d4ff' },
  { value: '3kg',  unit: 'PAYLOAD',       color: '#a78bfa' },
  { value: '360°', unit: 'AWARENESS',     color: '#34d399' },
]

// ─── Survey grid SVG ──────────────────────────────────────────────────────────
function SurveyGrid() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Topographic contour lines */}
      {[200, 170, 140, 110, 80].map((r, i) => (
        <ellipse key={r} cx={250} cy={270} rx={r} ry={r * 0.55}
          stroke="#fbbf24" strokeWidth={0.5}
          strokeDasharray={i % 2 === 0 ? '6 8' : '2 10'}
          opacity={0.07 + i * 0.015}
        />
      ))}
      {/* Grid overlay */}
      {[140, 180, 220, 260, 300, 340].map(x => (
        <line key={`gx${x}`} x1={x} y1={100} x2={x} y2={400} stroke="#fbbf24" strokeWidth={0.35} opacity={0.07} />
      ))}
      {[140, 175, 210, 245, 280, 315, 350].map(y => (
        <line key={`gy${y}`} x1={100} y1={y} x2={400} y2={y} stroke="#fbbf24" strokeWidth={0.35} opacity={0.07} />
      ))}
      {/* Corner targeting brackets */}
      <path d="M100 100 L100 128 M100 100 L128 100" stroke="#fbbf24" strokeWidth={1.8} strokeLinecap="round" opacity={0.55} />
      <path d="M400 100 L400 128 M400 100 L372 100" stroke="#fbbf24" strokeWidth={1.8} strokeLinecap="round" opacity={0.55} />
      <path d="M100 400 L100 372 M100 400 L128 400" stroke="#fbbf24" strokeWidth={1.8} strokeLinecap="round" opacity={0.55} />
      <path d="M400 400 L400 372 M400 400 L372 400" stroke="#fbbf24" strokeWidth={1.8} strokeLinecap="round" opacity={0.55} />
      {/* GCP markers */}
      {[[160, 200], [340, 180], [180, 340], [320, 310]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={5} stroke="#fbbf24" strokeWidth={0.9} opacity={0.3} fill="none" />
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="#fbbf24" strokeWidth={0.7} opacity={0.4} />
          <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="#fbbf24" strokeWidth={0.7} opacity={0.4} />
        </g>
      ))}
      {/* Center crosshair */}
      <line x1={50}  y1={250} x2={450} y2={250} stroke="#fbbf24" strokeWidth={0.4} opacity={0.1} />
      <line x1={250} y1={50}  x2={250} y2={450} stroke="#fbbf24" strokeWidth={0.4} opacity={0.1} />
      <circle cx={250} cy={250} r={6} stroke="#fbbf24" strokeWidth={1} opacity={0.2} />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function IQQuadHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo('.iqq-word',
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }
    )
    tl.fromTo('.iqq-tagline',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo('.iqq-sub',
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo('.iqq-stat',
      { y: 18, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 },
      '-=0.4'
    )
    tl.fromTo('.iqq-cta',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
    tl.fromTo(droneRef.current,
      { x: 90, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' },
      '-=1.2'
    )
    tl.fromTo('.iqq-hud',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.12 },
      '-=0.3'
    )

    // Scan line loop
    gsap.to('.iqq-scan', {
      top: '100%', duration: 3.0, ease: 'none', repeat: -1, delay: 1.5,
      onRepeat() { gsap.set('.iqq-scan', { top: '0%' }) },
    })

    // GCP pulse
    gsap.to('.iqq-pulse', {
      scale: 1.4, opacity: 0, duration: 2, ease: 'power2.out',
      repeat: -1, stagger: 0.7, delay: 2,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="iq-quad-hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
      style={{ paddingTop: 68 }}
    >
      {/* Survey-grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(251,191,36,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[620px] h-[620px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.06) 0%, transparent 68%)',
        filter: 'blur(55px)', animation: 'iqqOrb1 10s ease-in-out infinite',
      }} />
      <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 68%)',
        filter: 'blur(60px)', animation: 'iqqOrb2 13s ease-in-out infinite',
      }} />
      <div className="absolute top-1/2 right-1/5 w-[300px] h-[300px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.04) 0%, transparent 70%)',
        filter: 'blur(50px)', animation: 'iqqOrb3 8s ease-in-out infinite',
      }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.s,
            background: p.id % 3 === 0 ? '#a78bfa' : p.id % 5 === 0 ? '#00d4ff' : '#fbbf24',
            opacity: p.op,
            animation: `iqqParticle ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Text ─────────────────────────────────────────────────── */}
          <div className="relative z-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#fbbf24', animation: 'iqqBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
                Survey-Grade Quadcopter
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="font-display font-bold text-white mb-4 overflow-hidden"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.4rem)', letterSpacing: '-0.03em', lineHeight: 0.98, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="iqq-word inline-block" style={{ opacity: 0 }}>Zena<span className="text-primary">Drone</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="iqq-word inline-block" style={{ opacity: 0 }}>IQ <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Quad</span></span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="iqq-tagline font-mono font-bold uppercase tracking-[0.25em] mb-4" style={{ fontSize: '0.8125rem', color: '#fbbf24', opacity: 0 }}>
              The Future of Drone Surveying
            </p>

            {/* Description */}
            <p className="iqq-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem', maxWidth: 520, opacity: 0 }}>
              A reliable VTOL quadcopter delivering survey-grade accuracy for land surveys, construction, urban planning, and mining — with 45-minute flight time, 5 km range, and real-time secure data transmission.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map(s => (
                <div key={s.unit} className="iqq-stat flex flex-col items-center py-3 px-2 rounded-xl text-center" style={{
                  background: `${s.color}09`, border: `1px solid ${s.color}22`, opacity: 0,
                }}>
                  <span className="font-display font-bold" style={{ fontSize: '1.45rem', color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
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
              <Link href="#iq-quad-demo"
                className="iqq-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  boxShadow: '0 0 24px rgba(251,191,36,0.35), 0 4px 20px rgba(251,191,36,0.2)',
                  color: '#07070f', fontSize: '0.88rem', opacity: 0,
                }}
              >
                Get a Demo
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#iq-quad-overview"
                className="iqq-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', opacity: 0 }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* ── Right: Drone visual ───────────────────────────────────────── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            {/* Survey grid visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[480px] h-[480px] relative flex items-center justify-center">
                <SurveyGrid />
              </div>
            </div>

            {/* Spinning rings */}
            <div className="absolute w-[440px] h-[440px] rounded-full iqq-ring1" style={{ border: '1px solid rgba(251,191,36,0.08)' }} />
            <div className="absolute w-[330px] h-[330px] rounded-full iqq-ring2" style={{ border: '1px solid rgba(0,212,255,0.06)' }} />

            {/* Pulse rings */}
            <div className="iqq-pulse absolute w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(251,191,36,0.35)', opacity: 0.5 }} />
            <div className="iqq-pulse absolute w-[250px] h-[250px] rounded-full" style={{ border: '1px solid rgba(251,191,36,0.2)', opacity: 0.3 }} />

            {/* Center glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.07) 0%, transparent 70%)',
              animation: 'iqqGlow 3.5s ease-in-out infinite',
            }} />

            {/* Drone image */}
            <div className="relative z-10 w-[600px] h-[600px]" style={{ animation: 'iqqFloat 4.5s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(251,191,36,0.22) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'iqqShadow 4.5s ease-in-out infinite',
              }} />
              <Image
                src="/images/IQ-Quad.png"
                alt="ZenaDrone IQ Quad survey drone"
                fill className="object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(251,191,36,0.22)) drop-shadow(0 0 28px rgba(251,191,36,0.12))' }}
                priority
              />
              {/* Scan line */}
              <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 0, bottom: 0, pointerEvents: 'none' }}>
                <div className="iqq-scan absolute left-0 right-0 h-[2px]" style={{
                  top: '0%',
                  background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5) 30%, rgba(251,191,36,0.85) 50%, rgba(251,191,36,0.5) 70%, transparent)',
                  boxShadow: '0 0 12px rgba(251,191,36,0.45)',
                }} />
              </div>
            </div>

            {/* HUD badges */}
            <div className="iqq-hud absolute left-[-12px] top-[22%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(52,211,153,0.25)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'iqqBlink 1.5s ease-in-out infinite' }} />
                <span className="font-mono font-bold tracking-[0.18em] uppercase" style={{ fontSize: '0.8125rem', color: '#34d399' }}>Surveying</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'rgba(52,211,153,0.6)' }}>LiDAR: ACTIVE</span>
            </div>

            <div className="iqq-hud absolute right-[-12px] top-1/3 px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
                <div>ALT: <span className="text-white">120 m</span></div>
                <div>RNG: <span className="text-white">5 km</span></div>
                <div>GPS: <span className="text-white">RTK LOCK</span></div>
              </div>
            </div>

            <div className="iqq-hud absolute right-[8%] bottom-[18%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(251,191,36,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
                <div>BAT: <span className="text-white">94%</span></div>
                <div>ETA: <span className="text-white">42 min</span></div>
                <div>PAY: <span className="text-white">2.8 kg</span></div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-text-muted tracking-[0.32em] uppercase" style={{ fontSize: '0.8125rem' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(251,191,36,0.7), transparent)', animation: 'iqqBlink 2s ease-in-out infinite' }} />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)',
      }} />

      <style>{`
        .iqq-ring1 { animation: iqqSpin 22s linear infinite; }
        .iqq-ring2 { animation: iqqSpin 15s linear infinite reverse; }

        @keyframes iqqSpin     { to { transform: rotate(360deg); } }
        @keyframes iqqFloat    { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes iqqShadow   { 0%,100% { opacity: 0.55; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.28; transform: translateX(-50%) scaleX(0.75); } }
        @keyframes iqqGlow     { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.88; transform: scale(1.12); } }
        @keyframes iqqBlink    { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes iqqParticle { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes iqqOrb1     { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(26px,-18px) scale(1.05); } }
        @keyframes iqqOrb2     { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,16px) scale(0.96); } }
        @keyframes iqqOrb3     { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(14px,-22px) scale(1.08); } }
      `}</style>
    </section>
  )
}
