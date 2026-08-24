"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Phone,
  Mail,
  MapPin,
  Globe2,
  Users,
  CheckCircle2
} from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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

  const cvFileUrl = ISMAIL_DATA.personal.cvUrl || "/cv.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvFileUrl;
    link.download = "Esmail_Mohammed_Abdeldaim_Global_CV.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[86vh] bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(220,38,38,0.35)] z-20 flex flex-col my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-zinc-900/80 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-red-500/50 shadow-md shrink-0 bg-black">
                  <Image
                    src={ISMAIL_DATA.personal.avatar}
                    alt={ISMAIL_DATA.personal.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    {ISMAIL_DATA.personal.name}
                  </h3>
                  <p className="text-xs text-red-400 font-semibold truncate max-w-md">
                    {ISMAIL_DATA.personal.jobTitle}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-lg shadow-red-600/30 hover:scale-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </button>

                <a
                  href={cvFileUrl}
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

            {/* Modal Body - Scrollable CV Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-zinc-300">
              {/* Top Contact Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 text-xs">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{ISMAIL_DATA.personal.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{ISMAIL_DATA.personal.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">{ISMAIL_DATA.personal.email}</span>
                </div>
              </div>

              {/* Professional Profile */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Professional Profile</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-200">
                  {ISMAIL_DATA.personal.bio}
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {ISMAIL_DATA.personal.medicalBio}
                </p>
              </div>

              {/* Professional Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                  <div className="text-2xl font-black text-red-500">8+</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold mt-1">Years Experience</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                  <div className="text-2xl font-black text-white">800+</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold mt-1">Clients Served</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                  <div className="text-2xl font-black text-red-500">20</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold mt-1">Team Members Led</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                  <div className="text-2xl font-black text-white">2026</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-semibold mt-1">Founded Retina</div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Briefcase className="w-4 h-4 text-red-500" />
                  <span>Professional Experience</span>
                </div>
                <div className="space-y-3">
                  {ISMAIL_DATA.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase">{exp.role}</h4>
                          <div className="text-xs text-red-400 font-semibold">{exp.company}</div>
                        </div>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 w-fit">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-red-500" />
                  <span>Education</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-1.5">
                  <h4 className="text-sm font-bold text-white uppercase">{ISMAIL_DATA.personal.education.university}</h4>
                  <div className="text-xs text-zinc-300 font-semibold">{ISMAIL_DATA.personal.education.degree} — {ISMAIL_DATA.personal.education.year}</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{ISMAIL_DATA.personal.education.notes}</p>
                </div>
              </div>

              {/* Software & Tools Grid */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Award className="w-4 h-4 text-red-500" />
                  <span>Software — Expert Level</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ISMAIL_DATA.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between space-y-1.5"
                    >
                      <span className="text-xs font-bold text-white">{tool.name}</span>
                      <div className="flex items-center justify-between text-[10px] text-zinc-400">
                        <span>{tool.category}</span>
                        <span className="text-red-400 font-bold">{tool.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Training */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-white uppercase flex items-center space-x-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Languages</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {ISMAIL_DATA.languages.map((l) => (
                      <div key={l.name} className="flex justify-between">
                        <span className="font-semibold text-zinc-200">{l.name}</span>
                        <span className="text-zinc-400 text-[11px]">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-white uppercase flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-red-500" />
                    <span>Professional Training</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-zinc-300">
                    {ISMAIL_DATA.training.slice(0, 4).map((t) => (
                      <div key={t.name}>• {t.name} ({t.area})</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-zinc-400 font-medium text-center sm:text-left">
                Esmail_Mohammed_Abdeldaim_Global_CV.pdf (Official Global CV)
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-600/40 hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الـ CV الآن (PDF)</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
