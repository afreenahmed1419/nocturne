"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="text-caption text-gold/70 mb-4 tracking-widest"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-serif text-section-heading text-parchment leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-parchment/60 text-lg max-w-xl leading-relaxed"
          style={centered ? { margin: "1rem auto 0" } : undefined}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
