import React, { useEffect, useRef, useState } from 'react';
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
  const solutionsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!solutionsDropdownOpen) return;
    const closeMenu = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === 'Escape') {
        setSolutionsDropdownOpen(false);
        document.getElementById('nav-btn-solutions-menu')?.focus();
      } else if (event instanceof MouseEvent && !solutionsMenuRef.current?.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', closeMenu);
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('keydown', closeMenu);
      document.removeEventListener('mousedown', closeMenu);
    };
  }, [solutionsDropdownOpen]);

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
              Enterprise Systems Engineering
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <address className="not-italic hidden lg:flex items-center gap-1.5 text-slate-300 text-[11px] truncate">
              <MapPin className="w-3 h-3 text-blue-400 shrink-0" aria-hidden="true" />
              <span className="truncate">{COMPANY_INFO.address.full}</span>
            </address>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="text-emerald-400 hover:text-emerald-300 font-mono font-bold flex items-center gap-1.5 transition-colors min-h-[44px] py-1"
              title="Direct Telephone Line"
              aria-label={`Call ZEECOM at ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="truncate">{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">•</span>
            <a
              href={COMPANY_INFO.websiteUrl}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium hidden sm:flex items-center gap-1 min-h-[44px]"
              aria-label="Visit ZEECOM SOLUTION official website"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{COMPANY_INFO.website}</span>
            </a>
            <span className="text-slate-600 hidden md:inline" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1 text-xs min-h-[44px] px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20"
              aria-label="Request Free Engineering Site Survey"
            >
              <span>Survey →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <div className="flex items-center min-w-0 pr-2">
            <a
              href="/"
              aria-current={activeSection === 'hero' ? 'page' : undefined}
              className="inline-flex focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
              aria-label="ZEECOM SOLUTION Homepage"
            >
              <BrandLogo
                size="md"
                format="complete"
                className="inline-flex pointer-events-none"
              />
            </a>
          </div>

          {/* Desktop Navigation Links - Semantic Crawlable Anchors */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Enterprise Navigation">
            <a
              id="nav-link-overview"
              aria-current={activeSection === 'overview' ? 'page' : undefined}
              href="#overview"
              onClick={(e) => { e.preventDefault(); handleNav('overview'); }}
              className={`min-h-[44px] inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'overview' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Company Profile
            </a>

            {/* Solutions Dropdown Menu */}
            <div ref={solutionsMenuRef} className="relative">
              <button
                type="button"
                id="nav-btn-solutions-menu"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                aria-haspopup="true"
                aria-expanded={solutionsDropdownOpen}
                aria-label="Core Engineering Solutions Navigation Menu"
                className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  ['ai-surveillance', 'voip-crm', 'ip-audio'].includes(activeSection)
                    ? 'text-cyan-400 bg-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>Core Solutions</span>
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {solutionsDropdownOpen && (
                <div
                  onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  className="absolute top-full left-0 w-80 mt-1 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-xl z-50"
                  role="menu"
                  aria-label="Core Engineering Solutions"
                >
                  <a
                    href="/ai-surveillance-access-control"
                    role="menuitem"
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 shrink-0">
                      <Shield className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>AI Surveillance &amp; Access</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">99.87% MFA</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">Computer vision, touchless entry, and live command console</p>
                    </div>
                  </a>

                  <a
                    href="/voip-crm-contact-center"
                    role="menuitem"
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-start gap-3 group border-t border-slate-800/60"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 shrink-0">
                      <PhoneCall className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>VoIP CRM &amp; Contact Center</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">99.99% Target</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">Screen-pops, click-to-call, omnichannel, &amp; 450+ IP phone models</p>
                    </div>
                  </a>

                  <a
                    href="/ip-audio-pa-systems"
                    role="menuitem"
                    className="w-full text-left px-4 py-3 hover:bg-slate-800/80 transition-colors flex items-start gap-3 group border-t border-slate-800/60"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20 shrink-0">
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>IP-Audio &amp; PA Systems</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">123dB SPL</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">30W PoE, 250+ zones, ONVIF/SIP, &amp; root-of-trust security</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a
              id="nav-link-industries"
              aria-current={activeSection === 'industries' ? 'page' : undefined}
              href="#industries"
              onClick={(e) => { e.preventDefault(); handleNav('industries'); }}
              className={`min-h-[44px] inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'industries' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Industries
            </a>

            <a
              id="nav-link-deployment"
              aria-current={activeSection === 'deployment' ? 'page' : undefined}
              href="#deployment"
              onClick={(e) => { e.preventDefault(); handleNav('deployment'); }}
              className={`min-h-[44px] inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'deployment' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Deployment &amp; Specs
            </a>

            <a
              id="nav-link-architect"
              aria-current={activeSection === 'ai-architect' ? 'page' : undefined}
              href="#ai-architect"
              onClick={(e) => { e.preventDefault(); handleNav('ai-architect'); }}
              className={`min-h-[44px] inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors gap-1.5 ${
                activeSection === 'ai-architect' ? 'text-purple-300 bg-purple-950/40 border border-purple-500/40' : 'text-purple-300/90 hover:text-purple-200 hover:bg-purple-950/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
              <span>AI Architect</span>
            </a>

            <a
              id="nav-link-configurator"
              aria-current={activeSection === 'configurator' ? 'page' : undefined}
              href="#configurator"
              onClick={(e) => { e.preventDefault(); handleNav('configurator'); }}
              className={`min-h-[44px] inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors gap-1.5 ${
                activeSection === 'configurator' ? 'text-cyan-400 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>Quote Sizer</span>
            </a>
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              id="nav-btn-consultation"
              onClick={onOpenConsultation}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              aria-label="Open Engineering Consultation Request Form"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Request Consultation</span>
            </button>
          </div>

          {/* Mobile hamburger button & quick CTA */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              aria-label="Request Consultation"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Consult</span>
            </button>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-8 space-y-2.5 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl">
          <a
            href="#overview"
            onClick={(e) => { e.preventDefault(); handleNav('overview'); }}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-semibold transition-colors flex items-center gap-2.5"
          >
            <Building2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>Company Profile &amp; Values</span>
          </a>

          <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider px-3.5">
            Core Solutions
          </div>

          <a
            href="/ai-surveillance-access-control"
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-medium flex items-center gap-2.5 transition-colors border border-transparent hover:border-blue-500/30"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Shield className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm sm:text-base">AI Surveillance &amp; Access Control</div>
              <div className="text-xs text-slate-400">Biometrics, access control and anomaly vision</div>
            </div>
          </a>

          <a
            href="/voip-crm-contact-center"
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-medium flex items-center gap-2.5 transition-colors border border-transparent hover:border-emerald-500/30"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm sm:text-base">VoIP CRM &amp; Contact Center</div>
              <div className="text-xs text-slate-400">CRM screen pops, omnichannel and AI speech</div>
            </div>
          </a>

          <a
            href="/ip-audio-pa-systems"
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-base font-medium flex items-center gap-2.5 transition-colors border border-transparent hover:border-amber-500/30"
          >
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Volume2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm sm:text-base">IP-Audio &amp; Public Address (PA)</div>
              <div className="text-xs text-slate-400">PoE audio, granular zones and emergency paging</div>
            </div>
          </a>

          <div className="border-t border-slate-800/80 my-2 pt-2"></div>

          <a
            href="#industries"
            onClick={(e) => { e.preventDefault(); handleNav('industries'); }}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-sm sm:text-base font-medium flex items-center gap-2.5"
          >
            <Building2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>Vertical Industry Blueprints</span>
          </a>

          <a
            href="#deployment"
            onClick={(e) => { e.preventDefault(); handleNav('deployment'); }}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-900 text-sm sm:text-base font-medium flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Deployment Architecture &amp; Support</span>
          </a>

          <a
            href="#ai-architect"
            onClick={(e) => { e.preventDefault(); handleNav('ai-architect'); }}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-purple-300 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-950/60 text-sm sm:text-base flex items-center gap-2.5 font-semibold"
          >
            <Sparkles className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <span>AI Solution Architect Tool</span>
          </a>

          <a
            href="#configurator"
            onClick={(e) => { e.preventDefault(); handleNav('configurator'); }}
            className="w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-950/50 text-sm sm:text-base flex items-center gap-2.5 font-semibold"
          >
            <Sliders className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>Quote Sizer &amp; Configurator</span>
          </a>

          {/* Quick Contact Card in Mobile Menu */}
          <address className="not-italic p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 mt-3">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              aria-label={`Call direct ${COMPANY_INFO.phone}`}
              className="min-h-[44px] flex items-center gap-2 text-sm text-emerald-400 font-bold font-mono py-1"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Call Direct: {COMPANY_INFO.phone}</span>
            </a>
            <div className="flex items-start gap-2 text-xs text-slate-400 py-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{COMPANY_INFO.address.full}</span>
            </div>
            <a
              href={COMPANY_INFO.websiteUrl}
              aria-label="Visit ZEECOM SOLUTION official website"
              className="min-h-[44px] flex items-center gap-2 text-xs text-cyan-400 py-1"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{COMPANY_INFO.website}</span>
            </a>
          </address>

          <button
            type="button"
            onClick={() => { handleNav('contact'); onOpenConsultation(); }}
            className="w-full min-h-[48px] mt-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-center text-sm shadow-lg shadow-cyan-500/25 active:scale-98 transition-all flex items-center justify-center gap-2"
            aria-label="Open Request Free Site Survey Form"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Request Free Site Survey / RFQ</span>
          </button>
        </div>
      )}
    </header>
  );
};
