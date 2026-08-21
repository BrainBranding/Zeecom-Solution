import React from 'react';
import { Shield, PhoneCall, Volume2, Sparkles, ArrowRight, CheckCircle, ChevronRight, Activity, Zap, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-slate-950 text-white">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand & Tagline Badge */}
        <div className="flex flex-col items-center justify-center gap-3">
          <BrandLogo size="lg" tagline={false} className="mb-1" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Next-Generation Intelligent Enterprise Systems</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 hidden sm:inline">Bridging Physical & Digital Infrastructure</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Intelligent, Integrated Solutions for{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Security, Communications & Audio
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            {COMPANY_INFO.foundedDescription} We transform organizational operations from reactive monitoring to proactive intelligence.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            id="hero-btn-ai-architect"
            onClick={() => onNavigate('ai-architect')}
            aria-label="Launch AI Solution Architect Tool"
            className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI Solution Architect Tool</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-btn-explore-solutions"
            onClick={() => onNavigate('ai-surveillance')}
            aria-label="Explore 3 Core Solution Domains"
            className="px-6 py-3.5 rounded-xl font-semibold bg-slate-900 hover:bg-slate-850 text-white border border-slate-700 hover:border-cyan-500/50 shadow-lg transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Explore 3 Core Domains</span>
          </button>

          <button
            id="hero-btn-book-survey"
            onClick={onOpenConsultation}
            aria-label="Book a free on-site engineering survey"
            className="px-5 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <span>Book Site Survey</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* 3 Core Domain Highlight Cards */}
        <div className="mt-14">
          <h2 className="sr-only">Core Solution Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: AI Surveillance */}
            <button
              onClick={() => onNavigate('ai-surveillance')}
              aria-label="Navigate to Domain 01: AI Surveillance and Access Control"
              className="text-left group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    Domain 01
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  AI-Surveillance & Access Control
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  Computer vision anomaly detection, 99.87% biometric facial authentication, touchless entry, and unified command workflows.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  Live Console Simulator
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            {/* Card 2: VoIP CRM */}
            <button
              onClick={() => onNavigate('voip-crm')}
              aria-label="Navigate to Domain 02: VoIP Integrated CRM and Contact Center"
              className="text-left group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Domain 02
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  VoIP Integrated CRM & Contact Center
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  99.99% uptime telephony, instant CRM screen-popups, 1-click dialing, omnichannel messaging, and AI speech analytics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Screen-Pop Demo
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            {/* Card 3: IP Audio PA */}
            <button
              onClick={() => onNavigate('ip-audio')}
              aria-label="Navigate to Domain 03: IP-Audio and Public Address"
              className="text-left group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:scale-105 transition-all">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Domain 03
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  IP-Audio & Public Address (PA)
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  123dB high-SPL clarity, 30W PoE power, 250+ addressable zones, two-way mic endpoints, and ONVIF/SIP emergency triggers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Multi-Zone Sound Simulator
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Live System Metrics Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {COMPANY_INFO.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-slate-200 mt-1">{stat.label}</span>
                <span className="text-[11px] text-slate-400 mt-0.5 hidden sm:inline">{stat.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
