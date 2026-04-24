import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { CityHero }      from '@/components/sections/CityHero'
import { CitySections }  from '@/components/sections/CitySections'
import { CityFaq }       from '@/components/sections/CityFaq'
import { CityBookDemo }  from '@/components/sections/CityBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/city-planning', {
    title: 'City Planning Drone Technology — Urban Planning Solutions | ZenaDrone',
    description:
      'ZenaDrone delivers precision urban planning solutions — from 3D city mapping and GIS data collection to multispectral environmental surveys and infrastructure inspection.',
  })
}

export default function CityPlanningPage() {
  return (
    <>
      <Header />
      <main>
        <CityHero />
        <SectionReveal>
          <CitySections />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <CityFaq />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <CityBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
