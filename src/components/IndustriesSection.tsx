import React, { useState } from 'react';
import { Building2, Hospital, GraduationCap, Plane, ShoppingBag, Factory, Shield, PhoneCall, Volume2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/companyData';
import { IndustryUseCase } from '../types';

interface IndustriesSectionProps {
  onSelectIndustry: (ind: IndustryUseCase) => void;
  onOpenConsultation: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry, onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState(INDUSTRIES_DATA[0].id);
  const activeIndustry = INDUSTRIES_DATA.find(i => i.id === activeTab) || INDUSTRIES_DATA[0];

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Hospital': return <Hospital className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Plane': return <Plane className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="industries" className="py-16 sm:py-20 bg-slate-950 text-slate-100 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            Industries Served
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Engineering for High-Demand Environments
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            Discover how ZEECOM SOLUTION unifies AI surveillance, VoIP CRM, and IP-Audio across diverse commercial, healthcare, educational, and mission-critical public sectors.
          </p>
        </div>

        {/* Industry Tabs - Horizontal scrollable or flex wrap */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {INDUSTRIES_DATA.map((ind) => {
            const isSelected = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`min-h-[44px] px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {getIndustryIcon(ind.icon)}
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep-Dive Card */}
        <div className="mt-8 p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                {getIndustryIcon(activeIndustry.icon)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{activeIndustry.name}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold font-mono">
                    {activeIndustry.highlightStat}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{activeIndustry.description}</p>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 w-full sm:w-auto shrink-0"
            >
              <span>Request Industry Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Solutions Matrix for this Industry - Single col on mobile, 3-col on desktop */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Surveillance in this sector */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>AI Surveillance & Access</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeIndustry.surveillanceUse}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>99.87% Biometric MFA Validated</span>
              </div>
            </div>

            {/* VoIP in this sector */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span>VoIP CRM & Communications</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeIndustry.voipUse}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Real-Time Screen Pop-Up & 2-Way Sync</span>
              </div>
            </div>

            {/* IP-Audio in this sector */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>IP-Audio & Public Address</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeIndustry.audioUse}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>123dB SPL PoE & Granular Paging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
