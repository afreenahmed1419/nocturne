"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/story", label: "Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-charcoal/80 backdrop-blur-[12px]"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group opacity-100 hover:opacity-100 transition-opacity duration-300 -ml-4" style={{ filter: "brightness(1.4)" }}>
            <Image
              src="/logo.png"
              alt="NOCTURNE"
              width={220}
              height={80}
              className="h-32 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav — right side */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-caption transition-colors duration-300 relative group ${
                      pathname === link.href ? "text-gold" : "text-parchment/60 hover:text-parchment"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                        pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <button
              aria-label="Shopping cart"
              className="text-parchment/50 hover:text-gold transition-colors duration-300"
            >
              <CartIcon />
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex flex-col gap-[5px] p-1"
          >
            <span className={`block h-px w-6 bg-parchment transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px w-6 bg-parchment transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : ""}`} />
            <span className={`block h-px w-6 bg-parchment transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-charcoal/97 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            {/* Large background seal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <BrandSeal size={400} />
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="flex flex-col items-center gap-8 relative z-10"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-4xl tracking-wide transition-colors duration-300 ${
                      pathname === link.href ? "text-gold" : "text-parchment hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 flex flex-col items-center gap-3"
            >
              <Image src="/logo.png" alt="NOCTURNE" width={100} height={44} className="h-10 w-auto opacity-30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CrescentMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 6 A14 14 0 1 0 20 34 A10 10 0 1 1 20 6Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="27" cy="10" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="31" cy="16" r="0.8" fill="currentColor" opacity="0.5" />
      <circle cx="29" cy="22" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function BrandSeal({ size = 160 }: { size?: number }) {
  const r = 70;
  const text = "NOCTURNE · SCENTS FOR THE UNAFRAID · ";

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} fill="none" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />

      {/* Curved text */}
      <defs>
        <path id="sealCircle" d={`M 100,100 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      <text fontSize="8.5" fill="currentColor" opacity="0.7" letterSpacing="3">
        <textPath href="#sealCircle">{text}</textPath>
      </text>

      {/* Crescent center */}
      <path
        d="M100 72 A28 28 0 1 0 100 128 A20 20 0 1 1 100 72Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="117" cy="80" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="122" cy="92" r="1.6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
