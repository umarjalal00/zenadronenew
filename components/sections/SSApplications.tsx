'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const APPLICATIONS = [
  {
    title: 'Search & Rescue Operations',
    desc: 'Police teams can coordinate with other search teams to find missing and trapped persons. Drones provide aerial coverage that ground teams cannot match across difficult or large terrain — locating victims faster and directing rescuers precisely.',
    tags: ['Missing Persons', 'Disaster Response', 'Night Operations'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <circle cx="17" cy="15" r="9" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <path d="M23.5 21.5 L30 28" stroke="#00d4ff" strokeWidth={2} strokeLinecap="round" />
        <path d="M13 15 L16 18 L21 13" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 4v3M17 23v3M6 15h3M25 15h3" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.3} />
      </svg>
    ),
  },
  {
    title: 'Anti-Poaching & Illegal Logging',
    desc: 'Drones are making huge impacts in worldwide efforts against poachers and illegal loggers. Real-time aerial surveillance covers vast territories that would be impossible to monitor on foot, enabling faster intervention and evidence collection.',
    tags: ['Wildlife Protection', 'Forest Coverage', 'Evidence Capture'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <path d="M18 4 C18 4 8 10 8 20 C8 26 12 30 18 32 C24 30 28 26 28 20 C28 10 18 4 18 4Z" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <circle cx="18" cy="20" r="3.5" stroke="#00d4ff" strokeWidth={1.3} />
        <circle cx="18" cy="20" r="1.2" fill="#00d4ff" opacity={0.8} />
        <path d="M18 10v5M12 16l3.5 2.5M24 16l-3.5 2.5" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    title: 'Fighting Forest Fires',
    desc: 'Police and first response teams can monitor and help put out forest fires faster and more effectively with drones. Thermal cameras identify hotspots and track fire spread in real time, enabling coordinated aerial and ground response.',
    tags: ['Thermal Detection', 'Hotspot Mapping', 'Fire Progression'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <path d="M18 5 C14 12 10 14 12 21 C13 25 16 27 18 29 C20 27 23 25 24 21 C26 14 22 12 18 5Z" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <path d="M14 23 C15 19 18 17 18 21 C18 23 16 25 18 27" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <circle cx="26" cy="10" r="3.5" stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.05)" />
        <path d="M23.5 8.5 L25 10 L28 7.5" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
      </svg>
    ),
  },
  {
    title: 'Traffic Management',
    desc: 'Drones can monitor for illegal parking, unsafe lane changes, and ensure smooth traffic flow even during road accidents. A single drone can oversee an entire intersection or highway stretch with a bird\'s-eye view no camera pole can match.',
    tags: ['Traffic Flow', 'Incident Response', 'Parking Enforcement'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
        <path d="M6 24 L30 24" stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M6 18 L30 18" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" strokeDasharray="3 3" opacity={0.4} />
        <rect x="8"  y="16" width="7" height="5" rx="1.5" stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.09)" />
        <rect x="21" y="16" width="7" height="5" rx="1.5" stroke="#00d4ff" strokeWidth={1.2} fill="rgba(0,212,255,0.09)" />
        <circle cx="18" cy="10" r="4" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M16 10 L18 8 L20 10M18 8 L18 13" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
      </svg>
    ),
  },
]

export function SSApplications() {
  return (
    <SectionWrapper id="applications" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            Applications
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            What are the Applications of{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Surveillance Drones?
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.7 }}>
            Different users have different needs. Here are key ways drones are improving security and law enforcement efforts worldwide.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.08} className="grid md:grid-cols-2 gap-6">
          {APPLICATIONS.map((app, i) => (
            <motion.div key={app.title} variants={itemVariants}
              className="group relative p-7 rounded-2xl transition-all duration-300 overflow-hidden"
              style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Watermark number */}
              <span className="absolute -bottom-3 -right-1 font-display font-bold select-none pointer-events-none" style={{ fontSize: '6rem', color: 'rgba(0,212,255,0.03)', lineHeight: 1, letterSpacing: '-0.06em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.22)' }}>
                  {app.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{app.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {app.tags.map(tag => (
                      <span key={tag} className="font-mono font-bold uppercase tracking-[0.1em]" style={{ fontSize: '0.6rem', color: 'rgba(0,212,255,0.6)', background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)', padding: '2px 8px', borderRadius: 999 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.72 }}>{app.desc}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 20%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA callout */}
        <FadeIn delay={0.2} className="mt-16">
          <div className="flex flex-col items-center gap-5 p-8 rounded-3xl text-center" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
            <p className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>
              Book a Demo with Us Today!
            </p>
            <p className="font-sans text-text-muted" style={{ fontSize: '0.92rem', maxWidth: 520, lineHeight: 1.7 }}>
              A surveillance drone is a versatile tool that can improve many security and law enforcement agencies. For companies looking to invest in a multi-functional drone, the best time to do so is now.
            </p>
            <Link href="#book-demo"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.04]"
              style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0097b8 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.35)' }}
            >
              Book a Demo
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
