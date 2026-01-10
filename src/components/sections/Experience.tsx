'use client';

import { useRef, useEffect, useState } from 'react';
import { experiences } from '@/lib/data';

interface ExperienceProps {
  lang: 'en' | 'tr';
}

const typeLabels = {
  work: { en: 'Work', tr: 'İş' },
  community: { en: 'Community', tr: 'Topluluk' },
  education: { en: 'Education', tr: 'Eğitim' },
};

export default function Experience({ lang }: ExperienceProps) {
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

  const currentExperiences = experiences.filter(exp => exp.current);
  const pastExperiences = experiences.filter(exp => !exp.current);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gilt/3 to-transparent" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className={`mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-6 mb-4">
            <span
              className="text-[80px] md:text-[120px] leading-none text-blood select-none"
              style={{ fontFamily: "'Bokor', Georgia, serif" }}
            >
              03
            </span>
            <div>
              <p className="text-xs text-blood tracking-[0.3em] uppercase mb-2">
                {lang === 'en' ? 'Experience' : 'Deneyim'}
              </p>
              <h2 className="section-title">
                {lang === 'en' ? 'Career & Community' : 'Kariyer & Topluluk'}
              </h2>
            </div>
          </div>
          <div className="w-24 h-px bg-blood" />
        </div>

        {/* Current positions */}
        {currentExperiences.length > 0 && (
          <div className={`mb-12 section-fade section-fade-delay-1 ${isVisible ? 'visible' : ''}`}>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
              <h3 className="text-sm text-bone tracking-[0.2em] uppercase">
                {lang === 'en' ? 'Current' : 'Güncel'}
              </h3>
              <div className="flex-1 h-px bg-smoke-50/20 ml-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {currentExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 border border-smoke-50 bg-smoke/20 hover:border-blood/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-display text-xl text-bone group-hover:text-blood transition-colors">
                        {exp.company}
                      </h4>
                      <p className="text-sm text-blood mt-1">
                        {exp.role[lang]}
                      </p>
                    </div>
                    <span className="text-[10px] tracking-wider uppercase px-2 py-1 border border-smoke-50 text-bone-muted/60">
                      {typeLabels[exp.type][lang]}
                    </span>
                  </div>

                  <p className="text-bone-muted/60 text-sm mb-4 leading-relaxed">
                    {exp.description[lang]}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-bone-muted/40">
                    <span>{exp.period.start} — {lang === 'en' ? 'Present' : 'Devam'}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-smoke-50/30">
                      {exp.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-[10px] text-bone-muted/50 px-2 py-1 border border-smoke-50/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past positions */}
        <div className={`section-fade section-fade-delay-2 ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 border border-bone-muted/30" />
            <h3 className="text-sm text-bone-muted tracking-[0.2em] uppercase">
              {lang === 'en' ? 'Previous' : 'Geçmiş'}
            </h3>
            <div className="flex-1 h-px bg-smoke-50/20 ml-4" />
          </div>

          <div className="space-y-1">
            {pastExperiences.map((exp) => (
              <div
                key={exp.id}
                className="py-6 border-t border-smoke-50/30 hover:bg-blood/3 transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-bone-muted/30 font-mono min-w-[90px]">
                      {exp.period.start} — {exp.period.end}
                    </span>
                    <div>
                      <h4 className="font-display text-lg text-bone group-hover:text-blood transition-colors">
                        {exp.company}
                      </h4>
                      <p className="text-sm text-bone-muted">
                        {exp.role[lang]}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-bone-muted/50 max-w-sm md:text-right">
                    {exp.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-smoke-50/30 mt-1" />
        </div>
      </div>
    </section>
  );
}
