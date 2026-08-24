"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, Sparkles, MessageSquare } from "lucide-react";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  subtitle?: string;
}

export function PdfViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  subtitle
}: PdfViewerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = title.endsWith(".pdf") ? title : `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[900] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative max-w-5xl h-[88vh] w-full bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden z-20 flex flex-col justify-between shadow-[0_0_90px_rgba(220,38,38,0.35)] my-auto"
        >
          {/* Header */}
          <div className="w-full px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/80 z-30">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-zinc-400 font-medium">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-md shadow-red-600/30 hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                title="Open PDF in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-600 text-white transition"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded PDF Interactive Reader */}
          <div className="relative w-full flex-1 bg-zinc-900 overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              title={title}
              className="w-full h-full border-0"
            />
          </div>

          {/* Bottom Bar */}
          <div className="w-full px-6 py-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/90 z-30">
            <div className="text-xs text-zinc-400 font-medium text-center sm:text-left">
              دليل خطوات وبناء الشعار والهوية البصرية — إسماعيل محمد
            </div>

            <a
              href={`https://wa.me/201009341107?text=${encodeURIComponent(
                "مرحباً إسماعيل، اطلعت على ملف دليل خطوات تصميم الشعار (Logo Design Process) وأود مناقشة هوية بصرية لبراندي."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-md hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ناقش مشروع هويتك عبر واتساب</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
