"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { GlowCard } from "@/components/ui/spotlight-card";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

const particles = [
  { top: "28%", left: "46%", size: 2, opacity: 0.3, duration: 7, delay: 0 },
  { top: "55%", left: "52%", size: 1.5, opacity: 0.2, duration: 6, delay: 1.2 },
  { top: "38%", left: "58%", size: 2, opacity: 0.4, duration: 8, delay: 0.5 },
  { top: "65%", left: "44%", size: 1.5, opacity: 0.25, duration: 7, delay: 2 },
  { top: "45%", left: "62%", size: 2, opacity: 0.2, duration: 6.5, delay: 0.8 },
];

export default function BrandStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const imgX = useTransform(smoothX, [-1, 1], ["-3%", "3%"]);
  const imgY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex items-center py-24 md:py-0"
      style={{ background: "#0E0E10" }}
    >
      {/* Illustration — mouse parallax + float */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        className="hidden md:block absolute right-[6%] top-[10%] bottom-[10%] w-[42%] pointer-events-none"
        style={{ x: imgX, y: imgY }}
        aria-hidden="true"
      >
        {/* Float animation wrapper */}
        <motion.div
          className="relative w-full h-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand-illustration.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="65vw"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              opacity: 0.85,
            }}
          />

          {/* Gold shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(199,161,90,0.06) 50%, transparent 65%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Top fade — blends from hero */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0E0E10 0%, #0E0E10 20%, rgba(14,14,16,0.7) 60%, transparent 100%)" }} />
      {/* Bottom fade — blends into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0E0E10 0%, #0E0E10 15%, transparent 100%)" }} />

      {/* Fireflies — faster in this section */}
      <ParticleCanvas speedMultiplier={2.5} countMultiplier={0.4} sizeMultiplier={0.6} />

      {/* Gold glow at text/image intersection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 55% 50%, rgba(199,161,90,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#C7A15A] pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      {/* Text block */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 1, delay: 0, ease }}
        className="relative z-10 mx-5 sm:mx-8 md:ml-16 lg:ml-24 md:mr-0 max-w-2xl w-full md:w-auto"
      >
        <GlowCard innerClassName="flex flex-col gap-6 md:gap-8 p-7 sm:p-10 md:p-14 backdrop-blur-sm" style={{ background: "linear-gradient(135deg, rgba(14,14,16,0.92) 0%, rgba(14,14,16,0.75) 100%)" }}>
        {/* Subtle corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C7A15A]/50 z-40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#C7A15A]/50 z-40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#C7A15A]/50 z-40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C7A15A]/50 z-40" />

        {/* Intro line */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative font-serif italic text-sm leading-[1.7]"
          style={{ color: "rgba(232, 228, 217, 0.5)" }}
        >
          We don&rsquo;t make fragrances for everyone. We make them for the ones who stay up too late, feel too deeply, and never apologize for it.
        </motion.p>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="relative w-10 h-px bg-gold/35 origin-left"
        />

        {/* Main quote */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="relative font-serif italic leading-[1.3]"
          style={{ fontSize: "clamp(1.25rem, 4.5vw, 2.4rem)", color: "#C7A15A", fontWeight: 400 }}
        >
          You don&rsquo;t wear Nocturne. You carry it — like a secret, like a scar, like a song you can&rsquo;t forget.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="relative text-xs tracking-[0.3em] uppercase"
          style={{ color: "rgba(232, 228, 217, 0.3)" }}
        >
          Scents for the Unafraid
        </motion.p>
        </GlowCard>
      </motion.div>
    </section>
  );
}
