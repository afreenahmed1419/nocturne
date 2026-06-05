"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = ({
  className,
  background = "transparent",
  minSize = 0.5,
  maxSize = 2,
  speed = 1,
  particleColor = "#C7A15A",
  particleDensity = 80,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn particles
    type Particle = {
      x: number; y: number;
      size: number;
      speedX: number; speedY: number;
      opacity: number; targetOpacity: number;
      opacitySpeed: number;
      blinkTimer: number;
    };

    // Match tsparticles density formula: value * (w*h) / (400*400)
    const count = Math.floor(particleDensity * (canvas.width * canvas.height) / (400 * 400));
    const particles: Particle[] = Array.from({ length: Math.max(count, 60) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: minSize + Math.random() * (maxSize - minSize),
      speedX: (Math.random() - 0.5) * 0.3 * speed,
      speedY: (Math.random() - 0.5) * 0.3 * speed,
      opacity: Math.random(),
      targetOpacity: Math.random() * 0.9 + 0.1,
      opacitySpeed: (Math.random() * 0.008 + 0.003) * speed,
      blinkTimer: Math.random() * 200 + 60,
    }));

    // Parse hex color to rgb
    const hex = particleColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkle
        if (Math.abs(p.opacity - p.targetOpacity) < 0.01) {
          p.blinkTimer--;
          if (p.blinkTimer <= 0) {
            p.targetOpacity = p.targetOpacity > 0.3 ? Math.random() * 0.15 : Math.random() * 0.9 + 0.1;
            p.blinkTimer = Math.random() * 180 + 60;
          }
        } else {
          p.opacity += p.opacity < p.targetOpacity ? p.opacitySpeed : -p.opacitySpeed;
        }

        if (p.opacity <= 0.01) return;

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `rgba(${r},${g},${b},${p.opacity * 0.6})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [minSize, maxSize, speed, particleColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ background }}
    />
  );
};
