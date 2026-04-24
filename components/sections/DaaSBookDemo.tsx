'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'

const SERVICES = [
  {
    label: 'Field Scanning',
    desc: 'LiDAR, GPS & topography mapping',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="3" y="14" width="2.5" height="8" rx="0.5" fill="#00d4ff" opacity="0.9" />
        <rect x="8" y="11" width="2.5" height="11" rx="0.5" fill="#00d4ff" opacity="0.7" />
        <rect x="13" y="7" width="2.5" height="15" rx="0.5" fill="#00d4ff" opacity="0.85" />
        <rect x="18" y="12" width="2.5" height="10" rx="0.5" fill="#00d4ff" opacity="0.65" />
        <rect x="23" y="17" width="2.5" height="5" rx="0.5" fill="#00d4ff" opacity="0.55" />
        <line x1="3" y1="24" x2="26" y2="24" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    label: 'Multispectral Imaging',
    desc: 'Crop, env & mineral analysis',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="3" y="4" width="22" height="20" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <line x1="3" y1="9" x2="25" y2="9" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#00d4ff" strokeWidth="1.2" opacity="0.6" />
        <line x1="3" y1="19" x2="25" y2="19" stroke="#00d4ff" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: 'Building Inspection',
    desc: '3D footage, towers & facades',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="4" y="4" width="20" height="22" rx="1.5" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <line x1="4" y1="11" x2="24" y2="11" stroke="#00d4ff" strokeWidth="0.9" opacity="0.4" />
        <line x1="4" y1="18" x2="24" y2="18" stroke="#00d4ff" strokeWidth="0.9" opacity="0.4" />
        <rect x="7" y="6" width="5" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.55" />
        <rect x="16" y="6" width="5" height="3" rx="0.5" stroke="#00d4ff" strokeWidth="1" opacity="0.55" />
        <circle cx="20" cy="22" r="3" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.08)" />
        <line x1="21.8" y1="23.8" x2="24" y2="26" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Security Surveillance',
    desc: 'Intelligence, thermal & perimeter',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <path d="M14 2 L22 5.5 L22 12 C22 17 18.5 21 14 23 C9.5 21 6 17 6 12 L6 5.5 Z" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <circle cx="14" cy="13" r="3.5" stroke="#00d4ff" strokeWidth="1.1" />
        <circle cx="14" cy="13" r="1.2" fill="#00d4ff" />
      </svg>
    ),
  },
  {
    label: 'Agricultural Monitoring',
    desc: 'Crop health, irrigation & yield',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <path d="M14 24 L14 12" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 17 C11 14 8 14 8 11 C8 8.5 10.5 7 12 8.5 C12 6.5 13 5.5 14 5.5 C15 5.5 16 6.5 16 8.5 C17.5 7 20 8.5 20 11 C20 14 17 14 14 17Z" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.07)" />
        <ellipse cx="14" cy="25" rx="7" ry="1.8" stroke="#00d4ff" strokeWidth="1" fill="rgba(0,212,255,0.04)" />
      </svg>
    ),
  },
  {
    label: 'Custom Package',
    desc: 'Tailored for your exact needs',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <path d="M14 8 L14 14 L18 18" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="1.5" fill="#00d4ff" />
      </svg>
    ),
  },
]

const PLANS = [
  { id: 'basic',      name: 'Basic',      desc: 'Single scan missions, ideal for one-off surveys' },
  { id: 'pro',        name: 'Professional', desc: 'Monthly subscription with regular scheduled missions' },
  { id: 'enterprise', name: 'Enterprise',  desc: 'Unlimited missions, multi-drone, large organizations' },
  { id: 'custom',     name: 'Custom',      desc: 'Contact us for a fully tailored solution' },
]

