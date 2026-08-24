"use client";

import React from "react";
import { ArrowUp, Sparkles, ArrowUpRight } from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "Behance", url: ISMAIL_DATA.personal.behance },
    { name: "Dribbble", url: ISMAIL_DATA.personal.dribbble },
    { name: "Instagram", url: ISMAIL_DATA.personal.instagram },
    { name: "LinkedIn", url: ISMAIL_DATA.personal.linkedin }
  ];

  return (
    <footer className="relative bg-transparent text-white border-t border-white/10 overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-red-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-950 flex items-center justify-center font-black text-white text-base border border-red-500/40">
                IM
              </div>
              <div>
                <div className="font-extrabold text-lg uppercase tracking-wider">
                  {ISMAIL_DATA.personal.name}
                </div>
                <div className="text-xs text-zinc-400 font-medium">
                  {ISMAIL_DATA.personal.jobTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-zinc-900 border border-white/10 hover:border-red-500/50 hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition flex items-center space-x-1.5"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-3 h-3 text-red-500" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-red-500/50 hover:bg-zinc-800 text-white transition-all duration-300 hover:scale-105"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {ISMAIL_DATA.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Retina Creative Agency • High-Impact Brand Direction</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
