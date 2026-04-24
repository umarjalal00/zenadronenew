'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Step {
  number: string
  title:  string
  desc:   string
  accent: string
  side:   'left' | 'right'
  icon:   React.ReactNode
  stat:   string
  statLabel: string
}

const STEPS: Step[] = [
  {
    number: '01', title: 'Intelligent Drone Technology', accent: '#00d4ff', side: 'left',
    desc: 'ZenaDrone 1000 is composed of artificial intelligence (AI) and machine learning software systems for autonomous flight.',
    stat: 'AI', statLabel: 'Machine-learning powered',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <path d="M20 6 L26 18 L20 16 L14 18 Z" stroke="#00d4ff" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(0,212,255,0.08)" />
        <path d="M14 18 L12 26 L20 22 L28 26 L26 18" stroke="#00d4ff" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(0,212,255,0.05)" />
        <circle cx="20" cy="16" r="2.5" fill="#00d4ff" opacity="0.9" />
        <path d="M17 28 Q20 34 23 28" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '02', title: 'Remote Aerial Surveillance Solutions', accent: '#22d3ee', side: 'right',
    desc: 'Programmable flight routes and long-lasting battery to cover acres of farm fields in a single mission.',
    stat: '100+ ac', statLabel: 'Coverage per mission',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx="20" cy="20" r="13" stroke="#22d3ee" strokeWidth="1.2" opacity="0.4" />
        <circle cx="20" cy="20" r="8"  stroke="#22d3ee" strokeWidth="1.2" opacity="0.6" />
        <circle cx="20" cy="20" r="2.5" fill="#22d3ee" />
        <line x1="20" y1="7"  x2="20" y2="12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="28" x2="20" y2="33" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7"  y1="20" x2="12" y2="20" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="20" x2="33" y2="20" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03', title: 'Autonomous Inspection & Monitoring', accent: '#a78bfa', side: 'left',
    desc: 'ZenaDrone is equipped with multispectral sensors and 4K cameras to capture vivid videos and images.',
    stat: '4K', statLabel: 'Ultra-HD capture',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <circle cx="20" cy="20" r="14" stroke="#a78bfa" strokeWidth="1.2" opacity="0.3" />
        <circle cx="20" cy="20" r="9"  stroke="#a78bfa" strokeWidth="1.2" opacity="0.55" />
        <circle cx="20" cy="20" r="4"  stroke="#a78bfa" strokeWidth="1.2" opacity="0.8" />
        <circle cx="20" cy="20" r="2"  fill="#a78bfa" />
        <line x1="20" y1="6"  x2="20" y2="11" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="20" y1="29" x2="20" y2="34" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="6"  y1="20" x2="11" y2="20" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="29" y1="20" x2="34" y2="20" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    number: '04', title: 'Field Scanning & Terrain Mapping', accent: '#34d399', side: 'right',
    desc: 'ZenaDrone field scanning and terrain mapping capabilities provide complete and accurate real-time data.',
    stat: 'Real-Time', statLabel: 'Data streaming',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width={34} height={34}>
        <rect x="8"  y="22" width="5" height="12" rx="1.5" fill="#34d399" opacity="0.5" />
        <rect x="16" y="16" width="5" height="18" rx="1.5" fill="#34d399" opacity="0.7" />
        <rect x="24" y="10" width="5" height="24" rx="1.5" fill="#34d399" opacity="0.9" />
        <path d="M10.5 20 L18.5 14 L26.5 8" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <circle cx="26.5" cy="8" r="2" fill="#34d399" />
      </svg>
    ),
  },
]

// ─── Step Card ────────────────────────────────────────────────────────────────

