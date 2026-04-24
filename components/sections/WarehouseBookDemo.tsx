'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'

const USE_CASES = [
  {
    label: 'Cycle Counting',
    desc: 'Automated, scheduled inventory audits',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx="14" cy="14" r="10" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <path d="M14 8 L14 14 L18 17" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6 C10 4 12.5 3 15 3.2" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    label: 'Barcode Scanning',
    desc: 'RFID & 1D/2D code reading at speed',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="3" y="5" width="22" height="18" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <line x1="7" y1="9" x2="7" y2="19" stroke="#00d4ff" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="10" y1="9" x2="10" y2="19" stroke="#00d4ff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <line x1="13" y1="9" x2="13" y2="19" stroke="#00d4ff" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="16" y1="9" x2="16" y2="19" stroke="#00d4ff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <line x1="19" y1="9" x2="19" y2="19" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="22" y1="9" x2="22" y2="19" stroke="#00d4ff" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: 'Stock Locating',
    desc: 'Find items instantly across large facilities',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <circle cx="12" cy="11" r="6" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.05)" />
        <circle cx="12" cy="11" r="2.2" fill="#00d4ff" opacity="0.85" />
        <line x1="17" y1="16" x2="24" y2="24" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Audit & Compliance',
    desc: 'Full warehouse audits with data trails',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="5" y="3" width="18" height="22" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <line x1="9" y1="9" x2="19" y2="9" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        <line x1="9" y1="13" x2="19" y2="13" stroke="#00d4ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        <path d="M9 17 L11.5 19.5 L16 15" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Real-Time Monitoring',
    desc: 'Live stock level feeds into your WMS',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <rect x="3" y="3" width="22" height="22" rx="2" stroke="#00d4ff" strokeWidth="1.3" fill="rgba(0,212,255,0.04)" />
        <polyline points="5,21 9,15 13,18 17,11 21,14" stroke="#00d4ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="14" r="1.8" fill="#00d4ff" opacity="0.9" />
      </svg>
    ),
  },
  {
    label: 'Custom Solution',
    desc: 'Tailored to your warehouse workflow',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" width={20} height={20}>
        <path d="M14 4 L16.5 9.5 L22 10.3 L18 14.2 L19 20 L14 17.3 L9 20 L10 14.2 L6 10.3 L11.5 9.5 Z" stroke="#00d4ff" strokeWidth="1.2" fill="rgba(0,212,255,0.07)" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function WarehouseBookDemo() {
  const [selected, setSelected] = useState('')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [phone,    setPhone]    = useState('')
  const [company,  setCompany]  = useState('')
  const [message,  setMessage]  = useState('')
  const [sent,     setSent]     = useState(false)

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
        <div>

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
              Fill out the form and our team will be in touch to set up a demo schedule for your warehouse.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

            {/* Use-case cards */}
            <div>
              <p className="font-mono text-text-muted mb-4 uppercase tracking-[0.14em]" style={{ fontSize: '0.68rem' }}>Select Service Type</p>
              <div className="grid grid-cols-2 gap-3">
                {USE_CASES.map(uc => {
                  const active = selected === uc.label
                  return (
                    <button key={uc.label}
                      onClick={() => setSelected(uc.label)}
                      className="text-left flex flex-col gap-2 p-4 rounded-xl transition-all duration-200"
                      style={{
                        background: active ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${active ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: active ? '0 0 18px rgba(0,212,255,0.07)' : 'none',
                      }}
                    >
                      <div className="flex items-center justify-center rounded-lg"
                        style={{ width: 38, height: 38, background: active ? 'rgba(0,212,255,0.12)' : 'rgba(0,212,255,0.06)', border: `1px solid ${active ? 'rgba(0,212,255,0.3)' : 'rgba(0,212,255,0.12)'}` }}>
                        {uc.icon}
                      </div>
                      <div>
                        <p className="font-sans font-semibold" style={{ fontSize: '0.78rem', color: active ? '#00d4ff' : '#fff', lineHeight: 1.3 }}>{uc.label}</p>
                        <p className="font-sans text-text-muted mt-0.5" style={{ fontSize: '0.68rem', lineHeight: 1.4 }}>{uc.desc}</p>
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
                      Our team will contact you within 24 hours to schedule your ZenaDrone warehouse demonstration.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                    <span className="font-mono font-bold uppercase tracking-[0.18em]" style={{ fontSize: '0.65rem', color: '#00d4ff' }}>
                      {selected || 'Book a Demo'}
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
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Company / Organization</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                      placeholder="Warehouse Co." style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Service Type</label>
                    <select value={selected} onChange={e => setSelected(e.target.value)}
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: selected ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}>
                      <option value="" disabled style={{ background: '#07070f' }}>Select a service type...</option>
                      {USE_CASES.map(uc => <option key={uc.label} value={uc.label} style={{ background: '#07070f' }}>{uc.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-text-muted mb-1.5" style={{ fontSize: '0.75rem' }}>Warehouse Details / Message</label>
                    <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Describe your warehouse size, current system, or specific requirements..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-sans font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)', color: '#07070f', fontSize: '0.9rem', boxShadow: '0 0 26px rgba(0,212,255,0.3)' }}>
                    Request Demo
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
