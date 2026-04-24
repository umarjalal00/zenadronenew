'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 1200, prefix: '',  suffix: '+',    label: 'Missions Completed',  sublabel: 'Across 30+ countries',        accent: '#00d4ff', decimals: 0, fill: 92   },
  { value: 8,    prefix: '',  suffix: ' km',  label: 'Max Range',           sublabel: 'Uninterrupted link range',    accent: '#22d3ee', decimals: 0, fill: 80   },
  { value: 45,   prefix: '',  suffix: ' min', label: 'Flight Endurance',    sublabel: 'Per charge at cruise speed',  accent: '#a78bfa', decimals: 0, fill: 75   },
  { value: 99.8, prefix: '',  suffix: '%',    label: 'Mission Success Rate', sublabel: 'Zero critical failures',     accent: '#34d399', decimals: 1, fill: 99.8 },
  { value: 1,    prefix: '<', suffix: ' m',   label: 'GPS Accuracy',        sublabel: 'Sub-meter precision landing', accent: '#f472b6', decimals: 0, fill: 98   },
  { value: 60,   prefix: '',  suffix: ' fps', label: '4K Video',            sublabel: 'Live transmission quality',   accent: '#fb923c', decimals: 0, fill: 100  },
]

const R    = 38
const CIRC = 2 * Math.PI * R   // ≈ 238.76

// ─── Section ──────────────────────────────────────────────────────────────────

