import { Header }        from '@/components/layout/Header'
import { Footer }        from '@/components/layout/Footer'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { WFHero }        from '@/components/sections/WFHero'
import { WFOverview }    from '@/components/sections/WFOverview'
import { WFBenefits }    from '@/components/sections/WFBenefits'
import { WFHowItWorks }  from '@/components/sections/WFHowItWorks'
import { WFWhoUses }     from '@/components/sections/WFWhoUses'
import { WFWhyChoose }   from '@/components/sections/WFWhyChoose'
import { WFFaq }         from '@/components/sections/WFFaq'
import { WFBookDemo }    from '@/components/sections/WFBookDemo'
import { getPageMeta }   from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/wildfires', {
    title: 'Wildfire Drone Solutions — Real-Time Fire Monitoring & Detection | ZenaDrone',
    description:
      'ZenaDrone wildfire solutions deliver real-time thermal imaging, AI fire prediction, and live aerial intelligence for faster detection, safer operations, and decisive incident command support.',
  })
}

export default function WildfiresPage() {
  return (
    <>
      <Header />
      <main>
        <WFHero />

        <SectionReveal>
          <WFOverview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <WFBenefits />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <WFHowItWorks />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <WFWhoUses />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <WFWhyChoose />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <WFFaq />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <WFBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
