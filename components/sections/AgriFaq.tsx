'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'How do drones help with agriculture?',
    a: 'Agricultural drones give farmers eyes in the sky, enabling them to scan fields in minutes, detect crop health issues early, monitor livestock, and apply inputs with surgical precision. Tasks that once took days of walking and manual inspection can now be completed in a single drone flight — saving time, reducing costs, and improving overall crop yields.',
  },
  {
    q: 'What is the best drone for monitoring agriculture?',
    a: 'The ZenaDrone 1000 is a leading choice for agricultural monitoring. It is a multi-function platform equipped with AI, high-resolution cameras, and a flexible sensor payload system. It can monitor crop health, detect plant diseases, assess irrigation needs, and deliver live data to farm operators — all on a single, adaptable system engineered for large-scale field use.',
  },
  {
    q: 'What are agricultural drone services?',
    a: 'Agricultural drone services provide professional UAV operations for farmers who prefer not to own or operate their own equipment. Services typically include field mapping, crop health assessments, spraying, sowing, and data analysis. They are an accessible way for smaller farms to benefit from precision drone technology without the upfront cost of ownership.',
  },
  {
    q: 'What is a good drone camera for farmers?',
    a: 'The best drone cameras for farming use multispectral imaging to capture data beyond what the human eye can see — including plant water stress, chlorophyll content, and early signs of disease. ZenaDrone systems support multispectral, RGB, thermal, and LiDAR sensor configurations, giving farmers the data they need regardless of their crop type or operation scale.',
  },
  {
    q: 'Why is ZenaDrone 1000 the best choice?',
    a: 'The ZenaDrone 1000 is purpose-built for demanding field operations. It combines AI-powered analytics, interchangeable sensor payloads, a long-endurance airframe, and a live data relay system into one platform. Whether you need crop health monitoring, precision spray delivery, irrigation planning, or livestock tracking, the ZenaDrone 1000 adapts to every use case — making it the most versatile agricultural drone available today.',
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

export function AgriFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionWrapper id="faq" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2) 30%, rgba(0,212,255,0.25) 50%, rgba(0,212,255,0.2) 70%, transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)',
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
            Everything you need to know about ZenaDrone agricultural drone solutions.
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
