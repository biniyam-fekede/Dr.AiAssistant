import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Story from './components/Story';
import Features from './components/Features';
import Impact from './components/Impact';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Story />
      <Features />
      <Impact />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;