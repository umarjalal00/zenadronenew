import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { PLIHero }       from '@/components/sections/PLIHero'
import { PLIOverview }   from '@/components/sections/PLIOverview'
import { PLIBenefits }   from '@/components/sections/PLIBenefits'
import { PLIHowItWorks } from '@/components/sections/PLIHowItWorks'
import { PLIWhoUses }    from '@/components/sections/PLIWhoUses'
import { PLIWhyChoose }  from '@/components/sections/PLIWhyChoose'
import { PLIFaq }        from '@/components/sections/PLIFaq'
import { PLIBookDemo }   from '@/components/sections/PLIBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/power-line-inspection', {
    title: 'Powerline Inspection Drones — Aerial Power Line Inspection | ZenaDrone',
    description:
      'ZenaDrone powerline inspection drones deliver safer, faster, and more cost-effective aerial power line inspection using thermal cameras, LiDAR, and AI-driven fault detection — keeping your infrastructure running reliably.',
  })
}

export default function PowerLineInspectionPage() {
  return (
    <>
      <Header />
      <main>
        <PLIHero />

        <SectionReveal>
          <PLIOverview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <PLIBenefits />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <PLIHowItWorks />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <PLIWhoUses />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <PLIWhyChoose />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <PLIFaq />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <PLIBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
