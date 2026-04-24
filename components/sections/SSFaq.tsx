'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'Can security drones operate at night?',
    a: 'Yes. ZenaDrone surveillance UAVs are equipped with thermal and infrared sensors that allow them to operate effectively in complete darkness. Night vision capabilities enable detection of heat signatures, movement, and anomalies that are invisible to standard cameras — making them equally effective day or night, in any lighting condition.',
  },
  {
    q: 'Are there any regulations for security drones?',
    a: 'Yes. Surveillance drone operations are subject to local aviation authority regulations, airspace restrictions, and privacy laws that vary by country and region. ZenaDrone drones come with built-in geofencing and compliance systems. Our team works with clients to ensure all operations meet regulatory requirements, including required permissions, flight height limitations, and data handling protocols.',
  },
  {
    q: 'What are some privacy concerns with security drones?',
    a: 'While surveillance drones raise legitimate privacy questions, they are governed by strict legal frameworks. ZenaDrone systems are designed for authorised use by law enforcement, security agencies, and licensed operators. All video feeds are encrypted and access-controlled. Proper use cases include perimeter security, public safety, and search and rescue — not indiscriminate monitoring of private individuals.',
  },
  {
    q: 'Can security drones be autonomous?',
    a: 'Yes. ZenaDrone surveillance UAVs support fully autonomous and semi-autonomous flight modes. Smart automation software enables pre-programmed patrol routes, automatic target following, geofence alerts, and return-to-base on low battery. AI-driven object detection and tracking operate in real time, with a human operator always maintaining override control.',
  },
  {
    q: 'How many drones do you need to patrol an area?',
    a: 'The number depends on the size of the area, terrain, and desired coverage frequency. A single ZenaDrone can patrol several kilometres of perimeter per flight. For large estates or critical infrastructure, we typically recommend a fleet of 2–4 drones operating in rotation for continuous coverage. Our team provides site assessments and recommends the optimal deployment configuration for your specific requirements.',
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
        border: `1px solid ${isOpen ? 'rgba(0,212,255,0.28)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold flex-shrink-0" style={{
            fontSize: '0.65rem', color: isOpen ? '#00d4ff' : 'rgba(255,255,255,0.2)',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-sans font-semibold transition-colors duration-200" style={{
            fontSize: '0.95rem', color: isOpen ? '#e0f7ff' : '#c8d5ea', lineHeight: 1.4,
          }}>
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? 'rgba(0,212,255,0.14)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isOpen ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <svg viewBox="0 0 12 12" fill="none" width={10} height={10}>
            <path d="M6 2v8M2 6h8" stroke={isOpen ? '#00d4ff' : '#8899b4'} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-5 pt-0">
              <div className="ml-7 pl-3" style={{ borderLeft: '1.5px solid rgba(0,212,255,0.22)' }}>
                <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.88rem' }}>
                  {item.a}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SSFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            FAQ
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Frequently Asked{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Questions
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 500 }}>
            Everything you need to know about ZenaDrone security and surveillance drone solutions.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                item={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
