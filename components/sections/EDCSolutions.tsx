'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const SOLUTIONS = [
  {
    title: 'Automated Flight Missions',
    desc: 'Intelligent drones execute precise, repeatable flight missions with zero manual intervention.',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <path d="M12 2L4 7v10l8 5 8-5V7z" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" stroke="#00d4ff" strokeWidth={1.2} />
      </svg>
    ),
  },
  {
    title: 'High-Quality Imaging & Sensors',
    desc: 'Advanced sensors capture accurate drone data across all conditions, including IR and LiDAR.',
    color: '#a78bfa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="#a78bfa" strokeWidth={1.4} />
        <circle cx="12" cy="13" r="3.5" stroke="#a78bfa" strokeWidth={1.3} />
        <path d="M8 6V4M16 6V4" stroke="#a78bfa" strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Integrated Data Management',
    desc: 'Unified systems handle drone data processing, storage, and retrieval with enterprise-grade security.',
    color: '#34d399',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#34d399" strokeWidth={1.3} />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#34d399" strokeWidth={1.3} />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#34d399" strokeWidth={1.3} />
      </svg>
    ),
  },
  {
    title: 'Real-time Data Transmission',
    desc: 'Rapid transmission enables teams to review and act on insights immediately, from any location.',
    color: '#fbbf24',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <path d="M5 12.5 Q9 7 12 12 Q15 17 19 11.5" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#fbbf24" opacity={0.7} />
        <path d="M2 20h20" stroke="#fbbf24" strokeWidth={0.8} opacity={0.3} />
      </svg>
    ),
  },
  {
    title: 'Scalable Enterprise Deployment',
    desc: 'From single-site operations to enterprise and government deployments spanning multiple regions.',
    color: '#f472b6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18}>
        <rect x="2" y="14" width="6" height="7" rx="1" stroke="#f472b6" strokeWidth={1.3} />
        <rect x="9" y="9" width="6" height="12" rx="1" stroke="#f472b6" strokeWidth={1.3} />
        <rect x="16" y="4" width="6" height="17" rx="1" stroke="#f472b6" strokeWidth={1.3} />
      </svg>
    ),
  },
]

export function EDCSolutions() {
  return (
    <SectionWrapper id="solutions" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)',
        boxShadow: '0 0 12px rgba(0,212,255,0.15)',
      }} />

      <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

          {/* Left: Image placeholder */}
          <FadeIn direction="right" delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-lg mx-auto" style={{
              background: 'var(--surface-card)',
              border: '1px solid rgba(0,212,255,0.12)',
              boxShadow: '0 0 60px rgba(0,212,255,0.08)',
            }}>
              <Image
                src="/images/Flexibility -Accuracy.jpeg"
                alt="ZenaDrone solving data collection challenges"
                fill
                className="object-cover"
              />

              {/* Data stream overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="space-y-2">
                  {['FLIGHT MISSION: ACTIVE', 'DATA CAPTURE: 4K/LiDAR/IR', 'TRANSMISSION: ENCRYPTED', 'PROCESSING: REAL-TIME'].map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: i < 3 ? '#00d4ff' : '#34d399', animation: `edcsTermBlink ${1.5 + i * 0.3}s ease-in-out infinite` }} />
                      <span className="font-mono text-primary/70" style={{ fontSize: '0.7rem' }}>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top-right badge */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-lg" style={{
                background: 'rgba(7,7,15,0.88)', border: '1px solid rgba(52,211,153,0.3)', backdropFilter: 'blur(12px)',
              }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'edcsTermBlink 2s ease-in-out infinite' }} />
                  <span className="font-mono text-emerald-400 font-bold uppercase tracking-[0.15em]" style={{ fontSize: '0.68rem' }}>Autonomous</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Solutions list */}
          <div>
            <FadeIn>
              <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>
                The ZenaDrone Solution
              </p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                How ZenaDrone Solves<br />
                <span className="text-primary">These Challenges</span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-8" style={{ fontSize: '0.95rem', maxWidth: 480 }}>
                ZenaDrone uses intelligent drones to automate data collection through advanced flight missions, providing reliable and repeatable results with integrated systems for efficient management and processing.
              </p>
            </FadeIn>

            <StaggerChildren staggerDelay={0.07} className="flex flex-col gap-3">
              {SOLUTIONS.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/[0.03]"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{
                    background: `${s.color}12`,
                    border: `1px solid ${s.color}28`,
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-1" style={{ fontSize: '0.9rem' }}>{s.title}</h4>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.825rem', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes edcsTermBlink { 0%,100% { opacity:.4; } 50% { opacity:1; } }
      `}</style>
    </SectionWrapper>
  )
}
