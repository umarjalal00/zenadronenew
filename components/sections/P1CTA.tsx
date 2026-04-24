'use client'

import { useRef, useState } from 'react'
import { motion }           from 'framer-motion'
import { Container }        from '@/components/ui/Container'
import { FadeIn }           from '@/components/animations/FadeIn'
import { useGSAP }          from '@/hooks/useGSAP'
import { gsap }             from '@/lib/gsap'

const ORBS = [
  { x: 15, y: 40, w: 540, h: 540, color: '#ef4444', op: 0.055, d: 10 },
  { x: 78, y: 58, w: 400, h: 400, color: '#f97316', op: 0.04,  d: 13 },
  { x: 50, y: 8,  w: 260, h: 260, color: '#a78bfa', op: 0.03,  d: 7  },
]

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
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.06)' }}
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
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.06)' }}
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
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.06)' }}
        onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export function P1CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', organisation: '', phone: '',
    inquiry: 'Military / Defense',
    message: '',
  })

  useGSAP(() => {
    gsap.fromTo('.p1-cta-beam',
      { x: '-100%' },
      { x: '200%', duration: 3.8, ease: 'none', repeat: -1, delay: 1 }
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
    <section ref={sectionRef} id="p1-contact" className="relative w-full py-28 md:py-40 overflow-hidden bg-background">
      {ORBS.map((o, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${o.x}%`, top: `${o.y}%`, width: o.w, height: o.h,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse at center, ${o.color} 0%, transparent 70%)`,
          opacity: o.op, filter: 'blur(60px)',
          animation: `p1CtaOrb ${o.d}s ease-in-out infinite`,
          animationDelay: `${i * 3}s`,
        }}/>
      ))}

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(239,68,68,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }}/>

      <div className="absolute inset-y-0 w-px pointer-events-none p1-cta-beam" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(239,68,68,0.5) 40%, rgba(239,68,68,0.7) 50%, rgba(239,68,68,0.5) 60%, transparent)',
        boxShadow: '0 0 14px rgba(239,68,68,0.3)', left: 0,
      }}/>

      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.32) 30%, rgba(239,68,68,0.42) 50%, rgba(239,68,68,0.32) 70%, transparent)',
        boxShadow: '0 0 10px rgba(239,68,68,0.12)',
      }}/>

      <Container size="lg">
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-4" style={{ fontSize: '0.8125rem', color: '#ef4444' }}>
            Contact Us
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Support Your<br />
            <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Mission
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 540, lineHeight: 1.7 }}>
            Fill out the form below to learn how the ZenaDrone Interceptor P-1 can support your mission. Our defense team will respond within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative p-8 md:p-10 rounded-3xl" style={{
            background: 'var(--surface-card-el)',
            border: '1px solid rgba(239,68,68,0.15)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 80px rgba(239,68,68,0.05)',
          }}>
            <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(239,68,68,0.1) 0%, transparent 70%)' }}/>
            <div className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(249,115,22,0.07) 0%, transparent 70%)' }}/>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ background: 'rgba(239,68,68,0.14)', border: '2px solid rgba(239,68,68,0.4)' }}>
                  <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
                    <path d="M5 13 L9 17 L19 7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                  Inquiry Received
                </h3>
                <p className="font-sans text-text-muted" style={{ fontSize: '0.92rem' }}>
                  Our defense team will contact you within 24 hours to discuss Interceptor P-1 deployment options.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name"     name="name"  type="text"  placeholder="Commander J. Smith"  value={form.name}  onChange={handleChange} required/>
                  <Field label="Email Address" name="email" type="email" placeholder="j.smith@defense.mil" value={form.email} onChange={handleChange} required/>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Organisation / Unit" name="organisation" type="text" placeholder="Defense Command HQ"  value={form.organisation} onChange={handleChange}/>
                  <Field label="Phone Number"        name="phone"        type="tel"  placeholder="+1 (555) 000-0000"  value={form.phone}        onChange={handleChange}/>
                </div>
                <SelectField
                  label="Inquiry Type"
                  name="inquiry"
                  value={form.inquiry}
                  onChange={handleChange}
                  options={[
                    'Military / Defense',
                    'Border Security',
                    'Critical Infrastructure',
                    'Law Enforcement',
                    'Research / Evaluation',
                    'Other',
                  ]}
                />
                <TextareaField
                  label="Describe your mission requirements"
                  name="message"
                  placeholder="Describe your current counter-drone challenges, operational environment, deployment scale, and any specific performance requirements..."
                  value={form.message}
                  onChange={handleChange}
                />

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-sans font-semibold transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      color: '#fff', fontSize: '0.92rem',
                      boxShadow: '0 0 28px rgba(239,68,68,0.3)',
                      opacity: loading ? 0.75 : 1,
                    }}
                  >
                    {loading ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"/>Sending...</>
                    ) : (
                      <>Submit Inquiry
                        <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </motion.button>
                  <p className="font-sans text-text-muted text-center" style={{ fontSize: '1.125rem' }}>
                    Confidential inquiry. Response within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-6 mt-10">
          {['AI-Driven Intercept', 'VTOL Deploy', 'Disposable', '<$5K / Unit', 'Autonomous Ops'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full opacity-60" style={{ background: '#ef4444' }}/>
              <span className="font-mono text-text-muted tracking-wider" style={{ fontSize: '0.8125rem' }}>{item}</span>
            </div>
          ))}
        </FadeIn>
      </Container>

      <style>{`
        @keyframes p1CtaOrb { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.12)} }
      `}</style>
    </section>
  )
}
