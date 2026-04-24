// ─── WordPress Headless CMS – GraphQL Data Layer ──────────────────────────────
// All WordPress data fetching goes through this file.
// Uses Next.js ISR (revalidate) so pages are cached and rebuilt automatically.

// ─── Category color map ────────────────────────────────────────────────────────
// Maps WordPress category slugs to the accent colors used in the UI.
// Add more slugs here as you create new categories in WordPress.
const CATEGORY_COLORS: Record<string, string> = {
  agriculture:       '#34d399',
  defense:           '#ef4444',
  technology:        '#a78bfa',
  'ai-sensors':      '#fbbf24',
  'ai':              '#fbbf24',
  security:          '#ef4444',
  industrial:        '#00d4ff',
  uncategorized:     '#00d4ff',
}

const DEFAULT_COLOR = '#00d4ff'

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface WPPost {
  slug:          string
  title:         string
  excerpt:       string   // HTML – safe to use with dangerouslySetInnerHTML
  body:          string   // raw HTML – the full post content
  category:      string
  categorySlug:  string
  categoryColor: string
  image:         string
  imageAlt:      string
  author:        string
  authorRole:    string
  date:          string   // ISO string for sorting
  dateLabel:     string   // Human-readable (e.g. "April 24, 2026")
  readTime:      string
  tags:          string[]
}

// ─── Core fetch helper ─────────────────────────────────────────────────────────
async function fetchWPAPI<T = any>(
  query: string,
  { variables }: { variables?: Record<string, any> } = {}
): Promise<T> {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  if (!WP_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is missing in environment variables')
  }

  const res = await fetch(WP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },   // ISR — rebuild every 60 seconds
  })

  const json = await res.json()
  if (json.errors) {
    console.error('[WP GraphQL] Errors:', JSON.stringify(json.errors, null, 2))
    throw new Error('Failed to fetch from WordPress API')
  }
  return json.data as T
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function estimateReadTime(html: string): string {
  const words = stripHTML(html).split(/\s+/).filter(Boolean).length
  const mins  = Math.max(1, Math.ceil(words / 230))
  return `${mins} min read`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// ─── Map a raw WP GraphQL node into our WPPost shape ───────────────────────────
function mapPost(node: any): WPPost {
  const cat      = node.categories?.nodes?.[0]
  const catSlug  = cat?.slug ?? 'uncategorized'
  const catName  = cat?.name ?? 'General'
  const catColor = CATEGORY_COLORS[catSlug] ?? DEFAULT_COLOR

  const featImg  = node.featuredImage?.node
  const tags     = (node.tags?.nodes ?? []).map((t: any) => t.name)

  return {
    slug:          node.slug,
    title:         node.title,
    excerpt:       stripHTML(node.excerpt ?? ''),
    body:          node.content ?? '',
    category:      catName,
    categorySlug:  catSlug,
    categoryColor: catColor,
    image:         featImg?.sourceUrl ?? '/images/drone-showcase.png',
    imageAlt:      featImg?.altText  ?? node.title,
    author:        node.author?.node?.name ?? 'ZenaDrone Editorial',
    authorRole:    'Zenadrone Technologies',
    date:          node.date,
    dateLabel:     formatDate(node.date),
    readTime:      estimateReadTime(node.content ?? ''),
    tags,
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

/** Fetch all published posts, newest first */
export async function getAllPosts(): Promise<WPPost[]> {
  const data = await fetchWPAPI<{
    posts: { nodes: any[] }
  }>(`
    query AllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          date
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
  `)

  return (data.posts?.nodes ?? []).map(mapPost)
}

/** Fetch a single post by its slug */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchWPAPI<{
    post: any | null
  }>(`
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        slug
        title
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  `, { variables: { slug } })

  if (!data.post) return null
  return mapPost(data.post)
}

/** Get just the slugs — used for generateStaticParams */
export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchWPAPI<{
    posts: { nodes: { slug: string }[] }
  }>(`
    query AllSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `)

  return (data.posts?.nodes ?? []).map(n => n.slug)
}

/** Fetch all categories */
export async function getAllCategories(): Promise<{ name: string; slug: string; color: string }[]> {
  const data = await fetchWPAPI<{
    categories: { nodes: { name: string; slug: string }[] }
  }>(`
    query AllCategories {
      categories {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return (data.categories?.nodes ?? []).map(cat => ({
    name:  cat.name,
    slug:  cat.slug,
    color: CATEGORY_COLORS[cat.slug] ?? DEFAULT_COLOR,
  }))
}
