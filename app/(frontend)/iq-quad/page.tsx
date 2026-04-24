import { Header }           from '@/components/layout/Header'
import { Footer }           from '@/components/layout/Footer'
import { SectionReveal }    from '@/components/animations/SectionReveal'
import { IQQuadHero }       from '@/components/sections/IQQuadHero'
import { IQQuadOverview }   from '@/components/sections/IQQuadOverview'
import { IQQuadVideo }      from '@/components/sections/IQQuadVideo'
import { IQQuadFeatures }   from '@/components/sections/IQQuadFeatures'
import { IQQuadIndustries } from '@/components/sections/IQQuadIndustries'
import { IQQuadCTA }        from '@/components/sections/IQQuadCTA'
import { getPageMeta }      from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/iq-quad', {
    title: 'ZenaDrone IQ Quad — Survey-Grade VTOL Quadcopter | Zenadrone',
    description:
      'ZenaDrone IQ Quad is a reliable VTOL quadcopter for land surveying, construction, urban planning, and mining. 45-minute flight time, 5 km range, 3 kg payload, LiDAR + multispectral sensors, and real-time cellular data transfer.',
  })
}

export default function IQQuadPage() {
  return (
    <>
      <Header />
      <main>
        <IQQuadHero />

        <SectionReveal>
          <IQQuadOverview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQQuadVideo />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQQuadFeatures />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQQuadIndustries />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQQuadCTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
