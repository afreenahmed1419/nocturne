import type { Metadata } from "next";
import StoryHero from "@/components/story/StoryHero";
import BrandStatement from "@/components/home/BrandStatement";
import StoryOrigin from "@/components/story/StoryOrigin";
import StoryPhilosophy from "@/components/story/StoryPhilosophy";
import StoryFounderQuote from "@/components/story/StoryFounderQuote";
import StoryFireflies from "@/components/story/StoryFireflies";

export const metadata: Metadata = {
  title: "Our Story — NOCTURNE",
  description: "Nocturne is more than a fragrance. It's a feeling that lingers.",
};

export default function StoryPage() {
  return (
    <div className="relative">
      <StoryFireflies />
      <StoryHero />
      <StoryOrigin />
      <BrandStatement />
      <StoryPhilosophy />
      <StoryFounderQuote />
    </div>
  );
}
