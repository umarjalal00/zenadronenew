import { Header }         from '@/components/layout/Header'
import { Footer }         from '@/components/layout/Footer'
import { SectionReveal }  from '@/components/animations/SectionReveal'
import { SSHero }         from '@/components/sections/SSHero'
import { SSWhat }         from '@/components/sections/SSWhat'
import { SSHowItWorks }   from '@/components/sections/SSHowItWorks'
import { SSBenefits }     from '@/components/sections/SSBenefits'
import { SSApplications } from '@/components/sections/SSApplications'
import { SSFaq }          from '@/components/sections/SSFaq'
import { SSBookDemo }     from '@/components/sections/SSBookDemo'
import { getPageMeta }    from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/security-surveillance', {
    title: 'Security & Surveillance Drones — Aerial Monitoring Solutions | ZenaDrone',
    description:
      'ZenaDrone security and surveillance drones deliver powerful aerial monitoring with live cameras, thermal sensors, and AI detection — protecting assets and supporting law enforcement around the clock.',
  })
}

export default function SecuritySurveillancePage() {
  return (
    <>
      <Header />
      <main>
        <SSHero />

        <SectionReveal>
          <SSWhat />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SSHowItWorks />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SSBenefits />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SSApplications />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SSFaq />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <SSBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
