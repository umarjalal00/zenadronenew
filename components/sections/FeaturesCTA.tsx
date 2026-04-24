'use client'

import { useRef, useState } from 'react'
import { motion }           from 'framer-motion'
import { Container }        from '@/components/ui/Container'
import { FadeIn }           from '@/components/animations/FadeIn'
import { useGSAP }          from '@/hooks/useGSAP'
import { gsap }             from '@/lib/gsap'

const ORBS = [
  { x: 14, y: 42, w: 560, h: 560, color: '#00d4ff', op: 0.06,  d: 11 },
  { x: 80, y: 60, w: 420, h: 420, color: '#fbbf24', op: 0.038, d: 14 },
  { x: 50, y: 7,  w: 280, h: 280, color: '#34d399', op: 0.025, d: 8  },
]

// ─── Animated drone silhouette ────────────────────────────────────────────────
function DemoVisual() {
  const CX = 200, CY = 160, ARM = 58

  const rotors = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180
    return {
      x: CX + ARM * Math.cos(angle),
      y: CY + ARM * Math.sin(angle),
      ccw: i % 2 === 1,
    }
  })

  return (
    <svg viewBox="0 0 400 320" fill="none" className="w-full" style={{ maxHeight: 280 }}>
      <defs>
        <radialGradient id="demoAtmos" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="demoDroneGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="400" height="320" fill="rgba(7,7,15,0.4)" rx="16"/>
      <ellipse cx={CX} cy={CY} rx={190} ry={170} fill="url(#demoAtmos)"/>

      {/* Rings */}
      {[55, 100, 148].map((r, i) => (
        <circle key={i} cx={CX} cy={CY} r={r}
          stroke="#00d4ff" strokeWidth={0.5} fill="none" opacity={0.1 + (2-i) * 0.04}/>
      ))}

      {/* Rotating outer ring */}
      <circle cx={CX} cy={CY} r={145}
        stroke="#00d4ff" strokeWidth={0.6} strokeDasharray="6 10" fill="none" opacity={0.15}
        style={{ transformOrigin: `${CX}px ${CY}px`, animation: 'demoCTARing 18s linear infinite' }}/>

      {/* Arms */}
      {rotors.map((r, i) => (
        <line key={i} x1={CX} y1={CY} x2={r.x} y2={r.y}
          stroke="#00d4ff" strokeWidth={1.3} opacity={0.45} strokeLinecap="round"/>
      ))}

      {/* Motor mounts */}
      {rotors.map((r, i) => (
        <circle key={i} cx={r.x} cy={r.y} r={9}
          stroke="#00d4ff" strokeWidth={0.9} fill="rgba(0,212,255,0.07)" opacity={0.7}/>
      ))}

      {/* Rotors */}
      {rotors.map((r, i) => (
        <g key={i} style={{
          transformOrigin: `${r.x}px ${r.y}px`,
          animation: `${r.ccw ? 'demoCCW' : 'demoCW'} ${i % 2 === 0 ? '0.2' : '0.16'}s linear infinite`,
          animationDelay: `${-(i * 0.03)}s`,
        }}>
          <line x1={r.x - 14} y1={r.y} x2={r.x + 14} y2={r.y}
            stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" opacity={0.75}/>
          <line x1={r.x} y1={r.y - 14} x2={r.x} y2={r.y + 14}
            stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" opacity={0.75}/>
        </g>
      ))}

      {/* Body hex */}
      <polygon
        points={`${CX},${CY-22} ${CX+19},${CY-11} ${CX+19},${CY+11} ${CX},${CY+22} ${CX-19},${CY+11} ${CX-19},${CY-11}`}
        fill="rgba(0,212,255,0.08)" stroke="#00d4ff" strokeWidth={1.2} opacity={0.85}/>

      {/* Center glow + camera */}
      <circle cx={CX} cy={CY} r={24} fill="url(#demoDroneGlow)"
        style={{ animation: 'demoCenterGlow 2.5s ease-in-out infinite' }}/>

      {/* Pulse rings */}
      {[0, 1].map(i => (
        <circle key={i} cx={CX} cy={CY} r={18}
          stroke="#00d4ff" strokeWidth={0.8} fill="none"
          style={{ animation: 'demoExpand 3.5s ease-out infinite', animationDelay: `${i * 1.75}s`, transformOrigin: `${CX}px ${CY}px` }}/>
      ))}

      <circle cx={CX} cy={CY} r={7} stroke="#00d4ff" strokeWidth={1.1} fill="rgba(0,212,255,0.1)"/>
      <circle cx={CX} cy={CY} r={3} fill="#00d4ff" opacity={0.95}/>

      {/* Status readouts */}
      <rect x={10} y={10} width={140} height={36} rx={3} fill="rgba(7,7,15,0.82)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.5}/>
      <circle cx={18} cy={18} r={2} fill="#00d4ff"
        style={{ animation: 'demoBlink 1.5s ease-in-out infinite' }}/>
      <text x={26} y={21} fill="#00d4ff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">ZENADRONE 1000</text>
      <text x={14} y={33} fill="#00d4ff" fontSize="5.5" fontFamily="monospace" opacity={0.6}>AI ACTIVE | GPS LOCKED</text>
      <text x={14} y={40} fill="#fbbf24" fontSize="5" fontFamily="monospace" opacity={0.5}>DEMO MODE READY</text>

      <rect x={250} y={10} width={140} height={22} rx={3} fill="rgba(7,7,15,0.82)" stroke="rgba(251,191,36,0.2)" strokeWidth={0.5}/>
      <text x={258} y={24} fill="#fbbf24" fontSize="5.5" fontFamily="monospace" opacity={0.7}>FLIGHT TIME: 45 MIN</text>

      {/* Terrain line */}
      <path d="M0,270 Q50,255 100,265 Q150,275 200,260 Q250,245 300,262 Q350,278 400,265 L400,320 L0,320 Z"
        fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.1)" strokeWidth={0.8}/>

      {/* Shadow under drone */}
      <ellipse cx={CX} cy={262} rx={40} ry={5} fill="rgba(0,212,255,0.08)"
        style={{ animation: 'demoShadow 3.5s ease-in-out infinite' }}/>

      <style>{`
        @keyframes demoCW        { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes demoCCW       { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes demoCTARing   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes demoCenterGlow{ 0%,100%{opacity:0.9} 50%{opacity:0.3} }
        @keyframes demoExpand    { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(6);opacity:0} }
        @keyframes demoBlink     { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes demoShadow    { 0%,100%{transform:scaleX(1);opacity:0.08} 50%{transform:scaleX(0.7);opacity:0.04} }
      `}</style>
    </svg>
  )
}

