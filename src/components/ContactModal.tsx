import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, Sparkles, Building, Mail, Phone, User, MapPin, Globe, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [facilityType, setFacilityType] = useState('Commercial / Office Complex');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([
    'AI Surveillance & Access Control',
    'VoIP CRM & Contact Center'
  ]);
  const [message, setMessage] = useState('');
  // Honeypot spam trap
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt] = useState<number>(() => Date.now());

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inquiryResult, setInquiryResult] = useState<{ inquiryId: string; message: string } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Accessible Focus Management & Escape-to-close
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trapping
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Initial focus on the close button or first input
    const initialFocusTarget = modalRef.current?.querySelector<HTMLElement>('input, button');
    initialFocusTarget?.focus();

    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev =>
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const payload = {
        fullName: name,
        email,
        phone,
        company,
        facilityType,
        primaryDomain: selectedDomains.join(', '),
        message,
        website_check: honeypot, // Honeypot trap
        formLoadedAt,
      };

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit engineering inquiry. Please check your details.');
      }

      setInquiryResult({
        inquiryId: data.inquiryId,
        message: data.message,
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch {
        // Safe fallback if confetti isn't supported
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrorMsg(err.message || 'An error occurred while submitting your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        aria-labelledby="consultation-modal-title"
        aria-describedby="consultation-modal-desc"
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-8 text-slate-100 my-8 focus:outline-none"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close consultation dialog"
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {!inquiryResult ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pr-12">
              <BrandLogo size="sm" tagline={false} />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Turnkey Consultation</span>
              </div>
            </div>
            <h2 id="consultation-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
              Schedule an Engineering Site Survey
            </h2>
            <p id="consultation-modal-desc" className="text-xs sm:text-sm text-slate-300 mt-1 mb-4 leading-relaxed">
              Connect directly with a ZEECOM systems architect to model acoustic coverage, SIP trunking bandwidth, and biometric security compliance.
            </p>

            {/* Official Headquarters Contact Bar */}
            <address className="not-italic mb-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">Head Office</span>
                  <span className="text-slate-200 text-xs font-medium leading-tight block">{COMPANY_INFO.address.full}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">Direct Call</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    aria-label={`Call direct at ${COMPANY_INFO.phone}`}
                    className="font-mono text-emerald-400 hover:underline font-bold text-xs min-h-[24px] inline-flex items-center"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">Online Portal</span>
                  <a
                    href={COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit ZEECOM SOLUTION online portal"
                    className="text-cyan-400 hover:underline text-xs min-h-[24px] inline-flex items-center"
                  >
                    {COMPANY_INFO.website}
                  </a>
                </div>
              </div>
            </address>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Protection Honeypot - Hidden from humans */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="form-website-check">Leave this field empty</label>
                <input
                  id="form-website-check"
                  type="text"
                  name="website_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full min-h-[44px] pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@enterprise.com"
                      className="w-full min-h-[44px] pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="contact-phone" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="042-37455670 or +92 300 1234567"
                      className="w-full min-h-[44px] pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                    Company / Facility Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Apex Global Technologies"
                      className="w-full min-h-[44px] pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Domains interested */}
              <div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1.5">
                  Solution Domains Required:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'AI Surveillance & Access',
                    'VoIP CRM Contact Center',
                    'IP-Audio & PA Systems'
                  ].map((dom) => {
                    const isSel = selectedDomains.includes(dom);
                    return (
                      <button
                        key={dom}
                        type="button"
                        onClick={() => toggleDomain(dom)}
                        aria-pressed={isSel}
                        aria-label={`Toggle solution domain ${dom}`}
                        className={`min-h-[44px] p-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors text-left flex items-center justify-between ${
                          isSel
                            ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="truncate">{dom}</span>
                        {isSel && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                  Project Notes &amp; Facility Timeline:
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe building count, approximate square footage, or any specific compliance goals..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 resize-none min-h-[80px]"
                />
              </div>

              {/* Mandatory Privacy Notice */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-[11px] sm:text-xs text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  Your details will only be used to respond to your inquiry and will not be shared with third parties.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                aria-label="Submit Request for System Architecture"
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-60 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" aria-hidden="true" />
                    <span>Processing Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Submit Request for System Architecture</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Submission Confirmed State */
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-white">Consultation Request Received!</h2>
            <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              Reference ID: {inquiryResult.inquiryId}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {inquiryResult.message}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setInquiryResult(null);
                  onClose();
                }}
                aria-label="Close Confirmation Window"
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center mx-auto"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

