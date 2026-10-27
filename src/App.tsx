import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { RoleDetails } from './components/RoleDetails.tsx';
import { ApplicationForm } from './components/ApplicationForm.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const scrollToForm = () => {
    const el = document.getElementById('apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus on first input if possible
      const input = el.querySelector<HTMLInputElement>('#full-name');
      if (input) {
        setTimeout(() => input.focus(), 400);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onApplyClick={scrollToForm} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onApplyClick={scrollToForm} />
        <RoleDetails />
        <ApplicationForm />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
