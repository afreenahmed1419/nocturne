'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DROPLETS = [
  { x: '12%', y: '18%', size: 4, speed: 0.8 },
  { x: '78%', y: '25%', size: 6, speed: 1.2 },
  { x: '35%', y: '65%', size: 3, speed: 0.6 },
  { x: '85%', y: '55%', size: 7, speed: 1.0 },
  { x: '22%', y: '80%', size: 5, speed: 0.9 },
  { x: '65%', y: '15%', size: 3, speed: 1.1 },
  { x: '90%', y: '72%', size: 4, speed: 0.7 },
  { x: '48%', y: '88%', size: 6, speed: 1.3 },
  { x: '8%',  y: '45%', size: 3, speed: 0.5 },
  { x: '55%', y: '35%', size: 5, speed: 1.0 },
  { x: '72%', y: '90%', size: 4, speed: 0.8 },
  { x: '30%', y: '10%', size: 3, speed: 1.2 },
];

export default function MobileHeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nebulaRef    = useRef<HTMLDivElement>(null);
  const moonRef      = useRef<HTMLDivElement>(null);
  const bottleRef    = useRef<HTMLDivElement>(null);
  const swirlLeftRef = useRef<HTMLDivElement>(null);
  const swirlRightRef = useRef<HTMLDivElement>(null);
  const dropletRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: false,
        },
      });

      tl.to(nebulaRef.current,    { y: -80, scale: 1.08, ease: 'none' }, 0);
      tl.to(moonRef.current,      { y: -120, ease: 'none' }, 0);
      tl.to(bottleRef.current,    { y: -40, ease: 'none' }, 0);
      tl.to(swirlLeftRef.current, { y: -60, x: -20, rotation: -8, ease: 'none' }, 0);
      tl.to(swirlRightRef.current,{ y: -60, x:  20, rotation:  8, ease: 'none' }, 0);

      dropletRefs.current.forEach((droplet, i) => {
        if (!droplet) return;
        tl.to(droplet, {
          y: -(DROPLETS[i].speed * 100),
          x: (i % 2 === 0 ? 1 : -1) * (DROPLETS[i].speed * 15),
          opacity: 0.1,
          ease: 'none',
        }, 0);
      });

      tl.to(contentRef.current, { y: -80, opacity: 0, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="md:hidden">
      <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0E0E10]">

          {/* Layer 1 — Nebula */}
          <div ref={nebulaRef} className="absolute inset-0 will-change-transform">
            <Image src="/hero-layers/layer-1-nebula.png" alt="" fill className="object-cover" priority sizes="100vw" />
          </div>

          {/* Layer 2 — Moon */}
          <div ref={moonRef} className="absolute inset-0 will-change-transform" style={{ mixBlendMode: 'screen' }}>
            <Image src="/hero-layers/layer-2-moon.png" alt="" fill className="object-cover" priority sizes="100vw" />
          </div>

          {/* Layer 4 — Swirl left */}
          <div ref={swirlLeftRef} className="absolute inset-0 will-change-transform" style={{ mixBlendMode: 'screen' }}>
            <Image src="/hero-layers/layer-4-swirl-left.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>

          {/* Layer 5 — Swirl right */}
          <div ref={swirlRightRef} className="absolute inset-0 will-change-transform" style={{ mixBlendMode: 'screen' }}>
            <Image src="/hero-layers/layer-5-swirl-right.png" alt="" fill className="object-cover" sizes="100vw" />
          </div>

          {/* Layer 3 — Bottle */}
          <div ref={bottleRef} className="absolute inset-0 will-change-transform" style={{ mixBlendMode: 'screen' }}>
            <Image src="/hero-layers/layer-3-bottle.png" alt="Nocturne Eau de Parfum" fill className="object-cover" priority sizes="100vw" />
          </div>

          {/* Layer 6 — Droplets */}
          {DROPLETS.map((d, i) => (
            <div
              key={i}
              ref={(el) => { dropletRefs.current[i] = el; }}
              className="absolute rounded-full will-change-transform"
              style={{
                left: d.x, top: d.y,
                width: d.size, height: d.size,
                background: 'radial-gradient(circle at 30% 30%, rgba(140,80,160,0.8), rgba(43,26,46,0.9))',
                boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.5), 0 0 4px rgba(90,45,106,0.3)',
                zIndex: 20,
              }}
            />
          ))}

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#0E0E10] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-[#0E0E10]/40 via-transparent to-transparent" />

          {/* Text content */}
          <div ref={contentRef} className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-24 px-6 text-center pointer-events-none">
            <p className="text-[#C7A15A]/50 text-[10px] tracking-[0.3em] uppercase mb-3">Eau de Parfum</p>
            <h1 className="font-serif text-5xl text-[#C7A15A] tracking-[0.05em] uppercase leading-[0.9]">
              Nocturne
            </h1>
            <p className="text-[#E8E4D9]/40 text-xs tracking-[0.2em] uppercase mt-3">Scents for the Unafraid</p>
            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="text-[#C7A15A]/30 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-[#C7A15A]/30 to-transparent animate-pulse" />
            </div>
          </div>

        </div>
      </div>

      {/* Noscript fallback */}
      <noscript>
        <div className="h-screen w-full bg-[#0E0E10] flex items-center justify-center">
          <Image src="/hero/hero-full.png" alt="Nocturne" fill className="object-cover" />
        </div>
      </noscript>
    </div>
  );
}
