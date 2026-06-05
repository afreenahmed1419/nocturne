"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

const pillars = [
  {
    title: "Stories Through Scent",
    body: "Every fragrance we make begins with a place, a memory, a feeling that resists easy description. We translate those into molecules. Our perfumers are storytellers first.",
  },
  {
    title: "Sustainable & Ethical",
    body: "We source with care and accountability. Every supplier relationship is transparent. We audit annually. We publish results. Beauty shouldn't cost the planet.",
  },
  {
    title: "Radical Transparency",
    body: "Every ingredient is disclosed. Every source is named. No proprietary formulas hiding behind legal loopholes. You deserve to know what you're wearing.",
  },
  {
    title: "Made to Last",
    body: "Refillable bottles. Minimal-waste refill pods. Packaging designed to live on your shelf for years, not be recycled after one use. Objects of ritual, not props.",
  },
];

export default function StoryPhilosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#0E0E10" }}>
      {/* Fireflies */}
      <ParticleCanvas countMultiplier={0.8} sizeMultiplier={0.65} speedMultiplier={0.9} />

      {/* Plum — left */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 70% at 0% 50%, rgba(80,30,90,0.55) 0%, transparent 70%)", filter: "blur(80px)" }} />
      {/* Gold — right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 45% 60% at 100% 30%, rgba(199,161,90,0.15) 0%, transparent 70%)", filter: "blur(70px)" }} />
      {/* Green — bottom centre */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(40,120,75,0.3) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-caption text-gold/60 mb-4">Our Philosophy</p>
          <h2 className="font-serif text-section-heading text-parchment leading-tight">
            We don&rsquo;t follow the light.
            <br />
            <span className="italic text-gold">We explore the dark.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="relative bg-smoke/50 border border-gold/10 p-8 hover:border-gold/25 transition-colors duration-500 group"
            >
              <div className="absolute top-0 left-0 w-8 h-px bg-gold opacity-60 group-hover:w-16 transition-all duration-500" />
              <h3 className="font-serif text-xl text-parchment mb-3">{pillar.title}</h3>
              <p className="text-parchment/50 leading-relaxed text-sm">{pillar.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
