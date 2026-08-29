import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompanyOverview } from './components/CompanyOverview';
import { IndustryUseCase } from './types';
import { applyPageSeo } from './utils/pageSeo';

// Code-split heavy interactive and below-the-fold components
const SolutionSurveillance = lazy(() =>
  import('./components/SolutionSurveillance').then((m) => ({ default: m.SolutionSurveillance }))
);
const SolutionVoIP = lazy(() =>
  import('./components/SolutionVoIP').then((m) => ({ default: m.SolutionVoIP }))
);
const SolutionAudio = lazy(() =>
  import('./components/SolutionAudio').then((m) => ({ default: m.SolutionAudio }))
);
const AiSolutionArchitect = lazy(() =>
  import('./components/AiSolutionArchitect').then((m) => ({ default: m.AiSolutionArchitect }))
);
const SystemConfigurator = lazy(() =>
  import('./components/SystemConfigurator').then((m) => ({ default: m.SystemConfigurator }))
);
const DeploymentAndSupport = lazy(() =>
  import('./components/DeploymentAndSupport').then((m) => ({ default: m.DeploymentAndSupport }))
);
const IndustriesSection = lazy(() =>
  import('./components/IndustriesSection').then((m) => ({ default: m.IndustriesSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const ContactModal = lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const ServicePage = lazy(() =>
  import('./pages/ServicePage').then((m) => ({ default: m.ServicePage }))
);

const SERVICE_ROUTES: Record<string, string> = {
  '/ai-surveillance-access-control': 'ai-surveillance',
  '/voip-crm-contact-center': 'voip-crm',
  '/ip-audio-pa-systems': 'ip-audio',
};

// Lightweight skeleton fallback to maintain exact structural layout and zero CLS
const SectionFallback: React.FC<{ minHeight?: string }> = ({ minHeight = 'min-h-[500px]' }) => (
  <div className={`w-full ${minHeight} bg-slate-950/60 flex items-center justify-center p-8`}>
    <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
      <span className="w-2 h-2 rounded-full bg-cyan-500/60 animate-ping" />
      <span>Loading engineered module...</span>
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    }
    return '/';
  });

  // Synchronize URL path or hash with page sections and modals
  React.useEffect(() => {
    const handleLocationRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      setCurrentPath(path);
      const hash = window.location.hash.replace('#', '').toLowerCase();

      const pathToSectionMap: Record<string, string> = {
        '/ai-surveillance-access-control': 'ai-surveillance',
        '/ai-surveillance': 'ai-surveillance',
        '/voip-crm-contact-center': 'voip-crm',
        '/voip-crm': 'voip-crm',
        '/ip-audio-pa-systems': 'ip-audio',
        '/ip-audio': 'ip-audio',
        '/industries': 'industries',
        '/about': 'overview',
        '/overview': 'overview',
        '/architect': 'ai-architect',
        '/configurator': 'configurator',
        '/audit': 'deployment',
      };

      if (path === '/contact') {
        setIsContactOpen(true);
      } else if (pathToSectionMap[path]) {
        const targetId = pathToSectionMap[path];
        setActiveSection(targetId);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash) {
        if (hash === 'contact') {
          setIsContactOpen(true);
        } else {
          setActiveSection(hash);
          setTimeout(() => {
            const el = document.getElementById(hash);
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    handleLocationRoute();
    window.addEventListener('popstate', handleLocationRoute);
    return () => window.removeEventListener('popstate', handleLocationRoute);
  }, []);

  React.useEffect(() => {
    if (currentPath !== '/') return;
    applyPageSeo({
      title: 'ZEECOM Solution | Security, VoIP CRM & IP-Audio Lahore',
      description: 'ZEECOM Solution delivers AI surveillance, biometric access control, VoIP CRM contact centers and IP-audio systems in Lahore, Pakistan.',
      canonical: 'https://zeecomsolution.com/',
    });
  }, [currentPath]);

  const handleNavigate = (sectionId: string) => {
    if (currentPath !== '/') {
      window.history.pushState(null, '', `/#${sectionId}`);
      setCurrentPath('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'contact') {
      setIsContactOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update browser history state cleanly without page reload
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const handleSelectIndustry = (_ind: IndustryUseCase) => {
    handleNavigate('industries');
  };

  // Render Dedicated Permanent Crawlable Legal Pages if path matches
  if (currentPath === '/privacy-policy') {
    return (
      <Suspense fallback={<SectionFallback minHeight="min-h-screen" />}>
        <PrivacyPolicyPage onOpenConsultation={() => setIsContactOpen(true)} />
        {isContactOpen && (
          <Suspense fallback={null}>
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
          </Suspense>
        )}
      </Suspense>
    );
  }

  if (currentPath === '/terms-and-conditions' || currentPath === '/terms') {
    return (
      <Suspense fallback={<SectionFallback minHeight="min-h-screen" />}>
        <TermsPage onOpenConsultation={() => setIsContactOpen(true)} />
        {isContactOpen && (
          <Suspense fallback={null}>
            <ContactModal
              isOpen={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
          </Suspense>
        )}
      </Suspense>
    );
  }

  const serviceId = SERVICE_ROUTES[currentPath];
  if (serviceId) {
    return (
      <Suspense fallback={<SectionFallback minHeight="min-h-screen" />}>
        <ServicePage serviceId={serviceId} onOpenConsultation={() => setIsContactOpen(true)} />
        {isContactOpen && (
          <Suspense fallback={null}>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          </Suspense>
        )}
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* Top Fixed Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="relative">
        {/* 1. Hero Section (Eagerly Loaded for Instant FCP & LCP) */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 2. Company Overview & Core Values (Eagerly Loaded) */}
        <CompanyOverview
          onNavigate={handleNavigate}
        />

        {/* Deferred / Lazy-Loaded Heavy Solution Modules */}
        <Suspense fallback={<SectionFallback minHeight="min-h-[700px]" />}>
          {/* 3. Core Solution 1: AI Surveillance & Access Control */}
          <div className="content-visibility-auto">
            <SolutionSurveillance
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>

          {/* 4. Core Solution 2: VoIP Integrated CRM & Contact Center */}
          <div className="content-visibility-auto">
            <SolutionVoIP
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>

          {/* 5. Core Solution 3: IP-Audio & PA Public Address */}
          <div className="content-visibility-auto">
            <SolutionAudio
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>

          {/* 6. AI Solution Architect Tool (Powered by Gemini) */}
          <div className="content-visibility-auto">
            <AiSolutionArchitect
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>

          {/* 7. Interactive System Sizer & Cost Configurator */}
          <div className="content-visibility-auto">
            <SystemConfigurator
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>

          {/* 8. Deployment Models & AI Security Readiness Audit */}
          <div className="content-visibility-auto">
            <DeploymentAndSupport
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>

          {/* 9. Vertical Industry Use Cases */}
          <div className="content-visibility-auto">
            <IndustriesSection
              onSelectIndustry={handleSelectIndustry}
              onOpenConsultation={() => setIsContactOpen(true)}
            />
          </div>
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<SectionFallback minHeight="min-h-[300px]" />}>
        <Footer
          onNavigate={handleNavigate}
          onOpenConsultation={() => setIsContactOpen(true)}
        />
      </Suspense>

      {/* Request Engineering Consultation Modal (Loaded on Demand) */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
