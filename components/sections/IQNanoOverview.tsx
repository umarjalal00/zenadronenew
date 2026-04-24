'use client'

import { useRef }            from 'react'
import Image                 from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container }         from '@/components/ui/Container'
import { SectionWrapper }    from '@/components/ui/SectionWrapper'
import { FadeIn }            from '@/components/animations/FadeIn'

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

// ─── Tech pillar card ─────────────────────────────────────────────────────────
function TechPillar({
  tag, tagColor, title, body, bulletColor, bullets,
}: {
  tag: string; tagColor: string; title: string; body: string;
  bulletColor: string; bullets: string[];
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-6 rounded-2xl group"
      style={{ background: `${tagColor}07`, border: `1px solid ${tagColor}1a` }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(to right, transparent, ${tagColor}50, transparent)`,
      }} />

      {/* Icon */}
      <div className="flex items-center justify-center w-11 h-11 rounded-xl mb-4" style={{
        background: `${tagColor}12`, border: `1px solid ${tagColor}28`,
      }}>
        {tag === 'Camera Technology' ? (
          <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
            <rect x={3} y={10} width={22} height={16} rx={2.5} stroke={tagColor} strokeWidth={1.4} fill={`${tagColor}08`} />
            <path d="M25 15 L33 11 L33 25 L25 21 Z" stroke={tagColor} strokeWidth={1.2} strokeLinejoin="round" />
            <circle cx={14} cy={18} r={4} stroke={tagColor} strokeWidth={1.3} />
            <circle cx={14} cy={18} r={1.6} fill={tagColor} opacity={0.9} />
            <rect x={6} y={7} width={6} height={3} rx={1} stroke={tagColor} strokeWidth={1} opacity={0.5} />
          </svg>
        ) : (
          <svg viewBox="0 0 36 36" fill="none" width={28} height={28}>
            <rect x={5} y={5} width={26} height={26} rx={2.5} stroke={tagColor} strokeWidth={1.4} fill={`${tagColor}08`} />
            <path d="M5 14 L31 14" stroke={tagColor} strokeWidth={0.8} opacity={0.3} />
            <path d="M14 5 L14 31" stroke={tagColor} strokeWidth={0.8} opacity={0.3} />
            <circle cx={18} cy={18} r={5} stroke={tagColor} strokeWidth={1.3} />
            <circle cx={18} cy={18} r={2} fill={tagColor} opacity={0.85} />
            <line x1={14} y1={8} x2={14} y2={11} stroke={tagColor} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
            <line x1={22} y1={8} x2={22} y2={11} stroke={tagColor} strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
          </svg>
        )}
      </div>

      {/* Tag */}
      <p className="font-mono font-bold uppercase tracking-[0.2em] mb-2" style={{ fontSize: '0.8125rem', color: tagColor }}>{tag}</p>

      {/* Title */}
      <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        {title}
      </h3>

      {/* Body */}
      <p className="font-sans text-text-muted leading-relaxed mb-4" style={{ fontSize: '0.86rem' }}>
        {body}
      </p>

      {/* Bullets */}
      <div className="flex flex-col gap-1.5">
        {bullets.map(b => (
          <div key={b} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: bulletColor, opacity: 0.8 }} />
            <span className="font-mono text-text-muted" style={{ fontSize: '1.125rem' }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Bottom line hover */}
      <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{
        background: `linear-gradient(to right, transparent, ${tagColor}55, transparent)`,
      }} />
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IQNanoOverview() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <SectionWrapper id="iq-nano-overview" className="bg-background">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(52,211,153,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#34d399' }}>
            IQ Nano — Overview
          </p>
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Revolutionizing<br />
            <span style={{ background: 'linear-gradient(135deg, #34d399, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Indoor Operations
            </span>
          </h2>
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #34d399, transparent)' }} />
        </FadeIn>

        {/* Two-column: text + image */}
        <div ref={ref} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 mb-20 items-center">
          <div className="space-y-5">
            <Para text="The IQ Nano is an advanced piece of UAV technology specially designed to handle the complexities of scanning for indoor environments in warehouses, distribution centers, or plants, and functions such as inventory and asset tracking, maintenance and compliance applications, and security scanning." />
            <Para delay={0.12} text="One of its essential functions is to streamline inventory management through advanced scanning capabilities, allowing seamless scanning of QR codes and barcodes on pallets and boxes. This state-of-the-art quadcopter can revolutionize how we handle inventory management by offering unmatched efficiency and accuracy and APIs to inventory management software packages." />
          </div>

          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.88, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4/3', background: 'var(--surface-card-el)', border: '1px solid rgba(52,211,153,0.15)' }}
          >
            <Image
              src="/images/IQ-nano-logo.png"
              alt="ZenaDrone IQ Nano indoor drone"
              fill className="object-cover"
              style={{ opacity: 0.85 }}
            />
            {/* Overlay tint */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(52,211,153,0.12) 0%, transparent 55%)',
            }} />
            {/* Brackets */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
              {[
                { x1: 3, y1: 3, x2: 12, y2: 3 }, { x1: 3, y1: 3, x2: 3, y2: 13 },
                { x1: 97, y1: 3, x2: 88, y2: 3 }, { x1: 97, y1: 3, x2: 97, y2: 13 },
                { x1: 3, y1: 97, x2: 12, y2: 97 }, { x1: 3, y1: 97, x2: 3, y2: 87 },
                { x1: 97, y1: 97, x2: 88, y2: 97 }, { x1: 97, y1: 97, x2: 97, y2: 87 },
              ].map((l, i) => (
                <line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
                  stroke="#34d399" strokeWidth="0.9" opacity="0.55" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {/* Scan overlay animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
              <div className="iqn-ov-scan absolute left-0 right-0 h-[1.5px]" style={{
                background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.7) 30%, rgba(52,211,153,1) 50%, rgba(52,211,153,0.7) 70%, transparent)',
                boxShadow: '0 0 10px rgba(52,211,153,0.5)',
              }} />
            </div>
            {/* Label */}
            <div className="absolute bottom-3 left-3 z-20 px-3 py-2 rounded-xl" style={{
              background: 'rgba(7,7,15,0.78)', border: '1px solid rgba(52,211,153,0.22)',
              backdropFilter: 'blur(12px)',
            }}>
              <p className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem', color: '#34d399' }}>ZenaDrone IQ Nano</p>
              <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>GPS-Free · Indoor · 20 min</p>
            </div>
          </motion.div>
        </div>

        {/* Technical Features */}
        <FadeIn className="text-center mb-12">
          <p className="font-mono font-bold uppercase tracking-[0.25em] mb-2" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Technical Features</p>
          <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Purpose-Built Technology
          </h3>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          <TechPillar
            tag="Camera Technology"
            tagColor="#00d4ff"
            title="High-Resolution Indoor Scanning"
            body="Our indoor drone is equipped with a high-resolution camera that is adept at scanning QR and Barcodes on pallets, boxes, and items. This feature is pivotal in streamlining inventory management, reducing errors, and enhancing operational efficiency."
            bulletColor="#00d4ff"
            bullets={['QR Code Scanning', 'Barcode Recognition', 'Pallet & Box Tracking', 'Error Reduction']}
          />
          <TechPillar
            tag="Indoor Operation & Way Finding"
            tagColor="#a78bfa"
            title="GPS-Free Navigation Technology"
            body="Specifically designed for indoor environments, the drone's reliance on cutting-edge technology eliminates the need for GPS, making it ideal for warehouses, distribution centers, and enclosed environments."
            bulletColor="#a78bfa"
            bullets={['No GPS Required', 'Warehouse Optimized', 'Enclosed Spaces', 'Autonomous Pathfinding']}
          />
        </div>

        {/* CTAs */}
        <FadeIn className="flex justify-center gap-4 mt-12">
          <a href="#iq-nano-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #34d399, #059669)', color: '#07070f', fontSize: '0.88rem', boxShadow: '0 0 20px rgba(52,211,153,0.3)' }}>
            Contact Us
          </a>
          <a href="#iq-nano-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/[0.05]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem' }}>
            Book A Service
          </a>
        </FadeIn>
      </Container>

      <style>{`
        .iqn-ov-scan { animation: iqnOvScan 3.2s linear infinite; }
        @keyframes iqnOvScan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </SectionWrapper>
  )
}
