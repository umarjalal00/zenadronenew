'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const FEATURES = [
  {
    title: 'Live Video Cameras',
    desc: 'High-definition real-time streaming for aerial observation, evidence collection, and situational awareness.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="3" y="7" width="16" height="12" rx="2" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M19 11 L25 8 L25 20 L19 17 Z" stroke="#00d4ff" strokeWidth={1.2} strokeLinejoin="round" />
        <circle cx="11" cy="13" r="3" stroke="#00d4ff" strokeWidth={1.1} />
        <circle cx="11" cy="13" r="1.2" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
  {
    title: 'Thermal / Infrared Sensors',
    desc: 'Detect heat signatures in complete darkness, through smoke, or within dense foliage — around the clock.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx="14" cy="14" r="8" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <circle cx="14" cy="14" r="3.5" stroke="#00d4ff" strokeWidth={1.2} />
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.45} />
        <circle cx="14" cy="14" r="1.2" fill="#00d4ff" opacity={0.9} />
      </svg>
    ),
  },
  {
    title: 'LiDAR Technology',
    desc: 'Light detection and ranging for precise 3D mapping, perimeter scanning, and distance measurement in any conditions.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <path d="M4 20 L10 12 L14 16 L19 9 L24 15" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 22 L24 22" stroke="#00d4ff" strokeWidth={0.9} strokeLinecap="round" opacity={0.35} />
        <circle cx="19" cy="9" r="2.5" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="19" cy="9" r="0.9" fill="#00d4ff" opacity={0.8} />
      </svg>
    ),
  },
]

export function SSWhat() {
  return (
    <SectionWrapper id="what" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)', boxShadow: '0 0 12px rgba(0,212,255,0.1)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Image */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(0,212,255,0.18)' }}>
                <Image
                  src="/images/drone-showcase.png"
                  alt="ZenaDrone surveillance UAV in operation"
                  width={640} height={460}
                  className="w-full object-cover"
                  style={{ filter: 'brightness(0.85) contrast(1.1)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,7,15,0.7) 0%, transparent 55%)' }} />
              </div>

              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 px-4 py-3 rounded-xl" style={{ background: 'rgba(7,7,15,0.82)', border: '1px solid rgba(0,212,255,0.28)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', animation: 'ssBlink 1.5s ease-in-out infinite' }} />
                  <span className="font-mono font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.6rem', color: '#00d4ff' }}>Surveillance Active</span>
                </div>
                <p className="font-sans text-white font-semibold" style={{ fontSize: '0.9rem' }}>AI-Powered Aerial Security</p>
              </div>

              {/* Top-right stat */}
              <div className="absolute -top-4 -right-4 px-5 py-4 rounded-2xl text-center" style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(0,212,255,0.22)', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(0,212,255,0.1)' }}>
                <p className="font-display font-bold" style={{ fontSize: '2rem', color: '#00d4ff', letterSpacing: '-0.04em', lineHeight: 1 }}>360°</p>
                <p className="font-mono text-text-muted tracking-[0.12em] mt-0.5" style={{ fontSize: '0.6rem' }}>COVERAGE</p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Content */}
          <FadeIn direction="left" delay={0.1}>
            <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>What Is It</p>
            <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              What is a{' '}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Surveillance Drone?
              </span>
            </h2>
            <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '1rem', lineHeight: 1.75 }}>
              Surveillance drones are small, unmanned aerial vehicles (UAVs) with cameras and sensors. Drone security captures images and videos from a distance, which allows security and law enforcement personnel to perform different tasks — gathering information about specific people, groups, or the environment.
            </p>
            <p className="font-sans text-text-muted mb-7" style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
              They often come with all kinds of advanced features:
            </p>

            <StaggerChildren staggerDelay={0.1} className="flex flex-col gap-4">
              {FEATURES.map(f => (
                <motion.div key={f.title} variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300"
                  style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.background = 'rgba(0,212,255,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)'; e.currentTarget.style.background = 'rgba(0,212,255,0.04)' }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.22)' }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white mb-1" style={{ fontSize: '0.95rem' }}>{f.title}</h4>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.845rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </FadeIn>
        </div>
      </Container>

      <style>{`
        @keyframes ssBlink { 0%,100% { opacity:.28; } 50% { opacity:1; } }
      `}</style>
    </SectionWrapper>
  )
}
