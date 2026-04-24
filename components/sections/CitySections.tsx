'use client'

import { useRef } from 'react'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { useGSAP }        from '@/hooks/useGSAP'
import { gsap }           from '@/lib/gsap'

/* ─── Data ─────────────────────────────────────────────────── */

const OVERVIEW_FEATURES = [
  { label: 'Aerial GIS Data',        desc: 'Rich spatial datasets for accurate city modelling and infrastructure planning.' },
  { label: '360° City View',         desc: 'Immersive all-angle imagery that maps structures, terrain, and urban systems.' },
  { label: '3D Construction Mapping', desc: 'Generate precise 3D models for construction planning and site analysis.' },
  { label: 'Multispectral Sensing',   desc: 'Evaluate environmental conditions across vegetation, pollution, and water.' },
]

const CAPABILITIES = [
  {
    num: '01',
    title: 'Access Hard-to-Reach Areas',
    desc: 'Drones can reach areas that are hard to access or even dangerous for human beings and perform inspections without being physically present at the scene. This directly improves the safety and effectiveness of urban planning procedures.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M14 4 L14 10M14 18 L14 24M4 14 L10 14M18 14 L24 14" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <circle cx="14" cy="14" r="5" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <circle cx="14" cy="14" r="1.5" fill="#00d4ff" opacity={0.9} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Environmental Condition Monitoring',
    desc: 'Multispectral sensors collect information through different wavelengths of light, offering data on vegetation conditions, pollution levels, and water quality. This information is critical for land use, resource allocation, and environmental decision-making.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M3 10 L25 10M3 18 L25 18M11 3 L11 25M19 3 L19 25" stroke="#00d4ff" strokeWidth={0.7} opacity={0.35} />
        <path d="M7 17 L10 13 L13 15 L16 10 L21 12" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="12" r="1.6" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Pre-Set Mission Delivery',
    desc: 'Urban planning drones are primarily deployable with pre-set missions that require minimal re-planning. Built to handle different weather conditions, they remain reliable tools throughout every phase of city planning — from initial surveys to ongoing monitoring.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M6 14 L22 14" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M6 9 L16 9" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.6} />
        <path d="M6 19 L19 19" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.6} />
        <circle cx="22" cy="14" r="3" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.08)" />
        <circle cx="22" cy="14" r="1" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
]

const MAPPING_ITEMS = [
  'Vegetation conditions and urban green space assessment',
  'Air quality and pollution source identification',
  'Water body and drainage system analysis',
  'Land use classification and zoning data',
  'Environmental impact evaluations',
  'Resource allocation and infrastructure planning',
]

const ZENADRONE_CAPABILITIES = [
  {
    title: 'High-Resolution Capture',
    desc: 'Captures detailed aerial imagery at city scale — from large construction projects to precise site inspections.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="7" width="20" height="14" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <circle cx="14" cy="14" r="4" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="14" cy="14" r="1.5" fill="#00d4ff" opacity={0.8} />
        <path d="M18 7 L20 4 L24 4" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    title: 'Multispectral Data Collection',
    desc: 'Sensors gather environmental intelligence beyond visible light — monitoring health, pollution, and ecological conditions simultaneously.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="8" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M6 14 Q10 10 14 14 Q18 18 22 14" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" />
        <path d="M6 10 Q10 6 14 10 Q18 14 22 10" stroke="#00d4ff" strokeWidth={0.9} strokeLinecap="round" opacity={0.45} />
        <path d="M6 18 Q10 14 14 18 Q18 22 22 18" stroke="#00d4ff" strokeWidth={0.9} strokeLinecap="round" opacity={0.45} />
      </svg>
    ),
  },
  {
    title: 'Stable Extended Flights',
    desc: 'Purpose-built airframe delivers the stability and endurance needed to support large-scale city planning surveys and ongoing monitoring missions.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M4 18 Q9 10 14 14 Q19 18 24 10" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="10" r="2" stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.1)" />
        <path d="M4 22 L24 22" stroke="#00d4ff" strokeWidth={0.8} strokeLinecap="round" opacity={0.25} />
      </svg>
    ),
  },
]

/* ─── Helpers ───────────────────────────────────────────────── */

function SectionDivider() {
  return <div className="w-12 h-px my-5" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)' }} />
}

/* ─── Main ──────────────────────────────────────────────────── */

