"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ShootingStar() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let counter = 0;

    const trigger = () => {
      const id = counter++;
      const x = Math.random() * 60 + 15;
      const y = Math.random() * 28 + 4;
      setStars((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setStars((prev) => prev.filter((s) => s.id !== id)), 1000);
    };

    const first = setTimeout(trigger, 4000);
    const schedule = () => {
      const delay = Math.random() * 16000 + 12000;
      return setTimeout(() => { trigger(); timers.push(schedule()); }, delay);
    };
    const timers: ReturnType<typeof setTimeout>[] = [schedule()];

    return () => {
      clearTimeout(first);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute z-[13] pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, x: 140, y: 55 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div
            className="h-px w-16 bg-gradient-to-r from-transparent via-[#C7A15A] to-white"
            style={{ transform: "rotate(-28deg)" }}
          />
        </motion.div>
      ))}
    </>
  );
}
