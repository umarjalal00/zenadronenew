'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'What makes ZenaDrone 1000 suitable for military operations?',
    a: 'ZenaDrone 1000 is engineered specifically for defense and military use cases. It combines up to 1-hour autonomous flight, VTOL capability for any-terrain deployment, AI-driven situational awareness, and modular payload support — including thermal cameras, multispectral sensors, LiDAR, and EW systems. Its military-grade airframe is built to withstand extreme environments from high altitude to intense heat and dust.',
  },
  {
    q: 'How does ZenaDrone 1000 support ISR missions?',
    a: 'ZenaDrone 1000 is equipped with high-resolution imaging and multispectral sensor payloads that deliver real-time intelligence to command and control. Live encrypted data streaming allows commanders to make rapid, informed decisions during border patrol, target tracking, and strategic reconnaissance missions — without putting personnel in high-risk zones.',
  },
  {
    q: 'Can ZenaDrone 1000 be used for counter-drone and electronic warfare?',
    a: 'Yes. ZenaDrone 1000 is designed to support EW (Electronic Warfare) payloads including jamming systems and communications disruption equipment. It provides a tactical platform for counter-UAS operations — disabling hostile drones and disrupting enemy communications infrastructure within authorized engagement parameters.',
  },
  {
    q: 'What is the flight time and range of ZenaDrone 1000?',
    a: 'ZenaDrone 1000 delivers up to 1 hour of autonomous flight per mission. Its VTOL design eliminates the need for a runway, allowing rapid deployment from virtually any terrain. Combined with autonomous charging capability, the system can sustain continuous operational cycles with minimal downtime between missions.',
  },
  {
    q: 'How is data security handled during military missions?',
    a: 'All communications between ZenaDrone 1000 and command infrastructure are protected with AES-256 encryption. The system uses hardened, anti-jam communication links designed to maintain secure connectivity in contested electromagnetic environments, ensuring mission data integrity and operational security at all times.',
  },
  {
    q: 'Is ZenaDrone 1000 available for government and defense procurement?',
    a: 'Yes. ZenaDrone systems are available through direct procurement, leasing, and Drone as a Service (DaaS) arrangements for government agencies, defense forces, and authorised private security organisations. Our team provides end-to-end support including deployment planning, crew training, and ongoing technical assistance. Contact us to discuss procurement options tailored to your operational requirements.',
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
            fontSize: '0.95rem', color: isOpen ? '#e8f8ff' : '#c8d5ea', lineHeight: 1.4,
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

export function MDFaq() {
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
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Questions
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520 }}>
            Everything you need to know about ZenaDrone 1000 military drone capabilities, operations, and procurement.
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
