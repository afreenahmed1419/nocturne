"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const combinations = [
  {
    fragrances: ["Velvet Hour", "Phantom Garden"],
    name: "The Dark Garden",
    description:
      "Dark florals meet wild earth. Tobacco and leather grounded in vetiver and oakmoss. A walk through a garden at 2am — beautiful and slightly unsettling.",
    accent: "from-plum/40 to-forest/40",
  },
  {
    fragrances: ["Velvet Hour", "Burnt Manuscript"],
    name: "The Midnight Library",
    description:
      "Black rose and saffron over oud and smoky amber. For the ones who read until they can't anymore. Intimate. Addictive. Impossible to forget.",
    accent: "from-plum/40 to-smoke/60",
  },
  {
    fragrances: ["Phantom Garden", "Burnt Manuscript"],
    name: "The Forgotten Trail",
    description:
      "Wet earth and oakmoss over cedarwood and incense. The path through woods that no one walks anymore. Wild and still all at once.",
    accent: "from-forest/40 to-smoke/60",
  },
];

export default function LayeringGuide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-plum/20 border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-16"
        >
          <p className="text-caption text-gold/60 mb-4">Layering Guide</p>
          <h2 className="font-serif text-section-heading text-parchment leading-tight max-w-lg">
            When one isn&rsquo;t
            <br />
            <span className="italic text-gold">enough.</span>
          </h2>
          <p className="mt-4 text-parchment/40 max-w-md leading-relaxed">
            Our three fragrances are designed to layer. Apply the deeper, woodier scent first. Let it settle for five minutes. Then apply the second over pulse points.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {combinations.map((combo) => (
            <motion.div
              key={combo.name}
              variants={fadeUp}
              className={`group relative bg-gradient-to-br ${combo.accent} border border-gold/10 hover:border-gold/30 p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(199,161,90,0.08)]`}
            >
              <div className="flex gap-2 mb-4">
                {combo.fragrances.map((f, i) => (
                  <span key={f} className="flex items-center gap-2">
                    <span className="text-caption text-gold/70">{f}</span>
                    {i < combo.fragrances.length - 1 && (
                      <span className="text-gold/30">+</span>
                    )}
                  </span>
                ))}
              </div>
              <h3 className="font-serif text-2xl text-parchment mb-3">&ldquo;{combo.name}&rdquo;</h3>
              <p className="text-parchment/50 text-sm leading-relaxed">{combo.description}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
