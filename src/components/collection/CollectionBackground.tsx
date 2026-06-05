"use client";

import ParticleCanvas from "@/components/hero/ParticleCanvas";

export default function CollectionBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: "#0E0E10" }}>
      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,30px) scale(1.05)} 66%{transform:translate(30px,-40px) scale(1.1)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.15)} }
        .blob1{animation:blob1 18s ease-in-out infinite}
        .blob2{animation:blob2 24s ease-in-out infinite}
        .blob3{animation:blob3 20s ease-in-out infinite}
      `}</style>

      {/* Fireflies */}
      <ParticleCanvas countMultiplier={0.8} sizeMultiplier={0.65} speedMultiplier={0.9} />

      {/* Gold — top centre */}
      <div className="blob1 absolute rounded-full" style={{
        width: "900px", height: "900px",
        top: "-300px", left: "50%", marginLeft: "-450px",
        background: "radial-gradient(circle, rgba(199,161,90,0.35) 0%, rgba(199,161,90,0.1) 40%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      {/* Plum — bottom left */}
      <div className="blob2 absolute rounded-full" style={{
        width: "1000px", height: "1000px",
        bottom: "-400px", left: "-200px",
        background: "radial-gradient(circle, rgba(43,26,46,1) 0%, rgba(43,26,46,0.6) 40%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      {/* Gold — right side */}
      <div className="blob3 absolute rounded-full" style={{
        width: "700px", height: "700px",
        top: "40%", right: "-200px",
        background: "radial-gradient(circle, rgba(199,161,90,0.2) 0%, transparent 65%)",
        filter: "blur(60px)",
      }} />

      {/* Forest green — centre, blending plum and gold */}
      <div className="blob1 absolute rounded-full" style={{
        width: "700px", height: "700px",
        top: "45%", left: "30%",
        background: "radial-gradient(circle, rgba(40,100,65,0.45) 0%, rgba(31,70,50,0.2) 50%, transparent 70%)",
        filter: "blur(90px)",
        animationDelay: "6s",
      }} />
    </div>
  );
}
