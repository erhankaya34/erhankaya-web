'use client';

import { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface ScrollLottieProps {
  src: string;
  className?: string;
  scrollStart?: number;
  scrollEnd?: number;
  opacity?: number;
  // Yeni mod: ortadan başla, geri sar, sonra ileri sar (1.5x döngü)
  reverseStartMode?: boolean;
  // Animasyonun hangi frame'den başlayacağı (0-1 arası)
  animationOffset?: number;
  // Animasyon bittiğinde gizle
  hideAfterEnd?: boolean;
}

export default function ScrollLottie({
  src,
  className = '',
  scrollStart = 0,
  scrollEnd = 1,
  opacity = 0.15,
  reverseStartMode = false,
  animationOffset = 0,
  hideAfterEnd = false,
}: ScrollLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: src,
    });

    animationRef.current = anim;

    anim.addEventListener('DOMLoaded', () => {
      const totalFrames = anim.totalFrames;

      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));

        // Animasyon bittiğinde gizle
        if (hideAfterEnd && scrollPercent > scrollEnd) {
          setIsHidden(true);
        } else if (hideAfterEnd) {
          setIsHidden(false);
        }

        let animProgress: number;

        if (reverseStartMode) {
          // 1.33x döngü modu:
          // scroll 0% → anim 33% (ortanın biraz gerisi)
          // scroll 25% → anim 0% (başlangıç) - geri sarma tamamlandı
          // scroll 100% → anim 100% (son) - ileri sarma tamamlandı

          const startPoint = 0.37; // Animasyon %37'de başlar
          const reverseEndPoint = 0.25; // Scroll'un %25'inde animasyon başa döner

          if (scrollPercent <= reverseEndPoint) {
            // İlk %25 scroll: animasyon %33'den %0'a geri sarar
            const reverseProgress = scrollPercent / reverseEndPoint; // 0 to 1
            animProgress = startPoint * (1 - reverseProgress); // 0.33 to 0
          } else {
            // Kalan %75 scroll: animasyon %0'dan %100'e ileri sarar
            const forwardProgress = (scrollPercent - reverseEndPoint) / (1 - reverseEndPoint); // 0 to 1
            animProgress = forwardProgress; // 0 to 1
          }
        } else {
          // Normal mod
          const scrollRange = scrollEnd - scrollStart;
          const baseProgress = (scrollPercent - scrollStart) / scrollRange;
          // Offset uygula: animasyon offset'ten başlar ve (1 - offset) kadar ilerler
          animProgress = animationOffset + baseProgress * (1 - animationOffset);
        }

        // 0-1 arasında tut
        animProgress = Math.max(0, Math.min(1, animProgress));

        const frame = animProgress * (totalFrames - 1);
        anim.goToAndStop(frame, true);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

    return () => {
      anim.destroy();
    };
  }, [src, scrollStart, scrollEnd, reverseStartMode, hideAfterEnd]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none transition-opacity duration-300 ${className}`}
      style={{ opacity: isHidden ? 0 : opacity }}
      aria-hidden="true"
    />
  );
}
