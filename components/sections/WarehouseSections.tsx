'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const WHY_ITEMS = [
  {
    title: 'Eliminate Manual Delays',
    desc: 'Traditional inventory relies on manual counting — slow, error-prone, and draining for staff. Warehouse drones automate scanning and auditing, removing bottlenecks from your operation.',
  },
  {
    title: 'Navigate Any Space',
    desc: 'Advanced sensors and navigation systems allow ZenaDrone 1000 to cover tight aisles and reach high shelves that put human workers at risk.',
  },
  {
    title: 'Connect to Your WMS',
    desc: 'Drone inventory management integrates seamlessly with existing warehouse management systems, ensuring real-time data flow across your entire logistics stack.',
  },
  {
    title: 'Scale with Your Warehouse',
    desc: 'Whether a small storage facility or a large-scale distribution center, drone technology is a versatile and reliable solution for warehouses of all sizes.',
  },
]

const BENEFITS = [
  {
    title: 'Unmatched Accuracy',
    desc: 'Advanced RFID and barcode scanning capabilities allow ZenaDrone to complete precise inventory counts and dramatically reduce human counting errors in repetitive tasks.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="4" width="20" height="20" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M8 14 L12 18 L20 10" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Time Efficiency',
    desc: 'Cycle counting tasks that take hours or days manually are completed in a fraction of the time. Staff are freed for higher-value work while the drone handles repetitive scanning missions.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <circle cx="14" cy="15" r="9" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M14 10 L14 15 L17.5 18.5" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4 L14 2 L18 4" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    title: 'Improved Safety',
    desc: 'Warehouses with tall racking or hazardous materials pose real risks to staff. Drones perform inspections in narrow spaces and at height autonomously, keeping your team safely on the ground.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <path d="M14 3 L22 6.5 L22 13 C22 18.2 18.5 22.5 14 24 C9.5 22.5 6 18.2 6 13 L6 6.5 Z" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M10 13.5 L13 16.5 L18.5 11" stroke="#00d4ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Data',
    desc: 'Live inventory feeds let managers monitor stock levels, locate items instantly, and respond to discrepancies in real time — improving the overall workflow and decision-making speed.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={24} height={24}>
        <rect x="4" y="4" width="20" height="20" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <polyline points="6,20 10,14 14,17 18,10 22,13" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="13" r="1.8" fill="#00d4ff" opacity="0.85" />
      </svg>
    ),
  },
]

