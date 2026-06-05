"use client";

import { motion } from "framer-motion";
import { MotionValue } from "framer-motion";

interface HeroContentProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

export default function HeroContent({ opacity, y }: HeroContentProps) {
  return (
    <>
      {/* Text overlay */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col items-center justify-end text-center px-6 pb-28"
        style={{ opacity, y }}
      >
        <motion.p
          className="text-[#C7A15A]/60 text-[10px] tracking-[0.35em] uppercase mb-5 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Eau de Parfum
        </motion.p>

        <motion.div
          className="flex items-center gap-5 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <span className="w-16 h-px bg-gold/30" />
          <span className="text-[#C7A15A]/50 text-[10px] tracking-[0.25em] uppercase">
            Scents for the Unafraid
          </span>
          <span className="w-16 h-px bg-gold/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <a
            href="/collection"
            className="group inline-flex items-center gap-3 px-10 py-3.5 border border-[#C7A15A]/35 text-[#C7A15A] text-[11px] tracking-[0.22em] uppercase transition-all duration-500 hover:border-[#C7A15A]/70 hover:bg-[#C7A15A]/8 hover:shadow-[0_0_30px_rgba(199,161,90,0.15)]"
          >
            Explore the Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[#C7A15A]/35 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C7A15A]/40 to-transparent animate-scroll-line" />
      </motion.div>
    </>
  );
}
