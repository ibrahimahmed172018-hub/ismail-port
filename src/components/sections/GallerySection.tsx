"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Paintbrush, ArrowUpRight, MessageSquare, Maximize2, X, FileText, Download, BookOpen, Eye } from "lucide-react";
import { ISMAIL_DATA, CategoryPortfolio } from "@/data/portfolio";
import { BrushDustRevealImage } from "@/components/interactive/BrushDustRevealImage";
import { PdfViewerModal } from "@/components/interactive/PdfViewerModal";

export function GallerySection() {
  const [selectedKey, setSelectedKey] = useState<string>("branding-identity");
  const [wipeTrigger, setWipeTrigger] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);

  const activeCategory: CategoryPortfolio =
    ISMAIL_DATA.categories.find((c) => c.key === selectedKey) || ISMAIL_DATA.categories[0];

  const handleCategorySelect = (key: string) => {
    setSelectedKey(key);
    setWipeTrigger((prev) => prev + 1);
  };

  const handleManualBrushSweep = () => {
    setWipeTrigger((prev) => prev + 1);
  };

  const whatsappInquiryUrl = `https://wa.me/201009341107?text=${encodeURIComponent(activeCategory.message)}`;

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent text-white overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-red-600/10 blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-red-950/15 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Client Exhibition • Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Selected <span className="text-red-500">Portfolio</span> Gallery
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Explore authentic branding identities, vector marks, and visual design assets.
            </p>
          </div>

          {/* Re-sweep Brush Button */}
          <button
            onClick={handleManualBrushSweep}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-white/15 hover:border-red-500/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group shrink-0"
          >
            <Paintbrush className="w-4 h-4 text-red-500 group-hover:rotate-45 transition-transform" />
            <span>Re-sweep Dust (مسح الغبار)</span>
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ISMAIL_DATA.categories.map((cat) => {
            const isActive = selectedKey === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={`px-7 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center gap-0.5 ${
                  isActive
                    ? "bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] scale-105"
                    : "bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                }`}
              >
                <span className="text-sm font-black">{cat.title}</span>
                <span className={`text-[11px] font-medium ${isActive ? "text-red-100" : "text-zinc-500"}`}>
                  {cat.titleAr} ({cat.images.length} تصاميم + ملف PDF)
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Header Card with Actions */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/85 border border-white/10 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>{activeCategory.titleAr}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              {activeCategory.title}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {activeCategory.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {activeCategory.pdfAttachment && (
              <button
                onClick={() => setIsPdfOpen(true)}
                className="px-5 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-md hover:scale-105"
              >
                <BookOpen className="w-4 h-4 text-red-400" />
                <span>Open Logo Process (PDF)</span>
              </button>
            )}

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-red-600/40 flex items-center justify-center space-x-2 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ناقش مشروعك في هذا القسم</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Masonry Gallery with Brush Dust Reveal & Featured PDF Card */}
        <motion.div
          key={`${selectedKey}-${wipeTrigger}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
        >
          {/* 1. Featured Interactive PDF Document Card */}
          {activeCategory.pdfAttachment && (
            <div
              onClick={() => setIsPdfOpen(true)}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden border-2 border-red-500/50 hover:border-red-500 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-[0_0_45px_rgba(220,38,38,0.4)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-4 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/40 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-lg">
                    <FileText className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                    Interactive PDF Guide
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                    Logo Design Process
                  </h4>
                  <p className="text-xs text-zinc-400 font-semibold mt-1">
                    دليل ومراحل تصميم وبناء الشعار الاحترافي
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  وثيقة شاملة توضح منهجية البحث، التخطيط السكتش، والتشريح الهندسي لبناء الهويات البصرية والشعارات المتقنة.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-red-400 group-hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>انقر لعرض وتصفح الـ PDF</span>
                </div>
                <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-red-600 text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* 2. Gallery Image Cards */}
          {activeCategory.images.map((imgUrl, index) => (
            <div
              key={`${imgUrl}-${index}`}
              onClick={() => setLightboxImage(imgUrl)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/60 bg-zinc-950 shadow-xl cursor-pointer transition-all duration-500 hover:shadow-[0_0_35px_rgba(220,38,38,0.3)]"
            >
              {/* Brush Dust Image Component */}
              <div className="relative w-full aspect-[4/3] sm:aspect-auto min-h-[260px] bg-black">
                <BrushDustRevealImage
                  src={imgUrl}
                  alt={`${activeCategory.title} piece ${index + 1}`}
                  className="w-full h-auto min-h-[260px]"
                  delay={(index % 6) * 0.1}
                  triggerKey={`${selectedKey}-${wipeTrigger}`}
                />

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs z-20">
                  <div className="p-3.5 rounded-full bg-red-600 text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300 flex items-center space-x-2">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-20">
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen High-Res Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-black/92 backdrop-blur-2xl"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[84vh] w-full bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden z-20 flex flex-col items-center justify-between shadow-[0_0_80px_rgba(220,38,38,0.3)] my-auto"
            >
              {/* Top Bar */}
              <div className="w-full px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/60 z-30">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {activeCategory.title} • {activeCategory.titleAr}
                  </span>
                </div>

                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Center Image */}
              <div className="relative w-full h-[58vh] max-h-[540px] bg-black flex items-center justify-center p-2 sm:p-4">
                <Image
                  src={lightboxImage}
                  alt="High-resolution artwork"
                  fill
                  className="object-contain select-none"
                  priority
                />
              </div>

              {/* Bottom Bar */}
              <div className="w-full px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/80 z-30">
                <div className="text-xs text-zinc-400 font-medium text-center sm:text-left">
                  هل أعجبك هذا العمل وترغب في تنفيذ هوية بصرية مماثلة؟
                </div>

                <a
                  href={`https://wa.me/201009341107?text=${encodeURIComponent(
                    `مرحباً إسماعيل، أود مناقشة تصميم هوية بصرية مماثلة لهذا العمل من معرض ${activeCategory.titleAr}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-lg shadow-red-600/30 hover:scale-105"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>اطلب تصميماً مشابهاً عبر واتساب</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* In-App Interactive PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl="/branding-identity/Logo Design Process.pdf"
        title="Logo Design Process Guide"
        subtitle="دليل ومنهجية بناء الشعار والهوية البصرية — إسماعيل محمد"
      />
    </section>
  );
}
