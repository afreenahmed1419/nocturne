"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FragranceCard from "@/components/FragranceCard";
import { fragrances } from "@/lib/fragrances";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

export default function FeaturedFragrances() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-16 md:py-32"
      style={{ background: "linear-gradient(180deg, #0E0E10 0%, #2B1A2E 50%, #0E0E10 100%)" }}
    >
      <ParticleCanvas countMultiplier={0.7} sizeMultiplier={0.65} speedMultiplier={0.8} />
      {/* Top fade — soft blend from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(14,14,16,0.85), transparent)" }} />
      {/* Bottom fade into brand values */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0E0E10, transparent)" }} />

      {/* Ethereal shadow ambient */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <EtherealShadow
          color="rgba(199, 161, 90, 0.55)"
          animation={{ scale: 60, speed: 20 }}
          noise={{ opacity: 0.4, scale: 1.5 }}
          sizing="fill"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7 }}
            className="text-caption text-gold/60 mb-3"
          >
            The Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-section-heading text-parchment leading-tight max-w-lg"
          >
            Three obsessions,
            <br />
            <span className="italic text-gold">bottled.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {fragrances.map((fragrance, i) => (
            <motion.div
              key={fragrance.id}
              variants={fadeUp}
              className={`h-full ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <FragranceCard fragrance={fragrance} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a href="/collection" className="btn-outline inline-block">
            View Full Collection
          </a>
        </motion.div>
      </div>
    </section>
  );
}
