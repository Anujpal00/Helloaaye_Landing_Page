import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Pricing from '../components/sections/Pricing';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Header Layout */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>

      {/* Footer Layout */}
      <Footer />
    </div>
  );
};

export default LandingPage;
