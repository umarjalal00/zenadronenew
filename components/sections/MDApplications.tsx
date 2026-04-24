'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap }    from '@/lib/gsap'

const APPLICATIONS = [
  {
    num: '01',
    title: 'Real-Time Reconnaissance & Surveillance',
    desc: 'The ZenaDrone 1000 is designed for up to 1-hour autonomous flight time, equipped with high-resolution cameras and multispectral sensors — ideal for intelligence gathering, border patrol, target tracking, and surveillance missions.',
    tags: ['ISR Missions', 'Border Patrol', 'Target Tracking', 'Surveillance'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx="16" cy="16" r="8" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <circle cx="16" cy="16" r="3.5" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="16" cy="16" r="1.4" fill="#00d4ff" opacity={0.85} />
        <path d="M16 5v4M16 23v4M5 16h4M23 16h4" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M8.5 8.5 L10.5 10.5M21.5 21.5 L23.5 23.5M8.5 23.5 L10.5 21.5M21.5 10.5 L23.5 8.5" stroke="#00d4ff" strokeWidth={0.8} strokeLinecap="round" opacity={0.25} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Tactical Decision-Making Support',
    desc: 'Live data streaming allows commanders to make informed decisions in real-time. The drone\'s terrain-mapping and object-recognition capabilities give forces a strategic advantage during mission planning and execution.',
    tags: ['Live Data Stream', 'Terrain Mapping', 'Object Recognition', 'Command Support'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <rect x="4" y="5" width="24" height="18" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M8 19 L12 13 L16 16 L20 10 L24 14" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="2" fill="#00d4ff" opacity={0.8} />
        <line x1="4" y1="9" x2="28" y2="9" stroke="#00d4ff" strokeWidth={0.6} opacity={0.3} />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Post-Conflict Damage Assessment',
    desc: 'ZenaDrone 1000 safely evaluates war zones using aerial imaging and remote sensing, identifying structural damage, unexploded ordnance, and hazardous zones — crucial for recovery and humanitarian operations.',
    tags: ['Aerial Imaging', 'UXO Detection', 'Zone Mapping', 'Humanitarian Ops'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx="16" cy="16" r="11" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M5 16 Q9 11 16 16 Q23 21 27 16" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="16" y1="5" x2="16" y2="27" stroke="#00d4ff" strokeWidth={0.8} opacity={0.3} />
        <path d="M13 12 L14.5 13.5 L19 9" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Search, Rescue & Logistics',
    desc: 'From locating missing personnel to delivering critical supplies to inaccessible regions, ZenaDrone 1000 enhances operational reach in both combat and humanitarian missions with speed and reliability.',
    tags: ['Personnel Recovery', 'Supply Delivery', 'SAR Missions', 'Logistic Support'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <circle cx="10" cy="12" r="5" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M3 28 C3 23 6.5 20 10 20 C13.5 20 17 23 17 28" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M22 10 L28 10 M25 7 L25 13" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M20 16 L28 16 M20 20 L28 20 M20 24 L26 24" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.45} />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Counter-Drone & Electronic Warfare',
    desc: 'Designed to support payloads for jamming and neutralisation, ZenaDrone 1000 offers a tactical advantage in disabling enemy drones and disrupting hostile communications infrastructure.',
    tags: ['Drone Jamming', 'EW Payloads', 'Comms Disruption', 'C-UAS'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={26} height={26}>
        <path d="M7 10 Q16 4 25 10" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" opacity={0.5} />
        <path d="M10 14 Q16 9 22 14" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" opacity={0.7} />
        <path d="M13 18 Q16 15.5 19 18" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <circle cx="16" cy="22" r="2.5" fill="#00d4ff" opacity={0.9} />
        <line x1="5" y1="5" x2="27" y2="27" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.3} />
      </svg>
    ),
  },
]

export function MDApplications() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.mda-num',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="applications" className="relative w-full bg-background py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />

      <div className="absolute right-0 top-1/3 pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%' }} />
      <div className="absolute left-0 bottom-1/4 pointer-events-none" style={{ width: 400, height: 400, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Strategic Applications</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Defense Operations<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Capabilities
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540, lineHeight: 1.7 }}>
            ZenaDrone 1000 is built to answer the challenges of tomorrow — advancing autonomous intelligence across five critical defense applications.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.07} className="flex flex-col gap-4">
          {APPLICATIONS.map((app, i) => (
            <motion.div key={app.num} variants={itemVariants}
              className="group relative p-6 md:p-7 rounded-2xl transition-all duration-300"
              style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.boxShadow = '0 0 45px rgba(0,212,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                {/* Left: num + icon */}
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 md:w-20 flex-shrink-0">
                  <span className="mda-num font-mono font-bold" style={{ fontSize: '2.2rem', color: 'rgba(0,212,255,0.18)', letterSpacing: '-0.06em', lineHeight: 1, opacity: 0 }}>
                    {app.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.22)' }}>
                    {app.icon}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.2) 20%, rgba(0,212,255,0.2) 80%, transparent)' }} />

                {/* Right: content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', letterSpacing: '-0.015em' }}>{app.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {app.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg font-mono" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)', fontSize: '0.65rem', color: '#00d4ff' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>{app.desc}</p>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.45), transparent)' }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  )
}
