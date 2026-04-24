'use client'

import { useRef } from 'react'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { useGSAP }        from '@/hooks/useGSAP'
import { gsap }           from '@/lib/gsap'

/* ─── Data ─────────────────────────────────────────────────── */

const WHY_FEATURES = [
  { label: 'Wide Coverage',      desc: 'Survey large areas fast without missing details, from rooftops to full estates in a single flight.' },
  { label: 'Real-Time Data',     desc: 'Get clear, high-resolution images the moment a flight is complete — enabling fast, confident decisions.' },
  { label: 'Improved Safety',    desc: 'Drones reach dangerous spots so workers stay safe, eliminating the need for ladders and scaffolding.' },
  { label: 'Better Planning',    desc: 'Create more accurate property maps and maintenance plans using detailed aerial data.' },
  { label: 'Regular Monitoring', desc: 'Perform frequent checks to track property changes, wear, and maintenance needs over time.' },
]

const BENEFITS = [
  {
    num: '01',
    title: 'Improve Safety',
    desc: 'The primary benefit of using UAVs is worker safety. Examining large structures and difficult-to-reach areas is dangerous. Drones replace personnel in risky areas — reducing mishaps, injuries, and liability. UAVs reach high altitudes and confined locations without endangering human safety.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 L22 8 L22 20 L14 24 L6 20 L6 8 Z" stroke="#00d4ff" strokeWidth={1.3} strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <path d="M10 14 L13 17 L18 11" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Increased Speed & Efficiency',
    desc: 'Drones swiftly cover large regions, take comprehensive pictures, and deliver real-time feedback. Labor-intensive setups like ladders and scaffolding are eliminated entirely — enabling rapid decision-making and faster maintenance responses.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="9" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M14 9 L14 14 L18 16" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14 L5 14M21 14 L23 14M14 7 L14 5" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'High-Resolution Data',
    desc: 'High-resolution cameras, thermal imaging, and LiDAR sensors capture detailed visual data otherwise difficult to attain through manual methods. Property managers gain a thorough understanding of the property\'s condition using precise, multi-sensor data.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="7" width="20" height="14" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <circle cx="14" cy="14" r="4" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="14" cy="14" r="1.5" fill="#00d4ff" opacity={0.8} />
        <path d="M19 7 L21 4 L25 4" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Economical',
    desc: 'Drones significantly decrease the expenses of maintaining and inspecting properties. UAVs replace the need for costly crane and scaffolding rentals and reduce the manual labor required — saving time and money on every inspection cycle.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="8" width="22" height="14" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <circle cx="14" cy="15" r="3.5" stroke="#00d4ff" strokeWidth={1.2} />
        <path d="M14 6 L14 8M7 6 L7 8M21 6 L21 8" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
]

const APPLICATIONS = [
  {
    title: 'Building & Facade Examinations',
    desc: 'Drones take close-up pictures of exterior walls, windows, and architectural elements on tall buildings. UAVs identify structural issues requiring attention — such as cracks, water damage, or facade deterioration — without scaffolding.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <rect x="4" y="2" width="16" height="20" rx="1.5" stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.06)" />
        <rect x="7" y="5" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
        <rect x="14" y="5" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
        <rect x="7" y="11" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
        <rect x="14" y="11" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
        <rect x="10" y="17" width="4" height="5" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
      </svg>
    ),
  },
  {
    title: 'Grounds & Landscaping',
    desc: 'Drones survey large areas and landscapes quickly — checking vegetation health, monitoring irrigation systems, and planning landscaping upkeep. The bird\'s-eye view is invaluable for managing parks, golf courses, and vast estates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M12 20 L12 12" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M12 12 Q12 6 6 6 Q6 12 12 12" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" fill="rgba(0,212,255,0.1)" />
        <path d="M12 15 Q12 9 18 9 Q18 15 12 15" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" fill="rgba(0,212,255,0.1)" />
        <path d="M4 20 L20 20" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    title: 'Roof Inspections',
    desc: 'Roofs are vulnerable to weather and wear. Drones with high-resolution cameras and thermal imaging swiftly detect leaks, damaged shingles, and insulation issues — allowing rapid repairs and preventing additional long-term damage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M3 12 L12 4 L21 12" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <path d="M5 12 L5 20 L19 20 L19 12" stroke="#00d4ff" strokeWidth={1.2} strokeLinejoin="round" fill="rgba(0,212,255,0.04)" />
        <rect x="10" y="15" width="4" height="5" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
      </svg>
    ),
  },
  {
    title: 'Infrastructure Upkeep',
    desc: 'Pipelines, bridges, and large parking structures require extensive surveillance to uphold public safety. Drone surveys evaluate structural state, and aerial photographs spot areas of wear or corrosion before they become critical.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M3 18 Q7 12 12 12 Q17 12 21 18" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" fill="rgba(0,212,255,0.06)" />
        <path d="M6 18 L6 20M12 14 L12 10M18 18 L18 20" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.6} />
        <circle cx="12" cy="9" r="2" stroke="#00d4ff" strokeWidth={1.1} fill="rgba(0,212,255,0.1)" />
      </svg>
    ),
  },
]

