'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Deterministic particles ──────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 43.1) % 100).toFixed(2)),
  y:  parseFloat(((i * 67.3) % 100).toFixed(2)),
  s:  1 + (i % 3) * 0.55,
  d:  3.5 + (i % 5),
  dl: parseFloat(((i * 0.19) % 4).toFixed(2)),
  op: parseFloat((0.12 + (i % 4) * 0.08).toFixed(2)),
}))

const STATS = [
  { value: '41"',  unit: 'FOOTPRINT',    color: '#00d4ff' },
  { value: '20m',  unit: 'FLIGHT TIME',  color: '#a78bfa' },
  { value: 'VTOL', unit: 'DESIGN',       color: '#fbbf24' },
  { value: 'AI',   unit: 'NAVIGATION',   color: '#34d399' },
]

// ─── Square grid visual ───────────────────────────────────────────────────────
function SquareGrid() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none iqs-grid-svg">
      {/* Outer square */}
      <rect x={100} y={100} width={300} height={300} stroke="#00d4ff" strokeWidth={0.8} strokeDasharray="8 6" opacity={0.18} />
      {/* Inner square */}
      <rect x={155} y={155} width={190} height={190} stroke="#00d4ff" strokeWidth={0.5} strokeDasharray="4 8" opacity={0.12} />
      {/* Corner brackets */}
      {[
        [100, 100], [400, 100], [400, 400], [100, 400],
      ].map(([cx, cy], i) => {
        const dx = i === 0 || i === 3 ? 1 : -1
        const dy = i < 2 ? 1 : -1
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={cx + dx * 24} y2={cy} stroke="#00d4ff" strokeWidth={1.8} strokeLinecap="round" opacity={0.5} />
            <line x1={cx} y1={cy} x2={cx} y2={cy + dy * 24} stroke="#00d4ff" strokeWidth={1.8} strokeLinecap="round" opacity={0.5} />
          </g>
        )
      })}
      {/* Cross hairs */}
      <line x1={50}  y1={250} x2={450} y2={250} stroke="#00d4ff" strokeWidth={0.4} opacity={0.07} />
      <line x1={250} y1={50}  x2={250} y2={450} stroke="#00d4ff" strokeWidth={0.4} opacity={0.07} />
      {/* Diagonal accents */}
      <line x1={100} y1={100} x2={145} y2={145} stroke="#a78bfa" strokeWidth={0.5} opacity={0.2} />
      <line x1={400} y1={100} x2={355} y2={145} stroke="#a78bfa" strokeWidth={0.5} opacity={0.2} />
      <line x1={100} y1={400} x2={145} y2={355} stroke="#a78bfa" strokeWidth={0.5} opacity={0.2} />
      <line x1={400} y1={400} x2={355} y2={355} stroke="#a78bfa" strokeWidth={0.5} opacity={0.2} />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function IQSquareHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo('.iqs-word',
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }
    )
    tl.fromTo('.iqs-sub',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo('.iqs-stat',
      { y: 18, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 },
      '-=0.4'
    )
    tl.fromTo('.iqs-cta',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
    tl.fromTo(droneRef.current,
      { x: 90, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' },
      '-=1.2'
    )
    tl.fromTo('.iqs-hud',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.12 },
      '-=0.3'
    )

    // Continuous scan animation
    gsap.fromTo('.iqs-scan',
      { top: '0%', opacity: 0 },
      { top: '100%', opacity: 1, duration: 3.2, ease: 'none', repeat: -1, yoyo: false,
        onRepeat() { gsap.set('.iqs-scan', { opacity: 0 }) },
        onStart() { gsap.to('.iqs-scan', { opacity: 1, duration: 0.3 }) } }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="iq-square-hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
      style={{ paddingTop: 68 }}
    >
      {/* Line grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full pointer-events-none iqs-orb1" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.055) 0%, transparent 68%)',
        filter: 'blur(55px)',
      }} />
      <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] rounded-full pointer-events-none iqs-orb2" style={{
        background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.065) 0%, transparent 68%)',
        filter: 'blur(60px)',
      }} />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.04) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'iqs-orb3 11s ease-in-out infinite',
      }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.s,
            height: p.s,
            background: p.id % 4 === 0 ? '#a78bfa' : p.id % 7 === 0 ? '#fbbf24' : '#00d4ff',
            opacity: p.op,
            animation: `iqs-particle ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Text content ────────────────────────────────────────────── */}
          <div className="relative z-10">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'iqs-blink 2s ease-in-out infinite' }} />
              <span className="font-mono text-primary font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem' }}>
                Multifunction AI Drone
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="font-display font-bold text-white mb-6 overflow-hidden"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.4rem)', letterSpacing: '-0.03em', lineHeight: 0.98, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="iqs-word inline-block" style={{ opacity: 0 }}>Zena<span className="text-primary">Drone</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="iqs-word inline-block" style={{ opacity: 0 }}>IQ <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Square</span></span>
              </span>
            </h1>

            {/* Description */}
            <p className="iqs-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem', maxWidth: 520, opacity: 0 }}>
              Advanced multifunction AI drone engineered for commercial inspections, land surveys, power washing, and government defense applications — with autonomous recharging and interchangeable sensors.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map(s => (
                <div key={s.unit} className="iqs-stat flex flex-col items-center py-3 px-2 rounded-xl text-center" style={{
                  background: `${s.color}09`,
                  border: `1px solid ${s.color}22`,
                  opacity: 0,
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
              <Link href="/iq-square#iq-square-demo"
                className="iqs-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                  boxShadow: '0 0 24px rgba(0,212,255,0.35), 0 4px 20px rgba(0,212,255,0.2)',
                  color: '#07070f',
                  fontSize: '0.88rem',
                  opacity: 0,
                }}
              >
                Book A Service
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link href="/iq-square#iq-square-demo"
                className="iqs-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', opacity: 0 }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* ── Right: Drone visual ───────────────────────────────────────────── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            {/* Square grid rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[480px] h-[480px] relative flex items-center justify-center">
                <SquareGrid />
              </div>
            </div>

            {/* Spinning square rings */}
            <div className="absolute w-[440px] h-[440px] iqs-ring1" style={{
              border: '1px solid rgba(0,212,255,0.08)',
              borderRadius: 4,
            }} />
            <div className="absolute w-[340px] h-[340px] iqs-ring2" style={{
              border: '1px solid rgba(167,139,250,0.06)',
              borderRadius: 4,
            }} />

            {/* Center glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)',
              animation: 'iqs-glow 3.5s ease-in-out infinite',
            }} />

            {/* Drone image */}
            <div className="relative z-10 w-[600px] h-[600px]" style={{ animation: 'iqs-float 4.5s ease-in-out infinite' }}>
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(0,212,255,0.22) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'iqs-shadow 4.5s ease-in-out infinite',
              }} />

              <Image
                src="/images/IQ-Nano.png"
                alt="ZenaDrone IQ Square multifunction AI drone"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.22)) drop-shadow(0 0 28px rgba(0,212,255,0.12))' }}
                priority
              />

              {/* Scan line */}
              <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 0, bottom: 0, pointerEvents: 'none' }}>
                <div className="iqs-scan absolute left-0 right-0 h-[2px]" style={{
                  background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.55) 30%, rgba(0,212,255,0.85) 50%, rgba(0,212,255,0.55) 70%, transparent)',
                  boxShadow: '0 0 12px rgba(0,212,255,0.45)',
                }} />
              </div>
            </div>

            {/* HUD badges */}
            <div className="iqs-hud absolute left-[-12px] top-[22%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)',
              border: '1px solid rgba(52,211,153,0.25)',
              backdropFilter: 'blur(14px)',
              opacity: 0,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'iqs-blink 1.5s ease-in-out infinite' }} />
                <span className="font-mono text-green-400 font-bold tracking-[0.18em] uppercase" style={{ fontSize: '0.8125rem' }}>VTOL Active</span>
              </div>
              <span className="font-mono text-green-400/60" style={{ fontSize: '0.8125rem' }}>AUTO-LAND: READY</span>
            </div>

            <div className="iqs-hud absolute right-[-12px] top-1/3 px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)',
              border: '1px solid rgba(167,139,250,0.22)',
              backdropFilter: 'blur(14px)',
              opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>
                <div>FLT: <span className="text-white">~20 min</span></div>
                <div>NAV: <span className="text-white">AI MODE</span></div>
                <div>CAM: <span className="text-white">ACTIVE</span></div>
              </div>
            </div>

            <div className="iqs-hud absolute right-[8%] bottom-[20%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)',
              border: '1px solid rgba(251,191,36,0.22)',
              backdropFilter: 'blur(14px)',
              opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
                <div>CHARGE: <span className="text-white">PAD</span></div>
                <div>SIZE: <span className="text-white">41×41&quot;</span></div>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'iqs-blink 2s ease-in-out infinite' }} />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)',
      }} />

      <style>{`
        .iqs-ring1  { animation: iqsSpin 20s linear infinite; }
        .iqs-ring2  { animation: iqsSpin 14s linear infinite reverse; }
        .iqs-orb1   { animation: iqsOrb1 9s ease-in-out infinite; }
        .iqs-orb2   { animation: iqsOrb2 12s ease-in-out infinite; }

        @keyframes iqsSpin         { to { transform: rotate(360deg); } }
        @keyframes iqs-float       { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes iqs-shadow      { 0%,100% { opacity: 0.55; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.28; transform: translateX(-50%) scaleX(0.75); } }
        @keyframes iqs-glow        { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.88; transform: scale(1.12); } }
        @keyframes iqs-blink       { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes iqs-particle    { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes iqsOrb1         { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(28px,-18px) scale(1.05); } }
        @keyframes iqsOrb2         { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,16px) scale(0.96); } }
        @keyframes iqs-orb3        { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,-25px) scale(1.08); } }
      `}</style>
    </section>
  )
}
