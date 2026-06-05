"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Variants } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
