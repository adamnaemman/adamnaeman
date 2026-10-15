import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutMeSection from '@/components/AboutMeSection';
import BackgroundSection from '@/components/BackgroundSection';
import KeyboardExperienceProjects from '@/components/KeyboardExperienceProjects';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <AboutMeSection />
      <BackgroundSection />
      <KeyboardExperienceProjects />
      <ContactSection />
      <Footer />
    </main>
  );
}

