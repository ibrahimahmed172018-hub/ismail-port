"use client";

import React from "react";
import { motion } from "framer-motion";

interface RotatingCurvedTextProps {
  text?: string;
  size?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export function RotatingCurvedText({
  text = "LET'S CREATE SOMETHING GREAT • LET'S CREATE SOMETHING GREAT • ",
  size = 220,
  duration = 18,
  reverse = false,
  className = "",
  textClassName = "fill-white font-black tracking-[0.22em] text-[10.5px] uppercase",
  children
}: RotatingCurvedTextProps) {
  const radius = size * 0.38;
  const center = size / 2;

  // Circular path definition
  const pathData = `
    M ${center}, ${center}
    m -${radius}, 0
    a ${radius},${radius} 0 1,1 ${radius * 2},0
    a ${radius},${radius} 0 1,1 -${radius * 2},0
  `;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Rotating SVG Ring */}
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full absolute inset-0 pointer-events-none"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear"
        }}
      >
        <defs>
          <path id={`circle-path-${size}`} d={pathData} fill="none" />
        </defs>
        <text className={textClassName}>
          <textPath
            href={`#circle-path-${size}`}
            startOffset="0%"
            textLength={`${Math.PI * 2 * radius * 0.96}`}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Center content (e.g. icon, small logo, or avatar) */}
      {children && (
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
