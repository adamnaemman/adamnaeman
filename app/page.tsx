import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutMeSection from '@/components/AboutMeSection';
import BackgroundSection from '@/components/BackgroundSection';
import KeyboardExperienceProjects from '@/components/KeyboardExperienceProjects';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Adam Naeman',
  url: 'https://adamnaeman.vercel.app',
  jobTitle: 'Full stack developer',
  description:
    'Final-year computer science student building web apps, machine learning models and 3D work.',
  knowsAbout: [
    'Next.js',
    'TypeScript',
    'React',
    'Python',
    'PyTorch',
    'Blender',
    'Godot',
    'ESP32',
  ],
  sameAs: [
    'https://github.com/adamnaemman',
    'https://www.linkedin.com/in/adam-naeman/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MY',
  },
};

export default function Home() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
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


