"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import dynamic from "next/dynamic";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

const DarkVeil = dynamic(() => import("@/components/ui/DarkVeil"), { ssr: false });

export default function StoryHero() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-5 sm:px-6"
      style={{ background: "#0E0E10" }}
    >
      {/* Ethereal brand color blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Plum */}
        <div className="absolute w-[800px] h-[800px] rounded-full" style={{
          top: "-200px", left: "-100px",
          background: "radial-gradient(circle, rgba(80,30,90,0.55) 0%, transparent 70%)",
          filter: "blur(100px)",
        }} />
        {/* Gold */}
        <div className="absolute w-[600px] h-[600px] rounded-full" style={{
          top: "30%", right: "-100px",
          background: "radial-gradient(circle, rgba(199,161,90,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Forest green */}
        <div className="absolute w-[700px] h-[700px] rounded-full" style={{
          bottom: "-150px", left: "30%",
          background: "radial-gradient(circle, rgba(40,120,75,0.35) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />
      </div>

      {/* DarkVeil multicolor — centred on text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.55,
          maskImage: "radial-gradient(ellipse 65% 50% at 50% 50%, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 50% at 50% 50%, black 15%, transparent 70%)",
        }}
      >
        <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 1 }}>
          <DarkVeil hueShift={38} speed={0.4} warpAmount={0.6} noiseIntensity={0.02} resolutionScale={1} />
        </div>
        <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 1 }}>
          <DarkVeil hueShift={285} speed={0.25} warpAmount={0.8} resolutionScale={1} />
        </div>
        <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 1 }}>
          <DarkVeil hueShift={145} speed={0.5} warpAmount={0.5} resolutionScale={1} />
        </div>
      </div>

      <ParticleCanvas countMultiplier={1.0} sizeMultiplier={0.7} speedMultiplier={1.1} />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0E0E10, transparent)" }} />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center text-center"
      >
        <motion.p variants={fadeUp} className="text-caption text-gold/60 mb-4">
          The Story
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-serif text-[clamp(1.9rem,7vw,4.5rem)] text-parchment leading-tight mb-6"
        >
          More than a fragrance.
          <br />
          <span className="italic text-gold">A feeling that lingers.</span>
        </motion.h1>
        <motion.div
          variants={fadeUp}
          className="w-16 h-px bg-gold/40 mb-6"
        />
        <motion.p variants={fadeUp} className="text-parchment/50 text-base sm:text-lg leading-relaxed max-w-xl">
          Nocturne began with a simple obsession: the beauty of overlooked moments.
        </motion.p>
      </motion.div>
    </section>
  );
}
