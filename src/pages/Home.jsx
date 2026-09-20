import Navbar from '@/components/shared/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/shared/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090909] text-[#F5F5F5]">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  )
}
