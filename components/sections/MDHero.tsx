'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 53.1) % 100).toFixed(2)),
  y:  parseFloat(((i * 67.9) % 100).toFixed(2)),
  s:  0.8 + (i % 5) * 0.32,
  d:  2.2 + (i % 7) * 0.85,
  dl: parseFloat(((i * 0.19) % 5).toFixed(2)),
  op: parseFloat((0.03 + (i % 6) * 0.03).toFixed(2)),
}))

const STATS = [
  { value: '1hr',  unit: 'FLIGHT TIME'        },
  { value: 'VTOL', unit: 'RAPID DEPLOYMENT'   },
  { value: 'AI',   unit: 'DRIVEN AWARENESS'   },
  { value: '24/7', unit: 'CONTINUOUS OPS'     },
]

function TacticalHUDSVG() {
  const targets = [
    { cx: 190, cy: 205, r: 7,   label: 'TGT-01', status: 'TRACKED',  delay: 0    },
    { cx: 320, cy: 185, r: 6.5, label: 'TGT-02', status: 'TRACKED',  delay: 0.45 },
    { cx: 365, cy: 295, r: 8,   label: 'TGT-03', status: 'SCANNING', delay: 0.85 },
    { cx: 225, cy: 335, r: 6,   label: 'TGT-04', status: 'LOCKED',   delay: 1.25 },
    { cx: 155, cy: 310, r: 5.5, label: 'TGT-05', status: 'TRACKED',  delay: 1.65 },
  ]

  return (
    <svg viewBox="0 0 520 520" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Outer targeting ring + ticks */}
      <circle cx={260} cy={260} r={224} stroke="#00d4ff" strokeWidth={0.8} opacity={0.12} />
      {Array.from({ length: 36 }).map((_, k) => {
        const a   = (k * 10 - 90) * Math.PI / 180
        const len = k % 9 === 0 ? 18 : k % 3 === 0 ? 10 : 5
        return (
          <line key={k}
            x1={260 + 224 * Math.cos(a)} y1={260 + 224 * Math.sin(a)}
            x2={260 + (224 - len) * Math.cos(a)} y2={260 + (224 - len) * Math.sin(a)}
            stroke="#00d4ff"
            strokeWidth={k % 9 === 0 ? 1.2 : k % 3 === 0 ? 0.6 : 0.3}
            opacity={k % 9 === 0 ? 0.3 : 0.14}
          />
        )
      })}

      {/* Cardinal labels */}
      {[{a:0,l:'N'},{a:90,l:'E'},{a:180,l:'S'},{a:270,l:'W'}].map(({a,l}) => {
        const rad = (a - 90) * Math.PI / 180
        return <text key={l} x={260 + 210 * Math.cos(rad) - 3} y={260 + 210 * Math.sin(rad) + 3}
          fill="#00d4ff" fontSize="7.5" fontFamily="monospace" opacity={0.4}>{l}</text>
      })}

      {/* Inner scan rings */}
      {[185, 148, 110, 72].map((r, i) => (
        <circle key={r} cx={260} cy={260} r={r}
          stroke="#00d4ff" strokeWidth={0.45}
          strokeDasharray={i % 2 === 0 ? '4 9' : '2 13'}
          opacity={0.09 - i * 0.015}
        />
      ))}

      {/* Tactical grid */}
      {[-3,-2,-1,0,1,2,3].map(n => (
        <line key={`h${n}`} x1={55} y1={260 + n * 54} x2={465} y2={260 + n * 54}
          stroke="#00d4ff" strokeWidth={0.22} opacity={0.05} />
      ))}
      {[-3,-2,-1,0,1,2,3].map(n => (
        <line key={`v${n}`} x1={260 + n * 54} y1={55} x2={260 + n * 54} y2={465}
          stroke="#00d4ff" strokeWidth={0.22} opacity={0.05} />
      ))}

      {/* Crosshairs */}
      <line x1={48} y1={260} x2={472} y2={260} stroke="#00d4ff" strokeWidth={0.5} opacity={0.1} />
      <line x1={260} y1={48} x2={260} y2={472} stroke="#00d4ff" strokeWidth={0.5} opacity={0.1} />
      {/* Reticle */}
      <circle cx={260} cy={260} r={18} stroke="#00d4ff" strokeWidth={0.7} opacity={0.25} />
      <circle cx={260} cy={260} r={5}  stroke="#00d4ff" strokeWidth={0.9} opacity={0.35} />
      <circle cx={260} cy={260} r={1.8} fill="#00d4ff" opacity={0.7} />
      <line x1={242} y1={260} x2={253} y2={260} stroke="#00d4ff" strokeWidth={0.8} opacity={0.5} />
      <line x1={267} y1={260} x2={278} y2={260} stroke="#00d4ff" strokeWidth={0.8} opacity={0.5} />
      <line x1={260} y1={242} x2={260} y2={253} stroke="#00d4ff" strokeWidth={0.8} opacity={0.5} />
      <line x1={260} y1={267} x2={260} y2={278} stroke="#00d4ff" strokeWidth={0.8} opacity={0.5} />

      {/* Corner L-brackets */}
      <path d="M 95 95 L 95 122 M 95 95 L 122 95"    stroke="#00d4ff" strokeWidth={2.2} opacity={0.5} strokeLinecap="round" />
      <path d="M 425 95 L 425 122 M 425 95 L 398 95"  stroke="#00d4ff" strokeWidth={2.2} opacity={0.5} strokeLinecap="round" />
      <path d="M 95 425 L 95 398 M 95 425 L 122 425"  stroke="#00d4ff" strokeWidth={2.2} opacity={0.5} strokeLinecap="round" />
      <path d="M 425 425 L 425 398 M 425 425 L 398 425" stroke="#00d4ff" strokeWidth={2.2} opacity={0.5} strokeLinecap="round" />

      {/* Flight path arc */}
      <path d="M 120 360 Q 190 180 340 200 Q 400 210 390 310"
        stroke="#00d4ff" strokeWidth={0.9} strokeDasharray="6 6" opacity={0.2} />
      {/* Waypoints */}
      {[[120,360],[230,232],[340,200],[390,310]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={3.5} stroke="#00d4ff" strokeWidth={0.9} opacity={0.4} />
      ))}

      {/* Sweep arm */}
      <line x1={260} y1={260} x2={260} y2={38}
        stroke="url(#mdSweepGrad)" strokeWidth={1.5}
        className="md-sweep" style={{ transformOrigin: '260px 260px' }} />

      <defs>
        <linearGradient id="mdSweepGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity={0} />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.45} />
        </linearGradient>
      </defs>

      {/* Target markers */}
      {targets.map((t, i) => (
        <g key={i}>
          {/* Outer pulse */}
          <circle cx={t.cx} cy={t.cy} r={t.r * 2.6} fill="#00d4ff" opacity={0.05}
            style={{ animation: `mdPulse ${1.5 + i * 0.22}s ease-in-out ${t.delay}s infinite` }} />
          <circle cx={t.cx} cy={t.cy} r={t.r * 1.5} fill="#00d4ff" opacity={0.12}
            style={{ animation: `mdPulse ${1.5 + i * 0.22}s ease-in-out ${t.delay + 0.2}s infinite` }} />
          {/* Diamond reticle */}
          <path d={`M ${t.cx} ${t.cy - t.r * 1.2} L ${t.cx + t.r * 1.2} ${t.cy} L ${t.cx} ${t.cy + t.r * 1.2} L ${t.cx - t.r * 1.2} ${t.cy} Z`}
            stroke="#00d4ff" strokeWidth={0.7} opacity={0.6} />
          <circle cx={t.cx} cy={t.cy} r={t.r * 0.45} fill="#00d4ff" opacity={0.85} />
          {/* Label */}
          <text x={t.cx + t.r + 5} y={t.cy - t.r - 2}
            fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.6}>{t.label}</text>
          <text x={t.cx + t.r + 5} y={t.cy - t.r + 6}
            fill="#fff" fontSize="5.5" fontFamily="monospace" opacity={0.4}>{t.status}</text>
        </g>
      ))}

      {/* HUD labels */}
      <text x={102} y={87}  fill="#00d4ff" fontSize="7.5" fontFamily="monospace" opacity={0.5} letterSpacing="2.5">ISR MISSION ACTIVE</text>
      <text x={102} y={440} fill="#00d4ff" fontSize="7"   fontFamily="monospace" opacity={0.35} letterSpacing="1.2">ZenaDrone TACTICAL v5.0 — ENCRYPTED</text>
      <circle cx={416} cy={436} r={3} fill="#00d4ff" style={{ animation: 'mdBlink 1.7s ease-in-out infinite' }} />
      <text x={421} y={440} fill="#00d4ff" fontSize="7" fontFamily="monospace" opacity={0.7} letterSpacing="1.5">LIVE</text>

      {/* Alt/Speed readout */}
      <text x={102} y={100} fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.4} letterSpacing="1.2">ALT: 120m  SPEED: 18m/s  HDG: 047°</text>
    </svg>
  )
}