export function DaaSBookDemo() {
  const [service, setService] = useState('')
  const [plan,    setPlan]    = useState('')
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [phone,   setPhone]   = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '0.72rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="book-demo" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 65%)' }} />
      <Container>
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.18)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
              <span className="font-mono font-bold uppercase tracking-[0.2em]" style={{ fontSize: '0.72rem', color: '#00d4ff' }}>Book A Demo</span>
            </div>
            <h2 className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Experience ZenaDrone in Action
            </h2>
            <p className="font-sans text-text-muted" style={{ fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.72 }}>
              Fill out the form and our team will be in touch to set up a demo schedule tailored to your organization.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

            {/* Service selector */}
            <div>
              <p className="font-mono text-text-muted mb-4 uppercase tracking-[0.14em]" style={{ fontSize: '0.68rem' }}>Select Service Type</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {SERVICES.map(s => {
                  const active = service === s.label
                  return (
                    <button key={s.label}
                      onClick={() => setService(s.label)}
                      className="text-left flex flex-col gap-2 p-4 rounded-xl transition-all duration-200"
                      style={{
                        background: active ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${active ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: active ? '0 0 18px rgba(0,212,255,0.07)' : 'none',
                      }}
                    >
                      <div className="flex items-center justify-center rounded-lg"
                        style={{ width: 38, height: 38, background: active ? 'rgba(0,212,255,0.12)' : 'rgba(0,212,255,0.06)', border: `1px solid ${active ? 'rgba(0,212,255,0.3)' : 'rgba(0,212,255,0.12)'}` }}>
                        {s.icon}
                      </div>
                      <div>
                        <p className="font-sans font-semibold" style={{ fontSize: '0.78rem', color: active ? '#00d4ff' : '#fff', lineHeight: 1.3 }}>{s.label}</p>
                        <p className="font-sans text-text-muted mt-0.5" style={{ fontSize: '0.68rem', lineHeight: 1.4 }}>{s.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <p className="font-mono text-text-muted mb-3 uppercase tracking-[0.14em]" style={{ fontSize: '0.68rem' }}>Subscription Plan</p>
              <div className="flex flex-col gap-2">
                {PLANS.map(p => {
                  const active = plan === p.id
                  return (
                    <button key={p.id}
                      onClick={() => setPlan(p.id)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: active ? 'rgba(0,212,255,0.07)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${active ? 'rgba(0,212,255,0.28)' : 'rgba(255,255,255,0.07)'}`,
                      }}
                    >
                      <div>
                        <p className="font-sans font-semibold" style={{ fontSize: '0.83rem', color: active ? '#fff' : 'rgba(255,255,255,0.65)' }}>{p.name}</p>
                        <p className="font-sans text-text-muted mt-0.5" style={{ fontSize: '0.72rem' }}>{p.desc}</p>
                      </div>
                      <div className="w-4 h-4 rounded-full flex-shrink-0 ml-3 flex items-center justify-center"
                        style={{ border: `1.5px solid ${active ? '#00d4ff' : 'rgba(255,255,255,0.2)'}`, background: active ? '#00d4ff' : 'transparent' }}>
                        {active && <div className="w-1.5 h-1.5 rounded-full bg-[#07070f]" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
                  <div className="flex items-center justify-center rounded-full"
                    style={{ width: 64, height: 64, background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.3)' }}>
                    <svg viewBox="0 0 24 24" fill="none" width={28} height={28}>
                      <path d="M5 12 L10 17 L19 7" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-white mb-2" style={{ fontSize: '1.4rem' }}>Demo Requested!</p>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                      Our team will contact you within 24 hours to schedule your ZenaDrone demonstration.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                    <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.65rem', color: '#00d4ff' }}>
                      {service || 'Book a Demo'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Full Name *</label>
                      <input required type="text" value={name} onChange={e => setName(e.target.value)}
                        placeholder="John Smith" style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                    <div>
                      <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Phone</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000" style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Email Address *</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="john@company.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Service Type</label>
                    <select value={service} onChange={e => setService(e.target.value)}
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: service ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}>
                      <option value="" disabled style={{ background: '#07070f' }}>Select a service type...</option>
                      {SERVICES.map(s => <option key={s.label} value={s.label} style={{ background: '#07070f' }}>{s.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Message / Requirements</label>
                    <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Describe your operational needs, fleet size, or any specific requirements..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.3)' }}>
                    Send Message
                    <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <p className="font-sans text-text-muted text-center" style={{ fontSize: '0.72rem' }}>
                    We respond within 24 hours. No obligation, no spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
