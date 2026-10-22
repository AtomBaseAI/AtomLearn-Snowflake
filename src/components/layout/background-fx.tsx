"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Fixed background: cyber grid, glacial glows, drifting snow particles.
 * Pure CSS/motion — cheap, no canvas needed here.
 */
export function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      {/* base grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-70" />
      {/* perspective floor grid */}
      <div
        className="absolute bottom-0 left-1/2 w-[200%] h-[45%] opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,181,232,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(41,181,232,0.14) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "translateX(-50%) perspective(500px) rotateX(62deg) scale(1.6)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 75%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 75%)",
        }}
      />
      {/* glacial glows */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-snow/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-magenta/[0.06] blur-[130px]" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] bg-ice/[0.06] blur-[120px]" />
      {/* breathing glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-[420px] h-[420px] bg-snow/[0.06] blur-[120px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* drifting snow — CSS keyframe particles (compositor-friendly) */}
      {SNOW.map((p, i) => (
        <span
          key={i}
          className="snowflake-particle"
          style={{
            left: `${p.x}%`,
            width: p.s,
            height: p.s,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.o,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
      {/* floating glow particles — gentle rise */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={`g${i}`}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 3}px ${p.c}`,
          }}
          animate={{
            y: [0, p.rise, 0],
            x: [0, p.drift, 0],
            opacity: [0.12, p.peak, 0.12],
          }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="noise-overlay" />
    </div>
  );
}

const SNOW = [
  { x: 4,  s: 2, d: 14, delay: 0,   o: 0.35, drift: 18 },
  { x: 12, s: 2, d: 18, delay: 2.2, o: 0.28, drift: -14 },
  { x: 23, s: 2, d: 15, delay: 1.1, o: 0.32, drift: 10 },
  { x: 34, s: 2, d: 21, delay: 4.5, o: 0.22, drift: 22 },
  { x: 45, s: 2, d: 16, delay: 0.6, o: 0.3, drift: -18 },
  { x: 57, s: 2, d: 19, delay: 3.4, o: 0.26, drift: 12 },
  { x: 66, s: 2, d: 14, delay: 5.2, o: 0.35, drift: -10 },
  { x: 78, s: 2, d: 20, delay: 2.8, o: 0.24, drift: 16 },
  { x: 88, s: 2, d: 17, delay: 1.7, o: 0.3, drift: -20 },
  { x: 95, s: 2, d: 22, delay: 6,   o: 0.26, drift: 14 },
  { x: 50, s: 2, d: 18, delay: 7.5, o: 0.28, drift: -12 },
  { x: 15, s: 2, d: 20, delay: 8.2, o: 0.25, drift: 20 },
];

const PARTICLES = [
  { x: 8,  y: 22, d: 9,   delay: 0,   s: 3, rise: -34, drift: 6,  peak: 0.9,  c: "rgba(41,181,232,0.8)" },
  { x: 18, y: 68, d: 11,  delay: 1.2, s: 2, rise: -26, drift: -8, peak: 0.7,  c: "rgba(125,211,252,0.75)" },
  { x: 32, y: 40, d: 10,  delay: 0.4, s: 3, rise: -40, drift: 5,  peak: 0.85, c: "rgba(41,181,232,0.8)" },
  { x: 47, y: 82, d: 12,  delay: 2,   s: 2, rise: -30, drift: -6, peak: 0.6,  c: "rgba(255,45,120,0.6)" },
  { x: 61, y: 18, d: 9.5, delay: 0.8, s: 2, rise: -36, drift: 7,  peak: 0.75, c: "rgba(255,255,255,0.55)" },
  { x: 74, y: 55, d: 11.5, delay: 1.6, s: 3, rise: -28, drift: -5, peak: 0.8,  c: "rgba(41,181,232,0.8)" },
  { x: 86, y: 30, d: 10,  delay: 0.2, s: 2, rise: -42, drift: 8,  peak: 0.7,  c: "rgba(165,243,252,0.75)" },
  { x: 93, y: 72, d: 13,  delay: 2.4, s: 2, rise: -24, drift: -7, peak: 0.55, c: "rgba(255,45,120,0.55)" },
  { x: 55, y: 65, d: 14,  delay: 3,   s: 3, rise: -38, drift: 6,  peak: 0.75, c: "rgba(41,181,232,0.8)" },
  { x: 25, y: 12, d: 12,  delay: 1,   s: 2, rise: -30, drift: -6, peak: 0.65, c: "rgba(255,255,255,0.5)" },
  { x: 40, y: 55, d: 10.5, delay: 4.2, s: 2, rise: -44, drift: 9,  peak: 0.7,  c: "rgba(34,211,238,0.7)" },
  { x: 68, y: 82, d: 12.5, delay: 5,   s: 3, rise: -32, drift: -8, peak: 0.6,  c: "rgba(41,181,232,0.75)" },
];
