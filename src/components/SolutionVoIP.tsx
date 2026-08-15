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
    <section id="voip-crm" className="py-20 bg-slate-900/40 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

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
          <p className="mt-3 text-lg text-emerald-300 font-medium">
            {data.tagline}
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            {data.overview}
          </p>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {idx === 0 && <Phone className="w-5 h-5" />}
                    {idx === 1 && <UserCheck className="w-5 h-5" />}
                    {idx === 2 && <MessageSquareText className="w-5 h-5" />}
                    {idx === 3 && <Bot className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="text-xs text-slate-400">{cap.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 mt-4 text-sm text-slate-300">
                  {cap.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-emerald-500/30 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-xl font-bold text-white">
                  Interactive VoIP Telephony & CRM Screen-Pop Simulator
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Carrier 99.99% Uptime
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Experience click-to-call, automated inbound caller dossier popups, live sentiment scoring, and omnichannel synchronization.
              </p>
            </div>

            {/* Inbound Call Trigger */}
            <div className="flex items-center gap-3">
              <button
                id="btn-simulate-inbound-call"
                onClick={simulateInboundCall}
                disabled={callState === 'RINGING' || callState === 'CONNECTED'}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
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

          {/* Simulator Main Body */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col (4/12): Agent Softphone Interface */}
            <div className="lg:col-span-4 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">ZEECOM Agent Softphone</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                    Ext. 104 (Jennifer W.)
                  </span>
                </div>

                {/* Call Status Display Screen */}
                <div className={`mt-4 p-4 rounded-xl text-center border transition-all ${
                  callState === 'RINGING'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200 animate-pulse'
                    : callState === 'CONNECTED'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : callState === 'LOGGED'
                    ? 'bg-blue-950/40 border-blue-500 text-blue-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  {callState === 'RINGING' && (
                    <div>
                      <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                        Incoming VIP Call...
                      </div>
                      <div className="text-base font-bold text-white mt-1">{activeCustomer.name}</div>
                      <div className="text-xs text-slate-300">{activeCustomer.company}</div>
                      <div className="mt-3 flex justify-center gap-3">
                        <button
                          onClick={answerCall}
                          className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Answer & Screen-Pop</span>
                        </button>
                        <button
                          onClick={() => setCallState('IDLE')}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-xs"
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
                      <div className="text-sm font-bold text-white mt-2">{activeCustomer.name}</div>
                      <div className="text-xs text-slate-300 font-mono">{activeCustomer.phone}</div>

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
                          className={`p-2 rounded-lg border text-xs ${
                            isMuted ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                          title="Mute Mic"
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={endCall}
                          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30"
                        >
                          <PhoneOff className="w-3.5 h-3.5" />
                          <span>End & Auto-Log</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {callState === 'LOGGED' && (
                    <div className="py-2">
                      <Check className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                      <div className="text-xs font-bold text-white">Call Logged into CRM Automatically!</div>
                      <p className="text-[10px] text-slate-400 mt-1">Duration: {formatTime(callDuration)} • Audio Recording Archived</p>
                    </div>
                  )}

                  {callState === 'IDLE' && (
                    <div className="py-2">
                      <div className="text-xs text-slate-400 font-mono">Softphone Ready • Line 1 Idle</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Click any CRM contact to 1-Click Dial</div>
                    </div>
                  )}
                </div>

                {/* Softphone Keypad */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                    <button
                      key={digit}
                      onClick={() => setDialNumber(prev => prev + digit)}
                      className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-sm font-semibold border border-slate-800 transition-colors"
                    >
                      {digit}
                    </button>
                  ))}
                </div>

                {/* Dial Input & Click-to-Call */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter phone or SIP URI..."
                    value={dialNumber}
                    onChange={(e) => setDialNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (dialNumber) {
                        setCallState('CONNECTED');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                  >
                    Dial
                  </button>
                </div>
              </div>

              {/* Certified IP Phone Models Support badge */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Compatible Ecosystem:</span>
                <span className="text-emerald-400 font-semibold font-mono">450+ IP Phones & 210+ SIP Trunks</span>
              </div>
            </div>

            {/* Right Col (8/12): Integrated CRM Screen-Pop Dossier */}
            <div className="lg:col-span-8 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                {/* Dossier Header Tabs */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('crm')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        activeTab === 'crm' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      CRM Customer Dossier
                    </button>
                    <button
                      onClick={() => setActiveTab('omnichannel')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        activeTab === 'omnichannel' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Omnichannel Inbox (SMS/WhatsApp)
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        activeTab === 'analytics' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      AI Speech Analytics
                    </button>
                  </div>

                  {/* Switch Customer Profile */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Contact:</span>
                    <select
                      value={activeCustomer.id}
                      onChange={(e) => {
                        const found = MOCK_CRM_CUSTOMERS.find(c => c.id === e.target.value);
                        if (found) setActiveCustomer(found);
                      }}
                      className="bg-slate-900 border border-slate-800 text-white text-xs rounded px-2 py-1 focus:outline-none"
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
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold text-sm">
                          {activeCustomer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">{activeCustomer.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                              {activeCustomer.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{activeCustomer.company} • {activeCustomer.tier}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setDialNumber(activeCustomer.phone);
                            setCallState('CONNECTED');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>1-Click Call: {activeCustomer.phone}</span>
                        </button>
                      </div>
                    </div>

                    {/* Customer Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block">Account Lead</span>
                        <span className="text-white font-semibold">{activeCustomer.accountManager}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block">Open Tickets</span>
                        <span className="text-emerald-400 font-semibold">{activeCustomer.openTickets} Priority</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block">Last Touchpoint</span>
                        <span className="text-white font-semibold truncate block">{activeCustomer.lastInteraction}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-400 block">Email Sync</span>
                        <span className="text-white font-semibold truncate block">{activeCustomer.email}</span>
                      </div>
                    </div>

                    {/* Historical Notes & Real-time Note Logger */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Account Notes & Real-Time Call Log</span>
                      </h5>
                      
                      <div className="space-y-2 mb-3">
                        {activeCustomer.notes.map((note, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                            {note}
                          </div>
                        ))}
                      </div>

                      {/* Add note input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Log in-call note directly to CRM..."
                          value={crmNoteInput}
                          onChange={(e) => setCrmNoteInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={handleAddNote}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
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
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 font-bold block mb-1">Inbound WhatsApp (10:15 AM):</span>
                        "Hi Jennifer, we are ready to schedule the Zone C speaker testing for next Tuesday."
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 ml-6">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block mb-1">Key Topics Discussed</span>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 text-[10px]">PoE Power Budget</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 border border-slate-800 text-[10px]">123dB Horn Speakers</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800 text-[10px]">99.99% Uptime SLA</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block mb-1">AI Next-Best-Action Script</span>
                        <p className="text-slate-300 text-[11px]">
                          "Confirm next maintenance window and suggest adding 2-way intercom station."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CRM Two-Way Sync Feature Banner */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Automatic 2-Way Sync with Salesforce, HubSpot, Zendesk, & Custom CRMs.</span>
                <span className="text-emerald-400 font-semibold font-mono">Zero Manual Data Entry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Ideal For */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Measurable Business Impact</span>
            </h3>
            <div className="space-y-3">
              {data.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-sm font-semibold text-white">{ben.title}:</strong>{' '}
                    <span className="text-sm text-slate-300">{ben.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                Ideal For Contact & Support Teams
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {data.idealFor.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Upgrade to unified cloud telephony?</span>
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
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
