'use client'

import Link                      from 'next/link'
import Image                     from 'next/image'
import { useRef }                from 'react'
import { motion, useInView }     from 'framer-motion'
import { Container }             from '@/components/ui/Container'
import { SectionWrapper }        from '@/components/ui/SectionWrapper'
import { FadeIn }                from '@/components/animations/FadeIn'
import type { WPPost }           from '@/lib/wordpress'


function BlogCard({ post, index }: { post: WPPost; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface-card-el)',
        border: `1px solid rgba(255,255,255,0.07)`,
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${post.categoryColor}30` }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
    >
      {/* Feature image */}
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={index === 0}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
        }}/>
        {/* category badge over image */}
        <span
          className="absolute bottom-4 left-4 font-mono font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
          style={{
            fontSize: '0.8125rem',
            color: post.categoryColor,
            background: `${post.categoryColor}18`,
            border: `1px solid ${post.categoryColor}40`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {post.category}
        </span>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2
            className="font-display font-bold text-white leading-tight hover:opacity-80 transition-opacity"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', letterSpacing: '-0.02em' }}
          >
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p
          className="font-sans text-text-muted leading-relaxed"
          style={{
            fontSize: '0.87rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="font-mono uppercase tracking-[0.12em]"
              style={{
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '2px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-bold text-white"
              style={{
                background: `${post.categoryColor}20`,
                border: `1px solid ${post.categoryColor}30`,
                fontSize: '0.8125rem',
              }}
            >
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-sans text-white" style={{ fontSize: '0.8125rem' }}>{post.author}</p>
              <p className="font-mono text-text-muted" style={{ fontSize: '0.8125rem' }}>
                {post.dateLabel} · {post.readTime}
              </p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="font-mono font-bold uppercase tracking-[0.14em] flex items-center gap-1.5 transition-all duration-200"
            style={{
              fontSize: '0.8125rem',
              color: post.categoryColor,
            }}
          >
            Read Article
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export function BlogListing({ posts }: { posts: WPPost[] }) {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <SectionWrapper id="blog-hero" padding="lg" className="bg-background">
        {/* top accent line */}
        <div className="absolute inset-x-0 top-0 h-px" style={{
          background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.18) 35%, rgba(0,212,255,0.18) 65%, transparent)',
        }}/>
        {/* line grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 20%, transparent 100%)',
        }}/>
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}/>

        <Container>
          <div className="text-center max-w-2xl mx-auto">

            {/* Badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.22)',
              }}>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#00d4ff' }}
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                <span className="font-mono text-primary font-bold uppercase tracking-[0.24em]" style={{ fontSize: '0.8125rem' }}>
                  Zenadrone Blog
                </span>
              </div>
            </FadeIn>

            {/* Title */}
            <FadeIn delay={0.1}>
              <h1
                className="font-display font-bold text-white mb-4"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', letterSpacing: '-0.03em', lineHeight: 1.04 }}
              >
                Insights &amp; Industry
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #a78bfa 65%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Perspectives
                </span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.18}>
              <p
                className="font-sans text-text-muted leading-relaxed mb-8"
                style={{ fontSize: '1.125rem', maxWidth: 440, margin: '0 auto 2rem' }}
              >
                In-depth analysis on autonomous drone systems, AI-powered field operations, and the industries being transformed by ZenaDrone technology.
              </p>
            </FadeIn>

            {/* Category pills */}
            <FadeIn delay={0.26}>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                {[
                  { label: 'All Topics',   active: true,  color: '#00d4ff' },
                  { label: 'Agriculture',  active: false, color: '#34d399' },
                  { label: 'Defense',      active: false, color: '#ef4444' },
                  { label: 'Technology',   active: false, color: '#a78bfa' },
                  { label: 'AI & Sensors', active: false, color: '#fbbf24' },
                ].map(cat => (
                  <span
                    key={cat.label}
                    className="font-mono uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full cursor-default"
                    style={{
                      fontSize: '0.8125rem',
                      color:      cat.active ? cat.color : 'rgba(255,255,255,0.38)',
                      background: cat.active ? `${cat.color}12` : 'rgba(255,255,255,0.04)',
                      border:     `1px solid ${cat.active ? `${cat.color}35` : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {cat.label}
                  </span>
                ))}
              </div>
            </FadeIn>

          </div>
        </Container>
      </SectionWrapper>

      {/* ── Articles grid ──────────────────────────────────────── */}
      <SectionWrapper id="blog-articles" padding="sm" className="bg-background">
        <Container>
          <FadeIn className="mb-10">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.2), transparent)' }}/>
              <p className="font-mono font-bold uppercase tracking-[0.22em]" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
                Latest Articles
              </p>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(0,212,255,0.2), transparent)' }}/>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {/* bottom CTA nudge */}
          <FadeIn delay={0.2} className="mt-14 text-center">
            <p className="font-sans text-text-muted mb-4" style={{ fontSize: '0.85rem' }}>
              Want to stay updated on ZenaDrone developments?
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.18em] text-white rounded-xl px-6 py-3 transition-all duration-200 hover:opacity-90"
              style={{
                fontSize: '0.8125rem',
                background: 'linear-gradient(135deg, #00d4ff18, #a78bfa18)',
                border: '1px solid rgba(0,212,255,0.25)',
              }}
            >
              Contact Us
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </FadeIn>
        </Container>
      </SectionWrapper>
    </>
  )
}
