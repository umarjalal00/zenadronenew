'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap }    from '@/lib/gsap'

const STEPS = [
  {
    num: '01', color: '#f97316',
    title: 'Advanced Sensors for Wildfire Detection',
    desc: 'ZenaDrone drones use infrared cameras, heat sensors, and smoke detectors to pinpoint fire locations with precision. They detect fires even in remote or high-risk areas where ground teams cannot safely operate, ensuring quicker response times and earlier containment.',
    tags: ['Infrared Cameras', 'Heat Sensors', 'Smoke Detection', 'GPS Mapping'],
    image: '/images/Advanced.jpeg',
  },
  {
    num: '02', color: '#a78bfa',
    title: 'Predictive Analytics & AI',
    desc: 'ZenaDrone leverages artificial intelligence to analyze fire behavior patterns, wind direction, fuel loads, and terrain data. This helps wildfire fighting teams prioritize areas needing immediate attention and plan resource deployment strategies before fires escalate.',
    tags: ['AI Fire Modeling', 'Spread Prediction', 'Resource Planning', 'Pattern Analysis'],
    image: '/images/Predictive.jpeg',
  },
  {
    num: '03', color: '#34d399',
    title: 'Collaboration with Ground Teams',
    desc: 'Drones in wildfire fighting work hand-in-hand with incident command and ground crews. They provide live aerial footage, real-time hotspot maps, and detailed 3D terrain data, enabling fully coordinated suppression efforts across all active sectors simultaneously.',
    tags: ['Live Aerial Feed', 'Hotspot Maps', '3D Terrain Data', 'Command Relay'],
    image: '/images/Collaboration.jpeg',
  },
]

export function WFHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    STEPS.forEach((_, i) => {
      const row = sectionRef.current?.querySelectorAll('.wfh-row')[i]
      if (!row) return
      gsap.fromTo(row,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 78%', once: true } }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full bg-background py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.2) 30%, rgba(249,115,22,0.25) 50%, rgba(249,115,22,0.2) 70%, transparent)' }} />

      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>How It Works</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            How Wildfire Drones{' '}
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Work
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
            ZenaDrone wildfire systems combine advanced sensors, AI analytics, and real-time coordination to deliver a complete aerial intelligence solution.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`wfh-row grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              style={{ opacity: 0 }}
            >
              {/* Image */}
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <Image src={step.image} alt={step.title} fill className="object-cover" />
                  {/* Step badge */}
                  <div className="absolute top-4 left-4 px-3 py-2 rounded-xl" style={{ background: 'rgba(7,7,15,0.85)', border: `1px solid ${step.color}35`, backdropFilter: 'blur(12px)' }}>
                    <span className="font-mono font-bold" style={{ fontSize: '0.7rem', color: step.color }}>STEP {step.num}</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono font-bold" style={{ fontSize: '2.5rem', color: `${step.color}20`, letterSpacing: '-0.06em', lineHeight: 1 }}>{step.num}</span>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${step.color}50, transparent)`, maxWidth: 60 }} />
                  <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: step.color }}>How It Works</span>
                </div>
                <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{step.title}</h3>
                <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '0.93rem' }}>{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg font-mono" style={{ background: `${step.color}0c`, border: `1px solid ${step.color}25`, fontSize: '0.68rem', color: step.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
