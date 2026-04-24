'use client'

import { useRef } from 'react'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { useGSAP }        from '@/hooks/useGSAP'
import { gsap }           from '@/lib/gsap'

/* ─── Data ─────────────────────────────────────────────────── */

const USES = [
  {
    num: '01',
    title: 'Mapping Fields',
    desc: 'Drones create accurate 3D maps of farmland that farmers use to plan planting, drainage, and irrigation layouts with surgical precision.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M3 10 L25 10M3 18 L25 18M11 3 L11 25M19 3 L19 25" stroke="#00d4ff" strokeWidth={0.7} opacity={0.35} />
        <circle cx="14" cy="14" r="3" stroke="#00d4ff" strokeWidth={1.3} />
        <circle cx="14" cy="14" r="1" fill="#00d4ff" opacity={0.9} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Crop Health Monitoring',
    desc: 'With multispectral cameras, drones track plant growth, detect diseases, and measure crop health across entire fields in minutes.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="9" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M14 6 Q17 10 14 14 Q11 10 14 6" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" fill="rgba(0,212,255,0.15)" />
        <path d="M5 14 Q9 11 14 14 Q19 17 23 14" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Spraying & Spreading',
    desc: 'Drones spray fertilizers, pesticides, or water with precise targeting — applying exactly the right amount in the right spot to prevent waste.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M7 8 L7 20 L21 20 L21 8" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" fill="rgba(0,212,255,0.06)" />
        <line x1="14" y1="5" x2="14" y2="8" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M9 20 L9 23M14 20 L14 24M19 20 L19 23" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <path d="M9 13 Q14 11 19 13" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" opacity={0.5} />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Growth Tracking',
    desc: 'Drones take regular images over time, giving farmers a clear record of crop progress from germination through to harvest.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="5" width="20" height="16" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M7 17 L10 12 L13.5 15 L17 10 L21 13" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="13" r="1.8" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
]

const BENEFITS = [
  { title: 'Rapid Field Scanning',        desc: 'Scan entire fields in minutes, giving farmers quick and accurate data to act on.' },
  { title: 'Cost Reduction',               desc: 'Cut operational costs through less fuel usage, fewer manual hours, and targeted inputs.' },
  { title: 'Early Disease Detection',      desc: 'Identify crop diseases before they spread, enabling timely interventions that protect yields.' },
  { title: 'Higher Crop Yields',           desc: 'Healthier, better-managed crops produce bigger harvests and greater seasonal revenue.' },
  { title: 'Environmental Sustainability', desc: 'Reduce water consumption, chemical use, and field waste for greener farming operations.' },
  { title: 'Precision Accuracy',           desc: 'Treat only affected areas — not entire fields — saving time, inputs, and resources.' },
]

const APPLICATIONS = [
  { title: 'Soil Analysis',        desc: 'Gather exact data on soil conditions and field layout before planting to enable better pre-season decisions.' },
  { title: 'Precision Seeding',    desc: 'Some drones plant seeds directly into the ground, reducing labor requirements and improving planting efficiency.' },
  { title: 'Irrigation Planning',  desc: 'Identify dry spots and moisture distribution across fields to optimize when and where crops receive water.' },
  { title: 'Targeted Input Spray', desc: 'Apply fertilizer, insecticides, and herbicides only where needed — eliminating guesswork and reducing waste.' },
  { title: 'Livestock Monitoring', desc: 'Track and monitor cattle from a safe distance without putting operators at risk of injury or illness.' },
  { title: 'Plant Water Stress',   desc: 'Detect water content in plants that standard aerial cameras miss — enabling smarter irrigation decisions.' },
]

const FUTURE = [
  'Longer battery life enabling missions that cover hundreds of acres in a single flight',
  'Greater payload capacity for seeds, pesticides, water tanks, and multi-sensor arrays',
  'Fully autonomous AI-driven drones that plant, monitor, water, and spray independently',
]

/* ─── Helpers ───────────────────────────────────────────────── */

function SectionDivider() {
  return <div className="w-12 h-px my-5" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.5), transparent)' }} />
}

/* ─── Main ──────────────────────────────────────────────────── */