export function MDHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo('.md-word',
      { y: 100, opacity: 0, rotateX: -50 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.0, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.md-sub',  { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, ease: 'power3.out' }, '-=0.55')
    tl.fromTo('.md-stat', { y: 22, opacity: 0, scale: 0.86 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)', stagger: 0.08 }, '-=0.45')
    tl.fromTo('.md-cta',  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
    tl.fromTo(droneRef.current, { x: 90, opacity: 0, scale: 0.88, filter: 'blur(8px)' }, { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, '-=1.35')
    tl.fromTo('.md-hud',  { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.44, ease: 'back.out(1.5)', stagger: 0.1 }, '-=0.45')
    tl.fromTo('.md-frame-ln', { scaleX: 0 }, { scaleX: 1, duration: 0.65, ease: 'power2.inOut' }, 0.4)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background" style={{ paddingTop: 68 }}>

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 85% 65% at 50% 108%, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.04) 38%, transparent 62%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 45% 55% at 74% 46%, rgba(0,212,255,0.052) 0%, transparent 58%)',
      }} />

      {/* Scan grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.022) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)',
      }} />

      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ top: '28%', left: '12%', width: 680, height: 680, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.055) 0%, transparent 68%)', filter: 'blur(52px)', borderRadius: '50%', animation: 'mdOrb1 12s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '18%', right: '20%', width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 68%)', filter: 'blur(56px)', borderRadius: '50%', animation: 'mdOrb2 9s ease-in-out infinite' }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
            background: '#00d4ff', opacity: p.op,
            animation: `mdFloat ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* ── Left ── */}
          <div className="relative z-10">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'mdBlink 1.6s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.14em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>Live</span>
              </div>
              <div className="w-px h-3 flex-shrink-0" style={{ background: 'rgba(0,212,255,0.35)' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>Autonomous Defense Intelligence</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="md-word inline-block" style={{ opacity: 0 }}>Military</span>
              </span>
              <span className="block overflow-hidden">
                <span className="md-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, #ffffff 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Drone</span>
                  {' '}Industry
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="md-word inline-block" style={{ opacity: 0 }}>ZenaDrone 1000</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="md-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.05rem', maxWidth: 480, opacity: 0, lineHeight: 1.72 }}
            >
              A force multiplier designed for modern military applications. ZenaDrone 1000 transforms missions — enhancing precision, reducing personnel risk, and enabling real-time situational awareness across defense operations.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.13)', paddingTop: '1.2rem' }}>
              {STATS.map(s => (
                <div key={s.unit} className="md-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.95rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.57rem', lineHeight: 1.4 }}>{s.unit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="md-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.38), 0 4px 20px rgba(0,212,255,0.18)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#why"
                className="md-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M8 3L8 13M3 8L8 13L13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>

          {/* ── Right: Tactical HUD ── */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            <div className="md-frame-ln absolute top-[5%] left-[8%] right-[8%] h-px origin-left" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), rgba(0,212,255,0.14), transparent)' }} />
            <div className="md-frame-ln absolute bottom-[5%] left-[8%] right-[8%] h-px origin-left" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), rgba(0,212,255,0.14), transparent)' }} />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative" style={{ width: 520, height: 520 }}><TacticalHUDSVG /></div>
            </div>

            <div className="absolute rounded-full md-ring1" style={{ width: 458, height: 458, border: '1px solid rgba(0,212,255,0.09)' }} />
            <div className="absolute rounded-full md-ring2" style={{ width: 352, height: 352, border: '1px dashed rgba(0,212,255,0.06)' }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: 260, height: 260, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 70%)', animation: 'mdGlow 4s ease-in-out infinite' }} />

            {/* Drone */}
            <div className="relative z-10" style={{ width: 540, height: 540, animation: 'mdFloat2 4.8s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 176, height: 22, background: 'radial-gradient(ellipse, rgba(0,212,255,0.25) 0%, transparent 70%)', filter: 'blur(8px)', animation: 'mdShadow 4.8s ease-in-out infinite' }} />
              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone 1000 military operations"
                fill className="object-contain"
                style={{ filter: 'drop-shadow(0 24px 70px rgba(0,212,255,0.25)) drop-shadow(0 0 40px rgba(0,212,255,0.16)) drop-shadow(0 0 12px rgba(0,212,255,0.1))' }}
                priority
              />
            </div>

            {/* HUD — top-left: ISR status */}
            <div className="md-hud absolute left-0 top-[14%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 136 }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'mdBlink 1.5s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>ISR Active</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>MODE: <span className="text-white">RECON</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>TGT: <span className="text-white">5 TRACKED</span></div>
              </div>
            </div>

            {/* HUD — top-right: Threat */}
            <div className="md-hud absolute right-0 top-[22%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.25)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 136 }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'mdBlink 2s ease-in-out 0.4s infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>Threat Intel</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>ZONE: <span className="text-white">SECURED</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>AI: <span className="text-white">ANALYZING</span></div>
              </div>
            </div>

            {/* HUD — bottom-left: Flight data */}
            <div className="md-hud absolute left-[2%] bottom-[14%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.22)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 136 }}>
              <div className="font-mono font-bold uppercase tracking-[0.15em] mb-2" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>Flight Data</div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>ALT: <span className="text-white">120m</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>BATTERY: <span className="text-white">87%</span></div>
              </div>
            </div>

            {/* HUD — bottom-right: Comms */}
            <div className="md-hud absolute right-[2%] bottom-[20%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.22)', backdropFilter: 'blur(16px)', opacity: 0 }}>
              <div className="font-mono font-bold uppercase tracking-[0.15em] mb-2" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>Comms Link</div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>ENC: <span className="text-white">AES-256</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>SIGNAL: <span className="text-white">STRONG</span></div>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'mdBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        .md-ring1 { animation: mdSpin 22s linear infinite; }
        .md-ring2 { animation: mdSpin 15s linear infinite reverse; }
        .md-sweep { animation: mdSpin 5s linear infinite; }
        @keyframes mdSpin   { to { transform: rotate(360deg); } }
        @keyframes mdFloat  { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-12px) scale(1.2); } }
        @keyframes mdFloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes mdShadow { 0%,100% { opacity:.55; transform:translateX(-50%) scaleX(1); } 50% { opacity:.2; transform:translateX(-50%) scaleX(.7); } }
        @keyframes mdGlow   { 0%,100% { opacity:.4; transform:scale(1); } 50% { opacity:.9; transform:scale(1.16); } }
        @keyframes mdBlink  { 0%,100% { opacity:.28; } 50% { opacity:1; } }
        @keyframes mdPulse  { 0%,100% { opacity:.06; } 50% { opacity:.35; } }
        @keyframes mdOrb1   { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(26px,-22px) scale(1.06); } }
        @keyframes mdOrb2   { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-22px,18px) scale(.93); } }
      `}</style>
    </section>
  )
}
