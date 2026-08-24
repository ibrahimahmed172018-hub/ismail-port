"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";

export function ProcessSection() {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow & Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            How Vision Becomes <span className="text-red-500">Reality</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            A structured, 4-stage creative pipeline engineered for rapid iteration and world-class polish.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ISMAIL_DATA.creativeProcess.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-black border border-white/10 hover:border-red-500/40 transition-all duration-300 space-y-4 group"
            >
              <div className="text-4xl font-black text-red-500/80 group-hover:text-red-500 transition-colors">
                {step.step}
              </div>
              <h3 className="text-lg font-bold uppercase text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
