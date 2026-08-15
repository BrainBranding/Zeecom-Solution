import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompanyOverview } from './components/CompanyOverview';
import { SolutionSurveillance } from './components/SolutionSurveillance';
import { SolutionVoIP } from './components/SolutionVoIP';
import { SolutionAudio } from './components/SolutionAudio';
import { AiSolutionArchitect } from './components/AiSolutionArchitect';
import { SystemConfigurator } from './components/SystemConfigurator';
import { DeploymentAndSupport } from './components/DeploymentAndSupport';
import { IndustriesSection } from './components/IndustriesSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { IndustryUseCase } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectIndustry = (ind: IndustryUseCase) => {
    handleNavigate('industries');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Fixed Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 2. Company Overview & Core Values */}
        <CompanyOverview
          onNavigate={handleNavigate}
        />

        {/* 3. Core Solution 1: AI Surveillance & Access Control */}
        <SolutionSurveillance
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 4. Core Solution 2: VoIP Integrated CRM & Contact Center */}
        <SolutionVoIP
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 5. Core Solution 3: IP-Audio & PA Public Address */}
        <SolutionAudio
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 6. AI Solution Architect Tool (Powered by Gemini) */}
        <AiSolutionArchitect
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 7. Interactive System Sizer & Cost Configurator */}
        <SystemConfigurator
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 8. Deployment Models & AI Security Readiness Audit */}
        <DeploymentAndSupport
          onOpenConsultation={() => setIsContactOpen(true)}
        />

        {/* 9. Vertical Industry Use Cases */}
        <IndustriesSection
          onSelectIndustry={handleSelectIndustry}
          onOpenConsultation={() => setIsContactOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsContactOpen(true)}
      />

      {/* Request Engineering Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

