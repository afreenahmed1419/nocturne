import HeroSection from "@/components/home/HeroSection";
import FeaturedFragrances from "@/components/home/FeaturedFragrances";
import BrandValues from "@/components/home/BrandValues";
import StoryTeaser from "@/components/home/StoryTeaser";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="flex flex-col">
        <FeaturedFragrances />
        <BrandValues />
        <StoryTeaser />
      </div>
    </div>
  );
}
