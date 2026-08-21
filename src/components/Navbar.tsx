import React, { useState } from 'react';
import { Shield, PhoneCall, Volume2, Sparkles, Sliders, Building2, Phone, Menu, X, CheckCircle2, ChevronDown, MapPin, Globe } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenConsultation: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-cyan-950/80 to-blue-950/80 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              99.99% Carrier SLA
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300 text-[11px]">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span>{COMPANY_INFO.address.full}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="text-emerald-400 hover:text-emerald-300 font-mono font-bold flex items-center gap-1 transition-colors"
              title="Direct Telephone Line"
              aria-label={`Call ZEECOM at ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium hidden sm:flex items-center gap-1"
              aria-label="Visit official website"
            >
              <Globe className="w-3 h-3" />
              <span>{COMPANY_INFO.website}</span>
            </a>
            <span className="text-slate-600 hidden md:inline">•</span>
            <button
              onClick={onOpenConsultation}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1 text-[11px]"
              aria-label="Request Site Survey"
            >
              Request Site Survey →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <BrandLogo
            size="md"
            onClick={() => handleNav('hero')}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-btn-overview"
              onClick={() => handleNav('overview')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'overview' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Company Profile
            </button>

            {/* Solutions Dropdown Menu */}
            <div className="relative">
              <button
                id="nav-btn-solutions-menu"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                aria-haspopup="true"
                aria-expanded={solutionsDropdownOpen}
                aria-label="Core Solutions Dropdown Menu"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  ['ai-surveillance', 'voip-crm', 'ip-audio'].includes(activeSection)
                    ? 'text-cyan-400 bg-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>Core Solutions</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {solutionsDropdownOpen && (
                <div
                  onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  className="absolute top-full left-0 w-80 mt-1 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-xl z-50"
                >
                  <button
                    onClick={() => handleNav('ai-surveillance')}
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>AI Surveillance & Access</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">99.87% MFA</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">Computer vision, touchless entry, and live command console</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('voip-crm')}
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-start gap-3 group border-t border-slate-800/60"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>VoIP CRM & Contact Center</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">99.99% Uptime</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">Screen-pops, click-to-call, omnichannel, & 450+ IP phone models</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('ip-audio')}
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-start gap-3 group border-t border-slate-800/60"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>IP-Audio & PA Systems</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">123dB SPL</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">30W PoE, 250+ zones, ONVIF/SIP, & root-of-trust security</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              id="nav-btn-industries"
              onClick={() => handleNav('industries')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'industries' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Industries
            </button>

            <button
              id="nav-btn-deployment"
              onClick={() => handleNav('deployment')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'deployment' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Deployment & Specs
            </button>

            <button
              id="nav-btn-architect"
              onClick={() => handleNav('ai-architect')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'ai-architect' ? 'text-purple-300 bg-purple-950/40 border border-purple-500/40' : 'text-purple-300/90 hover:text-purple-200 hover:bg-purple-950/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Architect</span>
            </button>

            <button
              id="nav-btn-configurator"
              onClick={() => handleNav('configurator')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'configurator' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quote Sizer</span>
            </button>
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="nav-btn-consultation"
              onClick={onOpenConsultation}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Request Consultation</span>
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950"
              aria-label="Request Consultation"
            >
              Consult
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNav('overview')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            Company Profile & Values
          </button>
          <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
            Core Solutions
          </div>
          <button
            onClick={() => handleNav('ai-surveillance')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span>AI Surveillance & Access Control</span>
          </button>
          <button
            onClick={() => handleNav('voip-crm')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>VoIP CRM & Contact Center</span>
          </button>
          <button
            onClick={() => handleNav('ip-audio')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>IP-Audio & Public Address</span>
          </button>
          <div className="border-t border-slate-800 my-2 pt-2"></div>
          <button
            onClick={() => handleNav('industries')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Target Industries</span>
          </button>
          <button
            onClick={() => handleNav('deployment')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
            <span>Deployment Models</span>
          </button>
          <button
            onClick={() => handleNav('ai-architect')}
            className="w-full text-left px-3 py-2 rounded-lg text-purple-300 bg-purple-950/30 hover:bg-purple-950/50 text-sm flex items-center gap-2 font-medium"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Solution Architect Tool</span>
          </button>
          <button
            onClick={() => handleNav('configurator')}
            className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 text-sm flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Quote Sizer & Configurator</span>
          </button>

          {/* Quick Contact Card in Mobile Menu */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mt-2">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <Phone className="w-3.5 h-3.5" />
              <a href={`tel:${COMPANY_INFO.phoneTel}`} className="font-mono">
                Call: {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address.full}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400">
              <Globe className="w-3.5 h-3.5" />
              <a href={COMPANY_INFO.websiteUrl} target="_blank" rel="noopener noreferrer">
                {COMPANY_INFO.website}
              </a>
            </div>
          </div>

          <button
            onClick={() => { handleNav('contact'); onOpenConsultation(); }}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-center text-sm shadow-md"
          >
            Request Free Site Survey / RFQ
          </button>
        </div>
      )}
    </header>
  );
};
