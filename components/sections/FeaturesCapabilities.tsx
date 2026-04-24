'use client'

import { useRef }            from 'react'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

const CAPABILITIES = [
  {
    id: 'stabilized-camera',
    color: '#00d4ff',
    tag: 'Camera System',
    title: 'Stabilized Camera\nImaging',
    body: 'Reduce the blurriness and pixelation of your captured videos and photos with the ZenaDrone 1000\'s stabilized camera imaging feature. Advanced gimbal stabilization ensures crisp imagery even in turbulent conditions.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <rect x={6} y={10} width={22} height={18} rx={2.5} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <circle cx={16} cy={19} r={5.5} stroke={c} strokeWidth={1.1} fill={`${c}0a`}/>
        <circle cx={16} cy={19} r={2.5} fill={c} opacity={0.85}/>
        <rect x={28} y={15} width={6} height={8} rx={1} stroke={c} strokeWidth={1} fill={`${c}0a`}/>
        <line x1={12} y1={8} x2={12} y2={10} stroke={c} strokeWidth={1.2} strokeLinecap="round"/>
        <line x1={16} y1={8} x2={16} y2={10} stroke={c} strokeWidth={1.2} strokeLinecap="round"/>
        <line x1={20} y1={8} x2={20} y2={10} stroke={c} strokeWidth={1.2} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'multispectral',
    color: '#a78bfa',
    tag: 'Sensor Array',
    title: 'Intelligent\nMultispectral Sensors',
    body: 'ZenaDrone 1000 is integrated with machine learning and contains multispectral sensors that detect temperature, lighting, and depth for accurate field data. Enables vegetation health analysis, thermal anomaly detection, and 3D terrain mapping.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        {[4, 8, 12, 16, 20].map((w, i) => (
          <rect key={i} x={5} y={6 + i * 6} width={w} height={4} rx={1}
            fill={c} opacity={0.3 + i * 0.12}/>
        ))}
        <circle cx={28} cy={20} r={10} stroke={c} strokeWidth={1.2} fill={`${c}08`}/>
        <path d="M24 20 Q26 16 28 20 Q30 24 32 20" stroke={c} strokeWidth={1} strokeLinecap="round" fill="none"/>
        <circle cx={28} cy={20} r={2.5} fill={c} opacity={0.85}/>
        <text x={28} y={36} textAnchor="middle" fill={c} fontSize="5.5" fontFamily="monospace" opacity={0.6}>λ</text>
      </svg>
    ),
  },
  {
    id: 'autonomous-surveillance',
    color: '#34d399',
    tag: 'Patrol Mode',
    title: 'Autonomous Aerial\nSurveillance',
    body: 'ZenaDrone 1000 can automatically take off, hover, and patrol even in bad weather conditions, giving the pilot controller a better view and understanding of any land and situation without manual intervention.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <circle cx={20} cy={18} r={11} stroke={c} strokeWidth={1.3} fill={`${c}07`}/>
        <path d="M16 18 Q18 14 20 18 Q22 22 24 18" stroke={c} strokeWidth={1.1} strokeLinecap="round" fill="none"/>
        <circle cx={20} cy={18} r={3} stroke={c} strokeWidth={1.1}/>
        <circle cx={20} cy={18} r={1.2} fill={c} opacity={0.9}/>
        <path d="M8 32 Q12 28 16 30 Q20 32 24 28 Q28 24 32 26" stroke={c} strokeWidth={1.1} strokeLinecap="round" fill="none" opacity={0.5}/>
        <path d="M8 36 Q14 32 20 34 Q26 36 32 32 L32 40 L8 40 Z" fill={`${c}12`} stroke={c} strokeWidth={0.7} opacity={0.4}/>
      </svg>
    ),
  },
  {
    id: 'ai-industrial',
    color: '#fbbf24',
    tag: 'AI Engine',
    title: 'Multi-Industrial\nArtificial Intelligence',
    body: 'ZenaDrone 1000 scans the area daily and uses multispectral sensors to capture images, videos, and relevant details on actual land and its topographic appearances. AI processes this data for actionable intelligence.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <circle cx={20} cy={20} r={8} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <circle cx={20} cy={20} r={3} fill={c} opacity={0.9}/>
        {[
          [20,8],[28.5,14],[28.5,26],[20,32],[11.5,26],[11.5,14]
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={20} y1={20} x2={x} y2={y} stroke={c} strokeWidth={0.7} opacity={0.3}/>
            <circle cx={x} cy={y} r={2.8} stroke={c} strokeWidth={1} fill={`${c}0a`}/>
          </g>
        ))}
        <text x={20} y={23} textAnchor="middle" fill={c} fontSize="5.5" fontFamily="monospace" fontWeight="bold" opacity={0.7}>AI</text>
      </svg>
    ),
  },
  {
    id: '4k-video',
    color: '#f97316',
    tag: '4K Camera',
    title: 'Smart Drone with\n4K Videos',
    body: 'ZenaDrone 1000 produces high definition, vivid and crisp 4K videos and images. It has a wide-angle camera that can capture a comprehensive range of sights for detailed inspection and media production.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <rect x={4} y={10} width={22} height={16} rx={2} stroke={c} strokeWidth={1.3} fill={`${c}08`}/>
        <path d="M26 15 L36 11 L36 25 L26 21 Z" stroke={c} strokeWidth={1.2} strokeLinejoin="round" fill={`${c}0a`}/>
        <text x={14} y={22} textAnchor="middle" fill={c} fontSize="8" fontFamily="monospace" fontWeight="bold" opacity={0.85}>4K</text>
        <line x1={4} y1={30} x2={26} y2={30} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4}/>
        <line x1={13} y1={26} x2={13} y2={30} stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.4}/>
      </svg>
    ),
  },
  {
    id: 'extended-flight',
    color: '#0ea5e9',
    tag: 'Endurance',
    title: 'Extended\nFlight Time',
    body: 'ZenaDrone 1000 has a built-in, fast-charging, and long-lasting Lithium Polymer battery for extended and uninterrupted flight time. High capacity cells combined with efficient motor design maximize time on mission.',
    icon: (c: string) => (
      <svg viewBox="0 0 40 40" fill="none" width={32} height={32}>
        <path d="M20 6 L20 34" stroke={c} strokeWidth={1} opacity={0.25} strokeLinecap="round"/>
        <circle cx={20} cy={20} r={12} stroke={c} strokeWidth={1.3} fill={`${c}07`}/>
        <path d="M20 10 L20 20 L27 20" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={20} cy={20} r={2} fill={c} opacity={0.9}/>
        <text x={20} y={36} textAnchor="middle" fill={c} fontSize="5.5" fontFamily="monospace" opacity={0.55}>LiPo</text>
      </svg>
    ),
  },
]

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface-card-el)', border: `1px solid ${cap.color}14` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cap.color}30` }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cap.color}14` }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{
        background: `radial-gradient(ellipse at top right, ${cap.color}0c 0%, transparent 70%)`,
      }}/>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: `${cap.color}0e`, border: `1px solid ${cap.color}1e`,
        }}>
          {cap.icon(cap.color)}
        </div>
        <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.8125rem', color: cap.color }}>{cap.tag}</span>
      </div>

      <div>
        <h3 className="font-display font-bold text-white mb-2" style={{
          fontSize: '1.05rem', letterSpacing: '-0.02em', lineHeight: 1.2, whiteSpace: 'pre-line',
        }}>
          {cap.title}
        </h3>
        <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.83rem' }}>
          {cap.body}
        </p>
      </div>

      <div className="absolute bottom-0 left-5 right-5 h-px" style={{
        background: `linear-gradient(to right, transparent, ${cap.color}28, transparent)`,
      }}/>
    </motion.div>
  )
}

