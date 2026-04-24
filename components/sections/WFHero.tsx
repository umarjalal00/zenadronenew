'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const EMBERS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 43.1) % 100).toFixed(2)),
  y:  parseFloat(((i * 71.7) % 100).toFixed(2)),
  s:  0.8 + (i % 5) * 0.35,
  d:  2 + (i % 7) * 0.9,
  dl: parseFloat(((i * 0.17) % 5).toFixed(2)),
  op: parseFloat((0.05 + (i % 6) * 0.04).toFixed(2)),
  color: i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#fbbf24' : '#ef4444',
}))

const STATS = [
  { value: '5×',   unit: 'FASTER DETECTION', color: '#f97316' },
  { value: '360°', unit: 'AERIAL COVERAGE',  color: '#fbbf24' },
  { value: '24/7', unit: 'REAL-TIME INTEL',  color: '#00d4ff' },
  { value: '100%', unit: 'SAFE TEAMS',        color: '#34d399' },
]

function ThermalSVG() {
  const hotspots = [
    { cx: 305, cy: 235, r: 9,   temp: '847°C', color: '#ef4444', delay: 0    },
    { cx: 348, cy: 285, r: 7,   temp: '623°C', color: '#f97316', delay: 0.4  },
    { cx: 288, cy: 322, r: 8.5, temp: '712°C', color: '#ef4444', delay: 0.7  },
    { cx: 226, cy: 305, r: 6,   temp: '538°C', color: '#f97316', delay: 1.0  },
    { cx: 198, cy: 238, r: 5,   temp: '441°C', color: '#fbbf24', delay: 1.3  },
    { cx: 238, cy: 192, r: 5,   temp: '380°C', color: '#fbbf24', delay: 1.6  },
  ]
  // Organic fire-perimeter blob
  const perimeter = 'M 348 268 Q 358 296 342 323 Q 324 352 296 356 Q 267 362 242 346 Q 216 329 206 304 Q 196 277 206 251 Q 218 223 244 210 Q 270 197 300 204 Q 330 212 346 240 Q 356 254 348 268 Z'

  return (
    <svg viewBox="0 0 520 520" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Outer targeting ring + graduation ticks */}
      <circle cx={260} cy={260} r={224} stroke="#f97316" strokeWidth={0.8} opacity={0.14} />
      {Array.from({ length: 36 }).map((_, k) => {
        const a   = (k * 10 - 90) * Math.PI / 180
        const len = k % 9 === 0 ? 16 : k % 3 === 0 ? 9 : 5
        return (
          <line key={k}
            x1={260 + 224 * Math.cos(a)} y1={260 + 224 * Math.sin(a)}
            x2={260 + (224 - len) * Math.cos(a)} y2={260 + (224 - len) * Math.sin(a)}
            stroke="#fbbf24" strokeWidth={k % 9 === 0 ? 1.1 : k % 3 === 0 ? 0.55 : 0.3}
            opacity={k % 9 === 0 ? 0.32 : 0.18}
          />
        )
      })}

      {/* Inner heat rings — warm palette */}
      {[185, 148, 110, 72].map((r, i) => (
        <circle key={r} cx={260} cy={260} r={r}
          stroke={['#f97316','#fbbf24','#ef4444','#f97316'][i]}
          strokeWidth={0.45}
          strokeDasharray={i % 2 === 0 ? '4 9' : '2 13'}
          opacity={0.12 - i * 0.02}
        />
      ))}

      {/* Scan grid */}
      {[-3,-2,-1,0,1,2,3].map(n => (
        <line key={`h${n}`} x1={55} y1={260 + n * 54} x2={465} y2={260 + n * 54}
          stroke="#f97316" strokeWidth={0.22} opacity={0.055} />
      ))}
      {[-3,-2,-1,0,1,2,3].map(n => (
        <line key={`v${n}`} x1={260 + n * 54} y1={55} x2={260 + n * 54} y2={465}
          stroke="#f97316" strokeWidth={0.22} opacity={0.055} />
      ))}

      {/* Crosshairs */}
      <line x1={48} y1={260} x2={472} y2={260} stroke="#f97316" strokeWidth={0.45} opacity={0.1} />
      <line x1={260} y1={48} x2={260} y2={472} stroke="#f97316" strokeWidth={0.45} opacity={0.1} />
      {/* Centre dot */}
      <circle cx={260} cy={260} r={2.5} stroke="#f97316" strokeWidth={0.8} opacity={0.3} />
      <circle cx={260} cy={260} r={6} stroke="#f97316" strokeWidth={0.4} strokeDasharray="2 4" opacity={0.2} />

      {/* Corner L-brackets */}
      <path d="M 95 95 L 95 122 M 95 95 L 122 95"    stroke="#f97316" strokeWidth={2} opacity={0.6} strokeLinecap="round" />
      <path d="M 425 95 L 425 122 M 425 95 L 398 95"  stroke="#f97316" strokeWidth={2} opacity={0.6} strokeLinecap="round" />
      <path d="M 95 425 L 95 398 M 95 425 L 122 425"  stroke="#f97316" strokeWidth={2} opacity={0.6} strokeLinecap="round" />
      <path d="M 425 425 L 425 398 M 425 425 L 398 425" stroke="#f97316" strokeWidth={2} opacity={0.6} strokeLinecap="round" />

      {/* Fire spread perimeter */}
      <path d={perimeter} stroke="#ef4444" strokeWidth={1.3} strokeDasharray="5 7" opacity={0.38} fill="rgba(239,68,68,0.055)" />

      {/* Sweep arm */}
      <line x1={260} y1={260} x2={260} y2={38}
        stroke="url(#sweepGrad)" strokeWidth={1.4}
        className="wf-sweep" style={{ transformOrigin: '260px 260px' }} />
      {/* Sweep ghost trail */}
      <line x1={260} y1={260} x2={243} y2={40}
        stroke="#f97316" strokeWidth={0.5} opacity={0.1}
        style={{ transformOrigin: '260px 260px', animation: 'wfSpin 5s linear -0.55s infinite' }} />

      {/* Gradient for sweep */}
      <defs>
        <linearGradient id="sweepGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f97316" stopOpacity={0} />
          <stop offset="100%" stopColor="#f97316" stopOpacity={0.45} />
        </linearGradient>
      </defs>

      {/* Hotspot markers */}
      {hotspots.map((h, i) => (
        <g key={i}>
          <circle cx={h.cx} cy={h.cy} r={h.r * 2.2} fill={h.color} opacity={0.07}
            style={{ animation: `wfHotPulse ${1.3 + i * 0.22}s ease-in-out ${h.delay}s infinite` }} />
          <circle cx={h.cx} cy={h.cy} r={h.r * 1.3} fill={h.color} opacity={0.18}
            style={{ animation: `wfHotPulse ${1.3 + i * 0.22}s ease-in-out ${h.delay + 0.2}s infinite` }} />
          <circle cx={h.cx} cy={h.cy} r={h.r * 0.48} fill={h.color} opacity={0.9} />
          <text x={h.cx + h.r + 4} y={h.cy - h.r - 2}
            fill={h.color} fontSize="7.5" fontFamily="monospace" opacity={0.65}>{h.temp}</text>
        </g>
      ))}

      {/* HUD overlays */}
      <text x={102} y={87}  fill="#f97316" fontSize="7.8" fontFamily="monospace" opacity={0.55} letterSpacing="2.5">THERMAL IMAGING ACTIVE</text>
      <text x={102} y={440} fill="#f97316" fontSize="7"   fontFamily="monospace" opacity={0.38} letterSpacing="1.2">ZenaDrone IR v3.2 — ENCRYPTED</text>
      {/* LIVE blink */}
      <circle cx={419} cy={436} r={3} fill="#ef4444" style={{ animation: 'wfBlink 1.7s ease-in-out infinite' }} />
      <text x={424} y={440} fill="#ef4444" fontSize="7" fontFamily="monospace" opacity={0.7} letterSpacing="1.5">LIVE</text>
    </svg>
  )
}

