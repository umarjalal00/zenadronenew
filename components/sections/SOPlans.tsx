'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const BUY_FEATURES = [
  'Own and franchise ZenaDrone 1000 outright',
  'Data collected and securely stored in the cloud',
  'Access restricted to authorised personnel only',
  'Full hardware ownership and asset control',
  'On-site deployment for your specific operations',
  'Dedicated technical support and maintenance',
]

const SHARE_FEATURES = [
  'Subscribe and schedule scans on your timeline',
  'Securely access aerial data from the cloud',
  'Cost-effective without capital expenditure',
  'Expert operator support on every mission',
  'Scale up or down based on operational needs',
  'Well-informed decisions across all operations',
]

export function SOPlans() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
    })
    tl.fromTo('.soplan-card',
      { opacity: 0, y: 50, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: 'power3.out', stagger: 0.15 }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="plans" className="relative w-full bg-background py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Ambient glow */}
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 500, height: 500, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute right-[15%] top-1/3 pointer-events-none" style={{ width: 380, height: 380, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.035) 0%, transparent 70%)', filter: 'blur(55px)' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Service Plans</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Choose Your{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ZenaDrone Plan
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.7 }}>
            We cater to diverse budgets and ensure our services align with your specific requirements. Whether you&apos;re looking to own a drone or subscribe to shared access, we&apos;ve got you covered.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Buy-A-Drone */}
          <motion.div
            className="soplan-card relative p-8 rounded-3xl transition-all duration-400"
            style={{
              background: hovered === 0 ? 'rgba(0,212,255,0.07)' : 'var(--surface-card)',
              border: `1px solid ${hovered === 0 ? 'rgba(0,212,255,0.35)' : 'rgba(0,212,255,0.18)'}`,
              boxShadow: hovered === 0 ? '0 0 60px rgba(0,212,255,0.1)' : 'none',
              opacity: 0,
            }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Top glow when hovered */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl transition-opacity duration-400" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.6), transparent)', opacity: hovered === 0 ? 1 : 0.3 }} />

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
                    <svg viewBox="0 0 20 20" fill="none" width={16} height={16}>
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="#00d4ff" strokeWidth={1.3} />
                      <path d="M7 10 L9.5 12.5 L13.5 7.5" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.7rem', color: '#00d4ff' }}>Ownership</span>
                </div>
                <h3 className="font-display font-bold text-white mb-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                  Buy-A-Drone
                </h3>
                <p className="font-sans text-text-muted" style={{ fontSize: '0.875rem' }}>Full drone ownership &amp; franchise</p>
              </div>
              <div className="px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>ASSET</span>
              </div>
            </div>

            <p className="font-sans text-text-muted leading-relaxed mb-7" style={{ fontSize: '0.9rem', lineHeight: 1.72 }}>
              Own and franchise the ZenaDrone 1000 or get assistance with data collection during field scanning. Data gathered is securely stored in cloud storage accessible only to authorised personnel.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {BUY_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
                    <svg viewBox="0 0 8 8" fill="none" width={6} height={6}><path d="M1.5 4 L3 5.5 L6.5 2" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="font-sans text-text-muted" style={{ fontSize: '0.855rem', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <motion.a href="#book-demo"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-sans font-semibold transition-colors duration-300"
              style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 24px rgba(0,212,255,0.3)' }}
            >
              Get Started
              <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.a>
          </motion.div>

          {/* Share-A-Drone */}
          <motion.div
            className="soplan-card relative p-8 rounded-3xl transition-all duration-400"
            style={{
              background: hovered === 1 ? 'rgba(0,212,255,0.07)' : 'var(--surface-card)',
              border: `1px solid ${hovered === 1 ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: hovered === 1 ? '0 0 60px rgba(0,212,255,0.1)' : 'none',
              opacity: 0,
            }}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-3xl transition-opacity duration-400" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)', opacity: hovered === 1 ? 1 : 0.15 }} />

            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)' }}>
                    <svg viewBox="0 0 20 20" fill="none" width={16} height={16}>
                      <circle cx="7" cy="14" r="3" stroke="#00d4ff" strokeWidth={1.2} />
                      <circle cx="13" cy="14" r="3" stroke="#00d4ff" strokeWidth={1.2} />
                      <circle cx="10" cy="6"  r="3" stroke="#00d4ff" strokeWidth={1.2} />
                      <line x1="9"  y1="8"  x2="7"  y2="11" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
                      <line x1="11" y1="8"  x2="13" y2="11" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
                    </svg>
                  </div>
                  <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.7rem', color: '#00d4ff' }}>Subscription</span>
                </div>
                <h3 className="font-display font-bold text-white mb-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}>
                  Share-A-Drone
                </h3>
                <p className="font-sans text-text-muted" style={{ fontSize: '0.875rem' }}>Collaborative drone subscription</p>
              </div>
              <div className="px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}>
                <span className="font-mono font-bold" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>SHARED</span>
              </div>
            </div>

            <p className="font-sans text-text-muted leading-relaxed mb-7" style={{ fontSize: '0.9rem', lineHeight: 1.72 }}>
              Collaborative drone solutions designed for any industry. Simply subscribe, schedule scans, and securely access invaluable aerial data from the cloud for well-informed decisions.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {SHARE_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.25)' }}>
                    <svg viewBox="0 0 8 8" fill="none" width={6} height={6}><path d="M1.5 4 L3 5.5 L6.5 2" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="font-sans text-text-muted" style={{ fontSize: '0.855rem', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <motion.a href="#book-demo"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-sans font-medium transition-all duration-300"
              style={{ border: '1px solid rgba(0,212,255,0.35)', color: '#00d4ff', fontSize: '0.9rem' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              Subscribe Now
              <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
