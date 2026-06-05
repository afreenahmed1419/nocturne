'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MobileHeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="md:hidden relative h-screen w-full overflow-hidden bg-[#0E0E10]">

      {/* Background image — Ken Burns zoom */}
      <motion.div
        className="absolute inset-[-4%]"
        animate={{
          scale: [1, 1.06, 1],
          x: ['0%', '-1.5%', '0%'],
          y: ['0%', '-1%', '0%'],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/hero-mobile.png"
          alt="Nocturne Eau de Parfum"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Floating glow pulse behind bottle */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(120,50,160,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #0E0E10, transparent)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #0E0E10 10%, transparent)' }} />

      {/* Text content */}
      <div ref={containerRef} className="absolute inset-0 z-20 flex flex-col items-between justify-between px-6 text-center pt-20 pb-14">

        {/* Top — text in dark sky area */}
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#C7A15A]/60 text-[10px] tracking-[0.35em] uppercase mb-3"
          >
            Eau de Parfum
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl text-[#E8E4D9] leading-tight mb-2"
          >
            The Night
            <br />
            <span className="italic text-[#C7A15A]">Has a Scent.</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-[#C7A15A]/50 origin-center mt-3"
          />
        </div>

        {/* Bottom — CTAs below the bottle */}
        <div className="flex flex-col items-center gap-3 w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col gap-3 w-full max-w-[280px]"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 0px rgba(199,161,90,0)', '0 0 24px rgba(199,161,90,0.45)', '0 0 0px rgba(199,161,90,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Link href="/collection" className="block w-full text-center bg-[#C7A15A] text-[#0E0E10] py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium">
                Shop Now →
              </Link>
            </motion.div>
            <Link href="/story" className="block w-full text-center border border-[#C7A15A]/50 text-[#C7A15A] py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium">
              Our Story
            </Link>
          </motion.div>

          <motion.div
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.5, delay: 2.2, repeat: Infinity }}
            className="flex flex-col items-center gap-1 mt-2"
          >
            <span className="text-[#C7A15A]/40 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-5 bg-gradient-to-b from-[#C7A15A]/35 to-transparent" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
