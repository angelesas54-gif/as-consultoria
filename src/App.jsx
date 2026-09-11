import Header from './components/Header'
import Hero from './components/Hero'
import Problems from './components/Problems'
import VideoSection from './components/VideoSection'
import NotACourse from './components/NotACourse'
import HowWeWork from './components/HowWeWork'
import PlansIntro from './components/PlansIntro'
import Plans from './components/Plans'
import Testimonials from './components/Testimonials'
import About from './components/About'
import AgenteAdvance from './components/AgenteAdvance'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <a href="#inicio" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Problems />
        <VideoSection />
        <NotACourse />
        <HowWeWork />
        <PlansIntro />
        <Plans />
        <Testimonials />
        <About />
        <AgenteAdvance />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
