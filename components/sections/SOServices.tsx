'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap }    from '@/lib/gsap'

const SERVICE_TYPES = [
  {
    title: 'Aerial Photography',
    desc: 'Captivating high-resolution aerial photos for real estate, events, marketing campaigns, and architectural documentation.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="3" y="7" width="22" height="16" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <circle cx="14" cy="15" r="4.5" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="14" cy="15" r="1.8" fill="#00d4ff" opacity={0.8} />
        <rect x="18" y="5" width="4" height="3" rx="0.8" stroke="#00d4ff" strokeWidth={1} opacity={0.4} />
      </svg>
    ),
    tag: 'High Resolution',
  },
  {
    title: 'Video Capturing',
    desc: 'Cinematic aerial video footage for productions, inspections, events, and property showcases — delivered in 4K.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="2" y="7" width="16" height="14" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M18 11 L26 8 L26 20 L18 17 Z" stroke="#00d4ff" strokeWidth={1.2} strokeLinejoin="round" fill="rgba(0,212,255,0.05)" />
      </svg>
    ),
    tag: '4K Quality',
  },
  {
    title: 'Field Scanning',
    desc: 'Data-driven aerial scans for agriculture, construction, environmental monitoring, and infrastructure assessment.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M3 20 L9 12 L14 16 L19 9 L25 15" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 22 L25 22" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.35} />
        <circle cx="19" cy="9" r="2.5" stroke="#00d4ff" strokeWidth={1.2} />
      </svg>
    ),
    tag: 'Multi-spectral',
  },
  {
    title: 'Event Coverage',
    desc: 'Spectacular aerial perspective for weddings, concerts, sports events, and corporate gatherings — available on demand.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M14 8v6l4 2" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 14 Q8 20 14 22 Q20 20 20 14" stroke="#00d4ff" strokeWidth={0.8} strokeLinecap="round" opacity={0.3} />
      </svg>
    ),
    tag: 'On Demand',
  },
  {
    title: 'Data Collection',
    desc: 'Precision aerial data acquisition for mapping, LiDAR surveys, 3D modelling, and infrastructure documentation.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="5" width="20" height="16" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M8 17 L11 12 L14.5 14.5 L17 10 L20 13" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="13" r="1.8" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
    tag: 'AI-Processed',
  },
  {
    title: 'Routine Inspections',
    desc: 'Scheduled recurring aerial inspections for utilities, infrastructure, agriculture, and facility management programs.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="4" width="20" height="20" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <line x1="4" y1="10" x2="24" y2="10" stroke="#00d4ff" strokeWidth={0.8} opacity={0.4} />
        <line x1="9" y1="2" x2="9" y2="6" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="19" y1="2" x2="19" y2="6" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M10 16 L12.5 18.5 L18.5 12.5" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'Scheduled',
  },
]

const QUICK_STATS = [
  { value: 'Daily',   label: 'Service Frequency'  },
  { value: 'Weekly',  label: 'Subscription Plans' },
  { value: 'Monthly', label: 'Recurring Options'  },
]

export function SOServices() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.sos-stat',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-24 md:py-32 bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)', boxShadow: '0 0 12px rgba(0,212,255,0.1)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>What We Offer</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Scanning, Photography<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              &amp; Video Capturing
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.7 }}>
            Elevate your vision with ZenaDrone. From captivating aerial photos to data-driven insights, we offer tailored solutions — available daily, weekly, or monthly at your command.
          </p>
        </FadeIn>

        {/* Frequency pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {QUICK_STATS.map(s => (
            <div key={s.label} className="sos-stat flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
              <span className="font-display font-bold" style={{ fontSize: '1.05rem', color: '#00d4ff', letterSpacing: '-0.02em' }}>{s.value}</span>
              <span className="font-mono text-text-muted tracking-[0.12em]" style={{ fontSize: '0.7rem' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <StaggerChildren staggerDelay={0.07} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICE_TYPES.map(s => (
            <motion.div key={s.title} variants={itemVariants}
              className="group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.32)'; e.currentTarget.style.boxShadow = '0 0 38px rgba(0,212,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.22)' }}>
                {s.icon}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.66rem', color: '#00d4ff' }}>{s.tag}</span>
              </div>
              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.855rem' }}>{s.desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  )
}
