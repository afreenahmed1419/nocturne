"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import NoteTag from "./NoteTag";
import { Fragrance } from "@/lib/fragrances";

interface FragranceCardProps {
  fragrance: Fragrance;
}

export default function FragranceCard({ fragrance }: FragranceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-smoke border border-gold/10 hover:border-gold/35 transition-all duration-500 overflow-hidden hover:shadow-[0_8px_40px_rgba(199,161,90,0.10)] h-full flex flex-col"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-10 h-px bg-gold opacity-60 group-hover:w-full transition-all duration-700 z-10" />

      {/* Image area */}
      <div className="relative h-56 overflow-hidden" style={{ background: fragrance.accent }}>
        <Image
          src={`/fragrances/${fragrance.slug}.jpg`}
          alt={fragrance.name}
          fill
          className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          onError={() => {}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-smoke/80 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 flex gap-1.5">
          {fragrance.mood.map((m) => (
            <span key={m} className="text-[10px] tracking-widest uppercase text-gold/70 bg-charcoal/60 backdrop-blur-sm px-2 py-0.5 border border-gold/20">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-serif text-2xl text-parchment mb-2 tracking-wide">{fragrance.name}</h3>
        <p className="text-gold/60 text-sm italic mb-3">{fragrance.tagline}</p>
        <p className="text-parchment/50 text-sm leading-relaxed mb-5 line-clamp-2">
          {fragrance.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {fragrance.tags.slice(0, 3).map((tag) => (
            <NoteTag key={tag} label={tag} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-serif text-xl text-gold">{fragrance.price}</span>
          <Link
            href="/collection"
            className="text-caption text-parchment/40 hover:text-gold transition-colors duration-300 group-hover:text-gold"
          >
            Explore →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
