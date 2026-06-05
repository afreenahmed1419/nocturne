"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function ContactHero() {
  return (
    <section className="relative pt-28 sm:pt-40 pb-14 sm:pb-20 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: "transparent" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(43,26,46,0.8) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center"
      >
        <motion.p variants={fadeUp} className="text-caption text-gold/60 mb-4">
          Find Us
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-serif text-section-heading text-parchment leading-tight mb-6"
        >
          Questions, collaborations,
          <br />
          <span className="italic text-gold">or just a conversation.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-parchment/50 text-base sm:text-lg leading-relaxed max-w-xl">
          About scent.
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 gold-divider" />
    </section>
  );
}
