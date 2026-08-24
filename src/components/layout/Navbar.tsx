"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, FileText, Download } from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";

interface NavbarProps {
  onOpenResume?: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Services", href: "#services" },
    { label: "Selected Works", href: "#works" },
    { label: "About & Vision", href: "#about" },
    { label: "Creative Process", href: "#process" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center space-x-3 text-white transition duration-300"
          >
            {/* Signature Retina / Ismail Monogram */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center font-black tracking-tighter text-lg border border-red-500/40 shadow-[0_0_20px_rgba(220,38,38,0.4)] group-hover:scale-105 transition-transform">
              <span>IM</span>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center gap-1.5">
                {ISMAIL_DATA.personal.name}
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                {ISMAIL_DATA.personal.agency}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 p-1.5 rounded-full bg-zinc-950/60 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct CTAs: CV Button + WhatsApp */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* View/Download CV Button */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md shadow-md hover:scale-105"
              >
                <FileText className="w-3.5 h-3.5 text-red-500" />
                <span>Resume / CV</span>
              </button>
            )}

            <a
              href={ISMAIL_DATA.personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(220,38,38,0.8)] hover:-translate-y-0.5"
            >
              <span>Let's Create</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-40 p-4 md:hidden"
          >
            <div className="p-6 rounded-3xl bg-zinc-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-3 text-sm font-semibold text-zinc-300 hover:text-white rounded-xl hover:bg-white/10 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10 space-y-2">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenResume();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-zinc-900 border border-white/15 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>View & Download CV</span>
                  </button>
                )}

                <a
                  href={ISMAIL_DATA.personal.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/40"
                >
                  <span>Connect on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
