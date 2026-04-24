'use client'

import { useRef }  from 'react'
import Image       from 'next/image'
import Link        from 'next/link'
import { motion }  from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const PARTICLES = Array.from({ length: 52 }, (_, i) => ({
  id: i,
  x:  parseFloat(((i * 41.7) % 100).toFixed(2)),
  y:  parseFloat(((i * 67.3) % 100).toFixed(2)),
  s:  1 + (i % 3) * 0.55,
  d:  3 + (i % 5),
  dl: parseFloat(((i * 0.19) % 4).toFixed(2)),
  op: parseFloat((0.12 + (i % 4) * 0.08).toFixed(2)),
}))

const STATS = [
  { value: '70%',  unit: 'FASTER',    color: '#00d4ff' },
  { value: '99%',  unit: 'ACCURATE',  color: '#a78bfa' },
  { value: '24/7', unit: 'REAL-TIME', color: '#34d399' },
  { value: '∞',    unit: 'SCALABLE',  color: '#fbbf24' },
]

function NetworkSVG() {
  const nodes = [0, 60, 120, 180, 240, 300].map(deg => {
    const r = (deg - 90) * Math.PI / 180
    return { x: 250 + 178 * Math.cos(r), y: 250 + 178 * Math.sin(r) }
  })
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full pointer-events-none edc-nodes">
      {[210, 170, 128, 85].map((r, i) => (
        <circle key={r} cx={250} cy={250} r={r}
          stroke="#00d4ff" strokeWidth={i === 0 ? 0.45 : 0.3}
          strokeDasharray={i % 2 === 0 ? '6 9' : '2 12'}
          opacity={0.12 - i * 0.02}
        />
      ))}
      {nodes.map((n, i) => (
        <line key={i} x1={250} y1={250} x2={n.x} y2={n.y}
          stroke="#00d4ff" strokeWidth={0.45} opacity={0.18}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`nd${i}`} cx={n.x} cy={n.y} r={4.5}
          fill="#00d4ff" opacity={0.35}
          style={{ animation: `edcNodePulse ${2 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` }}
        />
      ))}
      <line x1={50} y1={250} x2={450} y2={250} stroke="#00d4ff" strokeWidth={0.3} opacity={0.06} />
      <line x1={250} y1={50} x2={250} y2={450} stroke="#00d4ff" strokeWidth={0.3} opacity={0.06} />
      <line x1={250} y1={250} x2={250} y2={40} stroke="#00d4ff" strokeWidth={0.9} opacity={0.28}
        className="edc-sweep" style={{ transformOrigin: '250px 250px' }} />
    </svg>
  )
}

