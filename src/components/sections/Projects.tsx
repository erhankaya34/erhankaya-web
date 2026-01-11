'use client';

import { useRef, useEffect, useState } from 'react';
import { projects } from '@/lib/data';

interface ProjectsProps {
  lang: 'en' | 'tr';
}

export default function Projects({ lang }: ProjectsProps) {
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
      id="projects"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blood/3 blur-[120px]" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className={`mb-12 md:mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            <span
              className="text-[60px] md:text-[120px] leading-none text-blood select-none"
              style={{ fontFamily: "'Bokor', Georgia, serif" }}
            >
              02
            </span>
            <div>
              <p className="text-xs text-blood tracking-[0.3em] uppercase mb-2">
                {lang === 'en' ? 'Work' : 'Projeler'}
              </p>
              <h2 className="section-title">
                {lang === 'en' ? 'Featured projects' : 'Öne çıkan projeler'}
              </h2>
            </div>
          </div>
          <div className="w-24 h-px bg-blood" />
        </div>

        {/* Projects list */}
        <div className={`space-y-1 section-fade section-fade-delay-1 ${isVisible ? 'visible' : ''}`}>
          {projects.filter(p => p.featured).map((project, index) => (
            <article key={project.id} className="group">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-8 border-t border-smoke-50/30 hover:bg-blood/5 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left side */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-xs text-bone-muted/30 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl text-bone group-hover:text-blood transition-colors lowercase">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-bone-muted/60 text-sm ml-8">
                      {project.description[lang]}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-6 ml-8 lg:ml-0">
                    <div className="text-right">
                      <p className="text-xs text-blood tracking-wider uppercase mb-1">
                        {project.role[lang]}
                      </p>
                      <div className="flex gap-2 justify-end">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] text-bone-muted/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="w-10 h-10 border border-smoke-50 flex items-center justify-center group-hover:border-blood group-hover:bg-blood transition-colors">
                      <svg
                        className="w-4 h-4 text-bone-muted group-hover:text-bone transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-smoke-50/30 mt-1" />
      </div>
    </section>
  );
}
