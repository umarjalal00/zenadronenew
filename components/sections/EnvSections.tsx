'use client'

import { useRef } from 'react'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { useGSAP }        from '@/hooks/useGSAP'
import { gsap }           from '@/lib/gsap'

/* ─── Data ─────────────────────────────────────────────────── */

const REASONS = [
  {
    num: '01',
    title: 'Access to Remote Locations',
    desc: 'Areas that need to be reforested can often be hard to access — dangerous to people traveling on foot or by vehicle. With conservation drones, they become much easier to reach. Drones are also capable of more than surveying and mapping; they can even deliver critical supplies to trapped people after natural disasters.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="9" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M14 8 L14 14 L18 16" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="1.5" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Vastly Improved Carbon Sequestration',
    desc: 'Drones can seed fast-growing plants that help regrow forest cover in denuded areas. Many environmental groups use drone seeding in reforestation efforts. Planting seeds faster means they grow more quickly — improving the ability of forests to absorb carbon from the atmosphere, especially from man-made emissions.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 22 L14 12" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M14 12 Q14 6 8 6 Q8 12 14 12" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" fill="rgba(0,212,255,0.1)" />
        <path d="M14 15 Q14 9 20 9 Q20 15 14 15" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" fill="rgba(0,212,255,0.1)" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Mitigating Natural Disasters',
    desc: 'With a drone for environmental monitoring, forestry teams and environmental organizations can assess areas prone to natural disasters. Flash floods and landslides can be prevented through reforesting and environmental impact assessments — drone services are excellent tools for both.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 5 L16.5 10 L22 10.8 L18 14.6 L19 20 L14 17.3 L9 20 L10 14.6 L6 10.8 L11.5 10 Z" stroke="#00d4ff" strokeWidth={1.3} strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'More Accurate Land Mapping',
    desc: 'Conservation drones are critical for land mapping and data collection. Using technologies from photogrammetry to LiDAR, they identify high-risk and reforestation areas, monitor environmental factors and pollution sources, and track ongoing conservation progress — including forest regrowth rates and wildlife habitats.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M3 10 L25 10M3 18 L25 18M11 3 L11 25M19 3 L19 25" stroke="#00d4ff" strokeWidth={0.7} opacity={0.35} />
        <circle cx="9" cy="14" r="2" stroke="#00d4ff" strokeWidth={1.1} />
        <circle cx="19" cy="8" r="1.5" fill="#00d4ff" opacity={0.7} />
        <path d="M9 14 L19 8" stroke="#00d4ff" strokeWidth={0.9} strokeDasharray="2 2" opacity={0.5} />
      </svg>
    ),
  },
]

const LAND_MAPPING_ITEMS = [
  { label: 'High-Risk Area Identification', desc: 'Identify environmental hazards and potential reforestation zones using precise mapping data.' },
  { label: 'Pollution Source Monitoring',    desc: 'Detect and monitor pollution sources in real time across large protected areas.' },
  { label: 'Progress Tracking',             desc: 'Monitor forest regrowth rates, wildlife habitats, and conservation milestones over time.' },
]

