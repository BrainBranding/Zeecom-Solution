import React from 'react';
import { Shield, PhoneCall, Volume2, Network, Mail, Phone, MapPin, Globe, CheckCircle, Lock, ArrowUp } from 'lucide-react';
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

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <BrandLogo size="lg" onClick={scrollToTop} />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Delivering intelligent, integrated technology systems that empower organizations to operate securely, communicate seamlessly, and manage environments with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs">99.99% Carrier SLA</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-xs">Hardware Root of Trust</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono text-xs">Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 3: Solution Domains */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
              Core Solutions
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('ai-surveillance')}
                  aria-label="Navigate to AI Surveillance and Access"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center gap-2 text-left text-slate-300 w-full"
                >
                  <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>AI Surveillance & Access</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('voip-crm')}
                  aria-label="Navigate to VoIP Integrated CRM"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center gap-2 text-left text-slate-300 w-full"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>VoIP Integrated CRM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ip-audio')}
                  aria-label="Navigate to IP Audio and PA Systems"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center gap-2 text-left text-slate-300 w-full"
                >
                  <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>IP-Audio & PA Systems</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  aria-label="Navigate to Industries and Vertical Use Cases"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full"
                >
                  <span>Industries & Vertical Use Cases</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Interactive Tools */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
              Interactive Tools
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('ai-architect')}
                  aria-label="Navigate to AI Solution Architect Blueprint"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full"
                >
                  <span>AI Solution Architect</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('configurator')}
                  aria-label="Navigate to System Sizer and Quote Estimator"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full"
                >
                  <span>System Sizer & Estimator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('deployment')}
                  aria-label="Navigate to AI Security Readiness Audit"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full"
                >
                  <span>AI Security Readiness Audit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  aria-label="Navigate to About ZEECOM and Mission"
                  className="min-h-[40px] hover:text-cyan-400 transition-colors flex items-center text-left text-slate-300 w-full"
                >
                  <span>About ZEECOM & Mission</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Head Office */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4">
              Head Office & Contact
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">{COMPANY_INFO.address.full}</span>
                  <span className="text-xs text-slate-400">Headquarters</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    aria-label={`Call direct office landline at ${COMPANY_INFO.phone}`}
                    className="font-mono text-emerald-300 hover:text-emerald-200 transition-colors font-bold block min-h-[36px] flex items-center"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="text-xs text-slate-400">Direct Office Landline</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit official portal"
                    className="text-cyan-300 hover:text-cyan-200 font-semibold block transition-colors min-h-[36px] flex items-center truncate"
                  >
                    {COMPANY_INFO.website}
                  </a>
                  <span className="text-xs text-slate-400">Official Portal</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    aria-label={`Send email to ${COMPANY_INFO.email}`}
                    className="text-slate-300 hover:text-white transition-colors min-h-[36px] flex items-center truncate"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              aria-label="Schedule Site Survey"
              className="mt-4 w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Schedule Site Survey</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} ZEECOM SOLUTION. All rights reserved. {COMPANY_INFO.address.full}</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <span className="text-xs">Turnkey AI-Surveillance • VoIP CRM • IP-Audio</span>
            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ZEECOM Website link"
              className="text-cyan-400 hover:underline min-h-[36px] flex items-center"
            >
              {COMPANY_INFO.website}
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
