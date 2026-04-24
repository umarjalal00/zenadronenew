'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap }    from '@/lib/gsap'

const STATS = [
  { value: '70%', label: 'Faster Data Acquisition', color: '#00d4ff' },
  { value: '99%', label: 'Higher Accuracy',          color: '#a78bfa' },
  { value: '60%', label: 'Cost Reduction',            color: '#34d399' },
]

const BENEFITS = [
  {
    color: '#00d4ff',
    title: 'Faster Data Acquisition',
    stat:  '70% faster',
    desc:  'Collection time can be cut by up to 70%. Project schedules and decision-making processes are significantly accelerated, compressing weeks of fieldwork into hours.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M14 8v6l4 3" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14h2M19 14h2M14 7v2M14 19v2" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    color: '#a78bfa',
    title: 'Higher Accuracy',
    stat:  'Sub-centimeter precision',
    desc:  'Automation eliminates human error from manual collection. Advanced UAV data processing delivers precise, consistent results across every mission with repeatable quality.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#a78bfa" strokeWidth={1.3} fill="rgba(167,139,250,0.06)" />
        <circle cx="14" cy="14" r="4" stroke="#a78bfa" strokeWidth={1.2} />
        <circle cx="14" cy="14" r="1.5" fill="#a78bfa" opacity={0.9} />
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="#a78bfa" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    color: '#34d399',
    title: 'Cost Efficiency',
    stat:  'Up to 60% savings',
    desc:  'Drone-driven processes dramatically reduce costs associated with labor, equipment, and travel while achieving increased efficiency across all operational areas.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#34d399" strokeWidth={1.3} fill="rgba(52,211,153,0.06)" />
        <path d="M14 8v1.5M14 18.5V20" stroke="#34d399" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M10.5 11 Q14 9.5 17 11.5 Q19 13.5 17 16 Q14 18 10.5 16.5" stroke="#34d399" strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: '#fbbf24',
    title: 'Real-time Insights',
    stat:  'Instant access',
    desc:  'Immediate access to processed data supports faster, data-driven decisions across multiple departments simultaneously, eliminating reporting bottlenecks.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="5" width="20" height="16" rx="2" stroke="#fbbf24" strokeWidth={1.3} fill="rgba(251,191,36,0.06)" />
        <path d="M8 17 L11 12 L14 14.5 L17 10 L20 13" stroke="#fbbf24" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="13" r="1.5" fill="#fbbf24" opacity={0.8} />
      </svg>
    ),
  },
  {
    color: '#f472b6',
    title: 'Scalable Deployment',
    stat:  'Local to global',
    desc:  'ZenaDrone technology scales from local projects to large-scale corporate operations spanning multiple sites and regions, adapting to any operational footprint.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#f472b6" strokeWidth={1.3} fill="rgba(244,114,182,0.06)" />
        <path d="M4 14h20M14 4 Q8 10 8 14 Q8 18 14 24M14 4 Q20 10 20 14 Q20 18 14 24" stroke="#f472b6" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
]

export function EDCBenefits() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.edcb-stat',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="benefits" className="relative overflow-hidden py-24 md:py-32 bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)',
        boxShadow: '0 0 12px rgba(0,212,255,0.15)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>
            Why It Matters
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Benefits of ZenaDrone<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Electronic Data Collection
            </span>
          </h2>
        </FadeIn>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
          {STATS.map(s => (
            <div key={s.label} className="edcb-stat flex flex-col items-center py-5 px-4 rounded-2xl text-center" style={{
              background: `${s.color}0a`,
              border: `1px solid ${s.color}25`,
              boxShadow: `0 0 30px ${s.color}08`,
              opacity: 0,
            }}>
              <span className="font-display font-bold mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: s.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {s.value}
              </span>
              <span className="font-mono text-text-muted tracking-[0.1em]" style={{ fontSize: '0.7rem' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Benefits grid */}
        <StaggerChildren staggerDelay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map(b => (
            <motion.div
              key={b.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = b.color + '35'
                e.currentTarget.style.boxShadow = `0 0 40px ${b.color}0c`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                background: `${b.color}10`, border: `1px solid ${b.color}28`,
              }}>
                {b.icon}
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{
                background: `${b.color}0e`, border: `1px solid ${b.color}28`,
              }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.68rem', color: b.color }}>{b.stat}</span>
              </div>

              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                {b.title}
              </h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.855rem' }}>
                {b.desc}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  )
}