export function WFHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo('.wf-word',
      { y: 100, opacity: 0, rotateX: -50 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.0, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.wf-sub',      { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, ease: 'power3.out' }, '-=0.55')
    tl.fromTo('.wf-stat',     { y: 22, opacity: 0, scale: 0.86 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)', stagger: 0.08 }, '-=0.45')
    tl.fromTo('.wf-cta',      { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
    tl.fromTo(droneRef.current, { x: 90, opacity: 0, scale: 0.88, filter: 'blur(8px)' }, { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, '-=1.35')
    tl.fromTo('.wf-hud',      { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.44, ease: 'back.out(1.5)', stagger: 0.1 }, '-=0.45')
    tl.fromTo('.wf-frame-ln', { scaleX: 0 }, { scaleX: 1, duration: 0.65, ease: 'power2.inOut' }, 0.4)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background" style={{ paddingTop: 68 }}>

      {/* Deep ember atmosphere from bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 85% 65% at 50% 108%, rgba(249,115,22,0.13) 0%, rgba(239,68,68,0.06) 38%, transparent 62%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 45% 55% at 74% 46%, rgba(249,115,22,0.065) 0%, transparent 58%)',
      }} />

      {/* Scan grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(249,115,22,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.026) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)',
      }} />

      {/* Ambient orbs */}
      <div className="absolute pointer-events-none wf-orb1" style={{ top: '28%', left: '12%', width: 680, height: 680, background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.065) 0%, transparent 68%)', filter: 'blur(52px)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none wf-orb2" style={{ bottom: '18%', right: '20%', width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.058) 0%, transparent 68%)', filter: 'blur(56px)', borderRadius: '50%' }} />

      {/* Ember particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {EMBERS.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
            background: p.color, opacity: p.op,
            animation: `wfEmber ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left: Content ── */}
          <div className="relative z-10">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.22)' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef4444', animation: 'wfBlink 1.6s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.14em]" style={{ fontSize: '0.72rem', color: '#ef4444' }}>Live</span>
              </div>
              <div className="w-px h-3 flex-shrink-0" style={{ background: 'rgba(249,115,22,0.35)' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#f97316' }}>Aerial Fire Intelligence</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.7rem, 6.5vw, 5.2rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="wf-word inline-block" style={{ opacity: 0 }}>Wildfire Drones</span>
              </span>
              <span className="block overflow-hidden">
                <span className="wf-word inline-block" style={{ opacity: 0 }}>
                  for{' '}
                  <span style={{ background: 'linear-gradient(135deg, #f97316 20%, #fbbf24 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Real-Time</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="wf-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fire</span>
                  {' '}Monitoring
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="wf-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 480, opacity: 0, lineHeight: 1.72 }}
            >
              Wildfires shift direction in minutes. ZenaDrone gives agencies real-time aerial visibility — identifying danger zones earlier and enabling faster, safer response before conditions become critical.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-4 mb-9" style={{ borderTop: '1px solid rgba(249,115,22,0.13)', paddingTop: '1.2rem' }}>
              {STATS.map(s => (
                <div key={s.unit} className="wf-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: s.color, lineHeight: 1, letterSpacing: '-0.035em' }}>{s.value}</span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.58rem', lineHeight: 1.4 }}>{s.unit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="wf-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #dc4f0a 100%)', boxShadow: '0 0 26px rgba(249,115,22,0.42), 0 4px 20px rgba(249,115,22,0.2)', color: '#fff', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Demo
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#how-it-works"
                className="wf-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                See How It Works
                <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M8 3L8 13M3 8L8 13L13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>

          {/* ── Right: Thermal HUD Visual ── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            {/* Camera viewport frame lines */}
            <div className="wf-frame-ln absolute top-[5%] left-[8%] right-[8%] h-px origin-left" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.28), rgba(249,115,22,0.16), transparent)' }} />
            <div className="wf-frame-ln absolute bottom-[5%] left-[8%] right-[8%] h-px origin-left" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.28), rgba(249,115,22,0.16), transparent)' }} />

            {/* Thermal SVG layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative" style={{ width: 520, height: 520 }}><ThermalSVG /></div>
            </div>

            {/* Spinning rings */}
            <div className="absolute rounded-full wf-ring1" style={{ width: 458, height: 458, border: '1px solid rgba(249,115,22,0.1)' }} />
            <div className="absolute rounded-full wf-ring2" style={{ width: 352, height: 352, border: '1px dashed rgba(251,191,36,0.07)' }} />

            {/* Core thermal glow */}
            <div className="absolute rounded-full pointer-events-none" style={{ width: 260, height: 260, background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.1) 0%, transparent 70%)', animation: 'wfGlow 4s ease-in-out infinite' }} />

            {/* Drone */}
            <div className="relative z-10" style={{ width: 540, height: 540, animation: 'wfFloat 4.8s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 176, height: 22, background: 'radial-gradient(ellipse, rgba(249,115,22,0.32) 0%, transparent 70%)', filter: 'blur(8px)', animation: 'wfShadow 4.8s ease-in-out infinite' }} />
              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone wildfire monitoring UAV"
                fill className="object-contain"
                style={{ filter: 'drop-shadow(0 24px 70px rgba(249,115,22,0.3)) drop-shadow(0 0 38px rgba(249,115,22,0.2)) drop-shadow(0 0 10px rgba(251,191,36,0.15))' }}
                priority
              />
            </div>

            {/* HUD — top-left: Thermal status */}
            <div className="wf-hud absolute left-0 top-[14%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(249,115,22,0.3)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 128 }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', animation: 'wfBlink 1.5s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.64rem', color: '#f97316' }}>Thermal Active</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(249,115,22,0.65)' }}>MODE: <span className="text-white">IR SCAN</span></div>
                <div style={{ color: 'rgba(249,115,22,0.65)' }}>PEAK: <span className="text-white">847°C</span></div>
              </div>
            </div>

            {/* HUD — top-right: Fire alert */}
            <div className="wf-hud absolute right-0 top-[22%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(239,68,68,0.3)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 128 }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef4444', animation: 'wfBlink 1.9s ease-in-out 0.3s infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.64rem', color: '#ef4444' }}>Fire Detected</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(239,68,68,0.65)' }}>WIND: <span className="text-white">24 km/h NW</span></div>
                <div style={{ color: 'rgba(239,68,68,0.65)' }}>RISK: <span style={{ color: '#ef4444' }}>CRITICAL</span></div>
              </div>
            </div>

            {/* HUD — bottom-left: Fire perimeter */}
            <div className="wf-hud absolute left-[2%] bottom-[14%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(251,191,36,0.25)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 128 }}>
              <div className="font-mono font-bold uppercase tracking-[0.15em] mb-2" style={{ fontSize: '0.64rem', color: '#fbbf24' }}>Perimeter</div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(251,191,36,0.65)' }}>AREA: <span className="text-white">2.4 km²</span></div>
                <div style={{ color: 'rgba(251,191,36,0.65)' }}>SPREAD: <span style={{ color: '#fbbf24' }}>+12% /hr</span></div>
              </div>
            </div>

            {/* HUD — bottom-right: Team status */}
            <div className="wf-hud absolute right-[2%] bottom-[20%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(52,211,153,0.25)', backdropFilter: 'blur(16px)', opacity: 0 }}>
              <div className="font-mono font-bold uppercase tracking-[0.15em] mb-2" style={{ fontSize: '0.64rem', color: '#34d399' }}>Ground Teams</div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(52,211,153,0.65)' }}>STATUS: <span className="text-white">SAFE</span></div>
                <div style={{ color: 'rgba(52,211,153,0.65)' }}>ZONE: <span className="text-white">CLEARED</span></div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-text-muted tracking-[0.32em] uppercase" style={{ fontSize: '0.82rem' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(249,115,22,0.7), transparent)', animation: 'wfBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        .wf-ring1 { animation: wfSpin 22s linear infinite; }
        .wf-ring2 { animation: wfSpin 15s linear infinite reverse; }
        .wf-sweep { animation: wfSpin 5s linear infinite; }
        @keyframes wfSpin     { to { transform: rotate(360deg); } }
        @keyframes wfFloat    { 0%,100% { transform: translateY(0); }       50% { transform: translateY(-18px); } }
        @keyframes wfShadow   { 0%,100% { opacity:.55; transform:translateX(-50%) scaleX(1); } 50% { opacity:.2; transform:translateX(-50%) scaleX(.7); } }
        @keyframes wfGlow     { 0%,100% { opacity:.45; transform:scale(1); } 50% { opacity:1; transform:scale(1.16); } }
        @keyframes wfBlink    { 0%,100% { opacity:.28; } 50% { opacity:1; } }
        @keyframes wfEmber    { 0%,100% { transform:translateY(0) scale(1); }  50% { transform:translateY(-15px) scale(1.25); } }
        @keyframes wfOrb1     { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(26px,-22px) scale(1.06); } }
        @keyframes wfOrb2     { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-22px,18px) scale(.93); } }
        @keyframes wfHotPulse { 0%,100% { opacity:.1; }  50% { opacity:.42; } }
      `}</style>
    </section>
  )
}
