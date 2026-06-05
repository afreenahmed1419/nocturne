"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";
import ShootingStar from "./ShootingStar";

export default function HeroFallback() {
  const ref = useRef<HTMLElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textOp  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 18 });
  const imgX    = useTransform(smoothX, [-1, 1], ["-3%", "3%"]);
  const imgY    = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);
  // Counter-move for text depth
  const txtX    = useTransform(smoothX, [-1, 1], ["8px", "-8px"]);
  const txtYmov = useTransform(smoothY, [-1, 1], ["5px", "-5px"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const headlineWords = ["The", "Night"];
  const subWords = ["Has", "a", "Scent."];

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#0E0E10]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Background — ken-burns + mouse parallax */}
      <motion.div
        className="absolute inset-[-4%] z-[1] animate-ken-burns"
        style={{ x: imgX, y: imgY }}
      >
        <Image
          src="/hero/hero-full.png"
          alt="Nocturne perfume bottle on coastal cliff at night"
          fill
          className="object-cover object-center"
          priority
          sizes="110vw"
        />
      </motion.div>

      {/* Cursor light — follows mouse */}
      <motion.div
        className="absolute z-[3] pointer-events-none rounded-full"
        animate={{ x: cursorPos.x - 200, y: cursorPos.y - 200, opacity: hovering ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        style={{
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(199,161,90,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Repeating gold shimmer sweeps */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3.5, delay: 1.6, repeat: Infinity, repeatDelay: 8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-0 bottom-0 w-[25%]"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(199,161,90,0.07) 50%, transparent 70%)" }}
        />
      </div>

      {/* Particles + shooting stars */}
      <ParticleCanvas />
      <ShootingStar />

      {/* Vignettes */}
      <div className="absolute inset-0 z-[8] pointer-events-none" style={{ background: "linear-gradient(to top, rgba(14,14,16,0.45) 0%, rgba(14,14,16,0.15) 20%, transparent 45%)" }} />
      <div className="absolute inset-0 z-[8] pointer-events-none bg-gradient-to-b from-[#0E0E10]/30 via-transparent to-transparent" />
      <div className="absolute inset-0 z-[8] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(14,14,16,0.55) 100%)" }} />
      <div className="absolute inset-0 z-[9] pointer-events-none" style={{ background: "linear-gradient(to right, rgba(14,14,16,0.7) 0%, rgba(14,14,16,0.3) 45%, transparent 70%)" }} />

      {/* Text */}
      <motion.div
        style={{ y: textY, opacity: textOp, x: txtX }}
        className="absolute inset-y-0 left-0 z-[20] flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-24 max-w-[90vw] sm:max-w-xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[10px] tracking-[0.35em] uppercase text-[#C7A15A]/60 mb-6"
        >
          Eau de Parfum
        </motion.p>

        <h1 className="font-serif text-[clamp(2rem,7vw,4.2rem)] text-[#E8E4D9] leading-[1.05] tracking-[0.02em] mb-2">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em]"
              style={{ transformOrigin: "bottom" }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <span className="italic text-[#C7A15A]">
            {subWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.8 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.2em]"
                style={{ transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Gold underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-px bg-[#C7A15A]/50 origin-left mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="text-[#E8E4D9]/45 text-sm leading-[1.8] max-w-xs"
        >
          Crafted for those who find beauty in what others overlook — forgotten places, untold stories, the dark between stars.
        </motion.p>
      </motion.div>

      {/* CTAs */}
      <div className="absolute bottom-8 sm:bottom-12 left-5 sm:left-auto right-5 sm:right-10 md:right-16 lg:right-24 z-[20] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">

        {/* Shop Now — pulsing glow + shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(199,161,90,0)", "0 0 28px rgba(199,161,90,0.5)", "0 0 0px rgba(199,161,90,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Link
              href="/collection"
              className="group relative inline-flex items-center gap-3 bg-[#C7A15A] text-[#0E0E10] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-300 hover:bg-[#D4B96A] hover:shadow-[0_0_32px_rgba(199,161,90,0.5)]"
            >
              {/* Shimmer sweep */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: "easeInOut", delay: 2.5 }}
              />
              Shop Now
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >→</motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Our Story — border glow pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(199,161,90,0)", "0 0 18px rgba(199,161,90,0.3)", "0 0 0px rgba(199,161,90,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          >
            <Link
              href="/story"
              className="group inline-flex items-center gap-3 border border-[#C7A15A]/60 text-[#C7A15A] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:border-[#C7A15A] hover:bg-[#C7A15A]/8 hover:shadow-[0_0_20px_rgba(199,161,90,0.2)]"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2.5, delay: 2.2, repeat: Infinity }}
          className="text-[9px] tracking-[0.3em] uppercase text-[#C7A15A]/50"
        >
          Scroll
        </motion.span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C7A15A]/35 to-transparent animate-scroll-line" />
      </motion.div>
    </section>
  );
}
