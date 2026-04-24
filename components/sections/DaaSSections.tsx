'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const WHY_FEATURES = [
  { title: 'Subscription Flexibility',    desc: 'Choose how often and which drone services you need. Scale up or down on your own terms with no long-term lock-in.' },
  { title: 'Multi-Mission Platform',      desc: 'ZenaDrone 1000 supports LiDAR, GPS, multispectral, and thermal payloads — all in one system.' },
  { title: 'Expert Certified Operators',  desc: 'All operations are carried out by certified drone pilots fully compliant with civil aviation regulations.' },
  { title: 'Actionable Data Outputs',     desc: 'Receive processed reports, 3D models, maps, and real-time feeds — not just raw footage.' },
  { title: 'Priority Dedicated Support',  desc: 'DaaS subscribers receive priority access and dedicated account management for rapid deployment.' },
]

const SENSORS = [
  {
    name: 'LiDAR Scanning',
    desc: 'Precise 3D point-cloud mapping and elevation-based topography generation for terrain analysis.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <rect x="3" y="12" width="2" height="6" rx="0.5" fill="#00d4ff" opacity="0.9" />
        <rect x="7" y="9" width="2" height="9" rx="0.5" fill="#00d4ff" opacity="0.75" />
        <rect x="11" y="6" width="2" height="12" rx="0.5" fill="#00d4ff" opacity="0.85" />
        <rect x="15" y="10" width="2" height="8" rx="0.5" fill="#00d4ff" opacity="0.7" />
        <rect x="19" y="14" width="2" height="4" rx="0.5" fill="#00d4ff" opacity="0.6" />
        <line x1="3" y1="21" x2="21" y2="21" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: 'GPS Tracking',
    desc: 'Centimetre-accurate positioning and waypoint tagging for repeatable mission paths and asset records.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <circle cx="12" cy="10" r="5" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.08)" />
        <circle cx="12" cy="10" r="2" fill="#00d4ff" />
        <path d="M12 15 L12 21" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M9 21 L15 21" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 5 C7 2.8 9.2 1 12 1 C14.8 1 17 2.8 17 5" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: 'Multispectral Sensors',
    desc: 'Capture data across multiple light wavelengths providing insights beyond what the human eye can perceive.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <line x1="3" y1="8" x2="21" y2="8" stroke="#00d4ff" strokeWidth="1.2" opacity="0.35" />
        <line x1="3" y1="11" x2="21" y2="11" stroke="#00d4ff" strokeWidth="1.3" opacity="0.55" />
        <line x1="3" y1="14" x2="21" y2="14" stroke="#00d4ff" strokeWidth="1.4" opacity="0.8" />
        <line x1="3" y1="17" x2="21" y2="17" stroke="#00d4ff" strokeWidth="1.2" opacity="0.6" />
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#00d4ff" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: 'HD Cameras',
    desc: '4K+ video and photo capture providing detailed visual records for inspection reports and documentation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <rect x="2" y="6" width="14" height="12" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.06)" />
        <path d="M16 9.5 L22 7 L22 17 L16 14.5 Z" stroke="#00d4ff" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(0,212,255,0.06)" />
        <circle cx="9" cy="12" r="2.5" stroke="#00d4ff" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    name: 'Thermal Imaging',
    desc: 'Heat signature detection for identifying anomalies, safety hazards, and infrastructure stress points.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M7 15 C7 13 8.5 12 8.5 10.5 C8.5 9.2 7.5 8.5 7.5 8.5" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
        <path d="M12 15 C12 12.5 14 11 14 9 C14 7.5 12.5 7 12.5 7" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M17 15 C17 13.5 15.5 12.5 15.5 11 C15.5 9.5 17 8.5 17 8.5" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
]

const MS_USES = [
  'Agriculture & Crop Health', 'Environmental Monitoring', 'Forestry Assessment',
  'Mineral Exploration', 'GIS & Remote Sensing', 'Water Quality Management',
  'Urban Planning', 'Archaeological Surveys', 'Energy Infrastructure',
]

const BENEFITS = [
  { title: 'Maximize Resources',         desc: 'Get the most from every mission with precise data collection and optimized flight planning.' },
  { title: 'Efficient Cost Expenditure',  desc: 'Pay only for what you use. Eliminate capital costs of owning and maintaining a drone fleet.' },
  { title: 'Government Priority Access',  desc: 'DaaS clients receive priority access to Local and Federal Government procurement channels.' },
  { title: 'Direct Drone Manufacturer',   desc: 'Work directly with ZenaDrone Inc — no middlemen, faster support, and continuous platform updates.' },
  { title: 'Large Organization Support',  desc: 'Enterprise clients can coordinate multiple simultaneous drone missions across distributed sites.' },
  { title: 'Aviation Authority Compliant', desc: 'All operations are conducted in full compliance with aviation authorities and airspace regulations.' },
]

const INDUSTRIES = [
  {
    name: 'Agriculture',
    desc: 'Farm and crop monitoring using advanced drone functionalities. Supports fruit production, pestilence protection, and harvest maximization.',
    items: ['Crop health monitoring', 'Pest and disease detection', 'Irrigation management', 'Harvest yield analysis'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <path d="M14 24 L14 10" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 16 C10.5 12 7 12 7 8.5 C7 6 9.5 4.5 11.5 6 C11.5 3.5 12.5 2.5 14 2.5 C15.5 2.5 16.5 3.5 16.5 6 C18.5 4.5 21 6 21 8.5 C21 12 17.5 12 14 16Z" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.08)" />
        <ellipse cx="14" cy="25" rx="8" ry="2" stroke="#00d4ff" strokeWidth="1" fill="rgba(0,212,255,0.04)" />
      </svg>
    ),
  },
  {
    name: 'Powerline',
    desc: 'Efficient visual inspection of high-power grids, poles, and powerlines. Customizable attachments allow robotic arms for repair and maintenance.',
    items: ['High-voltage line inspection', 'Tower structural assessment', 'Fault detection and reporting', 'Robotic maintenance support'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <line x1="14" y1="2" x2="14" y2="26" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="6" y1="8" x2="22" y2="8" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="8" y1="14" x2="20" y2="14" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        <circle cx="6" cy="8" r="2" stroke="#00d4ff" strokeWidth="1.1" fill="rgba(0,212,255,0.1)" />
        <circle cx="22" cy="8" r="2" stroke="#00d4ff" strokeWidth="1.1" fill="rgba(0,212,255,0.1)" />
        <path d="M12 20 L14 17 L16 20 L15 20 L15 23 L13 23 L13 20 Z" stroke="#00d4ff" strokeWidth="1" fill="rgba(0,212,255,0.12)" />
      </svg>
    ),
  },
  {
    name: 'Security',
    desc: 'Surveillance outfitted for military, police, and national security. Intelligence gathering, terrain scanning, GPS tagging, and counterterrorism support.',
    items: ['Perimeter surveillance', 'Intelligence gathering', 'Thermal terrain scanning', 'Counterterrorism support'],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={26} height={26}>
        <path d="M14 2 L22 5.5 L22 12 C22 17 18.5 21.5 14 23 C9.5 21.5 6 17 6 12 L6 5.5 Z" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.06)" />
        <circle cx="14" cy="13" r="4" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.08)" />
        <circle cx="14" cy="13" r="1.5" fill="#00d4ff" />
        <line x1="14" y1="7" x2="14" y2="9" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="14" y1="17" x2="14" y2="19" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="8" y1="13" x2="10" y2="13" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="18" y1="13" x2="20" y2="13" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
]

