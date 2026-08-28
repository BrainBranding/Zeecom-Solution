import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const closeBtn = modalRef.current?.querySelector<HTMLElement>('button');
    closeBtn?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-100 my-8 max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              {isPrivacy ? <ShieldCheck className="w-5 h-5" aria-hidden="true" /> : <FileText className="w-5 h-5" aria-hidden="true" />}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-xl sm:text-2xl font-bold text-white">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions of Service'}
              </h2>
              <span className="text-xs text-slate-400">
                ZEECOM SOLUTION • Effective Date: August 2026
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal modal"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 pr-2 leading-relaxed">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">1. Commitment to Client Confidentiality</h3>
                <p>
                  ZEECOM SOLUTION (&quot;ZEECOM&quot;, &quot;we&quot;, &quot;our&quot;) respects the confidentiality of all prospective and existing clients. Your details will only be used to respond to your engineering inquiries, site survey bookings, and technical RFQs. We strictly do not sell, rent, or trade client personal or facility information to third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">2. Data We Collect</h3>
                <p>
                  We collect information provided directly through our website consultation forms, telephone communications, and interactive system configurators:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2">
                  <li>Full name, corporate email address, and direct telephone numbers.</li>
                  <li>Organization name, facility type, and architectural scope.</li>
                  <li>Telemetry inputs from interactive system sizing calculations.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">3. Security &amp; Biometric Data Standards</h3>
                <p>
                  For all turnkey client deployments involving AI Surveillance and Biometric Access Control, biometric templates (such as facial geometry hashes) are stored exclusively in encrypted, on-premise hardware root-of-trust or dedicated private tenant storage. ZEECOM does not access, store, or transmit live client video feeds or biometric database entries to outside public networks.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">4. Telephony &amp; Communication Privacy</h3>
                <p>
                  VoIP call detail records (CDR), call recordings, and CRM click-to-call metadata remain within the client&apos;s designated PBX server infrastructure with end-to-end TLS/SRTP encryption.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">5. Direct Inquiries &amp; Data Rights</h3>
                <p>
                  To request access to or deletion of your consultation contact data, contact our engineering office at:
                </p>
                <address className="not-italic bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white">ZEECOM SOLUTION — Compliance Department</div>
                  <div>{COMPANY_INFO.address.full}</div>
                  <div>Telephone: {COMPANY_INFO.phone} | Email: {COMPANY_INFO.email}</div>
                </address>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">1. Scope of Engineering Services</h3>
                <p>
                  ZEECOM SOLUTION provides turnkey system design, procurement, edge hardware deployment, software integration, and maintenance for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2">
                  <li>AI-Powered Surveillance &amp; Biometric Physical Access Control.</li>
                  <li>VoIP Integrated CRM &amp; Multi-Channel Contact Center Systems.</li>
                  <li>IP-Audio, PA Horns, and Network Public Address Infrastructure.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">2. Performance Metrics &amp; Illustrative Benchmarks</h3>
                <p>
                  All metrics, percentages, uptime targets (including 99.99% carrier SLA targets), sound pressure levels (e.g. 123dB SPL), and biometric accuracy rates (e.g. 99.87% MFA verification) published on this portal represent illustrative system capabilities, laboratory benchmarks, and engineered hardware specifications. Actual operational performance is subject to ambient environmental acoustic noise, local ISP network throughput, cabling quality, and deployment architecture.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">3. System Sizing &amp; AI Architect Estimator</h3>
                <p>
                  Estimates generated by the online AI Solution Architect and System Sizer tools are preliminary indicative budget ranges. Final binding quotations are issued following an on-site physical engineering survey by ZEECOM personnel.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-white">4. Warranty &amp; SLA Terms</h3>
                <p>
                  Hardware equipment is covered under manufacturer warranties alongside ZEECOM installation craftsmanship guarantees. Service level agreements (SLA) covering 24/7 on-site emergency dispatch and remote monitoring are established under individual Master Service Agreements (MSA).
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {COMPANY_INFO.address.full}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
