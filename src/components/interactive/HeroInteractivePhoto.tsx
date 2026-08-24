"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ISMAIL_DATA } from "@/data/portfolio";

export function HeroInteractivePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        window.innerWidth < 768
    );
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full my-6 flex items-center justify-center [perspective:1200px]">
      {/* Background ambient red glow */}
      <div className="absolute inset-0 bg-red-600/20 blur-[80px] rounded-full pointer-events-none -z-10" />

      {/* 3D Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          isTouch
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }
        }
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[620px] aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] rounded-3xl overflow-hidden border-2 border-red-500/40 shadow-[0_0_50px_rgba(220,38,38,0.3)] bg-black cursor-pointer group"
      >
        {/* The Hero Photo with priority loading */}
        <Image
          src={ISMAIL_DATA.personal.heroImage}
          alt="Ismail Mohamed - Senior Graphic Designer & Creative Director"
          fill
          priority
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 600px, 620px"
          className="object-cover object-center scale-100 group-hover:scale-103 transition-transform duration-500 select-none pointer-events-none"
        />

        {/* Dynamic Light Glare on Desktop only */}
        {!isTouch && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 70%)`
            }}
          />
        )}

        {/* Border Overlay */}
        <div className="absolute inset-0 rounded-3xl border border-white/15 pointer-events-none" />
      </motion.div>
    </div>
  );
}
