'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap }    from '@/lib/gsap'

const BENEFITS = [
  {
    num: '01', color: '#f97316',
    title: 'Early Detection & Monitoring',
    desc: 'Drones equipped with thermal cameras and advanced sensors identify hotspots and small fires before they escalate. Faster detection means faster containment.',
    stat: 'Detect fires before spread',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="6" stroke="#f97316" strokeWidth={1.3} fill="rgba(249,115,22,0.08)" />
        <circle cx="14" cy="14" r="2.5" fill="#f97316" opacity={0.85} />
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="#f97316" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
        <path d="M7.5 7.5 L10 10M18 18 L20.5 20.5M7.5 20.5 L10 18M18 10 L20.5 7.5" stroke="#f97316" strokeWidth={0.8} strokeLinecap="round" opacity={0.3} />
      </svg>
    ),
  },
  {
    num: '02', color: '#34d399',
    title: 'Enhancing Firefighter Safety',
    desc: 'Drones gather critical intelligence from a distance, so teams can make informed decisions without entering hazardous zones. A fire rescue drone also supports evacuation scouting.',
    stat: 'Zero exposure to fireline',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M14 3 L22 7 L22 17 C22 21.4 18.4 25 14 26 C9.6 25 6 21.4 6 17 L6 7 Z" stroke="#34d399" strokeWidth={1.3} fill="rgba(52,211,153,0.06)" />
        <path d="M10 14 L12.5 16.5 L18.5 10" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03', color: '#00d4ff',
    title: 'Cost-Effective Operations',
    desc: 'Wildfire drones require less manpower and resources than manned aircraft or large ground operations, delivering impactful results at significantly lower operational cost.',
    stat: 'Lower cost than aircraft',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.05)" />
        <path d="M14 8v1.5M14 18.5v1.5" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M10.5 11.5 Q14 10 17 12 Q19 14 17 16 Q14 18 10.5 16" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '04', color: '#a78bfa',
    title: 'Real-Time Data Sharing',
    desc: 'Continuous live updates on fire activity enable quicker decisions and more effective deployment of resources across incident command, ground crews, and evacuation teams.',
    stat: 'Live updates to command',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="5" width="20" height="16" rx="2" stroke="#a78bfa" strokeWidth={1.3} fill="rgba(167,139,250,0.06)" />
        <path d="M8 17 L11 12 L14.5 14.5 L17 10 L20 13" stroke="#a78bfa" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="13" r="1.8" fill="#a78bfa" opacity={0.8} />
      </svg>
    ),
  },
  {
    num: '05', color: '#fbbf24',
    title: 'Environmental Protection',
    desc: 'Faster detection and containment reduces the duration and footprint of wildfires, protecting natural habitats, wildlife, water sources, and air quality for surrounding communities.',
    stat: 'Minimize ecosystem damage',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="9" stroke="#fbbf24" strokeWidth={1.3} fill="rgba(251,191,36,0.06)" />
        <path d="M5 14 Q8 10 14 14 Q20 18 23 14" stroke="#fbbf24" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="14" y1="5" x2="14" y2="23" stroke="#fbbf24" strokeWidth={0.8} opacity={0.3} />
        <path d="M14 8 Q16 11 14 14 Q12 11 14 8" stroke="#fbbf24" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
]

const QUICK_STATS = [
  { value: '70%', label: 'Earlier Detection',  color: '#f97316' },
  { value: '3×',  label: 'Faster Response',    color: '#ef4444' },
  { value: '80%', label: 'Cost Reduction',      color: '#00d4ff' },
]

export function WFBenefits() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.wfb-stat',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="benefits" className="relative overflow-hidden py-24 md:py-32 bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.25) 30%, rgba(249,115,22,0.3) 50%, rgba(249,115,22,0.25) 70%, transparent)', boxShadow: '0 0 12px rgba(249,115,22,0.12)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(249,115,22,0.04) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#f97316' }}>Benefits</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Why Drones Are Essential<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              for Wildfire Response
            </span>
          </h2>
        </FadeIn>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16">
          {QUICK_STATS.map(s => (
            <div key={s.label} className="wfb-stat flex flex-col items-center py-5 px-4 rounded-2xl text-center" style={{ background: `${s.color}09`, border: `1px solid ${s.color}25`, opacity: 0 }}>
              <span className="font-display font-bold mb-1" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: s.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</span>
              <span className="font-mono text-text-muted tracking-[0.08em]" style={{ fontSize: '0.68rem' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.num} variants={itemVariants}
              className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              style={{ background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = b.color + '35'; e.currentTarget.style.boxShadow = `0 0 40px ${b.color}0c` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="absolute top-4 right-5 font-mono font-bold" style={{ fontSize: '1.5rem', color: `${b.color}18`, letterSpacing: '-0.05em' }}>{b.num}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${b.color}10`, border: `1px solid ${b.color}28` }}>{b.icon}</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ background: `${b.color}0d`, border: `1px solid ${b.color}28` }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.66rem', color: b.color }}>{b.stat}</span>
              </div>
              <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{b.title}</h3>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.855rem' }}>{b.desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  )
}
