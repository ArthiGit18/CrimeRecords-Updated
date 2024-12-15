import React, { useState, useEffect } from 'react';
import Navbar from '../pages/Navbar';
import Hero from '../pages/Hero';
import About from '../pages/About';
import ForensicFacts from '../pages/Forensic';
import TestimonialBook from '../pages/Testimonial';
import Cards from '../pages/Stories';
import BedtimeStorySection from '../pages/Audio';
import TopPicks from '../pages/Toppicks';
import PuzzleGameSection from '../pages/Puzzle';
import Footer from '../pages/Footer';
import ContactSection from '../pages/Contact';

const Main = () => {
  const [isNavbarBlack, setIsNavbarBlack] = useState(false);

  // Effect to change navbar background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavbarBlack(true); // Set navbar background to black after scrolling
      } else {
        setIsNavbarBlack(false); // Keep navbar transparent before scrolling
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <div>
    <Navbar isBlack={isNavbarBlack} onLinkClick={scrollToSection} />
    <Hero />
    <div id="about-section">
      <About />
    </div>
    <TopPicks />
    <div id="forensicfacts">
      <ForensicFacts />
    </div>
    <TestimonialBook />
    <Cards />
    <BedtimeStorySection />
    <PuzzleGameSection />
    <div id="contact">
      <ContactSection />
    </div>
    <Footer />
  </div>
  )
}

export default Main