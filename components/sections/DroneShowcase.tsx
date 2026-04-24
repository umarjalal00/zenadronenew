'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    label: 'Autonomous Aerial Surveillance',
    accent: '#00d4ff',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="5" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="9" stroke="#00d4ff" strokeWidth="1" opacity="0.45" strokeDasharray="2 3" />
        <line x1="14" y1="5" x2="14" y2="2"  stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="23" x2="14" y2="26" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5"  y1="14" x2="2"  y2="14" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="23" y1="14" x2="26" y2="14" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2" fill="#00d4ff" />
      </svg>
    ),
  },
  {
    label: 'Smart Multispectral Sensors',
    accent: '#22d3ee',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M4 14 Q7 8 14 8 Q21 8 24 14 Q21 20 14 20 Q7 20 4 14Z" stroke="#22d3ee" strokeWidth="1.4" opacity="0.5" fill="none" />
        <path d="M8 14 Q10 10 14 10 Q18 10 20 14 Q18 18 14 18 Q10 18 8 14Z" stroke="#22d3ee" strokeWidth="1.4" opacity="0.75" fill="none" />
        <circle cx="14" cy="14" r="2.5" fill="#22d3ee" />
        <path d="M2 7 Q5 4 8 6"  stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        <path d="M26 7 Q23 4 20 6" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: 'Intelligent Flight Modes',
    accent: '#a78bfa',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 L18 12 L14 10 L10 12 Z" stroke="#a78bfa" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(167,139,250,0.1)" />
        <path d="M10 12 L8 20 L14 16 L20 20 L18 12" stroke="#a78bfa" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(167,139,250,0.06)" />
        <circle cx="14" cy="10" r="2" fill="#a78bfa" opacity="0.9" />
        <path d="M11 22 Q14 26 17 22" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: '4K Video Recording',
    accent: '#fb923c',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="8" width="16" height="12" rx="2" stroke="#fb923c" strokeWidth="1.5" />
        <path d="M19 12 L25 9 L25 19 L19 16 Z" stroke="#fb923c" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(251,146,60,0.1)" />
        <circle cx="9" cy="14" r="2.5" stroke="#fb923c" strokeWidth="1.2" opacity="0.7" />
        <circle cx="9" cy="14" r="1"   fill="#fb923c" />
      </svg>
    ),
  },
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
      <line x1={250} y1={250} x2={250} y2={52} stroke="#00d4ff" strokeWidth={1} opacity={0.3} className="zd1k-sweep" style={{ transformOrigin: '250px 250px' }} />
      <line x1={50} y1={250} x2={450} y2={250} stroke="#00d4ff" strokeWidth={0.4} opacity={0.08} />
      <line x1={250} y1={50}  x2={250} y2={450} stroke="#00d4ff" strokeWidth={0.4} opacity={0.08} />
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function DroneShowcase() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const descRef     = useRef<HTMLParagraphElement>(null)
  const dividerRef  = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const iconRefs    = useRef<(HTMLDivElement | null)[]>([])
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 62%', once: true },
      defaults: { ease: 'power3.out' },
    })

    // ── Drone image flies in from left ────────────────────────────────────────
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -70, scale: 0.94, filter: 'blur(10px)' },
      { opacity: 1, x: 0,   scale: 1,    filter: 'blur(0px)',  duration: 1.0 },
      0,
    )

    // ── Right side text staggers in ───────────────────────────────────────────
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45 },
      0.4,
    )
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.55 },
      0.52,
    )
    tl.fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.64,
    )
    tl.fromTo(dividerRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
      0.78,
    )

    // ── Vertical feature line draws down ──────────────────────────────────────
    tl.fromTo(lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
      0.85,
    )

    // ── Features stagger in ───────────────────────────────────────────────────
    tl.fromTo(featureRefs.current,
      { opacity: 0, x: -28, filter: 'blur(4px)' },
      { opacity: 1, x: 0,   filter: 'blur(0px)', duration: 0.45, stagger: 0.1 },
      0.9,
    )

    // ── Icon dots pop ─────────────────────────────────────────────────────────
    tl.fromTo(iconRefs.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
      0.95,
    )

    // ── Icon accent glows pulse ───────────────────────────────────────────────
    iconRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        boxShadow: `0 0 16px ${FEATURES[i].accent}70`,
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5 + i * 0.2,
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background overflow-hidden py-16 sm:py-20 md:py-[120px]"
      aria-label="ZenaDrone 1000 overview"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,212,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Ambient bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 30% 55%, rgba(0,212,255,0.05) 0%, transparent 65%)' }}
      />

      <Container>
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 lg:gap-28 items-center">

          {/* ── Left: Drone visual ────────────────────────────────────────── */}
          <div ref={imageRef} className="relative flex items-center justify-center order-2 md:order-1 min-h-[340px] sm:min-h-[400px] md:min-h-[520px]" style={{ opacity: 0 }}>
            {/* Radar rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] relative flex items-center justify-center">
                <RadarRings />
              </div>
            </div>

            {/* Outer slow-spinning ring */}
            <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[460px] md:h-[460px] rounded-full zd1k-ring1" style={{ border: '1px solid rgba(0,212,255,0.1)' }} />
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[370px] md:h-[370px] rounded-full zd1k-ring2" style={{ border: '1px solid rgba(0,212,255,0.06)' }} />

            {/* Center glow */}
            <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] rounded-full" style={{
              background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)',
              animation: 'zd1k-glow 3.5s ease-in-out infinite',
            }} />

            {/* Drone image */}
            <div className="relative z-10 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[800px] md:h-[800px]" style={{ animation: 'zd1k-drone-float 4.5s ease-in-out infinite' }}>
              {/* Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(0,212,255,0.25) 0%, transparent 70%)',
                filter: 'blur(8px)',
                animation: 'zd1k-shadow 4.5s ease-in-out infinite',
              }} />
              <Image
                src="/images/Advanced-UAV-Technology.png"
                alt="ZenaDrone 1000"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(0,212,255,0.25)) drop-shadow(0 0 30px rgba(0,212,255,0.15))' }}
                priority
              />
            </div>
          </div>

          {/* ── Right: Content ─────────────────────────────────────────────── */}
          <div className="order-1 md:order-2">

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-2 mb-4" style={{ opacity: 0 }}>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #00d4ff, transparent)', maxWidth: 40 }} />
              <span
                className="font-mono font-medium tracking-[0.28em] uppercase"
                style={{ fontSize: '0.8125rem', color: '#00d4ff' }}
              >
                ZenaDrone 1000
              </span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-display font-bold text-white mb-4"
              style={{
                fontSize: 'clamp(2rem, 3.7vw, 3rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                opacity: 0,
              }}
            >
              Total Autonomous Drone Surveillance
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="font-sans text-text-muted leading-relaxed mb-6"
              style={{ fontSize: '1.125rem', maxWidth: '500px', opacity: 0 }}
            >
              The ZenaDrone 1000 brings together smart software and purpose-built hardware in one cutting-edge drone — designed for real-world work in construction, agriculture, surveillance, search and rescue, and environmental inspection.
            </p>

            {/* Divider */}
            <div
              ref={dividerRef}
              className="mb-6 origin-left"
              style={{
                height: 1,
                background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)',
                maxWidth: 200,
                opacity: 0.7,
                transform: 'scaleX(0)',
              }}
            />

            {/* Features */}
            <div className="relative pl-6">

              {/* Vertical line */}
              <div
                className="absolute left-0 top-2 bottom-2"
                style={{ width: 1, background: 'rgba(255,255,255,0.07)' }}
              >
                <div
                  ref={lineRef}
                  className="absolute inset-0 origin-top"
                  style={{
                    background: 'linear-gradient(to bottom, #00d4ff, #22d3ee 30%, #a78bfa 65%, #34d399 85%, #fb923c)',
                    boxShadow: '0 0 6px rgba(0,212,255,0.4)',
                    transform: 'scaleY(0)',
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                {FEATURES.map((f, i) => (
                  <div
                    key={f.label}
                    ref={el => { featureRefs.current[i] = el }}
                    className="flex items-center gap-3"
                    style={{ opacity: 0 }}
                  >
                    {/* Icon chip */}
                    <div
                      ref={el => { iconRefs.current[i] = el }}
                      className="flex-shrink-0 flex items-center justify-center rounded-xl"
                      style={{
                        width: 42, height: 42,
                        background: `${f.accent}10`,
                        border: `1px solid ${f.accent}28`,
                        boxShadow: `0 0 8px ${f.accent}20`,
                        opacity: 0,
                      }}
                    >
                      {f.icon}
                    </div>

                    {/* Label */}
                    <span
                      className="font-sans font-medium text-white"
                      style={{ fontSize: '1.125rem' }}
                    >
                      {f.label}
                    </span>

                    {/* Accent dot */}
                    <div
                      className="ml-auto rounded-full flex-shrink-0"
                      style={{ width: 4, height: 4, background: f.accent, boxShadow: `0 0 6px ${f.accent}` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .zd1k-ring1 { animation: zd1kSpin 22s linear infinite; }
        .zd1k-ring2 { animation: zd1kSpin 15s linear infinite reverse; }
        .zd1k-radar { animation: zd1kSpin 30s linear infinite; }
        .zd1k-sweep { animation: zd1kSpin 4s linear infinite; }

        @keyframes zd1kSpin         { to { transform: rotate(360deg); } }
        @keyframes zd1k-drone-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        @keyframes zd1k-shadow      { 0%,100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); } 50% { opacity: 0.3; transform: translateX(-50%) scaleX(0.75); } }
        @keyframes zd1k-glow        { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.1); } }
      `}</style>
    </section>
  )
}
