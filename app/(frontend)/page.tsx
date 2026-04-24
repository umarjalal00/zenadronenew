import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { DroneShowcase } from '@/components/sections/DroneShowcase'
import { SectionReveal } from '@/components/animations/SectionReveal'
import { VideoShowcase } from '@/components/sections/VideoShowcase'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Industries } from '@/components/sections/Industries'
import { ZenaDroneFeatures } from '@/components/sections/ZenaDroneFeatures'
import { BookDemo } from '@/components/sections/BookDemo'
import { getPageMeta } from '@/lib/cms-meta'

export async function generateMetadata() {
  return getPageMeta('/', {
    title: 'Zenadrone — Next-Generation Drone Technology',
    description:
      'Autonomous drone systems engineered for enterprise, defense, and industrial missions. Explore the Zenadrone fleet.',
  })
}

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <SectionReveal>
          <DroneShowcase />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <VideoShowcase />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <HowItWorks />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <Industries />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <ZenaDroneFeatures />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <BookDemo />
        </SectionReveal>


      </main>

      <Footer />
    </>
  )
}
