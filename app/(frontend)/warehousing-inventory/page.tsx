import { Header }           from '@/components/layout/Header'
import { Footer }           from '@/components/layout/Footer'
import { SectionReveal }    from '@/components/animations/SectionReveal'
import { WarehouseHero }    from '@/components/sections/WarehouseHero'
import { WarehouseSections } from '@/components/sections/WarehouseSections'
import { WarehouseFaq }     from '@/components/sections/WarehouseFaq'
import { WarehouseBookDemo } from '@/components/sections/WarehouseBookDemo'
import { getPageMeta }      from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/warehousing-inventory', {
    title: 'Warehousing & Inventory Drone Technology — Automate, Track, Optimize | ZenaDrone',
    description:
      'ZenaDrone 1000 automates warehouse inventory management with RFID barcode scanning, real-time stock tracking, and autonomous cycle counting — eliminating manual errors and reducing costs.',
  })
}

export default function WarehousingInventoryPage() {
  return (
    <>
      <Header />
      <main>
        <WarehouseHero />
        <SectionReveal>
          <WarehouseSections />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <WarehouseFaq />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <WarehouseBookDemo />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
