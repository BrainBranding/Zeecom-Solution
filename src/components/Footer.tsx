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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" onClick={scrollToTop} />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Delivering intelligent, integrated technology systems that empower organizations to operate securely, communicate seamlessly, and manage environments with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">99.99% Carrier SLA</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span className="font-mono text-[11px]">Hardware Root of Trust</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span className="font-mono text-[11px]">Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 3: Solution Domains */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('ai-surveillance')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>AI Surveillance & Access</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('voip-crm')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VoIP Integrated CRM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ip-audio')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>IP-Audio & PA Systems</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Industries & Vertical Use Cases
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Interactive Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('ai-architect')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Solution Architect Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('configurator')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  System Sizer & Quote Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('deployment')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Security Readiness Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About ZEECOM & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Head Office */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Head Office & Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">{COMPANY_INFO.address.full}</span>
                  <span className="text-[11px] text-slate-400">Headquarters</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="font-mono text-emerald-300 hover:text-emerald-200 transition-colors font-bold block"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="text-[11px] text-slate-400">Direct Office Landline</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 font-semibold block transition-colors"
                  >
                    {COMPANY_INFO.website}
                  </a>
                  <span className="text-[11px] text-slate-400">Official Portal</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>Schedule Site Survey</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ZEECOM SOLUTION. All rights reserved. {COMPANY_INFO.address.full}</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px]">Turnkey AI-Surveillance • VoIP CRM • IP-Audio</span>
            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              {COMPANY_INFO.website}
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
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