const PROPERTY_TYPES = [
  {
    title: 'Homes',
    items: [
      'Inspect roofs, walls, and landscaping without climbing or heavy equipment',
      'Lower costs with quicker checks and fewer resources',
      'Provide homeowners with regular monitoring for peace of mind',
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M4 13 L14 5 L24 13" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 13 L6 23 L22 23 L22 13" stroke="#00d4ff" strokeWidth={1.2} strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <rect x="11" y="17" width="6" height="6" rx="0.5" stroke="#00d4ff" strokeWidth={1} opacity={0.7} />
      </svg>
    ),
  },
  {
    title: 'Business Buildings',
    items: [
      'Check malls, office buildings, and industrial sites efficiently',
      'Reduce labor and equipment needs — cover large areas in one flight',
      'Deliver detailed reports to building managers for easier decisions',
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="5" y="4" width="18" height="20" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <rect x="8" y="7" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.6} />
        <rect x="14" y="7" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.6} />
        <rect x="8" y="13" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.6} />
        <rect x="14" y="13" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.6} />
        <rect x="11" y="19" width="6" height="5" rx="0.5" stroke="#00d4ff" strokeWidth={0.9} opacity={0.7} />
      </svg>
    ),
  },
  {
    title: 'Recreational Spaces',
    items: [
      'Manage golf courses, parks, and large estates with ease',
      'Plan activities and maintenance using aerial data',
      'Monitor foot traffic to enhance user experience and safety',
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="9" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M7 17 Q10 14 14 17 Q18 20 21 17" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.6} />
        <path d="M8 11 Q11 8 14 11 Q17 14 20 11" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.4} />
        <circle cx="14" cy="14" r="2" stroke="#00d4ff" strokeWidth={1.1} />
      </svg>
    ),
  },
]

const ZENADRONE_FEATURES = [
  { label: 'Advanced Features',  desc: 'Equipped with high-resolution cameras, thermal sensors, and automated flight paths.' },
  { label: 'Ease of Use',        desc: 'User-friendly controls make operation simple for property managers without technical expertise.' },
  { label: 'Durability',         desc: 'Built to withstand tough weather conditions, ensuring reliable performance year-round.' },
  { label: 'Versatility',        desc: 'Suitable for residential, commercial, and agricultural properties of all sizes.' },
]

/* ─── Helpers ───────────────────────────────────────────────── */

function SectionDivider() {
  return <div className="w-12 h-px my-5" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)' }} />
}

/* ─── Main ──────────────────────────────────────────────────── */