export function MissionStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const scanRef    = useRef<HTMLDivElement>(null)

  const cardRefs = useRef<(HTMLDivElement   | null)[]>([])
  const ringRefs = useRef<(SVGCircleElement | null)[]>([])
  const numRefs  = useRef<(HTMLSpanElement  | null)[]>([])
  const barRefs  = useRef<(HTMLDivElement   | null)[]>([])
  const dotRefs  = useRef<(HTMLDivElement   | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
    })

    // ── Scan line sweeps top → bottom across grid ─────────────────────────────
    tl.fromTo(scanRef.current,
      { top: '0%', opacity: 1 },
      { top: '100%', opacity: 0, duration: 1.2, ease: 'power1.inOut' },
      0,
    )

    // ── Cards boot up in stagger ──────────────────────────────────────────────
    tl.fromTo(cardRefs.current,
      { opacity: 0, scale: 0.88, y: 24, filter: 'blur(8px)' },
      { opacity: 1, scale: 1,    y: 0,  filter: 'blur(0px)', duration: 0.65, stagger: 0.09, ease: 'power3.out' },
      0.25,
    )

    // ── Per-stat: arc + number scramble + bar ─────────────────────────────────
    STATS.forEach((stat, i) => {
      const t = 0.45 + i * 0.1

      // Arc fills
      const targetOffset = CIRC * (1 - stat.fill / 100)
      tl.fromTo(
        ringRefs.current[i],
        { strokeDashoffset: CIRC },
        { strokeDashoffset: targetOffset, duration: 1.6, ease: 'power2.out' },
        t,
      )

      // Number scramble + count
      const obj = { val: 0 }
      tl.to(obj, {
        val: stat.value,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() {
          const el = numRefs.current[i]
          if (!el) return
          const progress = obj.val / stat.value
          const real = stat.decimals > 0
            ? obj.val.toFixed(stat.decimals)
            : Math.floor(obj.val).toString()
          if (progress < 0.75 && Math.random() < (1 - progress) * 0.45) {
            el.textContent = real.split('').map(c =>
              /\d/.test(c) ? String(Math.floor(Math.random() * 10)) : c
            ).join('')
          } else {
            el.textContent = real
          }
        },
        onComplete() {
          const el = numRefs.current[i]
          if (el) el.textContent = stat.decimals > 0 ? stat.value.toFixed(stat.decimals) : String(stat.value)
        },
      }, t)

      // Bar fills
      tl.fromTo(barRefs.current[i],
        { scaleX: 0 },
        { scaleX: stat.fill / 100, duration: 1.4, ease: 'power2.out' },
        t + 0.1,
      )
    })

    // ── Blinking live dots ────────────────────────────────────────────────────
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      gsap.to(dot, {
        opacity: 0.15,
        duration: 0.65,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6 + i * 0.18,
      })
    })

    // ── Number glow pulse ────────────────────────────────────────────────────
    numRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        textShadow: `0 0 32px ${STATS[i].accent}`,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.4 + i * 0.2,
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
      aria-label="ZenaDrone mission statistics"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,212,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 65%)' }}
      />

      <Container>

        {/* Status pill */}
        <FadeIn className="flex justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <div
              className="rounded-full animate-pulse"
              style={{ width: 5, height: 5, background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }}
            />
            <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#00d4ff', letterSpacing: '0.18em' }}>
              TELEMETRY LIVE — ALL SYSTEMS NOMINAL
            </span>
          </div>
        </FadeIn>

        {/* Header */}
        <FadeIn className="text-center mb-14">
          <p className="font-sans font-medium tracking-[0.32em] uppercase mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            By The Numbers
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)', letterSpacing: '-0.025em', lineHeight: 1.06 }}
          >
            Mission-Proven Performance
          </h2>
          <p className="font-sans text-text-muted mt-3 mx-auto" style={{ fontSize: '1.125rem', maxWidth: '420px' }}>
            Every number earned in the field — not a lab.
          </p>
        </FadeIn>

        {/* Grid */}
        <div ref={gridRef} className="relative">

          {/* Scan line */}
          <div
            ref={scanRef}
            className="absolute inset-x-0 pointer-events-none z-20"
            style={{
              top: '0%',
              height: 3,
              background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.7) 30%, rgba(0,212,255,0.7) 70%, transparent)',
              boxShadow: '0 0 24px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)',
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                ref={el => { cardRefs.current[i] = el }}
                className="relative flex flex-col items-center text-center px-4 py-7 rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--surface-card)',
                  border: `1px solid ${stat.accent}18`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: `0 0 50px ${stat.accent}06`,
                  opacity: 0,
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px]"
                  style={{
                    background: `linear-gradient(to right, transparent, ${stat.accent}90, transparent)`,
                    boxShadow: `0 0 12px ${stat.accent}70`,
                  }}
                />

                {/* Corner radial glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{
                    width: '80%', height: 90,
                    background: `radial-gradient(ellipse at 50% 0%, ${stat.accent}16 0%, transparent 70%)`,
                  }}
                />

                {/* Live dot */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <div
                    ref={el => { dotRefs.current[i] = el }}
                    className="rounded-full"
                    style={{ width: 5, height: 5, background: stat.accent, boxShadow: `0 0 6px ${stat.accent}` }}
                  />
                  <span className="font-mono" style={{ fontSize: '0.46rem', color: stat.accent, letterSpacing: '0.14em' }}>LIVE</span>
                </div>

                {/* SVG arc ring + number */}
                <div className="relative flex items-center justify-center mb-3" style={{ width: 100, height: 100 }}>
                  <svg
                    width={100} height={100} viewBox="0 0 100 100"
                    className="absolute inset-0"
                    style={{ transform: 'rotate(-90deg)' }}
                  >
                    {/* Track */}
                    <circle cx={50} cy={50} r={R} fill="none" stroke={`${stat.accent}14`} strokeWidth={2.5} />
                    {/* Progress arc */}
                    <circle
                      ref={el => { ringRefs.current[i] = el }}
                      cx={50} cy={50} r={R}
                      fill="none"
                      stroke={stat.accent}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC}
                      style={{ filter: `drop-shadow(0 0 5px ${stat.accent}90)` }}
                    />
                  </svg>

                  {/* Number inside ring */}
                  <p
                    className="font-display font-bold relative z-10 tabular-nums"
                    style={{
                      fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: stat.accent,
                    }}
                  >
                    {stat.prefix}<span ref={el => { numRefs.current[i] = el }}>0</span>{stat.suffix}
                  </p>
                </div>

                {/* Label */}
                <p
                  className="font-display font-semibold text-white relative z-10"
                  style={{ fontSize: '1.125rem', letterSpacing: '-0.01em' }}
                >
                  {stat.label}
                </p>

                {/* Sublabel */}
                <p className="font-sans text-text-muted mt-1 relative z-10" style={{ fontSize: '0.8125rem' }}>
                  {stat.sublabel}
                </p>

                {/* Fill bar */}
                <div
                  className="w-full mt-4 rounded-full overflow-hidden relative z-10"
                  style={{ height: 2, background: `${stat.accent}12` }}
                >
                  <div
                    ref={el => { barRefs.current[i] = el }}
                    className="h-full origin-left rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${stat.accent}80, ${stat.accent})`,
                      boxShadow: `0 0 8px ${stat.accent}`,
                      transform: 'scaleX(0)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
