import { Header }               from '@/components/layout/Header'
import { Footer }               from '@/components/layout/Footer'
import { SectionReveal }        from '@/components/animations/SectionReveal'
import { FeaturesHero }         from '@/components/sections/FeaturesHero'
import { FeaturesHighlights }   from '@/components/sections/FeaturesHighlights'
import { FeaturesSpecs }        from '@/components/sections/FeaturesSpecs'
import { FeaturesCapabilities } from '@/components/sections/FeaturesCapabilities'
import { FeaturesCTA }          from '@/components/sections/FeaturesCTA'
import { getPageMeta }          from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/features', {
    title: 'ZenaDrone Features — Smart Drone Technology for Industry | Zenadrone',
    description:
      'Discover ZenaDrone 1000 features: 8-rotor octa-quad system, VTOL, AI navigation, 4K camera, multispectral sensors, and 20+ industry applications.',
  })
}

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main>
        <FeaturesHero />
        <SectionReveal>
          <FeaturesHighlights />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <FeaturesSpecs />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <FeaturesCapabilities />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <FeaturesCTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
