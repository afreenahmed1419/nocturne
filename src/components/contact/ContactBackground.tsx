"use client";

import ParticleCanvas from "@/components/hero/ParticleCanvas";

export default function ContactBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes cb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-40px) scale(1.08)} }
        @keyframes cb2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-40px,30px) scale(1.1)} 80%{transform:translate(20px,-20px) scale(0.95)} }
        @keyframes cb3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.12)} }
        .cb1{animation:cb1 20s ease-in-out infinite}
        .cb2{animation:cb2 26s ease-in-out infinite}
        .cb3{animation:cb3 22s ease-in-out infinite}
      `}</style>

      {/* Plum — top left */}
      <div className="cb1 absolute rounded-full" style={{
        width: "800px", height: "800px",
        top: "-250px", left: "-150px",
        background: "radial-gradient(circle, rgba(80,30,90,0.6) 0%, rgba(43,26,46,0.3) 50%, transparent 70%)",
        filter: "blur(90px)",
      }} />

      {/* Gold — centre top */}
      <div className="cb2 absolute rounded-full" style={{
        width: "600px", height: "500px",
        top: "10%", left: "50%", marginLeft: "-300px",
        background: "radial-gradient(ellipse, rgba(199,161,90,0.18) 0%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      {/* Forest green — right */}
      <div className="cb3 absolute rounded-full" style={{
        width: "700px", height: "700px",
        top: "40%", right: "-200px",
        background: "radial-gradient(circle, rgba(40,120,75,0.4) 0%, transparent 70%)",
        filter: "blur(85px)",
      }} />

      {/* Plum — bottom */}
      <div className="cb1 absolute rounded-full" style={{
        width: "900px", height: "600px",
        bottom: "-200px", left: "20%",
        background: "radial-gradient(ellipse, rgba(43,26,46,0.7) 0%, transparent 70%)",
        filter: "blur(100px)",
        animationDelay: "8s",
      }} />

      {/* Fireflies */}
      <ParticleCanvas countMultiplier={0.7} sizeMultiplier={0.65} speedMultiplier={0.9} />
    </div>
  );
}
