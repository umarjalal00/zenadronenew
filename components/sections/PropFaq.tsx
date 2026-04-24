'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const FAQS = [
  {
    q: 'How are drones used in property management?',
    a: 'Drones are used to conduct aerial surveys and inspections of properties from above, capturing high-resolution imagery and video of rooftops, facades, gutters, grounds, and surrounding land. In property management, this means owners and managers can assess the condition of a building — including hard-to-reach areas — without scaffolding, ladders, or putting workers at height. Drones equipped with thermal sensors can also detect heat loss, moisture intrusion, and insulation gaps that are invisible to the naked eye, enabling proactive maintenance before small issues become expensive repairs.',
  },
  {
    q: 'What types of properties can be surveyed by drones?',
    a: 'Drones are versatile enough to survey virtually any property type. Residential homes benefit from roof and gutter inspections, chimney checks, and garden assessments. Commercial buildings — including warehouses, offices, and retail complexes — require regular facade and structural surveys that drones can complete quickly without disruption to tenants. Recreational facilities such as golf courses, sports grounds, and resort properties also benefit from large-area aerial mapping to track landscaping health, drainage, and surface conditions. Historic or listed buildings that require delicate inspection without physical contact are ideal candidates for non-invasive drone surveys.',
  },
  {
    q: 'How do drones save costs in property management?',
    a: 'Traditional property inspections require scaffolding, cherry pickers, or rope access teams — all of which are expensive, time-consuming, and carry safety risks. A drone can survey an entire building exterior in a fraction of the time at a fraction of the cost. ZenaDrone 1000 can reduce inspection costs by up to 60% compared to conventional methods. Additionally, by catching issues early through regular drone monitoring, property managers can avoid costly emergency repairs and extend the lifespan of roofing, cladding, and structural elements. Insurance claims are also better supported with precise aerial documentation.',
  },
  {
    q: 'What features make drones effective for property surveys?',
    a: 'The most effective property survey drones combine several capabilities: high-resolution optical cameras (4K or better) for detailed visual inspection, thermal imaging sensors to detect moisture and heat anomalies, GPS-guided autonomous flight for consistent, repeatable survey paths, and the ability to hover precisely near specific features. ZenaDrone 1000 offers all of these in a single multi-mission platform. Its stability in varied wind conditions, long flight endurance, and ability to transmit live footage to ground teams make it particularly well-suited for thorough property assessments without the need for multiple specialist tools.',
  },
  {
    q: 'Are drone property surveys safe and legal?',
    a: 'Yes — when operated by trained and certified pilots under the applicable civil aviation regulations. In most jurisdictions, commercial drone operations require operator certification and, for flights near buildings or populated areas, specific permits or waivers. ZenaDrone services are carried out by licensed operators who comply with all local airspace and privacy regulations. Safety is a core advantage of drone surveys: instead of workers climbing ladders or rigging scaffolding, the drone does the work while the inspection team remains safely on the ground. All data captured during surveys is handled in accordance with data protection standards.',
  },
]

export function PropFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-background">
      <Container>
        <div>

          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.85rem', color: '#00d4ff' }}>FAQ</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
              Everything you need to know about using ZenaDrone for property management and aerial surveys.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div key={i}
                  style={{
                    background: isOpen ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isOpen ? 'rgba(0,212,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14,
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                >
                  <button
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-sans font-semibold text-white" style={{ fontSize: '1.05rem', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 transition-all duration-300"
                      style={{
                        width: 26, height: 26,
                        background: isOpen ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isOpen ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
                      }}>
                      <svg viewBox="0 0 12 12" fill="none" width={10} height={10}
                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                        <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? '#00d4ff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? '#00d4ff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-5">
                          <div className="h-px w-full mb-4" style={{ background: 'rgba(0,212,255,0.1)' }} />
                          <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', lineHeight: 1.78 }}>
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