const BENEFITS = [
  {
    title: 'Environmental Monitoring',
    desc: 'Drones with high-resolution cameras create detailed maps of natural habitats and can patrol protected areas for illegal loggers or poachers. Environmental Monitoring Photogrammetry provides accurate, real-time data for better conservation decisions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <circle cx="12" cy="12" r="8" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M12 5 Q15 9 12 12 Q9 9 12 5" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" fill="rgba(0,212,255,0.15)" />
        <path d="M4 12 Q8 10 12 12 Q16 14 20 12" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Firefighting Support',
    desc: 'Drones can scout forest fires and help firefighters coordinate their efforts more effectively. They are faster and cheaper compared to helicopters, providing real-time situational awareness during active fire events.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M12 21 C8 21 5 18 5 14 C5 10 8 8 10 6 C10 9 12 10 12 10 C12 10 15 8 14 4 C17 6 19 10 19 14 C19 18 16 21 12 21Z" stroke="#00d4ff" strokeWidth={1.3} strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <path d="M12 17 C10.5 17 9 16 9 14 C9 12.5 10 11.5 11 11 C11 12 12 12.5 12 12.5 C12 12.5 13.5 11.5 13 10 C14.5 11 15 12.5 15 14 C15 16 13.5 17 12 17Z" stroke="#00d4ff" strokeWidth={1.1} fill="rgba(0,212,255,0.1)" />
      </svg>
    ),
  },
  {
    title: 'Insect Management',
    desc: 'Higher-than-average temperatures lead to growth in insect populations, including agricultural pests and mosquitoes. Drones can precisely spray pesticides to mitigate their numbers across large areas efficiently.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <circle cx="12" cy="12" r="4" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M12 4 L12 8M12 16 L12 20M4 12 L8 12M16 12 L20 12" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M6.3 6.3 L9.2 9.2M14.8 14.8 L17.7 17.7M6.3 17.7 L9.2 14.8M14.8 9.2 L17.7 6.3" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.55} />
      </svg>
    ),
  },
  {
    title: 'Sustainable Agriculture',
    desc: 'A drone for environmental monitoring can promote sustainable agriculture by helping farmers track under-watered or over-watered areas — reducing waste, cutting chemical use, and supporting greener farming practices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M12 20 L12 12" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" />
        <path d="M12 12 Q12 6 6 6 Q6 12 12 12" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" fill="rgba(0,212,255,0.1)" />
        <path d="M12 15 Q12 9 18 9 Q18 15 12 15" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" fill="rgba(0,212,255,0.1)" />
        <path d="M5 20 L19 20" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    title: 'Wildlife Conservation',
    desc: 'Drones with high-resolution and thermal cameras can track and monitor wildlife populations from a safe distance. Drone data helps map migratory routes, monitor habitats, and protect endangered species without disturbing them.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M12 4 C9 4 7 6 7 8 C7 11 10 13 12 16 C14 13 17 11 17 8 C17 6 15 4 12 4Z" stroke="#00d4ff" strokeWidth={1.3} strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <circle cx="12" cy="8" r="2" stroke="#00d4ff" strokeWidth={1.1} />
        <path d="M7 20 Q12 17 17 20" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
]

/* ─── Helpers ───────────────────────────────────────────────── */

function SectionDivider() {
  return <div className="w-12 h-px my-5" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)' }} />
}

/* ─── Main ──────────────────────────────────────────────────── */

