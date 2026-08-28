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
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-cyan-950/90 to-blue-950/90 border-b border-cyan-500/20 px-3 sm:px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              99.99% Carrier SLA
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300 text-[11px] truncate">
              <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="truncate">{COMPANY_INFO.address.full}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="text-emerald-400 hover:text-emerald-300 font-mono font-bold flex items-center gap-1.5 transition-colors min-h-[44px] py-1"
              title="Direct Telephone Line"
              aria-label={`Call ZEECOM at ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium hidden sm:flex items-center gap-1 min-h-[44px]"
              aria-label="Visit official website"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{COMPANY_INFO.website}</span>
            </a>
            <span className="text-slate-600 hidden md:inline">•</span>
            <button
              onClick={onOpenConsultation}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1 text-xs min-h-[44px] px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20"
              aria-label="Request Site Survey"
            >
              <span>Survey →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo - Enhanced mobile size while preventing any overflow */}
          <div className="flex items-center min-w-0 pr-2">
            <BrandLogo
              size="md"
              format="complete"
              onClick={() => handleNav('hero')}
              className="inline-flex"
            />
          </div>

          {/* Desktop Navigation Links (Visible on 1024px and above) */}
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

          {/* Desktop Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="nav-btn-consultation"
              onClick={onOpenConsultation}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Request Consultation</span>
            </button>
          </div>

          {/* Mobile hamburger button & quick CTA (Visible below 1024px) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              aria-label="Request Consultation"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Consult</span>
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Clearly visible below 768px & tablets) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-8 space-y-2.5 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl">
          <button
            onClick={() => handleNav('overview')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-semibold transition-colors flex items-center gap-2.5"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Company Profile & Values</span>
          </button>

          <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider px-3.5">
            Core Solutions
          </div>

          <button
            onClick={() => handleNav('ai-surveillance')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-medium flex items-center gap-2.5 transition-colors border border-transparent hover:border-blue-500/30"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm sm:text-base">AI Surveillance & Access Control</div>
              <div className="text-xs text-slate-400">99.87% MFA, Biometrics & Anomaly Vision</div>
            </div>
          </button>

          <button
            onClick={() => handleNav('voip-crm')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-medium flex items-center gap-2.5 transition-colors border border-transparent hover:border-emerald-500/30"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm sm:text-base">VoIP CRM & Contact Center</div>
              <div className="text-xs text-slate-400">99.99% Uptime, Screen-Pops & AI Speech</div>
            </div>
          </button>

          <button
            onClick={() => handleNav('ip-audio')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-medium flex items-center gap-2.5 transition-colors border border-transparent hover:border-amber-500/30"
          >
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Volume2 className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm sm:text-base">IP-Audio & Public Address (PA)</div>
              <div className="text-xs text-slate-400">123dB High-SPL, 30W PoE & 250+ Zones</div>
            </div>
          </button>

          <div className="border-t border-slate-800/80 my-2 pt-2"></div>

          <button
            onClick={() => handleNav('industries')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-sm sm:text-base font-medium flex items-center gap-2.5"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Vertical Industry Blueprints</span>
          </button>

          <button
            onClick={() => handleNav('deployment')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-sm sm:text-base font-medium flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Deployment Architecture & Support</span>
          </button>

          <button
            onClick={() => handleNav('ai-architect')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-950/60 text-sm sm:text-base flex items-center gap-2.5 font-semibold"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Solution Architect Tool</span>
          </button>

          <button
            onClick={() => handleNav('configurator')}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-950/50 text-sm sm:text-base flex items-center gap-2.5 font-semibold"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Quote Sizer & Configurator</span>
          </button>

          {/* Quick Contact Card in Mobile Menu */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 mt-3">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              aria-label={`Call direct ${COMPANY_INFO.phone}`}
              className="min-h-[44px] flex items-center gap-2 text-sm text-emerald-400 font-bold font-mono py-1"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call Direct: {COMPANY_INFO.phone}</span>
            </a>
            <div className="flex items-start gap-2 text-xs text-slate-400 py-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address.full}</span>
            </div>
            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit official website"
              className="min-h-[44px] flex items-center gap-2 text-xs text-cyan-400 py-1"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{COMPANY_INFO.website}</span>
            </a>
          </div>

          <button
            onClick={() => { handleNav('contact'); onOpenConsultation(); }}
            className="w-full min-h-[48px] mt-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-center text-sm shadow-lg shadow-cyan-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Request Free Site Survey / RFQ</span>
          </button>
        </div>
      )}
    </header>
  );
};
