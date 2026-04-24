'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn }    from '@/components/animations/FadeIn'
import { useGSAP }   from '@/hooks/useGSAP'
import { gsap }      from '@/lib/gsap'

const ORBS = [
  { x: 20, y: 30, w: 480, h: 480, color: '#f97316', op: 0.06, d: 9  },
  { x: 78, y: 65, w: 360, h: 360, color: '#ef4444', op: 0.05, d: 12 },
  { x: 50, y: 10, w: 300, h: 300, color: '#fbbf24', op: 0.04, d: 7  },
]

const TRUST = ['Rapid Deployment', 'Mission Certified', 'Encrypted Data', 'Global Support']

export function WFBookDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', useCase: '', message: '' })

  useGSAP(() => {
    gsap.fromTo('.wfbd-beam',
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
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  return (
    <section ref={sectionRef} id="book-demo" className="relative w-full py-28 md:py-40 overflow-hidden bg-background">
      {ORBS.map((o, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${o.x}%`, top: `${o.y}%`,
          width: o.w, height: o.h,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse at center, ${o.color} 0%, transparent 70%)`,
          opacity: o.op, filter: 'blur(60px)',
          animation: `wfbdOrb ${o.d}s ease-in-out infinite`,
          animationDelay: `${i * 3}s`,
        }} />
      ))}

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <div className="absolute inset-y-0 w-px pointer-events-none wfbd-beam" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(249,115,22,0.55) 40%, rgba(249,115,22,0.75) 50%, rgba(249,115,22,0.55) 60%, transparent)',
        boxShadow: '0 0 15px rgba(249,115,22,0.35)',
        left: 0,
      }} />

      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.3) 30%, rgba(249,115,22,0.4) 50%, rgba(249,115,22,0.3) 70%, transparent)',
        boxShadow: '0 0 12px rgba(249,115,22,0.18)',
      }} />

      <Container size="lg">
        <FadeIn className="text-center mb-14">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-4" style={{ fontSize: '0.8125rem', color: '#f97316' }}>
            Get Started
          </p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.4rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Book a{' '}
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Demo
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1.125rem', maxWidth: 520, lineHeight: 1.7 }}>
            Experience ZenaDrone wildfire solutions firsthand. Complete the form and our team will contact you to schedule a live demonstration.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative p-8 md:p-10 rounded-3xl" style={{
            background: 'var(--surface-card-el)',
            border: '1px solid rgba(249,115,22,0.15)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 80px rgba(249,115,22,0.06)',
          }}>
            <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at top left, rgba(249,115,22,0.1) 0%, transparent 70%)',
            }} />
            <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(239,68,68,0.09) 0%, transparent 70%)',
            }} />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.4)' }}>
                  <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
                    <path d="M5 13 L9 17 L19 7" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
                  Request Received!
                </h3>
                <p className="font-sans text-text-muted" style={{ fontSize: '0.92rem' }}>
                  Our team will contact you within 24 hours to schedule your personalized ZenaDrone wildfire demo.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <WFFormField label="Full Name"     name="name"  type="text"  placeholder="Jane Smith"       value={form.name}  onChange={handleChange} required />
                  <WFFormField label="Email Address" name="email" type="email" placeholder="jane@agency.gov"  value={form.email} onChange={handleChange} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <WFFormField label="Organization" name="company" type="text" placeholder="Fire dept / agency" value={form.company} onChange={handleChange} />
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono font-bold text-text-muted uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>Use Case</label>
                    <select
                      name="useCase" value={form.useCase} onChange={handleChange}
                      className="px-4 py-3 rounded-xl font-sans text-white outline-none transition-all duration-200"
                      style={{
                        background: 'var(--surface-input)', border: '1px solid rgba(255,255,255,0.08)',
                        fontSize: '0.88rem', color: form.useCase ? '#fff5ee' : '#4a5568',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.07)' }}
                      onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <option value="" style={{ background: '#07070f' }}>Select use case</option>
                      {['Fire Department', 'Environmental Conservation', 'Insurance & Risk Assessment', 'Utility Company', 'Government / Civil Defense', 'Research & Education', 'Other'].map(o => (
                        <option key={o} value={o} style={{ background: '#07070f' }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <WFFormTextarea label="Tell us about your mission" name="message" placeholder="Describe your wildfire operations, current challenges, and what you'd like to achieve with ZenaDrone..." value={form.message} onChange={handleChange} />

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-sans font-semibold overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      color: '#fff', fontSize: '0.92rem',
                      boxShadow: '0 0 28px rgba(249,115,22,0.4)',
                      opacity: loading ? 0.75 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Schedule My Demo
                        <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                  <p className="font-sans text-text-muted text-center sm:text-left" style={{ fontSize: '0.82rem' }}>
                    No commitment required. Response within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-6 mt-10">
          {TRUST.map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#f97316', opacity: 0.6 }} />
              <span className="font-mono text-text-muted tracking-wider" style={{ fontSize: '0.8125rem' }}>{item}</span>
            </div>
          ))}
        </FadeIn>
      </Container>

      <style>{`
        @keyframes wfbdOrb { 0%,100% { transform:translate(-50%,-50%) scale(1); } 50% { transform:translate(-50%,-50%) scale(1.12); } }
      `}</style>
    </section>
  )
}

function WFFormField({ label, name, type, placeholder, value, onChange, required }: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono font-bold text-text-muted uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>
        {label}
      </label>
      <input
        type={type} name={name} placeholder={placeholder} value={value}
        onChange={onChange} required={required}
        className="px-4 py-3 rounded-xl font-sans text-white placeholder-text-subtle outline-none transition-all duration-200"
        style={{ background: 'var(--surface-input)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.88rem' }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.07)' }}
        onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function WFFormTextarea({ label, name, placeholder, value, onChange }: {
  label: string; name: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono font-bold text-text-muted uppercase tracking-[0.18em]" style={{ fontSize: '0.8125rem' }}>
        {label}
      </label>
      <textarea
        name={name} placeholder={placeholder} value={value}
        onChange={onChange} rows={4}
        className="px-4 py-3 rounded-xl font-sans text-white placeholder-text-subtle outline-none resize-none transition-all duration-200"
        style={{ background: 'var(--surface-input)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.88rem' }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.38)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.07)' }}
        onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}
