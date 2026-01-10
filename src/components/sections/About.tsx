'use client';

import { useRef, useEffect, useState } from 'react';
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
        <div className={`mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-6 mb-4">
            <span
              className="text-[80px] md:text-[120px] leading-none text-blood select-none"
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

        {/* Two column layout: Photo left, Content right */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 section-fade section-fade-delay-1 ${isVisible ? 'visible' : ''}`}>
          {/* Left: Square photo placeholder */}
          <div>
            <div className="relative aspect-square max-w-md border border-smoke-50 bg-smoke/30 overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blood" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blood" />

              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-[60px] md:text-[80px] leading-none text-smoke-50/20 select-none"
                    style={{ fontFamily: "'Bokor', Georgia, serif" }}
                  >
                    EK
                  </div>
                  <p className="text-xs text-bone-muted/30 tracking-wider uppercase mt-2">
                    {lang === 'en' ? 'Your photo here' : 'Fotoğrafınız burada'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
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
        </div>
      </div>
    </section>
  );
}
