"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/interactive/SmoothScroll";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { CreativeStudioBackground } from "@/components/interactive/CreativeStudioBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ResumeModal } from "@/components/interactive/ResumeModal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* Follower Cursor for Graphic Designer Portfolio */}
      <CustomCursor />

      {/* Dynamic Graphic Studio Background (Live Pen Tool Bezier Splines & Brush Waves) */}
      <CreativeStudioBackground />

      {/* Glassmorphism Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Assembly */}
      <main className="relative z-10 space-y-0" suppressHydrationWarning>
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <ServicesSection />
        <GallerySection />
        <AboutSection onOpenResume={() => setResumeOpen(true)} />
        <ProcessSection />
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Interactive Resume / CV Lightbox Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </SmoothScroll>
  );
}
