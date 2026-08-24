"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Tag, Sparkles, MessageSquare, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProjectItem, ISMAIL_DATA } from "@/data/portfolio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const whatsappInquiryUrl = `https://wa.me/201009341107?text=${encodeURIComponent(
    `Hello Ismail! I'm interested in discussing a project similar to: "${project.title}" (${project.category}).`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Deep Studio Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Master Container - Perfectly Proportioned 2-Column Studio Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl h-[92vh] max-h-[820px] bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(220,38,38,0.25)] z-10 flex flex-col lg:flex-row my-auto"
        >
          {/* Floating Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 rounded-full bg-zinc-900/90 hover:bg-red-600 text-white border border-white/20 z-40 transition-all duration-300 shadow-xl hover:scale-105"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: High-Resolution Artwork Showcase (60% width on Desktop) */}
          <div className="relative w-full lg:w-[62%] h-[45%] lg:h-full bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 group">
            {/* Ambient Red Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/40 via-transparent to-transparent pointer-events-none" />

            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover lg:object-contain p-0 lg:p-4 select-none"
              priority
            />

            {/* Category Tag Badge */}
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center space-x-1.5 z-20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </div>

            {/* Bottom Subtle Watermark */}
            <div className="absolute bottom-4 left-4 hidden sm:block text-[11px] text-zinc-500 font-semibold tracking-wider uppercase z-20">
              {ISMAIL_DATA.personal.agency} • High-Resolution Artwork
            </div>
          </div>

          {/* Right Column: Editorial Details & Action Sidebar (38% width on Desktop) */}
          <div className="w-full lg:w-[38%] h-[55%] lg:h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-zinc-950 space-y-6">
            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>{project.categoryAr}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Project Story / Concept */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Project Overview & Concept
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Metadata Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3 text-red-500" />
                    <span>Client / Brand</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white truncate">
                    {project.client}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-red-500" />
                    <span>Year of Launch</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Deliverables & Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Direct Action Button */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center space-x-2 text-center hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Similar Project on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="text-center text-[11px] text-zinc-500 font-medium">
                Direct brief with Ismail Mohamed • Response within 24h
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
