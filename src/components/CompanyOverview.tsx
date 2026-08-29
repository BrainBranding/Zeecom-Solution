import React from 'react';
import { Lightbulb, Network, ShieldCheck, Users, Target, Compass, Sparkles, CheckCircle2, Server, ArrowRight, MapPin, Phone, Globe, Mail, Building2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';

interface CompanyOverviewProps {
  onNavigate: (sectionId: string) => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-amber-400" />;
      case 'Network': return <Network className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Users': return <Users className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="overview" className="py-16 sm:py-20 bg-slate-900/50 text-slate-100 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            About ZEECOM SOLUTION
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bridging Traditional Infrastructure & Next-Generation Intelligence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {COMPANY_INFO.foundedDescription}
          </p>
        </div>

        {/* Vision & Mission Cards - Single column on mobile, 2 cols on tablet/desktop */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              "{COMPANY_INFO.vision}"
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              "{COMPANY_INFO.mission}"
            </p>
          </div>
        </div>

        {/* 4 Core Values - Single column on mobile <640px, 2-col on tablet, 4-col on desktop */}
        <div className="mt-14 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h3 className="text-2xl font-bold text-white">Our Core Values</h3>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              The foundational engineering principles that guide our solution delivery and long-term client partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-slate-900 w-fit mb-4 group-hover:scale-110 transition-transform border border-slate-800">
                    {getIcon(val.icon)}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{val.title}</h4>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Head Office & Direct Contact Card */}
        <div className="mt-14 sm:mt-16 p-5 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3 sm:gap-4">
              <BrandLogo size="md" tagline={false} />
              <div className="hidden sm:block h-8 w-px bg-slate-800" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Headquarters & Solution Center</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">Principal Engineering Office</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Support & Dispatch
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Head Office Address</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">
                {COMPANY_INFO.address.full}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                OPF Housing Scheme, Lahore, Punjab
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Direct Phone Line</span>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="text-base font-mono font-bold text-emerald-400 hover:text-emerald-300 block min-h-[44px] flex items-center"
              >
                {COMPANY_INFO.phone}
              </a>
              <p className="text-[11px] text-slate-400 -mt-1">
                Direct Landline / Engineering Inquiries
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Official Web Portal</span>
              </div>
              <a
                href={COMPANY_INFO.websiteUrl}
                className="text-base font-bold text-cyan-400 hover:text-cyan-300 block min-h-[44px] flex items-center truncate"
              >
                {COMPANY_INFO.website}
              </a>
              <p className="text-[11px] text-slate-400 -mt-1">
                Online Portal &amp; Solution Catalog
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Official Inquiries</span>
              </div>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-sm sm:text-base font-semibold text-purple-300 hover:text-white block min-h-[44px] flex items-center truncate"
              >
                {COMPANY_INFO.email}
              </a>
              <p className="text-[11px] text-slate-400 -mt-1">
                24/7 RFQ & Technical Dispatch
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose ZEECOM SOLUTION Highlight Banner */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                The Integrated Advantage
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                Why Choose ZEECOM SOLUTION?
              </h3>
              <p className="mt-2 text-slate-300 text-base sm:text-lg leading-relaxed">
                Rather than coordinating 3 disconnected vendors for cameras, telephone PBX, and public address, ZEECOM unites all three onto a single, cyber-hardened IP network architecture.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Three Integrated Domains Under One Roof</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>AI-Driven Intelligence: Proactive, Not Reactive</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Carrier-Grade Scalability: Single Site to Multi-Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Customer-Centric Turnkey Engineering & 24/7 SLA</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
              <Server className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white">Custom System Sizing</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Calculate equipment counts, camera bandwidth, and SIP trunks tailored to your blueprint.
              </p>
              <button
                onClick={() => onNavigate('ai-architect')}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch AI Architect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
