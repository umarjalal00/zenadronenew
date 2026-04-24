'use client'

import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'
import { motion } from 'framer-motion'

const CAPABILITIES = [
  { label: 'Aerial Data Capture',  color: '#00d4ff' },
  { label: 'LiDAR Sensing',        color: '#a78bfa' },
  { label: 'Infrared Readings',    color: '#34d399' },
  { label: 'GPS Location Data',    color: '#fbbf24' },
  { label: 'Secure Cloud Storage', color: '#00d4ff' },
  { label: 'Real-time Processing', color: '#a78bfa' },
]

const FLOW_STEPS = [
  {
    label: 'Physical',
    sub: 'Environment',
    color: '#34d399',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#34d399" strokeWidth={1.4} strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3 Q15.5 9 12 12 Q8.5 9 12 3" />
        <path d="M3 12 Q9 8.5 12 12 Q9 15.5 3 12" />
      </svg>
    ),
  },
  {
    label: 'Drone',
    sub: 'Capture',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round">
        <path d="M12 2L4 7v10l8 5 8-5V7z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Digital',
    sub: 'Processing',
    color: '#a78bfa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#a78bfa" strokeWidth={1.4} strokeLinecap="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    label: 'Insights',
    sub: 'Analysis',
    color: '#fbbf24',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22} stroke="#fbbf24" strokeWidth={1.4} strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 16l3.5-5 3 2.5L17 8" />
      </svg>
    ),
  },
]

export function EDCWhat() {
  return (
    <SectionWrapper id="what-is-edc" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)',
        boxShadow: '0 0 10px rgba(0,212,255,0.12)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <FadeIn>
              <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>
                Overview
              </p>
              <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.07 }}>
                What Is Electronic<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Data Collection
                </span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-6" style={{ fontSize: '1rem', maxWidth: 520 }}>
                Electronic Data Collection (EDC) is a digital way to record, share, store, and analyze information instead of using paper forms. When drones are used with EDC, they quickly capture high-quality aerial data, infrared readings, LiDAR, and location details — stored securely and processed for faster insights and better drone data analysis.
              </p>
            </FadeIn>

            <StaggerChildren staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CAPABILITIES.map(c => (
                <motion.div key={c.label} variants={itemVariants}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                  style={{ background: `${c.color}08`, border: `1px solid ${c.color}22` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
                  <span className="font-mono text-text-muted" style={{ fontSize: '0.72rem' }}>{c.label}</span>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>

          {/* Right: Data flow diagram */}
          <FadeIn direction="left" delay={0.15}>
            <div className="relative rounded-2xl p-8" style={{
              background: 'var(--surface-card)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 60px rgba(0,212,255,0.05)',
            }}>
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at top right, rgba(0,212,255,0.08) 0%, transparent 70%)',
              }} />

              <p className="font-mono font-bold text-text-muted uppercase tracking-[0.2em] mb-6" style={{ fontSize: '0.7rem' }}>
                Data Flow Pipeline
              </p>

              {/* Flow steps */}
              <div className="flex flex-col gap-4">
                {FLOW_STEPS.map((step, i) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{
                        background: `${step.color}12`,
                        border: `1.5px solid ${step.color}30`,
                        boxShadow: `0 0 20px ${step.color}10`,
                      }}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-mono font-bold text-white" style={{ fontSize: '0.82rem' }}>{step.label}</div>
                        <div className="font-mono text-text-muted" style={{ fontSize: '0.7rem' }}>{step.sub}</div>
                      </div>
                      <div className="font-mono font-bold" style={{ fontSize: '0.72rem', color: step.color }}>
                        STEP {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div className="flex items-center ml-6 my-1">
                        <div className="w-px h-4 ml-0" style={{ background: `linear-gradient(to bottom, ${step.color}40, ${FLOW_STEPS[i + 1].color}40)` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Result badge */}
              <div className="mt-6 flex items-center justify-between p-3 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(167,139,250,0.06))',
                border: '1px solid rgba(0,212,255,0.15)',
              }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: '0 0 8px #00d4ff' }} />
                  <span className="font-mono font-bold text-primary uppercase tracking-[0.15em]" style={{ fontSize: '0.7rem' }}>
                    Actionable Intelligence
                  </span>
                </div>
                <span className="font-mono text-text-muted" style={{ fontSize: '0.68rem' }}>DELIVERED</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </SectionWrapper>
  )
}
