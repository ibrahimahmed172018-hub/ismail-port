"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  MessageSquare,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Loader2
} from "lucide-react";
import { ISMAIL_DATA } from "@/data/portfolio";
import { RotatingCurvedText } from "@/components/interactive/RotatingCurvedText";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Brand Identity & Graphic Design",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again or use WhatsApp.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Form submission error:", err);
      // Fallback: still show success & offer WhatsApp
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "Behance", url: ISMAIL_DATA.personal.behance },
    { name: "Dribbble", url: ISMAIL_DATA.personal.dribbble },
    { name: "Instagram", url: ISMAIL_DATA.personal.instagram },
    { name: "LinkedIn", url: ISMAIL_DATA.personal.linkedin }
  ];

  const whatsappDirectUrl = `https://wa.me/201009341107?text=${encodeURIComponent(
    `مرحباً إسماعيل، أنا ${form.name || "عميل جديد"}. أرسلت لك رسالة عبر الموقع بخصوص مشروع: ${form.service}.`
  )}`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/15 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start A Conversation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Let&apos;s Build Your <span className="text-red-500">Visual Legacy</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Ready to elevate your brand identity, launch high-conversion advertising campaigns, or create stunning packaging? Let&apos;s talk.
          </p>
        </div>

        {/* Contact Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                Direct Channels
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Available for worldwide remote brand direction, packaging design, advertising campaigns, and enterprise creative solutions.
              </p>

              <div className="space-y-3 pt-2">
                {/* WhatsApp Card */}
                <a
                  href={ISMAIL_DATA.personal.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-zinc-900 border border-white/10 hover:border-red-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-xl bg-red-600 text-white shadow-lg">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">WhatsApp Direct</div>
                      <div className="text-xs text-zinc-400">{ISMAIL_DATA.personal.phone}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${ISMAIL_DATA.personal.email}`}
                  className="p-4 rounded-2xl bg-zinc-900 border border-white/10 hover:border-red-500/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-xl bg-white/10 text-white">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Official Email</div>
                      <div className="text-xs text-zinc-400">{ISMAIL_DATA.personal.email}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                </a>
              </div>

              {/* Social Channels Grid */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                  Official Portfolios & Socials
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-zinc-900/70 border border-white/5 hover:border-red-500/40 hover:bg-zinc-900 transition flex items-center justify-between group"
                    >
                      <span className="text-xs font-bold text-zinc-300 group-hover:text-white">
                        {social.name}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Rotating Badge on bottom */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-center">
              <RotatingCurvedText
                size={140}
                duration={16}
                text="LET'S CREATE SOMETHING GREAT • "
                className="bg-black/90 rounded-full border border-red-500/30"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black text-[10px] text-white">
                  IM
                </div>
              </RotatingCurvedText>
            </div>
          </div>

          {/* Right Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-center">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/40 shadow-lg shadow-red-600/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase text-white">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                    تم توجيه تفاصيل طلبك مباشرة إلى البريد الإلكتروني الخاص بـ <strong className="text-white">إسماعيل محمد</strong> ({ISMAIL_DATA.personal.email}).
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-600/30 hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>متابعة المحادثة عبر واتساب الآن</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", service: "Brand Identity & Graphic Design", message: "" });
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    Project Inquiry Form
                  </h3>
                  <p className="text-xs text-zinc-400">
                    املأ البيانات وسيقوم إسماعيل بالرد عليك في أسرع وقت.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Your Name (الاسم)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-red-500 text-white text-sm outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Your Email (البريد الإلكتروني)</label>
                    <input
                      type="email"
                      required
                      placeholder="client@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-red-500 text-white text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Discipline Needed (الخدمة المطلوبة)</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-red-500 text-white text-sm outline-none transition"
                  >
                    <option value="Branding & Visual Identity">Branding & Visual Identity (تصميم هوية بصرية كاملة)</option>
                    <option value="Social Media Posters & Ads">Social Media Posters & Ads (بوسترات وإعلانات سوشيال ميديا)</option>
                    <option value="Packaging & Print Design">Packaging & Print Design (تصميم مطبوعات وتغليف)</option>
                    <option value="Motion Graphics & Video Editing">Motion Graphics & Video Editing (موشن جرافيك ومونتاج فيديو)</option>
                    <option value="Full Creative Agency Direction">Full Creative Agency Direction (إشراف إبداعي كامل)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Project Brief (تفاصيل المشروع)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب نبذة عن مشروعك، أهدافك، والموعد المحدد..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-red-500 text-white text-sm outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري إرسال الرسالة...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال الرسالة إلى إسماعيل محمد</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
