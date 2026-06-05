"use client";

import ParticleCanvas from "@/components/hero/ParticleCanvas";

export default function StoryFireflies() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ParticleCanvas countMultiplier={0.5} sizeMultiplier={0.6} speedMultiplier={0.9} />
    </div>
  );
}
