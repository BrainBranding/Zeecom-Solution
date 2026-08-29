import React, { useState } from 'react';
import { Volume2, Radio, Bell, AlertOctagon, CheckCircle, Flame, Mic, ShieldCheck, Megaphone, Sliders, Square, Play } from 'lucide-react';
import { SOLUTIONS_DATA, MOCK_AUDIO_ZONES } from '../data/companyData';
import { AudioZone } from '../types';
import { soundFx } from '../utils/soundEffects';

interface SolutionAudioProps {
  onOpenConsultation: () => void;
}

export const SolutionAudio: React.FC<SolutionAudioProps> = ({ onOpenConsultation }) => {
  const data = SOLUTIONS_DATA[2]; // IP Audio PA

  // Interactive Simulator States
  const [zones, setZones] = useState<AudioZone[]>(MOCK_AUDIO_ZONES);
  const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>(['ZONE-01', 'ZONE-02']);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('Attention all personnel: Fire alarm test will commence at 14:00.');

  const toggleZoneSelect = (id: string) => {
    setSelectedZoneIds(prev =>
      prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]
    );
  };

  const selectAllZones = () => {
    setSelectedZoneIds(zones.map(z => z.id));
  };

  const handleVolumeChange = (id: string, newVol: number) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, volume: newVol } : z));
  };

  // Play realistic synthesized dual-tone PA chime via Web Audio API
  const handlePlayChime = () => {
    soundFx.playDualToneChime();
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
    }, 4000);
  };

  // Trigger high-urgency emergency siren across all zones
  const handleEmergencyAlert = () => {
    setIsEmergencyActive(true);
    soundFx.playEmergencySiren();
    setZones(prev => prev.map(z => ({
      ...z,
      status: 'EMERGENCY_ALERT',
      volume: 100
    })));
  };

  const handleResetEmergency = () => {
    setIsEmergencyActive(false);
    setZones(MOCK_AUDIO_ZONES);
  };

  return (
    <section id="ip-audio" className="py-14 sm:py-18 bg-slate-950 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Domain Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5" />
            <span>{data.badge} • Core Domain</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-amber-300 font-medium">
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
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    {idx === 0 && <Volume2 className="w-5 h-5" />}
                    {idx === 1 && <Radio className="w-5 h-5" />}
                    {idx === 2 && <Bell className="w-5 h-5" />}
                    {idx === 3 && <AlertOctagon className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400">{cap.description}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-4 text-sm sm:text-base text-slate-300">
                  {cap.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE IP-AUDIO MULTI-ZONE BROADCAST SIMULATOR */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-16 p-4 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Interactive IP-Audio Multi-Zone Broadcast Simulator
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  123dB SPL • PoE Powered
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                Select zones, synthesize authentic dual-tone acoustic chimes via Web Audio API, trigger emergency sirens, and adjust individual SPL volumes.
              </p>
            </div>

            {/* Sound Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
              <button
                id="btn-play-chime"
                onClick={handlePlayChime}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Bell className="w-4 h-4" />
                <span>Play PA Chime Tone</span>
              </button>

              {!isEmergencyActive ? (
                <button
                  id="btn-trigger-emergency-audio"
                  onClick={handleEmergencyAlert}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-red-400" />
                  <span>Trigger Mass Evacuation Siren</span>
                </button>
              ) : (
                <button
                  onClick={handleResetEmergency}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm animate-pulse flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <Square className="w-4 h-4" />
                  <span>Silence Alarm & Clear State</span>
                </button>
              )}
            </div>
          </div>

          {/* Emergency Alert Banner */}
          {isEmergencyActive && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-pulse">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400 shrink-0" />
                <span>CRITICAL EVACUATION OVERRIDE ENGAGED ACROSS ALL 250+ ADDRESSABLE ZONES. 123dB HIGH-OUTPUT ACTIVE.</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-800 text-white text-[10px] shrink-0">ALL ZONES OVERRIDDEN</span>
            </div>
          )}

          {/* Broadcasting Live Audio Banner */}
          {isBroadcasting && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-950/60 border border-amber-500 text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>LIVE VOICE BROADCAST TRANSMITTING TO SELECTED ZONES ({selectedZoneIds.length} ACTIVE).</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-3 bg-amber-400 animate-bounce" />
                <span className="w-1.5 h-4 bg-amber-400 animate-bounce [animation-delay:100ms]" />
                <span className="w-1.5 h-2 bg-amber-400 animate-bounce [animation-delay:200ms]" />
              </div>
            </div>
          )}

          {/* Simulator Content Grid - Single column below 1024px */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Granular Zones Manager */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Addressable Audio Zones ({zones.length} shown / 250+ capacity)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={selectAllZones}
                    aria-label="Select all audio zones"
                    className="min-h-[44px] px-3 py-1.5 inline-flex items-center text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    Select All
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={() => setSelectedZoneIds([])}
                    aria-label="Deselect all audio zones"
                    className="min-h-[44px] px-3 py-1.5 inline-flex items-center text-xs sm:text-sm text-slate-400 hover:text-white font-semibold"
                  >
                    Deselect
                  </button>
                </div>
              </div>

              {zones.map((zone) => {
                const isSelected = selectedZoneIds.includes(zone.id);
                return (
                  <div
                    key={zone.id}
                    className={`p-4 rounded-xl border transition-all ${
                      zone.status === 'EMERGENCY_ALERT'
                        ? 'bg-red-950/40 border-red-500/60'
                        : isSelected
                        ? 'bg-slate-900/90 border-amber-500/50 shadow-md shadow-amber-500/5'
                        : 'bg-slate-950 border-slate-800 opacity-70'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <input
                          id={`audio-zone-${zone.id}`}
                          name={`zone-${zone.id}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleZoneSelect(zone.id)}
                          aria-label={`Select ${zone.name} for broadcast`}
                          className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer shrink-0"
                        />
                        <div>
                          <label htmlFor={`audio-zone-${zone.id}`} className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-2 cursor-pointer">
                            <span>{zone.name}</span>
                            <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                              {zone.activeSpeakers} Speakers
                            </span>
                          </label>
                          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300 mt-0.5">
                            <span>{zone.category}</span>
                            <span>•</span>
                            <span className="text-amber-400 font-mono font-semibold">{zone.splRating}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-mono">{zone.powerUsage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Zone Status Tag */}
                      <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded font-mono font-semibold ${
                        zone.status === 'EMERGENCY_ALERT'
                          ? 'bg-red-500 text-white animate-pulse'
                          : zone.status === 'BROADCASTING'
                          ? 'bg-amber-500/20 text-amber-300'
                          : zone.status === 'BACKGROUND_MUSIC'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {zone.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Zone Volume Slider */}
                    <div className="mt-3 flex items-center gap-3 text-xs pt-2 border-t border-slate-800/80">
                      <Volume2 className="w-4 h-4 text-slate-300 shrink-0" />
                      <label htmlFor={`audio-volume-${zone.id}`} className="text-xs text-slate-300 w-16 font-mono shrink-0">
                        Vol: {zone.volume}%
                      </label>
                      <input
                        id={`audio-volume-${zone.id}`}
                        name={`volume-${zone.id}`}
                        type="range"
                        min="0"
                        max="100"
                        value={zone.volume}
                        onChange={(e) => handleVolumeChange(zone.id, Number(e.target.value))}
                        aria-label={`Volume level for ${zone.name}`}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 5 Cols: Public Address Master Control Station */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-bold text-white">PA Station Paging Mic</span>
                  </div>
                  <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                    SIP & ONVIF Ready
                  </span>
                </div>

                {/* Broadcast message prompt */}
                <div className="mt-4">
                  <label htmlFor="audio-broadcast-message" className="text-xs sm:text-sm font-semibold text-slate-200 block mb-1.5">
                    Live Broadcast Announcement Text:
                  </label>
                  <textarea
                    id="audio-broadcast-message"
                    name="broadcastMessage"
                    rows={3}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    aria-label="Live Broadcast Announcement Text"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 resize-none min-h-[80px]"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-300 font-medium">Target: {selectedZoneIds.length} Zones</span>
                    <button
                      onClick={handlePlayChime}
                      aria-label="Transmit Paging Announcement"
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Transmit Paging</span>
                    </button>
                  </div>
                </div>

                {/* Key Spec Highlights */}
                <div className="mt-5 space-y-2 pt-4 border-t border-slate-800 text-xs sm:text-sm">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Speaker-as-a-Mic</span>
                    <span className="text-amber-300 font-semibold font-mono">2-Way Intercom</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Hardware Root of Trust</span>
                    <span className="text-emerald-400 font-semibold font-mono">Cryptographically Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Cabling Standard</span>
                    <span className="text-cyan-300 font-semibold font-mono">CAT6 PoE (No 70V)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted digital audio transmission prevents wiretapping and unauthorized overrides.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Ideal For - Single column on mobile, 2-col on desktop */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Acoustic & Operational Advantages</span>
            </h3>
            <div className="space-y-3.5">
              {data.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-sm sm:text-base font-semibold text-white">{ben.title}:</strong>{' '}
                    <span className="text-sm sm:text-base text-slate-300">{ben.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Ideal For High-Noise & Campus Facilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.idealFor.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs sm:text-sm text-slate-400">Need acoustic modeling for your facility?</span>
              <button
                onClick={onOpenConsultation}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center"
              >
                Request Acoustic Site Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
