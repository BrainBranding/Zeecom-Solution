import React, { useState, useEffect } from 'react';
import { PhoneCall, Phone, UserCheck, MessageSquareText, Bot, CheckCircle, PhoneIncoming, PhoneOff, Mic, MicOff, Volume2, User, Building, Clock, FileText, Sparkles, MessageCircle, Send, Check, Play } from 'lucide-react';
import { SOLUTIONS_DATA, MOCK_CRM_CUSTOMERS } from '../data/companyData';
import { CrmCustomerRecord } from '../types';
import { soundFx } from '../utils/soundEffects';

interface SolutionVoIPProps {
  onOpenConsultation: () => void;
}

export const SolutionVoIP: React.FC<SolutionVoIPProps> = ({ onOpenConsultation }) => {
  const data = SOLUTIONS_DATA[1]; // VoIP CRM

  // Interactive Simulator States
  const [activeCustomer, setActiveCustomer] = useState<CrmCustomerRecord>(MOCK_CRM_CUSTOMERS[0]);
  const [callState, setCallState] = useState<'IDLE' | 'RINGING' | 'CONNECTED' | 'LOGGED'>('IDLE');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [dialNumber, setDialNumber] = useState('');
  const [crmNoteInput, setCrmNoteInput] = useState('');
  const [sentimentScore, setSentimentScore] = useState(94);
  const [activeTab, setActiveTab] = useState<'crm' | 'omnichannel' | 'analytics'>('crm');

  // Call timer effect
  useEffect(() => {
    let interval: any = null;
    if (callState === 'CONNECTED') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Simulate Inbound VIP Call
  const simulateInboundCall = () => {
    setCallState('RINGING');
    soundFx.playPhoneRing();
  };

  // Answer Call
  const answerCall = () => {
    setCallState('CONNECTED');
  };

  // Hangup & Log Call
  const endCall = () => {
    setCallState('LOGGED');
    setTimeout(() => {
      setCallState('IDLE');
    }, 4000);
  };

  // Add CRM note
  const handleAddNote = () => {
    if (!crmNoteInput.trim()) return;
    setActiveCustomer(prev => ({
      ...prev,
      notes: [crmNoteInput, ...prev.notes]
    }));
    setCrmNoteInput('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="voip-crm" className="py-16 sm:py-20 bg-slate-900/40 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Domain Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{data.badge} • Core Domain</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {data.title}
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-emerald-300 font-medium">
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
              className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {idx === 0 && <Phone className="w-5 h-5" />}
                    {idx === 1 && <UserCheck className="w-5 h-5" />}
                    {idx === 2 && <MessageSquareText className="w-5 h-5" />}
                    {idx === 3 && <Bot className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400">{cap.description}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-4 text-sm sm:text-base text-slate-300">
                  {cap.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE VOIP & CRM SCREEN-POP SIMULATOR */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-16 p-4 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-emerald-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Interactive VoIP Telephony & CRM Screen-Pop Simulator
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Carrier 99.99% Uptime
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                Experience click-to-call, automated inbound caller dossier popups, live sentiment scoring, and omnichannel synchronization.
              </p>
            </div>

            {/* Inbound Call Trigger */}
            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              <button
                id="btn-simulate-inbound-call"
                onClick={simulateInboundCall}
                disabled={callState === 'RINGING' || callState === 'CONNECTED'}
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  callState === 'IDLE'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <PhoneIncoming className="w-4 h-4" />
                <span>Simulate Inbound VIP Client Call</span>
              </button>
            </div>
          </div>

          {/* Simulator Main Body - Single column below 1024px */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Agent Softphone Interface */}
            <div className="lg:col-span-4 p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs sm:text-sm font-bold text-white">ZEECOM Agent Softphone</span>
                  </div>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                    Ext. 104 (Jennifer W.)
                  </span>
                </div>

                {/* Call Status Display Screen */}
                <div className={`mt-4 p-4 rounded-xl text-center border transition-all ${
                  callState === 'RINGING'
                    ? 'bg-amber-950/60 border-amber-400 text-amber-100 animate-pulse'
                    : callState === 'CONNECTED'
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-100'
                    : callState === 'LOGGED'
                    ? 'bg-blue-950/60 border-blue-400 text-blue-100'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}>
                  {callState === 'RINGING' && (
                    <div>
                      <div className="text-xs font-bold uppercase text-amber-300 tracking-wider">
                        Incoming VIP Call...
                      </div>
                      <div className="text-base font-bold text-white mt-1">{activeCustomer.name}</div>
                      <div className="text-xs text-slate-200">{activeCustomer.company}</div>
                      <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-3">
                        <button
                          onClick={answerCall}
                          className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Answer & Screen-Pop</span>
                        </button>
                        <button
                          onClick={() => setCallState('IDLE')}
                          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs sm:text-sm"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  )}

                  {callState === 'CONNECTED' && (
                    <div>
                      <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          CALL IN PROGRESS
                        </span>
                        <span className="font-mono text-sm">{formatTime(callDuration)}</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mt-2">{activeCustomer.name}</div>
                      <div className="text-xs text-slate-200 font-mono">{activeCustomer.phone}</div>

                      {/* Live Audio Waveform Simulation */}
                      <div className="my-3 flex items-center justify-center gap-1 h-6">
                        {[40, 75, 100, 60, 85, 45, 90, 70, 30, 80, 95, 50].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-emerald-400 rounded-full transition-all duration-150 animate-pulse"
                            style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
                          />
                        ))}
                      </div>

                      {/* Softphone In-Call Controls */}
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xl border text-xs flex items-center justify-center ${
                            isMuted ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                          title="Mute Mic"
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={endCall}
                          className="min-h-[44px] px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-red-600/30"
                        >
                          <PhoneOff className="w-4 h-4" />
                          <span>End & Auto-Log</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {callState === 'LOGGED' && (
                    <div className="py-2">
                      <Check className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-xs sm:text-sm font-bold text-white">Call Logged into CRM Automatically!</div>
                      <p className="text-[11px] text-slate-200 mt-1">Duration: {formatTime(callDuration)} • Audio Recording Archived</p>
                    </div>
                  )}

                  {callState === 'IDLE' && (
                    <div className="py-2">
                      <div className="text-xs sm:text-sm text-slate-200 font-mono font-medium">Softphone Ready • Line 1 Idle</div>
                      <div className="text-xs text-emerald-300 font-medium mt-1">Click any CRM contact to 1-Click Dial</div>
                    </div>
                  )}
                </div>

                {/* Softphone Keypad */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                    <button
                      key={digit}
                      onClick={() => setDialNumber(prev => prev + digit)}
                      className="min-h-[44px] p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-sm font-semibold border border-slate-800 transition-colors flex items-center justify-center"
                    >
                      {digit}
                    </button>
                  ))}
                </div>

                {/* Dial Input & Click-to-Call */}
                <div className="mt-3 flex items-center gap-2">
                  <label htmlFor="voip-dial-input" className="sr-only">
                    Phone number or SIP URI
                  </label>
                  <input
                    id="voip-dial-input"
                    name="dialInput"
                    type="text"
                    placeholder="Enter phone or SIP URI..."
                    aria-label="Enter phone number or SIP URI to dial"
                    value={dialNumber}
                    onChange={(e) => setDialNumber(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (dialNumber) {
                        setCallState('CONNECTED');
                      }
                    }}
                    aria-label="Dial phone number or SIP URI"
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shrink-0"
                  >
                    Dial
                  </button>
                </div>
              </div>

              {/* Certified IP Phone Models Support badge */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] sm:text-xs text-slate-300 flex flex-wrap items-center justify-between gap-1">
                <span>Compatible Ecosystem:</span>
                <span className="text-emerald-400 font-semibold font-mono">450+ IP Phones & 210+ SIP Trunks</span>
              </div>
            </div>

            {/* Right Col: Integrated CRM Screen-Pop Dossier */}
            <div className="lg:col-span-8 p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                {/* Dossier Header Tabs */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => setActiveTab('crm')}
                      aria-pressed={activeTab === 'crm'}
                      aria-label="Show CRM Customer Dossier"
                      className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                        activeTab === 'crm' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      CRM Dossier
                    </button>
                    <button
                      onClick={() => setActiveTab('omnichannel')}
                      aria-pressed={activeTab === 'omnichannel'}
                      aria-label="Show Omnichannel Inbox"
                      className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                        activeTab === 'omnichannel' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Omnichannel (WhatsApp/SMS)
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      aria-pressed={activeTab === 'analytics'}
                      aria-label="Show AI Speech Analytics"
                      className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                        activeTab === 'analytics' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Speech AI
                    </button>
                  </div>

                  {/* Switch Customer Profile */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <label htmlFor="voip-customer-select">Contact:</label>
                    <select
                      id="voip-customer-select"
                      name="customerSelect"
                      aria-label="Select Customer Profile for Simulation"
                      value={activeCustomer.id}
                      onChange={(e) => {
                        const found = MOCK_CRM_CUSTOMERS.find(c => c.id === e.target.value);
                        if (found) setActiveCustomer(found);
                      }}
                      className="bg-slate-900 border border-slate-800 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 min-h-[44px]"
                    >
                      {MOCK_CRM_CUSTOMERS.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* TAB 1: CRM DOSSIER VIEW */}
                {activeTab === 'crm' && (
                  <div className="mt-4 space-y-4">
                    {/* Customer Identity Banner */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold text-sm shrink-0">
                          {activeCustomer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-white">{activeCustomer.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                              {activeCustomer.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300">{activeCustomer.company} • {activeCustomer.tier}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setDialNumber(activeCustomer.phone);
                            setCallState('CONNECTED');
                          }}
                          aria-label={`Initiate 1-click call to ${activeCustomer.name} at ${activeCustomer.phone}`}
                          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>1-Click Call: {activeCustomer.phone}</span>
                        </button>
                      </div>
                    </div>

                    {/* Customer Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block font-medium">Account Lead</span>
                        <span className="text-white font-semibold text-xs sm:text-sm">{activeCustomer.accountManager}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block font-medium">Open Tickets</span>
                        <span className="text-emerald-400 font-semibold text-xs sm:text-sm">{activeCustomer.openTickets} Priority</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block font-medium">Last Touch</span>
                        <span className="text-white font-semibold truncate block text-xs sm:text-sm">{activeCustomer.lastInteraction}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block font-medium">Email Sync</span>
                        <span className="text-white font-semibold truncate block text-xs sm:text-sm">{activeCustomer.email}</span>
                      </div>
                    </div>

                    {/* Historical Notes & Real-time Note Logger */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Account Notes & Real-Time Call Log</span>
                      </h4>
                      
                      <div className="space-y-2 mb-3">
                        {activeCustomer.notes.map((note, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {note}
                          </div>
                        ))}
                      </div>

                      {/* Add note input */}
                      <div className="flex items-center gap-2">
                        <label htmlFor="voip-crm-note-input" className="sr-only">
                          Log in-call note directly to CRM
                        </label>
                        <input
                          id="voip-crm-note-input"
                          name="crmNoteInput"
                          type="text"
                          placeholder="Log in-call note directly to CRM..."
                          aria-label="Log in-call note directly to CRM"
                          value={crmNoteInput}
                          onChange={(e) => setCrmNoteInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                          className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={handleAddNote}
                          aria-label="Save CRM note"
                          className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shrink-0"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: OMNICHANNEL VIEW */}
                {activeTab === 'omnichannel' && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-white">Unified Omnichannel Thread</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">WhatsApp & 2-Way SMS Synced</span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 font-bold block mb-1">Inbound WhatsApp (10:15 AM):</span>
                        "Hi Jennifer, we are ready to schedule the Zone C speaker testing for next Tuesday."
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 ml-4 sm:ml-6">
                        <span className="text-cyan-400 font-bold block mb-1">Agent Response (10:18 AM):</span>
                        "Confirmed! Field engineer will arrive with the audio calibration kit at 09:00 AM."
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: AI SPEECH ANALYTICS VIEW */}
                {activeTab === 'analytics' && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-white">Real-Time AI Conversation Insights</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                        Sentiment: Positive ({sentimentScore}%)
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-200 font-medium block mb-1">Key Topics Discussed</span>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700 text-[10px] sm:text-xs">PoE Power Budget</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-300 border border-slate-700 text-[10px] sm:text-xs">123dB Horn Speakers</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-700 text-[10px] sm:text-xs">99.99% Uptime SLA</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-200 font-medium block mb-1">AI Next-Best-Action Script</span>
                        <p className="text-slate-300 text-xs sm:text-sm">
                          "Confirm next maintenance window and suggest adding 2-way intercom station."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CRM Two-Way Sync Feature Banner */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-slate-300 font-medium">
                <span>Automatic 2-Way Sync with Salesforce, HubSpot, Zendesk, & Custom CRMs.</span>
                <span className="text-emerald-400 font-semibold font-mono">Zero Manual Entry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Ideal For - Single column on mobile, 2-col on desktop */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Measurable Business Impact</span>
            </h3>
            <div className="space-y-3.5">
              {data.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-sm sm:text-base font-semibold text-white">{ben.title}:</strong>{' '}
                    <span className="text-sm sm:text-base text-slate-300">{ben.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Ideal For Contact & Support Teams
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.idealFor.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs sm:text-sm text-slate-300 font-medium">Upgrade to unified cloud telephony?</span>
              <button
                onClick={onOpenConsultation}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center"
              >
                Request VoIP Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
