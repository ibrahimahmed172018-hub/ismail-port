"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroInteractivePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full my-6 flex items-center justify-center [perspective:1200px]">
      {/* Background ambient red glow pulse */}
      <div className="absolute inset-0 bg-red-600/20 blur-[90px] rounded-full pointer-events-none -z-10 animate-pulse" />

      {/* 3D Tilting Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
        }}
        className="relative w-full max-w-[620px] aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-[0_0_60px_rgba(220,38,38,0.35)] bg-black cursor-pointer group"
      >
        {/* The Clean Hero Photo directly from Ismail */}
        <Image
          src="/ismail_hero.jpg"
          alt="Ismail Mohamed - Let's Create Something Great"
          fill
          className="object-cover object-center scale-100 group-hover:scale-103 transition-transform duration-700 select-none pointer-events-none"
          priority
        />

        {/* Dynamic Light Reflection Glare on Mouse Move */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 70%)`
          }}
        />

        {/* Border High-Light Overlay */}
        <div className="absolute inset-0 rounded-3xl border border-white/15 pointer-events-none" />
      </motion.div>
    </div>
  );
}
