'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PERKS = [
  {
    accent: '#00d4ff',
    title: 'Live Demonstration',
    desc: 'See the ZenaDrone 1000 in action across your specific use case and environment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <circle cx="12" cy="12" r="9" stroke="#00d4ff" strokeWidth="1.4" />
        <path d="M10 8.5 L16 12 L10 15.5 Z" fill="#00d4ff" opacity="0.9" />
      </svg>
    ),
  },
  {
    accent: '#a78bfa',
    title: 'Expert Q&A Session',
    desc: 'Direct access to our engineering team for deep technical questions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M4 6 Q4 4 6 4 L18 4 Q20 4 20 6 L20 14 Q20 16 18 16 L13 16 L9 20 L9 16 L6 16 Q4 16 4 14 Z" stroke="#a78bfa" strokeWidth="1.4" fill="rgba(167,139,250,0.08)" />
        <line x1="8" y1="9"  x2="16" y2="9"  stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <line x1="8" y1="12" x2="13" y2="12" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    accent: '#34d399',
    title: 'Custom Solution Fit',
    desc: 'Get a tailored walkthrough matched exactly to your industry requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <circle cx="12" cy="12" r="3" stroke="#34d399" strokeWidth="1.4" />
        <path d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12 M4.9 4.9 L7.1 7.1 M16.9 16.9 L19.1 19.1 M19.1 4.9 L16.9 7.1 M7.1 16.9 L4.9 19.1" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    accent: '#fbbf24',
    title: 'Free Consultation',
    desc: 'No commitment, no pressure — just honest expertise and real guidance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
        <path d="M12 3 L20 7 L20 13 C20 17.4 16.4 21 12 22 C7.6 21 4 17.4 4 13 L4 7 Z" stroke="#fbbf24" strokeWidth="1.4" fill="rgba(251,191,36,0.08)" />
        <path d="M9 12 L11 14 L15 10" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const INDUSTRIES = [
  'Agriculture & Farm Plantations', 'Environmental Monitoring', 'City Planning',
  'Property Management', 'Power Line Inspection', 'Security & Surveillance',
  'Military Industry', 'LiveStock Management', 'Architecture & Construction',
  'Warehousing & Inventory', 'Search & Rescue Missions', 'Emergency Services',
  'Oil & Gas Industry', 'Renewable Energy', 'Crop Insurance', 'Industrial Zoning',
]

// ─── Floating Input ───────────────────────────────────────────────────────────

function FloatingInput({
  label, type = 'text', value, onChange, required, error,
}: {
  label: string; type?: string; value: string
  onChange: (v: string) => void; required?: boolean; error?: string
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        required={required}
        className="w-full bg-transparent font-sans outline-none pt-5 pb-2 px-4"
        style={{
          fontSize: '1.125rem',
          color: '#fff',
          border: `1px solid ${error ? '#f87171' : focused ? '#00d4ff' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 12,
          boxShadow: focused ? `0 0 0 3px ${error ? 'rgba(248,113,113,0.12)' : 'rgba(0,212,255,0.12)'}` : 'none',
          background: focused ? 'rgba(0,212,255,0.03)' : 'rgba(255,255,255,0.02)',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
      />
      <label
        className="absolute left-4 font-sans pointer-events-none transition-all duration-200"
        style={{
          top: lifted ? 8 : '50%',
          transform: lifted ? 'translateY(0) scale(0.78)' : 'translateY(-50%) scale(1)',
          transformOrigin: 'left center',
          fontSize: '0.88rem',
          color: error ? '#f87171' : focused ? '#00d4ff' : 'rgba(255,255,255,0.3)',
        }}
      >
        {label}{required && <span style={{ color: '#00d4ff', marginLeft: 2 }}>*</span>}
      </label>
      {error && (
        <p className="font-sans mt-1 pl-1" style={{ fontSize: '0.8125rem', color: '#f87171' }}>{error}</p>
      )}
    </div>
  )
}

// ─── Floating Select ──────────────────────────────────────────────────────────

function FloatingSelect({
  label, value, onChange, options, required, error,
}: {
  label: string; value: string; onChange: (v: string) => void
  options: string[]; required?: boolean; error?: string
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent font-sans outline-none pt-5 pb-2 px-4 appearance-none cursor-pointer"
        style={{
          fontSize: '1.125rem',
          color: value ? '#fff' : 'transparent',
          border: `1px solid ${error ? '#f87171' : focused ? '#00d4ff' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 12,
          boxShadow: focused ? `0 0 0 3px ${error ? 'rgba(248,113,113,0.12)' : 'rgba(0,212,255,0.12)'}` : 'none',
          background: focused ? 'rgba(0,212,255,0.03)' : 'rgba(255,255,255,0.02)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        <option value="" disabled style={{ background: '#0a0a16' }}></option>
        {options.map(o => <option key={o} value={o} style={{ background: '#0a0a16', color: '#fff' }}>{o}</option>)}
      </select>
      <label
        className="absolute left-4 font-sans pointer-events-none transition-all duration-200"
        style={{
          top: lifted ? 8 : '50%',
          transform: lifted ? 'translateY(0) scale(0.78)' : 'translateY(-50%) scale(1)',
          transformOrigin: 'left center',
          fontSize: '0.88rem',
          color: error ? '#f87171' : focused ? '#00d4ff' : 'rgba(255,255,255,0.3)',
        }}
      >
        {label}{required && <span style={{ color: '#00d4ff', marginLeft: 2 }}>*</span>}
      </label>
      {/* Chevron */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
          <path d="M2 4 L6 8 L10 4" stroke={focused ? '#00d4ff' : 'rgba(255,255,255,0.3)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s' }} />
        </svg>
      </div>
      {error && <p className="font-sans mt-1 pl-1" style={{ fontSize: '0.8125rem', color: '#f87171' }}>{error}</p>}
    </div>
  )
}

// ─── Floating Textarea ────────────────────────────────────────────────────────

function FloatingTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        rows={3}
        className="w-full bg-transparent font-sans outline-none pt-6 pb-2 px-4 resize-none"
        style={{
          fontSize: '1.125rem',
          color: '#fff',
          border: `1px solid ${focused ? '#00d4ff' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 12,
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.12)' : 'none',
          background: focused ? 'rgba(0,212,255,0.03)' : 'rgba(255,255,255,0.02)',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
      />
      <label
        className="absolute left-4 font-sans pointer-events-none transition-all duration-200"
        style={{
          top: lifted ? 8 : 16,
          transform: lifted ? 'scale(0.78)' : 'scale(1)',
          transformOrigin: 'left center',
          fontSize: '0.88rem',
          color: focused ? '#00d4ff' : 'rgba(255,255,255,0.3)',
        }}
      >
        {label}
      </label>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function BookDemo() {
  const sectionRef  = useRef<HTMLElement>(null)
  const leftRef     = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const fieldRefs   = useRef<(HTMLDivElement | null)[]>([])

  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', industry: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  function set(k: keyof typeof form) {
    return (v: string) => {
      setForm(f => ({ ...f, [k]: v }))
      if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
    }
  }

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim())     e.name     = 'Full name is required'
    if (!form.email.trim())    e.email    = 'Work email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.company.trim())  e.company  = 'Company name is required'
    if (!form.industry)        e.industry = 'Please select an industry'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
  }

  useGSAP(() => {
    const st = { trigger: sectionRef.current, start: 'top 65%', once: true }

    gsap.fromTo(leftRef.current,
      { opacity: 0, x: -50, filter: 'blur(6px)' },
      { opacity: 1, x: 0,   filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', scrollTrigger: st },
    )

    gsap.fromTo(formCardRef.current,
      { opacity: 0, x: 50, filter: 'blur(6px)' },
      { opacity: 1, x: 0,  filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.15, scrollTrigger: st },
    )

    gsap.fromTo(fieldRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.45, scrollTrigger: st },
    )
  }, { scope: sectionRef })

  return (
    <section
      id="book-demo"
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
      aria-label="Book a Demo"
    >
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 65%)' }}
      />

      {/* Animated flight path background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.06 }}>
        <path d="M-100,400 Q200,100 500,300 Q800,500 1100,200 Q1400,-100 1700,300" stroke="#00d4ff" strokeWidth="1" fill="none" strokeDasharray="8 6" className="bd-path" />
        <path d="M-100,600 Q300,300 600,500 Q900,700 1200,400 Q1500,100 1800,500" stroke="#a78bfa" strokeWidth="1" fill="none" strokeDasharray="6 8" className="bd-path-rev" />
      </svg>

      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Info ─────────────────────────────────────────────────── */}
          <div ref={leftRef} style={{ opacity: 0 }}>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px" style={{ width: 32, background: 'linear-gradient(to right, #00d4ff, transparent)' }} />
              <span className="font-mono font-medium tracking-[0.28em] uppercase" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
                Book a Demo
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display font-bold text-white mb-5"
              style={{ fontSize: 'clamp(2.3rem, 4.3vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Experience ZenaDrone<br />
              <span style={{ color: '#00d4ff' }}>In Action</span>
            </h2>

            {/* Description */}
            <p className="font-sans text-text-muted leading-relaxed mb-10"
              style={{ fontSize: '1.125rem', maxWidth: '420px' }}>
              Fill out the form and our team will be in touch to set up a personalised demo schedule tailored to your industry and requirements.
            </p>

            {/* What you get */}
            <div className="flex flex-col gap-5">
              {PERKS.map((p, i) => (
                <div key={i} className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ width: 44, height: 44, background: `${p.accent}10`, border: `1px solid ${p.accent}28` }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white mb-0.5" style={{ fontSize: '0.9rem' }}>{p.title}</p>
                    <p className="font-sans text-text-muted leading-snug" style={{ fontSize: '1.125rem' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div className="flex items-center gap-3 mt-10 p-4 rounded-2xl"
              style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="rounded-full animate-pulse flex-shrink-0" style={{ width: 8, height: 8, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
              <p className="font-sans text-text-muted" style={{ fontSize: '1.125rem' }}>
                <span className="text-white font-medium">30-minute session</span> — Free, no commitment required
              </p>
            </div>
          </div>

          {/* ── Right: Form ────────────────────────────────────────────────── */}
          <div ref={formCardRef} style={{ opacity: 0 }}>
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'var(--surface-card)',
                border: '1px solid rgba(0,212,255,0.14)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 0 80px rgba(0,212,255,0.06)',
              }}>

              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px]"
                style={{ background: 'linear-gradient(to right, transparent, #00d4ff 30%, #a78bfa 70%, transparent)', boxShadow: '0 0 12px rgba(0,212,255,0.5)' }}
              />

              <AnimatePresence mode="wait">

                {status !== 'success' ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="p-7 md:p-8"
                  >
                    {/* Form header */}
                    <div className="mb-7">
                      <p className="font-mono font-bold tracking-[0.2em] uppercase mb-1" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>
                        Demo Request Form
                      </p>
                      <p className="font-sans text-text-muted" style={{ fontSize: '1.125rem' }}>
                        Fields marked <span style={{ color: '#00d4ff' }}>*</span> are required
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Row 1 */}
                      <div ref={el => { fieldRefs.current[0] = el }} className="grid grid-cols-2 gap-4" style={{ opacity: 0 }}>
                        <FloatingInput label="Full Name" value={form.name} onChange={set('name')} required error={errors.name} />
                        <FloatingInput label="Work Email" type="email" value={form.email} onChange={set('email')} required error={errors.email} />
                      </div>

                      {/* Row 2 */}
                      <div ref={el => { fieldRefs.current[1] = el }} className="grid grid-cols-2 gap-4" style={{ opacity: 0 }}>
                        <FloatingInput label="Company Name" value={form.company} onChange={set('company')} required error={errors.company} />
                        <FloatingInput label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} />
                      </div>

                      {/* Industry */}
                      <div ref={el => { fieldRefs.current[2] = el }} style={{ opacity: 0 }}>
                        <FloatingSelect label="Industry" value={form.industry} onChange={set('industry')} options={INDUSTRIES} required error={errors.industry} />
                      </div>

                      {/* Message */}
                      <div ref={el => { fieldRefs.current[3] = el }} style={{ opacity: 0 }}>
                        <FloatingTextarea label="Tell us about your use case (optional)" value={form.message} onChange={set('message')} />
                      </div>

                      {/* Submit */}
                      <div ref={el => { fieldRefs.current[4] = el }} className="pt-2" style={{ opacity: 0 }}>
                        <motion.button
                          type="submit"
                          disabled={status === 'loading'}
                          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                          className="w-full flex items-center justify-center gap-3 rounded-xl font-sans font-semibold relative overflow-hidden"
                          style={{
                            height: 52,
                            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                            boxShadow: '0 0 30px rgba(0,212,255,0.3)',
                            fontSize: '0.9rem',
                            color: '#07070f',
                            letterSpacing: '0.02em',
                            cursor: status === 'loading' ? 'wait' : 'pointer',
                          }}
                        >
                          {/* Shimmer on hover */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                          />

                          <AnimatePresence mode="wait">
                            {status === 'loading' ? (
                              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                <svg className="animate-spin" viewBox="0 0 20 20" fill="none" width={18} height={18}>
                                  <circle cx="10" cy="10" r="8" stroke="rgba(7,7,15,0.3)" strokeWidth="2.5" />
                                  <path d="M10 2 A8 8 0 0 1 18 10" stroke="#07070f" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                Sending Request...
                              </motion.span>
                            ) : (
                              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                Schedule My Demo
                                <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
                                  <path d="M3 8 L13 8 M9 4 L13 8 L9 12" stroke="#07070f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        <p className="font-sans text-text-muted text-center mt-3" style={{ fontSize: '1.125rem' }}>
                          By submitting, you agree to our Privacy Policy. We&apos;ll never spam you.
                        </p>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center p-12 gap-5"
                    style={{ minHeight: 420 }}
                  >
                    {/* Animated check */}
                    <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: 'backOut' }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}
                      />
                      <motion.svg viewBox="0 0 40 40" fill="none" width={40} height={40}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <motion.path
                          d="M10 20 L17 27 L30 13"
                          stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                        />
                      </motion.svg>
                      {/* Glow rings */}
                      {[0,1].map(i => (
                        <motion.div key={i} className="absolute rounded-full"
                          style={{ inset: -i*12, border: '1px solid rgba(52,211,153,0.25)' }}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 0 }}
                          transition={{ delay: 0.5 + i*0.15, duration: 0.8, ease: 'easeOut' }}
                        />
                      ))}
                    </div>

                    <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em' }}>
                      Request Received!
                    </h3>
                    <p className="font-sans text-text-muted leading-relaxed" style={{ fontSize: '0.88rem', maxWidth: 320 }}>
                      Thank you, <span className="text-white font-medium">{form.name.split(' ')[0]}</span>. Our team will reach out to <span className="text-white font-medium">{form.email}</span> within 24 hours to schedule your demo.
                    </p>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full mt-2"
                      style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                      <div className="rounded-full animate-pulse" style={{ width: 5, height: 5, background: '#34d399' }} />
                      <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#34d399', letterSpacing: '0.15em' }}>
                        RESPONSE TIME: WITHIN 24h
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .bd-path     { animation: bdScroll 12s linear infinite; }
        .bd-path-rev { animation: bdScroll 18s linear infinite reverse; }
        @keyframes bdScroll {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -200; }
        }
      `}</style>
    </section>
  )
}
