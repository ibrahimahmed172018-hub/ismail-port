"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroOrbitRing() {
  return (
    <div className="absolute inset-x-0 bottom-6 sm:bottom-10 md:bottom-14 flex items-center justify-center pointer-events-none z-20 select-none">
      {/* 3D Tilted Container for In-Place Movement */}
      <motion.div
        className="relative w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] flex items-center justify-center"
        style={{
          transform: "rotateX(68deg) rotateZ(-8deg)",
          transformStyle: "preserve-3d"
        }}
        animate={{
          y: [0, -10, 0],
          rotateZ: [-10, -6, -10],
          scale: [1, 1.02, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut"
        }}
      >
        {/* Subtle glowing curved shadow ring on the floor */}
        <div className="absolute inset-x-8 bottom-4 h-12 bg-red-600/30 blur-2xl rounded-full" />

        {/* Single curved sentence animated in place */}
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full absolute inset-0 overflow-visible"
        >
          <defs>
            {/* Lower perspective arc path matching the exact curvature of the photo */}
            <path
              id="hero-arc-path"
              d="M 80,300 A 220,220 0 0,0 520,300"
              fill="none"
            />
          </defs>

          {/* Single Curved Text with smooth in-place subtle shift and glow */}
          <motion.text
            className="fill-white font-black tracking-[0.24em] text-[26px] sm:text-[32px] md:text-[36px] uppercase drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]"
            animate={{
              opacity: [0.92, 1, 0.92]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            <textPath
              href="#hero-arc-path"
              startOffset="50%"
              textAnchor="middle"
            >
              LET'S CREATE SOMETHING GREAT
            </textPath>
          </motion.text>
        </svg>
      </motion.div>
    </div>
  );
}
