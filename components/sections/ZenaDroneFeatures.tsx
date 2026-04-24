'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    num: '01', accent: '#00d4ff', title: 'Octocopter Drone',
    desc: 'ZenaDrone 1000 has 8 Rotors giving the drone greater lift, stability, and maneuverability in any operating environment.',
    specs: ['8 ROTORS', 'HIGH LIFT', 'FULL STABILITY'],
    illustration: (
      <svg viewBox="0 0 380 300" fill="none" className="w-full h-full">
        {/* Outer orbit */}
        <circle cx="190" cy="150" r="130" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.2" className="zf-spin" style={{ transformOrigin: '190px 150px' }} />
        <circle cx="190" cy="150" r="100" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.15" className="zf-spin-rev" style={{ transformOrigin: '190px 150px' }} />
        {/* 8 arms + rotors */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const r = (deg * Math.PI) / 180
          const ax = 190 + 55 * Math.cos(r), ay = 150 + 55 * Math.sin(r)
          const rx = 190 + 88 * Math.cos(r), ry = 150 + 88 * Math.sin(r)
          return (
            <g key={i}>
              <line x1={190 + 16 * Math.cos(r)} y1={150 + 16 * Math.sin(r)} x2={ax} y2={ay} stroke="#00d4ff" strokeWidth="2" opacity="0.5" />
              <line x1={ax} y1={ay} x2={rx} y2={ry} stroke="#00d4ff" strokeWidth="1.5" opacity="0.35" />
              {/* Rotor disc */}
              <circle cx={rx} cy={ry} r="22" stroke="#00d4ff" strokeWidth="0.8" fill="rgba(0,212,255,0.04)" />
              <circle cx={rx} cy={ry} r="18" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2" className="zf-spin-fast" style={{ transformOrigin: `${rx}px ${ry}px`, animationDelay: `${i * 0.04}s` }} />
              {/* Rotor blades */}
              <line x1={rx - 16} y1={ry} x2={rx + 16} y2={ry} stroke="#00d4ff" strokeWidth="3" strokeLinecap="round" opacity="0.7" className="zf-rotor" style={{ transformOrigin: `${rx}px ${ry}px`, animationDelay: `${i * 0.04}s` }} />
              <line x1={rx} y1={ry - 16} x2={rx} y2={ry + 16} stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" opacity="0.4" className="zf-rotor" style={{ transformOrigin: `${rx}px ${ry}px`, animationDelay: `${i * 0.04 + 0.02}s` }} />
              {/* Hub dot */}
              <circle cx={rx} cy={ry} r="3" fill="#00d4ff" opacity="0.8" />
            </g>
          )
        })}
        {/* Central body */}
        <circle cx="190" cy="150" r="16" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="190" cy="150" r="8"  fill="rgba(0,212,255,0.25)" stroke="#00d4ff" strokeWidth="1" />
        <circle cx="190" cy="150" r="3"  fill="#00d4ff" />
        {/* HUD labels */}
        <text x="30"  y="40"  fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.5">ALT: 200m</text>
        <text x="280" y="40"  fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.5">SPD: 58 km/h</text>
        <text x="30"  y="270" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.5">ROTORS: 8 ● ACTIVE</text>
        <text x="280" y="270" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.5" textAnchor="end">STABLE</text>
        {/* Corner brackets */}
        <path d="M10,20 L10,10 L22,10"   stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,20 L370,10 L358,10" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M10,280 L10,290 L22,290" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,280 L370,290 L358,290" stroke="#00d4ff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '02', accent: '#a78bfa', title: 'VTOL Flight Mode',
    desc: 'ZenaDrone boasts VTOL capability, steady hovering, requiring minimal footprint for take-off and landing.',
    specs: ['VERTICAL T/O', 'STEADY HOVER', '< 1m² FOOTPRINT'],
    illustration: (
      <svg viewBox="0 0 380 300" fill="none" className="w-full h-full">
        {/* Ground */}
        <line x1="40" y1="240" x2="340" y2="240" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" />
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1={60 + i*48} y1="240" x2={52 + i*48} y2="256" stroke="#a78bfa" strokeWidth="0.7" opacity="0.2" />
        ))}
        {/* Distance markers */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <line x1={60 + i*80} y1="236" x2={60 + i*80} y2="244" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
            <text x={60 + i*80} y="258" fill="#a78bfa" fontSize="7" fontFamily="monospace" opacity="0.4" textAnchor="middle">{i * 10}m</text>
          </g>
        ))}
        {/* Drone body — floating */}
        <g className="zf-float" style={{ transformOrigin: '190px 130px' }}>
          <rect x="162" y="120" width="56" height="22" rx="5" stroke="#a78bfa" strokeWidth="1.5" fill="rgba(167,139,250,0.1)" />
          {/* Camera gimbal */}
          <circle cx="190" cy="147" r="6" stroke="#a78bfa" strokeWidth="1" fill="rgba(167,139,250,0.08)" />
          <circle cx="190" cy="147" r="2.5" fill="#a78bfa" opacity="0.7" />
          {/* 4 arms */}
          {[[-28,-10],[28,-10],[-28,10],[28,10]].map(([dx,dy],i) => {
            const ex = 190 + dx + (dx > 0 ? 32 : -32), ey = 131 + dy
            return (
              <g key={i}>
                <line x1={190 + dx} y1={131 + dy} x2={ex} y2={ey} stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
                <circle cx={ex} cy={ey} r="14" stroke="#a78bfa" strokeWidth="0.8" fill="rgba(167,139,250,0.05)" />
                <line x1={ex - 12} y1={ey} x2={ex + 12} y2={ey} stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" className="zf-rotor" style={{ transformOrigin: `${ex}px ${ey}px`, animationDelay: `${i*0.05}s` }} />
              </g>
            )
          })}
          {/* Downwash lines */}
          {[162,170,178,186,194,202,210,218].map((x, i) => (
            <line key={i} x1={x} y1="152" x2={x - 2 + i*0.5} y2={170 + (i % 2) * 6} stroke="#a78bfa" strokeWidth="0.7" opacity="0.2" strokeDasharray="2 3" />
          ))}
        </g>
        {/* Altitude line */}
        <line x1="50" y1="130" x2="50" y2="240" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.35" />
        <text x="36" y="130" fill="#a78bfa" fontSize="8" fontFamily="monospace" opacity="0.6" textAnchor="end" transform="rotate(-90 36 185)">ALTITUDE</text>
        {/* Altitude ticks */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <line x1="46" y1={240 - i*37} x2="54" y2={240 - i*37} stroke="#a78bfa" strokeWidth="0.8" opacity="0.4" />
            <text x="42" y={244 - i*37} fill="#a78bfa" fontSize="7" fontFamily="monospace" opacity="0.4" textAnchor="end">{i*50}m</text>
          </g>
        ))}
        {/* Status */}
        <text x="190" y="30" fill="#a78bfa" fontSize="9" fontFamily="monospace" opacity="0.5" textAnchor="middle">VTOL MODE ● HOVERING</text>
        <path d="M10,20 L10,10 L22,10"   stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,20 L370,10 L358,10" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M10,280 L10,290 L22,290" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,280 L370,290 L358,290" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '03', accent: '#34d399', title: 'Carbon Fiber Body',
    desc: 'ZenaDrone 1000 is constructed with a durable frame, body, and mounting plates made of resilient composite carbon fiber, ensuring a long-lasting drone.',
    specs: ['COMPOSITE FRAME', '< 4.2 kg', 'IP54 RATED'],
    illustration: (
      <svg viewBox="0 0 380 300" fill="none" className="w-full h-full">
        {/* Carbon fiber hex grid */}
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => {
            const cx = 44 + col * 44 + (row % 2) * 22
            const cy = 50 + row * 38
            if (cx < 20 || cx > 360 || cy < 20 || cy > 280) return null
            const pts = [0,1,2,3,4,5].map(k => {
              const a = (k * 60 - 30) * Math.PI / 180
              return `${cx + 18 * Math.cos(a)},${cy + 18 * Math.sin(a)}`
            }).join(' ')
            const dist = Math.sqrt((cx-190)**2 + (cy-150)**2)
            const op = Math.max(0.06, 0.55 - dist / 200)
            return (
              <polygon key={`${row}-${col}`} points={pts}
                stroke="#34d399" strokeWidth="0.7"
                fill={dist < 60 ? 'rgba(52,211,153,0.14)' : 'rgba(52,211,153,0.04)'}
                opacity={op}
              />
            )
          })
        )}
        {/* Center glow */}
        <circle cx="190" cy="150" r="55" stroke="#34d399" strokeWidth="1" strokeDasharray="5 4" opacity="0.25" className="zf-spin" style={{ transformOrigin: '190px 150px' }} />
        <circle cx="190" cy="150" r="35" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1.2" />
        <circle cx="190" cy="150" r="18" fill="rgba(52,211,153,0.14)" stroke="#34d399" strokeWidth="1" />
        <circle cx="190" cy="150" r="6"  fill="#34d399" opacity="0.8" />
        {/* Callout lines */}
        <line x1="225" y1="130" x2="270" y2="95"  stroke="#34d399" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3" />
        <line x1="155" y1="170" x2="100" y2="200" stroke="#34d399" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3" />
        <text x="273" y="92"  fill="#34d399" fontSize="8" fontFamily="monospace" opacity="0.6">CARBON WEAVE</text>
        <text x="30"  y="205" fill="#34d399" fontSize="8" fontFamily="monospace" opacity="0.6">COMPOSITE LAYER</text>
        {/* Specs */}
        <text x="190" y="25" fill="#34d399" fontSize="9" fontFamily="monospace" opacity="0.5" textAnchor="middle">MATERIAL ANALYSIS ● CARBON FIBER</text>
        <text x="30"  y="280" fill="#34d399" fontSize="8" fontFamily="monospace" opacity="0.4">TENSILE: 3.5 GPa</text>
        <text x="350" y="280" fill="#34d399" fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">DENSITY: 1.6 g/cm³</text>
        <path d="M10,20 L10,10 L22,10"     stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,20 L370,10 L358,10"  stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M10,280 L10,290 L22,290"  stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,280 L370,290 L358,290" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '04', accent: '#fbbf24', title: 'Automatic Charging',
    desc: "ZenaDrone 1000's tracking technology uses sensors to detect its charging pad, lands and starts the charge cycle automatically.",
    specs: ['AUTO LAND', 'SENSOR DETECT', 'FULL AUTO CYCLE'],
    illustration: (
      <svg viewBox="0 0 380 300" fill="none" className="w-full h-full">
        {/* Charging platform */}
        <ellipse cx="190" cy="250" rx="80" ry="14" stroke="#fbbf24" strokeWidth="1.2" fill="rgba(251,191,36,0.06)" />
        <ellipse cx="190" cy="250" rx="55" ry="9"  stroke="#fbbf24" strokeWidth="0.8" opacity="0.4" />
        <ellipse cx="190" cy="250" rx="28" ry="5"  stroke="#fbbf24" strokeWidth="0.7" opacity="0.3" />
        {/* Pad cross */}
        <line x1="174" y1="250" x2="206" y2="250" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="190" y1="234" x2="190" y2="266" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        {/* Wireless field rings */}
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx="190" cy="250" rx={30 + i*28} ry={22 + i*20}
            stroke="#fbbf24" strokeWidth="0.9" opacity={0.45 - i*0.1}
            strokeDasharray={i % 2 === 0 ? '5 4' : '3 6'}
            className={`zf-charge-${i}`} style={{ transformOrigin: '190px 250px' }}
          />
        ))}
        {/* Drone descending */}
        <g className="zf-descend" style={{ transformOrigin: '190px 130px' }}>
          <rect x="166" y="120" width="48" height="18" rx="4" stroke="#fbbf24" strokeWidth="1.4" fill="rgba(251,191,36,0.1)" />
          <circle cx="190" cy="138" r="5" stroke="#fbbf24" strokeWidth="1" opacity="0.6" />
          {[[-30,-6],[30,-6],[-30,6],[30,6]].map(([dx,dy],i) => {
            const ex = 190+dx+(dx>0?26:-26), ey = 129+dy
            return (
              <g key={i}>
                <line x1={190+dx} y1={129+dy} x2={ex} y2={ey} stroke="#fbbf24" strokeWidth="1" opacity="0.55" />
                <circle cx={ex} cy={ey} r="12" stroke="#fbbf24" strokeWidth="0.8" fill="rgba(251,191,36,0.04)" />
                <line x1={ex-10} y1={ey} x2={ex+10} y2={ey} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" className="zf-rotor" style={{ transformOrigin: `${ex}px ${ey}px`, animationDelay: `${i*0.05}s` }} />
              </g>
            )
          })}
        </g>
        {/* Descent guide line */}
        <line x1="190" y1="148" x2="190" y2="235" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
        {/* Lightning bolt */}
        <path d="M196 180 L188 196 L194 196 L186 215" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="zf-bolt" />
        {/* Status */}
        <text x="190" y="25" fill="#fbbf24" fontSize="9" fontFamily="monospace" opacity="0.5" textAnchor="middle">AUTO CHARGE SEQUENCE ● ACTIVE</text>
        <text x="30"  y="280" fill="#fbbf24" fontSize="8" fontFamily="monospace" opacity="0.4">SENSOR LOCK ●</text>
        <text x="350" y="280" fill="#fbbf24" fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">● CHARGING PAD DETECTED</text>
        <path d="M10,20 L10,10 L22,10"     stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,20 L370,10 L358,10"  stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M10,280 L10,290 L22,290"  stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,280 L370,290 L358,290" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '05', accent: '#f472b6', title: 'Scanning & Detection',
    desc: 'Monitor, track, and scan objects, people, places, and animals using its 4K camera and advanced multispectral imaging.',
    specs: ['4K 60fps', 'THERMAL IR', 'MULTISPECTRAL'],
    illustration: (
      <svg viewBox="0 0 380 300" fill="none" className="w-full h-full">
        {/* Viewfinder */}
        <rect x="30" y="30" width="320" height="240" rx="4" stroke="#f472b6" strokeWidth="0.8" fill="rgba(244,114,182,0.02)" />
        {/* Corner brackets */}
        {([[30,30],[320,30],[30,240],[320,240]] as [number,number][]).map(([x,y],i) => (
          <path key={i}
            d={i===0 ? `M${x},${y+20} L${x},${y} L${x+20},${y}` :
               i===1 ? `M${x+30},${y+20} L${x+30},${y} L${x+10},${y}` :
               i===2 ? `M${x},${y+10} L${x},${y+30} L${x+20},${y+30}` :
                        `M${x+30},${y+10} L${x+30},${y+30} L${x+10},${y+30}`}
            stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
        ))}
        {/* Detected objects — bounding boxes */}
        <rect x="80"  y="80"  width="70" height="90" rx="2" stroke="#f472b6" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
        <text x="80"  y="75"  fill="#f472b6" fontSize="7" fontFamily="monospace" opacity="0.7">PERSON ● 98.2%</text>
        <rect x="220" y="100" width="90" height="60" rx="2" stroke="#f472b6" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
        <text x="220" y="95"  fill="#f472b6" fontSize="7" fontFamily="monospace" opacity="0.6">VEHICLE ● 94.7%</text>
        <rect x="160" y="170" width="50" height="50" rx="2" stroke="#f472b6" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
        <text x="160" y="165" fill="#f472b6" fontSize="7" fontFamily="monospace" opacity="0.5">OBJECT ● 87.1%</text>
        {/* Target crosshair on main target */}
        <circle cx="115" cy="125" r="25" stroke="#f472b6" strokeWidth="1" opacity="0.45" />
        <circle cx="115" cy="125" r="8"  stroke="#f472b6" strokeWidth="1.2" opacity="0.7" />
        <circle cx="115" cy="125" r="2"  fill="#f472b6" />
        <line x1="90"  y1="125" x2="105" y2="125" stroke="#f472b6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="125" y1="125" x2="140" y2="125" stroke="#f472b6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="115" y1="100" x2="115" y2="115" stroke="#f472b6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="115" y1="135" x2="115" y2="150" stroke="#f472b6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        {/* Scan line */}
        <line x1="32" y1="150" x2="348" y2="150" stroke="#f472b6" strokeWidth="1.5" opacity="0.5" className="zf-scanline" />
        <rect x="32" y="148" width="316" height="4" fill="url(#scanGrad)" opacity="0.3" className="zf-scanline" />
        {/* HUD data */}
        <text x="34"  y="22"  fill="#f472b6" fontSize="8" fontFamily="monospace" opacity="0.5">4K ● 60fps ● THERMAL: ON</text>
        <text x="346" y="22"  fill="#f472b6" fontSize="8" fontFamily="monospace" opacity="0.5" textAnchor="end">REC ●</text>
        <text x="34"  y="285" fill="#f472b6" fontSize="8" fontFamily="monospace" opacity="0.4">TARGETS: 3 DETECTED</text>
        <text x="346" y="285" fill="#f472b6" fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">FLAGGED: 1</text>
        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    num: '06', accent: '#22d3ee', title: 'Extended Flight Time',
    desc: 'Rechargeable or replaceable long-lasting battery ensures extended and uninterrupted flight time for demanding missions.',
    specs: ['45 MIN FLIGHT', 'HOT-SWAP', 'AUTO RECHARGE'],
    illustration: (
      <svg viewBox="0 0 380 300" fill="none" className="w-full h-full">
        {/* Circular flight path */}
        <circle cx="190" cy="150" r="110" stroke="#22d3ee" strokeWidth="0.7" strokeDasharray="6 5" opacity="0.2" />
        <circle cx="190" cy="150" r="80"  stroke="#22d3ee" strokeWidth="0.7" strokeDasharray="4 6" opacity="0.15" />
        {/* Flight arc (progress) */}
        <circle cx="190" cy="150" r="110" stroke="#22d3ee" strokeWidth="2"
          strokeDasharray="380 692" strokeDashoffset="-180"
          strokeLinecap="round" opacity="0.8" className="zf-arc" style={{ transformOrigin: '190px 150px' }}
        />
        {/* Drone on path */}
        <g className="zf-orbit" style={{ transformOrigin: '190px 150px' }}>
          <circle cx="190" cy="40" r="10" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="1.2" />
          <line x1="183" y1="40" x2="197" y2="40" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" className="zf-rotor" style={{ transformOrigin: '190px 40px' }} />
          <circle cx="190" cy="40" r="3" fill="#22d3ee" opacity="0.9" />
        </g>
        {/* Battery pack — center */}
        <rect x="140" y="120" width="100" height="60" rx="6" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(34,211,238,0.06)" />
        <rect x="240" y="135" width="10" height="30" rx="3" stroke="#22d3ee" strokeWidth="1.2" fill="rgba(34,211,238,0.08)" />
        {/* Battery fill */}
        <rect x="144" y="124" width="92" height="52" rx="4" fill="rgba(34,211,238,0.05)" />
        <rect x="144" y="124" width="92" height="52" rx="4" fill="#22d3ee" opacity="0.18" className="zf-battfill" style={{ transformOrigin: '144px 150px' }} />
        {/* Level dividers */}
        {[1,2,3].map(i => <line key={i} x1={144+i*23} y1="126" x2={144+i*23} y2="174" stroke="#22d3ee" strokeWidth="0.6" opacity="0.2" />)}
        {/* Bolt */}
        <path d="M195 130 L184 152 L192 152 L181 174" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" className="zf-bolt" />
        {/* Time display */}
        <text x="190" y="195" fill="#22d3ee" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.7" className="zf-timer">00:00:00</text>
        {/* Radial ticks */}
        {Array.from({length:12}).map((_,i) => {
          const a = (i*30-90)*Math.PI/180
          return <line key={i} x1={190+100*Math.cos(a)} y1={150+100*Math.sin(a)} x2={190+112*Math.cos(a)} y2={150+112*Math.sin(a)} stroke="#22d3ee" strokeWidth={i%3===0?1.2:0.6} opacity={i%3===0?0.5:0.25} />
        })}
        <text x="190" y="25"  fill="#22d3ee" fontSize="9" fontFamily="monospace" opacity="0.5" textAnchor="middle">FLIGHT ENDURANCE ● 45 MIN MAX</text>
        <text x="30"  y="280" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.4">BATTERY: 94%</text>
        <text x="350" y="280" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.4" textAnchor="end">ETA: 42 MIN</text>
        <path d="M10,20 L10,10 L22,10"     stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,20 L370,10 L358,10"  stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M10,280 L10,290 L22,290"  stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M370,280 L370,290 L358,290" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
]

const AUTO_INTERVAL = 4500

// ─── Section ──────────────────────────────────────────────────────────────────

export function ZenaDroneFeatures() {
  const [active, setActive]   = useState(0)
  const [paused, setPaused]   = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tweenRef    = useRef<gsap.core.Tween | null>(null)

  const feature = FEATURES[active]

  // ── Auto-advance ─────────────────────────────────────────────────────────────
  const startProgress = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill()
    gsap.set(progressRef.current, { scaleX: 0 })
    tweenRef.current = gsap.to(progressRef.current, {
      scaleX: 1, duration: AUTO_INTERVAL / 1000, ease: 'none',
    })
  }, [])

  const advance = useCallback(() => {
    setActive(i => (i + 1) % FEATURES.length)
  }, [])

  useEffect(() => {
    if (paused) {
      intervalRef.current && clearInterval(intervalRef.current)
      tweenRef.current?.pause()
      return
    }
    startProgress()
    intervalRef.current = setInterval(advance, AUTO_INTERVAL)
    return () => { intervalRef.current && clearInterval(intervalRef.current) }
  }, [paused, active, advance, startProgress])

  function selectTab(i: number) {
    setActive(i)
    startProgress()
    intervalRef.current && clearInterval(intervalRef.current)
    if (!paused) {
      intervalRef.current = setInterval(advance, AUTO_INTERVAL)
    }
  }

  // ── Entrance animation ────────────────────────────────────────────────────────
  const tabsRef    = useRef<HTMLDivElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(tabsRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } },
    )
    gsap.fromTo(displayRef.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } },
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
      aria-label="ZenaDrone features"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,212,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
      }} />
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 65% 50% at 50% 30%, ${feature.accent}08 0%, transparent 65%)`, transition: 'background 0.8s ease' }} />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <p className="font-sans font-medium tracking-[0.32em] uppercase mb-3" style={{ fontSize: '0.8125rem', color: '#00d4ff' }}>Capabilities</p>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)', letterSpacing: '-0.025em', lineHeight: 1.06 }}>
            ZenaDrone Features
          </h2>
          <p className="font-sans text-text-muted mt-3 mx-auto" style={{ fontSize: '1.125rem', maxWidth: '480px' }}>
            Purpose-built hardware and smart software engineered for real-world missions.
          </p>
        </FadeIn>

        {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
        <div ref={tabsRef} style={{ opacity: 0 }}>
          <div className="flex overflow-x-auto gap-1 pb-0" style={{ scrollbarWidth: 'none' }}>
            {FEATURES.map((f, i) => (
              <button
                key={f.num}
                onClick={() => selectTab(i)}
                className="flex-shrink-0 flex items-center gap-2.5 px-4 py-3 rounded-t-xl transition-all duration-300 relative group"
                style={{
                  background: active === i ? `${f.accent}10` : 'transparent',
                  border: `1px solid ${active === i ? f.accent + '35' : 'rgba(255,255,255,0.07)'}`,
                  borderBottom: 'none',
                  minWidth: 'max-content',
                }}
              >
                {/* Active indicator */}
                {active === i && (
                  <motion.div layoutId="tabAccent" className="absolute inset-x-0 top-0 h-[2px] rounded-t-full"
                    style={{ background: f.accent, boxShadow: `0 0 10px ${f.accent}` }}
                  />
                )}
                <span className="font-mono text-[0.6rem] font-bold" style={{ color: active === i ? f.accent : 'rgba(255,255,255,0.25)', letterSpacing: '0.15em' }}>{f.num}</span>
                <span className="font-sans font-medium text-[0.8rem] whitespace-nowrap" style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.4)' }}>{f.title}</span>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative h-[1px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div ref={progressRef} className="absolute inset-y-0 left-0 right-0 origin-left"
              style={{ background: `linear-gradient(to right, ${feature.accent}, ${feature.accent}80)`, boxShadow: `0 0 8px ${feature.accent}80`, transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* ── Feature display ──────────────────────────────────────────────────── */}
        <div
          ref={displayRef}
          className="rounded-b-2xl rounded-tr-2xl overflow-hidden"
          style={{
            background: 'var(--surface-card)',
            border: `1px solid ${feature.accent}18`,
            borderTop: 'none',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 0 80px ${feature.accent}08`,
            opacity: 0,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2"
            >
              {/* Illustration */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0,   opacity: 1 }}
                exit={{ x: -30,    opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
                className="relative flex items-center justify-center p-8 md:p-12"
                style={{
                  background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${feature.accent}07 0%, transparent 70%)`,
                  borderRight: `1px solid ${feature.accent}12`,
                  minHeight: 320,
                }}
              >
                <div className="w-full max-w-sm">
                  {feature.illustration}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0,  opacity: 1 }}
                exit={{ x: 30,    opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16,1,0.3,1], delay: 0.05 }}
                className="flex flex-col justify-center p-8 md:p-12"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-full" style={{ width: 6, height: 6, background: feature.accent, boxShadow: `0 0 10px ${feature.accent}` }} />
                  <span className="font-mono font-bold tracking-[0.2em] uppercase" style={{ fontSize: '0.8125rem', color: feature.accent }}>
                    Feature {feature.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-white mb-4"
                  style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                  {feature.title}
                </h3>

                {/* Divider */}
                <div className="mb-5 h-px w-16" style={{ background: `linear-gradient(to right, ${feature.accent}, transparent)` }} />

                {/* Description */}
                <p className="font-sans text-text-muted leading-relaxed mb-7"
                  style={{ fontSize: '1.125rem', maxWidth: '380px' }}>
                  {feature.desc}
                </p>

                {/* Spec chips */}
                <div className="flex flex-wrap gap-2">
                  {feature.specs.map(spec => (
                    <span key={spec}
                      className="font-mono font-semibold px-3 py-1.5 rounded-lg tracking-wider"
                      style={{
                        fontSize: '0.8125rem',
                        color: feature.accent,
                        background: `${feature.accent}10`,
                        border: `1px solid ${feature.accent}30`,
                        letterSpacing: '0.12em',
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-3 mt-8">
                  <button
                    onClick={() => selectTab((active - 1 + FEATURES.length) % FEATURES.length)}
                    className="flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
                    style={{ width: 38, height: 38, background: `${feature.accent}10`, border: `1px solid ${feature.accent}30` }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                      <path d="M10 12 L6 8 L10 4" stroke={feature.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="flex gap-1.5">
                    {FEATURES.map((_,i) => (
                      <div key={i} onClick={() => selectTab(i)} className="rounded-full cursor-pointer transition-all duration-300"
                        style={{ width: active===i ? 20 : 5, height: 5, background: active===i ? feature.accent : 'rgba(255,255,255,0.15)', boxShadow: active===i ? `0 0 8px ${feature.accent}` : 'none' }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => selectTab((active + 1) % FEATURES.length)}
                    className="flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
                    style={{ width: 38, height: 38, background: `${feature.accent}10`, border: `1px solid ${feature.accent}30` }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" width={14} height={14}>
                      <path d="M6 12 L10 8 L6 4" stroke={feature.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* CSS animations for SVG elements */}
      <style>{`
        .zf-rotor      { animation: zfSpin 0.25s linear infinite; }
        .zf-spin       { animation: zfSpin 16s linear infinite; }
        .zf-spin-rev   { animation: zfSpin 22s linear infinite reverse; }
        .zf-spin-fast  { animation: zfSpin 0.6s linear infinite; }
        .zf-float      { animation: zfFloat 2.5s ease-in-out infinite; }
        .zf-descend    { animation: zfDescend 3s ease-in-out infinite; }
        .zf-scanline   { animation: zfScan 2.2s ease-in-out infinite; }
        .zf-bolt       { animation: zfBolt 2s step-end infinite; }
        .zf-arc        { animation: zfArcSpin 8s linear infinite; }
        .zf-orbit      { animation: zfSpin 8s linear infinite; }
        .zf-battfill   { animation: zfBatt 3s ease-in-out infinite; }
        .zf-timer      { animation: zfTimer 1s step-end infinite; }
        .zf-charge-0   { animation: zfPulse 2.0s ease-out infinite; }
        .zf-charge-1   { animation: zfPulse 2.0s ease-out infinite 0.5s; }
        .zf-charge-2   { animation: zfPulse 2.0s ease-out infinite 1.0s; }
        .zf-charge-3   { animation: zfPulse 2.0s ease-out infinite 1.5s; }

        @keyframes zfSpin    { to { transform: rotate(360deg); } }
        @keyframes zfFloat   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes zfDescend { 0%,100% { transform: translateY(-20px); opacity:0.6; } 70% { transform: translateY(10px); opacity:1; } }
        @keyframes zfScan    { 0%,100% { transform: translateY(-80px); opacity:0.2; } 50% { transform: translateY(60px); opacity:0.7; } }
        @keyframes zfBolt    { 0%,100%,48%,52%{ opacity:0.9; } 49%,51%{ opacity:0.1; } }
        @keyframes zfArcSpin { to { stroke-dashoffset: -692; } }
        @keyframes zfBatt    { 0%,100% { transform: scaleX(0.15); } 60% { transform: scaleX(0.9); } }
        @keyframes zfPulse   { 0% { transform: scale(1); opacity:0.5; } 100% { transform: scale(1.6); opacity:0; } }
        @keyframes zfTimer   {
          0%  { } 10% { } 20% { } 30% { } 40% { } 50% { }
          60% { } 70% { } 80% { } 90% { } 100% { }
        }
      `}</style>
    </section>
  )
}
