"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";
import ParticleCanvas from "@/components/hero/ParticleCanvas";

const values = [
  {
    icon: <RefillIcon />,
    title: "Refillable Design",
    desc: "Vessels made to last a lifetime. Refill pods ship in minimal packaging.",
  },
  {
    icon: <LeafIcon />,
    title: "Sustainable Packaging",
    desc: "Recycled materials, no excess. Beauty without the waste.",
  },
  {
    icon: <GlobeIcon />,
    title: "Ethically Sourced",
    desc: "Every ingredient traced. Every supplier known by name.",
  },
  {
    icon: <EyeIcon />,
    title: "Transparent Ingredients",
    desc: "Full disclosure. No hidden synthetics, no mystery molecules.",
  },
];

export default function BrandValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding py-16 md:py-32 lg:py-40 bg-charcoal relative overflow-hidden">

      <ParticleCanvas countMultiplier={0.7} sizeMultiplier={0.6} speedMultiplier={0.8} />
      {/* Top fade from collection */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0E0E10, transparent)" }} />

      {/* Ambient background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <EtherealShadow
          color="rgba(199, 161, 90, 0.4)"
          animation={{ scale: 40, speed: 15 }}
          noise={{ opacity: 0.3, scale: 1.5 }}
          sizing="fill"
        />
      </div>

      {/* Bottom fade into story teaser */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0E0E10, transparent)" }} />

      {/* Plum — left */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 80% at 0% 50%, rgba(43,26,46,0.7) 0%, transparent 70%)" }} />
      {/* Gold — centre */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 40% 60% at 50% 50%, rgba(199,161,90,0.07) 0%, transparent 70%)" }} />
      {/* Forest green — right */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 45% 70% at 100% 50%, rgba(40,100,65,0.25) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="h-full"
            >
              <GlowCard
                innerClassName="flex flex-col items-start gap-5 p-7 h-full group"
                style={{ background: "rgba(14,14,16,0.7)", backdropFilter: "blur(8px)" }}
              >
                <div className="text-gold/50 group-hover:text-gold transition-colors duration-300 p-2 border border-gold/10 group-hover:border-gold/30 rounded-sm">
                  {v.icon}
                </div>
                <div>
                  <p className="text-caption text-parchment/80 mb-2">{v.title}</p>
                  <p className="text-parchment/40 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RefillIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
