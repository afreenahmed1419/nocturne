"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas({ speedMultiplier = 1, countMultiplier = 1, sizeMultiplier = 1 }: { speedMultiplier?: number; countMultiplier?: number; sizeMultiplier?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const isMobile = window.innerWidth < 768;
    const COUNT = Math.round((isMobile ? 6 : 12) * countMultiplier);
    const SKY_COUNT = Math.round((isMobile ? 1 : 3) * countMultiplier);

    // Sky cutoff line
    const SKY_CUTOFF = 0.42;

    type Firefly = {
      x: number; y: number;
      size: number;
      speedX: number; speedY: number;
      opacity: number;
      targetOpacity: number;
      opacitySpeed: number;
      glowRadius: number;
      phase: number;
      phaseSpeed: number;
      blinkTimer: number;
      zone: "left" | "right" | "bottom" | "bottle" | "sky";
    };

    const flies: Firefly[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnPosition = (zone: Firefly["zone"]): { x: number; y: number } => {
      const w = canvas.width;
      const h = canvas.height;
      const skyY = h * SKY_CUTOFF;

      switch (zone) {
        case "sky":
          return { x: Math.random() * w, y: Math.random() * (skyY * 0.9) };
        case "left":
          return { x: Math.random() * w * 0.28, y: skyY + Math.random() * (h - skyY) };
        case "right":
          return { x: w * 0.72 + Math.random() * w * 0.28, y: skyY + Math.random() * (h - skyY) };
        case "bottom":
          return { x: Math.random() * w, y: h * 0.72 + Math.random() * h * 0.28 };
        case "bottle":
          return {
            x: w * 0.25 + Math.random() * w * 0.5,
            y: h * 0.45 + Math.random() * (h * 0.45),
          };
      }
    };

    // Sky first, then heavier weighting on left + right edges
    const zones: Firefly["zone"][] = [];
    for (let i = 0; i < SKY_COUNT; i++) zones.push("sky");
    const remaining = COUNT - SKY_COUNT;
    for (let i = 0; i < remaining; i++) {
      const r = i / remaining;
      if      (r < 0.30) zones.push("left");   // 30% left edge
      else if (r < 0.60) zones.push("right");  // 30% right edge
      else if (r < 0.72) zones.push("bottom");
      else               zones.push("bottle");
    }

    for (let i = 0; i < COUNT; i++) {
      const zone = zones[i];
      const size = (Math.random() * 2 + 1) * sizeMultiplier;
      const pos = spawnPosition(zone);
      flies.push({
        x: pos.x, y: pos.y,
        size,
        speedX: (Math.random() - 0.5) * 0.22 * speedMultiplier,
        speedY: ((Math.random() - 0.5) * 0.14 - 0.03) * speedMultiplier,
        opacity: 0,
        targetOpacity: Math.random() * 0.7 + 0.2,
        opacitySpeed: Math.random() * 0.008 + 0.003,
        glowRadius: size * (Math.random() * 8 + 10),
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.008 + 0.003,
        blinkTimer: Math.random() * 200 + 60,
        zone,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const skyY = canvas.height * SKY_CUTOFF;

      flies.forEach((f) => {
        f.phase += f.phaseSpeed;
        f.x += f.speedX + Math.sin(f.phase) * 0.28;
        f.y += f.speedY + Math.cos(f.phase * 0.7) * 0.18;

        // Non-sky fireflies that drift into sky get respawned in their zone
        if (f.zone !== "sky" && f.y < skyY) {
          const pos = spawnPosition(f.zone);
          f.x = pos.x;
          f.y = pos.y;
          f.opacity = 0;
        }
        // Sky fireflies that drift below the cutoff get respawned in sky
        if (f.zone === "sky" && f.y > skyY) {
          const pos = spawnPosition("sky");
          f.x = pos.x;
          f.y = pos.y;
          f.opacity = 0;
        }

        // Horizontal wrap
        if (f.x > canvas.width + 20)  f.x = -20;
        if (f.x < -20)                f.x = canvas.width + 20;
        // Bottom wrap
        if (f.y > canvas.height + 20) { const pos = spawnPosition(f.zone); f.x = pos.x; f.y = skyY; }

        // Blink
        if (f.opacity < f.targetOpacity) {
          f.opacity = Math.min(f.opacity + f.opacitySpeed, f.targetOpacity);
        } else {
          f.blinkTimer--;
          if (f.blinkTimer <= 0) {
            f.targetOpacity = f.targetOpacity > 0.1
              ? Math.random() * 0.08
              : Math.random() * 0.7 + 0.25;
            f.blinkTimer = Math.random() * 180 + 40;
            f.opacitySpeed = Math.random() * 0.012 + 0.003;
          }
        }

        if (f.opacity <= 0.01) return;

        // Outer soft glow
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.glowRadius);
        glow.addColorStop(0,   `rgba(220, 180, 100, ${f.opacity * 0.35})`);
        glow.addColorStop(0.4, `rgba(199, 161, 90,  ${f.opacity * 0.12})`);
        glow.addColorStop(1,   `rgba(199, 161, 90,  0)`);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Inner bright core
        const core = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 2);
        core.addColorStop(0,   `rgba(255, 240, 180, ${f.opacity})`);
        core.addColorStop(0.5, `rgba(220, 175, 100, ${f.opacity * 0.7})`);
        core.addColorStop(1,   `rgba(199, 161, 90,  0)`);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [speedMultiplier, countMultiplier, sizeMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[15] pointer-events-none"
      aria-hidden="true"
    />
  );
}
