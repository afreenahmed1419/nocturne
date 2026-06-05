"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const sources = [
  { ingredient: "Jasmine Sambac", origin: "Grasse, France", note: "Hand-picked at dawn. Three-week harvest window." },
  { ingredient: "Vetiver", origin: "Haiti", note: "Sustainably farmed. A cooperative we've worked with since day one." },
  { ingredient: "Oud", origin: "Laos", note: "Certified sustainable. No old-growth harvest." },
  { ingredient: "Bulgarian Rose", origin: "Kazanlak, Bulgaria", note: "Rosa damascena. Distilled within hours of picking." },
  { ingredient: "Vanilla", origin: "Madagascar", note: "Direct-trade. The same farm, year after year." },
  { ingredient: "Cedarwood", origin: "Texas, USA", note: "A byproduct of cedar oil distillation. Nothing wasted." },
];

export default function StoryIngredients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <p className="text-caption text-gold/60 mb-4">Provenance</p>
          <h2 className="font-serif text-section-heading text-parchment leading-tight max-w-xl">
            Where the stories
            <br />
            <span className="italic text-gold">begin.</span>
          </h2>
          <p className="mt-4 text-parchment/40 max-w-md leading-relaxed">
            Every ingredient in Nocturne is traceable to a specific place and practice. Here is where our scents come from.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sources.map((s) => (
            <motion.div
              key={s.ingredient}
              variants={fadeUp}
              className="group border border-gold/10 hover:border-gold/30 p-6 transition-all duration-500"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-1 h-12 bg-gold/30 group-hover:bg-gold/60 transition-colors duration-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-serif text-lg text-parchment">{s.ingredient}</p>
                  <p className="text-gold/60 text-sm tracking-wider">{s.origin}</p>
                </div>
              </div>
              <p className="text-parchment/40 text-sm leading-relaxed pl-5">{s.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
