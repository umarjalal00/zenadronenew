'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Spec {
  label: string
  value: number
  unit: string
  desc: string
}

const SPECS_LEFT: Spec[] = [
  { label: 'Max Payload',  value: 10,   unit: 'kg',  desc: 'Industrial-grade lift capacity'  },
  { label: 'Flight Time',  value: 45,   unit: 'min', desc: 'Extended-endurance battery pack' },
  { label: 'Max Altitude', value: 4000, unit: 'm',   desc: 'High-altitude certified ops'     },
]

const SPECS_RIGHT: Spec[] = [
  { label: 'Control Range',   value: 15, unit: 'km',  desc: 'Long-range HD transmission'    },
  { label: 'Max Speed',       value: 72, unit: 'km/h',desc: 'High-performance motor system' },
  { label: 'Wind Resistance', value: 12, unit: 'm/s', desc: 'Level 6 certified resistance'  },
]

// ─── Spec Card ────────────────────────────────────────────────────────────────

function SpecCard({
  spec,
  cardRef,
  counterRef,
}: {
  spec: Spec
  cardRef: (el: HTMLDivElement | null) => void
  counterRef: (el: HTMLSpanElement | null) => void
}) {
  return (
    <div
      ref={cardRef}
      className="w-full max-w-[260px] rounded-2xl p-5"
      style={{
        background: 'var(--surface-card-el)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        willChange: 'transform, opacity',
      }}
    >
      <p
        className="font-sans text-text-muted uppercase tracking-[0.2em]"
        style={{ fontSize: '0.8125rem', marginBottom: '0.55rem' }}
      >
        {spec.label}
      </p>

      <div className="flex items-baseline gap-1.5">
        <span
          ref={counterRef}
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.1rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
        >
          0
        </span>
        <span
          className="font-sans font-semibold"
          style={{ fontSize: '0.82rem', color: '#00d4ff' }}
        >
          {spec.unit}
        </span>
      </div>

      <p className="font-sans text-text-muted mt-1.5" style={{ fontSize: '1.125rem' }}>
        {spec.desc}
      </p>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Specs() {
  const sectionRef  = useRef<HTMLElement>(null)
  const droneRef    = useRef<HTMLDivElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const leftRefs    = useRef<HTMLDivElement[]>([])
  const rightRefs   = useRef<HTMLDivElement[]>([])
  const counterRefs = useRef<HTMLSpanElement[]>([])

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    // ── Ambient drone float (always on) ──────────────────────────────────────
    gsap.to(droneRef.current, {
      y: -14,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(glowRef.current, {
      scale: 1.12,
      opacity: 0.55,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(ringRef.current, {
      scale: 1.06,
      opacity: 0.4,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    })

    // ── One-shot entrance timeline (plays once, never reverses) ──────────────
    const st = { trigger: section, start: 'top 75%', once: true }

    const tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: 'power3.out' } })

    // Header
    tl.from('.specs-label',    { opacity: 0, y: -16, duration: 0.5  }, 0)
    tl.from('.specs-title',    { opacity: 0, y: -28, duration: 0.6  }, 0.1)
    tl.from('.specs-subtitle', { opacity: 0, y: -12, duration: 0.45 }, 0.2)

    // Drone + glow
    tl.from(glowRef.current,  { opacity: 0, scale: 0.4,  duration: 0.7 }, 0.15)
    tl.from(ringRef.current,  { opacity: 0, scale: 0.6,  duration: 0.65}, 0.2 )
    tl.from(droneRef.current, { opacity: 0, scale: 0.72, duration: 0.75}, 0.2 )

    // Left cards fly in from left
    leftRefs.current.forEach((el, i) => {
      tl.from(el, { opacity: 0, x: -160, duration: 0.65 }, 0.3 + i * 0.12)
    })

    // Right cards fly in from right
    rightRefs.current.forEach((el, i) => {
      tl.from(el, { opacity: 0, x: 160, duration: 0.65 }, 0.3 + i * 0.12)
    })

    // Bottom divider
    tl.from('.spec-divider', { scaleX: 0, duration: 0.55 }, 0.55)

    // ── Counters tick up (play once at full speed) ────────────────────────────
    const allSpecs = [...SPECS_LEFT, ...SPECS_RIGHT]
    counterRefs.current.forEach((el, i) => {
      if (!el || !allSpecs[i]) return
      const proxy = { val: 0 }
      gsap.to(proxy, {
        val: allSpecs[i].value,
        duration: 1.8,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => { el.textContent = Math.round(proxy.val).toLocaleString() },
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ minHeight: '100svh' }}
      aria-label="ZenaDrone 1000 specifications"
    >
      {/* ── Background ────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 58%, rgba(0,212,255,0.07) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center pt-24 pb-10 px-6">
        <p
          className="specs-label font-sans font-medium tracking-[0.32em] uppercase"
          style={{ fontSize: '0.8125rem', color: '#00d4ff', marginBottom: '0.75rem' }}
        >
          Capabilities
        </p>
        <h2
          className="specs-title font-display font-bold text-white"
          style={{
            fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
          }}
        >
          Built for the Impossible
        </h2>
        <p
          className="specs-subtitle font-sans text-text-muted mt-3"
          style={{ fontSize: '1.125rem' }}
        >
          ZenaDrone 1000 — Heavy-Lift Industrial Platform
        </p>
      </div>

      {/* ── Content grid ─────────────────────────────────────────────────── */}
      <div
        className="relative z-10 px-6 pb-20 mx-auto w-full flex items-center"
        style={{ maxWidth: '1280px', minHeight: '60vh' }}
      >
        {/* Mobile: stacked layout */}
        <div className="w-full flex flex-col md:grid md:items-center gap-8"
             style={{ gridTemplateColumns: '1fr auto 1fr' }}>

          {/* Left specs */}
          <div className="flex flex-row md:flex-col flex-wrap gap-4 md:gap-5 justify-center md:items-end">
            {SPECS_LEFT.map((spec, i) => (
              <SpecCard
                key={spec.label}
                spec={spec}
                cardRef={el => { if (el) leftRefs.current[i] = el }}
                counterRef={el => { if (el) counterRefs.current[i] = el }}
              />
            ))}
          </div>

          {/* Center — drone */}
          <div
            className="relative flex-shrink-0 mx-auto"
            style={{
              width: 'clamp(280px, 32vw, 520px)',
              height: 'clamp(210px, 24vw, 390px)',
            }}
          >
            {/* Glow */}
            <div
              ref={glowRef}
              className="absolute pointer-events-none"
              style={{
                inset: '-20%',
                background:
                  'radial-gradient(circle, rgba(0,212,255,0.22) 0%, rgba(0,212,255,0.06) 45%, transparent 68%)',
                filter: 'blur(28px)',
                opacity: 0.75,
              }}
            />

            {/* Rotating ring */}
            <div
              ref={ringRef}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '5%',
                border: '1px solid rgba(0,212,255,0.14)',
                boxShadow: '0 0 40px rgba(0,212,255,0.06) inset, 0 0 40px rgba(0,212,255,0.06)',
                opacity: 0.6,
              }}
            />

            {/* Drone image */}
            <div ref={droneRef} className="relative w-full h-full">
              <Image
                src="/images/zenadrone-1000.jpeg"
                alt="ZenaDrone 1000"
                fill
                quality={90}
                sizes="520px"
                className="object-cover"
                style={{ objectPosition: 'center 60%' }}
              />
              {/* Radial vignette — blends image into the dark bg */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 58% at 50% 50%, transparent 30%, rgb(var(--color-background)) 72%)',
                }}
              />
            </div>
          </div>

          {/* Right specs */}
          <div className="flex flex-row md:flex-col flex-wrap gap-4 md:gap-5 justify-center md:items-start">
            {SPECS_RIGHT.map((spec, i) => (
              <SpecCard
                key={spec.label}
                spec={spec}
                cardRef={el => { if (el) rightRefs.current[i] = el }}
                counterRef={el => { if (el) counterRefs.current[i + 3] = el }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ────────────────────────────────────────────── */}
      <div
        className="spec-divider absolute bottom-0 inset-x-0 origin-left"
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.25) 70%, transparent)',
        }}
      />
    </section>
  )
}
