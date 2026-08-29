import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Phone, Mail, MapPin, Globe, Lock, FileCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from '../components/BrandLogo';

interface PrivacyPolicyPageProps {
  onOpenConsultation: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onOpenConsultation }) => {
  useEffect(() => {
    document.title = 'Privacy Policy | ZEECOM SOLUTION';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Privacy Policy for ZEECOM SOLUTION. Learn how we handle client data, biometric encryption, VoIP telephony confidentiality, and engineering inquiries.');
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Official Regulatory &amp; Corporate Policy</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              ZEECOM SOLUTION • Effective Date: August 2026 • Version 2.4
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">1.</span> Commitment to Client Confidentiality
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              ZEECOM SOLUTION (&quot;ZEECOM&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates as a premier systems integration engineering firm providing AI surveillance, VoIP CRM platforms, and IP-Audio infrastructure. We recognize the sensitive nature of organizational security, communications telemetry, and facility data.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your details will only be used to respond to your engineering inquiries, site survey bookings, and technical RFQs. We strictly do not sell, rent, monetize, or trade client personal, contact, or facility information to third parties.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">2.</span> Information We Collect
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We collect information provided directly by clients and prospective enterprise partners through our website consultation forms, technical surveys, interactive sizing tools, and telephone communications:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 ml-2">
              <li><strong className="text-white">Contact Credentials:</strong> Full name, corporate email address, direct phone numbers, and job role.</li>
              <li><strong className="text-white">Facility Specifications:</strong> Company name, building count, approximate square footage, camera counts, and deployment preferences.</li>
              <li><strong className="text-white">Telemetry &amp; Configuration Inputs:</strong> Sizing metrics generated through our online AI Solution Architect and quote estimators.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">3.</span> Biometric &amp; AI Surveillance Data Security
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              For all turnkey client deployments involving AI Surveillance and Biometric Physical Access Control:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 ml-2">
              <li><strong className="text-white">On-Premise Root of Trust:</strong> Facial geometry templates and biometric credentials are stored exclusively in encrypted, on-premise hardware root-of-trust controllers or dedicated private tenant storage.</li>
              <li><strong className="text-white">No Public Exposure:</strong> ZEECOM does not access, store, or transmit live client video streams or biometric database entries to public internet registries.</li>
              <li><strong className="text-white">Air-Gapped Operation:</strong> NVR recordings and access control logs remain under complete customer ownership with AES-256 local encryption.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">4.</span> Telephony &amp; Voice Recording Privacy
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              All VoIP PBX systems, SIP trunking routes, Call Detail Records (CDR), and agent voice recordings deployed by ZEECOM utilize TLS/SRTP cryptographic encapsulation. Telephony metadata remains strictly within the client&apos;s private PBX instance or private cloud controller.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">5.</span> Data Retention &amp; Inquiries
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Consultation inquiries are retained only for the duration required to evaluate your technical scope and furnish an engineering proposal. To request inspection, correction, or deletion of your consultation contact data, contact our engineering compliance officer:
            </p>
            <address className="not-italic bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 mt-3">
              <div className="font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>ZEECOM SOLUTION — Compliance &amp; Engineering Department</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>{COMPANY_INFO.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Direct Line: {COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                <span>Email: {COMPANY_INFO.email}</span>
              </div>
            </address>
          </section>

          {/* Action Links */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <a
              href="/terms-and-conditions"
              className="text-xs sm:text-sm text-cyan-400 hover:underline min-h-[44px] inline-flex items-center"
            >
              View Terms &amp; Conditions of Service →
            </a>
            <a
              href="/"
              className="text-xs sm:text-sm text-slate-400 hover:text-white min-h-[44px] inline-flex items-center"
            >
              ← Return to Main Portal
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
