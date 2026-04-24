'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

// ─── Deterministic particles ──────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 44 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 51.7) % 100).toFixed(2)),
  y:  parseFloat(((i * 73.3) % 100).toFixed(2)),
  s:  0.8 + (i % 3) * 0.5,
  d:  3 + (i % 5),
  dl: parseFloat(((i * 0.21) % 4).toFixed(2)),
  op: parseFloat((0.1 + (i % 4) * 0.07).toFixed(2)),
}))

const STATS = [
  { value: '20m',   unit: 'FLIGHT TIME',  color: '#34d399' },
  { value: '4K',    unit: 'CAMERA',       color: '#00d4ff' },
  { value: 'GPS-',  unit: 'FREE INDOOR',  color: '#a78bfa' },
  { value: 'QR',    unit: 'SCANNING',     color: '#fbbf24' },
]

// ─── Indoor grid / warehouse visual ──────────────────────────────────────────
function WarehouseGrid() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Perspective floor grid */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`h${i}`}
          x1={80 + i * 20} y1={380 - i * 30} x2={420 - i * 20} y2={380 - i * 30}
          stroke="#34d399" strokeWidth={0.5} opacity={0.06 + i * 0.02}
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map(i => {
        const x = 110 + i * 45
        return (
          <line key={`v${i}`}
            x1={x} y1={260} x2={x} y2={380}
            stroke="#34d399" strokeWidth={0.4} opacity={0.07}
          />
        )
      })}
      {/* Scan beam horizontals */}
      {[310, 330, 350].map((y, i) => (
        <line key={`s${i}`} x1={120} y1={y} x2={380} y2={y}
          stroke="#34d399" strokeWidth={0.3} strokeDasharray="6 10" opacity={0.12} />
      ))}
      {/* Corner bracket — top left */}
      <path d="M100 100 L100 130 M100 100 L130 100" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" opacity={0.5} />
      {/* Corner bracket — top right */}
      <path d="M400 100 L400 130 M400 100 L370 100" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" opacity={0.5} />
      {/* Corner bracket — bottom left */}
      <path d="M100 400 L100 370 M100 400 L130 400" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" opacity={0.5} />
      {/* Corner bracket — bottom right */}
      <path d="M400 400 L400 370 M400 400 L370 400" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" opacity={0.5} />
      {/* Center cross */}
      <line x1={230} y1={250} x2={270} y2={250} stroke="#34d399" strokeWidth={0.6} opacity={0.3} />
      <line x1={250} y1={230} x2={250} y2={270} stroke="#34d399" strokeWidth={0.6} opacity={0.3} />
      <circle cx={250} cy={250} r={4} stroke="#34d399" strokeWidth={0.8} opacity={0.25} />
      {/* QR code visual hint — corner */}
      {[0, 1, 2].map(r => (
        [0, 1, 2].map(c => (
          <rect key={`qr-${r}-${c}`}
            x={360 + c * 9} y={340 + r * 9} width={7} height={7} rx={0.5}
            fill="#34d399" opacity={(r + c) % 2 === 0 ? 0.2 : 0.06}
          />
        ))
      ))}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function IQNanoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo('.iqn-word',
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }
    )
    tl.fromTo('.iqn-sub',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    tl.fromTo('.iqn-stat',
      { y: 18, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 },
      '-=0.4'
    )
    tl.fromTo('.iqn-cta',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
    tl.fromTo(droneRef.current,
      { x: 80, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' },
      '-=1.2'
    )
    tl.fromTo('.iqn-hud',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.12 },
      '-=0.3'
    )

    // Scan line loop
    gsap.to('.iqn-scan', {
      top: '100%',
      duration: 2.8,
      ease: 'none',
      repeat: -1,
      delay: 1,
      onRepeat() { gsap.set('.iqn-scan', { top: '0%' }) },
    })

    // Pulsing scan rings
    gsap.to('.iqn-pulse', {
      scale: 1.35,
      opacity: 0,
      duration: 1.8,
      ease: 'power2.out',
      repeat: -1,
      stagger: 0.6,
      delay: 1.5,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="iq-nano-hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
      style={{ paddingTop: 68 }}
    >
      {/* Line grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(52,211,153,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.025) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 88% 88% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.055) 0%, transparent 68%)',
        filter: 'blur(55px)',
        animation: 'iqnOrb1 10s ease-in-out infinite',
      }} />
      <div className="absolute bottom-0 right-1/3 w-[420px] h-[420px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 68%)',
        filter: 'blur(60px)',
        animation: 'iqnOrb2 13s ease-in-out infinite',
      }} />
      <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.04) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'iqnOrb3 8s ease-in-out infinite',
      }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.s,
            background: p.id % 3 === 0 ? '#a78bfa' : p.id % 5 === 0 ? '#fbbf24' : '#34d399',
            opacity: p.op,
            animation: `iqnParticle ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Text ────────────────────────────────────────────────────── */}
          <div className="relative z-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.22)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399', animation: 'iqnBlink 2s ease-in-out infinite' }} />
              <span className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
                Indoor Scanning Drone
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="font-display font-bold text-white mb-6 overflow-hidden"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.4rem)', letterSpacing: '-0.03em', lineHeight: 0.98, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="iqn-word inline-block" style={{ opacity: 0 }}>Zena<span className="text-primary">Drone</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="iqn-word inline-block" style={{ opacity: 0 }}>IQ <span style={{ background: 'linear-gradient(135deg, #34d399, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nano</span></span>
              </span>
            </h1>

            {/* Description */}
            <p className="iqn-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem', maxWidth: 520, opacity: 0 }}>
              Advanced UAV technology specially designed for indoor environments — warehouses, distribution centers, and plants — with seamless QR code and barcode scanning, autonomous docking, and real-time data transmission.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map(s => (
                <div key={s.unit} className="iqn-stat flex flex-col items-center py-3 px-2 rounded-xl text-center" style={{
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
              <Link href="#iq-nano-demo"
                className="iqn-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
                  boxShadow: '0 0 24px rgba(52,211,153,0.35), 0 4px 20px rgba(52,211,153,0.2)',
                  color: '#07070f', fontSize: '0.88rem', opacity: 0,
                }}
              >
                Book A Service
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#iq-nano-overview"
                className="iqn-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', opacity: 0 }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* ── Right: Drone visual ───────────────────────────────────────────── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            {/* Warehouse grid rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[480px] h-[480px] relative flex items-center justify-center">
                <WarehouseGrid />
              </div>
            </div>

            {/* Rotating rings */}
            <div className="absolute w-[430px] h-[430px] rounded-full iqn-ring1" style={{ border: '1px solid rgba(52,211,153,0.08)' }} />
            <div className="absolute w-[330px] h-[330px] rounded-full iqn-ring2" style={{ border: '1px solid rgba(0,212,255,0.06)' }} />

            {/* Pulse rings */}
            <div className="iqn-pulse absolute w-[240px] h-[240px] rounded-full" style={{ border: '1px solid rgba(52,211,153,0.35)', opacity: 0.5 }} />
            <div className="iqn-pulse absolute w-[240px] h-[240px] rounded-full" style={{ border: '1px solid rgba(52,211,153,0.25)', opacity: 0.3 }} />

            {/* Center glow */}
            <div className="absolute w-[240px] h-[240px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.07) 0%, transparent 70%)',
              animation: 'iqnGlow 3.5s ease-in-out infinite',
            }} />

            {/* Drone image */}
            <div className="relative z-10 w-[600px] h-[600px]" style={{ animation: 'iqnFloat 4.5s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-4 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(52,211,153,0.2) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'iqnShadow 4.5s ease-in-out infinite',
              }} />
              <Image
                src="/images/IQ-nano-logo.png"
                alt="ZenaDrone IQ Nano indoor scanning drone"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 18px 55px rgba(52,211,153,0.22)) drop-shadow(0 0 25px rgba(52,211,153,0.12))' }}
                priority
              />
              {/* Scan line */}
              <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 0, bottom: 0, pointerEvents: 'none' }}>
                <div className="iqn-scan absolute left-0 right-0 h-[2px]" style={{
                  top: '0%',
                  background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.55) 30%, rgba(52,211,153,0.88) 50%, rgba(52,211,153,0.55) 70%, transparent)',
                  boxShadow: '0 0 12px rgba(52,211,153,0.45)',
                }} />
              </div>
            </div>

            {/* HUD badges */}
            <div className="iqn-hud absolute left-[-10px] top-[20%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(52,211,153,0.25)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399', animation: 'iqnBlink 1.5s ease-in-out infinite' }} />
                <span className="font-mono font-bold tracking-[0.18em] uppercase" style={{ fontSize: '0.8125rem', color: '#34d399' }}>Scanning</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'rgba(52,211,153,0.6)' }}>QR/BAR: ACTIVE</span>
            </div>

            <div className="iqn-hud absolute right-[-10px] top-1/3 px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
                <div>NAV: <span className="text-white">GPS-FREE</span></div>
                <div>FLT: <span className="text-white">~20 min</span></div>
                <div>OBS: <span className="text-white">AVOID ON</span></div>
              </div>
            </div>

            <div className="iqn-hud absolute right-[8%] bottom-[18%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(251,191,36,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
                <div>DOCK: <span className="text-white">AUTO</span></div>
                <div>SAP: <span className="text-white">LINKED</span></div>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(52,211,153,0.7), transparent)', animation: 'iqnBlink 2s ease-in-out infinite' }} />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)',
      }} />

      <style>{`
        .iqn-ring1 { animation: iqnSpin 22s linear infinite; }
        .iqn-ring2 { animation: iqnSpin 16s linear infinite reverse; }

        @keyframes iqnSpin       { to { transform: rotate(360deg); } }
        @keyframes iqnFloat      { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes iqnShadow     { 0%,100% { opacity: 0.5; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.25; transform: translateX(-50%) scaleX(0.72); } }
        @keyframes iqnGlow       { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.12); } }
        @keyframes iqnBlink      { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        @keyframes iqnParticle   { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
        @keyframes iqnOrb1       { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(25px,-16px) scale(1.06); } }
        @keyframes iqnOrb2       { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-18px,14px) scale(0.96); } }
        @keyframes iqnOrb3       { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(12px,-22px) scale(1.08); } }
      `}</style>
    </section>
  )
}
