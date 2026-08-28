import React, { useState } from 'react';
import { Shield, Camera, KeyRound, LayoutDashboard, Lock, AlertTriangle, CheckCircle, Eye, RefreshCw, Radio, UserCheck, Play, Pause, Flame, ShieldAlert, Cpu } from 'lucide-react';
import { SOLUTIONS_DATA, MOCK_CAMERA_FEEDS, MOCK_ACCESS_LOGS } from '../data/companyData';
import { CameraFeed, AccessLog } from '../types';
import { soundFx } from '../utils/soundEffects';

interface SolutionSurveillanceProps {
  onOpenConsultation: () => void;
}

export const SolutionSurveillance: React.FC<SolutionSurveillanceProps> = ({ onOpenConsultation }) => {
  const data = SOLUTIONS_DATA[0]; // AI Surveillance
  
  // Interactive Simulator States
  const [selectedCam, setSelectedCam] = useState<CameraFeed>(MOCK_CAMERA_FEEDS[0]);
  const [showAiBoxes, setShowAiBoxes] = useState(true);
  const [lockdownActive, setLockdownActive] = useState(false);
  const [anomalySimulated, setAnomalySimulated] = useState(false);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>(MOCK_ACCESS_LOGS);

  const triggerAnomaly = () => {
    setAnomalySimulated(true);
    soundFx.playEmergencySiren();
    
    // Add new flagged log
    const newLog: AccessLog = {
      id: `ACC-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString(),
      userName: "Unauthorized Subject Detected",
      userRole: "Blacklist Match",
      authMethod: "Facial Recognition",
      location: "North Loading Dock Bay 2",
      status: "FLAGGED",
      matchScore: "0.00%"
    };
    setAccessLogs(prev => [newLog, ...prev.slice(0, 5)]);

    // Select camera 3
    setSelectedCam(MOCK_CAMERA_FEEDS[2]);
  };

  const toggleLockdown = () => {
    if (!lockdownActive) {
      soundFx.playEmergencySiren();
      setLockdownActive(true);
    } else {
      setLockdownActive(false);
    }
  };

  const resetSimulator = () => {
    setLockdownActive(false);
    setAnomalySimulated(false);
    setSelectedCam(MOCK_CAMERA_FEEDS[0]);
    setAccessLogs(MOCK_ACCESS_LOGS);
  };

  return (
    <section id="ai-surveillance" className="py-16 sm:py-20 bg-slate-950 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Domain Badge & Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>{data.badge} • Core Domain</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-blue-300 font-medium">
            {data.tagline}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {data.overview}
          </p>
        </div>

        {/* 4 Capabilities Grid - Single column on mobile, 2 cols on tablet/desktop */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    {idx === 0 && <Camera className="w-5 h-5" />}
                    {idx === 1 && <KeyRound className="w-5 h-5" />}
                    {idx === 2 && <LayoutDashboard className="w-5 h-5" />}
                    {idx === 3 && <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300">{cap.description}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-4 text-sm sm:text-base text-slate-200">
                  {cap.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE LIVE SECURITY CONSOLE SIMULATOR */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-16 p-4 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-blue-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Interactive Unified Security Command Console
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                  Live AI Engine Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                Test real-time video analytics, touchless facial MFA authentication, loitering anomaly alerts, and facility lockdown triggers.
              </p>
            </div>

            {/* Simulator Action Buttons - Touch friendly */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
              <button
                onClick={() => setShowAiBoxes(!showAiBoxes)}
                aria-label="Toggle AI Vision Bounding Boxes"
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors flex items-center gap-1.5 ${
                  showAiBoxes
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>AI Vision: {showAiBoxes ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={triggerAnomaly}
                aria-label="Simulate Anomaly Security Threat"
                className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Simulate Anomaly</span>
              </button>

              <button
                onClick={toggleLockdown}
                aria-label="Engage or Release Facility Lockdown"
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-1.5 ${
                  lockdownActive
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 animate-pulse'
                    : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{lockdownActive ? 'RELEASE LOCKDOWN' : 'TRIGGER LOCKDOWN'}</span>
              </button>

              <button
                onClick={resetSimulator}
                aria-label="Reset Security Console"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Reset Console"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lockdown Banner if active */}
          {lockdownActive && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-950/80 border border-red-600 text-red-100 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-pulse">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400 shrink-0" />
                <span>FACILITY LOCKDOWN PROTOCOL ENGAGED: ALL PERIMETER ACCESS DOORS ELECTRICALLY SEALED & IP-AUDIO EVACUATION BROADCAST TRIGGERED.</span>
              </div>
              <span className="px-2 py-1 rounded bg-red-800 text-white text-xs shrink-0">CODE RED</span>
            </div>
          )}

          {/* Console Grid Layout - Single column below 1024px, 3-column on desktop */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Video Feed Display */}
            <div className="lg:col-span-2 space-y-4">
              {/* Active Video Screen Container */}
              <div className="relative w-full h-auto aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner flex flex-col justify-between p-3 sm:p-4">
                {/* Simulated Camera Video Background Graphic */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-full opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Decorative Camera Floor Simulation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-4/5 h-4/5 border border-cyan-500/10 rounded-lg flex items-center justify-center">
                      <div className="w-1/2 h-1/2 border border-cyan-500/20 rounded-md flex items-center justify-center">
                        <Camera className="w-10 sm:w-12 h-10 sm:h-12 text-slate-700/50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video HUD Top Overlays */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-800 max-w-full truncate">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <span className="font-mono font-bold text-white">{selectedCam.id}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-200 font-medium truncate">{selectedCam.name}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] bg-slate-900/90 px-2 sm:px-2.5 py-1 rounded-md border border-slate-800 text-slate-200">
                    <span className="text-cyan-400">{selectedCam.resolution}</span>
                    <span>{selectedCam.fps} FPS</span>
                    <span className="text-emerald-400 hidden xs:inline">ONVIF SECURE</span>
                  </div>
                </div>

                {/* Simulated AI Vision Bounding Boxes Overlay */}
                {showAiBoxes && (
                  <div className="relative z-10 my-auto grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-6 p-2 sm:p-4">
                    {/* Bounding Box 1: Verified Face */}
                    <div className="relative p-2.5 sm:p-3 rounded-lg border-2 border-emerald-400/80 bg-emerald-950/40 backdrop-blur-xs max-w-full sm:w-48 shadow-lg shadow-emerald-500/10">
                      <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] sm:text-[10px] font-bold tracking-tight">
                        99.87% FACE VERIFIED
                      </div>
                      <div className="text-[11px] sm:text-xs font-semibold text-emerald-300 mt-1">
                        Sarah Jenkins (VP)
                      </div>
                      <div className="text-[10px] text-slate-200">Access: GRANTED • Turnstile 2</div>
                    </div>

                    {/* Bounding Box 2: Anomaly / Detection */}
                    {selectedCam.id === 'CAM-03' || anomalySimulated ? (
                      <div className="relative p-2.5 sm:p-3 rounded-lg border-2 border-amber-400/90 bg-amber-950/40 backdrop-blur-xs max-w-full sm:w-52 shadow-lg shadow-amber-500/20 xs:ml-auto animate-pulse">
                        <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-bold">
                          AI BEHAVIOR ALERT (0.94)
                        </div>
                        <div className="text-[11px] sm:text-xs font-semibold text-amber-200 mt-1">
                          Loitering Anomaly &gt; 120s
                        </div>
                        <div className="text-[10px] text-slate-200">Bay 2 Perimeter Alert Sent</div>
                      </div>
                    ) : (
                      <div className="relative p-2.5 sm:p-3 rounded-lg border border-cyan-400/60 bg-cyan-950/40 backdrop-blur-xs max-w-full sm:w-44 xs:ml-auto">
                        <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 text-[9px] sm:text-[10px] font-bold">
                          PERSON (0.98)
                        </div>
                        <div className="text-[11px] sm:text-xs font-semibold text-cyan-200 mt-1">Authorized Path</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Video HUD Bottom Overlay */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-900/90 backdrop-blur-md p-2 sm:p-2.5 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-1.5 text-[11px] truncate">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white font-medium truncate">{selectedCam.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
                    <span className="text-slate-400 hidden xs:inline">Detections:</span>
                    {selectedCam.aiDetections.map((det, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                        {det.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Camera Grid Selector Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {MOCK_CAMERA_FEEDS.map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => setSelectedCam(cam)}
                    aria-label={`Select video feed for ${cam.name}`}
                    className={`min-h-[44px] p-2.5 sm:p-3 rounded-xl text-left border transition-all ${
                      selectedCam.id === cam.id
                        ? 'bg-blue-950/60 border-blue-400 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">{cam.id}</span>
                      <span className={`w-2 h-2 rounded-full ${cam.status === 'ALERT' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-1 truncate">{cam.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{cam.location}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right 1 Col: Live Access Control Log Stream */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-bold text-white">Live Access Logs</h4>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    99.87% MFA
                  </span>
                </div>

                {/* Log entries */}
                <div className="space-y-2.5 mt-3 max-h-[340px] sm:max-h-[380px] overflow-y-auto pr-1">
                  {accessLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-2.5 rounded-lg border text-xs transition-all ${
                        log.status === 'FLAGGED' || log.status === 'DENIED'
                          ? 'bg-red-950/40 border-red-500/40 text-red-200'
                          : 'bg-slate-900/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white truncate">{log.userName}</span>
                        <span className="font-mono text-[10px] text-slate-300">{log.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-slate-300">{log.authMethod}</span>
                        <span
                          className={`font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                            log.status === 'GRANTED'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {log.status} ({log.matchScore})
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">{log.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access Control Tech Highlight */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1.5 text-blue-300 font-semibold mb-1">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Hardware Hardened & Anti-Spoof</span>
                </div>
                <span>Supports touchless face, fingerprint, mobile NFC, & encrypted QR credentials.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Ideal For Section - Single column on mobile, 2-column on desktop */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Key Benefits */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Key Enterprise Benefits</span>
            </h3>
            <div className="space-y-3.5">
              {data.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-sm sm:text-base font-semibold text-white">{ben.title}:</strong>{' '}
                    <span className="text-sm sm:text-base text-slate-300">{ben.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal For Environments & CTA */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Ideal Environments & Sectors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.idealFor.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs sm:text-sm text-slate-400">Ready to modernize your physical security?</span>
              <button
                onClick={onOpenConsultation}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center"
              >
                Schedule Physical Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
