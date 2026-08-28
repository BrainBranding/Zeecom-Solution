import React, { useState } from 'react';
import { Sparkles, Building2, Shield, PhoneCall, Volume2, Cpu, ArrowRight, CheckCircle2, Copy, Download, RefreshCw, Layers, Calendar, DollarSign, Zap } from 'lucide-react';
import { ArchitectRecommendation } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface AiSolutionArchitectProps {
  onOpenConsultation: () => void;
}

export const AiSolutionArchitect: React.FC<AiSolutionArchitectProps> = ({ onOpenConsultation }) => {
  // Input parameters
  const [facilityType, setFacilityType] = useState('Corporate Office');
  const [facilitySize, setFacilitySize] = useState(45000);
  const [buildingCount, setBuildingCount] = useState(1);
  const [floorCount, setFloorCount] = useState(3);
  const [userCount, setUserCount] = useState(120);
  const [painPoints, setPainPoints] = useState('Need 99.87% biometric facial access, VoIP CRM screen-pops, and high-noise PA in logistics loading dock.');
  const [deploymentPreference, setDeploymentPreference] = useState<'Hybrid' | 'Cloud-Native' | 'On-Premise'>('Hybrid');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['ai-surveillance', 'voip-crm', 'ip-audio']);

  // Loading and result states
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ArchitectRecommendation | null>(null);
  const [copied, setCopied] = useState(false);
  const [sourceEngine, setSourceEngine] = useState<string>('');

  // Preset quick templates
  const presets = [
    {
      name: "50k sq ft Corporate HQ",
      type: "Corporate Headquarters",
      size: 50000,
      buildings: 1,
      floors: 4,
      users: 160,
      pain: "High employee turnover, need touchless mobile/face access, CRM phone logging, and multi-floor paging.",
      deploy: "Hybrid" as const
    },
    {
      name: "300-Bed Regional Hospital",
      type: "Hospital & Medical Campus",
      size: 120000,
      buildings: 2,
      floors: 6,
      users: 350,
      pain: "Need restricted pharmacy biometric access, priority nurse triage VoIP queues, and 123dB Code Blue emergency alert audio.",
      deploy: "On-Premise" as const
    },
    {
      name: "High-Tech Education Campus",
      type: "University / Educational Campus",
      size: 200000,
      buildings: 5,
      floors: 3,
      users: 800,
      pain: "Mass campus emergency evacuation alerts across 250+ zones, perimeter fence loitering detection, and administrative VoIP.",
      deploy: "Hybrid" as const
    },
    {
      name: "Logistics Port & Distribution Hub",
      type: "Industrial Logistics Hub",
      size: 150000,
      buildings: 2,
      floors: 2,
      users: 90,
      pain: "Extremely loud forklifts requiring 123dB horn speakers, LPR gate vehicle recognition, and warehouse click-to-call.",
      deploy: "Cloud-Native" as const
    }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setFacilityType(p.type);
    setFacilitySize(p.size);
    setBuildingCount(p.buildings);
    setFloorCount(p.floors);
    setUserCount(p.users);
    setPainPoints(p.pain);
    setDeploymentPreference(p.deploy);
  };

  const handleGenerateArchitecture = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/solution-architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilityType,
          facilitySize,
          buildingCount,
          floorCount,
          userCount,
          painPoints,
          deploymentPreference,
          focusDomains: selectedDomains
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRecommendation(data.data);
        setSourceEngine(data.source || 'gemini-ai');
        return;
      }
      throw new Error(data.error || 'Server calculation failed');
    } catch (err) {
      console.warn("Generating via local architectural calculation engine...", err);
      // Client-side architectural synthesis
      const calculatedCameras = Math.max(8, Math.round((facilitySize / 2500) * (buildingCount * 0.8)));
      const calculatedDoors = Math.max(4, Math.round(floorCount * 3 * buildingCount));
      const calculatedSeats = Math.max(10, Math.round(userCount * 0.7));
      const calculatedZones = Math.max(3, floorCount + buildingCount + 2);
      const calculatedSpeakers = Math.max(12, Math.round((facilitySize / 1500)));
      const timeline = Math.max(3, Math.min(12, Math.round(buildingCount * 1.5 + floorCount * 0.8)));

      const fallbackSpec: ArchitectRecommendation = {
        executiveSummary: `ZEECOM SOLUTION has engineered a unified, high-reliability architecture for your ${facilitySize.toLocaleString()} sq ft ${facilityType} facility. By converging AI computer vision, CRM-integrated VoIP communications, and IP-Audio PA onto a PoE-powered network backbone, your operations achieve proactive threat mitigation and seamless communication continuity.`,
        surveillanceArchitecture: {
          cameraCount: calculatedCameras,
          recommendedTypes: [
            "4K AI Smart Dome Cameras with Behavioral Anomaly Detection",
            "Optical PTZ Perimeter Cameras with Auto-Tracking",
            "Biometric Touchless Facial Verification Readers (99.87% Accuracy)"
          ],
          accessControlPoints: calculatedDoors,
          keyAnalytics: [
            "Real-time Anomaly & Loitering Sensing",
            "Multi-Factor Touchless Face / Mobile NFC Verification",
            "Automated Emergency Lockdown Triggering"
          ]
        },
        voipArchitecture: {
          recommendedSeats: calculatedSeats,
          trunkCapacity: `${Math.ceil(calculatedSeats * 0.35)} Concurrent SIP Channels with 99.99% Carrier Uptime`,
          crmIntegrationStrategy: "Real-time CRM Screen-Pop Dossier on inbound ring, 1-Click Dialing, and AI conversation speech logging.",
          omnichannelFeatures: [
            "Unified Inbox (Voice, SMS, Live Web Chat & WhatsApp)",
            "AI Speech Sentiment Analysis & Keyword Coaching",
            "Interactive Visual IVR & Smart Skill-based Call Queues"
          ]
        },
        audioArchitecture: {
          recommendedZones: calculatedZones,
          speakerCount: calculatedSpeakers,
          speakerTypes: [
            "30W PoE High-Fidelity Ceiling Speakers for Open Areas & Offices",
            "123dB SPL High-Noise Horn Speakers for Logistics & Perimeter",
            "Speaker-as-a-Microphone 2-Way Intercom Endpoints"
          ],
          emergencyProtocol: "One-Touch Mass Evacuation Override with SIP-triggered automated voice dispatches across all addressable zones."
        },
        deploymentModel: deploymentPreference,
        timelineWeeks: timeline,
        estimatedInvestmentRange: `$${(calculatedCameras * 450 + calculatedSeats * 180 + calculatedSpeakers * 220 + 4500).toLocaleString()} - $${(calculatedCameras * 680 + calculatedSeats * 260 + calculatedSpeakers * 320 + 8000).toLocaleString()} USD`,
        keyBenefits: [
          "Proactive Physical Protection with <250ms Threat Latency",
          "Up to 28% Faster Customer Call Handling with CRM Screen-Pop",
          "PoE-Powered IP Audio eliminates bulky 70V/100V copper wiring",
          "Single-Pane-of-Glass unified security & communication management"
        ]
      };
      setRecommendation(fallbackSpec);
      setSourceEngine('zeecom-architect-engine');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySpec = () => {
    if (!recommendation) return;
    const text = `
=== ZEECOM SOLUTION ARCHITECTURAL BLUEPRINT ===
Company: ${COMPANY_INFO.name}
Headquarters: ${COMPANY_INFO.address.full}
Direct Telephone: ${COMPANY_INFO.phone}
Official Web Portal: ${COMPANY_INFO.website}
Official Inquiries: ${COMPANY_INFO.email}
-----------------------------------------------
Facility: ${facilityType} (${facilitySize.toLocaleString()} sq ft, ${buildingCount} Buildings, ${floorCount} Floors, ${userCount} Users)
Deployment Model: ${recommendation.deploymentModel}
Estimated Timeline: ${recommendation.timelineWeeks} Weeks
Estimated Budget: ${recommendation.estimatedInvestmentRange}

EXECUTIVE SUMMARY:
${recommendation.executiveSummary}

1. AI SURVEILLANCE & ACCESS CONTROL:
- Cameras: ${recommendation.surveillanceArchitecture.cameraCount} units
- Types: ${recommendation.surveillanceArchitecture.recommendedTypes.join(', ')}
- Access Control Doors: ${recommendation.surveillanceArchitecture.accessControlPoints}
- Analytics: ${recommendation.surveillanceArchitecture.keyAnalytics.join(', ')}

2. VOIP CRM & CONTACT CENTER:
- Recommended Seats: ${recommendation.voipArchitecture.recommendedSeats}
- Trunk SLA: ${recommendation.voipArchitecture.trunkCapacity}
- CRM Strategy: ${recommendation.voipArchitecture.crmIntegrationStrategy}
- Omnichannel: ${recommendation.voipArchitecture.omnichannelFeatures.join(', ')}

3. IP-AUDIO & PA SYSTEM:
- Audio Zones: ${recommendation.audioArchitecture.recommendedZones}
- Speakers: ${recommendation.audioArchitecture.speakerCount} units
- Types: ${recommendation.audioArchitecture.speakerTypes.join(', ')}
- Emergency Protocol: ${recommendation.audioArchitecture.emergencyProtocol}

KEY BENEFITS:
${recommendation.keyBenefits.map(b => '- ' + b).join('\n')}
===============================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="ai-architect" className="py-16 sm:py-20 bg-slate-900/60 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Solution Architect • Powered by Gemini AI</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Engineering Blueprint & System Sizing Engine
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            Provide your facility specifications to receive an instant, AI-calculated system architecture across AI surveillance, CRM-integrated VoIP, and IP-Audio PA zones.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-300 mr-1 w-full text-center sm:w-auto">Quick Presets:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              aria-label={`Apply preset ${preset.name}`}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-xs sm:text-sm font-medium text-slate-300 transition-colors flex items-center"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Main Architect Workstation - Single column on mobile, 12-col on desktop */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column (5/12): Input Configuration Form */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Facility Parameters</span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                Step 1 of 2
              </span>
            </div>

            {/* Facility Type */}
            <div>
              <label htmlFor="architect-facility-type" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1.5">
                Facility Type / Sector:
              </label>
              <input
                id="architect-facility-type"
                name="facilityType"
                type="text"
                value={facilityType}
                onChange={(e) => setFacilityType(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                placeholder="e.g. Corporate HQ, Hospital, Campus"
              />
            </div>

            {/* Facility Size Slider */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-1.5">
                <label htmlFor="architect-facility-size">Facility Floor Area:</label>
                <span className="text-purple-300 font-mono font-bold">{facilitySize.toLocaleString()} sq ft</span>
              </div>
              <input
                id="architect-facility-size"
                name="facilitySize"
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={facilitySize}
                onChange={(e) => setFacilitySize(Number(e.target.value))}
                aria-label="Facility floor area in square feet"
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Building & Floor Counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="architect-building-count" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                  Buildings:
                </label>
                <input
                  id="architect-building-count"
                  name="buildingCount"
                  type="number"
                  min="1"
                  max="50"
                  value={buildingCount}
                  onChange={(e) => setBuildingCount(Number(e.target.value))}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="architect-floor-count" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1">
                  Floors per Building:
                </label>
                <input
                  id="architect-floor-count"
                  name="floorCount"
                  type="number"
                  min="1"
                  max="100"
                  value={floorCount}
                  onChange={(e) => setFloorCount(Number(e.target.value))}
                  className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Staff / Users */}
            <div>
              <label htmlFor="architect-user-count" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1.5">
                Employees / Daily Occupants:
              </label>
              <input
                id="architect-user-count"
                name="userCount"
                type="number"
                min="5"
                max="10000"
                value={userCount}
                onChange={(e) => setUserCount(Number(e.target.value))}
                className="w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Deployment Preference */}
            <div>
              <span className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1.5">
                Deployment Model Preference:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['Hybrid', 'Cloud-Native', 'On-Premise'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDeploymentPreference(mode)}
                    aria-pressed={deploymentPreference === mode}
                    aria-label={`Select ${mode} deployment model`}
                    className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors flex items-center justify-center text-center ${
                      deploymentPreference === mode
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Operational Pain Points */}
            <div>
              <label htmlFor="architect-pain-points" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1.5">
                Key Operational Challenges:
              </label>
              <textarea
                id="architect-pain-points"
                name="painPoints"
                rows={2}
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none min-h-[70px]"
                placeholder="Describe your security, phone routing, or audio needs..."
              />
            </div>

            {/* Generate Blueprint CTA Button */}
            <button
              id="btn-generate-ai-blueprint"
              onClick={handleGenerateArchitecture}
              disabled={isLoading}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI System Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Right Column (7/12): Architectural Blueprint Display */}
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between">
            {recommendation ? (
              <div className="space-y-5">
                {/* Blueprint Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        ZEECOM Integrated System Blueprint
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      Tailored for: {facilityType} • {recommendation.deploymentModel} Deployment
                    </p>
                  </div>

                  <button
                    onClick={handleCopySpec}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shrink-0"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy RFP Summary'}</span>
                  </button>
                </div>

                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-purple-200 leading-relaxed">
                  <span className="font-bold text-purple-300 block mb-1">Executive Recommendation:</span>
                  {recommendation.executiveSummary}
                </div>

                {/* Sizing Matrix: 3 Domains Cards - 1 col on mobile, 3 col on tablet/desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Domain 1: Surveillance */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs sm:text-sm mb-2">
                      <Shield className="w-4 h-4 shrink-0" />
                      <span>Surveillance & Access</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white font-mono">
                      {recommendation.surveillanceArchitecture.cameraCount} <span className="text-xs font-normal text-slate-400">Cameras</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                      {recommendation.surveillanceArchitecture.accessControlPoints} MFA Door Points
                    </div>
                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      {recommendation.surveillanceArchitecture.keyAnalytics.map((a, i) => (
                        <div key={i} className="truncate">• {a}</div>
                      ))}
                    </div>
                  </div>

                  {/* Domain 2: VoIP */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-sm mb-2">
                      <PhoneCall className="w-4 h-4 shrink-0" />
                      <span>VoIP & CRM</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white font-mono">
                      {recommendation.voipArchitecture.recommendedSeats} <span className="text-xs font-normal text-slate-400">Seats</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                      {recommendation.voipArchitecture.trunkCapacity}
                    </div>
                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      {recommendation.voipArchitecture.omnichannelFeatures.map((f, i) => (
                        <div key={i} className="truncate">• {f}</div>
                      ))}
                    </div>
                  </div>

                  {/* Domain 3: Audio */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs sm:text-sm mb-2">
                      <Volume2 className="w-4 h-4 shrink-0" />
                      <span>IP-Audio & PA</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white font-mono">
                      {recommendation.audioArchitecture.speakerCount} <span className="text-xs font-normal text-slate-400">Speakers</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                      {recommendation.audioArchitecture.recommendedZones} Addressable Zones
                    </div>
                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      {recommendation.audioArchitecture.speakerTypes.map((s, i) => (
                        <div key={i} className="truncate">• {s}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline & Estimated Investment Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Commissioning Timeline</span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">{recommendation.timelineWeeks} Weeks Turnkey</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Estimated System Range</span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">{recommendation.estimatedInvestmentRange}</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 block mb-2">Quantifiable Value & ROI:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                    {recommendation.keyBenefits.map((ben, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-slate-400">Ready to proceed with engineering schematics?</span>
                  <button
                    onClick={onOpenConsultation}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/20 flex items-center justify-center"
                  >
                    Request Detailed Proposal & Survey
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Placeholder State */
              <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-6 sm:p-8 border-2 border-dashed border-slate-800 rounded-xl">
                <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Intelligent Architecture Blueprint Generator
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mt-2 leading-relaxed">
                  Configure your facility area and user count on the left, then click <strong>"Generate AI System Blueprint"</strong> to compute an enterprise Bill of Materials (BOM) & network architecture.
                </p>
                <button
                  onClick={handleGenerateArchitecture}
                  className="mt-6 min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>Quick Test with Corporate HQ Preset</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
