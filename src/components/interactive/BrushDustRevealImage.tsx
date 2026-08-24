"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush } from "lucide-react";

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
  const [isInView, setIsInView] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [wiping, setWiping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Trigger reveal ONLY when element enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Play the brush sweep animation when in view
  useEffect(() => {
    if (!isInView) return;

    setIsRevealed(false);
    setWiping(true);

    const timer = setTimeout(() => {
      setIsRevealed(true);
      const endTimer = setTimeout(() => {
        setWiping(false);
      }, 900);
      return () => clearTimeout(endTimer);
    }, delay * 1000 + 80);

    return () => clearTimeout(timer);
  }, [isInView, triggerKey, delay]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Underlying Image with direct lazy loading and async decoding */}
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dust & Brush Masking Overlay */}
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
              duration: 0.85,
              ease: [0.65, 0, 0.35, 1]
            }}
            className="absolute inset-0 z-10 bg-zinc-900/90 pointer-events-none flex items-center justify-center will-change-transform"
          >
            {/* Grainy Dust Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/80 via-zinc-950/90 to-black/80" />

            {/* Sweeping Brush Stroke Line */}
            {isRevealed && (
              <motion.div
                initial={{ left: "-30%", opacity: 0 }}
                animate={{ left: "120%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                className="absolute top-0 bottom-0 w-20 -skew-x-25 bg-gradient-to-r from-transparent via-red-500/50 to-white/70 pointer-events-none shadow-[0_0_25px_rgba(239,68,68,0.7)] z-20 flex items-center justify-center"
              >
                <div className="p-1.5 rounded-full bg-red-600 text-white shadow-[0_0_15px_#ef4444]">
                  <Paintbrush className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Bottom Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />
    </div>
  );
}
