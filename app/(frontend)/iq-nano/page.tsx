import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { SectionReveal }     from '@/components/animations/SectionReveal'
import { IQNanoHero }        from '@/components/sections/IQNanoHero'
import { IQNanoOverview }    from '@/components/sections/IQNanoOverview'
import { IQNanoFeatures }    from '@/components/sections/IQNanoFeatures'
import { IQNanoApplications } from '@/components/sections/IQNanoApplications'
import { IQNanoDataStation } from '@/components/sections/IQNanoDataStation'
import { IQNanoCTA }         from '@/components/sections/IQNanoCTA'
import { getPageMeta }       from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/iq-nano', {
    title: 'ZenaDrone IQ Nano — Indoor Scanning Drone | Zenadrone',
    description:
      'ZenaDrone IQ Nano is an advanced indoor scanning UAV for warehouses, distribution centers, and plants. Features GPS-free navigation, QR/barcode scanning, automated docking, AWS S3 cloud storage, and SAP API integration.',
  })
}

export default function IQNanoPage() {
  return (
    <>
      <Header />
      <main>
        <IQNanoHero />

        <SectionReveal>
          <IQNanoOverview />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQNanoFeatures />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQNanoApplications />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQNanoDataStation />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <IQNanoCTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
