"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

export default function CollectionHero() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-28 sm:pt-40 pb-0">

      {/* Heading */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[10px] tracking-[0.35em] uppercase text-gold/60 mb-5"
        >
          The Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2rem,8vw,5.5rem)] text-parchment leading-[1.05] tracking-[0.02em]"
        >
          Three stories.
          <br />
          <span className="italic text-gold">Three obsessions.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-parchment/40 text-base mt-4 tracking-wide"
        >
          Find the one that finds you.
        </motion.p>
      </div>

      {/* Sparkle horizon */}
      <div className="relative w-full h-40 sm:h-56 mt-4 sm:mt-6">

        {/* Glow horizon lines */}
        <div className="absolute inset-x-[25%] top-0 h-[2px] w-[50%] blur-sm"
          style={{ background: "linear-gradient(to right, transparent, #C7A15A, transparent)" }} />
        <div className="absolute inset-x-[25%] top-0 h-px w-[50%]"
          style={{ background: "linear-gradient(to right, transparent, #C7A15A, transparent)" }} />
        <div className="absolute inset-x-[40%] top-0 h-[4px] w-[20%] blur-md"
          style={{ background: "linear-gradient(to right, transparent, rgba(199,161,90,0.8), transparent)" }} />

        {/* Dense sparkles — clipped to centre zone below the line */}
        <div className="absolute inset-0" style={{ clipPath: "ellipse(40% 70px at 50% 0%)" }}>
          <SparklesCore
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={1200}
            particleColor="#C7A15A"
            speed={2}
            className="w-full h-full"
          />
        </div>
      </div>

    </section>
  );
}
