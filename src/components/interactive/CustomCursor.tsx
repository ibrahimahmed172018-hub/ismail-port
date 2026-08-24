"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ultra-tight spring physics for immediate, zero-latency cursor tracking
  const springConfig = { damping: 30, stiffness: 600, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

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

  if (!mounted) return null;

  return (
    <>
      {/* Universal CSS override to guarantee native cursor is 100% hidden */}
      <style jsx global>{`
        *, *::before, *::after, html, body, a, button, input, select, textarea {
          cursor: none !important;
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
          transition={{ type: "spring", damping: 25, stiffness: 450 }}
        >
          {/* Authentic Adobe Photoshop / Illustrator Pen Tool Vector */}
          <div className="relative -translate-x-[0.5px] -translate-y-[0.5px]">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] filter"
            >
              {/* Outer Crisp Stroke Boundary */}
              <path
                d="M1 1 L14 4 L17 12 L12 17 L4 14 L1 1 Z"
                fill="#18181b"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Metallic Nib Body */}
              <path
                d="M1.5 1.5 L13.5 4.3 L16.2 11.8 L11.8 16.2 L4.3 13.5 L1.5 1.5 Z"
                fill={isPointer ? "#ef4444" : "#f4f4f5"}
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="transition-colors duration-200"
              />

              {/* Center Breather Slit Line */}
              <line
                x1="1.5"
                y1="1.5"
                x2="8.5"
                y2="8.5"
                stroke="#18181b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Breather Hole */}
              <circle
                cx="9.2"
                cy="9.2"
                r="1.8"
                fill="#18181b"
                stroke="#ffffff"
                strokeWidth="0.8"
              />

              {/* Pen Shaft / Handle Body */}
              <path
                d="M12.5 16.5 L24 28 L28 24 L16.5 12.5 Z"
                fill="#27272a"
                stroke="#000000"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M13.2 16.8 L23.8 27.4 L27.4 23.8 L16.8 13.2 Z"
                fill="#3f3f46"
              />

              {/* Handle Grip Accent Lines */}
              <line x1="17" y1="17" x2="23" y2="23" stroke="#71717a" strokeWidth="1.2" />

              {/* Photoshop Anchor Point Symbol when Hovering */}
              {isPointer && (
                <g className="animate-pulse">
                  <circle
                    cx="26"
                    cy="8"
                    r="6"
                    fill="#dc2626"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <line x1="26" y1="5" x2="26" y2="11" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="23" y1="8" x2="29" y2="8" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
                </g>
              )}
            </svg>

            {/* Micro Precision Target Dot at (0, 0) */}
            <div
              className={`absolute top-0 left-0 w-1.5 h-1.5 -translate-x-[3px] -translate-y-[3px] rounded-full border ${
                isPointer
                  ? "bg-red-500 border-white shadow-[0_0_10px_#ef4444]"
                  : "bg-white border-black shadow-xs"
              } transition-colors`}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
