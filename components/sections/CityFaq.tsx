'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'

const FAQS = [
  {
    q: 'How are drones used in city planning?',
    a: 'Drones are used in city planning to collect aerial imagery, generate 3D city models, conduct environmental surveys, and inspect infrastructure — all far faster and at lower cost than traditional methods. Equipped with high-resolution cameras and multispectral sensors, they give GIS professionals and urban planners a complete, data-rich view of the urban environment that supports better decisions across every stage of development.',
  },
  {
    q: 'What is a drone city?',
    a: 'A drone city refers to an urban environment actively shaped by drone technology — where drones are integrated into planning, construction, logistics, and monitoring workflows. The concept captures how modern drones are reconfiguring our engagement with the urban landscape. Thanks to advances in smart drone capabilities, this is no longer a theoretical idea. Cities around the world are already leveraging drone data to improve safety, infrastructure, and resource management.',
  },
  {
    q: 'What are multispectral sensors used for in urban planning?',
    a: 'Multispectral sensors collect data across different wavelengths of light, revealing information invisible to standard cameras. In urban planning, they are used to assess vegetation health and green space quality, detect pollution sources, evaluate water bodies and drainage systems, and monitor land use changes over time. This data feeds directly into environmental impact assessments, zoning decisions, and resource allocation planning.',
  },
  {
    q: 'Can drones replace traditional surveying methods?',
    a: 'Drones significantly enhance and accelerate traditional surveying rather than replacing it outright. They cover large areas in a fraction of the time, access dangerous or restricted locations, and generate highly accurate photogrammetric data that integrates seamlessly with GIS software. For city-scale projects, drones reduce survey costs substantially while improving data resolution and frequency — giving planning teams far more information to work with.',
  },
  {
    q: 'Why choose ZenaDrone 1000 for urban planning?',
    a: 'The ZenaDrone 1000 is purpose-built for demanding, large-scale operations. It captures high-resolution imagery, performs multispectral data collection, and maintains the stability required for extended city planning surveys. Its adaptable sensor payload system means it can handle anything from massive construction project oversight to precise environmental assessments — all from a single, reliable platform designed to support every phase of urban growth.',
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

export function CityFaq() {
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
            Everything you need to know about ZenaDrone city planning and urban drone technology solutions.
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
