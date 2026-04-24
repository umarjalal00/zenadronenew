'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { Container }    from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }       from '@/components/animations/FadeIn'
import { useGSAP }      from '@/hooks/useGSAP'
import { gsap }         from '@/lib/gsap'

// ─── Animated radar overlay on drone image ────────────────────────────────────
function DroneRadarOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
      <svg viewBox="0 0 500 500" fill="none" className="absolute inset-0 w-full h-full">
        {/* Radar rings */}
        {[200, 160, 110, 60].map((r, i) => (
          <circle key={r} cx={250} cy={250} r={r}
            stroke="#00d4ff" strokeWidth={0.6}
            strokeDasharray={i % 2 === 0 ? '6 8' : '3 10'}
            opacity={0.09 - i * 0.015}
            className={i % 2 === 0 ? 'zdm-ring-cw' : 'zdm-ring-ccw'}
            style={{ transformOrigin: '250px 250px' }}
          />
        ))}

        {/* Sweep */}
        <defs>
          <radialGradient id="zdm-sweep-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M250 250 L250 52 A198 198 0 0 1 448 250 Z" fill="url(#zdm-sweep-grad)" className="zdm-sweep" style={{ transformOrigin: '250px 250px' }} />
        <line x1={250} y1={250} x2={250} y2={52} stroke="#00d4ff" strokeWidth={1} opacity={0.35} className="zdm-sweep" style={{ transformOrigin: '250px 250px' }} />

        {/* HUD brackets */}
        <path d="M10,30 L10,10 L30,10"   stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />
        <path d="M490,30 L490,10 L470,10" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />
        <path d="M10,470 L10,490 L30,490" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />
        <path d="M490,470 L490,490 L470,490" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />

        {/* Data labels */}
        <text x="16"  y="22"  fill="#00d4ff" fontSize="11" fontFamily="monospace" opacity={0.4}>AI DRONE</text>
        <text x="484" y="22"  fill="#00d4ff" fontSize="11" fontFamily="monospace" opacity={0.4} textAnchor="end">ACTIVE</text>
        <text x="16"  y="485" fill="#00d4ff" fontSize="11" fontFamily="monospace" opacity={0.35}>ML: ON</text>
        <text x="484" y="485" fill="#00d4ff" fontSize="11" fontFamily="monospace" opacity={0.35} textAnchor="end">GPS: LOCK</text>

        {/* Crosshairs */}
        <line x1={50} y1={250} x2={450} y2={250} stroke="#00d4ff" strokeWidth={0.4} opacity={0.07} />
        <line x1={250} y1={50} x2={250} y2={450} stroke="#00d4ff" strokeWidth={0.4} opacity={0.07} />
      </svg>

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-[2px] zdm-scanline" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5) 30%, rgba(0,212,255,0.7) 50%, rgba(0,212,255,0.5) 70%, transparent)',
        boxShadow: '0 0 12px rgba(0,212,255,0.4)',
      }} />
    </div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useGSAP(() => {
    if (!inView || !ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: to,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate() { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix },
    })
  }, { dependencies: [inView] })

  return <span ref={ref}>0{suffix}</span>
}

// ─── Section ──────────────────────────────────────────────────────────────────
const MILESTONES = [
  { label: 'Missions Completed', value: 1200, suffix: '+' },
  { label: 'Industries Served',  value: 18,   suffix: '' },
  { label: 'Countries Deployed', value: 25,   suffix: '+' },
  { label: 'Uptime Reliability', value: 99,   suffix: '%' },
]

export function ZD1000Mission() {
  return (
    <SectionWrapper className="bg-background">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: content */}
          <div className="relative">
            <FadeIn>
              <p className="font-mono font-bold text-accent-light uppercase tracking-[0.28em] mb-4" style={{ fontSize: '0.8125rem' }}>The Drone</p>
              <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                The ZenaDrone<br />
                <span style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  1000
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="w-12 h-px mb-6" style={{ background: 'linear-gradient(to right, #a78bfa, transparent)' }} />
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '1.125rem' }}>
                ZenaDrone 1000 is a smart UAV built with machine learning and AI to power real-world missions — part of today&apos;s most advanced autonomous drone ecosystem. Starting in agriculture to modernize farm operations, it has evolved into a versatile industrial drone for mapping, GPS navigation, and surveillance.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '1.125rem' }}>
                ZenaDrone 1000 delivers complete drone services for public and private organizations — especially Military and Police teams needing dependable aerial scanning and surveillance with commercial-grade drones.
              </p>
            </FadeIn>

            {/* Tag chips */}
            <FadeIn delay={0.25}>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Machine Learning', 'AI Powered', 'GPS Navigation', 'Military Grade', 'Autonomous Flight'].map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono font-semibold" style={{
                    fontSize: '0.8125rem',
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    color: '#a78bfa',
                    letterSpacing: '0.08em',
                  }}>
                    <span className="w-1 h-1 rounded-full bg-accent-light opacity-80" />
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              {MILESTONES.map((m, i) => (
                <FadeIn key={m.label} delay={0.3 + i * 0.08}>
                  <div className="p-4 rounded-xl" style={{
                    background: 'rgba(124,58,237,0.07)',
                    border: '1px solid rgba(124,58,237,0.18)',
                  }}>
                    <div className="font-display font-bold mb-0.5" style={{ fontSize: '2rem', color: '#a78bfa', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      <Counter to={m.value} suffix={m.suffix} />
                    </div>
                    <div className="font-sans text-text-muted" style={{ fontSize: '1.125rem' }}>
                      {m.label}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: Drone image with overlay */}
          <FadeIn direction="left" delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden" style={{
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(124,58,237,0.18)',
              aspectRatio: '1',
            }}>
              {/* Background glow */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse 70% 70% at 50% 60%, rgba(124,58,237,0.1) 0%, transparent 70%)',
              }} />

              <Image
                src="/images/smart-UAV.webp"
                alt="ZenaDrone 1000 AI-powered autonomous drone"
                fill
                className="object-cover opacity-80"
              />

              <DroneRadarOverlay />
            </div>
          </FadeIn>
        </div>
      </Container>

      <style>{`
        .zdm-ring-cw  { animation: zdmSpin 18s linear infinite; }
        .zdm-ring-ccw { animation: zdmSpin 14s linear infinite reverse; }
        .zdm-sweep    { animation: zdmSpin 4s linear infinite; }
        .zdm-scanline { animation: zdmScanDown 3.5s linear infinite; }
        @keyframes zdmSpin     { to { transform: rotate(360deg); } }
        @keyframes zdmScanDown { 0% { top: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
      `}</style>
    </SectionWrapper>
  )
}
