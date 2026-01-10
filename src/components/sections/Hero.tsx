'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import ScrollLottie from '@/components/ui/ScrollLottie';

interface HeroProps {
  lang: 'en' | 'tr';
}

export default function Hero({ lang }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const firstName = personalInfo.displayName.split(' ')[0].toLowerCase();
  const lastName = personalInfo.displayName.split(' ')[1].toLowerCase();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Flying bats Lottie - hero only */}
      <ScrollLottie
        src="/assets/flying-bats.json"
        className="absolute inset-0 w-full h-full z-0 scale-[2.5]"
        opacity={0.15}
        scrollStart={0}
        scrollEnd={0.5}
        animationOffset={0.25}
      />

      {/* Static background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blood/20 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-smoke-50/20 to-transparent" />

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-blood/20" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-blood/20" />

        {/* Subtle gradient orb */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-blood/5 blur-3xl" />
      </div>

      {/* Main content - single fade animation for whole container */}
      <motion.div
        className="container-custom relative z-10 text-center"
        style={{ opacity, y, willChange: 'transform, opacity' }}
      >
        {/* Pre-title label */}
        <div className="mb-6 hero-fade hero-fade-1">
          <span className="inline-flex items-center gap-3">
            <span className="w-10 h-px bg-blood" />
            <span className="text-xs text-bone-muted tracking-[0.3em] uppercase">
              {lang === 'en' ? 'Software Engineer' : 'Yazılım Mühendisi'}
            </span>
            <span className="w-10 h-px bg-blood" />
          </span>
        </div>

        {/* Main title with Bokor font */}
        <div className="relative mb-6">
          <h1
            className="hero-title-sm text-bone hero-fade hero-fade-2"
            style={{ fontFamily: "'Bokor', Georgia, serif" }}
          >
            {firstName}
          </h1>
          <h1
            className="hero-title-sm text-blood -mt-2 md:-mt-4 hero-fade hero-fade-3"
            style={{ fontFamily: "'Bokor', Georgia, serif" }}
          >
            {lastName}
          </h1>
        </div>

        {/* CTA Buttons - 3D press effect */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 hero-fade hero-fade-6">
          <button
            onClick={() => scrollToSection('projects')}
            className="btn-3d"
          >
            <span className="btn-3d-front">
              {lang === 'en' ? 'View Work' : 'Projeler'}
            </span>
            <span className="btn-3d-shadow" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="btn-3d"
          >
            <span className="btn-3d-front">
              {lang === 'en' ? 'Contact' : 'İletişim'}
            </span>
            <span className="btn-3d-shadow" />
          </button>
        </div>

      </motion.div>


      {/* Side decoration */}
      <div
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.4em] text-bone-muted/15"
        style={{ writingMode: 'vertical-rl' }}
      >
        PORTFOLIO / 2025
      </div>
    </section>
  );
}
