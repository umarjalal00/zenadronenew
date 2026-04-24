'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap }    from '@/lib/gsap'

const REASONS = [
  {
    num: '01',
    title: 'Operational Cost Reduction',
    desc: 'Scalable autonomous solutions designed to reduce reliance on costly, manpower-heavy missions — delivering superior results at a fraction of traditional defense expenditure.',
    stat: 'Reduced mission overhead',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M14 8v1.5M14 18.5v1.5" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M10.5 11.5 Q14 10 17 12 Q19 14 17 16 Q14 18 10.5 16" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Force Protection',
    desc: 'Developed to enhance safety by minimising personnel exposure to high-risk environments. Autonomous drones operate in contested areas so your personnel do not have to.',
    stat: 'Zero-risk zone recon',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M14 3 L22 7 L22 17 C22 21.4 18.4 25 14 26 C9.6 25 6 21.4 6 17 L6 7 Z" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <path d="M10 14 L12.5 16.5 L18.5 10" stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Rapid Deployment',
    desc: 'VTOL-enabled for swift response from any terrain. Engineered to rapidly gather mission-critical intelligence and be airborne in seconds — no runway required.',
    stat: 'VTOL any-terrain launch',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M14 22 L14 6" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M8 12 L14 6 L20 12" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 18 L22 18" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M4 22 L24 22" stroke="#00d4ff" strokeWidth={0.8} strokeLinecap="round" opacity={0.25} />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Mission Flexibility',
    desc: 'Modular payloads and multispectral sensors ensure adaptability across diverse operational demands — from ISR to counter-drone, logistics to damage assessment.',
    stat: 'Modular payload system',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="4" width="9" height="9" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <rect x="15" y="4" width="9" height="9" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <rect x="4" y="15" width="9" height="9" rx="1.5" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.07)" />
        <rect x="15" y="15" width="9" height="9" rx="1.5" stroke="#00d4ff" strokeWidth={0.7} strokeDasharray="2 2" fill="rgba(0,212,255,0.04)" />
        <text x="19.5" y="22" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity={0.5}>+</text>
      </svg>
    ),
  },
]

const QUICK_STATS = [
  { value: '1hr',  label: 'Autonomous Flight'  },
  { value: 'VTOL', label: 'Any-Terrain Launch' },
  { value: 'ISR',  label: 'Mission Capability' },
]

export function MDWhy() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.mdw-stat',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="why" className="relative overflow-hidden py-24 md:py-32 bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)', boxShadow: '0 0 12px rgba(0,212,255,0.1)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Why Invest Now</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Autonomous Military<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Drone Technology
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 580, lineHeight: 1.7 }}>
            In an era of increasingly complex and asymmetric threats, traditional defense strategies are proving insufficient. ZenaDrone 1000 is engineered to redefine autonomous defense — delivering intelligence, adaptability, and tactical precision.
          </p>
        </FadeIn>

        {/* Quick-stat pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {QUICK_STATS.map(s => (
            <div key={s.label} className="mdw-stat flex items-center gap-3 px-5 py-3 rounded-full" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)', opacity: 0 }}>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
              <span className="font-display font-bold" style={{ fontSize: '1.05rem', color: '#00d4ff', letterSpacing: '-0.02em' }}>{s.value}</span>
              <span className="font-mono text-text-muted tracking-[0.12em]" style={{ fontSize: '0.7rem' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid sm:grid-cols-2 gap-4">
          {REASONS.map((r) => (
            <motion.div key={r.num} variants={itemVariants}
              className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.32)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="absolute top-4 right-5 font-mono font-bold" style={{ fontSize: '1.5rem', color: 'rgba(0,212,255,0.12)', letterSpacing: '-0.05em' }}>{r.num}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.22)' }}>{r.icon}</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.22)' }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.66rem', color: '#00d4ff' }}>{r.stat}</span>
              </div>
              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{r.title}</h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.855rem' }}>{r.desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  )
}
