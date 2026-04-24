import type { Metadata }                       from 'next'
import { notFound }                             from 'next/navigation'
import Image                                    from 'next/image'
import Link                                     from 'next/link'
import { Header }                               from '@/components/layout/Header'
import { Footer }                               from '@/components/layout/Footer'
import { Container }                            from '@/components/ui/Container'
import { getPostBySlug, getAllPostSlugs }        from '@/lib/wordpress'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title:       `${post.title} | Zenadrone Blog`,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      images:      [{ url: post.image }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-body p {
          color: rgba(200,210,220,0.82);
          font-size: 1.125rem;
          line-height: 1.85;
          margin-bottom: 1.4rem;
          font-family: var(--font-inter, sans-serif);
        }
        .blog-body h2 {
          color: #ffffff;
          font-size: clamp(1.3rem, 2.2vw, 1.6rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin-top: 2.8rem;
          margin-bottom: 1rem;
          font-family: var(--font-space-grotesk, sans-serif);
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .blog-body ul {
          margin: 1rem 0 1.6rem 0;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .blog-body li {
          color: rgba(200,210,220,0.82);
          font-size: 1.125rem;
          line-height: 1.75;
          padding-left: 1.4rem;
          position: relative;
          font-family: var(--font-inter, sans-serif);
        }
        .blog-body li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${post.categoryColor};
          box-shadow: 0 0 6px ${post.categoryColor};
        }
        .blog-body strong {
          color: #ffffff;
          font-weight: 600;
        }
        .blog-body p:first-child {
          font-size: 1.2rem;
          color: rgba(220,230,240,0.9);
          line-height: 1.8;
        }
        .blog-body img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2rem 0;
        }
        .blog-body blockquote {
          border-left: 3px solid ${post.categoryColor};
          padding-left: 1.2rem;
          margin: 2rem 0;
          color: rgba(220,230,240,0.85);
          font-style: italic;
        }
        .blog-body h3 {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.8rem;
          font-family: var(--font-space-grotesk, sans-serif);
        }
      ` }} />

      <Header />

      <main>
        {/* ── Feature image hero ─────────────────────────────── */}
        <div className="relative w-full" style={{ height: 'clamp(340px, 48vh, 580px)' }}>
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* gradient overlays */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.7) 100%)',
          }}/>
          {/* top blur for nav clearance */}
          <div className="absolute inset-x-0 top-0 h-24" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          }}/>

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-10">
              <span
                className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.18em] mb-4 px-3 py-1.5 rounded-full"
                style={{
                  fontSize: '0.55rem',
                  color: post.categoryColor,
                  background: `${post.categoryColor}20`,
                  border: `1px solid ${post.categoryColor}45`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: post.categoryColor, boxShadow: `0 0 6px ${post.categoryColor}` }}/>
                {post.category}
              </span>
              <h1
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: '780px' }}
              >
                {post.title}
              </h1>
            </Container>
          </div>
        </div>

        {/* ── Article body ────────────────────────────────────── */}
        <div className="bg-background" style={{ borderTop: `3px solid ${post.categoryColor}` }}>
          <Container size="sm" className="py-14">

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-white flex-shrink-0"
                  style={{
                    background: `${post.categoryColor}20`,
                    border: `1px solid ${post.categoryColor}35`,
                    fontSize: '0.7rem',
                  }}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-semibold text-white" style={{ fontSize: '0.82rem' }}>{post.author}</p>
                  <p className="font-mono text-text-muted" style={{ fontSize: '0.6rem' }}>{post.authorRole}</p>
                </div>
              </div>

              <div className="h-4 w-px" style={{ background: 'rgba(255,255,255,0.12)' }}/>

              <div className="flex items-center gap-1.5 font-mono text-text-muted" style={{ fontSize: '0.65rem' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                  <path d="M1 5h10" stroke="currentColor" strokeWidth="1"/>
                  <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                {post.dateLabel}
              </div>

              <div className="flex items-center gap-1.5 font-mono text-text-muted" style={{ fontSize: '0.65rem' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                  <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                {post.readTime}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono uppercase tracking-[0.1em]"
                      style={{
                        fontSize: '0.5rem',
                        color: 'rgba(255,255,255,0.38)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: '4px',
                        padding: '2px 8px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Article content */}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {/* Bottom nav */}
            <div className="mt-14 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-text-muted hover:text-white transition-colors duration-200"
                style={{ fontSize: '0.6rem' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Blog
              </Link>

              <Link
                href="/features"
                className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.14em] rounded-xl px-5 py-2.5 transition-all duration-200 hover:opacity-90"
                style={{
                  fontSize: '0.58rem',
                  color: post.categoryColor,
                  background: `${post.categoryColor}12`,
                  border: `1px solid ${post.categoryColor}30`,
                }}
              >
                Explore ZenaDrone
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </Container>
        </div>
      </main>

      <Footer />
    </>
  )
}
