"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Prepare",
    description:
      "Fragrance bonds best with moisturized skin. Apply unscented lotion to pulse points first — wrists, neck, inner elbows. Let it absorb for thirty seconds. This is the foundation.",
  },
  {
    number: "02",
    title: "Apply",
    description:
      "Spray from 6 inches away. Pulse points: wrists, neck, behind ears, inner elbows. The warmth of these areas activates the top notes first, then the heart, then the base — the story unfolds.",
  },
  {
    number: "03",
    title: "Let it Breathe",
    description:
      "Never rub. Rubbing breaks down molecules and flattens the scent profile. Let the fragrance open naturally. The story unfolds in layers over the first fifteen minutes.",
  },
  {
    number: "04",
    title: "Layer",
    description:
      "Nocturne fragrances are designed to be layered. Velvet Hour + Burnt Manuscript creates something neither could be alone — a midnight you'll never forget. Experiment. Trust your instincts.",
  },
  {
    number: "05",
    title: "Carry",
    description:
      "Reapply after 4–6 hours. Our refillable travel atomizers are made for this. In your bag, your pocket, your ritual. A fragrance that still lingers at 10pm is not an accident — it's a practice.",
  },
];

export default function RitualSteps() {
  return (
    <section className="section-padding bg-charcoal">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-caption text-gold/60 mb-3">Five Steps</p>
          <h2 className="font-serif text-section-heading text-parchment leading-tight">
            The way to wear
            <br />
            <span className="italic text-gold">Nocturne.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/15 hidden md:block" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <RitualStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RitualStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-8 md:gap-16 pb-16 group"
    >
      {/* Timeline dot */}
      <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
        <div className="w-3 h-3 rounded-full border border-gold/60 bg-charcoal group-hover:bg-gold/20 transition-colors duration-300 mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 border-l border-gold/10 md:border-0 pl-6 md:pl-0">
        <span className="font-serif text-5xl text-gold/15 leading-none block mb-2">{step.number}</span>
        <h3 className="font-serif text-2xl text-parchment mb-3">{step.title}</h3>
        <p className="text-parchment/50 leading-relaxed max-w-lg">{step.description}</p>
      </div>
    </motion.div>
  );
}
