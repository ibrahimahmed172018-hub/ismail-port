"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, Package, TrendingUp, Layers, Film, ArrowUpRight, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import { ISMAIL_DATA, CategoryPortfolio } from "@/data/portfolio";

export function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Palette: <Palette className="w-6 h-6" />,
    Package: <Package className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Film: <Film className="w-6 h-6" />
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent text-white overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Disciplines & Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Creative <span className="text-red-500">Execution</span> Pillars
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            From comprehensive brand identities to high-conversion digital marketing, packaging, and full-scale motion graphics.
          </p>
        </div>

        {/* Categories / Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ISMAIL_DATA.categories.map((service, index) => {
            const whatsappUrl = `https://wa.me/201009341107?text=${encodeURIComponent(service.message)}`;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-zinc-950 border border-white/10 hover:border-red-500/50 transition-all duration-500 flex flex-col justify-between space-y-8 overflow-hidden hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
              >
                {/* Background gradient on hover */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-red-600/10 blur-3xl group-hover:bg-red-600/20 transition-all duration-500 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* Header Icon + Number */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-red-950/80 text-red-500 border border-red-500/30 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-lg">
                      {iconMap[service.icon] || <Palette className="w-6 h-6" />}
                    </div>
                    <span className="text-2xl font-black text-zinc-800 group-hover:text-red-500/40 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>
                    <div className="text-xs font-semibold text-zinc-400">
                      {service.titleAr}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="pt-2 text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{service.images.length} نماذج وتصاميم في المعرض</span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <a
                    href="#works"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>View Gallery</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-600 text-zinc-400 hover:text-white transition-all shadow-sm"
                    title="Discuss on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
