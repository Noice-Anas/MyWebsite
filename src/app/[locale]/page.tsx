import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BentoGrid } from '@/components/layout/BentoGrid'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <BentoGrid>
          <Hero />
          <Projects />
          <Contact />
        </BentoGrid>
      </main>

      <Footer />
    </>
  )
}
