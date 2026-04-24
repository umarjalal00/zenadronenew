'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'How do wildfire drones help with fire management?',
    a: 'ZenaDrone wildfire UAVs provide real-time aerial intelligence that ground teams and manned aircraft cannot match. Equipped with thermal imaging, multi-spectral sensors, and AI-driven fire modeling, they detect hotspots through dense smoke, map active fire fronts, and relay live data directly to incident command — enabling faster containment decisions and safer resource deployment.',
  },
  {
    q: 'Can wildfire drones be used in other industries?',
    a: 'Absolutely. While optimized for wildfire response, ZenaDrone systems are widely used across environmental conservation for forest health monitoring, by utility companies for power line inspection in fire-prone corridors, by insurance companies for post-fire damage assessment, and by government agencies for large-scale land and infrastructure surveillance.',
  },
  {
    q: 'How are drones used by fire departments?',
    a: 'Fire department drone programs deploy ZenaDrone units as persistent aerial platforms during active incidents. They provide continuous overhead coverage, identify escape routes for ground crews, support evacuation management, map terrain in real time for firebreak planning, and document incident progression for after-action review — all without putting additional personnel in harm\'s way.',
  },
  {
    q: 'Are wildfire drones affordable for smaller departments?',
    a: 'Yes. ZenaDrone systems are significantly more cost-effective than manned aircraft, requiring fewer personnel to operate and lower ongoing maintenance overhead. Our modular payload approach means departments can scale capabilities to their budget and operational needs, with financing and lease options available for agencies of all sizes.',
  },
  {
    q: 'Why is ZenaDrone 1000 the best choice for wildfire operations?',
    a: 'The ZenaDrone 1000 is purpose-engineered for extreme environments. Its weatherproof airframe withstands high heat, ash, and sustained winds. It carries interchangeable payloads — thermal cameras, LiDAR, multi-spectral sensors — and transmits encrypted live data to command. Combined with a 99.9% mission success rate across 500+ deployments in 40+ countries, it is the most proven aerial platform for wildfire operations available today.',
  },
]

function FaqItem({ item, index, isOpen, onToggle }: {
  item: typeof FAQS[0]; index: number; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div
      className="overflow-hidden rounded-xl transition-all duration-300"
      style={{
        background: isOpen ? 'rgba(249,115,22,0.04)' : 'var(--surface-card)',
        border: `1px solid ${isOpen ? 'rgba(249,115,22,0.28)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold flex-shrink-0" style={{
            fontSize: '0.65rem', color: isOpen ? '#f97316' : 'rgba(255,255,255,0.2)',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-sans font-semibold transition-colors duration-200" style={{
            fontSize: '0.95rem', color: isOpen ? '#fff5ee' : '#c8d5ea', lineHeight: 1.4,
          }}>
            {item.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? 'rgba(249,115,22,0.14)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isOpen ? 'rgba(249,115,22,0.35)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <svg viewBox="0 0 12 12" fill="none" width={10} height={10}>
            <path d="M6 2v8M2 6h8" stroke={isOpen ? '#f97316' : '#8899b4'} strokeWidth="1.4" strokeLinecap="round" />
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
              <div className="ml-7 pl-3" style={{ borderLeft: '1.5px solid rgba(249,115,22,0.22)' }}>
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

export function WFFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.2) 30%, rgba(249,115,22,0.25) 50%, rgba(249,115,22,0.2) 70%, transparent)',
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(249,115,22,0.035) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#f97316' }}>
            FAQ
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Frequently Asked{' '}
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Questions
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 500 }}>
            Everything you need to know about ZenaDrone wildfire drone solutions and aerial fire management.
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
