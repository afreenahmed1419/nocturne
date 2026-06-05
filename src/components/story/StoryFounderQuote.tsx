"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StoryFounderQuote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-plum/30 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(199,161,90,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="gold-divider mb-20" />

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-caption text-gold/50 mb-8 tracking-[0.2em]"
        >
          From the Founder
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-parchment/90 leading-relaxed mb-10"
          style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)" }}
        >
          &ldquo;I wanted to create something for the people who notice what others overlook. The scent of rain on old stone. The warmth of a room someone just left. That&rsquo;s Nocturne.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-12 h-px bg-gold mx-auto mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-parchment/30 text-sm tracking-widest uppercase"
        >
          — Founder, NOCTURNE
        </motion.p>
      </div>

      <div className="gold-divider mt-20" />
    </section>
  );
}
