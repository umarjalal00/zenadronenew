'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/lib/utils'

// ─── Types & data ─────────────────────────────────────────────────────────────

type Filter = 'All' | 'Industrial' | 'Surveillance' | 'Tactical'

interface DroneCard {
  id: string
  brand: string
  model: string
  category: Exclude<Filter, 'All'>
  tagline: string
  image: string
  accent: string
  tag?: string
  gridClass: string
}

const FILTERS: Filter[] = ['All', 'Industrial', 'Surveillance', 'Tactical']

const FLEET: DroneCard[] = [
  {
    id: 'zd1000',
    brand: 'ZenaDrone',
    model: '1000',
    category: 'Industrial',
    tagline: 'Power Without Compromise',
    image: '/images/zenadrone-1000.jpeg',
    accent: '#00d4ff',
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'zdiqsquare',
    brand: 'ZenaDrone',
    model: 'IQ Square',
    category: 'Surveillance',
    tagline: 'Intelligence. Precision. Everywhere.',
    image: '/images/zenadrone-iq-square.jpeg',
    accent: '#22d3ee',
    tag: 'New',
    gridClass: 'md:col-span-2',
  },
  {
    id: 'zdiqquad',
    brand: 'ZenaDrone',
    model: 'IQ Quad',
    category: 'Industrial',
    tagline: 'Engineered for Perfection',
    image: '/images/zenadrone-iq-quad.png',
    accent: '#34d399',
    gridClass: '',
  },
  {
    id: 'zdiqnano',
    brand: 'ZenaDrone',
    model: 'IQ Nano',
    category: 'Tactical',
    tagline: 'Small Form. Infinite Range.',
    image: '/images/zenadrone-iq-nano.jpeg',
    accent: '#a78bfa',
    gridClass: '',
  },
]

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants = {
  rest:    { y: 0,  transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } },
  hovered: { y: -8, transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] } },
}

const imageVariants: Variants = {
  rest:    { scale: 1,    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number,number,number,number] } },
  hovered: { scale: 1.07, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number,number,number,number] } },
}

const ctaVariants: Variants = {
  rest:    { y: 14, opacity: 0, transition: { duration: 0.25 } },
  hovered: { y: 0,  opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

const overlayVariants = {
  rest:    { opacity: 0.55 },
  hovered: { opacity: 0.35, transition: { duration: 0.35 } },
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 6.5h9M7 2l4.5 4.5L7 11"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ drone, isActive, index }: { drone: DroneCard; isActive: boolean; index: number }) {
  return (
    <motion.div
      className={cn('min-h-[240px]', drone.gridClass)}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Filter + hover wrapper */}
      <motion.div
        className="relative w-full h-full overflow-hidden rounded-2xl cursor-pointer"
        style={{ minHeight: 'inherit' }}
        animate={{
          opacity: isActive ? 1 : 0.15,
          scale:   isActive ? 1 : 0.97,
          filter:  isActive ? 'grayscale(0%)' : 'grayscale(50%)',
        }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        initial="rest"
        whileHover={isActive ? 'hovered' : 'rest'}
        variants={{ rest: { y: 0 }, hovered: { y: -8 } }}
      >
        {/* Image */}
        <motion.div className="absolute inset-0" variants={imageVariants}>
          <Image
            src={drone.image}
            alt={`${drone.brand} ${drone.model}`}
            fill
            quality={88}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Base dark gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={overlayVariants}
          style={{
            background:
              'linear-gradient(to top, rgb(var(--color-background) / 0.95) 0%, rgb(var(--color-background) / 0.5) 40%, rgb(var(--color-background) / 0.1) 70%, transparent 100%)',
          }}
        />

        {/* Accent glow border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          variants={{
            rest:    { opacity: 0 },
            hovered: { opacity: 1, transition: { duration: 0.3 } },
          }}
          style={{
            boxShadow: `inset 0 0 0 1px ${drone.accent}55, 0 0 40px ${drone.accent}18`,
          }}
        />

        {/* Top-left: tag badge */}
        {drone.tag && (
          <div
            className="absolute top-4 left-4 px-2.5 py-1 rounded-full font-sans font-semibold uppercase tracking-[0.14em]"
            style={{
              fontSize: '0.8125rem',
              color: drone.accent,
              background: `${drone.accent}1a`,
              border: `1px solid ${drone.accent}40`,
            }}
          >
            {drone.tag}
          </div>
        )}

        {/* Content — bottom of card */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          {/* Category chip */}
          <p
            className="font-sans uppercase tracking-[0.2em] mb-2"
            style={{ fontSize: '0.8125rem', color: drone.accent, opacity: 0.85 }}
          >
            {drone.category}
          </p>

          {/* Brand + Model */}
          <div className="mb-1">
            <span
              className="font-display font-light text-white/50 tracking-[0.14em] uppercase"
              style={{ fontSize: '1.125rem' }}
            >
              {drone.brand}{' '}
            </span>
            <span
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.3rem, 2.4vw, 2rem)', letterSpacing: '-0.025em' }}
            >
              {drone.model}
            </span>
          </div>

          {/* Tagline */}
          <p
            className="font-sans text-white/55"
            style={{ fontSize: '1.125rem' }}
          >
            {drone.tagline}
          </p>

          {/* Explore CTA — slides up on hover */}
          <motion.div
            variants={ctaVariants}
            className="mt-4 inline-flex items-center gap-2 font-sans font-medium"
            style={{ fontSize: '1.125rem', color: drone.accent }}
          >
            Explore <ArrowRight />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Fleet() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  return (
    <section
      className="relative w-full bg-background py-24 md:py-32"
      aria-label="ZenaDrone fleet showcase"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        }}
      />

      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p
            className="font-sans font-medium tracking-[0.32em] uppercase mb-3"
            style={{ fontSize: '0.8125rem', color: '#00d4ff' }}
          >
            The Fleet
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
            }}
          >
            Choose Your Mission
          </h2>
          <p
            className="font-sans text-text-muted mt-3 mx-auto"
            style={{ fontSize: '1.125rem', maxWidth: '460px' }}
          >
            Four platforms. One ecosystem. Purpose-built for every operational environment.
          </p>
        </FadeIn>

        {/* Filter buttons */}
        <FadeIn delay={0.15} className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {FILTERS.map(f => {
            const active = f === activeFilter
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-sans font-medium rounded-full px-5 py-2 transition-all duration-300 focus-visible:outline-none"
                style={{
                  fontSize: '0.8rem',
                  color:      active ? '#07070f' : 'rgba(255,255,255,0.5)',
                  background: active ? '#00d4ff' : 'rgba(255,255,255,0.05)',
                  border:     active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.09)',
                }}
              >
                {f}
              </button>
            )
          })}
        </FadeIn>

        {/* Bento grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          style={{
            gridTemplateRows: 'repeat(2, 300px)',
          }}
        >
          {FLEET.map((drone, i) => (
            <Card
              key={drone.id}
              drone={drone}
              isActive={activeFilter === 'All' || drone.category === activeFilter}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