export function AgriSections() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = (trigger: string, start = 'top 72%') => ({
      scrollTrigger: { trigger, start, once: true },
    })

    /* 1 — What Are Drones: feature items slide in from right */
    gsap.fromTo('.agri-feat-item',
      { x: 40, opacity: 0, filter: 'blur(4px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out', stagger: 0.1, ...st('.agri-feat-item') }
    )

    /* 2 — How Used: cards fly up, icons pop then glow */
    gsap.fromTo('.agri-use-card',
      { y: 45, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, ...st('.agri-use-card') }
    )
    gsap.fromTo('.agri-use-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.12, delay: 0.2, ...st('.agri-use-card') }
    )
    // Continuous icon glow pulse after entrance
    gsap.to('.agri-use-icon', {
      boxShadow: '0 0 20px rgba(0,212,255,0.35), 0 0 8px rgba(0,212,255,0.2)',
      duration: 1.6, yoyo: true, repeat: -1, stagger: 0.45, ease: 'sine.inOut', delay: 1,
    })

    /* 3 — Benefits: items stagger from right, check icons spring */
    gsap.fromTo('.agri-ben-item',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, ...st('.agri-ben-item') }
    )
    gsap.fromTo('.agri-ben-check',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.07, delay: 0.15, ...st('.agri-ben-item') }
    )

    /* 4 — Applications: clip-path reveal from bottom */
    gsap.fromTo('.agri-app-card',
      { clipPath: 'inset(35% 0 0 0 round 16px)', opacity: 0 },
      { clipPath: 'inset(0% 0 0 0 round 16px)', opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.09, ...st('.agri-app-card') }
    )

    /* 5 — Services: list items slide from left, checks spring */
    gsap.fromTo('.agri-svc-item',
      { x: -35, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, ...st('.agri-svc-item') }
    )
    gsap.fromTo('.agri-svc-check',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.5)', stagger: 0.1, delay: 0.1, ...st('.agri-svc-item') }
    )

    /* 6 — Future: cards slide up */
    gsap.fromTo('.agri-fut-card',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.12, ...st('.agri-fut-card') }
    )

  }, { scope: containerRef })

  return (
    <div ref={containerRef}>

      {/* ── 1. What Are Agriculture Drones? ── */}
      <SectionWrapper id="what-are-drones" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
            <FadeIn direction="right">
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>What Are Agriculture Drones?</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                More Than a Flying Machine —{' '}
                <span style={{ color: '#00d4ff' }}>A Trusted Farming Partner</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>A drone for agriculture is more than just a flying machine engineered to help farming. Unlike regular drones used for recreation, UAV drone agriculture tools come with specialized cameras, sensors, and sprayers that capture real-time images, scan wide fields in minutes, and complete tasks that would normally take farmers many hours to finish by hand.</p>
                <p>Instead of spending hours walking across hundreds of acres, farmers can simply launch an agricultural drone and get a full view of their fields in just minutes. Certain models are powerful enough to detect disease in individual plants — enabling early intervention that prevents issues from spreading across entire fields.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Real-Time Imaging',    desc: 'Capture high-resolution field imagery in a single flight' },
                  { label: 'Individual Plant Scan', desc: 'Detect disease and stress at the individual plant level' },
                  { label: 'Sensor Payloads',       desc: 'Multispectral, thermal, and LiDAR sensors on one platform' },
                  { label: 'Minutes, Not Hours',    desc: 'Cover what once took a full day in a single drone flight' },
                ].map((item) => (
                  <div key={item.label} className="agri-feat-item flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}>
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

      {/* ── 2. How Are Drones Used in Agriculture? ── */}
      <SectionWrapper id="how-used" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="text-center mb-14">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>How Are Drones Used in Agriculture?</p>
            <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Four Core Ways Drones{' '}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, rgba(0,212,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Change Farming
              </span>
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
              Farmers rely on UAV technology for a wide range of daily tasks. Each use case saves time, reduces waste, and delivers measurable improvements to crop outcomes.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {USES.map((u) => (
              <div key={u.num}
                className="agri-use-card group p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="agri-use-icon flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                    {u.icon}
                  </div>
                  <div>
                    <span className="font-mono font-bold" style={{ fontSize: '0.65rem', color: 'rgba(0,212,255,0.45)', letterSpacing: '0.1em' }}>{u.num}</span>
                    <h3 className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{u.title}</h3>
                  </div>
                </div>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{u.desc}</p>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.3), transparent)' }} />
              </div>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <span className="font-semibold text-white">One clear example</span> of how drones are used for agricultural purposes is in detecting early signs of pest damage in a small section of the field that might otherwise go unnoticed. Farm operators can then treat only the affected spots instead of spraying the entire crop — saving both time and resources. Work that once required days of walking and close inspection can now be completed in a single drone flight.
              </p>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

      {/* ── 3. Benefits of Agricultural UAVs ── */}
      <SectionWrapper id="benefits" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <FadeIn>
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Benefits</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Why More Farmers Are{' '}
                <span style={{ color: '#00d4ff' }}>Choosing Drones</span>
              </h2>
              <SectionDivider />
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                These smart UAVs help farmers save time, cut costs, and make agriculture more sustainable. The main advantage lies in their precision — what if farmers had drones checking their fields every morning? Farming would quickly become faster, safer, and more efficient than ever before.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-3">
              {BENEFITS.map((b) => (
                <div key={b.title}
                  className="agri-ben-item flex items-start gap-3 p-4 rounded-xl transition-all duration-300"
                  style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.22)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  <div className="agri-ben-check flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
                    <svg viewBox="0 0 14 14" fill="none" width={11} height={11}>
                      <path d="M2.5 7 L5.5 10 L11.5 4" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white mb-1" style={{ fontSize: '0.9rem' }}>{b.title}</p>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.55 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 4. Agricultural Drone Applications ── */}
      <SectionWrapper id="applications" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="mb-12">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Agricultural Drone Applications</p>
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Flexible Technology That Supports{' '}
                <span style={{ color: '#00d4ff' }}>Every Area of the Farm</span>
              </h2>
              <SectionDivider />
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Agricultural drone applications go far beyond the standard benefits, showing how flexible the technology really is. Farmers can utilize drones to gather exact information about soil conditions and field layout before planting — supporting better, faster decisions. As drone AI continues to advance, farming becomes more accurate and less reliant on guesswork each season.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPLICATIONS.map((a) => (
              <div key={a.title}
                className="agri-app-card p-5 rounded-2xl transition-all duration-300"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(0,212,255,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div className="w-1.5 h-1.5 rounded-full mb-4" style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>{a.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.855rem', lineHeight: 1.65 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── 5. Explore Drone Services ── */}
      <SectionWrapper id="services" className="bg-surface">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 50%, transparent)' }} />
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
            <FadeIn direction="right">
              <p className="font-mono font-bold uppercase tracking-[0.28em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Explore Drone Services for Farmers</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                Professional Services,{' '}
                <span style={{ color: '#00d4ff' }}>Without the Overhead</span>
              </h2>
              <SectionDivider />
              <div className="font-sans text-text-muted leading-relaxed space-y-4" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                <p>Drones aren&apos;t necessary for all farmers to own outright. The widespread availability of agricultural drone services has brought the technology within reach of many operations without a large upfront investment. From piloting the drones to analyzing the data, professional services handle everything end-to-end.</p>
                <p>Some service providers even educate farmers on how to operate drones independently — meaning any farmer, regardless of operation size, can reap the full benefits of drone technology.</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
                <p className="font-mono font-bold uppercase tracking-[0.2em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>What You Get</p>
                <div className="flex flex-col gap-3.5">
                  {[
                    'Precise crop health assessments from certified operators',
                    'Detailed field maps ready for planning and analysis',
                    'Professional support for spraying, sowing, and monitoring',
                    'Lower cost than buying and maintaining your own drone',
                    'Flexible rental model — only pay for what you need',
                    'Ongoing farmer training programs for independent operation',
                  ].map((item) => (
                    <div key={item} className="agri-svc-item flex items-start gap-3" style={{ opacity: 0 }}>
                      <div className="agri-svc-check flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.28)', opacity: 0 }}>
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

      {/* ── 6. Future of Drone Technology ── */}
      <SectionWrapper id="future" className="bg-background">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.15) 50%, transparent)' }} />
        <Container>
          <FadeIn className="mb-12">
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Future of Drone Technology in Agriculture</p>
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                From Tractors to{' '}
                <span style={{ color: '#00d4ff' }}>Data-Driven Precision</span>
              </h2>
              <SectionDivider />
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Drone technology in agriculture is already advanced, but will only grow smarter with time. Companies like ZenaDrone are preparing for what&apos;s next — drones equipped with AI that can analyze data and make decisions independently, letting farmers focus on strategy while smart machines handle the repetitive work.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {FUTURE.map((item, i) => (
              <div key={i}
                className="agri-fut-card p-5 rounded-2xl h-full"
                style={{ background: 'var(--surface-card)', border: '1px solid rgba(0,212,255,0.15)', opacity: 0 }}
              >
                <span className="font-mono font-bold" style={{ fontSize: '1.6rem', color: 'rgba(0,212,255,0.15)', letterSpacing: '-0.06em', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-text-muted leading-relaxed mt-3" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{item}</p>
              </div>
            ))}
          </div>

          <FadeIn delay={0.25}>
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                The ZenaDrone 1000 is an example of a multi-function system that can check on crops, set up irrigation, and detect diseases — all on a single platform. Because of this shift, tractors and manual labor will no longer be the primary pillars of farming. Instead, farmers can focus on strategy since smart machines undertake the demanding routine tasks, protecting the land, using resources more efficiently, and growing more food.
              </p>
            </div>
          </FadeIn>
        </Container>
      </SectionWrapper>

    </div>
  )
}
