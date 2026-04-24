'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'How does drone-based electronic data collection work?',
    a: 'ZenaDrone UAVs execute automated flight missions, capturing aerial imagery, LiDAR scans, infrared readings, and GPS coordinates. All data is securely transmitted in real time to our integrated processing platform, where it is analyzed and transformed into actionable insights — accessible to your team within minutes of capture.',
  },
  {
    q: 'Is drone data collection secure?',
    a: 'Yes. ZenaDrone uses end-to-end encryption for all data transmission and storage, adhering to enterprise and government compliance standards. Data captured during missions is secured immediately and remains protected throughout the entire pipeline — from drone to your dashboard.',
  },
  {
    q: 'Which industries benefit the most from electronic data collection?',
    a: 'Agriculture, construction, utilities, infrastructure, defense, and environmental monitoring are primary beneficiaries. However, any industry that requires regular site inspection, asset documentation, progress tracking, or large-scale data gathering can significantly reduce costs and increase efficiency with ZenaDrone EDC solutions.',
  },
  {
    q: 'How to extract data from a drone?',
    a: 'ZenaDrone systems offer multiple extraction methods: real-time wireless transmission to cloud platforms, on-device local storage with automated syncing, and direct export to third-party analysis tools. Our integrated platform provides a unified dashboard for accessing, filtering, and exporting all collected data.',
  },
  {
    q: 'How to conduct a drone survey?',
    a: 'Our team handles mission planning, including site assessment, flight path optimization, and regulatory compliance. The drone then executes the autonomous mission, capturing all required data points. After the flight, data is processed and delivered as reports, 3D models, or raw datasets — depending on your operational requirements.',
  },
  {
    q: 'Can ZenaDrone customize data collection solutions?',
    a: 'Absolutely. ZenaDrone designs tailored solutions based on your specific industry, site conditions, and data requirements. Whether you need custom sensor configurations, proprietary data formats, or integration with existing enterprise systems, our engineering team collaborates with you to deliver a purpose-built solution.',
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
            fontSize: '0.95rem', color: isOpen ? '#f0f4ff' : '#c8d5ea', lineHeight: 1.4,
          }}>
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isOpen ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
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
              <div className="ml-7 pl-3" style={{ borderLeft: '1.5px solid rgba(0,212,255,0.2)' }}>
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

export function EDCFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold text-primary uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem' }}>
            FAQ
          </p>
          <h2 className="font-display font-bold text-white mb-5 whitespace-nowrap" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 500 }}>
            Everything you need to know about ZenaDrone electronic data collection solutions.
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