const INTEGRATIONS = [
  {
    name: 'WorkAware',
    type: 'Occupational Safety Platform',
    desc: 'WorkAware automates business forms, secures teams, and assists with OSHA compliance. ZenaDrone integrates with its Geo Info Systems to tag company assets, vehicles, equipment, and personnel with precise geospatial coordinates.',
    features: ['GIS asset & personnel tagging', 'Remote worker tracking', 'OSHA compliance automation', 'Real-time safety alerts'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.05)" />
        <path d="M9 16 L13 20 L23 10" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Tillerstack + VR Glasses',
    type: 'Field Service Management',
    desc: 'Tillerstack offers efficient field dispatch and work order management. ZenaDrone works with Epazz VR Glasses so field technicians can process orders on-site using HD camera feeds overlaid with augmented reality.',
    features: ['Augmented reality field overlay', 'Work order management', 'On-site processing support', 'Complex facility repair guidance'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <rect x="4" y="11" width="24" height="12" rx="3" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.05)" />
        <circle cx="11" cy="17" r="3" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.08)" />
        <circle cx="21" cy="17" r="3" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.08)" />
        <line x1="14" y1="17" x2="18" y2="17" stroke="#00d4ff" strokeWidth="1.2" />
        <line x1="16" y1="7" x2="16" y2="11" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'PacePlus',
    type: 'Healthcare Management Software',
    desc: 'PacePlus delivers integrated electronic health records and practice management. ZenaDrone customizable robotic arm attachments enable doctors to perform basic tasks remotely, synchronized with PacePlus healthcare data.',
    features: ['Robotic arm attachment support', 'EHR & practice connectivity', 'Remote procedure assistance', 'Healthcare portal synchronization'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <path d="M16 4 L22 7 L22 14 C22 18.4 19.3 22.3 16 24 C12.7 22.3 10 18.4 10 14 L10 7 Z" stroke="#00d4ff" strokeWidth="1.4" fill="rgba(0,212,255,0.05)" />
        <line x1="16" y1="10" x2="16" y2="18" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="12" y1="14" x2="20" y2="14" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function DaaSSections() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = (trigger: string, start = 'top 72%') => ({
      scrollTrigger: { trigger, start, once: true },
    })

    gsap.fromTo('.daas-ov-item',      { x: -28, opacity: 0, filter: 'blur(6px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.1,  ease: 'power3.out', ...st('.daas-overview') })
    gsap.fromTo('.daas-sensor-card',  { y: 28, opacity: 0 },  { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out', ...st('.daas-scanning') })
    gsap.fromTo('.daas-sensor-icon',  { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.09, ease: 'back.out(1.8)', ...st('.daas-scanning') })
    gsap.fromTo('.daas-ms-item',      { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', ...st('.daas-multispectral') })
    gsap.fromTo('.daas-build-item',   { y: 18, opacity: 0 },  { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', ...st('.daas-building') })
    gsap.fromTo('.daas-ben-item',     { x: 22, opacity: 0 },  { x: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out', ...st('.daas-benefits') })
    gsap.fromTo('.daas-ben-check',    { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.08, ease: 'back.out(2)', ...st('.daas-benefits') })
    gsap.fromTo('.daas-ind-card',     { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out', ...st('.daas-industries') })
    gsap.fromTo('.daas-ind-icon',     { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(1.6)', ...st('.daas-industries') })
    gsap.fromTo('.daas-int-card',     { y: 28, opacity: 0 },  { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out', ...st('.daas-integrations') })
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>

      {/* ── 1. Overview ─────────────────────────────────────────────────────────── */}
      <section className="daas-overview py-24 bg-background">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>What is DaaS</span>
              </div>
              <h2 className="font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Drone Services on<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your Terms</span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-8"
                style={{ fontSize: '1rem', lineHeight: 1.78, maxWidth: 480 }}>
                ZenaDrone Field Scanning Services are available through a subscription model. Enjoy the freedom to leverage scanning services as frequently as required, and choose precisely the drone services tailored to your operational needs.
              </p>
              <div className="flex flex-col gap-3.5">
                {WHY_FEATURES.map((f, i) => (
                  <div key={i} className="daas-ov-item flex items-start gap-3.5" style={{ opacity: 0 }}>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5"
                      style={{ width: 28, height: 28, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '1rem' }}>{f.title}</p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.65 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription visual */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.12)' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.78rem', color: '#00d4ff' }}>Subscription Model</span>
              </div>
              <div className="flex flex-col gap-3">
                {['Field Scanning Service', 'Multispectral Imaging', 'Building Inspection', 'Security Surveillance', 'Agricultural Monitoring'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: i === 1 ? 'rgba(0,212,255,0.07)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 1 ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 1 ? '#00d4ff' : 'rgba(255,255,255,0.2)' }} />
                      <span className="font-sans" style={{ fontSize: '0.95rem', color: i === 1 ? '#fff' : 'rgba(255,255,255,0.55)' }}>{item}</span>
                    </div>
                    <div className="px-2 py-0.5 rounded" style={{ background: i === 1 ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 1 ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                      <span className="font-mono" style={{ fontSize: '0.55rem', color: i === 1 ? '#00d4ff' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{i === 1 ? 'ACTIVE' : 'AVAILABLE'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-text-muted" style={{ fontSize: '0.78rem', letterSpacing: '0.1em' }}>SERVICES ACTIVE</span>
                  <span className="font-display font-bold" style={{ fontSize: '1.1rem', color: '#00d4ff' }}>5 / 5</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg, #00d4ff, #0099cc)' }} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Field Scanning — Sensor Technology ───────────────────────────────── */}
      <section className="daas-scanning py-24" style={{ background: 'rgba(0,212,255,0.018)' }}>
        <Container>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>Field Scanning Service</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Advanced Sensor Technologies
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540, lineHeight: 1.75 }}>
              ZenaDrone field scanning harnesses LiDAR, GPS tracking, multispectral sensors, and HD cameras to meticulously collect data, tag key points, and create elevation-based topography — invaluable for military, police, and national security operations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SENSORS.map((s, i) => (
              <div key={i} className="daas-sensor-card flex flex-col gap-3 p-5 rounded-2xl" style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="daas-sensor-icon flex items-center justify-center rounded-xl" style={{ width: 46, height: 46, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.18)' }}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-sans font-semibold text-white mb-1" style={{ fontSize: '1rem' }}>{s.name}</p>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.62 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Multispectral Imaging ─────────────────────────────────────────────── */}
      <section className="daas-multispectral py-24 bg-background">
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>Multispectral Imaging</span>
              </div>
              <h2 className="font-display font-bold text-white mb-5"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Insights Beyond<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Human Perception</span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed mb-8"
                style={{ fontSize: '1rem', lineHeight: 1.78, maxWidth: 500 }}>
                ZenaDrone multispectral scanners capture data across various light wavelengths, providing a transformative edge to businesses. From optimizing crop health and detecting pests to tracking environmental changes and supporting GIS mapping, multispectral data empowers precise decision-making across every sector.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {MS_USES.map((u, i) => (
                  <div key={i} className="daas-ms-item flex items-center gap-2" style={{ opacity: 0 }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#00d4ff' }} />
                    <span className="font-sans text-text-muted" style={{ fontSize: '0.95rem' }}>{u}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.12)' }}>
              <p className="font-mono font-bold uppercase tracking-[0.16em] mb-4" style={{ fontSize: '0.78rem', color: '#00d4ff' }}>Wavelength Data Capture</p>
              {[
                { label: 'Blue Band',    range: '450–520 nm', pct: 55 },
                { label: 'Green Band',   range: '520–590 nm', pct: 70 },
                { label: 'Red Band',     range: '630–680 nm', pct: 85 },
                { label: 'Red Edge',     range: '690–730 nm', pct: 78 },
                { label: 'NIR Band',     range: '760–900 nm', pct: 92 },
              ].map((b, i) => (
                <div key={i} className="mb-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-white" style={{ fontSize: '0.9rem' }}>{b.label}</span>
                    <span className="font-mono text-text-muted" style={{ fontSize: '0.78rem' }}>{b.range}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${b.pct}%`, background: 'linear-gradient(90deg, #00d4ff, #0099cc)', opacity: 0.7 + i * 0.04 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Building Inspections ─────────────────────────────────────────────── */}
      <section className="daas-building py-24" style={{ background: 'rgba(0,212,255,0.018)' }}>
        <Container>
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>Building Inspections</span>
              </div>
              <h2 className="font-display font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Zero Workforce Risk,<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Immersive 3D Results</span>
              </h2>
              <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 560, lineHeight: 1.75 }}>
                ZenaDrone 1000 inspects buildings and towers by capturing data that translates into immersive 3D footage. This significantly mitigates workforce hazards during inspections of cellphone towers, power grids, and perilous terrains encountered in security intelligence operations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: '3D Footage Capture',     desc: 'High-fidelity 3D models of buildings, towers, and facades generated from drone imagery.' },
                { title: 'Cell Tower Inspection',  desc: 'Safe aerial inspection of cellular towers without the risk of sending workers to height.' },
                { title: 'Power Grid Safety',      desc: 'Visual and thermal assessment of power infrastructure without proximity hazards.' },
                { title: 'Perilous Terrain Survey',desc: 'Map and inspect difficult terrain where human access poses significant safety risk.' },
                { title: 'Security Intelligence',  desc: 'Covert aerial reconnaissance for surveillance, perimeter checks, and threat assessment.' },
                { title: 'Incident Documentation', desc: 'Precise aerial records for post-incident analysis, insurance, and legal evidence.' },
              ].map((item, i) => (
                <div key={i} className="daas-build-item p-5 rounded-xl" style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                    <p className="font-sans font-semibold text-white" style={{ fontSize: '1rem' }}>{item.title}</p>
                  </div>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.92rem', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. Benefits ──────────────────────────────────────────────────────────── */}
      <section className="daas-benefits py-24 bg-background">
        <Container>
          <div>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>Benefits</span>
              </div>
              <h2 className="font-display font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Why Choose ZenaDrone DaaS
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => (
                <div key={i} className="daas-ben-item flex items-start gap-4 p-5 rounded-2xl" style={{ opacity: 0, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <div className="daas-ben-check flex-shrink-0 flex items-center justify-center rounded-xl" style={{ width: 42, height: 42, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                      <path d="M3 8 L6.5 11.5 L13 5" stroke="#00d4ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white mb-1" style={{ fontSize: '1rem' }}>{b.title}</p>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.92rem', lineHeight: 1.65 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Key Industries ────────────────────────────────────────────────────── */}
      <section className="daas-industries py-24" style={{ background: 'rgba(0,212,255,0.018)' }}>
        <Container>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>Key Industries</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              DaaS Across Critical Sectors
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="daas-ind-card rounded-2xl overflow-hidden" style={{ opacity: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.12)' }}>
                <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
                  <div className="daas-ind-icon flex items-center justify-center rounded-2xl mb-4" style={{ width: 52, height: 52, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    {ind.icon}
                  </div>
                  <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.15rem', letterSpacing: '-0.02em' }}>{ind.name}</h3>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.68 }}>{ind.desc}</p>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  {ind.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#00d4ff', opacity: 0.7 }} />
                      <span className="font-sans text-text-muted" style={{ fontSize: '0.92rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. SaaS Integrations ─────────────────────────────────────────────────── */}
      <section className="daas-integrations py-24 bg-background">
        <Container>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.82rem', color: '#00d4ff' }}>SaaS Integrations</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Drone Integration with<br />
              <span style={{ background: 'linear-gradient(135deg, #00d4ff 20%, rgba(0,212,255,0.7) 85%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enterprise Software</span>
            </h2>
            <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 540, lineHeight: 1.75 }}>
              ZenaDrone connects seamlessly with leading enterprise software platforms, extending the power of drone data into the tools your teams already use.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {INTEGRATIONS.map((int, i) => (
              <div key={i} className="daas-int-card rounded-2xl p-6" style={{ opacity: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.12)' }}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ width: 52, height: 52, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    {int.icon}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-white" style={{ fontSize: '0.95rem' }}>{int.name}</p>
                    <p className="font-mono text-text-muted mt-0.5" style={{ fontSize: '0.78rem', letterSpacing: '0.1em', color: '#00d4ff', opacity: 0.7 }}>{int.type}</p>
                  </div>
                </div>
                <p className="font-sans text-text-muted mb-5" style={{ fontSize: '0.95rem', lineHeight: 1.72 }}>{int.desc}</p>
                <div className="flex flex-col gap-2 pt-4" style={{ borderTop: '1px solid rgba(0,212,255,0.08)' }}>
                  {int.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <svg viewBox="0 0 12 12" fill="none" width={10} height={10} className="flex-shrink-0">
                        <path d="M2 6 L5 9 L10 3" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-sans text-text-muted" style={{ fontSize: '0.92rem' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  )
}