export function CitySections() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = (trigger: string, start = 'top 72%') => ({
      scrollTrigger: { trigger, start, once: true },
    })

    /* 1 — Overview: features slide in from right with blur-clear */
    gsap.fromTo('.city-feat-item',
      { x: 40, opacity: 0, filter: 'blur(4px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out', stagger: 0.1, ...st('.city-feat-item') }
    )

    /* 2 — Capabilities: cards fly up, icons pop then glow */
    gsap.fromTo('.city-cap-card',
      { y: 45, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12, ...st('.city-cap-card') }
    )
    gsap.fromTo('.city-cap-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.14, delay: 0.2, ...st('.city-cap-card') }
    )
    gsap.to('.city-cap-icon', {
      boxShadow: '0 0 20px rgba(0,212,255,0.35), 0 0 8px rgba(0,212,255,0.2)',
      duration: 1.6, yoyo: true, repeat: -1, stagger: 0.5, ease: 'sine.inOut', delay: 1,
    })

    /* 3 — Mapping: list items slide in from left, checks spring */
    gsap.fromTo('.city-map-item',
      { x: -35, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.09, ...st('.city-map-item') }
    )
    gsap.fromTo('.city-map-dot',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.5)', stagger: 0.09, delay: 0.1, ...st('.city-map-item') }
    )

    /* 4 — ZenaDrone capabilities: clip-path reveal */
    gsap.fromTo('.city-zen-card',
      { clipPath: 'inset(35% 0 0 0 round 16px)', opacity: 0 },
      { clipPath: 'inset(0% 0 0 0 round 16px)', opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12, ...st('.city-zen-card') }
    )
    gsap.fromTo('.city-zen-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.12, delay: 0.15, ...st('.city-zen-card') }
    )

    /* Conclusion: dividers expand */
    gsap.fromTo('.city-concl-line',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.12, ...st('.city-concl-line') }
    )
    gsap.fromTo('.city-concl-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.out', transformOrigin: 'center', ...st('.city-concl-divider') }
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
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Advancing Urban Planning</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Drone City Technology{' '}
                <span style={{ color: '#00d4ff' }}>Reshaping Urban Design</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>Today, city planning has received a significant boost through the use of modern drones. The idea of a drone city is no longer a mere concept — enhanced features of current smart drones have made it a reality. Smart drones are critical assets in the planning and GIS professionals&apos; toolkit.</p>
                <p>These cutting-edge tools offer different aerial views and collect valuable information for urban design. Equipped with high-performance cameras and state-of-the-art sensors, they deliver an immersive 360-degree studio tour view of the city — data that is directly useful in 3D construction and exploring city structure and system arrangement.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="grid grid-cols-1 gap-3">
                {OVERVIEW_FEATURES.map((item) => (
                  <div key={item.label} className="city-feat-item flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}>
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

      {/* ── 2. Drones for City Planning ── */}
      <SectionWrapper id="capabilities" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Drones for City Planning</p>
            <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Reconfiguring{' '}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, rgba(0,212,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Urban Engagement
              </span>
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540, lineHeight: 1.7 }}>
              The concept of a city of drones captures how these technologies are reconfiguring our engagement with the urban environment — improving safety, accuracy, and efficiency at every stage.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5">
            {CAPABILITIES.map((c) => (
              <div key={c.num}
                className="city-cap-card group p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="city-cap-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                  {c.icon}
                </div>
                <span className="font-mono font-bold" style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.1em' }}>{c.num}</span>
                <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{c.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{c.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.3), transparent)' }} />
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 3. Urban Drone Mapping ── */}
      <SectionWrapper id="mapping" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
            <FadeIn direction="right">
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Using Urban Drones for Mapping</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Multispectral Intelligence{' '}
                <span style={{ color: '#00d4ff' }}>for Smarter Cities</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>Multispectral sensors evaluate environmental conditions — an attribute of many urban drones. These sensors collect information through different wavelengths of light, offering data on vegetation conditions, pollution, and water. This information is critical in land use, resource management, and environmental decision-making.</p>
                <p>It is also notably convenient to use urban planning drones for delivering information and goods. These devices come with pre-set missions that require minimal planning, are durable enough to handle different weather conditions, and remain valuable throughout ongoing city planning.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <p className="font-mono font-bold uppercase tracking-[0.2em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Mapping Capabilities</p>
                <div className="flex flex-col gap-3.5">
                  {MAPPING_ITEMS.map((item) => (
                    <div key={item} className="city-map-item flex items-start gap-3" style={{ opacity: 0 }}>
                      <div className="city-map-dot flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.28)', opacity: 0 }}>
                        <svg viewBox="0 0 10 10" fill="none" width={8} height={8}>
                          <path d="M2 5 L4.5 7.5 L8.5 2.5" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 4. Why ZenaDrone 1000 ── */}
      <SectionWrapper id="zenadrone" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="mb-12">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Why Choose ZenaDrone 1000?</p>
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Built for{' '}
                <span style={{ color: '#00d4ff' }}>Urban Planning Demands</span>
              </h2>
              <SectionDivider />
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                The ZenaDrone 1000 is ideal for agencies to fully realize drone technology&apos;s capabilities in city planning. This sophisticated drone can capture high-resolution images and data, perform multispectral collection, and remain stable enough to support extensive city planning — from massive construction projects to specific environmental surveys.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {ZENADRONE_CAPABILITIES.map((z) => (
              <div key={z.title}
                className="city-zen-card p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(0,212,255,0.15)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="city-zen-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                  {z.icon}
                </div>
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{z.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{z.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.3), transparent)' }} />
              </div>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <span className="font-semibold text-white">Using ZenaDrone 1000 in your urban planning approach</span> means more accurate information, faster work, and well-thought-out decisions. Discover the possibilities of the ZenaDrone 1000 and learn how it can complement your strategies for planning and executing city growth.
              </p>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* ── 5. Conclusion ── */}
      <SectionWrapper id="conclusion" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container size="md">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="city-concl-line h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))', transformOrigin: 'left center' }} />
              <span className="font-mono font-bold uppercase tracking-[0.28em]" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>The Future of Cities</span>
              <div className="city-concl-line h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))', transformOrigin: 'right center' }} />
            </div>
            <FadeIn>
              <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                From Ground-Level Surveys to{' '}
                <span style={{ color: '#00d4ff' }}>Intelligent City Intelligence</span>
              </h2>
            </FadeIn>
            <div className="city-concl-divider w-12 h-px mx-auto my-6" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5), transparent)' }} />
            <FadeIn delay={0.1}>
              <p className="font-sans text-text-muted mx-auto leading-relaxed" style={{ fontSize: '1rem', maxWidth: 620, lineHeight: 1.75 }}>
                Smart drones are transforming the way cities are planned, built, and managed. With the ZenaDrone 1000, urban planners gain accurate data faster, make better-informed decisions, and execute more effective city growth strategies. This is how the future of urban planning gets built — from the sky down.
              </p>
            </FadeIn>
          </div>
        </Container>
      </SectionWrapper>

    </div>
  )
}
