import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import PopularSkills from '../components/PopularSkills';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import SDGSection from '../components/SDGSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <HowItWorks />
        <PopularSkills />
        <WhyChooseUs />
        <Testimonials />
        <SDGSection />
        <CallToAction />
      </main>
      <Footer />
    </motion.div>
  );
}
