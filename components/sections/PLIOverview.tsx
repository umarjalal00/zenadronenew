'use client'

import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const CHALLENGES = [
  { text: 'Climbing tall poles or using helicopters, which is dangerous and costly' },
  { text: 'Spending a lot of money on workers, tools, and manned aircraft' },
  { text: 'Struggling to reach power lines in far-away or rough terrain areas' },
]

const SOLUTIONS = [
  { text: 'Keeping workers safe — no need for climbing or risky inspections from height' },
  { text: 'Saving money — drones cost far less than helicopters and traditional methods' },
  { text: 'Doing a better job — clear pictures, thermal data, and AI-driven fault detection' },
]

const TECHNOLOGIES = [
  {
    color: '#00d4ff', title: 'Thermal Cameras',
    desc: 'Infrared imaging detects overheating wires, insulator failures, and hotspots invisible to standard cameras.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="14" r="7" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.08)" />
        <circle cx="14" cy="14" r="3" stroke="#00d4ff" strokeWidth={1.2} />
        <circle cx="14" cy="14" r="1.2" fill="#00d4ff" opacity={0.9} />
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    color: '#fbbf24', title: 'LiDAR Scanning',
    desc: '3D point-cloud mapping identifies structural deformations, sag, and vegetation encroachment in precise detail.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M3 20 L9 12 L14 16 L19 9 L25 15" stroke="#fbbf24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 22 L25 22" stroke="#fbbf24" strokeWidth={1} strokeLinecap="round" opacity={0.35} />
        <circle cx="19" cy="9" r="2.5" stroke="#fbbf24" strokeWidth={1.2} />
      </svg>
    ),
  },
  {
    color: '#34d399', title: 'AI Fault Analysis',
    desc: 'Machine learning models analyse sensor data in real time to classify faults, prioritise repairs, and predict failures.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="#34d399" strokeWidth={1.3} fill="rgba(52,211,153,0.06)" />
        <path d="M8 18 L11 13 L14 15 L17 10 L20 12" stroke="#34d399" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="12" r="1.8" fill="#34d399" opacity={0.8} />
      </svg>
    ),
  },
  {
    color: '#a78bfa', title: 'Live Data Relay',
    desc: 'Encrypted real-time transmission sends aerial footage and inspection reports directly to maintenance teams.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <path d="M7 10 Q14 4 21 10" stroke="#a78bfa" strokeWidth={1.3} strokeLinecap="round" opacity={0.5} />
        <path d="M10 14 Q14 9 18 14" stroke="#a78bfa" strokeWidth={1.3} strokeLinecap="round" opacity={0.7} />
        <path d="M12.5 18 Q14 15.5 15.5 18" stroke="#a78bfa" strokeWidth={1.3} strokeLinecap="round" />
        <circle cx="14" cy="21" r="2" fill="#a78bfa" opacity={0.9} />
      </svg>
    ),
  },
  {
    color: '#f472b6', title: 'High-Res Imaging',
    desc: 'Ultra-clear optical cameras document visible defects — broken insulators, corroded fittings, damaged conductors.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <rect x="3" y="7" width="22" height="16" rx="2" stroke="#f472b6" strokeWidth={1.3} fill="rgba(244,114,182,0.06)" />
        <circle cx="14" cy="15" r="4.5" stroke="#f472b6" strokeWidth={1.2} />
        <circle cx="14" cy="15" r="1.8" fill="#f472b6" opacity={0.8} />
        <rect x="18" y="5" width="4" height="3" rx="0.8" stroke="#f472b6" strokeWidth={1} opacity={0.4} />
      </svg>
    ),
  },
  {
    color: '#00d4ff', title: 'GPS Route Planning',
    desc: 'Pre-programmed flight paths ensure complete corridor coverage across hundreds of miles with no gaps.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={22} height={22}>
        <circle cx="14" cy="11" r="4" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M14 7 Q18 11 14 22 Q10 11 14 7" stroke="#00d4ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.5} />
        <circle cx="14" cy="11" r="1.5" fill="#00d4ff" opacity={0.9} />
      </svg>
    ),
  },
]

export function PLIOverview() {
  return (
    <SectionWrapper id="overview" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)', boxShadow: '0 0 12px rgba(0,212,255,0.1)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Aerial Power Line Intelligence</p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Why Use Drones for{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Power Line Inspection?
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.7 }}>
            Checking power lines the old way is hard, slow, and risky. A powerline inspection drone fixes these problems by keeping workers safe, saving money, and delivering detailed aerial data.
          </p>
        </FadeIn>

        {/* Challenges vs Solutions */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <FadeIn direction="right">
            <div className="h-full p-6 rounded-2xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <svg viewBox="0 0 20 20" fill="none" width={14} height={14}><path d="M10 3 L18 17 L2 17 Z" stroke="#ef4444" strokeWidth={1.4} strokeLinejoin="round" /><line x1="10" y1="9" x2="10" y2="13" stroke="#ef4444" strokeWidth={1.6} strokeLinecap="round" /><circle cx="10" cy="15.5" r="0.8" fill="#ef4444" /></svg>
                </div>
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#ef4444' }}>The Challenge</span>
              </div>
              <div className="flex flex-col gap-3">
                {CHALLENGES.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
                      <span className="font-mono font-bold" style={{ fontSize: '0.6rem', color: '#ef4444' }}>{i + 1}</span>
                    </div>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.855rem', lineHeight: 1.6 }}>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="h-full p-6 rounded-2xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
                  <svg viewBox="0 0 20 20" fill="none" width={14} height={14}><path d="M10 2 L16 5 L16 11 C16 14.3 13.3 17 10 18 C6.7 17 4 14.3 4 11 L4 5 Z" stroke="#00d4ff" strokeWidth={1.3} /><path d="M7 10 L9 12 L13.5 7" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>The ZenaDrone Solution</span>
              </div>
              <div className="flex flex-col gap-3">
                {SOLUTIONS.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
                      <svg viewBox="0 0 10 10" fill="none" width={8} height={8}><path d="M2 5 L4.5 7.5 L8.5 2.5" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.855rem', lineHeight: 1.6 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Key Technologies */}
        <FadeIn className="mb-8">
          <p className="font-mono font-bold text-center uppercase tracking-[0.28em] mb-2" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>Key Technologies</p>
          <h3 className="font-display font-bold text-white text-center mb-10" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            Inside a ZenaDrone Inspection System
          </h3>
        </FadeIn>

        <StaggerChildren staggerDelay={0.07} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECHNOLOGIES.map(t => (
            <motion.div key={t.title} variants={itemVariants}
              className="group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--surface-elevated)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.color + '35'; e.currentTarget.style.boxShadow = `0 0 32px ${t.color}0a` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${t.color}0e`, border: `1px solid ${t.color}28` }}>
                {t.icon}
              </div>
              <h4 className="font-display font-bold text-white mb-2" style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>{t.title}</h4>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.845rem' }}>{t.desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