function Field({ label, name, type, placeholder, value, onChange, required }: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono font-bold text-text-muted uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>{label}</label>
      <input
        type={type} name={name} placeholder={placeholder} value={value}
        onChange={onChange} required={required}
        className="px-4 py-3 rounded-xl font-sans text-white placeholder-text-subtle transition-all duration-200 outline-none"
        style={{ background: 'var(--surface-input)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.88rem' }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)' }}
        onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono font-bold text-text-muted uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>{label}</label>
      <select
        name={name} value={value} onChange={onChange}
        className="px-4 py-3 rounded-xl font-sans text-white transition-all duration-200 outline-none appearance-none"
        style={{ background: 'var(--surface-input)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.88rem' }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)' }}
        onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        {options.map(o => <option key={o} value={o} style={{ background: '#0d0d1a' }}>{o}</option>)}
      </select>
    </div>
  )
}

function TextareaField({ label, name, placeholder, value, onChange }: {
  label: string; name: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono font-bold text-text-muted uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>{label}</label>
      <textarea
        name={name} placeholder={placeholder} value={value}
        onChange={onChange} rows={4}
        className="px-4 py-3 rounded-xl font-sans text-white placeholder-text-subtle transition-all duration-200 outline-none resize-none"
        style={{ background: 'var(--surface-input)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.88rem' }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.06)' }}
        onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export function FeaturesCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    industry: 'Agriculture & Farming',
    message: '',
  })

  useGSAP(() => {
    gsap.fromTo('.featcta-beam',
      { x: '-100%' },
      { x: '200%', duration: 4, ease: 'none', repeat: -1, delay: 1 }
    )
  }, { scope: sectionRef })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return (
    <section ref={sectionRef} id="features-cta" className="relative w-full py-24 md:py-36 overflow-hidden bg-background">
      {ORBS.map((o, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${o.x}%`, top: `${o.y}%`, width: o.w, height: o.h,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse at center, ${o.color} 0%, transparent 70%)`,
          opacity: o.op, filter: 'blur(60px)',
          animation: `featCtaOrbF ${o.d}s ease-in-out infinite`,
          animationDelay: `${i * 3}s`,
        }}/>
      ))}

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }}/>

      <div className="absolute inset-y-0 w-px pointer-events-none featcta-beam" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.5) 40%, rgba(0,212,255,0.7) 50%, rgba(0,212,255,0.5) 60%, transparent)',
        boxShadow: '0 0 14px rgba(0,212,255,0.3)', left: 0,
      }}/>

      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.32) 30%, rgba(0,212,255,0.42) 50%, rgba(0,212,255,0.32) 70%, transparent)',
        boxShadow: '0 0 10px rgba(0,212,255,0.1)',
      }}/>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* Left: Visual + description */}
          <FadeIn className="flex flex-col gap-8">
            <div className="rounded-3xl overflow-hidden p-4" style={{
              background: 'var(--surface-card-el)', border: '1px solid rgba(0,212,255,0.14)',
            }}>
              <DemoVisual />
            </div>

            <div>
              <p className="font-mono font-bold uppercase tracking-[0.24em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Book a Demo</p>
              <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
                See ZenaDrone in<br />
                <span style={{ background: 'linear-gradient(135deg, #00d4ff, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Action
                </span>
              </h2>
              <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '1.125rem' }}>
                {`We're excited to show you the power of ZenaDrone's intelligent multi-industry surveillance, monitoring, and inspection solution. Fill out the form and our team will schedule your demo flight.`}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {['Multi-Industry AI', '8-Rotor System', 'VTOL Deploy', '4K Camera', 'Multispectral'].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg font-mono" style={{
                    background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.16)',
                    fontSize: '0.8125rem', color: '#00d4ff',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn delay={0.1}>
            <div className="relative p-7 md:p-9 rounded-3xl" style={{
              background: 'var(--surface-card-el)',
              border: '1px solid rgba(0,212,255,0.14)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 60px rgba(0,212,255,0.04)',
            }}>
              <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.08) 0%, transparent 70%)' }}/>
              <div className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(52,211,153,0.06) 0%, transparent 70%)' }}/>

              <p className="font-mono font-bold uppercase tracking-[0.2em] mb-5" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
                Schedule Demo Flight
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ background: 'rgba(0,212,255,0.14)', border: '2px solid rgba(0,212,255,0.4)' }}>
                    <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
                      <path d="M5 13 L9 17 L19 7" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Demo Scheduled!</h3>
                  <p className="font-sans text-text-muted" style={{ fontSize: '0.9rem' }}>
                    Our team will contact you within 24 hours to confirm your ZenaDrone 1000 demo flight.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name"     name="name"  type="text"  placeholder="John Smith"       value={form.name}  onChange={handleChange} required/>
                    <Field label="Email Address" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required/>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Company / Organisation" name="company" type="text" placeholder="Your company" value={form.company} onChange={handleChange}/>
                    <Field label="Phone Number"           name="phone"   type="tel"  placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange}/>
                  </div>
                  <SelectField
                    label="Industry / Use Case"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    options={[
                      'Agriculture & Farming',
                      'Security & Surveillance',
                      'Search & Rescue',
                      'Military / Defense',
                      'Real Estate / Property',
                      'Film & Media',
                      'Environmental Monitoring',
                      'Power Lines & Energy',
                      'Construction',
                      'Other',
                    ]}
                  />
                  <TextareaField
                    label="Tell us about your project"
                    name="message"
                    placeholder="Describe your intended use case, operational environment, fleet size, and any specific capability requirements you have..."
                    value={form.message}
                    onChange={handleChange}
                  />

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                    <motion.button
                      type="submit" disabled={loading}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                      className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl font-sans font-semibold transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)',
                        color: '#07070f', fontSize: '0.9rem',
                        boxShadow: '0 0 28px rgba(0,212,255,0.28)',
                        opacity: loading ? 0.75 : 1,
                      }}
                    >
                      {loading ? (
                        <><div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"/>Sending...</>
                      ) : (
                        <>Book Demo Flight
                          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      )}
                    </motion.button>
                    <p className="font-sans text-text-muted text-center" style={{ fontSize: '1.125rem' }}>
                      Free demo. Response within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>

      <style>{`
        @keyframes featCtaOrbF { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.1)} }
      `}</style>
    </section>
  )
}
