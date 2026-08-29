import React from 'react';
import { Shield, PhoneCall, Volume2, Mail, Phone, MapPin, Globe, Lock, ArrowUp, Info } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <div className="inline-block">
              <a
                href="#hero"
                onClick={(e) => handleNavClick('hero', e)}
                aria-label="ZEECOM SOLUTION Homepage"
                className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg inline-block"
              >
                <BrandLogo size="lg" className="pointer-events-none" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Delivering intelligent, integrated technology systems that empower organizations to operate securely, communicate seamlessly, and manage environments with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs">99.99% Carrier Target</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Lock className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span className="font-mono text-xs">Hardware Root of Trust</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span className="font-mono text-xs">Lahore, Pakistan</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                *All performance statistics, percentages, and metrics reflect illustrative system capabilities and lab engineering benchmarks.
              </p>
            </div>
          </div>

          {/* Col 3: Solution Domains */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
              Core Solutions
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <a
                  href="#ai-surveillance"
                  onClick={(e) => handleNavClick('ai-surveillance', e)}
                  aria-label="Navigate to AI Surveillance and Access"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center gap-2 text-left text-slate-300 w-full py-1"
                >
                  <Shield className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                  <span>AI Surveillance &amp; Access</span>
                </a>
              </li>
              <li>
                <a
                  href="#voip-crm"
                  onClick={(e) => handleNavClick('voip-crm', e)}
                  aria-label="Navigate to VoIP Integrated CRM"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center gap-2 text-left text-slate-300 w-full py-1"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>VoIP Integrated CRM</span>
                </a>
              </li>
              <li>
                <a
                  href="#ip-audio"
                  onClick={(e) => handleNavClick('ip-audio', e)}
                  aria-label="Navigate to IP Audio and PA Systems"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center gap-2 text-left text-slate-300 w-full py-1"
                >
                  <Volume2 className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>IP-Audio &amp; PA Systems</span>
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick('industries', e)}
                  aria-label="Navigate to Industries and Vertical Use Cases"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full py-1"
                >
                  <span>Industries &amp; Vertical Use Cases</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Interactive Tools */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
              Interactive Tools
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm">
              <li>
                <a
                  href="#ai-architect"
                  onClick={(e) => handleNavClick('ai-architect', e)}
                  aria-label="Navigate to AI Solution Architect Blueprint"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full py-1"
                >
                  <span>AI Solution Architect</span>
                </a>
              </li>
              <li>
                <a
                  href="#configurator"
                  onClick={(e) => handleNavClick('configurator', e)}
                  aria-label="Navigate to System Sizer and Quote Estimator"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full py-1"
                >
                  <span>System Sizer &amp; Estimator</span>
                </a>
              </li>
              <li>
                <a
                  href="#deployment"
                  onClick={(e) => handleNavClick('deployment', e)}
                  aria-label="Navigate to AI Security Readiness Audit"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full py-1"
                >
                  <span>AI Security Readiness Audit</span>
                </a>
              </li>
              <li>
                <a
                  href="#overview"
                  onClick={(e) => handleNavClick('overview', e)}
                  aria-label="Navigate to About ZEECOM and Mission"
                  className="min-h-[44px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full py-1"
                >
                  <span>About ZEECOM &amp; Mission</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Head Office */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
              Head Office &amp; Contact
            </h3>
            <address className="not-italic space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2 py-0.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-white block">{COMPANY_INFO.address.full}</span>
                  <span className="text-[11px] text-slate-400">Headquarters</span>
                </div>
              </div>

              <div className="flex items-start gap-2 py-0.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    aria-label={`Call direct office landline at ${COMPANY_INFO.phone}`}
                    className="font-mono text-emerald-300 hover:text-emerald-200 transition-colors font-bold min-h-[44px] flex items-center"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="text-[11px] text-slate-400 block -mt-2">Direct Office Landline</span>
                </div>
              </div>

              <div className="flex items-start gap-2 py-0.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href={COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit ZEECOM SOLUTION official portal"
                    className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors min-h-[44px] flex items-center truncate"
                  >
                    {COMPANY_INFO.website}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 py-0.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    aria-label={`Send email to ${COMPANY_INFO.email}`}
                    className="text-slate-300 hover:text-white transition-colors min-h-[44px] flex items-center truncate"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </address>

            <button
              type="button"
              onClick={onOpenConsultation}
              aria-label="Schedule Free Site Survey"
              className="mt-4 w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>Schedule Site Survey</span>
            </button>
          </div>
        </div>

        {/* Bottom Legal & Compliance Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} ZEECOM SOLUTION. All rights reserved. {COMPANY_INFO.address.full}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <a
              href="/privacy-policy"
              className="text-slate-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline min-h-[44px] flex items-center text-xs"
              aria-label="Read Privacy Policy"
            >
              Privacy Policy
            </a>
            <span className="text-slate-700 hidden sm:inline" aria-hidden="true">•</span>
            <a
              href="/terms-and-conditions"
              className="text-slate-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline min-h-[44px] flex items-center text-xs"
              aria-label="Read Terms and Conditions"
            >
              Terms &amp; Conditions
            </a>
            <span className="text-slate-700 hidden sm:inline" aria-hidden="true">•</span>
            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ZEECOM Official Portal"
              className="text-cyan-400 hover:underline min-h-[44px] flex items-center text-xs"
            >
              {COMPANY_INFO.website}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