export function PropSections() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = (trigger: string, start = 'top 72%') => ({
      scrollTrigger: { trigger, start, once: true },
    })

    /* 1 — Why features slide in from right with blur */
    gsap.fromTo('.prop-feat-item',
      { x: 40, opacity: 0, filter: 'blur(4px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out', stagger: 0.1, ...st('.prop-feat-item') }
    )

    /* 2 — Benefit cards fly up, icons pop then glow */
    gsap.fromTo('.prop-ben-card',
      { y: 45, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12, ...st('.prop-ben-card') }
    )
    gsap.fromTo('.prop-ben-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.14, delay: 0.2, ...st('.prop-ben-card') }
    )
    gsap.to('.prop-ben-icon', {
      boxShadow: '0 0 20px rgba(0,212,255,0.35), 0 0 8px rgba(0,212,255,0.2)',
      duration: 1.6, yoyo: true, repeat: -1, stagger: 0.5, ease: 'sine.inOut', delay: 1,
    })

    /* 3 — Application cards: clip-path reveal */
    gsap.fromTo('.prop-app-card',
      { clipPath: 'inset(35% 0 0 0 round 16px)', opacity: 0 },
      { clipPath: 'inset(0% 0 0 0 round 16px)', opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, ...st('.prop-app-card') }
    )
    gsap.fromTo('.prop-app-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.1, delay: 0.15, ...st('.prop-app-card') }
    )

    /* 4 — Property type cards slide up */
    gsap.fromTo('.prop-type-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.13, ...st('.prop-type-card') }
    )
    gsap.fromTo('.prop-type-item',
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07, delay: 0.2, ...st('.prop-type-card') }
    )

    /* 5 — ZenaDrone features slide from right */
    gsap.fromTo('.prop-zen-item',
      { x: 35, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, ...st('.prop-zen-item') }
    )

    /* Conclusion dividers */
    gsap.fromTo('.prop-concl-line',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12, ...st('.prop-concl-line') }
    )
    gsap.fromTo('.prop-concl-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.out', transformOrigin: 'center', ...st('.prop-concl-divider') }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>

      {/* ── 1. Why Use Drones ── */}
      <SectionWrapper id="why-drones" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <FadeIn direction="right">
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Why Use Drones?</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Safer, Smarter{' '}
                <span style={{ color: '#00d4ff' }}>Property Inspections</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>Checking properties manually can be dangerous, slow, and expensive. Traditional methods rely on ladders, scaffolding, and heavy labor — driving up costs and taking significant time. A property management drone changes this entirely.</p>
                <p>Drones like the ZenaDrone 1000 speed up work across multiple projects, help teams solve problems faster, and make property evaluations quicker and safer for everyone involved — from inspection teams to building owners.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="flex flex-col gap-3">
                {WHY_FEATURES.map((item) => (
                  <div key={item.label} className="prop-feat-item flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}>
                    <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
                    <div>
                      <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.9rem' }}>{item.label}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.855rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 2. Key Benefits ── */}
      <SectionWrapper id="benefits" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Key Benefits</p>
            <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Four Reasons Property Managers{' '}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, rgba(0,212,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Choose Drones
              </span>
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
              From safety improvements to cost savings, drone property surveys deliver measurable benefits across every type of inspection and maintenance task.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.num}
                className="prop-ben-card group p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="prop-ben-icon flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                    {b.icon}
                  </div>
                  <div>
                    <span className="font-mono font-bold" style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.1em' }}>{b.num}</span>
                    <h3 className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{b.title}</h3>
                  </div>
                </div>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{b.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.3), transparent)' }} />
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 3. Applications ── */}
      <SectionWrapper id="applications" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container>
          <FadeIn className="mb-12">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Applications</p>
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Drone Property Surveys{' '}
                <span style={{ color: '#00d4ff' }}>Across Every Use Case</span>
              </h2>
              <SectionDivider />
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                From tall building facades to vast golf courses and critical infrastructure, drone property surveys provide the same precision, speed, and safety advantage regardless of the scale or complexity of the task.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {APPLICATIONS.map((a) => (
              <div key={a.title}
                className="prop-app-card p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="prop-app-icon w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                  {a.icon}
                </div>
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{a.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{a.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.25), transparent)' }} />
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 4. Property Types ── */}
      <SectionWrapper id="property-types" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Built for Every Property</p>
            <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Tailored Solutions for{' '}
              <span style={{ color: '#00d4ff' }}>Different Property Types</span>
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
              Drones for property management adapt to any property type, providing precise solutions for the unique challenges of homes, business buildings, and recreational spaces alike.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5">
            {PROPERTY_TYPES.map((pt) => (
              <div key={pt.title}
                className="prop-type-card p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(0,212,255,0.12)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  {pt.icon}
                </div>
                <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{pt.title}</h3>
                <div className="flex flex-col gap-2.5">
                  {pt.items.map((item) => (
                    <div key={item} className="prop-type-item flex items-start gap-2.5" style={{ opacity: 0 }}>
                      <div className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}>
                        <svg viewBox="0 0 8 8" fill="none" width={6} height={6}>
                          <path d="M1.5 4 L3.5 6 L6.5 2" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.25), transparent)' }} />
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 5. Why ZenaDrone 1000 ── */}
      <SectionWrapper id="zenadrone" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <FadeIn direction="right">
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Why Choose ZenaDrone 1000?</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                The Best in Drone Technology{' '}
                <span style={{ color: '#00d4ff' }}>for Property Management</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>The ZenaDrone 1000 offers the best in drone technology for property management. This innovative platform combines cutting-edge features to simplify inspections and maintenance for all types of properties.</p>
                <p>Investing in the ZenaDrone 1000 ensures safer, faster, and smarter inspections. With drone property surveys, you can save time and money while delivering exceptional results — on every job, every time.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="flex flex-col gap-3 mb-5">
                {ZENADRONE_FEATURES.map((f) => (
                  <div key={f.label} className="prop-zen-item flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(0,212,255,0.12)', opacity: 0 }}>
                    <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: '#00d4ff', boxShadow: '0 0 8px rgba(0,212,255,0.6)' }} />
                    <div>
                      <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.9rem' }}>{f.label}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.855rem' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <FadeIn delay={0.2}>
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                    <span className="font-semibold text-white">Drones are changing how we inspect and care for properties.</span> Whether it&apos;s homes, businesses, or farms — a property management drone makes things safer, faster, and easier. Try drone technology today and transform your workflow.
                  </p>
                </div>
              </FadeIn>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 6. Conclusion ── */}
      <SectionWrapper id="conclusion" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container size="md">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="prop-concl-line h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))', transformOrigin: 'left center' }} />
              <span className="font-mono font-bold uppercase tracking-[0.28em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>The Future of Property Care</span>
              <div className="prop-concl-line h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))', transformOrigin: 'right center' }} />
            </div>
            <FadeIn>
              <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Smarter Inspections,{' '}
                <span style={{ color: '#00d4ff' }}>Better Properties</span>
              </h2>
            </FadeIn>
            <div className="prop-concl-divider w-12 h-px mx-auto my-6" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5), transparent)' }} />
            <FadeIn delay={0.1}>
              <p className="font-sans text-text-muted mx-auto leading-relaxed" style={{ fontSize: '1rem', maxWidth: 620, lineHeight: 1.75 }}>
                Drone property surveys and regular aerial monitoring are now simple, reliable, and accessible for any scale of property. From rooftop assessments to full estate surveys, the ZenaDrone 1000 delivers exceptional data quality with every flight — making inspections safer, maintenance faster, and decisions smarter.
              </p>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

    </div>
  )
}
