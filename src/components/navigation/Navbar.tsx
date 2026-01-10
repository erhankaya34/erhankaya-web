'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lottie from 'lottie-web';
import { navItems } from '@/lib/data';

interface NavbarProps {
  lang: 'en' | 'tr';
  onLangChange: (lang: 'en' | 'tr') => void;
}

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  // Skull Lottie animation
  useEffect(() => {
    if (!logoRef.current) return;

    const anim = lottie.loadAnimation({
      container: logoRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/assets/skull.json',
    });

    // Animasyonu yavaşlat (0.5 = yarı hız)
    anim.setSpeed(0.5);

    // Animasyon bitince 5 saniye bekle, sonra tekrar oynat
    anim.addEventListener('complete', () => {
      setTimeout(() => {
        anim.goToAndPlay(0, true);
      }, 5000);
    });

    return () => anim.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-void/95 backdrop-blur-md border-b border-smoke-50/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Skull Lottie */}
            <button
              onClick={() => scrollToSection('hero')}
              className="group"
            >
              <div
                ref={logoRef}
                className="w-20 h-20 md:w-24 md:h-24"
                aria-label="Home"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                    activeSection === item.id
                      ? 'text-blood'
                      : 'text-bone-muted hover:text-bone'
                  }`}
                >
                  {item.label[lang]}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-px bg-blood"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => onLangChange(lang === 'en' ? 'tr' : 'en')}
                className="px-3 py-1.5 text-[10px] tracking-wider uppercase border border-smoke-50 text-bone-muted hover:border-blood hover:text-blood transition-colors"
              >
                {lang === 'en' ? 'TR' : 'EN'}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-bone-muted hover:text-blood transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-void/95 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-smoke border-l border-smoke-50/20 p-6 pt-20"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 text-sm tracking-wider uppercase border-l-2 transition-colors ${
                      activeSection === item.id
                        ? 'border-blood text-blood bg-blood/5'
                        : 'border-transparent text-bone-muted hover:text-bone'
                    }`}
                  >
                    {item.label[lang]}
                  </button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
