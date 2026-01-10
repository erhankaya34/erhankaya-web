'use client';

import { useState, useRef, useEffect } from 'react';
import { personalInfo, socialLinks } from '@/lib/data';

interface ContactProps {
  lang: 'en' | 'tr';
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact({ lang }: ContactProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xpwzgwjr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleInputChange = (
    field: 'name' | 'email' | 'message',
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const socialIcons: Record<string, React.ReactNode> = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blood/3 to-transparent" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <div className={`mb-16 section-fade ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center gap-6 mb-4">
            <span
              className="text-[80px] md:text-[120px] leading-none text-blood select-none"
              style={{ fontFamily: "'Bokor', Georgia, serif" }}
            >
              04
            </span>
            <div>
              <p className="text-xs text-blood tracking-[0.3em] uppercase mb-2">
                {lang === 'en' ? 'Contact' : 'İletişim'}
              </p>
              <h2 className="section-title">
                {lang === 'en' ? "Let's Connect" : 'İletişime Geçelim'}
              </h2>
            </div>
          </div>
          <div className="w-24 h-px bg-blood" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className={`section-fade section-fade-delay-1 ${isVisible ? 'visible' : ''}`}>
            {status === 'success' ? (
              <div className="p-8 border border-blood/30 bg-blood/5 text-center">
                <div className="w-12 h-12 mx-auto mb-4 border border-blood flex items-center justify-center">
                  <svg className="w-6 h-6 text-blood" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-display text-blood mb-2">
                  {lang === 'en' ? 'Message Sent' : 'Mesaj Gönderildi'}
                </h3>
                <p className="text-bone-muted text-sm mb-6">
                  {lang === 'en'
                    ? "Thanks for reaching out. I'll get back to you soon."
                    : 'Ulaştığınız için teşekkürler. En kısa sürede döneceğim.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-blood hover:underline"
                >
                  {lang === 'en' ? 'Send Another' : 'Başka Mesaj Gönder'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-bone-muted tracking-wider uppercase mb-2">
                    {lang === 'en' ? 'Name' : 'İsim'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder={lang === 'en' ? 'Your name' : 'Adınız'}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-bone-muted tracking-wider uppercase mb-2">
                    {lang === 'en' ? 'Email' : 'E-posta'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                    placeholder={lang === 'en' ? 'your@email.com' : 'eposta@adresiniz.com'}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-bone-muted tracking-wider uppercase mb-2">
                    {lang === 'en' ? 'Message' : 'Mesaj'}
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="input-field min-h-[140px] resize-none"
                    placeholder={lang === 'en' ? 'Your message...' : 'Mesajınız...'}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-blood text-sm">
                    {lang === 'en'
                      ? 'Something went wrong. Please try again.'
                      : 'Bir şeyler ters gitti. Lütfen tekrar deneyin.'}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-3d w-full"
                  disabled={status === 'submitting'}
                >
                  <span className="btn-3d-front w-full justify-center">
                    {status === 'submitting'
                      ? (lang === 'en' ? 'Sending...' : 'Gönderiliyor...')
                      : (lang === 'en' ? 'Send Message' : 'Mesaj Gönder')}
                  </span>
                  <span className="btn-3d-shadow" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className={`space-y-8 section-fade section-fade-delay-2 ${isVisible ? 'visible' : ''}`}>
            <p className="text-bone-muted leading-relaxed">
              {lang === 'en'
                ? "Have a project in mind or just want to say hello? Feel free to reach out through the form or any of the channels below."
                : 'Aklınızda bir proje mi var ya da sadece merhaba mı demek istiyorsunuz? Form veya aşağıdaki kanallar üzerinden bana ulaşabilirsiniz.'}
            </p>

            <div className="space-y-4">
              <div className="pt-4 border-t border-smoke-50/30">
                <p className="text-xs text-blood tracking-wider uppercase mb-2">
                  {lang === 'en' ? 'Email' : 'E-posta'}
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-bone hover:text-blood transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div className="pt-4 border-t border-smoke-50/30">
                <p className="text-xs text-blood tracking-wider uppercase mb-2">
                  {lang === 'en' ? 'Location' : 'Konum'}
                </p>
                <p className="text-bone flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blood rounded-full" />
                  {personalInfo.location}
                </p>
              </div>

              <div className="pt-4 border-t border-smoke-50/30">
                <p className="text-xs text-blood tracking-wider uppercase mb-3">
                  {lang === 'en' ? 'Social' : 'Sosyal'}
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-smoke-50 flex items-center justify-center text-bone-muted hover:border-blood hover:text-blood transition-colors"
                      aria-label={link.label}
                    >
                      {socialIcons[link.id]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container-custom mt-20 pt-6 border-t border-smoke-50/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-bone-muted/40">
          <p>© {new Date().getFullYear()} {personalInfo.displayName}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-blood transition-colors"
          >
            {lang === 'en' ? 'Back to top' : 'Başa dön'} ↑
          </button>
          <p>{lang === 'en' ? 'Istanbul, Turkey' : 'İstanbul, Türkiye'}</p>
        </div>
        <div className="text-center mt-6 pb-4">
          <p className="text-sm font-medium">
            <span className="text-bone">Developed by Erhan Kaya.</span>{' '}
            <span className="text-blood">Bugs? On purpose.</span>
          </p>
        </div>
      </footer>
    </section>
  );
}
