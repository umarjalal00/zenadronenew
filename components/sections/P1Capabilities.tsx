'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

const CAPABILITIES = [
  {
    id: 'ai-intercept',
    color: '#ef4444',
    tag: 'AI-Driven Intercept',
    title: 'Autonomous\nTarget Intercept',
    body: 'Equipped with intelligent navigation systems that allow the P-1 to autonomously track and intercept aerial threats with minimal human control. Onboard AI classifies, locks, and closes on targets in under 3 seconds from detection.',
    badges: ['Target Lock', 'Auto Track', '<3s Response', 'AI Navigation'],
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <circle cx={20} cy={20} r={13} stroke={c} strokeWidth={1.4} strokeDasharray="5 3" opacity={0.4}/>
        <circle cx={20} cy={20} r={8}  stroke={c} strokeWidth={1.2}/>
        <circle cx={20} cy={20} r={3}  fill={c} opacity={0.9}/>
        <line x1={20} y1={7}  x2={20} y2={12} stroke={c} strokeWidth={1.5} strokeLinecap="round"/>
        <line x1={20} y1={28} x2={20} y2={33} stroke={c} strokeWidth={1.5} strokeLinecap="round"/>
        <line x1={7}  y1={20} x2={12} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round"/>
        <line x1={28} y1={20} x2={33} y2={20} stroke={c} strokeWidth={1.5} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'versatile-deploy',
    color: '#f97316',
    tag: 'Versatile Deployment',
    title: 'Disposable &\nCompliant',
    body: 'Designed as a disposable fighter drone that ensures full compliance against threats. No recovery infrastructure needed — deploy, intercept, and neutralize. The single-use architecture keeps operational costs predictable and eliminates maintenance overhead.',
    badges: ['Disposable', 'No Recovery', 'Rapid Reset', 'Compliant'],
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <path d="M20 8 L20 28" stroke={c} strokeWidth={1.5} strokeLinecap="round"/>
        <path d="M14 14 L20 8 L26 14" stroke={c} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M10 28 Q10 34 20 34 Q30 34 30 28" stroke={c} strokeWidth={1.3} fill={`${c}10`}/>
        <circle cx={20} cy={28} r={4} stroke={c} strokeWidth={1.3} fill={`${c}10`}/>
      </svg>
    ),
  },
  {
    id: 'cost-effective',
    color: '#fbbf24',
    tag: 'Cost-Effective Defense',
    title: 'Under $5,000\nPer Unit',
    body: 'Target selling price under $5,000 USD makes the P-1 the most affordable purpose-built interceptor drone available. Deploy multiples without budget strain — providing scalable, cost-proportionate defense against low-cost threat drones.',
    badges: ['<$5K / Unit', 'Low Overhead', 'Scalable', 'Budget-Friendly'],
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <path d="M8 28 L12 16 L20 22 L28 10 L32 18" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={12} cy={16} r={2.5} fill={c} opacity={0.85}/>
        <circle cx={28} cy={10} r={2.5} fill={c} opacity={0.85}/>
        <line x1={6} y1={32} x2={34} y2={32} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4}/>
        <text x={20} y={38} textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" fontWeight="bold" opacity={0.7}>$</text>
      </svg>
    ),
  },
]

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col p-7 rounded-3xl overflow-hidden"
      style={{ background: 'var(--surface-card-el)', border: `1px solid ${cap.color}18` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cap.color}35` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cap.color}18` }}
    >
      <div className="absolute top-0 left-0 w-44 h-44 pointer-events-none" style={{
        background: `radial-gradient(ellipse at top left, ${cap.color}0e 0%, transparent 70%)`,
      }}/>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{
          background: `${cap.color}10`, border: `1px solid ${cap.color}22`,
        }}>
          {cap.icon(cap.color)}
        </div>
        <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: cap.color }}>{cap.tag}</span>
      </div>

      <h3 className="font-display font-bold text-white mb-4" style={{
        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
        letterSpacing: '-0.025em', lineHeight: 1.15, whiteSpace: 'pre-line',
      }}>
        {cap.title}
      </h3>

      <p className="font-sans text-text-muted leading-relaxed mb-6 flex-1" style={{ fontSize: '1.125rem' }}>
        {cap.body}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {cap.badges.map(b => (
          <span key={b} className="px-2.5 py-1 rounded-lg font-mono" style={{
            background: `${cap.color}0a`, border: `1px solid ${cap.color}1e`,
            fontSize: '0.8125rem', color: cap.color,
          }}>
            {b}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px" style={{
        background: `linear-gradient(to right, transparent, ${cap.color}28, transparent)`,
      }}/>
    </motion.div>
  )
}

export function P1Capabilities() {
  return (
    <SectionWrapper id="p1-capabilities" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.2) 30%, rgba(239,68,68,0.2) 70%, transparent)',
      }}/>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(239,68,68,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.02) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 20%, transparent 100%)',
      }}/>

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>
            Key Capabilities
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            letterSpacing: '-0.025em', lineHeight: 1.08,
          }}>
            Engineered for One<br />
            <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Mission: Intercept
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 520, lineHeight: 1.7 }}>
            Five core capabilities that make the Interceptor P-1 the most effective and cost-efficient counter-drone solution available.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #ef4444, transparent)' }}/>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {CAPABILITIES.slice(0, 3).map((cap, i) => <CapabilityCard key={cap.id} cap={cap} index={i}/>)}
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-5 md:max-w-2xl md:mx-auto">
          {CAPABILITIES.slice(3).map((cap, i) => <CapabilityCard key={cap.id} cap={cap} index={3 + i}/>)}
        </div>
      </Container>
    </SectionWrapper>
  )
}
