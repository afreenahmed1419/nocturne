"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function RitualHero() {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-12 lg:px-24 bg-charcoal overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(31,46,39,0.8) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-3xl relative z-10"
      >
        <motion.p variants={fadeUp} className="text-caption text-gold/60 mb-4">
          The Ritual
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-serif text-section-heading text-parchment leading-tight mb-6"
        >
          Fragrance is not worn.
          <br />
          <span className="italic text-gold">It&rsquo;s lived.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-parchment/50 text-lg leading-relaxed max-w-xl">
          Most people wear fragrance. Very few wear it well. Here is how.
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 gold-divider" />
    </section>
  );
}
