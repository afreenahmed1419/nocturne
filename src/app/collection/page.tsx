import type { Metadata } from "next";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionList from "@/components/collection/CollectionList";
import CollectionBackground from "@/components/collection/CollectionBackground";

export const metadata: Metadata = {
  title: "The Collection — NOCTURNE",
  description: "Three stories. Three obsessions. Find the one that finds you.",
};

export default function CollectionPage() {
  return (
    <div className="relative min-h-screen">
      <CollectionBackground />
      <div className="relative z-10">
        <CollectionHero />
        <CollectionList />
      </div>
    </div>
  );
}
