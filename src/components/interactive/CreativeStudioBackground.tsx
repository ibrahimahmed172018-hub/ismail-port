"use client";

import React, { useEffect, useRef, useState } from "react";

export function CreativeStudioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Mouse/Touch tracking with throttling
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

    // 1. Primary Bezier Curve (Upper)
    const curve1NodesCount = isMobile ? 4 : 5;
    const curve1 = Array.from({ length: curve1NodesCount }, (_, i) => ({
      x: (width / (curve1NodesCount - 1)) * i,
      y: height * 0.3,
      targetY: height * 0.3,
      angle: i * 0.8,
      speed: 0.012 + i * 0.003,
      h1x: 0,
      h1y: 0,
      h2x: 0,
      h2y: 0
    }));

    // 2. Secondary Bezier Curve (Lower - desktop only)
    const curve2NodesCount = 4;
    const curve2 = Array.from({ length: curve2NodesCount }, (_, i) => ({
      x: (width / (curve2NodesCount - 1)) * i,
      y: height * 0.75,
      targetY: height * 0.75,
      angle: i * 1.1 + Math.PI,
      speed: 0.014 + i * 0.002,
      h1x: 0,
      h1y: 0,
      h2x: 0,
      h2y: 0
    }));

    // 3. Fluid Brush Ribbons (1 on mobile, 3 on desktop)
    const ribbons = isMobile
      ? [{ color: "rgba(239, 68, 68, 0.35)", width: 2.5, speed: 0.002, amp: 60, yRatio: 0.45 }]
      : [
          { color: "rgba(239, 68, 68, 0.4)", width: 3.5, speed: 0.002, amp: 100, yRatio: 0.38 },
          { color: "rgba(220, 38, 38, 0.3)", width: 2, speed: 0.0025, amp: 80, yRatio: 0.52 },
          { color: "rgba(255, 255, 255, 0.15)", width: 1.2, speed: 0.0015, amp: 110, yRatio: 0.68 }
        ];

    // 4. Floating Particles (8 on mobile, 20 on desktop)
    const inkDroplets = Array.from({ length: isMobile ? 8 : 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 2,
      alpha: 0.3 + Math.random() * 0.4,
      vy: -0.3 - Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.2
    }));

    let time = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = now - lastTime;
      if (delta < (isMobile ? 22 : 15)) return; // 45 FPS on mobile to save CPU/battery, 60 FPS on desktop
      lastTime = now;

      time += 1;
      ctx.clearRect(0, 0, width, height);

      // --- A. Draw Brush Waves ---
      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;
        ctx.lineCap = "round";

        const baseY = height * ribbon.yRatio;
        const step = isMobile ? 40 : 25;

        for (let x = 0; x <= width; x += step) {
          const wave = Math.sin(x * 0.0025 + time * ribbon.speed) * ribbon.amp;
          const secondaryWave = Math.cos(x * 0.0012 - time * ribbon.speed * 0.8) * (ribbon.amp * 0.4);

          let mouseAttract = 0;
          if (isInteracting) {
            const dist = Math.abs(x - mouseX);
            if (dist < 250) {
              mouseAttract = (1 - dist / 250) * (mouseY - baseY) * 0.15;
            }
          }

          const y = baseY + wave + secondaryWave + mouseAttract;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // --- B. Draw Live Bezier Pen Splines ---
      const drawBezierCurve = (nodesList: typeof curve1, isLead = true) => {
        for (let i = 0; i < nodesList.length; i++) {
          const node = nodesList[i];
          node.angle += node.speed;
          node.y = node.targetY + Math.sin(node.angle) * (height * 0.14);
          node.x = (width / (nodesList.length - 1)) * i + Math.cos(node.angle * 0.8) * 25;

          const handleLength = (isMobile ? 50 : 75) + Math.sin(time * 0.02 + i) * 15;
          const handleAngle = node.angle + Math.PI / 4;
          node.h1x = node.x - Math.cos(handleAngle) * handleLength;
          node.h1y = node.y - Math.sin(handleAngle) * handleLength;
          node.h2x = node.x + Math.cos(handleAngle) * handleLength;
          node.h2y = node.y + Math.sin(handleAngle) * handleLength;
        }

        ctx.beginPath();
        ctx.strokeStyle = isLead ? "#ef4444" : "rgba(239, 68, 68, 0.7)";
        ctx.lineWidth = isLead ? 2.5 : 1.8;
        ctx.moveTo(nodesList[0].x, nodesList[0].y);
        for (let i = 0; i < nodesList.length - 1; i++) {
          const curr = nodesList[i];
          const next = nodesList[i + 1];
          ctx.bezierCurveTo(curr.h2x, curr.h2y, next.h1x, next.h1y, next.x, next.y);
        }
        ctx.stroke();

        // Direction Handles & Anchor Knots
        for (let i = 0; i < nodesList.length; i++) {
          const node = nodesList[i];

          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.moveTo(node.h1x, node.h1y);
          ctx.lineTo(node.x, node.y);
          ctx.lineTo(node.h2x, node.h2y);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.fillStyle = "#ef4444";
          ctx.arc(node.h1x, node.h1y, 3, 0, Math.PI * 2);
          ctx.arc(node.h2x, node.h2y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#dc2626";
          ctx.lineWidth = 1.5;
          ctx.fillRect(node.x - 4, node.y - 4, 8, 8);
          ctx.strokeRect(node.x - 4, node.y - 4, 8, 8);
        }

        // Active Drawing Pen Nib
        const leadNode = nodesList[Math.floor((time * 0.008) % nodesList.length)];
        if (leadNode) {
          ctx.save();
          ctx.translate(leadNode.x, leadNode.y);
          ctx.rotate(Math.sin(time * 0.04) * 0.3);

          ctx.beginPath();
          ctx.fillStyle = "#18181b";
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 1.5;
          ctx.moveTo(0, 0);
          ctx.lineTo(-8, -15);
          ctx.lineTo(-4, -20);
          ctx.lineTo(4, -20);
          ctx.lineTo(8, -15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = "#ef4444";
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      };

      drawBezierCurve(curve1, true);
      if (!isMobile) {
        drawBezierCurve(curve2, false);
      }

      // --- C. Floating Particles ---
      inkDroplets.forEach((drop) => {
        drop.y += drop.vy;
        drop.x += drop.vx;

        if (drop.y < -10) {
          drop.y = height + 10;
          drop.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(239, 68, 68, ${drop.alpha})`;
        ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#ef444415_1px,transparent_1px)] bg-[size:36px_36px] opacity-50" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
}
