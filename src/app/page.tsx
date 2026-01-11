'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import ScrollLottie from '@/components/ui/ScrollLottie';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'tr'>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for stored language preference or browser language
  useEffect(() => {
    const stored = localStorage.getItem('lang') as 'en' | 'tr' | null;
    if (stored) {
      setLang(stored);
    } else {
      const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
      setLang(browserLang);
    }
    setIsLoaded(true);
  }, []);

  const handleLangChange = (newLang: 'en' | 'tr') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Simple loading state
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-void flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blood/30 border-t-blood rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fixed full-screen Lottie background */}
      <ScrollLottie
        src="/assets/hero-animation.json"
        className="fixed inset-0 w-screen h-screen z-0 scale-[2]"
        opacity={0.1}
        reverseStartMode={false}
      />

      {/* Halloween bats - completes at 20% scroll */}
      <ScrollLottie
        src="/assets/flying-bats.json"
        className="fixed inset-0 w-screen h-screen z-[1]"
        opacity={0.15}
        scrollStart={0}
        scrollEnd={0.2}
        animationOffset={0.25}
      />

      {/* High quality grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Navigation */}
      <Navbar lang={lang} onLangChange={handleLangChange} />

      {/* Main content */}
      <div className="relative">
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </div>
    </main>
  );
}
