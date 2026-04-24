import type { Metadata } from 'next'

export async function getPageMeta(
  slug: string,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  // TODO: Connect to WordPress GraphQL for SEO Meta (e.g. WPGraphQL Yoast SEO)
  return {
    title: { absolute: fallback.title },
    description: fallback.description,
  }
}