export function EnvSections() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = (trigger: string, start = 'top 72%') => ({
      scrollTrigger: { trigger, start, once: true },
    })

    /* 1 — Overview: feature items slide from right */
    gsap.fromTo('.env-feat-item',
      { x: 40, opacity: 0, filter: 'blur(4px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out', stagger: 0.1, ...st('.env-feat-item') }
    )

    /* 2 — Reasons: cards fly up, icons pop then glow */
    gsap.fromTo('.env-reason-card',
      { y: 45, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12, ...st('.env-reason-card') }
    )
    gsap.fromTo('.env-reason-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.14, delay: 0.2, ...st('.env-reason-card') }
    )
    gsap.to('.env-reason-icon', {
      boxShadow: '0 0 20px rgba(0,212,255,0.35), 0 0 8px rgba(0,212,255,0.2)',
      duration: 1.6, yoyo: true, repeat: -1, stagger: 0.5, ease: 'sine.inOut', delay: 1,
    })

    /* 2b — Land mapping sub-items */
    gsap.fromTo('.env-map-item',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, ...st('.env-map-item') }
    )

    /* 3 — Benefits: clip-path reveal */
    gsap.fromTo('.env-benefit-card',
      { clipPath: 'inset(35% 0 0 0 round 16px)', opacity: 0 },
      { clipPath: 'inset(0% 0 0 0 round 16px)', opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, ...st('.env-benefit-card') }
    )
    gsap.fromTo('.env-benefit-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.1, delay: 0.15, ...st('.env-benefit-card') }
    )

    /* Conclusion dividers */
    gsap.fromTo('.env-concl-line',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12, ...st('.env-concl-line') }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>

      {/* ── 1. Overview ── */}
      <SectionWrapper id="overview" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <FadeIn direction="right">
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Environmental Monitoring Photogrammetry</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Conservation Drones That{' '}
                <span style={{ color: '#00d4ff' }}>Address Climate Change</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>Environmental monitoring and conservation drone addressing climate change is a challenge that requires many solutions to work at the same time — from regular environmental monitoring to forest preservation and reforestation. Yet environmentalists and conservation organizations often face barriers of time and labor costs.</p>
                <p>This is where Environmental Monitoring Photogrammetry with drones comes in. Drones equipped with these capabilities provide efficient, high-quality data collection for better decision-making and more effective conservation efforts across even the most remote and challenging terrain.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Real-Time Aerial Data',    desc: 'Capture field intelligence across vast areas in a single mission' },
                  { label: 'Photogrammetric Mapping',  desc: 'Generate accurate 2D maps and 3D models of natural habitats' },
                  { label: 'Multi-Sensor Payloads',    desc: 'Multispectral, thermal, and LiDAR sensors on one adaptable platform' },
                  { label: 'Rapid Deployment',         desc: 'Respond to environmental events faster than any ground-based team' },
                ].map((item) => (
                  <div key={item.label} className="env-feat-item flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}>
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

      {/* ── 2. 4 Reasons ── */}
      <SectionWrapper id="reasons" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Why Choose a Drone?</p>
            <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              4 Reasons to Choose Drones for{' '}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, rgba(0,212,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Environmental Monitoring
              </span>
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540, lineHeight: 1.7 }}>
              Drones are incredibly versatile tools used across many industries. Here are the best reasons why organizations should invest in drones for reforestation and environmental monitoring.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {REASONS.map((r) => (
              <div key={r.num}
                className="env-reason-card group p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="env-reason-icon flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                    {r.icon}
                  </div>
                  <div>
                    <span className="font-mono font-bold" style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: '0.1em' }}>{r.num}</span>
                    <h3 className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{r.title}</h3>
                  </div>
                </div>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{r.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.3), transparent)' }} />
              </div>
            ))}
          </div>

          {/* Land mapping sub-items */}
          <FadeIn delay={0.2}>
            <div className="mt-8 p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <p className="font-mono font-bold uppercase tracking-[0.2em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Precision Land Mapping Enables</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {LAND_MAPPING_ITEMS.map((item) => (
                  <div key={item.label} className="env-map-item flex items-start gap-3" style={{ opacity: 0 }}>
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
                    <div>
                      <p className="font-sans font-semibold text-white mb-1" style={{ fontSize: '0.875rem' }}>{item.label}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.55 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* ── 3. Key Benefits ── */}
      <SectionWrapper id="benefits" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container>
          <FadeIn className="mb-12">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Key Benefits</p>
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                How Environmental Drones{' '}
                <span style={{ color: '#00d4ff' }}>Address Climate Change</span>
              </h2>
              <SectionDivider />
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Drones are versatile tools that can be used for nearly any industry. Environmental Monitoring Photogrammetry services can help tackle the many issues that cause deforestation — from logging to wildfires and invasive species — across five critical areas of action.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title}
                className="env-benefit-card p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="env-benefit-icon w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                  {b.icon}
                </div>
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{b.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{b.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.25), transparent)' }} />
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 4. Conclusion ── */}
      <SectionWrapper id="conclusion" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container size="md">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="env-concl-line h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))', transformOrigin: 'left center' }} />
              <span className="font-mono font-bold uppercase tracking-[0.28em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Our Commitment</span>
              <div className="env-concl-line h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))', transformOrigin: 'right center' }} />
            </div>
            <FadeIn>
              <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Precision Technology for a{' '}
                <span style={{ color: '#00d4ff' }}>Healthier Planet</span>
              </h2>
            </FadeIn>
            <div className="w-12 h-px mx-auto my-6" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5), transparent)' }} />
            <FadeIn delay={0.1}>
              <p className="font-sans text-text-muted mx-auto leading-relaxed" style={{ fontSize: '1rem', maxWidth: 620, lineHeight: 1.75 }}>
                ZenaDrone systems give conservation teams the tools to work smarter and faster — mapping habitats, monitoring reforestation, tracking wildlife, and responding to environmental threats before they escalate. By replacing time-consuming manual surveys with precise aerial intelligence, we help organizations focus their energy where it matters most: protecting the planet for future generations.
              </p>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

    </div>
  )
}
