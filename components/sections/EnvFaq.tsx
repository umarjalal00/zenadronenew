'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'What is Photogrammetry?',
    a: 'Photogrammetry is the science of obtaining reliable measurements from photographs. In drone operations, it involves capturing overlapping aerial images that are processed by specialized software to generate accurate 2D maps, 3D models, and point clouds of the surveyed area. Environmental Monitoring Photogrammetry enables organizations to measure terrain changes, track vegetation cover, assess deforestation rates, and monitor ecological changes with centimeter-level accuracy — all without setting foot in potentially hazardous terrain.',
  },
  {
    q: 'Is Special Training Required to Fly a Drone?',
    a: 'Yes. Operating a drone professionally — especially for environmental monitoring missions — requires proper training and, in most jurisdictions, regulatory certification. Pilots must understand flight planning, airspace regulations, emergency procedures, and how to operate the onboard sensors effectively. ZenaDrone provides comprehensive operator training programs that equip teams with everything they need to conduct safe, compliant, and effective environmental monitoring missions from day one.',
  },
  {
    q: 'Do Drones Disturb Wildlife?',
    a: 'Modern environmental drones are designed to minimize wildlife disturbance. By operating at appropriate altitudes and following established wildlife observation protocols, ZenaDrone systems can monitor animal populations, migratory routes, and habitats with minimal intrusion. Studies consistently show that well-operated drones cause far less disturbance than ground-based survey teams — making them a preferred tool for conservation researchers worldwide.',
  },
  {
    q: 'Do Drones Pollute the Environment?',
    a: 'Electric drones produce zero direct emissions during flight, making them significantly more environmentally friendly than helicopters or fixed-wing aircraft traditionally used for aerial surveys. Their low noise profile and compact footprint further reduce environmental impact during operations. Over their service life, electric drones contribute to a net reduction in carbon emissions compared to conventional monitoring methods — aligning directly with the conservation goals they support.',
  },
  {
    q: 'Why Choose ZenaDrone 1000?',
    a: 'The ZenaDrone 1000 is purpose-built for demanding field environments. It combines AI-powered analytics, interchangeable sensor payloads — including multispectral, thermal, and LiDAR options — with a long-endurance airframe capable of covering vast areas in a single mission. Whether you need to map a reforestation site, monitor a protected wildlife corridor, assess wildfire damage, or track illegal logging activity, the ZenaDrone 1000 delivers the precision, reliability, and data quality your conservation mission demands.',
  },
]

function FaqItem({ item, index, isOpen, onToggle }: {
  item: typeof FAQS[0]; index: number; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div
      className="overflow-hidden rounded-xl transition-all duration-300"
      style={{
        background: isOpen ? 'rgba(0,212,255,0.04)' : 'var(--surface-card)',
        border: `1px solid ${isOpen ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <button className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold flex-shrink-0" style={{ fontSize: '0.65rem', color: isOpen ? '#00d4ff' : 'rgba(255,255,255,0.2)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-sans font-semibold transition-colors duration-200" style={{ fontSize: '0.95rem', color: isOpen ? '#f0f4ff' : '#c8d5ea', lineHeight: 1.4 }}>
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: isOpen ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isOpen ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)'}` }}
        >
          <svg viewBox="0 0 12 12" fill="none" width={10} height={10}>
            <path d="M6 2v8M2 6h8" stroke={isOpen ? '#00d4ff' : '#8899b4'} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-5 pt-0">
              <div className="ml-7 pl-3" style={{ borderLeft: '1.5px solid rgba(0,212,255,0.2)' }}>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.88rem' }}>{item.a}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function EnvFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>FAQ</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Frequently Asked{' '}
            <span style={{ color: '#00d4ff' }}>Questions</span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 500 }}>
            Everything you need to know about ZenaDrone environmental monitoring and photogrammetry solutions.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} item={faq} index={i} isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
