import Link from "next/link";
import Image from "next/image";
import { BrandSeal } from "@/components/Navbar";

const navLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/story", label: "Story" },
  { href: "/ritual", label: "Ritual" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal pt-0 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background seal watermark */}
      <div className="absolute right-8 bottom-8 text-gold/[0.04] pointer-events-none select-none">
        <BrandSeal size={280} />
      </div>

      <div className="gold-divider mb-14" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-14 relative z-10">
        {/* Brand */}
        <div>
          <Link href="/" className="group opacity-70 hover:opacity-100 transition-opacity duration-300 w-fit block -ml-4">
            <Image
              src="/logo.png"
              alt="NOCTURNE"
              width={220}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 text-parchment/35 text-sm leading-relaxed max-w-xs">
            Each scent is inspired by untold places, forgotten moments, and the beauty of what&apos;s left unspoken.
          </p>
          <p className="mt-3 text-gold/40 text-xs italic font-serif">
            Scents for the unafraid.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-caption text-gold/50 mb-5">Navigate</p>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-parchment/40 hover:text-parchment text-sm transition-colors duration-300 hover:tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <p className="text-caption text-gold/50 mb-5">Follow</p>
          <div className="flex gap-4 mb-6">
            <SocialLink href="#" label="Instagram" icon={<InstagramIcon />} />
            <SocialLink href="#" label="Pinterest" icon={<PinterestIcon />} />
            <SocialLink href="#" label="TikTok" icon={<TikTokIcon />} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-parchment/25 text-sm">hello@nocturne.co</p>
            <p className="text-parchment/25 text-sm">Based in London. Shipped worldwide.</p>
          </div>
        </div>
      </div>

      <div className="gold-divider mb-8 relative z-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-parchment/15 text-xs tracking-[0.2em] uppercase">
          Bold. Poetic. Unapologetic.
        </p>
        <p className="text-parchment/15 text-xs">
          © {new Date().getFullYear()} Nocturne. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="text-parchment/30 hover:text-gold transition-colors duration-300"
    >
      {icon}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.2 1.23-5.2s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.88 3.51-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.11-2.4 3.11-5.25 0-2.16-1.46-3.68-3.55-3.68-2.42 0-3.84 1.82-3.84 3.7 0 .73.28 1.52.63 1.95.07.08.08.15.06.23-.06.26-.21.84-.24.96-.04.15-.14.19-.31.11-1.17-.55-1.9-2.26-1.9-3.64 0-2.96 2.15-5.68 6.2-5.68 3.25 0 5.79 2.32 5.79 5.41 0 3.23-2.04 5.83-4.86 5.83-.95 0-1.84-.49-2.15-1.08l-.58 2.19c-.21.81-.78 1.83-1.17 2.44.88.27 1.81.42 2.77.42 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.41a8.16 8.16 0 004.77 1.52V7.48a4.85 4.85 0 01-1-.79z"/>
    </svg>
  );
}
