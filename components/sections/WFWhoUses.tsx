'use client'

import { useState } from 'react'
import { motion }   from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const USERS = [
  {
    color: '#34d399',
    title: 'Environmental Conservation',
    subtitle: 'Forest & Habitat Management',
    desc: 'Conservation agencies use ZenaDrone to monitor forest health, identify dry and fire-prone areas, and detect pests that increase wildfire risk. This proactive aerial surveillance aids in preserving ecosystems and preventing fires before they start.',
    points: ['Monitor forest health and dry-zone mapping', 'Identify pest outbreaks that raise fire risk', 'Track habitat changes over time', 'Support reforestation and recovery programs'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <circle cx="16" cy="16" r="11" stroke="#34d399" strokeWidth={1.4} fill="rgba(52,211,153,0.08)" />
        <path d="M5 16 Q9 11 16 16 Q23 21 27 16" stroke="#34d399" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="16" y1="5" x2="16" y2="27" stroke="#34d399" strokeWidth={0.8} opacity={0.3} />
        <path d="M16 9 Q18 12 16 16 Q14 12 16 9" stroke="#34d399" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: '#fbbf24',
    title: 'Insurance Sector',
    subtitle: 'Risk Assessment & Claims',
    desc: 'Insurers use ZenaDrone to conduct accurate pre-and post-wildfire risk assessments and damage surveys. High-resolution aerial data streamlines claims processing and delivers faster support to affected families and businesses with verifiable documentation.',
    points: ['Pre-fire risk zone assessment', 'Post-fire damage documentation', 'Accelerated claims processing', 'Verified aerial evidence for disputes'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <path d="M16 3 L24 7 L24 17 C24 22 20.4 26 16 27 C11.6 26 8 22 8 17 L8 7 Z" stroke="#fbbf24" strokeWidth={1.4} fill="rgba(251,191,36,0.08)" />
        <path d="M12 16 L14.5 18.5 L20.5 12" stroke="#fbbf24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: '#f472b6',
    title: 'Utility Companies',
    subtitle: 'Infrastructure Inspection',
    desc: 'Power companies leverage ZenaDrone for aerial inspection of transmission lines and infrastructure in or near fire-prone areas. Early detection of vegetation encroachment and equipment faults significantly reduces wildfire ignition risk.',
    points: ['Power line corridor inspection', 'Vegetation encroachment detection', 'Equipment fault identification', 'Preventive maintenance prioritization'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <line x1="4"  y1="23" x2="28" y2="23" stroke="#f472b6" strokeWidth={1.5} strokeLinecap="round" />
        <line x1="4"  y1="18" x2="28" y2="18" stroke="#f472b6" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <line x1="9"  y1="10" x2="9"  y2="23" stroke="#f472b6" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="23" y1="10" x2="23" y2="23" stroke="#f472b6" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="7"  y1="10" x2="11" y2="10" stroke="#f472b6" strokeWidth={1.6} strokeLinecap="round" />
        <line x1="21" y1="10" x2="25" y2="10" stroke="#f472b6" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M15 14 L13 18 L16 18 L14 23" stroke="#f472b6" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: '#00d4ff',
    title: 'Fire Departments',
    subtitle: 'Emergency Response',
    desc: 'Fire department drone programs are at the forefront of wildfire drone adoption. ZenaDrone equips them with persistent aerial surveillance during active incidents, supporting command decisions, resource allocation, and safe evacuation management.',
    points: ['Active incident aerial coverage', 'Evacuation route assessment', 'Incident command support', 'After-action terrain documentation'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <path d="M16 3 C16 3 9 10 9 18 C9 22.4 12 26 16 26 C20 26 23 22.4 23 18 C23 10 16 3 16 3Z" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <path d="M12.5 19 Q14 16 16 16 Q18 16 19.5 19" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" />
        <line x1="16" y1="10" x2="16" y2="16" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
  },
]

export function WFWhoUses() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <SectionWrapper id="who-uses" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#f97316' }}>Who Uses ZenaDrone</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Drones in{' '}
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Wildfire Management
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520 }}>
            The utility of wildfire drones extends beyond fire suppression. Several industries rely on aerial intelligence for prevention, assessment, and response.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.08} className="grid sm:grid-cols-2 gap-5">
          {USERS.map((u, i) => (
            <motion.div key={u.title} variants={itemVariants}
              className="group relative p-6 rounded-2xl cursor-default transition-all duration-300"
              style={{ background: active === i ? `${u.color}0b` : 'var(--surface-elevated)', border: `1px solid ${active === i ? u.color + '32' : 'rgba(255,255,255,0.07)'}`, boxShadow: active === i ? `0 0 40px ${u.color}0c` : 'none' }}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-13 h-13 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300" style={{ width: 52, height: 52, background: active === i ? `${u.color}18` : `${u.color}0c`, border: `1.5px solid ${active === i ? u.color + '40' : u.color + '20'}` }}>
                  {u.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-0.5" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{u.title}</h3>
                  <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.66rem', color: u.color }}>{u.subtitle}</span>
                </div>
              </div>

              <p className="font-sans text-text-muted leading-relaxed mb-4" style={{ fontSize: '0.875rem' }}>{u.desc}</p>

              <ul className="flex flex-col gap-2">
                {u.points.map(pt => (
                  <li key={pt} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300" style={{ background: active === i ? u.color : 'rgba(255,255,255,0.25)', boxShadow: active === i ? `0 0 4px ${u.color}` : 'none' }} />
                    <span className="font-sans text-text-muted" style={{ fontSize: '0.82rem' }}>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-300" style={{ background: active === i ? `linear-gradient(to right, transparent, ${u.color}50, transparent)` : 'transparent' }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
