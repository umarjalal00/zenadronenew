'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

// ─── Data outputs ─────────────────────────────────────────────────────────────
const DATA_OUTPUTS = [
  { label: 'Orthomosaic Maps',          desc: 'Geo-tagged, high-accuracy aerial imagery stitched into seamless maps',    color: '#fbbf24' },
  { label: 'Cadastral / Boundary Maps', desc: 'Precise legal boundary delineation and property mapping',                 color: '#00d4ff' },
  { label: 'Digital Elevation Models',  desc: 'DEMs, DTMs, and DSMs for comprehensive terrain analysis',                 color: '#a78bfa' },
  { label: 'HD Video & Photography',    desc: 'High-resolution 4K imagery and video for detailed site documentation',    color: '#34d399' },
  { label: 'Textured 3D Mesh Models',   desc: 'Photo-realistic 3D reconstructions of terrain and structures',            color: '#f472b6' },
]

// ─── Animated paragraph ───────────────────────────────────────────────────────
function Para({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref    = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <motion.p ref={ref}
      className="font-sans text-text-muted leading-relaxed"
      style={{ fontSize: '1.125rem' }}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {text}
    </motion.p>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQQuadOverview() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <SectionWrapper id="iq-quad-overview" className="bg-background">
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(251,191,36,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>
            Overview
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Flexibility + Accuracy<br />
            <span style={{ background: 'linear-gradient(135deg, #fbbf24, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              = Insight
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }} />
        </FadeIn>

        {/* Two column: text + image */}
        <div ref={ref} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 mb-20 items-center">
          <div className="space-y-5">
            <Para text="Designed for land surveying, the IQ Quad Drone supports 4K cameras, LiDAR, and multispectral and thermal sensors. It delivers clear, detailed aerial data in complex environments." />
            <Para delay={0.12} text="The platform includes smart safety features like obstacle detection, terrain-following, and 360° awareness cameras to support confident operation. The IQ Quad delivers reliable, survey-grade results with efficient performance." />
            <Para delay={0.22} text="With a 2–3 kg payload capacity and 45-minute flight time covering a 5 km operational range, the IQ Quad is purpose-built for professionals who demand accuracy, range, and data security in every mission." />
          </div>

          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.88, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3', background: 'var(--surface-card-el)', border: '1px solid rgba(251,191,36,0.15)' }}
          >
            <Image
              src="/images/IQ-Quad.png"
              alt="ZenaDrone IQ Quad survey drone"
              fill className="object-cover"
              style={{ opacity: 0.88 }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.14) 0%, transparent 55%)',
            }} />
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
              {[
                { x1: 3, y1: 3, x2: 12, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 13 },
                { x1: 97, y1: 3, x2: 88, y2: 3 }, { x1: 97, y1: 3, x2: 97, y2: 13 },
                { x1: 3, y1: 97, x2: 12, y2: 97 }, { x1: 3, y1: 97, x2: 3, y2: 87 },
                { x1: 97, y1: 97, x2: 88, y2: 97 }, { x1: 97, y1: 97, x2: 97, y2: 87 },
              ].map((l, i) => (
                <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
                  stroke="#fbbf24" strokeWidth="0.9" opacity="0.55" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {/* Scan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
              <div className="iqq-ov-scan absolute left-0 right-0 h-[1.5px]" style={{
                background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.7) 30%, rgba(251,191,36,1) 50%, rgba(251,191,36,0.7) 70%, transparent)',
                boxShadow: '0 0 10px rgba(251,191,36,0.5)',
              }} />
            </div>
            {/* Label */}
            <div className="absolute bottom-3 left-3 z-20 px-3 py-2 rounded-xl" style={{
              background: 'rgba(7,7,15,0.78)', border: '1px solid rgba(251,191,36,0.22)',
              backdropFilter: 'blur(12px)',
            }}>
              <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: '#fbbf24' }}>ZenaDrone IQ Quad</p>
              <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>VTOL · 45 min · 5 km · 3 kg</p>
            </div>
          </motion.div>
        </div>

        {/* Data outputs */}
        <FadeIn className="text-center mb-10">
          <p className="font-mono font-bold uppercase tracking-[0.25em] mb-2" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>A Wealth of Data</p>
          <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Precision Data for Every Output
          </h3>
        </FadeIn>

        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {DATA_OUTPUTS.map((d, i) => (
            <FadeIn key={d.label} delay={i * 0.07}>
              <div className="group relative p-5 rounded-2xl h-full cursor-default transition-all duration-300 hover:scale-[1.02]"
                style={{ background: `${d.color}07`, border: `1px solid ${d.color}1a` }}>
                <div className="absolute top-0 inset-x-0 h-px" style={{
                  background: `linear-gradient(to right, transparent, ${d.color}50, transparent)`,
                }} />
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{
                  background: `${d.color}12`, border: `1px solid ${d.color}25`,
                }}>
                  <div className="w-3 h-3 rounded-sm" style={{ background: d.color, opacity: 0.8 }} />
                </div>
                <p className="font-sans font-semibold text-white/85 group-hover:text-white mb-2 transition-colors" style={{ fontSize: '0.8rem', lineHeight: 1.3 }}>
                  {d.label}
                </p>
                <p className="font-sans text-text-muted" style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
                  {d.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTAs */}
        <FadeIn className="flex justify-center gap-4">
          <a href="#iq-quad-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#07070f', fontSize: '0.88rem', boxShadow: '0 0 20px rgba(251,191,36,0.3)' }}>
            Contact Us
          </a>
          <a href="#iq-quad-video" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem' }}>
            Watch Demo
          </a>
        </FadeIn>
      </Container>

      <style>{`
        .iqq-ov-scan { animation: iqqOvScan 3.2s linear infinite; }
        @keyframes iqqOvScan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </SectionWrapper>
  )
}
