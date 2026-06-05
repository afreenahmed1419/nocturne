import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";
import ContactBackground from "@/components/contact/ContactBackground";

export const metadata: Metadata = {
  title: "Contact — NOCTURNE",
  description: "Questions, collaborations, or just a conversation about scent.",
};

export default function ContactPage() {
  return (
    <div className="relative bg-[#0E0E10]">
      <ContactBackground />
      <div className="relative z-10">
        <ContactHero />
        <ContactContent />
      </div>
    </div>
  );
}
