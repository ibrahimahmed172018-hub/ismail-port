"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Palette, Video, FileText, Download, Users } from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";
import { HeroInteractivePhoto } from "@/components/interactive/HeroInteractivePhoto";

interface HeroSectionProps {
  onOpenResume?: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  return (
    <section id="overview" className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-transparent text-white flex flex-col justify-between">
      {/* Dynamic Crimson & Red Studio Glow Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-red-600/30 via-red-900/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-600/15 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[400px] bg-red-950/20 blur-[130px] pointer-events-none -z-10" />

      {/* Grid Pattern Floor Layer */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[380px] bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex flex-col justify-center">
        {/* Top Header Tagline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Retina Creative Agency • Founder & Creative Director</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] uppercase"
          >
            Crafting <span className="bg-gradient-to-r from-white via-zinc-200 to-red-500 bg-clip-text text-transparent">Visionary</span> Brands & Media
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {ISMAIL_DATA.personal.bio}
          </motion.p>
        </div>

        {/* Centerpiece Hero Showcase: The Real Image with Interactive 3D Movement */}
        <div className="relative max-w-4xl mx-auto w-full my-4">
          <HeroInteractivePhoto />

          {/* Floating Interactive Badge (Top Left) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:flex absolute -left-4 top-12 p-4 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl items-center space-x-3.5 z-30"
          >
            <div className="p-3 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Senior Designer</div>
              <div className="text-[11px] text-zinc-400">8+ Years • 800+ Clients</div>
            </div>
          </motion.div>

          {/* Floating Interactive Badge (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hidden lg:flex absolute -right-4 top-20 p-4 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl items-center space-x-3.5 z-30"
          >
            <div className="p-3 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Creative Leadership</div>
              <div className="text-[11px] text-zinc-400">20-Member Agency Team</div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons & Core Stats */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 z-20">
          <a
            href="#works"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:shadow-[0_0_45px_rgba(220,38,38,0.9)] hover:-translate-y-0.5 text-center"
          >
            Explore Portfolio
          </a>

          {/* View/Download CV Button */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2 text-center hover:scale-105 shadow-md"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>View & Download CV</span>
            </button>
          )}

          <a
            href={ISMAIL_DATA.personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2 text-center"
          >
            <span>Let's Talk Business</span>
            <ArrowUpRight className="w-4 h-4 text-red-400" />
          </a>
        </div>

        {/* Key Metrics Strip Matching Official CV */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full pt-8 border-t border-white/10">
          <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-red-500">8+</div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Years Experience</div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-white">800+</div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Clients Served</div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-red-500">20</div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Creative Team Led</div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-white">4th Year</div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mt-1">Tanta University Med</div>
          </div>
        </div>
      </div>
    </section>
  );
}
