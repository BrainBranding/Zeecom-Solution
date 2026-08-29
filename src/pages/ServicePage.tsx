import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { COMPANY_INFO, SOLUTIONS_DATA } from '../data/companyData';
import { applyPageSeo } from '../utils/pageSeo';

const SERVICE_SEO: Record<string, { slug: string; title: string; description: string }> = {
  'ai-surveillance': {
    slug: 'ai-surveillance-access-control',
    title: 'AI Surveillance & Access Control Lahore | ZEECOM',
    description: 'AI surveillance, biometric access control and unified security systems engineered by ZEECOM Solution in Lahore, Pakistan.',
  },
  'voip-crm': {
    slug: 'voip-crm-contact-center',
    title: 'VoIP CRM & Contact Center Lahore | ZEECOM',
    description: 'VoIP phone systems, CRM screen pops, contact-center routing and omnichannel communications from ZEECOM Solution.',
  },
  'ip-audio': {
    slug: 'ip-audio-pa-systems',
    title: 'IP Audio & PA Systems Lahore | ZEECOM',
    description: 'PoE IP-audio, public-address, emergency paging and multi-zone communication systems engineered by ZEECOM Solution.',
  },
};

interface ServicePageProps {
  serviceId: string;
  onOpenConsultation: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ serviceId, onOpenConsultation }) => {
  const service = SOLUTIONS_DATA.find((item) => item.id === serviceId);
  const seo = SERVICE_SEO[serviceId];

  useEffect(() => {
    if (!service || !seo) return;
    const canonical = `https://zeecomsolution.com/${seo.slug}`;
    applyPageSeo({
      title: seo.title,
      description: seo.description,
      canonical,
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            name: service.title,
            description: seo.description,
            url: canonical,
            provider: { '@id': 'https://zeecomsolution.com/#organization' },
            areaServed: { '@type': 'Country', name: 'Pakistan' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zeecomsolution.com/' },
              { '@type': 'ListItem', position: 2, name: service.title, item: canonical },
            ],
          },
        ],
      },
    });
    window.scrollTo(0, 0);
  }, [service, seo]);

  if (!service || !seo) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 py-3 flex flex-wrap items-center justify-between gap-3">
          <a href="/" aria-label="ZEECOM Solution homepage" className="rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400">
            <BrandLogo size="md" />
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" className="min-h-[44px] px-3 py-2 inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Home
            </a>
            <button type="button" onClick={onOpenConsultation} className="min-h-[44px] px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold">
              Request Consultation
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
          <a href="/" className="hover:text-cyan-300">Home</a> <span aria-hidden="true">/</span> <span className="text-slate-200">{service.shortTitle}</span>
        </nav>
        <section className="max-w-4xl">
          <span className="inline-flex px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">{service.badge}</span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{service.title}</h1>
          <p className="mt-4 text-lg sm:text-xl text-cyan-300">{service.tagline}</p>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">{service.overview}</p>
        </section>

        <section aria-labelledby="capabilities-title" className="mt-12">
          <h2 id="capabilities-title" className="text-2xl sm:text-3xl font-extrabold text-white">Core capabilities</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.capabilities.map((capability) => (
              <article key={capability.title} className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-lg font-bold text-white">{capability.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{capability.description}</p>
                <ul className="mt-4 space-y-3">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="benefits-title" className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h2 id="benefits-title" className="text-2xl font-extrabold text-white">Business benefits</h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit) => (
                <div key={benefit.title} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h3 className="font-bold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/60 to-slate-900 border border-cyan-500/30">
            <h2 className="text-xl font-extrabold text-white">Plan your deployment</h2>
            <p className="mt-3 text-sm text-slate-300">Schedule a site survey for infrastructure assessment, scope confirmation and a tailored proposal.</p>
            <button type="button" onClick={onOpenConsultation} className="mt-5 w-full min-h-[48px] px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold inline-flex items-center justify-center gap-2">
              Request Site Survey <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <a href={`tel:${COMPANY_INFO.phoneTel}`} className="mt-3 w-full min-h-[44px] px-4 py-2 rounded-xl border border-slate-700 text-emerald-300 inline-flex items-center justify-center gap-2 font-semibold">
              <Phone className="w-4 h-4" aria-hidden="true" /> {COMPANY_INFO.phone}
            </a>
          </aside>
        </section>
      </main>
    </div>
  );
};
