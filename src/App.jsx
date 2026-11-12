import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import InteriorThemeExplorer from './components/InteriorThemeExplorer';
import ProcessSection from './components/ProcessSection';
import ProjectsSection from './components/ProjectsSection';
import LocationsSection from './components/LocationsSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ConsultationForm from './components/ConsultationForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  const scrollToConsultation = (city = '', theme = '') => {
    if (city) {
      setSelectedCity(city);
    }
    if (theme) {
      setSelectedTheme(theme);
    }
    const target = document.querySelector('#consultation');
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const target = document.querySelector('#projects');
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-champagne selection:text-charcoal-dark antialiased">
      {/* Navbar */}
      <Navbar onBookClick={() => scrollToConsultation()} />

      {/* Main Content */}
      <main>
        {/* 1. Hero Section with Cinematic Transformation */}
        <HeroSection
          onBookClick={() => scrollToConsultation()}
          onExploreProjects={scrollToProjects}
        />

        {/* 2. What We Do - Services */}
        <ServicesSection onBookClick={() => scrollToConsultation()} />

        {/* 3. Interactive Theme Explorer */}
        <InteriorThemeExplorer onBookClick={(theme) => scrollToConsultation('', theme)} />

        {/* 4. How A Project Works */}
        <ProcessSection />

        {/* 5. Our Projects - Portfolio */}
        <ProjectsSection onBookClick={() => scrollToConsultation()} />

        {/* 6. Where We Work - Locations */}
        <LocationsSection onCitySelect={(city) => scrollToConsultation(city)} />

        {/* 7. What Clients Say - Testimonials */}
        <TestimonialsSection onBookClick={() => scrollToConsultation()} />

        {/* 8. About Trinity */}
        <AboutSection onBookClick={() => scrollToConsultation()} />

        {/* 9. Questions People Ask - FAQ */}
        <FAQSection onBookClick={() => scrollToConsultation()} />

        {/* 10. Lead Generation - Consultation Form */}
        <ConsultationForm prefilledCity={selectedCity} prefilledTheme={selectedTheme} />

        {/* 11. Final Closing CTA */}
        <FinalCTA onBookClick={() => scrollToConsultation()} />
      </main>

      {/* Footer */}
      <Footer
        onCitySelect={(city) => scrollToConsultation(city)}
        onBookClick={() => scrollToConsultation()}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

