import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { BlogListing }       from '@/components/sections/BlogListing'
import { getPageMeta }       from '@/lib/cms-meta'
import { getAllPosts }        from '@/lib/wordpress'

export async function generateMetadata() {
  return getPageMeta('/blog', {
    title: 'Blog — Insights & Industry Perspectives | Zenadrone',
    description:
      'Expert analysis on drone technology, AI-powered operations, counter-UAS defense, and the industries ZenaDrone serves around the world.',
  })
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Header />
      <main>
        <BlogListing posts={posts} />
      </main>
      <Footer />
    </>
  )
}
