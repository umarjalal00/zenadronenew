'use client'

import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const STEPS = [
  {
    num: '01',
    title: 'The Drone Itself is the Main Technology',
    desc: 'The drone serves as the backbone of the surveillance system. It comes equipped with cameras, sensors, and specialized technology — from facial recognition software to object detection. These enable a drone to be versatile and serve many purposes in all kinds of situations.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={24} height={24}>
        <circle cx="16" cy="16" r="8" stroke="#00d4ff" strokeWidth={1.4} fill="rgba(0,212,255,0.07)" />
        <circle cx="16" cy="16" r="3.5" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="16" cy="16" r="1.3" fill="#00d4ff" opacity={0.9} />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.4} />
        <path d="M7 7l2.8 2.8M22.2 22.2l2.8 2.8M22.2 9.8l2.8-2.8M7 25l2.8-2.8" stroke="#00d4ff" strokeWidth={0.8} strokeLinecap="round" opacity={0.25} />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'It Needs a Reliable Communication Network',
    desc: 'A surveillance UAV is part of an extensive system that relies on a secure communication network. Cellular transmissions and radio signals ensure uninterrupted data transfer during missions, keeping operators in constant real-time contact with the drone.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={24} height={24}>
        <path d="M5 12 Q16 4 27 12" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" opacity={0.5} />
        <path d="M9 17 Q16 10 23 17" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
        <path d="M13 22 Q16 18 19 22" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" />
        <circle cx="16" cy="26" r="2.5" fill="#00d4ff" opacity={0.85} />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'It Comes with Extensive Support',
    desc: 'Surveillance systems need to be well-coordinated to be effective. Drones need extensive support, from extra batteries and SD cards to custom attachments. Smart automation software handles pre-programmed flight paths and automates actions from following moving targets to maintaining precise altitudes.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={24} height={24}>
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M10 17 L13 20 L22 11" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6 L16 4 L20 6" stroke="#00d4ff" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Data is Collected and Studied for Future Missions',
    desc: 'With drones, each mission becomes a learning experience. Security drones capture photos and videos that serve as recorded evidence — valuable for all kinds of law enforcement work, from managing traffic flow and documenting crime scenes to tracking and apprehending suspects.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={24} height={24}>
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M8 21 L12 16 L16 18 L20 12 L24 15" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="15" r="2" fill="#00d4ff" opacity={0.8} />
        <path d="M8 10 L16 10" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.3} />
      </svg>
    ),
  },
]

export function SSHowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-background">
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
            How It Works
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            How Do Remote{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Surveillance Drones Work?
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.7 }}>
            A surveillance UAV is valuable because it can access otherwise inaccessible places for teams on the ground. Here&apos;s what you need to know.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} className="grid md:grid-cols-2 gap-6">
          {STEPS.map(step => (
            <motion.div key={step.num} variants={itemVariants}
              className="group relative p-7 rounded-2xl transition-all duration-300"
              style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.28)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Step number watermark */}
              <span className="absolute top-5 right-6 font-display font-bold select-none pointer-events-none" style={{ fontSize: '4rem', color: 'rgba(0,212,255,0.04)', lineHeight: 1, letterSpacing: '-0.05em' }}>
                {step.num}
              </span>

              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.22)' }}>
                  {step.icon}
                </div>
                <span className="font-mono font-bold" style={{ fontSize: '0.72rem', color: 'rgba(0,212,255,0.5)', paddingTop: '0.85rem' }}>STEP {step.num}</span>
              </div>

              <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.875rem', lineHeight: 1.72 }}>
                {step.desc}
              </p>

              <div className="absolute bottom-0 left-7 right-7 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.35), transparent)' }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
