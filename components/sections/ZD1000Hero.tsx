'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Static particle data (deterministic so SSR matches client) ───────────────
const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 37.3) % 100).toFixed(2)),
  y:  parseFloat(((i * 61.7) % 100).toFixed(2)),
  s:  1 + (i % 3) * 0.6,
  d:  3 + (i % 5),
  dl: parseFloat(((i * 0.17) % 4).toFixed(2)),
  op: parseFloat((0.15 + (i % 4) * 0.1).toFixed(2)),
}))

const STATS = [
  { value: '8',    unit: 'ROTORS',      color: '#00d4ff' },
  { value: '45m',  unit: 'FLIGHT TIME', color: '#a78bfa' },
  { value: '10km', unit: 'RANGE',       color: '#34d399' },
  //{ value: '5kg',  unit: 'PAYLOAD',     color: '#fbbf24' },
]

// ─── Radar ring SVG ───────────────────────────────────────────────────────────
function RadarRings() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none zd1k-radar">
      {[200, 170, 130, 90].map((r, i) => (
        <circle key={r} cx={250} cy={250} r={r}
          stroke="#00d4ff" strokeWidth={i === 0 ? 0.5 : 0.4}
          strokeDasharray={i % 2 === 0 ? '5 8' : '2 10'}
          opacity={0.12 - i * 0.02}
        />
      ))}
      {/* Sweep arm */}
      <line x1={250} y1={250} x2={250} y2={52} stroke="#00d4ff" strokeWidth={1} opacity={0.3} className="zd1k-sweep" style={{ transformOrigin: '250px 250px' }} />
      {/* Cross hairs */}
      <line x1={50} y1={250} x2={450} y2={250} stroke="#00d4ff" strokeWidth={0.4} opacity={0.08} />
      <line x1={250} y1={50}  x2={250} y2={450} stroke="#00d4ff" strokeWidth={0.4} opacity={0.08} />
      {/* Tick marks */}
      {Array.from({ length: 12 }).map((_, k) => {
        const a = (k * 30 - 90) * Math.PI / 180
        return (
          <line key={k}
            x1={250 + 195 * Math.cos(a)} y1={250 + 195 * Math.sin(a)}
            x2={250 + 205 * Math.cos(a)} y2={250 + 205 * Math.sin(a)}
            stroke="#00d4ff" strokeWidth={k % 3 === 0 ? 1 : 0.5} opacity={0.2}
          />
        )
      })}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ZD1000Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.25 })

    tl.fromTo('.zd1k-word',
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }
    )
    tl.fromTo('.zd1k-sub',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo('.zd1k-stat',
      { y: 18, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 },
      '-=0.4'
    )
    tl.fromTo('.zd1k-cta',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
    tl.fromTo(droneRef.current,
      { x: 90, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' },
      '-=1.3'
    )
    tl.fromTo('.zd1k-hud',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.12 },
      '-=0.3'
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
      style={{ paddingTop: 68 }}
    >
      {/* Animated line grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none zd1k-orb1" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 68%)',
        filter: 'blur(55px)',
      }} />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none zd1k-orb2" style={{
        background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 68%)',
        filter: 'blur(60px)',
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.s,
            height: p.s,
            background: p.id % 5 === 0 ? '#a78bfa' : '#00d4ff',
            opacity: p.op,
            animation: `zd1k-particle ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Text content ─────────────────────────────────────────────── */}
          <div className="relative z-10">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'zd1k-blink 2s ease-in-out infinite' }} />
              <span className="font-mono text-primary font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem' }}>
                Advanced UAV Technology
              </span>
            </motion.div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display font-bold text-white mb-6 overflow-hidden"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 5.8rem)', letterSpacing: '-0.03em', lineHeight: 0.98, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="zd1k-word inline-block" style={{ opacity: 0 }}>Zena<span className="text-primary">Drone</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="zd1k-word inline-block" style={{ opacity: 0 }}>1000</span>
              </span>
            </h1>

            {/* Description */}
            <p className="zd1k-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem', maxWidth: 520, opacity: 0 }}>
              An advanced unmanned aerial vehicle built to lift heavy loads, fly steady, and navigate with precision — purpose-built for military, industrial, agricultural, and humanitarian missions worldwide.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map(s => (
                <div key={s.unit} className="zd1k-stat flex flex-col items-center py-3 px-2 rounded-xl text-center" style={{
                  background: `${s.color}09`,
                  border: `1px solid ${s.color}22`,
                  opacity: 0,
                }}>
                  <span className="font-display font-bold" style={{ fontSize: '1.55rem', color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </span>
                  <span className="font-mono text-text-muted mt-1 tracking-[0.12em]" style={{ fontSize: '0.8125rem' }}>
                    {s.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link href="/zenadrone-1000#book-demo"
                className="zd1k-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                  boxShadow: '0 0 24px rgba(0,212,255,0.35), 0 4px 20px rgba(0,212,255,0.2)',
                  color: '#07070f',
                  fontSize: '0.88rem',
                  opacity: 0,
                }}
              >
                Book a Demo
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link href="#overview"
                className="zd1k-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', opacity: 0 }}
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* ── Right: Drone visual ────────────────────────────────────────────── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>
            {/* Radar rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[480px] h-[480px] relative flex items-center justify-center">
                <RadarRings />
              </div>
            </div>

            {/* Outer slow-spinning ring */}
            <div className="absolute w-[460px] h-[460px] rounded-full zd1k-ring1" style={{
              border: '1px solid rgba(0,212,255,0.1)',
            }} />
            <div className="absolute w-[370px] h-[370px] rounded-full zd1k-ring2" style={{
              border: '1px solid rgba(0,212,255,0.06)',
            }} />

            {/* Center glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)',
              animation: 'zd1k-glow 3.5s ease-in-out infinite',
            }} />

            {/* Drone image */}
            <div className="relative z-10 w-[600px] h-[600px]" style={{ animation: 'zd1k-drone-float 4.5s ease-in-out infinite' }}>
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(0,212,255,0.25) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'zd1k-shadow 4.5s ease-in-out infinite',
              }} />

              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone 1000 multi-mission UAV"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.25)) drop-shadow(0 0 30px rgba(0,212,255,0.15))' }}
                priority
              />

              {/* Scan line */}
              <div className="absolute left-0 right-0 h-px overflow-hidden" style={{ top: 0 }}>
                <div className="zd1k-scan absolute left-0 right-0 h-[2px]" style={{
                  background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.6) 30%, rgba(0,212,255,0.9) 50%, rgba(0,212,255,0.6) 70%, transparent)',
                  boxShadow: '0 0 14px rgba(0,212,255,0.5)',
                }} />
              </div>
            </div>

            {/* HUD badges */}
            <div className="zd1k-hud absolute left-[-8px] top-[20%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)',
              border: '1px solid rgba(52,211,153,0.25)',
              backdropFilter: 'blur(14px)',
              opacity: 0,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'zd1k-blink 1.5s ease-in-out infinite' }} />
                <span className="font-mono text-green-400 font-bold tracking-[0.18em] uppercase" style={{ fontSize: '0.8125rem' }}>Autonomous</span>
              </div>
              <span className="font-mono text-green-400/60" style={{ fontSize: '0.8125rem' }}>MODE: ACTIVE</span>
            </div>

            <div className="zd1k-hud absolute right-[-8px] top-1/3 px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)',
              border: '1px solid rgba(167,139,250,0.22)',
              backdropFilter: 'blur(14px)',
              opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#a78bfa' }}>
                <div>ALT: <span className="text-white">120m</span></div>
                <div>SPD: <span className="text-white">58 km/h</span></div>
                <div>GPS: <span className="text-white">LOCKED</span></div>
              </div>
            </div>

            <div className="zd1k-hud absolute right-[10%] bottom-[18%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)',
              border: '1px solid rgba(251,191,36,0.22)',
              backdropFilter: 'blur(14px)',
              opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
                <div>BAT: <span className="text-white">94%</span></div>
                <div>ETA: <span className="text-white">42 min</span></div>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'zd1k-blink 2s ease-in-out infinite' }} />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)',
      }} />

      <style>{`
        .zd1k-ring1       { animation: zd1kSpin 22s linear infinite; }
        .zd1k-ring2       { animation: zd1kSpin 15s linear infinite reverse; }
        .zd1k-radar       { animation: zd1kSpin 30s linear infinite; }
        .zd1k-sweep       { animation: zd1kSpin 4s linear infinite; }
        .zd1k-scan        { animation: zd1kScanDown 3.2s linear infinite; }
        .zd1k-orb1        { animation: zd1kOrb1 9s ease-in-out infinite; }
        .zd1k-orb2        { animation: zd1kOrb2 12s ease-in-out infinite; }

        @keyframes zd1kSpin       { to { transform: rotate(360deg); } }
        @keyframes zd1kScanDown   { 0% { top: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes zd1k-drone-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes zd1k-shadow     { 0%,100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.3; transform: translateX(-50%) scaleX(0.75); } }
        @keyframes zd1k-glow       { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.1); } }
        @keyframes zd1k-blink      { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        @keyframes zd1k-particle   { 0%,100% { transform: translateY(0px); opacity: var(--op, 0.3); } 50% { transform: translateY(-10px); opacity: 0.55; } }
        @keyframes zd1kOrb1        { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.05); } }
        @keyframes zd1kOrb2        { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-22px,18px) scale(0.96); } }
      `}</style>
    </section>
  )
}