export function EDCHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const droneRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo('.edc-word',
      { y: 90, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.95, ease: 'power4.out', stagger: 0.09 }
    )
    tl.fromTo('.edc-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5'
    )
    tl.fromTo('.edc-stat',
      { y: 20, opacity: 0, scale: 0.88 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)', stagger: 0.07 }, '-=0.4'
    )
    tl.fromTo('.edc-cta',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.3'
    )
    tl.fromTo(droneRef.current,
      { x: 80, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' }, '-=1.2'
    )
    tl.fromTo('.edc-hud',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.12 }, '-=0.3'
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-background"
      style={{ paddingTop: 68 }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[650px] rounded-full pointer-events-none edc-orb1" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 70%)',
        filter: 'blur(55px)',
      }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none edc-orb2" style={{
        background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.s,
            background: p.id % 4 === 0 ? '#a78bfa' : '#00d4ff',
            opacity: p.op,
            animation: `edcParticle ${p.d}s ease-in-out ${p.dl}s infinite`,
          }} />
        ))}
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center py-20 min-h-[calc(100vh-68px)]">

          {/* Left: Text */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'edcBlink 2s ease-in-out infinite' }} />
              <span className="font-mono text-primary font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem' }}>
                Electronic Data Collection
              </span>
            </motion.div>

            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.4rem)', letterSpacing: '-0.03em', lineHeight: 0.98, perspective: '900px' }}
            >
              <span className="block overflow-hidden">
                <span className="edc-word inline-block" style={{ opacity: 0 }}>Advanced</span>
              </span>
              <span className="block overflow-hidden">
                <span className="edc-word inline-block" style={{ opacity: 0 }}>Drone <span className="text-primary">Data</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="edc-word inline-block" style={{ opacity: 0 }}>Collection</span>
              </span>
            </h1>

            <p className="edc-sub font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.1rem', maxWidth: 500, opacity: 0 }}>
              Fast-paced industries can no longer rely on traditional methods. ZenaDrone data collection solutions allow teams to capture critical insights quickly, safely, and at scale.
            </p>

            <div className="grid grid-cols-4 gap-3 mb-8">
              {STATS.map(s => (
                <div key={s.unit} className="edc-stat flex flex-col items-center py-3 px-2 rounded-xl text-center" style={{
                  background: `${s.color}09`, border: `1px solid ${s.color}22`, opacity: 0,
                }}>
                  <span className="font-display font-bold" style={{ fontSize: '1.4rem', color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </span>
                  <span className="font-mono text-text-muted mt-1 tracking-[0.1em]" style={{ fontSize: '0.62rem' }}>{s.unit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="#contact"
                className="edc-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                  boxShadow: '0 0 24px rgba(0,212,255,0.35), 0 4px 20px rgba(0,212,255,0.2)',
                  color: '#07070f', fontSize: '0.88rem', opacity: 0,
                }}
              >
                Contact Us
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#book-demo"
                className="edc-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', opacity: 0 }}
              >
                Book A Service
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div ref={droneRef} className="relative flex items-center justify-center" style={{ opacity: 0 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[480px] h-[480px] relative">
                <NetworkSVG />
              </div>
            </div>

            <div className="absolute w-[440px] h-[440px] rounded-full edc-ring1" style={{ border: '1px solid rgba(0,212,255,0.1)' }} />
            <div className="absolute w-[340px] h-[340px] rounded-full edc-ring2" style={{ border: '1px solid rgba(0,212,255,0.06)' }} />

            <div className="absolute w-[240px] h-[240px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.09) 0%, transparent 70%)',
              animation: 'edcGlow 3.5s ease-in-out infinite',
            }} />

            <div className="relative z-10 w-[520px] h-[520px]" style={{ animation: 'edcFloat 4.5s ease-in-out infinite' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-5 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(0,212,255,0.25) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'edcShadow 4.5s ease-in-out infinite',
              }} />
              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone electronic data collection UAV"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.25)) drop-shadow(0 0 30px rgba(0,212,255,0.15))' }}
                priority
              />
            </div>

            {/* HUD badges */}
            <div className="edc-hud absolute left-0 top-[22%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(0,212,255,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: 'edcBlink 1.5s ease-in-out infinite' }} />
                <span className="font-mono text-primary font-bold tracking-[0.15em] uppercase" style={{ fontSize: '0.75rem' }}>Data Stream</span>
              </div>
              <span className="font-mono text-primary/60" style={{ fontSize: '0.75rem' }}>ACTIVE: 4K/8K</span>
            </div>

            <div className="edc-hud absolute right-0 top-1/3 px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(167,139,250,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.75rem', color: '#a78bfa' }}>
                <div>LiDAR: <span className="text-white">ON</span></div>
                <div>IR: <span className="text-white">ACTIVE</span></div>
                <div>GPS: <span className="text-white">LOCKED</span></div>
              </div>
            </div>

            <div className="edc-hud absolute right-[8%] bottom-[18%] px-3 py-2.5 rounded-xl" style={{
              background: 'var(--surface-hud)', border: '1px solid rgba(52,211,153,0.22)',
              backdropFilter: 'blur(14px)', opacity: 0,
            }}>
              <div className="font-mono space-y-0.5" style={{ fontSize: '0.75rem', color: '#34d399' }}>
                <div>SECURE: <span className="text-white">YES</span></div>
                <div>SYNC: <span className="text-white">100%</span></div>
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
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), transparent)', animation: 'edcBlink 2s ease-in-out infinite' }} />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgb(var(--color-background)), transparent)',
      }} />

      <style>{`
        .edc-ring1  { animation: edcSpin 20s linear infinite; }
        .edc-ring2  { animation: edcSpin 13s linear infinite reverse; }
        .edc-nodes  { animation: edcSpin 40s linear infinite; }
        .edc-sweep  { animation: edcSpin 5s linear infinite; }
        .edc-orb1   { animation: edcOrb1 9s ease-in-out infinite; }
        .edc-orb2   { animation: edcOrb2 12s ease-in-out infinite; }
        @keyframes edcSpin      { to { transform: rotate(360deg); } }
        @keyframes edcFloat     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes edcShadow    { 0%,100% { opacity:.6; transform:translateX(-50%) scaleX(1); } 50% { opacity:.3; transform:translateX(-50%) scaleX(.75); } }
        @keyframes edcGlow      { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:.9; transform:scale(1.1); } }
        @keyframes edcBlink     { 0%,100% { opacity:.35; } 50% { opacity:1; } }
        @keyframes edcParticle  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes edcOrb1      { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(25px,-20px) scale(1.05); } }
        @keyframes edcOrb2      { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-20px,16px) scale(.96); } }
        @keyframes edcNodePulse { 0%,100% { r:4.5; opacity:.35; } 50% { r:7; opacity:.65; } }
      `}</style>
    </section>
  )
}
