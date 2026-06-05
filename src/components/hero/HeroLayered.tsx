"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import ShootingStar from "./ShootingStar";
import HeroContent from "./HeroContent";

export default function HeroLayered() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Each layer scrolls at a different speed
  const skyY      = useTransform(scrollYProgress, [0, 1], [0,  -60]);
  const moonY     = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const oceanY    = useTransform(scrollYProgress, [0, 1], [0,  -30]);
  const cliffY    = useTransform(scrollYProgress, [0, 1], [0,  -40]);
  const bottleY   = useTransform(scrollYProgress, [0, 1], [0,  -50]);
  const foliageY  = useTransform(scrollYProgress, [0, 1], [0,   20]);
  const contentOp = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY  = useTransform(scrollYProgress, [0, 0.45], [0, -50]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-[#0E0E10]">

      {/* Layer 1 — Sky & clouds */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y: skyY }}>
        <div className="absolute inset-0 animate-cloud-drift">
          <Image src="/hero/sky-clouds.png" alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
      </motion.div>

      {/* Layer 2 — Moon & glow */}
      <motion.div className="absolute inset-0 z-[2]" style={{ y: moonY }}>
        <div className="absolute inset-0 animate-moon-glow">
          <Image src="/hero/moon-glow.png" alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
      </motion.div>

      {/* Layer 3 — Ocean */}
      <motion.div className="absolute inset-0 z-[3]" style={{ y: oceanY }}>
        <div className="absolute inset-0 animate-ocean-sway">
          <Image src="/hero/ocean.png" alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
      </motion.div>

      {/* Layer 4 — Cliff & building */}
      <motion.div className="absolute inset-0 z-[4]" style={{ y: cliffY }}>
        <Image src="/hero/cliff-building.png" alt="" fill className="object-cover" sizes="100vw" />
        {/* Warm window light flicker */}
        <div className="absolute top-[18%] right-[7%] w-[14%] h-[26%] animate-light-flicker pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(199,161,90,0.09)_0%,transparent_70%)]" />
        </div>
      </motion.div>

      {/* Layer 5 — Bottle */}
      <motion.div className="absolute inset-0 z-[5]" style={{ y: bottleY }}>
        <div className="absolute inset-0 animate-bottle-float">
          <Image src="/hero/bottle.png" alt="Nocturne Eau de Parfum" fill className="object-cover" sizes="100vw" />
        </div>
        {/* Glass shimmer sweep */}
        <div className="absolute inset-0 animate-glass-shimmer overflow-hidden pointer-events-none">
          <div
            className="absolute top-[20%] left-[35%] w-[30%] h-[60%] opacity-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(199,161,90,0.07) 45%, rgba(255,255,255,0.04) 50%, rgba(199,161,90,0.07) 55%, transparent 60%)",
            }}
          />
        </div>
      </motion.div>

      {/* Layer 6 — Foliage left */}
      <motion.div className="absolute inset-0 z-[6]" style={{ y: foliageY }}>
        <div className="absolute inset-0 origin-bottom-left animate-foliage-sway-left">
          <Image src="/hero/foliage-left.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
      </motion.div>

      {/* Layer 7 — Foliage right */}
      <motion.div className="absolute inset-0 z-[7]" style={{ y: foliageY }}>
        <div className="absolute inset-0 origin-bottom-right animate-foliage-sway-right">
          <Image src="/hero/foliage-right.png" alt="" fill className="object-cover" sizes="100vw" />
        </div>
      </motion.div>

      {/* Fog */}
      <div className="absolute inset-0 z-[10] pointer-events-none animate-fog-drift opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(199,161,90,0.35) 30%, rgba(210,205,195,0.18) 50%, rgba(199,161,90,0.35) 70%, transparent 100%)",
            width: "200%",
          }}
        />
      </div>

      {/* Particles */}
      <ParticleCanvas />

      {/* Shooting stars */}
      <ShootingStar />

      {/* Depth gradients */}
      <div className="absolute inset-0 z-[16] pointer-events-none bg-gradient-to-t from-[#0E0E10] via-transparent to-transparent opacity-70" />
      <div className="absolute inset-0 z-[16] pointer-events-none bg-gradient-to-b from-[#0E0E10]/25 via-transparent to-transparent" />

      {/* Text + scroll */}
      <HeroContent opacity={contentOp} y={contentY} />
    </section>
  );
}
