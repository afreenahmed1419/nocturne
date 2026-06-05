"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

export default function StoryTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "#0E0E10" }}>

      {/* Desktop — background image */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/story-bg.png"
          alt=""
          fill
          className="object-cover object-center brightness-125"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(14,14,16,0.1) 0%, rgba(14,14,16,0.25) 50%, rgba(14,14,16,0.65) 100%)"
        }} />
      </div>

      {/* Mobile — ethereal shadow */}
      <div className="md:hidden absolute inset-0 z-0 opacity-55 pointer-events-none">
        <EtherealShadow
          color="rgba(199, 161, 90, 0.5)"
          animation={{ scale: 55, speed: 18 }}
          noise={{ opacity: 0.35, scale: 1.5 }}
          sizing="fill"
        />
      </div>

      <ParticleCanvas countMultiplier={1.0} sizeMultiplier={0.65} speedMultiplier={0.8} />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0E0E10, transparent)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0E0E10, transparent)" }} />

      {/* Content — text only, right aligned */}
      <div ref={ref} className="relative z-20 max-w-7xl mx-auto flex justify-end">
        <div className="flex flex-col gap-5 sm:gap-6 w-full sm:max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="text-caption text-gold/60 tracking-widest"
          >Our Origin</motion.p>

          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-section-heading text-parchment leading-tight"
          >Born in the Dark</motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-parchment/60 leading-relaxed text-base"
          >
            Nocturne was born from the belief that the most beautiful scents come from the most overlooked moments. Midnight libraries. Abandoned theaters. Secret gardens after rain. We didn&rsquo;t set out to make perfume. We set out to bottle feeling.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-parchment/40 leading-relaxed text-sm"
          >
            Founded by a perfumer obsessed with forgotten places — we create fragrances for those who notice what others overlook.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-2"
          >
            <Button href="/story" variant="outline">
              Read Our Story →
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
