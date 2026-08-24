"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Paintbrush } from "lucide-react";

interface BrushDustRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  triggerKey?: string | number;
}

export function BrushDustRevealImage({
  src,
  alt,
  className = "",
  delay = 0,
  triggerKey
}: BrushDustRevealImageProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [wiping, setWiping] = useState(true);

  useEffect(() => {
    // Reset and trigger wipe animation whenever triggerKey changes or on mount
    setIsRevealed(false);
    setWiping(true);

    const timer = setTimeout(() => {
      setIsRevealed(true);
      const endTimer = setTimeout(() => {
        setWiping(false);
      }, 1400);
      return () => clearTimeout(endTimer);
    }, delay * 1000 + 150);

    return () => clearTimeout(timer);
  }, [triggerKey, delay]);

  // Particle positions for dust particles
  const particles = [
    { x: "15%", y: "25%", size: 3, delay: 0.1 },
    { x: "35%", y: "60%", size: 4, delay: 0.25 },
    { x: "65%", y: "30%", size: 2.5, delay: 0.4 },
    { x: "80%", y: "75%", size: 3.5, delay: 0.55 },
    { x: "45%", y: "15%", size: 2, delay: 0.2 },
    { x: "20%", y: "80%", size: 4.5, delay: 0.35 },
    { x: "70%", y: "55%", size: 3, delay: 0.5 },
    { x: "90%", y: "20%", size: 2.5, delay: 0.65 }
  ];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 1. Underlying Crystal-Clear Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* 2. Dust & Grunge Masking Layer that gets wiped away */}
      <AnimatePresence>
        {(!isRevealed || wiping) && (
          <motion.div
            initial={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            }}
            animate={{
              clipPath: isRevealed
                ? "polygon(140% -40%, 140% -40%, 140% 140%, 140% 140%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            }}
            transition={{
              duration: 1.1,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="absolute inset-0 z-10 bg-zinc-900/95 backdrop-blur-sm pointer-events-none flex items-center justify-center"
          >
            {/* Grain & Dusty texture simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff18_1px,transparent_1px)] bg-[size:12px_12px] opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-950/95 to-black/90" />

            {/* Floating Dust Particles */}
            {particles.map((p, idx) => (
              <motion.div
                key={idx}
                className="absolute rounded-full bg-zinc-400/60 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size
                }}
                animate={
                  isRevealed
                    ? {
                        opacity: [0.8, 0],
                        y: [-5, -25],
                        x: [0, 15],
                        scale: [1, 1.8]
                      }
                    : {
                        opacity: [0.4, 0.8, 0.4],
                        y: [0, -3, 0]
                      }
                }
                transition={{
                  duration: isRevealed ? 0.8 : 2.5,
                  delay: isRevealed ? p.delay : 0,
                  repeat: isRevealed ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Sweeping Artist Brush Stroke Effect on the leading edge */}
            {isRevealed && (
              <motion.div
                initial={{ left: "-30%", opacity: 0 }}
                animate={{ left: "120%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                className="absolute top-0 bottom-0 w-24 -skew-x-25 bg-gradient-to-r from-transparent via-red-500/40 to-white/60 pointer-events-none shadow-[0_0_30px_rgba(239,68,68,0.8)] z-20 flex items-center justify-center"
              >
                {/* Brush Tip Icon */}
                <div className="p-2 rounded-full bg-red-600 text-white shadow-[0_0_20px_#ef4444] scale-90">
                  <Paintbrush className="w-4 h-4 animate-spin" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Ambient lighting & tag overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}
