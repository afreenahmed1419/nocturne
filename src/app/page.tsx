import HeroSection from "@/components/home/HeroSection";
import MobileHeroParallax from "@/components/MobileHeroParallax";
import FeaturedFragrances from "@/components/home/FeaturedFragrances";
import BrandValues from "@/components/home/BrandValues";
import StoryTeaser from "@/components/home/StoryTeaser";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Desktop hero */}
      <div className="hidden md:block">
        <HeroSection />
      </div>

      {/* Mobile hero — scroll parallax */}
      <MobileHeroParallax />

      <div className="flex flex-col">
        <FeaturedFragrances />
        <BrandValues />
        <StoryTeaser />
      </div>
    </div>
  );
}
