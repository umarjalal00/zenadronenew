'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 47.3) % 100).toFixed(2)),
  y:  parseFloat(((i * 63.7) % 100).toFixed(2)),
  s:  0.9 + (i % 4) * 0.4,
  d:  2.2 + (i % 6) * 0.85,
  dl: parseFloat(((i * 0.19) % 5).toFixed(2)),
  op: parseFloat((0.04 + (i % 5) * 0.04).toFixed(2)),
}))

const STATS = [
  { value: '360°', unit: 'COVERAGE'       },
  { value: '24/7', unit: 'MONITORING'     },
  { value: '5×',   unit: 'FASTER RESPONSE'},
  { value: '100%', unit: 'PERIMETER AWARE'},
]

function SurveillanceSVG() {
  const targets = [
    { cx: 160, cy: 190, label: 'TRACKING', delay: 0   },
    { cx: 320, cy: 175, label: 'LOCKED',   delay: 0.5 },
    { cx: 380, cy: 255, label: 'THERMAL',  delay: 0.9 },
    { cx: 245, cy: 325, label: 'PATROL',   delay: 1.3 },
    { cx: 125, cy: 315, label: 'ZONE A',   delay: 1.7 },
  ]

  return (
    <svg viewBox="0 0 520 520" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Outer ring with tick marks */}
      <circle cx={260} cy={260} r={224} stroke="#00d4ff" strokeWidth={0.8} opacity={0.12} />
      {Array.from({ length: 36 }).map((_, k) => {
        const a   = (k * 10 - 90) * Math.PI / 180
        const len = k % 9 === 0 ? 16 : k % 3 === 0 ? 9 : 5
        return (
          <line key={k}
            x1={260 + 224 * Math.cos(a)} y1={260 + 224 * Math.sin(a)}
            x2={260 + (224 - len) * Math.cos(a)} y2={260 + (224 - len) * Math.sin(a)}
            stroke="#00d4ff" strokeWidth={k % 9 === 0 ? 1.1 : k % 3 === 0 ? 0.55 : 0.3}
            opacity={k % 9 === 0 ? 0.28 : 0.14}
          />
        )
      })}

      {/* Scan rings */}
      {[185, 148, 110, 72].map((r, i) => (
        <circle key={r} cx={260} cy={260} r={r}
          stroke="#00d4ff" strokeWidth={0.45}
          strokeDasharray={i % 2 === 0 ? '4 9' : '2 13'}
          opacity={0.1 - i * 0.015}
        />
      ))}

      {/* Grid lines */}
      {[-3,-2,-1,0,1,2,3].map(n => (
        <line key={`h${n}`} x1={55} y1={260 + n * 54} x2={465} y2={260 + n * 54} stroke="#00d4ff" strokeWidth={0.22} opacity={0.05} />
      ))}
      {[-3,-2,-1,0,1,2,3].map(n => (
        <line key={`v${n}`} x1={260 + n * 54} y1={55} x2={260 + n * 54} y2={465} stroke="#00d4ff" strokeWidth={0.22} opacity={0.05} />
      ))}

      {/* Crosshairs */}
      <line x1={48}  y1={260} x2={472} y2={260} stroke="#00d4ff" strokeWidth={0.45} opacity={0.09} />
      <line x1={260} y1={48}  x2={260} y2={472} stroke="#00d4ff" strokeWidth={0.45} opacity={0.09} />
      <circle cx={260} cy={260} r={2.5} stroke="#00d4ff" strokeWidth={0.8}  opacity={0.25} />
      <circle cx={260} cy={260} r={6}   stroke="#00d4ff" strokeWidth={0.4}  strokeDasharray="2 4" opacity={0.18} />

      {/* Corner L-brackets */}
      <path d="M 95 95 L 95 122 M 95 95 L 122 95"     stroke="#00d4ff" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
      <path d="M 425 95 L 425 122 M 425 95 L 398 95"   stroke="#00d4ff" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
      <path d="M 95 425 L 95 398 M 95 425 L 122 425"   stroke="#00d4ff" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
      <path d="M 425 425 L 425 398 M 425 425 L 398 425" stroke="#00d4ff" strokeWidth={2} opacity={0.5} strokeLinecap="round" />

      {/* Sweep arm */}
      <line x1={260} y1={260} x2={260} y2={38}
        stroke="url(#ssSweepGrad)" strokeWidth={1.4}
        className="ss-sweep" style={{ transformOrigin: '260px 260px' }} />

      <defs>
        <linearGradient id="ssSweepGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#00d4ff" stopOpacity={0} />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.4} />
        </linearGradient>
      </defs>

      {/* Target detection boxes */}
      {targets.map((t, i) => (
        <g key={i}>
          <rect x={t.cx - 14} y={t.cy - 14} width={28} height={28}
            stroke="#00d4ff" strokeWidth={0.7} opacity={0.15}
            style={{ animation: `ssPulse ${1.4 + i * 0.2}s ease-in-out ${t.delay}s infinite` }} />
          <path d={`M${t.cx-14} ${t.cy-8} L${t.cx-14} ${t.cy-14} L${t.cx-8} ${t.cy-14}`}
            stroke="#00d4ff" strokeWidth={1.2} opacity={0.75} strokeLinecap="round" />
          <path d={`M${t.cx+8} ${t.cy-14} L${t.cx+14} ${t.cy-14} L${t.cx+14} ${t.cy-8}`}
            stroke="#00d4ff" strokeWidth={1.2} opacity={0.75} strokeLinecap="round" />
          <path d={`M${t.cx-14} ${t.cy+8} L${t.cx-14} ${t.cy+14} L${t.cx-8} ${t.cy+14}`}
            stroke="#00d4ff" strokeWidth={1.2} opacity={0.75} strokeLinecap="round" />
          <path d={`M${t.cx+8} ${t.cy+14} L${t.cx+14} ${t.cy+14} L${t.cx+14} ${t.cy+8}`}
            stroke="#00d4ff" strokeWidth={1.2} opacity={0.75} strokeLinecap="round" />
          <circle cx={t.cx} cy={t.cy} r={2.2} fill="#00d4ff" opacity={0.85} />
          <text x={t.cx + 18} y={t.cy - 10}
            fill="#00d4ff" fontSize="6.5" fontFamily="monospace" opacity={0.6}>{t.label}</text>
        </g>
      ))}

      {/* HUD labels */}
      <text x={102} y={87}  fill="#00d4ff" fontSize="7.5" fontFamily="monospace" opacity={0.5}  letterSpacing="2.5">SURVEILLANCE ACTIVE</text>
      <text x={102} y={440} fill="#00d4ff" fontSize="7"   fontFamily="monospace" opacity={0.35} letterSpacing="1.2">ZenaDrone AI Vision v3.2 — ENCRYPTED</text>
      <circle cx={416} cy={436} r={3} fill="#00d4ff" style={{ animation: 'ssBlink 1.7s ease-in-out infinite' }} />
      <text x={421} y={440} fill="#00d4ff" fontSize="7" fontFamily="monospace" opacity={0.7} letterSpacing="1.5">LIVE</text>
    </svg>
  )
}

