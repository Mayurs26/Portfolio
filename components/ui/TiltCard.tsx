'use client';

import { useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  intensity = 8,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width; // 0..1
      const yPercent = (e.clientY - rect.top) / rect.height; // 0..1

      setTilt({
        rotateX: (0.5 - yPercent) * intensity * 2, // top = positive, bottom = negative
        rotateY: (xPercent - 0.5) * intensity * 2, // right = positive, left = negative
        x: xPercent * 100,
        y: yPercent * 100,
      });
    },
    [prefersReducedMotion, intensity]
  );

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion) setIsHovered(true);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt((prev) => ({ ...prev, rotateX: 0, rotateY: 0 }));
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const shadowX = tilt.rotateY * 2;
  const shadowY = -tilt.rotateX * 2;
  const shadowBlur = isHovered ? 36 : 10;
  const shadowOpacity = isHovered ? 0.35 : 0.08;

  return (
    <div style={{ perspective: '1100px' }} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative ${className}`}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.25s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
          boxShadow: `${shadowX}px ${shadowY + shadowBlur * 0.4}px ${shadowBlur}px rgba(2,4,4,${shadowOpacity}), 0 0 20px rgba(121,144,156,${isHovered ? 0.15 : 0})`,
          willChange: 'transform',
        }}
      >
        {children}

        {/* ── Dynamic Specular Sheen (Freudian lighting) ── */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 320px at ${tilt.x}% ${tilt.y}%, rgba(247, 247, 229, 0.14) 0%, rgba(121, 144, 156, 0.08) 40%, transparent 80%)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
