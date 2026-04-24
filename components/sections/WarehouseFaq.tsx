'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const FAQS = [
  {
    q: 'How do drones for warehouses integrate with existing systems?',
    a: 'ZenaDrone 1000 is designed for seamless integration with existing warehouse management systems (WMS). It communicates via standard APIs and data protocols, allowing real-time inventory data captured during drone flights to sync automatically into your WMS without manual data entry. This means stock counts, location data, and scan results are immediately available to warehouse managers and supply chain software. The integration process is handled by ZenaDrone\'s onboarding team and typically requires minimal changes to your existing infrastructure.',
  },
  {
    q: 'What is the operational range of drones for warehouses?',
    a: 'For indoor warehouse environments, ZenaDrone 1000 operates autonomously across the full footprint of the facility — there is no practical range limit within an enclosed building. The drone navigates using onboard sensor fusion (LiDAR, ultrasonic, and optical flow) rather than GPS, making it fully capable in GPS-denied indoor spaces. Flight endurance per charge is approximately 55 minutes, allowing it to cover large distribution centers in a single session. For very large facilities, multiple drones can be deployed simultaneously from a central charging station.',
  },
  {
    q: 'Can a warehouse drone handle high-density spaces?',
    a: 'Yes. ZenaDrone 1000 is specifically engineered for confined, high-density environments. Its obstacle avoidance sensors continuously map the surrounding space, allowing it to navigate narrow aisles as tight as 1.2 metres wide and manoeuvre around racking, conveyor systems, and other warehouse infrastructure. The drone maintains stable flight near tall shelving units without requiring wide clearance paths. Its compact form factor and precise hovering capability also allow it to position itself accurately at specific shelf locations for targeted scanning.',
  },
  {
    q: 'Is using warehouse drones safe for employees?',
    a: 'Warehouse drone deployments are designed with personnel safety as the top priority. ZenaDrone 1000 uses multi-layered obstacle avoidance — combining proximity sensors, computer vision, and pre-mapped flight paths — to ensure it never approaches a person unexpectedly. Inventory missions are typically scheduled during low-traffic periods (after hours, shift changes) to further minimize any interaction. In facilities that operate continuously, geofenced safety zones and automatic "hold" behaviors when humans are detected in the flight path are standard operational protocols.',
  },
  {
    q: 'How long does a warehouse drone last in every operation?',
    a: 'ZenaDrone 1000 offers approximately 55 minutes of continuous flight time per charge under typical indoor warehouse conditions. A full charge cycle takes around 90 minutes using the standard charging dock. For large warehouses requiring longer uninterrupted coverage, hot-swappable battery systems or multiple drone units operating in rotation are available. Over its operational lifespan, ZenaDrone 1000 is built for thousands of flight cycles with minimal maintenance — its durable composition handles the repetitive daily demands of warehouse environments without performance degradation.',
  },
]

export function WarehouseFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-background">
      <Container>
        <div>

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>FAQ</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-text-muted" style={{ fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.72 }}>
              Everything you need to know about using ZenaDrone for warehouse inventory management.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div key={i} style={{
                  background: isOpen ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isOpen ? 'rgba(0,212,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 14,
                  transition: 'border-color 0.25s, background 0.25s',
                }}>
                  <button className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}>
                    <span className="font-sans font-semibold text-white" style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 transition-all duration-300"
                      style={{ width: 26, height: 26, background: isOpen ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isOpen ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.1)'}` }}>
                      <svg viewBox="0 0 12 12" fill="none" width={10} height={10}
                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                        <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? '#00d4ff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? '#00d4ff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-5">
                          <div className="h-px w-full mb-4" style={{ background: 'rgba(0,212,255,0.1)' }} />
                          <p className="font-sans text-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.78 }}>
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
