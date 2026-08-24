"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ultra-tight spring physics for immediate, zero-latency cursor tracking
  const springConfig = { damping: 32, stiffness: 650, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate custom cursor on non-touch desktop devices
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      window.innerWidth < 1024;

    if (isTouch) return;
    setIsDesktop(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("button, a, input, textarea, select, [role='button'], [data-cursor-hover], .cursor-pointer");
        setIsPointer(!!clickable);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Universal CSS override for desktop only */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          *, *::before, *::after, html, body, a, button, input, select, textarea {
            cursor: none !important;
          }
        }
      `}</style>

      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[2147483647] overflow-hidden select-none">
        {/* Photoshop Pen Tool Master Wrapper */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none origin-top-left"
          style={{
            x: smoothX,
            y: smoothY,
            scale: isClicked ? 0.88 : isPointer ? 1.1 : 1
          }}
        >
          {/* Active Red Glowing Anchor Point Crosshair indicator on hover */}
          {isPointer && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-3.5 -left-3.5 pointer-events-none"
            >
              {/* Pulsing Red Bezier Anchor Box */}
              <div className="w-7 h-7 rounded-lg border-2 border-red-500 bg-red-600/25 shadow-[0_0_20px_#ef4444] animate-pulse flex items-center justify-center">
                <span className="text-[12px] font-black text-red-400 select-none leading-none -mt-0.5">+</span>
              </div>
            </motion.div>
          )}

          {/* Authentic Adobe Photoshop Pen Tool Fountain Nib Vector */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
            style={{
              transformOrigin: "0 0"
            }}
          >
            {/* Nib Tip Highlight Glow */}
            <circle cx="1.5" cy="1.5" r="1.5" fill="#EF4444" className="animate-ping opacity-75" />
            <circle cx="1.5" cy="1.5" r="1.5" fill="#FFFFFF" />

            {/* Main Outer Metal Feather / Body */}
            <path
              d="M1 1 L16 8 L24 23 L9 15 Z"
              fill="url(#penMetalDark)"
              stroke="#52525B"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Left Polished Metallic Blade */}
            <path
              d="M1 1 L16 8 L13 18 Z"
              fill="url(#penSilverShine)"
              stroke="#71717A"
              strokeWidth="0.8"
            />

            {/* Right Darker Metallic Blade */}
            <path
              d="M1 1 L9 15 L13 18 Z"
              fill="#27272A"
              stroke="#3F3F46"
              strokeWidth="0.8"
            />

            {/* Center Ink Slit Line */}
            <line
              x1="1"
              y1="1"
              x2="13"
              y2="18"
              stroke="#EF4444"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Breather Hole (Central Ring) */}
            <circle
              cx="13"
              cy="18"
              r="2.5"
              fill="#18181B"
              stroke="#EF4444"
              strokeWidth="1.5"
            />
            <circle cx="13" cy="18" r="1" fill="#FFFFFF" />

            {/* Upper Pen Collar (Crimson Studio Brand Ring) */}
            <path
              d="M16 8 L22 11 L24 23 L18 20 Z"
              fill="#DC2626"
              stroke="#EF4444"
              strokeWidth="0.8"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="penMetalDark" x1="1" y1="1" x2="24" y2="23" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FAFAFA" />
                <stop offset="25%" stopColor="#A1A1AA" />
                <stop offset="70%" stopColor="#3F3F46" />
                <stop offset="100%" stopColor="#18181B" />
              </linearGradient>

              <linearGradient id="penSilverShine" x1="1" y1="1" x2="16" y2="18" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E4E4E7" />
                <stop offset="100%" stopColor="#71717A" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </>
  );
}
