"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CreativeStudioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse/Touch tracking for interactive magnetic pull
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isInteracting = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isInteracting = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isInteracting = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // 1. Primary Live Bezier Curve 1 (Upper Horizon)
    const curve1NodesCount = 5;
    const curve1 = Array.from({ length: curve1NodesCount }, (_, i) => ({
      x: (width / (curve1NodesCount - 1)) * i,
      y: height * 0.25 + Math.sin(i * 1.5) * 120,
      targetY: height * 0.25,
      angle: i * 0.8,
      speed: 0.012 + i * 0.003,
      h1x: 0,
      h1y: 0,
      h2x: 0,
      h2y: 0
    }));

    // 2. Secondary Live Bezier Curve 2 (Lower Horizon)
    const curve2NodesCount = 5;
    const curve2 = Array.from({ length: curve2NodesCount }, (_, i) => ({
      x: (width / (curve2NodesCount - 1)) * i,
      y: height * 0.72 + Math.cos(i * 1.2) * 140,
      targetY: height * 0.72,
      angle: i * 1.1 + Math.PI,
      speed: 0.015 + i * 0.002,
      h1x: 0,
      h1y: 0,
      h2x: 0,
      h2y: 0
    }));

    // 3. Fluid Brush Flow Waves (Ribbons)
    const ribbons = [
      { color: "rgba(239, 68, 68, 0.45)", width: 4, speed: 0.002, amp: 110, yRatio: 0.38 },
      { color: "rgba(220, 38, 38, 0.35)", width: 2.5, speed: 0.0028, amp: 90, yRatio: 0.52 },
      { color: "rgba(255, 255, 255, 0.2)", width: 1.5, speed: 0.0016, amp: 130, yRatio: 0.68 }
    ];

    // 4. Floating Ink & Ember Droplets
    const inkDroplets = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      alpha: 0.3 + Math.random() * 0.6,
      vy: -0.3 - Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.4
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // --- A. Draw Fluid Brush Ribbons ---
      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;
        ctx.lineCap = "round";
        ctx.shadowColor = "rgba(239, 68, 68, 0.5)";
        ctx.shadowBlur = 15;

        const baseY = height * ribbon.yRatio;

        for (let x = 0; x <= width; x += 20) {
          const wave = Math.sin(x * 0.0025 + time * ribbon.speed) * ribbon.amp;
          const secondaryWave = Math.cos(x * 0.0012 - time * ribbon.speed * 0.8) * (ribbon.amp * 0.4);

          let mouseAttract = 0;
          if (isInteracting) {
            const dist = Math.abs(x - mouseX);
            if (dist < 350) {
              mouseAttract = (1 - dist / 350) * (mouseY - baseY) * 0.22;
            }
          }

          const y = baseY + wave + secondaryWave + mouseAttract;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.shadowBlur = 0;

      // --- B. Helper function to animate & render a Live Bezier Pen Curve ---
      const drawBezierCurve = (nodesList: typeof curve1, isLeadCurve = true) => {
        // Update nodes
        for (let i = 0; i < nodesList.length; i++) {
          const node = nodesList[i];
          node.angle += node.speed;
          node.y = node.targetY + Math.sin(node.angle) * (height * 0.18);
          node.x = (width / (nodesList.length - 1)) * i + Math.cos(node.angle * 0.8) * 35;

          const handleLength = 80 + Math.sin(time * 0.02 + i) * 25;
          const handleAngle = node.angle + Math.PI / 4;
          node.h1x = node.x - Math.cos(handleAngle) * handleLength;
          node.h1y = node.y - Math.sin(handleAngle) * handleLength;
          node.h2x = node.x + Math.cos(handleAngle) * handleLength;
          node.h2y = node.y + Math.sin(handleAngle) * handleLength;
        }

        // 1. Draw glowing curve path
        ctx.beginPath();
        ctx.strokeStyle = isLeadCurve ? "#ef4444" : "rgba(239, 68, 68, 0.75)";
        ctx.lineWidth = isLeadCurve ? 3 : 2;
        ctx.shadowColor = "#ef4444";
        ctx.shadowBlur = 18;

        ctx.moveTo(nodesList[0].x, nodesList[0].y);
        for (let i = 0; i < nodesList.length - 1; i++) {
          const curr = nodesList[i];
          const next = nodesList[i + 1];
          ctx.bezierCurveTo(curr.h2x, curr.h2y, next.h1x, next.h1y, next.x, next.y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 2. Draw Illustrator/Photoshop Direction Handles & Anchor Points
        for (let i = 0; i < nodesList.length; i++) {
          const node = nodesList[i];

          // Dotted Direction Handle Lines
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.moveTo(node.h1x, node.h1y);
          ctx.lineTo(node.x, node.y);
          ctx.lineTo(node.h2x, node.h2y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Direction Endpoints (Red circles 'o')
          ctx.beginPath();
          ctx.fillStyle = "#ef4444";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.arc(node.h1x, node.h1y, 4, 0, Math.PI * 2);
          ctx.arc(node.h2x, node.h2y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Anchor Point Box (White square with red outline '■')
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#dc2626";
          ctx.lineWidth = 2;
          ctx.fillRect(node.x - 5, node.y - 5, 10, 10);
          ctx.strokeRect(node.x - 5, node.y - 5, 10, 10);
        }

        // 3. Draw Active Drawing Pen Tool at the lead node
        const activeKnotIdx = Math.floor((time * 0.008) % nodesList.length);
        const leadNode = nodesList[activeKnotIdx];
        if (leadNode) {
          ctx.save();
          ctx.translate(leadNode.x, leadNode.y);
          ctx.rotate(Math.sin(time * 0.04) * 0.4);

          // Pen Nib Shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
          ctx.shadowBlur = 12;

          // Pen Nib Body
          ctx.beginPath();
          ctx.fillStyle = "#18181b";
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(-12, -22);
          ctx.lineTo(-6, -28);
          ctx.lineTo(6, -28);
          ctx.lineTo(12, -22);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Metallic Nib Center Slit
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -16);
          ctx.stroke();

          // Breather Hole
          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.arc(0, -16, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Glowing tip spark
          ctx.beginPath();
          ctx.fillStyle = "#ef4444";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 10;
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      };

      // Draw both curves
      drawBezierCurve(curve1, true);
      drawBezierCurve(curve2, false);

      // --- C. Update & Draw Floating Ink Droplets ---
      inkDroplets.forEach((drop) => {
        drop.y += drop.vy;
        drop.x += drop.vx;

        if (drop.y < -10) {
          drop.y = height + 10;
          drop.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(239, 68, 68, ${drop.alpha})`;
        ctx.shadowColor = "rgba(239, 68, 68, 0.8)";
        ctx.shadowBlur = 6;
        ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {/* 1. Dynamic 60 FPS HTML5 Canvas - Vivid & Crystal Clear */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Photoshop Design Grid Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#ef444420_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />

      {/* 3. Floating Graphic Design HUD Marks in Viewport Corners */}
      <div className="absolute top-24 left-6 hidden md:flex items-center space-x-2 text-[11px] font-mono text-zinc-500 uppercase tracking-widest bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-zinc-300">PEN TOOL LIVE: CUBIC-BEZIER ENGINE</span>
      </div>

      <div className="absolute bottom-6 right-6 hidden md:flex flex-col space-y-1 text-[10px] font-mono text-zinc-400 uppercase tracking-wider bg-black/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md text-right">
        <div className="text-red-400 font-bold">CANVAS 4K • 300 DPI • RGB 16-BIT</div>
        <div>VECTOR MESH: ACTIVE & SYNCD</div>
      </div>

      {/* 4. Ambient Studio Glow Flares */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-red-950/20 rounded-full blur-[200px] pointer-events-none" />
    </div>
  );
}