export function SSHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo('.ss-word',
      { y: 100, opacity: 0, rotateX: -50 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.0, ease: 'power4.out', stagger: 0.07 }
    )
    tl.fromTo('.ss-sub',  { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, ease: 'power3.out' }, '-=0.55')
    tl.fromTo('.ss-stat', { y: 22, opacity: 0, scale: 0.86 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)', stagger: 0.08 }, '-=0.45')
    tl.fromTo('.ss-cta',  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
    tl.fromTo(droneRef.current, { x: 90, opacity: 0, scale: 0.88, filter: 'blur(8px)' }, { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, '-=1.35')
    tl.fromTo('.ss-hud',  { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.44, ease: 'back.out(1.5)', stagger: 0.1 }, '-=0.45')
    tl.fromTo('.ss-frame-ln', { scaleX: 0 }, { scaleX: 1, duration: 0.65, ease: 'power2.inOut' }, 0.4)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden bg-background" style={{ paddingTop: 68 }}>

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 85% 65% at 50% 108%, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.04) 38%, transparent 62%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 45% 55% at 74% 46%, rgba(0,212,255,0.055) 0%, transparent 58%)',
      }} />

      {/* Scan grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.022) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 25%, transparent 100%)',
      }} />

      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ top: '28%', left: '12%', width: 680, height: 680, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.055) 0%, transparent 68%)', filter: 'blur(52px)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '18%', right: '20%', width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.035) 0%, transparent 68%)', filter: 'blur(56px)', borderRadius: '50%' }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
            background: '#00d4ff', opacity: p.op,
            animation: `ssFloat ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-10 xl:gap-16 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* Left: Content */}
          <div className="relative z-10">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'ssBlink 1.6s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.14em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>Live</span>
              </div>
              <div className="w-px h-3 flex-shrink-0" style={{ background: 'rgba(0,212,255,0.35)' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>Aerial Surveillance Intelligence</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.7rem, 6.5vw, 5.2rem)', letterSpacing: '-0.03em', lineHeight: 0.96, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="ss-word inline-block" style={{ opacity: 0 }}>Security</span>
              </span>
              <span className="block overflow-hidden">
                <span className="ss-word inline-block" style={{ opacity: 0 }}>
                  <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, #0099cc 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>& Surveillance</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="ss-word inline-block" style={{ opacity: 0 }}>Drones</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="ss-sub font-sans text-text-muted leading-relaxed mb-9"
              style={{ fontSize: '1.1rem', maxWidth: 480, opacity: 0, lineHeight: 1.72 }}
            >
              Whether it&apos;s GPS tracking, camera observation, or stake-outs, ZenaDrone surveillance UAVs are among the most powerful aerial monitoring tools available — flying where ground teams cannot reach.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-4 mb-9" style={{ borderTop: '1px solid rgba(0,212,255,0.13)', paddingTop: '1.2rem' }}>
              {STATS.map(s => (
                <div key={s.unit} className="ss-stat flex flex-col gap-1" style={{ opacity: 0 }}>
                  <span className="font-display font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#00d4ff', lineHeight: 1, letterSpacing: '-0.035em' }}>{s.value}</span>
                  <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.58rem', lineHeight: 1.4 }}>{s.unit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#book-demo"
                className="ss-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0097b8 100%)', boxShadow: '0 0 26px rgba(0,212,255,0.38), 0 4px 20px rgba(0,212,255,0.18)', color: '#07070f', fontSize: '0.9rem', opacity: 0 }}
              >
                Book A Service
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="#what"
                className="ss-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.11)', fontSize: '0.9rem', opacity: 0 }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M8 3L8 13M3 8L8 13L13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>

          {/* Right: HUD Visual */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>

            <div className="ss-frame-ln absolute top-[5%] left-[8%] right-[8%] h-px origin-left" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), rgba(0,212,255,0.14), transparent)' }} />
            <div className="ss-frame-ln absolute bottom-[5%] left-[8%] right-[8%] h-px origin-left" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), rgba(0,212,255,0.14), transparent)' }} />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative" style={{ width: 520, height: 520 }}><SurveillanceSVG /></div>
            </div>

            <div className="absolute rounded-full ss-ring1" style={{ width: 458, height: 458, border: '1px solid rgba(0,212,255,0.09)' }} />
            <div className="absolute rounded-full ss-ring2" style={{ width: 352, height: 352, border: '1px dashed rgba(0,212,255,0.06)' }} />
            <div className="absolute rounded-full pointer-events-none" style={{ width: 260, height: 260, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)', animation: 'ssGlow 4s ease-in-out infinite' }} />

            {/* Drone */}
            <div className="relative z-10" style={{ width: 540, height: 540, animation: 'ssFloat2 4.8s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 176, height: 22, background: 'radial-gradient(ellipse, rgba(0,212,255,0.28) 0%, transparent 70%)', filter: 'blur(8px)', animation: 'ssShadow 4.8s ease-in-out infinite' }} />
              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone security and surveillance UAV"
                fill className="object-contain"
                style={{ filter: 'drop-shadow(0 24px 70px rgba(0,212,255,0.25)) drop-shadow(0 0 38px rgba(0,212,255,0.15))' }}
                priority
              />
            </div>

            {/* HUD — top-left: Camera */}
            <div className="ss-hud absolute left-0 top-[14%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 130 }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'ssBlink 1.5s ease-in-out infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>Camera Active</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>MODE: <span className="text-white">4K HDR</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>ALT: <span className="text-white">120m AGL</span></div>
              </div>
            </div>

            {/* HUD — top-right: AI Detection */}
            <div className="ss-hud absolute right-0 top-[22%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 130 }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'ssBlink 1.9s ease-in-out 0.3s infinite' }} />
                <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>AI Detection</span>
              </div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>TARGETS: <span className="text-white">5</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>STATUS: <span style={{ color: '#00d4ff' }}>LOCKED</span></div>
              </div>
            </div>

            {/* HUD — bottom-left: Thermal */}
            <div className="ss-hud absolute left-[2%] bottom-[14%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.25)', backdropFilter: 'blur(16px)', opacity: 0, minWidth: 130 }}>
              <div className="font-mono font-bold uppercase tracking-[0.15em] mb-2" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>Thermal</div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>SENSOR: <span className="text-white">IR ON</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>NIGHT: <span style={{ color: '#00d4ff' }}>ENABLED</span></div>
              </div>
            </div>

            {/* HUD — bottom-right: Perimeter */}
            <div className="ss-hud absolute right-[2%] bottom-[20%] px-3.5 py-3 rounded-xl" style={{ background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.25)', backdropFilter: 'blur(16px)', opacity: 0 }}>
              <div className="font-mono font-bold uppercase tracking-[0.15em] mb-2" style={{ fontSize: '0.64rem', color: '#00d4ff' }}>Perimeter</div>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.67rem' }}>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>ZONE: <span className="text-white">ALPHA</span></div>
                <div style={{ color: 'rgba(0,212,255,0.6)' }}>BREACH: <span className="text-white">NONE</span></div>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'ssBlink 2.2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)' }} />

      <style>{`
        .ss-ring1 { animation: ssSpin 22s linear infinite; }
        .ss-ring2 { animation: ssSpin 15s linear infinite reverse; }
        .ss-sweep { animation: ssSpin 5s linear infinite; }
        @keyframes ssSpin   { to { transform: rotate(360deg); } }
        @keyframes ssFloat  { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-12px) scale(1.2); } }
        @keyframes ssFloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes ssShadow { 0%,100% { opacity:.55; transform:translateX(-50%) scaleX(1); } 50% { opacity:.2; transform:translateX(-50%) scaleX(.7); } }
        @keyframes ssGlow   { 0%,100% { opacity:.4; transform:scale(1); } 50% { opacity:.9; transform:scale(1.16); } }
        @keyframes ssBlink  { 0%,100% { opacity:.28; } 50% { opacity:1; } }
        @keyframes ssPulse  { 0%,100% { opacity:.06; } 50% { opacity:.32; } }
      `}</style>
    </section>
  )
}
