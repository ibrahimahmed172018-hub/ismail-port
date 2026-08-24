"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  HeartPulse,
  Briefcase,
  GraduationCap,
  Award,
  Globe2,
  CheckCircle2,
  FileText,
  MapPin,
  Users
} from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent text-white overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-red-600/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-red-950/20 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Profile & Academic Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Behind The Craft of <span className="text-red-500">{ISMAIL_DATA.personal.shortName}</span>
          </h2>
          <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{ISMAIL_DATA.personal.location}</span>
            <span>•</span>
            <span>{ISMAIL_DATA.personal.education.university}</span>
          </div>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Visual Card (5 Cols) */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group">
              <Image
                src={ISMAIL_DATA.personal.avatar}
                alt={ISMAIL_DATA.personal.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

              {/* Float Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-xl space-y-3">
                <div>
                  <div className="text-lg font-black uppercase text-white">
                    {ISMAIL_DATA.personal.name}
                  </div>
                  <div className="text-xs text-red-400 font-bold uppercase tracking-wider">
                    {ISMAIL_DATA.personal.agencyRole} ({ISMAIL_DATA.personal.teamSize})
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 font-medium">
                  {ISMAIL_DATA.personal.education.degree} (4th Year)
                </div>

                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md shadow-red-600/30 hover:scale-105"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View & Download Official CV</span>
                  </button>
                )}
              </div>
            </div>

            {/* Academic Education Card */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-white/10 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Education</span>
              </div>
              <h4 className="text-base font-black text-white uppercase">
                {ISMAIL_DATA.personal.education.university}
              </h4>
              <div className="text-xs text-zinc-300 font-semibold">
                {ISMAIL_DATA.personal.education.degree} • {ISMAIL_DATA.personal.education.year}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {ISMAIL_DATA.personal.education.notes}
              </p>
            </div>
          </div>

          {/* Right Narrative & Career Timeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio Narrative */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Multidisciplinary Creative Direction with Anatomical Precision
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {ISMAIL_DATA.personal.bio}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {ISMAIL_DATA.personal.medicalBio}
              </p>
            </div>

            {/* Career Timeline Matching CV */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                <Briefcase className="w-4 h-4" />
                <span>Career History & Leadership</span>
              </div>

              <div className="space-y-3">
                {ISMAIL_DATA.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-red-500/40 transition-all space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-sm font-black text-white uppercase">{exp.role}</h4>
                        <div className="text-xs text-red-400 font-semibold">{exp.company}</div>
                      </div>
                      <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/10 w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Training Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Languages */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>Languages</span>
                </div>
                <div className="space-y-2">
                  {ISMAIL_DATA.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{lang.name}</span>
                      <span className="text-zinc-400 text-[11px]">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training & Certifications */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Professional Training</span>
                </div>
                <div className="space-y-1.5">
                  {ISMAIL_DATA.training.slice(0, 4).map((item) => (
                    <div key={item.name} className="text-xs text-zinc-300 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="text-[10px] text-zinc-500">— {item.area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools Proficiency Grid */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Mastered Software Toolset (Expert Level)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ISMAIL_DATA.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{tool.name}</div>
                      <div className="text-[10px] text-zinc-500">{tool.category}</div>
                    </div>
                    <span className="text-red-400 font-bold text-xs">{tool.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