const INDUSTRIES = [
  {
    name: 'E-Commerce',
    desc: 'Quick and accurate inventory updates are mission-critical in e-commerce. Drone inventory management keeps pace with fast-moving operations, enabling warehouses to meet customer demand without delays.',
    items: ['Real-time stock level tracking', 'Fast cycle counting', 'Peak season scalability', 'Returns processing support'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <rect x="3" y="8" width="22" height="16" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M9 8 L9 6 C9 4.3 10.3 3 12 3 L16 3 C17.7 3 19 4.3 19 6 L19 8" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
        <circle cx="14" cy="19" r="2.5" stroke="#00d4ff" strokeWidth="1.1" fill="rgba(0,212,255,0.08)" />
      </svg>
    ),
  },
  {
    name: 'Retail & Manufacturing',
    desc: 'Retail warehouses use drones to track stock levels, reduce discrepancies, and ensure shelves stay stocked. Manufacturers benefit from steady raw material supply tracking to prevent production delays.',
    items: ['Shelf stock monitoring', 'Perishable goods tracking', 'Raw material inventory', 'Production supply chain'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <rect x="3" y="10" width="22" height="14" rx="1.5" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <rect x="7" y="5" width="14" height="5" rx="1" stroke="#00d4ff" strokeWidth="1.2" />
        <line x1="3" y1="16" x2="25" y2="16" stroke="#00d4ff" strokeWidth="0.9" opacity="0.35" />
        <rect x="7" y="18" width="4" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="0.9" opacity="0.6" />
        <rect x="13" y="18" width="4" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="0.9" opacity="0.6" />
        <rect x="19" y="18" width="3" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="0.9" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Logistics Operations',
    desc: 'Drones optimize supply chain warehouses with real-time data and faster inventory checks. Reduced picking times and transparent stock visibility create a more efficient, reliable logistics network.',
    items: ['Supply chain visibility', 'Picking time reduction', 'Dispatch accuracy', 'Cross-dock coordination'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <rect x="2" y="12" width="18" height="12" rx="1.5" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M20 16 L24 16 L26 20 L26 24 L20 24 Z" stroke="#00d4ff" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(0,212,255,0.04)" />
        <circle cx="7" cy="26" r="2.5" stroke="#00d4ff" strokeWidth="1.1" fill="rgba(0,212,255,0.08)" />
        <circle cx="22" cy="26" r="2.5" stroke="#00d4ff" strokeWidth="1.1" fill="rgba(0,212,255,0.08)" />
        <path d="M5 12 L8 5 L16 5 L16 12" stroke="#00d4ff" strokeWidth="1.1" strokeLinejoin="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    name: 'Pharmaceuticals',
    desc: 'Pharma warehouses demand precision and compliance. Drone inventory management ensures accurate, speedy tracking of sensitive materials — supporting on-time dispatch and strict regulatory requirements.',
    items: ['Controlled substance tracking', 'Expiry date monitoring', 'Regulatory compliance support', 'Cold-chain inventory'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <rect x="8" y="3" width="12" height="22" rx="3" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <line x1="14" y1="9" x2="14" y2="17" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="10" y1="13" x2="18" y2="13" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="10" y="5" width="8" height="4" rx="1" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" strokeWidth="0.8" />
      </svg>
    ),
  },
]

const ZD_FEATURES = [
  {
    title: 'Advanced Navigation System',
    desc: 'Smooth, autonomous maneuvering through tight aisles and around tall racking — no GPS required indoors.',
  },
  {
    title: 'Sensors & High-Quality Imaging',
    desc: 'High-resolution cameras and RFID/barcode readers enable rapid, reliable item identification. Obstacle avoidance sensors ensure safe flight in dense environments.',
  },
  {
    title: 'Seamless WMS Integration',
    desc: 'Connects directly to existing warehouse management software for automatic, real-time data synchronization with no manual export needed.',
  },
  {
    title: 'Durable Composition',
    desc: 'Built to withstand demanding warehouse conditions — temperature variations, dust, and continuous daily operation without performance degradation.',
  },
  {
    title: 'Customizable Configuration',
    desc: 'Adaptable for diverse warehouse needs. Attach RFID readers, barcode scanners, or thermal sensors to tailor the drone to your specific operation.',
  },
]

export function WarehouseSections() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = (trigger: string, start = 'top 72%') => ({
      scrollTrigger: { trigger, start, once: true },
    })

    gsap.fromTo('.wh-why-item',    { x: -28, opacity: 0, filter: 'blur(6px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.1, ease: 'power3.out', ...st('.wh-overview') })
    gsap.fromTo('.wh-ben-card',    { y: 28, opacity: 0 },   { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', ...st('.wh-benefits') })
    gsap.fromTo('.wh-ben-icon',    { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.8)', ...st('.wh-benefits') })
    gsap.fromTo('.wh-ind-card',    { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out', ...st('.wh-industries') })
    gsap.fromTo('.wh-ind-icon',    { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.6)', ...st('.wh-industries') })
    gsap.fromTo('.wh-feat-item',   { x: 22, opacity: 0 },   { x: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power3.out', ...st('.wh-features') })
    gsap.fromTo('.wh-feat-check',  { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.09, ease: 'back.out(2)', ...st('.wh-features') })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>

      {/* ── 1. Overview ─────────────────────────────────────────────────────────── */}
      <section className="wh-overview py-24 bg-background">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>Why Warehouse Drones</span>
              </div>
              <h2 className="font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Revolutionize Your<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Warehouse Operations</span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-8"
                style={{ fontSize: '1rem', lineHeight: 1.78, maxWidth: 480 }}>
                Make a move and start efficient inventory management with ZenaDrone 1000. Drone inventory management technology automates procedures, lessens errors, and optimizes warehouse operations of all sizes — from small storage facilities to large-scale distribution centers.
              </p>
              <div className="flex flex-col gap-4">
                {WHY_ITEMS.map((item, i) => (
                  <div key={i} className="wh-why-item flex items-start gap-3.5" style={{ opacity: 0 }}>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5"
                      style={{ width: 28, height: 28, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.88rem' }}>{item.title}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats visual */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.12)' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.62rem', color: '#00d4ff' }}>Operational Metrics</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Inventory Accuracy',    value: '99.2%', pct: 99 },
                  { label: 'Counting Speed Gain',   value: '5×',    pct: 83 },
                  { label: 'Error Rate Reduction',  value: '94%',   pct: 94 },
                  { label: 'Cost Savings',           value: '60%',   pct: 60 },
                  { label: 'Staff Time Freed',       value: '72%',   pct: 72 },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-text-muted" style={{ fontSize: '0.8rem' }}>{m.label}</span>
                      <span className="font-display font-bold" style={{ fontSize: '0.88rem', color: '#00d4ff' }}>{m.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: 'linear-gradient(90deg, #00d4ff, #0099cc)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                <span className="font-mono text-text-muted" style={{ fontSize: '0.62rem', letterSpacing: '0.1em' }}>POWERED BY</span>
                <span className="font-display font-bold" style={{ fontSize: '0.88rem', color: '#00d4ff', letterSpacing: '-0.02em' }}>ZenaDrone 1000</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Benefits ──────────────────────────────────────────────────────────── */}
      <section className="wh-benefits py-24" style={{ background: 'rgba(0,212,255,0.018)' }}>
        <Container>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>Essential Benefits</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Why Drones Transform<br />
              <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Warehouse Management</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="wh-ben-card flex flex-col gap-4 p-6 rounded-2xl" style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="wh-ben-icon flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 50, height: 50, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.18)' }}>
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-white mb-2" style={{ fontSize: '0.95rem' }}>{b.title}</h3>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.68 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Industries ────────────────────────────────────────────────────────── */}
      <section className="wh-industries py-24 bg-background">
        <Container>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>Industries</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Industries That Benefit<br />
              <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>From Warehouse Drones</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="wh-ind-card rounded-2xl overflow-hidden" style={{ opacity: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.12)' }}>
                <div className="p-5 pb-4" style={{ borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
                  <div className="wh-ind-icon flex items-center justify-center rounded-xl mb-4"
                    style={{ width: 50, height: 50, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    {ind.icon}
                  </div>
                  <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}>{ind.name}</h3>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.68 }}>{ind.desc}</p>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  {ind.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#00d4ff', opacity: 0.7 }} />
                      <span className="font-sans text-text-muted" style={{ fontSize: '0.77rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. ZenaDrone 1000 Features ───────────────────────────────────────────── */}
      <section className="wh-features py-24" style={{ background: 'rgba(0,212,255,0.018)' }}>
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.68rem', color: '#00d4ff' }}>ZenaDrone 1000</span>
              </div>
              <h2 className="font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Your Warehouse<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Drone Solution</span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-8"
                style={{ fontSize: '1rem', lineHeight: 1.78, maxWidth: 480 }}>
                ZenaDrone 1000 is at the forefront of warehouse innovation. Its combination of advanced sensors, autonomous navigation, and seamless software integration makes it the complete solution for modern inventory management.
              </p>
              <div className="flex flex-col gap-4">
                {ZD_FEATURES.map((f, i) => (
                  <div key={i} className="wh-feat-item flex items-start gap-4" style={{ opacity: 0 }}>
                    <div className="wh-feat-check flex-shrink-0 flex items-center justify-center rounded-xl mt-0.5"
                      style={{ width: 32, height: 32, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                      <svg viewBox="0 0 14 14" fill="none" width={11} height={11}>
                        <path d="M2 7 L5.5 10.5 L12 4" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.88rem' }}>{f.title}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.65 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature highlight cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: 'RFID Scanning',         val: 'Active' },
                { label: 'Barcode Reading',        val: '1D + 2D' },
                { label: 'Obstacle Avoidance',     val: 'Enabled' },
                { label: 'WMS Integration',        val: 'Seamless' },
                { label: 'Flight Endurance',       val: '55 min' },
                { label: 'Indoor Navigation',      val: 'Autonomous' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <span className="font-mono text-text-muted uppercase tracking-[0.1em]" style={{ fontSize: '0.58rem' }}>{item.label}</span>
                  <span className="font-display font-bold" style={{ fontSize: '0.95rem', color: '#00d4ff', letterSpacing: '-0.02em' }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

    </div>
  )
}