function StepCard({
  step, side, staticMode,
  cardRef, scanRef, badgeRef, iconRef, titleRef, descRef, statRef,
}: {
  step: Step
  side: 'left' | 'right'
  staticMode?: boolean
  cardRef:  (el: HTMLDivElement | null) => void
  scanRef:  (el: HTMLDivElement | null) => void
  badgeRef: (el: HTMLDivElement | null) => void
  iconRef:  (el: HTMLDivElement | null) => void
  titleRef: (el: HTMLDivElement | null) => void
  descRef:  (el: HTMLDivElement | null) => void
  statRef:  (el: HTMLDivElement | null) => void
}) {
  const startOpacity = staticMode ? 1 : 0
  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden ${side === 'left' ? 'text-right' : 'text-left'}`}
      style={{
        background: 'var(--surface-card)',
        border: `1px solid ${step.accent}22`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: `0 0 50px ${step.accent}08, inset 0 1px 0 ${step.accent}15`,
        opacity: startOpacity,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${step.accent}90, transparent)`,
          boxShadow: `0 0 12px ${step.accent}80`,
        }}
      />

      {/* Corner radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          [side === 'left' ? 'right' : 'left']: 0,
          width: 160,
          height: 120,
          background: `radial-gradient(ellipse at ${side === 'left' ? '100% 0%' : '0% 0%'}, ${step.accent}14 0%, transparent 70%)`,
        }}
      />

      {/* Scan line sweep */}
      <div
        ref={scanRef}
        className="absolute inset-y-0 pointer-events-none z-10"
        style={{
          width: 60,
          background: `linear-gradient(to right, transparent, ${step.accent}18, transparent)`,
          left: '-60px',
        }}
      />

      <div className={`flex items-start gap-4 p-5 ${side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}>

        {/* Icon */}
        <div
          ref={iconRef}
          className="flex-shrink-0 rounded-xl p-2"
          style={{
            background: `${step.accent}10`,
            border: `1px solid ${step.accent}28`,
            opacity: startOpacity,
          }}
        >
          {step.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div
            ref={badgeRef}
            className={`inline-flex items-center gap-1.5 mb-2 ${side === 'left' ? 'flex-row-reverse' : ''}`}
            style={{ opacity: startOpacity }}
          >
            <div className="rounded-full" style={{ width: 5, height: 5, background: step.accent, boxShadow: `0 0 6px ${step.accent}` }} />
            <span
              className="font-mono font-semibold uppercase tracking-[0.25em]"
              style={{ fontSize: '0.8125rem', color: step.accent }}
            >
              Step {step.number}
            </span>
          </div>

          <div ref={titleRef} style={{ opacity: startOpacity }}>
            <h3
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              {step.title}
            </h3>
          </div>

          <div ref={descRef} style={{ opacity: startOpacity }}>
            <p
              className="font-sans text-text-muted leading-relaxed mt-1.5"
              style={{ fontSize: '1.125rem' }}
            >
              {step.desc}
            </p>
          </div>

          {/* Stat */}
          <div
            ref={statRef}
            className={`flex items-center gap-2 mt-3 ${side === 'left' ? 'justify-end' : ''}`}
            style={{ opacity: startOpacity }}
          >
            <span
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: step.accent, letterSpacing: '-0.03em' }}
            >
              {step.stat}
            </span>
            <span className="font-sans text-text-muted" style={{ fontSize: '0.8125rem' }}>
              {step.statLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Node ─────────────────────────────────────────────────────────────────────

function Node({
  accent, nodeRef, ring1Ref, ring2Ref,
}: {
  accent: string
  nodeRef:  (el: HTMLDivElement | null) => void
  ring1Ref: (el: HTMLDivElement | null) => void
  ring2Ref: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={nodeRef}
      className="relative flex items-center justify-center"
      style={{ width: 36, height: 36, flexShrink: 0, opacity: 0, scale: 0 }}
    >
      {/* Blast ring 1 */}
      <div
        ref={ring1Ref}
        className="absolute rounded-full"
        style={{ inset: 0, border: `1px solid ${accent}`, opacity: 0 }}
      />
      {/* Blast ring 2 */}
      <div
        ref={ring2Ref}
        className="absolute rounded-full"
        style={{ inset: 0, border: `1px solid ${accent}`, opacity: 0 }}
      />
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${accent}55` }} />
      {/* Glow ring */}
      <div
        className="absolute rounded-full"
        style={{ inset: 4, border: `1px solid ${accent}90`, boxShadow: `0 0 14px ${accent}80` }}
      />
      {/* Center dot */}
      <div className="rounded-full" style={{ width: 10, height: 10, background: accent, boxShadow: `0 0 12px ${accent}, 0 0 24px ${accent}60` }} />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HowItWorks() {
  const sectionRef   = useRef<HTMLElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const progressDots = useRef<(HTMLDivElement | null)[]>([])

  const nodeRefs  = useRef<(HTMLDivElement | null)[]>([])
  const ring1Refs = useRef<(HTMLDivElement | null)[]>([])
  const ring2Refs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])
  const scanRefs  = useRef<(HTMLDivElement | null)[]>([])
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs  = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLDivElement | null)[]>([])
  const descRefs  = useRef<(HTMLDivElement | null)[]>([])
  const statRefs  = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 68%',
        once:  true,
      },
      defaults: { ease: 'power3.out' },
    })

    // ── Line draws top → bottom ───────────────────────────────────────────────
    tl.fromTo(lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 2.6, ease: 'none' },
      0,
    )

    // ── Per-step sequenced animations ─────────────────────────────────────────
    // Steps are evenly spaced; timing offsets match line progress
    const stepStart = [0.1, 0.75, 1.4, 2.05]

    STEPS.forEach((step, i) => {
      const t   = stepStart[i]
      const dir = step.side === 'left' ? -80 : 80

      // Progress dot activates
      tl.to(progressDots.current[i],
        { background: step.accent, boxShadow: `0 0 10px ${step.accent}`, duration: 0.3 },
        t,
      )

      // Node pops in
      tl.fromTo(nodeRefs.current[i],
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)' },
        t,
      )

      // Ring 1 blasts outward
      tl.fromTo(ring1Refs.current[i],
        { scale: 1, opacity: 0.8 },
        { scale: 3.2, opacity: 0, duration: 0.8, ease: 'power2.out' },
        t + 0.05,
      )

      // Ring 2 blasts outward (delayed)
      tl.fromTo(ring2Refs.current[i],
        { scale: 1, opacity: 0.5 },
        { scale: 2.4, opacity: 0, duration: 0.7, ease: 'power2.out' },
        t + 0.2,
      )

      // Card slides in
      tl.fromTo(cardRefs.current[i],
        { opacity: 0, x: dir, filter: 'blur(8px)', scale: 0.96 },
        { opacity: 1, x: 0,   filter: 'blur(0px)', scale: 1, duration: 0.7 },
        t + 0.15,
      )

      // Scan line sweeps across card
      tl.fromTo(scanRefs.current[i],
        { left: '-60px' },
        { left: '110%', duration: 0.65, ease: 'power1.inOut' },
        t + 0.2,
      )

      // Internal elements stagger in
      tl.fromTo(badgeRefs.current[i], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, t + 0.32)
      tl.fromTo(iconRefs.current[i],  { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.6)' }, t + 0.38)
      tl.fromTo(titleRefs.current[i], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, t + 0.44)
      tl.fromTo(descRefs.current[i],  { opacity: 0, y: 8  }, { opacity: 1, y: 0, duration: 0.35 }, t + 0.52)
      tl.fromTo(statRefs.current[i],  { opacity: 0, y: 6  }, { opacity: 1, y: 0, duration: 0.35 }, t + 0.6)
    })

    // ── Ambient node pulse after all revealed ─────────────────────────────────
    nodeRefs.current.forEach((node, i) => {
      if (!node) return
      const dot = node.querySelector('.rounded-full:last-child') as HTMLElement
      if (!dot) return
      gsap.to(dot, {
        boxShadow: `0 0 20px ${STEPS[i].accent}, 0 0 40px ${STEPS[i].accent}60`,
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.8 + i * 0.3,
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-16 md:py-24"
      aria-label="How ZenaDrone works"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 65%)' }}
      />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-4">
          <p className="font-sans font-medium tracking-[0.32em] uppercase mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            Core Capabilities
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)', letterSpacing: '-0.025em', lineHeight: 1.06 }}
          >
            Powered by Intelligence
          </h2>
          <p className="font-sans text-text-muted mt-3 mx-auto" style={{ fontSize: '1.125rem', maxWidth: '560px' }}>
            From AI-driven autonomous flight to multispectral inspection and real-time terrain mapping — ZenaDrone delivers precision at every stage.
          </p>
        </FadeIn>

        {/* Progress dots */}
        <FadeIn className="flex items-center justify-center gap-3 mb-12">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                ref={el => { progressDots.current[i] = el }}
                className="rounded-full transition-all duration-300"
                style={{ width: 8, height: 8, background: 'rgba(255,255,255,0.12)' }}
              />
              {i < STEPS.length - 1 && (
                <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          ))}
        </FadeIn>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Vertical glowing line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 pointer-events-none hidden md:block"
            style={{ width: 1, transform: 'translateX(-50%)' }}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                background: 'linear-gradient(to bottom, #00d4ff, #22d3ee 35%, #a78bfa 65%, #34d399)',
                boxShadow: '0 0 8px 2px rgba(0,212,255,0.3)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-8 md:gap-10">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="grid items-center md:gap-6 gap-3 grid-cols-[36px_1fr] md:grid-cols-[1fr_36px_1fr]"
              >
                {/* Left slot */}
                <div className="hidden md:block">
                  {step.side === 'left' && (
                    <StepCard
                      step={step} side="left"
                      cardRef={el  => { cardRefs.current[i]  = el }}
                      scanRef={el  => { scanRefs.current[i]  = el }}
                      badgeRef={el => { badgeRefs.current[i] = el }}
                      iconRef={el  => { iconRefs.current[i]  = el }}
                      titleRef={el => { titleRefs.current[i] = el }}
                      descRef={el  => { descRefs.current[i]  = el }}
                      statRef={el  => { statRefs.current[i]  = el }}
                    />
                  )}
                </div>

                {/* Node */}
                <div className="flex items-center justify-center">
                  <Node
                    accent={step.accent}
                    nodeRef={el  => { nodeRefs.current[i]  = el }}
                    ring1Ref={el => { ring1Refs.current[i] = el }}
                    ring2Ref={el => { ring2Refs.current[i] = el }}
                  />
                </div>

                {/* Right slot */}
                <div>
                  {/* Mobile: static card, always visible */}
                  <div className="md:hidden">
                    <StepCard
                      step={step} side="right" staticMode
                      cardRef={() => {}} scanRef={() => {}} badgeRef={() => {}}
                      iconRef={() => {}} titleRef={() => {}} descRef={() => {}} statRef={() => {}}
                    />
                  </div>
                  {step.side === 'right' && (
                    <div className="hidden md:block">
                      <StepCard
                        step={step} side="right"
                        cardRef={el  => { cardRefs.current[i]  = el }}
                        scanRef={el  => { scanRefs.current[i]  = el }}
                        badgeRef={el => { badgeRefs.current[i] = el }}
                        iconRef={el  => { iconRefs.current[i]  = el }}
                        titleRef={el => { titleRefs.current[i] = el }}
                        descRef={el  => { descRefs.current[i]  = el }}
                        statRef={el  => { statRefs.current[i]  = el }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
