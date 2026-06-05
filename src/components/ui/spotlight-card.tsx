"use client";

import React, { useState, useRef, ReactNode, MouseEvent, CSSProperties } from 'react';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;       // applied to outer wrapper (sizing/layout)
  innerClassName?: string;  // applied to inner content div (padding/flex)
  style?: CSSProperties;    // applied to inner content div
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`relative ${className}`}
      style={{
        borderRadius: 14,
        padding: '1.5px',
        background: visible
          ? `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(199,161,90,0.7) 0%, rgba(199,161,90,0.15) 40%, rgba(199,161,90,0.08) 100%)`
          : 'rgba(199,161,90,0.15)',
        transition: visible ? 'none' : 'background 0.4s ease',
      }}
    >
      {/* Inner content */}
      <div
        className={`relative overflow-hidden w-full h-full ${innerClassName}`}
        style={{ borderRadius: 13, ...style }}
      >
        {children}

        {/* Inner spotlight glow */}
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 300ms',
            background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(199,161,90,0.08) 0%, transparent 65%)`,
            borderRadius: 13,
          }}
        />
      </div>
    </div>
  );
};

export { GlowCard };
