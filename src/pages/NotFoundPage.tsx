import React, { useEffect } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { COMPANY_INFO } from '../data/companyData';
import { applyPageSeo } from '../utils/pageSeo';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    applyPageSeo({
      title: 'Page Not Found | ZEECOM Solution',
      description: 'The requested page could not be found. Return to the ZEECOM Solution homepage or contact our Lahore engineering team.',
      canonical: window.location.href.split(/[?#]/)[0],
      robots: 'noindex, follow',
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <a href="/" aria-label="ZEECOM Solution homepage" className="inline-flex rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <BrandLogo size="md" />
          </a>
        </div>
      </header>
      <main id="main-content" className="flex-1 grid place-items-center px-4 py-16 text-center">
        <section className="max-w-2xl">
          <p className="text-cyan-300 font-bold tracking-[0.2em] uppercase">Error 404</p>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">Page not found</h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            The address may be outdated or typed incorrectly. Return to the homepage or contact our engineering team for assistance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a href="/" className="min-h-[48px] px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold inline-flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Return home
            </a>
            <a href={`tel:${COMPANY_INFO.phoneTel}`} className="min-h-[48px] px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" /> {COMPANY_INFO.phone}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};
