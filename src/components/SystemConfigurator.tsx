import React, { useState } from 'react';
import { Sliders, Shield, PhoneCall, Volume2, Server, Check, ArrowRight, Download, DollarSign, Calculator, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/companyData';

interface SystemConfiguratorProps {
  onOpenConsultation: () => void;
}

export const SystemConfigurator: React.FC<SystemConfiguratorProps> = ({ onOpenConsultation }) => {
  // Config state
  const [cameraQty, setCameraQty] = useState(16);
  const [cameraTier, setCameraTier] = useState<'AI_4K' | 'AI_PTZ' | 'THERMAL'>('AI_4K');
  const [accessDoors, setAccessDoors] = useState(6);
  const [voipSeats, setVoipSeats] = useState(35);
  const [voipTier, setVoipTier] = useState<'STANDARD' | 'CRM_OMNICHANNEL' | 'AI_CONTACT_CENTER'>('CRM_OMNICHANNEL');
  const [speakerQty, setSpeakerQty] = useState(12);
  const [audioZones, setAudioZones] = useState(4);
  const [deploymentModel, setDeploymentModel] = useState<'Hybrid' | 'Cloud-Native' | 'On-Premise'>('Hybrid');
  const [slaTier, setSlaTier] = useState<'STANDARD' | 'ENTERPRISE_247' | 'MISSION_CRITICAL'>('ENTERPRISE_247');

  // Pricing constants (representative enterprise estimating model)
  const cameraUnitCost = cameraTier === 'AI_4K' ? 380 : cameraTier === 'AI_PTZ' ? 850 : 1200;
  const accessDoorUnitCost = 750; // Reader + controller + lock
  const voipPhoneUnitCost = 140; // Certified IP desk phone or license
  const speakerUnitCost = 280; // 30W PoE / 123dB horn

  // Total Hardware & Commissioning Estimate
  const totalHardware = 
    cameraQty * cameraUnitCost +
    accessDoors * accessDoorUnitCost +
    voipSeats * voipPhoneUnitCost +
    speakerQty * speakerUnitCost +
    3200; // Base IP Core Gateway / PoE Switch infrastructure

  // Monthly Recurring Services & SLA
  const monthlySlaPerSeat = voipTier === 'STANDARD' ? 18 : voipTier === 'CRM_OMNICHANNEL' ? 28 : 42;
  const monthlySlaBase = slaTier === 'STANDARD' ? 250 : slaTier === 'ENTERPRISE_247' ? 550 : 950;
  const totalMonthly = (voipSeats * monthlySlaPerSeat) + (cameraQty * 12) + monthlySlaBase;

  const handleDownloadEstimate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const quoteSummary = `
================================================
       ZEECOM SOLUTION - FORMAL ESTIMATE
================================================
Company: ${COMPANY_INFO.name}
Head Office: ${COMPANY_INFO.address.full}
Direct Telephone: ${COMPANY_INFO.phone}
Official Web Portal: ${COMPANY_INFO.website}
Official Email: ${COMPANY_INFO.email}
------------------------------------------------
Date: ${new Date().toLocaleDateString()}
Deployment Architecture: ${deploymentModel}
SLA Level: ${slaTier.replace('_', ' ')}

1. PHYSICAL SECURITY & ACCESS CONTROL
- ${cameraQty}x Cameras (${cameraTier.replace('_', ' ')}): $${(cameraQty * cameraUnitCost).toLocaleString()}
- ${accessDoors}x Biometric MFA Access Control Doors: $${(accessDoors * accessDoorUnitCost).toLocaleString()}

2. UNIFIED VOIP & CRM CONTACT CENTER
- ${voipSeats}x Agent Seats & Certified IP Endpoints: $${(voipSeats * voipPhoneUnitCost).toLocaleString()}
- Feature Tier: ${voipTier.replace('_', ' ')}

3. IP-AUDIO & PA SOUND DISTRIBUTION
- ${speakerQty}x 30W PoE / 123dB Horn Speakers: $${(speakerQty * speakerUnitCost).toLocaleString()}
- Addressable Audio Zones: ${audioZones}

4. NETWORK & POE CORE INFRASTRUCTURE
- Base Hardened Core Switch & VMS Server: $3,200

------------------------------------------------
ESTIMATED INITIAL HARDWARE & COMMISSIONING: $${totalHardware.toLocaleString()} USD
ESTIMATED MONTHLY CLOUD/SIP & 24/7 SLA: $${totalMonthly.toLocaleString()} USD/mo
------------------------------------------------
Notice: Final pricing subject to site acoustic survey and structured cabling scope.
ZEECOM SOLUTION • Carrier-Grade Reliability • 99.99% SLA
================================================
    `.trim();

    const blob = new Blob([quoteSummary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZEECOM-Estimate-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
  };

  return (
    <section id="configurator" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Solution Sizer</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Custom Solution Sizer & Investment Estimator
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Adjust equipment quantities, select AI feature tiers, and preview immediate hardware and ongoing carrier-grade SLA investment estimates.
          </p>
        </div>

        {/* Configurator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7/12): Sliders & Selection Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Group 1: Surveillance & Access */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Domain 01: AI Surveillance & Access Control</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">99.87% Facial MFA</span>
              </div>

              {/* Cameras Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <label htmlFor="config-camera-qty">AI Video Surveillance Cameras:</label>
                  <span className="text-blue-400 font-mono font-bold">{cameraQty} Cameras</span>
                </div>
                <input
                  id="config-camera-qty"
                  name="cameraQty"
                  type="range"
                  min="2"
                  max="128"
                  value={cameraQty}
                  onChange={(e) => setCameraQty(Number(e.target.value))}
                  aria-label="AI Video Surveillance Cameras Quantity"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              {/* Camera Tier */}
              <div>
                <span className="text-xs text-slate-300 block mb-1.5">Camera Sensor Capability Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCameraTier('AI_4K')}
                    aria-pressed={cameraTier === 'AI_4K'}
                    aria-label="Select 4K AI Smart Dome Camera Tier"
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      cameraTier === 'AI_4K' ? 'bg-blue-950/60 border-blue-400 text-blue-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    4K AI Smart Dome
                  </button>
                  <button
                    type="button"
                    onClick={() => setCameraTier('AI_PTZ')}
                    aria-pressed={cameraTier === 'AI_PTZ'}
                    aria-label="Select Optical PTZ Auto-Track Camera Tier"
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      cameraTier === 'AI_PTZ' ? 'bg-blue-950/60 border-blue-400 text-blue-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    Optical PTZ Auto-Track
                  </button>
                  <button
                    type="button"
                    onClick={() => setCameraTier('THERMAL')}
                    aria-pressed={cameraTier === 'THERMAL'}
                    aria-label="Select Thermal and Perimeter Camera Tier"
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      cameraTier === 'THERMAL' ? 'bg-blue-950/60 border-blue-400 text-blue-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    Thermal & Perimeter
                  </button>
                </div>
              </div>

              {/* Access Doors Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <label htmlFor="config-access-doors">Biometric Touchless Access Control Doors:</label>
                  <span className="text-blue-400 font-mono font-bold">{accessDoors} Doors / Turnstiles</span>
                </div>
                <input
                  id="config-access-doors"
                  name="accessDoors"
                  type="range"
                  min="1"
                  max="64"
                  value={accessDoors}
                  onChange={(e) => setAccessDoors(Number(e.target.value))}
                  aria-label="Biometric Touchless Access Control Doors Quantity"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>
            </div>

            {/* Group 2: VoIP CRM */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <PhoneCall className="w-4 h-4" />
                  <span>Domain 02: VoIP CRM & Contact Center</span>
                </div>
                <span className="text-xs text-slate-300 font-mono">99.99% Uptime</span>
              </div>

              {/* VoIP Seats Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <label htmlFor="config-voip-seats">VoIP Telephony Agent Seats & IP Endpoints:</label>
                  <span className="text-emerald-400 font-mono font-bold">{voipSeats} Users</span>
                </div>
                <input
                  id="config-voip-seats"
                  name="voipSeats"
                  type="range"
                  min="5"
                  max="250"
                  value={voipSeats}
                  onChange={(e) => setVoipSeats(Number(e.target.value))}
                  aria-label="VoIP Telephony Agent Seats and IP Endpoints Quantity"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* VoIP Tier */}
              <div>
                <span className="text-xs text-slate-300 block mb-1.5">Telephony & CRM Integration Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setVoipTier('STANDARD')}
                    aria-pressed={voipTier === 'STANDARD'}
                    aria-label="Select Standard Cloud PBX Tier"
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      voipTier === 'STANDARD' ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    Standard Cloud PBX
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoipTier('CRM_OMNICHANNEL')}
                    aria-pressed={voipTier === 'CRM_OMNICHANNEL'}
                    aria-label="Select CRM Screen-Pop and SMS Tier"
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      voipTier === 'CRM_OMNICHANNEL' ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    CRM Screen-Pop + SMS
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoipTier('AI_CONTACT_CENTER')}
                    aria-pressed={voipTier === 'AI_CONTACT_CENTER'}
                    aria-label="Select AI Speech Contact Center Tier"
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors ${
                      voipTier === 'AI_CONTACT_CENTER' ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    AI Speech Contact Center
                  </button>
                </div>
              </div>
            </div>

            {/* Group 3: IP Audio */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Volume2 className="w-4 h-4" />
                  <span>Domain 03: IP-Audio & Public Address</span>
                </div>
                <span className="text-xs text-slate-300 font-mono">123dB SPL PoE</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                    <label htmlFor="config-speaker-qty">PoE IP Speakers:</label>
                    <span className="text-amber-400 font-mono font-bold">{speakerQty} Units</span>
                  </div>
                  <input
                    id="config-speaker-qty"
                    name="speakerQty"
                    type="range"
                    min="4"
                    max="100"
                    value={speakerQty}
                    onChange={(e) => setSpeakerQty(Number(e.target.value))}
                    aria-label="PoE IP Speakers Quantity"
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                    <label htmlFor="config-audio-zones">Addressable Zones:</label>
                    <span className="text-amber-400 font-mono font-bold">{audioZones} Zones</span>
                  </div>
                  <input
                    id="config-audio-zones"
                    name="audioZones"
                    type="range"
                    min="1"
                    max="24"
                    value={audioZones}
                    onChange={(e) => setAudioZones(Number(e.target.value))}
                    aria-label="Addressable Audio Zones Quantity"
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5/12): Live Estimate Card & Download */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Estimated Investment Summary</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Real-time equipment & carrier estimate</p>
                </div>
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <DollarSign className="w-5 h-5" />
                </span>
              </div>

              {/* Cost Highlight Totals */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300 block mb-1">
                    Turnkey Hardware, Commissioning & Integration:
                  </span>
                  <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-1">
                    <span>${totalHardware.toLocaleString()}</span>
                    <span className="text-xs text-slate-300 font-normal">USD (One-time)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300 block mb-1">
                    Cloud Infrastructure, SIP Trunks & 24/7 SLA:
                  </span>
                  <div className="text-2xl font-bold text-cyan-300 font-mono flex items-baseline gap-1">
                    <span>${totalMonthly.toLocaleString()}</span>
                    <span className="text-xs text-slate-300 font-normal">USD / Month</span>
                  </div>
                </div>
              </div>

              {/* Itemized Breakdown List */}
              <div className="mt-6 space-y-2 text-xs">
                <span className="text-slate-300 uppercase tracking-wider text-[11px] font-bold block mb-2">
                  System Equipment Schedule:
                </span>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-200">• {cameraQty}x AI Cameras ({cameraTier})</span>
                  <span className="text-white font-mono font-semibold">${(cameraQty * cameraUnitCost).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-200">• {accessDoors}x Biometric Access Doors</span>
                  <span className="text-white font-mono font-semibold">${(accessDoors * accessDoorUnitCost).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-200">• {voipSeats}x VoIP Agent Phones/Seats</span>
                  <span className="text-white font-mono font-semibold">${(voipSeats * voipPhoneUnitCost).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-200">• {speakerQty}x 30W PoE / Horn Speakers</span>
                  <span className="text-white font-mono font-semibold">${(speakerQty * speakerUnitCost).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <button
                id="btn-download-estimate"
                onClick={handleDownloadEstimate}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Formal RFP Estimate</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Lock In Pricing with Site Survey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
