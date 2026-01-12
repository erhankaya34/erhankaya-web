'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';

interface AboutProps {
  lang: 'en' | 'tr';
}

export default function About({ lang }: AboutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blood/3 to-transparent" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className={`mb-12 md:mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            <span
              className="text-[60px] md:text-[120px] leading-none text-blood select-none"
              style={{ fontFamily: "'Bokor', Georgia, serif" }}
            >
              01
            </span>
            <div>
              <p className="text-xs text-blood tracking-[0.3em] uppercase mb-2">
                {lang === 'en' ? 'About' : 'Hakkımda'}
              </p>
              <h2 className="section-title">
                {lang === 'en' ? 'Building bridges' : 'Köprüler kuruyorum'}
              </h2>
            </div>
          </div>
          <div className="w-24 h-px bg-blood" />
        </div>

        {/* Two column layout: Content left, Photo right */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 section-fade section-fade-delay-1 ${isVisible ? 'visible' : ''}`}>
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            {/* Current status badge */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-smoke-50 bg-void">
                <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
                <span className="text-sm text-bone-muted">
                  {personalInfo.currentRole[lang]}
                </span>
              </div>
            </div>

            {/* Bio text */}
            <p className="text-base md:text-lg text-bone-muted leading-relaxed mb-8">
              {personalInfo.bio[lang]}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {personalInfo.highlights[lang].map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 border border-smoke-50/50 hover:border-blood/30 transition-colors"
                >
                  <span className="w-1.5 h-1.5 mt-2 bg-blood flex-shrink-0" />
                  <span className="text-bone/70 text-sm">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Square photo */}
          <div className="flex flex-col items-end mt-12">
            <div className="relative aspect-square max-w-sm w-full">
              {/* Gothic frame outer border */}
              <div className="absolute inset-0 border-2 border-blood/40" />
              <div className="absolute inset-2 border border-smoke-50" />

              {/* Gothic corner ornaments */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-blood" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-blood" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-blood" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-blood" />

              {/* Diamond accents on edges */}
              <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-blood rotate-45 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-blood rotate-45 -translate-y-1/2" />
              <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-blood rotate-45 -translate-x-1/2" />
              <div className="absolute -bottom-1.5 left-1/2 w-3 h-3 bg-blood rotate-45 -translate-x-1/2" />

              {/* Profile photo */}
              <div className="absolute inset-3 overflow-hidden">
                <Image
                  src="/assets/profile-optimized.jpg"
                  alt="Erhan Kaya"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>

              {/* Inner shadow overlay */}
              <div className="absolute inset-3 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none" />
            </div>
            {/* Artist credit */}
            <p className="text-xs text-bone-muted/60 mt-2">
              {lang === 'en' ? 'Drawn with love by ' : 'Aşkla çizildi, '}
              <a
                href="https://pelinakin.art"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blood font-semibold hover:underline"
              >
                Pelin Akın
              </a>
              {lang === 'tr' && ' tarafından'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