export function FeaturesCapabilities() {
  return (
    <SectionWrapper id="features-capabilities" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.12) 30%, rgba(0,212,255,0.12) 70%, transparent)',
      }}/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}/>

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
            Multi-Functional
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            letterSpacing: '-0.025em', lineHeight: 1.08,
          }}>
            Intelligent Drone for<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Industry Optimization
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 520, lineHeight: 1.7 }}>
            Six core capabilities that enable the ZenaDrone 1000 to deliver consistent, high-quality data across every deployment scenario.
          </p>
          <div className="w-16 h-px mx-auto mt-5" style={{ background: 'linear-gradient(to right, transparent, #00d4ff, transparent)' }}/>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => <CapabilityCard key={cap.id} cap={cap} index={i}/>)}
        </div>

        {/* ZenaDrone 1000 overview block */}
        <FadeIn delay={0.15} className="mt-16">
          <div className="relative grid lg:grid-cols-5 gap-8 p-8 md:p-10 rounded-3xl overflow-hidden" style={{
            background: 'var(--surface-card-el)', border: '1px solid rgba(0,212,255,0.14)',
            boxShadow: '0 0 60px rgba(0,212,255,0.04)',
          }}>
            <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.06) 0%, transparent 70%)',
            }}/>

            <div className="lg:col-span-3">
              <p className="font-mono font-bold uppercase tracking-[0.24em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>ZenaDrone 1000</p>
              <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 2.9vw, 2.3rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                An Ingenious Drone for<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Self-Sufficient Operations
                </span>
              </h3>
              <p className="font-sans text-text-muted leading-relaxed mb-5" style={{ fontSize: '1.125rem' }}>
                ZenaDrone aims to provide efficiency, convenience, and speed in aerial surveillance, inspection, data collection, monitoring, repair, and maintenance. Its multispectral sensors support personnel safety, consistent service delivery, and accurate information.
              </p>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
                The ZenaDrone 1000 is beneficial for influential sectors like military operations, counterterrorism missions, security, sustainable farming, livestock management, real estate, film and media, search and rescue, renewable energy, environmental conservation, and power line services.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-3 justify-center">
              {[
                { label: 'Aerial Surveillance',    color: '#00d4ff' },
                { label: 'Data Collection',        color: '#fbbf24' },
                { label: 'Precision Inspection',   color: '#34d399' },
                { label: 'Autonomous Monitoring',  color: '#a78bfa' },
                { label: 'AI-Powered Analysis',    color: '#f97316' },
                { label: 'Multispectral Imaging',  color: '#00d4ff' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl" style={{
                  background: `${item.color}07`, border: `1px solid ${item.color}14`,
                }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}/>
                  <span className="font-mono text-white" style={{ fontSize: '0.8125rem' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  )
}
