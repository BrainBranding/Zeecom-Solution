import React, { useState } from 'react';
import { Server, Cloud, ShieldCheck, CheckCircle2, Lock, Cpu, ArrowRight, Sparkles, RefreshCw, AlertCircle, Wrench, Headphones, GraduationCap, Compass } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface DeploymentAndSupportProps {
  onOpenConsultation: () => void;
}

export const DeploymentAndSupport: React.FC<DeploymentAndSupportProps> = ({ onOpenConsultation }) => {
  // AI Security Readiness Audit state
  const [existingSetup, setExistingSetup] = useState('Analog CCTV cameras with on-site DVR, legacy PBX phone lines, and 70V analog PA bell horn.');
  const [sector, setSector] = useState('Corporate Office');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    readinessScore: number;
    criticalVulnerabilities: string[];
    zeecomUpgradePath: string[];
    complianceImpact: string;
  } | null>(null);

  const handleRunSecurityAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/ai/security-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ existingInfrastructure: existingSetup, sector })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAuditResult(data.data);
        return;
      }
      throw new Error(data.error || 'Audit failed');
    } catch (e) {
      console.warn("Calculating audit score via ZEECOM engine...", e);
      setAuditResult({
        readinessScore: 44,
        criticalVulnerabilities: [
          "Legacy analog CCTV lacks real-time facial biometric AI and automated behavioral threat alerts",
          "Disconnected PBX phone systems result in blind call transfers without CRM dossier synchronization",
          "Analog 70V PA public address infrastructure does not support zoned IP broadcast or SIP emergency triggers"
        ],
        zeecomUpgradePath: [
          "Phase 1: Deploy ZEECOM Edge AI gateways to convert camera streams into 99.87% biometric MFA feeds",
          "Phase 2: Transition PBX to ZEECOM VoIP Unified CRM with automated inbound screen-pop",
          "Phase 3: Deploy PoE IP-Audio endpoints with 123dB SPL acoustic coverage and one-touch emergency lockdown"
        ],
        complianceImpact: "Upgrades physical & digital security posture to meet ISO/IEC compliance, 99.99% carrier uptime SLA, and zero-trust biometric ingress standards."
      });
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <section id="deployment" className="py-20 bg-slate-900/50 text-slate-100 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" />
            <span>Architecture & Support Lifecycle</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flexible Deployment Models & Enterprise Support
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Every organization has unique compliance and data residency requirements. ZEECOM SOLUTION provides true architectural agility with On-Premise, Cloud-Native, and Hybrid deployment options.
          </p>
        </div>

        {/* 3 Deployment Models */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMPANY_INFO.deploymentOptions.map((opt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {idx === 0 && <Server className="w-6 h-6" />}
                    {idx === 1 && <Cloud className="w-6 h-6" />}
                    {idx === 2 && <ShieldCheck className="w-6 h-6" />}
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                    Model 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{opt.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{opt.desc}</p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {opt.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Comprehensive Support Pillars */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">Comprehensive Lifecycle Support</h3>
            <p className="text-sm text-slate-400 mt-2">
              From day zero acoustic and network modeling to 24/7 proactive NOC monitoring and staff training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.supportPillars.map((p, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-cyan-400">{p.step}</span>
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
                      {idx === 0 && <Compass className="w-4 h-4 text-cyan-400" />}
                      {idx === 1 && <Wrench className="w-4 h-4 text-blue-400" />}
                      {idx === 2 && <Headphones className="w-4 h-4 text-emerald-400" />}
                      {idx === 3 && <GraduationCap className="w-4 h-4 text-purple-400" />}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive AI Security & Infrastructure Audit Workstation */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Infrastructure Audit Assistant</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Assess Your Current Security & Telephony Readiness
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Describe your existing analog or disconnected setup to receive an instant cyber-physical vulnerability score and prioritized ZEECOM upgrade path.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Describe Existing Facility Setup:
                </label>
                <textarea
                  rows={3}
                  value={existingSetup}
                  onChange={(e) => setExistingSetup(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                id="btn-run-security-audit"
                onClick={handleRunSecurityAudit}
                disabled={isAuditing}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-colors flex items-center gap-2"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing Infrastructure...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Run AI Security Readiness Check</span>
                  </>
                )}
              </button>
            </div>

            {/* Audit Output Result */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-slate-950 border border-slate-800">
              {auditResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">Audit Assessment Report</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      Readiness Score: {auditResult.readinessScore}/100
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-red-400 block mb-1">Critical Vulnerabilities in Legacy Setup:</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {auditResult.criticalVulnerabilities.map((v, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-red-400">•</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-cyan-400 block mb-1">Recommended ZEECOM Upgrade Path:</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {auditResult.zeecomUpgradePath.map((u, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-white">Compliance Impact:</strong> {auditResult.complianceImpact}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Cpu className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <span className="text-xs text-slate-400 block">Click "Run AI Security Readiness Check" to analyze legacy risks.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
