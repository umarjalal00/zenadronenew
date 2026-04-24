'use client'

import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const STATS = [
  { value: '5×',   label: 'FASTER RESPONSE', sub: 'vs ground teams'  },
  { value: '24/7', label: 'MONITORING',       sub: 'day & night ops'  },
  { value: '100%', label: 'SAFER MISSIONS',   sub: 'zero staff risk'  },
]

const BENEFITS = [
  {
    num: '01',
    title: 'Safer Missions',
    desc: 'Surveillance and security UAVs can greatly reduce the risk for security staff and law enforcement. In the case of natural disasters or when apprehending a suspect, a drone can arrive first — helping teams quickly assess the situation and investigate potential risks before going in themselves.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <path d="M16 3 L26 7 L26 16 C26 21.5 22 26 16 28 C10 26 6 21.5 6 16 L6 7 Z" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <path d="M11 16 L14 19 L21 12" stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Improved Visual Capabilities',
    desc: 'Drones can fly from high altitudes, giving access to wide aerial viewpoints with few blind spots. Not only do they come equipped with high-resolution cameras, but they can also be equipped with thermal and night vision — detecting anomalies even in low or dim light.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <ellipse cx="16" cy="16" rx="12" ry="7" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <circle cx="16" cy="16" r="4" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="16" cy="16" r="1.5" fill="#00d4ff" opacity={0.9} />
        <path d="M4 16 C4 10 28 10 28 16" stroke="#00d4ff" strokeWidth={0.8} strokeLinecap="round" opacity={0.3} strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Faster Response Time',
    desc: 'Emergencies require immediate action, and every second can make a huge difference. Drones deploy quickly and reach areas faster than any ground team. A security drone can perform perimeter patrols covering kilometres in minutes and provide live feedback within moments of deployment.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={22} height={22}>
        <circle cx="16" cy="16" r="11" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M16 9 L16 16 L20 20" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 4 L16 6M28 16 L26 16" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
]

export function SSBenefits() {
  return (
    <SectionWrapper id="benefits" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-12">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            Benefits
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            What are the Benefits of{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Surveillance Drones?
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.7 }}>
            Whether investigating crime scenes, engaging fleeing suspects, or conducting search and rescue operations, drones offer measurable advantages.
          </p>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn>
          <div className="grid grid-cols-3 gap-5 mb-14 p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.14)' }}>
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#00d4ff', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                <p className="font-mono font-bold uppercase tracking-[0.18em] mt-1" style={{ fontSize: '0.7rem', color: 'rgba(0,212,255,0.7)' }}>{s.label}</p>
                <p className="font-sans text-text-muted mt-0.5" style={{ fontSize: '0.75rem' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-3 gap-6">
          {BENEFITS.map(b => (
            <motion.div key={b.num} variants={itemVariants}
              className="group p-7 rounded-2xl transition-all duration-300"
              style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.07)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.22)' }}>
                  {b.icon}
                </div>
                <span className="font-display font-bold select-none" style={{ fontSize: '3rem', color: 'rgba(0,212,255,0.06)', letterSpacing: '-0.05em', lineHeight: 1 }}>{b.num}</span>
              </div>
              <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{b.title}</h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.72 }}>{b.desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
