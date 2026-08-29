import React, { useEffect } from 'react';
import { FileText, ArrowLeft, Phone, Mail, MapPin, Globe, Shield, AlertTriangle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from '../components/BrandLogo';

interface TermsPageProps {
  onOpenConsultation: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenConsultation }) => {
  useEffect(() => {
    document.title = 'Terms & Conditions of Service | ZEECOM SOLUTION';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Terms and Conditions of Service for ZEECOM SOLUTION. Turnkey engineering scopes, illustrative performance benchmark disclaimers, SLA agreements, and warranty provisions.');
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a
            href="/"
            aria-label="Return to ZEECOM SOLUTION Homepage"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg inline-block"
          >
            <BrandLogo size="md" />
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Home</span>
            </a>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Official Terms of Engagement</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Terms &amp; Conditions of Service
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              ZEECOM SOLUTION • Effective Date: August 2026 • Document Ref: ZEC-TOS-2026
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">1.</span> Scope of Engineering Services
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              ZEECOM SOLUTION provides turnkey enterprise technology solutions, including system architecture modeling, edge hardware procurement, structured cabling deployment, software configuration, and lifecycle maintenance across three core disciplines:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 ml-2">
              <li><strong className="text-white">AI Surveillance &amp; Biometric Access Control:</strong> High-density NVRs, neural processing units, ANPR vehicle tracking, and encrypted biometric controllers.</li>
              <li><strong className="text-white">VoIP Integrated CRM &amp; Contact Centers:</strong> IP-PBX appliances, SIP trunking redundancy, CRM click-to-call interfaces, and call center analytics.</li>
              <li><strong className="text-white">IP-Audio &amp; Public Address Systems:</strong> Networked horn speakers, multi-zone paging matrices, scheduled chime controllers, and ambient acoustic sensors.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">2.</span> Performance Metrics &amp; Illustrative Benchmarks Disclaimer
            </h2>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <strong className="text-white block font-semibold">Laboratory &amp; Illustrative Benchmark Notice</strong>
                <p className="text-slate-300 text-xs sm:text-sm">
                  All performance statistics, percentages, uptime targets (including 99.99% carrier SLA targets), sound pressure levels (e.g. 123dB SPL), and biometric accuracy rates (e.g. 99.87% MFA verification) published across our portal represent illustrative system capabilities, laboratory benchmarks, and engineered hardware specifications. Actual operational performance is subject to ambient environmental acoustics, local ISP network throughput, cabling quality, and physical deployment architecture.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">3.</span> System Sizing &amp; AI Architect Preliminary Estimates
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Estimates, bills of materials, and bandwidth projections generated by the online AI Solution Architect and System Sizer tools are preliminary indicative budget ranges. Final binding quotations and service contracts are issued following an on-site physical engineering survey and verification by certified ZEECOM systems architects.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">4.</span> Hardware Warranties &amp; SLA Terms
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              All edge hardware deployed by ZEECOM is backed by manufacturer warranties alongside ZEECOM installation craftsmanship guarantees. Customized Service Level Agreements (SLA) covering 24/7 on-site emergency dispatch, scheduled firmware patching, and priority spare parts replenishment are executed under individual Master Service Agreements (MSA).
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">5.</span> Corporate &amp; Legal Notices
            </h2>
            <address className="not-italic bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 mt-3">
              <div className="font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>ZEECOM SOLUTION — Engineering Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>{COMPANY_INFO.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Telephone: {COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                <span>Official Portal: {COMPANY_INFO.website}</span>
              </div>
            </address>
          </section>

          {/* Action Links */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <a
              href="/privacy-policy"
              className="text-xs sm:text-sm text-cyan-400 hover:underline min-h-[44px] inline-flex items-center"
            >
              ← View Privacy Policy
            </a>
            <a
              href="/"
              className="text-xs sm:text-sm text-slate-400 hover:text-white min-h-[44px] inline-flex items-center"
            >
              Return to Main Portal →
            </a>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ZEECOM SOLUTION. All rights reserved. {COMPANY_INFO.address.full}</p>
      </footer>
    </div>
  );
};
