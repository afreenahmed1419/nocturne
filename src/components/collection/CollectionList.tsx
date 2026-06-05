"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fragrances } from "@/lib/fragrances";
import NoteTag from "@/components/NoteTag";
import Button from "@/components/Button";
import { staggerContainer, fadeLeft, fadeRight, fadeUp } from "@/lib/animations";

export default function CollectionList() {
  return (
    <section className="bg-transparent py-10 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-16">
        {fragrances.map((fragrance, index) => (
          <FragranceRow key={fragrance.id} fragrance={fragrance} index={index} />
        ))}
      </div>
    </section>
  );
}

function FragranceRow({ fragrance }: { fragrance: (typeof fragrances)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <article ref={ref} className="relative rounded-xl overflow-hidden border border-[#C7A15A]/40 shadow-[0_0_24px_rgba(199,161,90,0.08)]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Image — always left */}
        <motion.div
          variants={fadeLeft}
          className="relative overflow-hidden min-h-[180px] sm:min-h-[260px] lg:min-h-[360px]"
        >
          <Image
            src={`/fragrances/${fragrance.slug}.jpg`}
            alt={fragrance.name}
            fill
            className="object-cover"
            onError={() => {}}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/60" />
          <div className="absolute bottom-5 left-5">
            <p className="text-[9px] tracking-[0.25em] uppercase text-gold/50 mb-0.5">{fragrance.mood.join(" · ")}</p>
            <h2 className="font-serif text-lg text-parchment/70 tracking-wide">{fragrance.name}</h2>
          </div>

        </motion.div>

        {/* Text — always right */}
        <motion.div
          variants={fadeRight}
          className="flex flex-col justify-center py-4 sm:py-8 px-4 sm:px-8 md:px-10 bg-charcoal/60 backdrop-blur-sm"
        >
          <motion.p variants={fadeUp} className="font-serif italic text-gold/70 text-base mb-3">
            &ldquo;{fragrance.tagline}&rdquo;
          </motion.p>

          <motion.p variants={fadeUp} className="text-parchment/65 leading-relaxed mb-6 text-sm max-w-md">
            {fragrance.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mb-6">
            <p className="text-caption text-gold/50 mb-4">Scent Pyramid</p>
            <div className="flex flex-col gap-4">
              <ScentTier label="Top Notes" notes={fragrance.topNotes} widthClass="w-2/5" />
              <ScentTier label="Heart Notes" notes={fragrance.heartNotes} widthClass="w-3/5" />
              <ScentTier label="Base Notes" notes={fragrance.baseNotes} widthClass="w-full" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
            {fragrance.tags.map((tag) => (
              <NoteTag key={tag} label={tag} />
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-serif text-xl text-gold">{fragrance.price}</span>
            <Button variant="gold">Add to Cart</Button>
            <Button variant="outline" href="/contact">Enquire</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </article>
  );
}

function ScentTier({ label, notes }: { label: string; notes: string[]; widthClass: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] text-gold/45 uppercase tracking-wider">{label}</p>
      <p className="text-parchment/55 text-sm">{notes.join(", ")}</p>
      <div className="h-px bg-gradient-to-r from-gold/40 to-transparent mt-1" />
    </div>
  );
}
