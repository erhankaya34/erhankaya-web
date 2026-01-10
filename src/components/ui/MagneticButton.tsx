'use client';

import { useRef, useCallback, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.15,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const x = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const springX = useSpring(x, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || disabled) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distanceX = e.clientX - centerX;

      x.set(distanceX * strength);
    },
    [strength, x, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
  }, [x]);

  const Component = href ? motion.a : motion.button;
  const componentProps = href ? { href } : { type: 'button' as const };

  return (
    <Component
      ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      {...componentProps}
      className={`magnetic-btn ${className}`}
      style={{ x: springX, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
    >
      <span className="magnetic-btn-inner relative z-10">{children}</span>
    </Component>
  );
}
