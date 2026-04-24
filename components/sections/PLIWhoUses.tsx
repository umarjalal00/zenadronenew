'use client'

import { useState }   from 'react'
import { motion }     from 'framer-motion'
import { Container }      from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn }         from '@/components/animations/FadeIn'
import { StaggerChildren, itemVariants } from '@/components/animations/StaggerChildren'

const USERS = [
  {
    color: '#00d4ff',
    title: 'Energy Companies',
    subtitle: 'Transmission & Distribution',
    desc: 'Utility companies use ZenaDrone to inspect high-voltage transmission lines and distribution networks. Early fault detection reduces downtime, prevents outages, and cuts emergency repair costs significantly.',
    points: ['High-voltage line corridor inspection', 'Equipment fault identification', 'Preventive maintenance prioritisation', 'Storm damage rapid assessment'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <line x1="4"  y1="23" x2="28" y2="23" stroke="#00d4ff" strokeWidth={1.5} strokeLinecap="round" />
        <line x1="4"  y1="18" x2="28" y2="18" stroke="#00d4ff" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        <line x1="9"  y1="10" x2="9"  y2="23" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="23" y1="10" x2="23" y2="23" stroke="#00d4ff" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="7"  y1="10" x2="11" y2="10" stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" />
        <line x1="21" y1="10" x2="25" y2="10" stroke="#00d4ff" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M15 14 L13 18 L16 18 L14 23" stroke="#00d4ff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    color: '#fbbf24',
    title: 'Emergency Response',
    subtitle: 'Storm & Disaster Recovery',
    desc: 'After storms, fires, or natural disasters, ZenaDrone rapidly assesses power line damage across wide areas. Crews can prioritise restoration efforts and restore power faster to affected communities.',
    points: ['Post-storm damage assessment', 'Priority restoration mapping', 'Real-time status reporting', 'Rapid infrastructure survey'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <path d="M16 3 C16 3 9 10 9 18 C9 22.4 12 26 16 26 C20 26 23 22.4 23 18 C23 10 16 3 16 3Z" stroke="#fbbf24" strokeWidth={1.4} fill="rgba(251,191,36,0.08)" />
        <path d="M12.5 19 Q14 16 16 16 Q18 16 19.5 19" stroke="#fbbf24" strokeWidth={1.2} strokeLinecap="round" />
        <line x1="16" y1="10" x2="16" y2="16" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: '#34d399',
    title: 'Environmental Management',
    subtitle: 'Vegetation & Right-of-Way',
    desc: 'Conservation and land agencies use ZenaDrone to manage vegetation encroachment along power line corridors. Early detection of trees or branches too close to lines prevents outages and wildfire ignition.',
    points: ['Vegetation encroachment detection', 'Tree clearance monitoring', 'Right-of-way compliance', 'Fire risk reduction programs'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <circle cx="16" cy="16" r="11" stroke="#34d399" strokeWidth={1.4} fill="rgba(52,211,153,0.08)" />
        <path d="M5 16 Q9 11 16 16 Q23 21 27 16" stroke="#34d399" strokeWidth={1.3} strokeLinecap="round" />
        <line x1="16" y1="5" x2="16" y2="27" stroke="#34d399" strokeWidth={0.8} opacity={0.3} />
        <path d="M16 9 Q18 12 16 16 Q14 12 16 9" stroke="#34d399" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: '#a78bfa',
    title: 'Infrastructure Upgrades',
    subtitle: 'Planning & Engineering',
    desc: 'Before fixing or upgrading power lines, ZenaDrone provides engineers with clear 3D data to plan the work. Accurate surveys reduce project risk, improve safety planning, and optimise resource deployment.',
    points: ['Pre-construction 3D surveys', 'Engineering-grade data accuracy', 'Route planning support', 'Asset condition baseline mapping'],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width={28} height={28}>
        <rect x="4" y="5" width="24" height="18" rx="2" stroke="#a78bfa" strokeWidth={1.4} fill="rgba(167,139,250,0.06)" />
        <path d="M8 20 L12 14 L16 17 L20 11 L24 15" stroke="#a78bfa" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="15" r="2" fill="#a78bfa" opacity={0.8} />
      </svg>
    ),
  },
]

export function PLIWhoUses() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <SectionWrapper id="who-uses" className="bg-surface">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
      }} />

      <Container>
        <FadeIn className="text-center mb-16">
          <p className="font-mono font-bold uppercase tracking-[0.28em] mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Who Uses ZenaDrone</p>
          <h2 className="font-display font-bold text-white mb-5" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Drones That Help{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Energy Companies
            </span>
          </h2>
          <p className="font-sans text-text-muted mx-auto" style={{ fontSize: '1rem', maxWidth: 520 }}>
            Powerline inspection drones are good for more than just checking power lines — saving time, preventing problems, and cutting costs across multiple use cases.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.08} className="grid sm:grid-cols-2 gap-5">
          {USERS.map((u, i) => (
            <motion.div key={u.title} variants={itemVariants}
              className="group relative p-6 rounded-2xl cursor-default transition-all duration-300"
              style={{ background: active === i ? `${u.color}0b` : 'var(--surface-elevated)', border: `1px solid ${active === i ? u.color + '32' : 'rgba(255,255,255,0.07)'}`, boxShadow: active === i ? `0 0 40px ${u.color}0c` : 'none' }}
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300" style={{ width: 52, height: 52, background: active === i ? `${u.color}18` : `${u.color}0c`, border: `1.5px solid ${active === i ? u.color + '40' : u.color + '20'}` }}>
                  {u.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-0.5" style={{ fontSize: '1.1rem', letterSpacing: '-0.015em' }}>{u.title}</h3>
                  <span className="font-mono font-bold uppercase tracking-[0.16em]" style={{ fontSize: '0.66rem', color: u.color }}>{u.subtitle}</span>
                </div>
              </div>

              <p className="font-sans text-text-muted leading-relaxed mb-4" style={{ fontSize: '0.875rem' }}>{u.desc}</p>

              <ul className="flex flex-col gap-2">
                {u.points.map(pt => (
                  <li key={pt} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300" style={{ background: active === i ? u.color : 'rgba(255,255,255,0.25)', boxShadow: active === i ? `0 0 4px ${u.color}` : 'none' }} />
                    <span className="font-sans text-text-muted" style={{ fontSize: '0.82rem' }}>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-300" style={{ background: active === i ? `linear-gradient(to right, transparent, ${u.color}50, transparent)` : 'transparent' }} />
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  )
}
