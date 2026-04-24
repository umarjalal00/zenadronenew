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
    num: '01', color: '#34d399',
    title: 'Better Safety',
    desc: 'Drones do the dangerous work of checking power lines. Workers can stay on the ground while drones fly close to inspect. Power line drones keep workers safe and eliminate climbing risks entirely.',
    stat: 'Zero climbing required',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M14 3 L22 7 L22 17 C22 21.4 18.4 25 14 26 C9.6 25 6 21.4 6 17 L6 7 Z" stroke="#34d399" strokeWidth={1.3} fill="rgba(52,211,153,0.06)" />
        <path d="M10 14 L12.5 16.5 L18.5 10" stroke="#34d399" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02', color: '#00d4ff',
    title: 'Faster Work',
    desc: 'A power line drone can check many miles of power lines in a short time. Traditional methods take much longer, especially in hard-to-reach places like mountains or dense forests.',
    stat: 'Miles inspected per hour',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth={1.3} fill="rgba(0,212,255,0.06)" />
        <path d="M14 8v6l4 2" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03', color: '#fbbf24',
    title: 'Lower Costs',
    desc: 'Old methods like helicopters or large crews are very expensive. With aerial power line inspection, fewer people and tools are needed, saving significant money for the company.',
    stat: 'vs. helicopter inspection',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="14" r="10" stroke="#fbbf24" strokeWidth={1.3} fill="rgba(251,191,36,0.05)" />
        <path d="M14 8v1.5M14 18.5v1.5" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M10.5 11.5 Q14 10 17 12 Q19 14 17 16 Q14 18 10.5 16" stroke="#fbbf24" strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '04', color: '#a78bfa',
    title: 'Great Data',
    desc: 'Power line drones collect clear and detailed information using cameras, thermal sensors, and LiDAR to find cracks, rust, overheating, or trees too close to power lines.',
    stat: 'Multi-sensor data fusion',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="5" width="20" height="16" rx="2" stroke="#a78bfa" strokeWidth={1.3} fill="rgba(167,139,250,0.06)" />
        <path d="M8 17 L11 12 L14.5 14.5 L17 10 L20 13" stroke="#a78bfa" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="13" r="1.8" fill="#a78bfa" opacity={0.8} />
      </svg>
    ),
  },
  {
    num: '05', color: '#f472b6',
    title: 'Easy Access',
    desc: 'Power lines in mountains or forests can be hard to reach. Drones can fly anywhere — making inspections in remote or rugged areas simple, safe, and cost-effective.',
    stat: 'Any terrain, any location',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M3 20 L9 12 L14 16 L19 9 L25 15" stroke="#f472b6" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 22 L25 22" stroke="#f472b6" strokeWidth={1} strokeLinecap="round" opacity={0.35} />
        <circle cx="19" cy="9" r="2.5" stroke="#f472b6" strokeWidth={1.2} />
      </svg>
    ),
  },
]

const QUICK_STATS = [
  { value: '10×', label: 'Faster Inspections', color: '#00d4ff' },
  { value: '60%', label: 'Cost Reduction',     color: '#fbbf24' },
  { value: '100%', label: 'Worker Safety',      color: '#34d399' },
]

export function PLIBenefits() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.plib-stat',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="benefits" className="relative overflow-hidden py-24 md:py-32 bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25) 30%, rgba(0,212,255,0.3) 50%, rgba(0,212,255,0.25) 70%, transparent)', boxShadow: '0 0 12px rgba(0,212,255,0.1)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.04) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Benefits</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Why Choose Drones for<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Power Line Inspection?
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16">
          {QUICK_STATS.map(s => (
            <div key={s.label} className="plib-stat flex flex-col items-center py-5 px-4 rounded-2xl text-center" style={{ background: `${s.color}09`, border: `1px solid ${s.color}25`, opacity: 0 }}>
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
