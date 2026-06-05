"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { staggerContainer, fadeLeft, fadeRight } from "@/lib/animations";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

const paragraphs = [
  "Founded by a perfumer obsessed with forgotten places — midnight libraries, abandoned theaters, secret gardens after rain — Nocturne was born from the belief that the most beautiful scents come from the most overlooked moments.",
  "We didn't set out to build a brand. We set out to bottle a feeling: the peculiar beauty of arriving somewhere and smelling, faintly, what happened there before you. The warmth of a room someone just left. The cold green of an empty garden in November.",
  "Three years of obsessive sourcing, failed experiments, and late-night formulations. The first sample that made us say — yes. That's it. That's the one. That's Nocturne.",
];

const illustrations = [
  <Image key="1" src="/story-icon-1.png" alt="" width={220} height={220} className="object-contain opacity-90 w-[140px] h-[140px] md:w-[220px] md:h-[220px]" />,
  <Image key="2" src="/story-icon-2.png" alt="" width={220} height={220} className="object-contain opacity-90 w-[140px] h-[140px] md:w-[220px] md:h-[220px]" />,
  <Image key="3" src="/story-icon-3.png" alt="" width={220} height={220} className="object-contain opacity-90 w-[140px] h-[140px] md:w-[220px] md:h-[220px]" />,
];

export default function StoryOrigin() {
  return (
    <section className="section-padding py-16 md:py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Plum — top left */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(80,40,90,0.65) 0%, transparent 70%)", filter: "blur(80px)" }} />
      {/* Gold — centre */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(199,161,90,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <ParticleCanvas countMultiplier={0.9} sizeMultiplier={0.7} speedMultiplier={1} />
      {/* Forest green — bottom right */}
      <div className="absolute bottom-0 right-0 w-[650px] h-[650px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(40,120,75,0.45) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="relative z-10 max-w-5xl mx-auto">
        {paragraphs.map((text, i) => (
          <OriginBlock key={i} text={text} illustration={illustrations[i]} reversed={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}

function OriginBlock({
  text,
  illustration,
  reversed,
}: {
  text: string;
  illustration: React.ReactNode;
  reversed: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-14 md:mb-24 ${reversed ? "md:flex-row-reverse" : ""}`}
    >
      <motion.div variants={reversed ? fadeRight : fadeLeft} className="flex-shrink-0 opacity-60 w-[140px] md:w-auto">
        {illustration}
      </motion.div>
      <motion.p
        variants={reversed ? fadeLeft : fadeRight}
        className="text-parchment/70 text-base sm:text-xl leading-relaxed"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}


