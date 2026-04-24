'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const FAQS = [
  {
    q: 'What is Drone as a Service (DaaS)?',
    a: 'Drone as a Service (DaaS) is a subscription-based model that allows businesses and organizations to access professional drone capabilities — including pilots, sensors, data processing, and reporting — without the capital cost of purchasing and maintaining their own fleet. ZenaDrone DaaS clients select the services they need (field scanning, multispectral imaging, building inspection, surveillance, etc.), and ZenaDrone deploys certified operators with the ZenaDrone 1000 platform to complete the mission. You only pay for what you use, with the flexibility to scale up or down based on demand.',
  },
  {
    q: 'What sensors and technologies are available through ZenaDrone DaaS?',
    a: 'ZenaDrone DaaS provides access to a comprehensive sensor suite on a single multi-mission platform. Available technologies include LiDAR for 3D point-cloud mapping and elevation data, GPS tracking for centimetre-accurate positioning, multispectral sensors for capturing data across multiple light wavelengths (blue, green, red, red-edge, and near-infrared bands), high-definition 4K cameras for visual inspection and documentation, and thermal imaging for heat anomaly detection. Additional specialized attachments — including robotic arms — can be configured for specific use cases.',
  },
  {
    q: 'Which industries benefit most from DaaS?',
    a: 'ZenaDrone DaaS is purpose-built for demanding, data-intensive industries. Agriculture benefits from crop health monitoring, pest detection, irrigation management, and harvest optimization using multispectral data. The power and utilities sector uses drones for visual and thermal inspection of high-voltage lines, poles, and transformers without putting workers at risk. Security and defence agencies use drone surveillance for perimeter monitoring, intelligence gathering, GPS tagging, and thermal terrain scanning. Additional industries include environmental monitoring, city planning, construction, oil and gas, mining, search and rescue, and emergency services.',
  },
  {
    q: 'How does ZenaDrone integrate with enterprise software platforms?',
    a: 'ZenaDrone is designed to work alongside the enterprise tools organizations already depend on. It integrates with WorkAware\'s Geo Info Systems for precise asset, vehicle, equipment, and personnel tagging alongside occupational safety management. Through Tillerstack\'s field service management platform and Epazz VR Glasses, field technicians can process work orders on-site using live drone camera feeds with augmented reality overlay. ZenaDrone also integrates with PacePlus healthcare management software, where its customizable robotic arm attachment allows remote basic medical tasks to be performed in the field.',
  },
  {
    q: 'Is ZenaDrone DaaS compliant with aviation regulations?',
    a: 'Yes. All ZenaDrone DaaS operations are conducted by licensed, certified operators who comply fully with applicable civil aviation regulations in every jurisdiction of operation. ZenaDrone works closely with aviation authorities to ensure all missions meet airspace, safety, and privacy requirements. Enterprise and government clients receive dedicated compliance support, and ZenaDrone holds priority access channels with Local and Federal Government procurement bodies. Every mission is planned, executed, and documented in accordance with regulatory standards, with full audit trails available to clients upon request.',
  },
]

export function DaaSFaq() {
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
            <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
              Everything you need to know about ZenaDrone Drone as a Service subscriptions.
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
                  <button
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
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
                          <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.9rem', lineHeight: 1.78 }}>
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
