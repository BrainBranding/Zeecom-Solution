import { SolutionDomain, IndustryUseCase, CameraFeed, AccessLog, CrmCustomerRecord, AudioZone } from '../types';

export const COMPANY_INFO = {
  name: "ZEECOM SOLUTION",
  phone: "042-37455670",
  phoneTel: "04237455670",
  phoneInternational: "+92 42 37455670",
  website: "zeecomsolution.com",
  websiteUrl: "https://zeecomsolution.com",
  email: "info@zeecomsolution.com",
  salesEmail: "sales@zeecomsolution.com",
  supportEmail: "support@zeecomsolution.com",
  address: {
    street: "181 STREET 5 , BLOCK C",
    area: "OPF",
    city: "LAHORE",
    country: "PAKISTAN",
    full: "181 STREET 5 , BLOCK C , OPF LAHORE"
  },
  tagline: "Intelligent, Integrated Systems for Physical Security, Unified Communications & IP Audio",
  foundedDescription: "ZEECOM SOLUTION is a forward-thinking technology solutions provider dedicated to delivering intelligent, integrated systems that empower organizations to operate securely, communicate seamlessly, and manage their environments with confidence.",
  mission: "To deliver innovative, scalable, and reliable technology solutions that solve real-world challenges, enabling our clients to focus on what matters most—their core business.",
  vision: "To be the trusted partner of choice for organizations seeking intelligent, integrated technology solutions that enhance security, streamline communication, and drive operational excellence.",
  coreValues: [
    {
      title: "Innovation",
      desc: "We continuously evolve our solutions to stay ahead of industry trends and bring next-generation AI into daily operations.",
      icon: "Lightbulb"
    },
    {
      title: "Integration",
      desc: "We believe in unified platforms that break down silos across security, voice, CRM, and emergency public address.",
      icon: "Network"
    },
    {
      title: "Reliability",
      desc: "We deliver hardened carrier-grade systems our clients can depend on 24/7 with 99.99% uptime guarantees.",
      icon: "ShieldCheck"
    },
    {
      title: "Customer-Centricity",
      desc: "We tailor every deployment to meet the unique structural, operational, and regulatory needs of every client.",
      icon: "Users"
    }
  ],
  stats: [
    { label: "Facial Verification Accuracy", value: "99.87%", detail: "Real-time AI biometric recognition" },
    { label: "VoIP System Reliability", value: "99.99%", detail: "Carrier-grade uptime guarantee" },
    { label: "Max Sound Output", value: "123 dB", detail: "High-noise SPL industrial clarity" },
    { label: "IP Phone Ecosystem", value: "450+", detail: "Certified compatible IP hardware models" },
    { label: "SIP Trunk Providers", value: "210+", detail: "Direct interoperability verified" },
    { label: "Scalable PA Audio Zones", value: "250+", detail: "Granular zone & speaker-level control" }
  ],
  deploymentOptions: [
    {
      title: "On-Premise",
      desc: "Complete sovereignty and local data hosting. Ideal for defense, high-compliance government, and strict air-gapped facilities.",
      features: ["Local server rack deployment", "Zero external cloud dependency", "Air-gapped security compliance", "Direct local storage archival"]
    },
    {
      title: "Cloud-Native",
      desc: "Fully managed, scalable cloud architecture with automated updates, multi-branch redundancy, and zero on-site server maintenance.",
      features: ["Instant multi-site provisioning", "Automatic OTA firmware upgrades", "Elastic seat scaling", "Global remote management console"]
    },
    {
      title: "Hybrid",
      desc: "The ultimate balance—combining hardened on-premise local survivability with cloud-accessible remote orchestration.",
      features: ["Local edge recording survivability", "Cloud analytics & multi-site sync", "Redundant failover routing", "Optimized WAN bandwidth"]
    }
  ],
  supportPillars: [
    {
      step: "01",
      title: "Expert Consultation & System Design",
      desc: "Comprehensive site surveys, acoustic calculations, network bandwidth modeling, and custom schematic engineering tailored to your facility."
    },
    {
      step: "02",
      title: "Professional Installation & Integration",
      desc: "Certified field engineers handling structured cabling, PoE network commissioning, ONVIF/SIP binding, and CRM API hooks."
    },
    {
      step: "03",
      title: "Ongoing Maintenance & 24/7 Support",
      desc: "Proactive telemetry monitoring, preventive hardware checks, rapid SLA dispatch, and firmware vulnerability patching."
    },
    {
      step: "04",
      title: "Comprehensive Team Training",
      desc: "Hands-on role-based instruction for security operators, contact center supervisors, IT administrators, and facility managers."
    }
  ]
};

export const SOLUTIONS_DATA: SolutionDomain[] = [
  {
    id: "ai-surveillance",
    title: "AI-Surveillance & Access Control",
    shortTitle: "AI Surveillance & Access",
    tagline: "Proactive protection powered by computer vision, touchless biometric MFA, and unified threat detection.",
    badge: "Solution 01",
    iconName: "ShieldAlert",
    overview: "ZEECOM SOLUTION's AI-Surveillance & Access Control solution represents the next generation of physical security technology. Traditional security systems merely record incidents after they occur. Our AI-powered platform detects, analyzes, and alerts in real-time—transforming security from a passive documentation tool into an active, intelligent protection system.",
    capabilities: [
      {
        title: "AI-Powered Video Surveillance",
        description: "Transform video feeds into autonomous intelligence agents.",
        items: [
          "Intelligent video analytics with real-time anomaly detection and behavior recognition",
          "AI-enabled cameras that drastically reduce the need for 24/7 manual human monitoring",
          "Advanced motion sensing, facial detection, perimeter breach detection, and crowd pattern analysis",
          "Integration with existing camera infrastructure—no costly hardware overhauls required"
        ],
        icon: "Camera"
      },
      {
        title: "Intelligent Access Control",
        description: "High-throughput, multi-factor credential authentication.",
        items: [
          "Multi-factor authentication including facial recognition, fingerprint scanning, mobile NFC credentials, and QR codes",
          "Touchless entry technology for enhanced safety and rapid ingress in high-traffic areas",
          "Real-time identity verification with industry-leading accuracy rates up to 99.87%",
          "Remote management capabilities allowing instant permission adjustments and badge revoking from anywhere"
        ],
        icon: "KeyRound"
      },
      {
        title: "Unified Security Platform",
        description: "Single-pane-of-glass command center for total situational control.",
        items: [
          "Single unified interface combining video surveillance, access control, visitor logs, and emergency response",
          "Consolidated monitoring console with interactive GIS mapping and live perimeter overlays",
          "Automated workflows—instantly trigger facility lockdowns, alarms, or emergency dispatch based on detected threats",
          "Cloud-native or on-premise deployment options to suit strict data residency requirements"
        ],
        icon: "LayoutDashboard"
      },
      {
        title: "Advanced Security & Hardening",
        description: "Defense-in-depth protection from physical entry to network packets.",
        items: [
          "End-to-end encryption for all video streams and access credentials at rest and in transit",
          "Secure credential provisioning preventing badge cloning, replay attacks, and spoofing",
          "Cybersecurity best practices integrated into every edge device and gateway layer",
          "Multi-layered defense against both physical intrusions and cyber vulnerabilities"
        ],
        icon: "Lock"
      }
    ],
    benefits: [
      { title: "Proactive Threat Interception", desc: "Detect unauthorized loitering, perimeter breaches, and anomalies before security incidents materialize." },
      { title: "Operational Efficiency", desc: "Reduce false alarms by up to 88% and eliminate the fatigue of continuous manual monitor watching." },
      { title: "Enterprise Scalability", desc: "Seamlessly expand from a single door or office to hundreds of multi-region campus facilities." },
      { title: "Risk & Insurance Reduction", desc: "Satisfy stringent compliance audits and qualify for reduced commercial property insurance premiums." },
      { title: "Single Point of Command", desc: "Control cameras, badge permissions, visitor check-in, and emergency protocols in one interface." }
    ],
    idealFor: [
      "Corporate Headquarters & High-Tech Campuses",
      "Hospitals & Healthcare Facilities",
      "Educational Institutions & Universities",
      "Retail Chains & Shopping Malls",
      "Government Buildings & Municipal Centers",
      "Industrial Plants, Warehouses & Logistics Hubs"
    ],
    metrics: [
      { label: "Verification Accuracy", value: "99.87%" },
      { label: "False Alarm Reduction", value: "88%" },
      { label: "Threat Detection Latency", value: "< 250ms" },
      { label: "Legacy Camera Compatibility", value: "100%" }
    ]
  },
  {
    id: "voip-crm",
    title: "VoIP Integrated CRM & Contact Center Solution",
    shortTitle: "VoIP & CRM Contact Center",
    tagline: "Unify voice, messaging, and intelligent customer context into a high-productivity communication engine.",
    badge: "Solution 02",
    iconName: "PhoneCall",
    overview: "ZEECOM SOLUTION's VoIP Integrated CRM & Contact Center Solution revolutionizes business communication by unifying voice telephony, omnichannel messaging, and customer relationship management into a single, intelligent platform. We ensure that every customer interaction is contextual, informed, and instantly actionable.",
    capabilities: [
      {
        title: "Enterprise VoIP Telephony",
        description: "Carrier-grade voice infrastructure with flexible routing.",
        items: [
          "Cloud-based or on-premise phone systems with carrier-grade 99.99% uptime guarantee",
          "Smart skills-based call routing, visual IVR menus, and intelligent prioritized call queues",
          "HD-quality voice calls with jitter-free, ultra-low latency audio codecs",
          "Broad ecosystem support for 450+ IP phone models and 210+ global SIP trunk providers",
          "Unified business number for simple, professional calling across mobile, desktop, and IP desk phones"
        ],
        icon: "Phone"
      },
      {
        title: "Deep CRM Integration",
        description: "Turn every voice call into an enriched customer relationship moment.",
        items: [
          "Click-to-Call – Initiate calls directly from your CRM customer record with a single click",
          "Screen Pop-ups – Automatically display caller identity, purchase history, and open tickets before answering",
          "Automatic Call Logging – All call durations, recordings, and timestamps automatically logged in CRM",
          "Two-Way Contact Sync – Keep CRM databases and phone system directories synchronized in real-time"
        ],
        icon: "UserCheck"
      },
      {
        title: "Omnichannel Communication",
        description: "Engage clients across every digital touchpoint seamlessly.",
        items: [
          "Unified inbox managing voice calls, SMS, live web chat, WhatsApp, and social channels side by side",
          "Two-way SMS messaging for automated appointment confirmations, delivery updates, and reminders",
          "Embedded live chat widget for instant website visitor lead capture and contextual agent transfer",
          "Native social channel integrations ensuring consistent agent workflows"
        ],
        icon: "MessageSquareText"
      },
      {
        title: "Collaboration & AI Enhancements",
        description: "AI-driven conversation intelligence and team productivity tools.",
        items: [
          "HD video conferencing with screen sharing, collaborative whiteboards, and file transfers",
          "AI speech analytics delivering real-time sentiment scoring, keywords flagging, and agent coaching",
          "24/7 AI-powered conversational chatbots for instant first-line customer service and qualification",
          "Real-time queue monitoring, supervisor barge-in, call whispering, and analytics dashboards"
        ],
        icon: "Bot"
      }
    ],
    benefits: [
      { title: "Enriched Customer Experience", desc: "Agents answer calls equipped with immediate historical context, eliminating repetitive customer questioning." },
      { title: "Boosted Agent Productivity", desc: "Eliminate manual dialing and data entry, saving 15-20 minutes per agent per working hour." },
      { title: "Accelerated First Contact Resolution", desc: "Intelligent routing connects customers directly to the best-suited specialist instantly." },
      { title: "Actionable Business Analytics", desc: "Track call volumes, peak hours, conversion rates, and sentiment trends in real-time." },
      { title: "Omnichannel Journey Continuity", desc: "Customers switch between voice, SMS, and WhatsApp without losing conversation context." }
    ],
    idealFor: [
      "Inbound & Outbound Contact Centers",
      "Enterprise Sales & Account Management Teams",
      "Customer Support & Help Desk Operations",
      "Financial Services & Insurance Brokers",
      "Healthcare Scheduling & Telehealth Centers",
      "Professional Service Firms & Agencies"
    ],
    metrics: [
      { label: "VoIP System Uptime", value: "99.99%" },
      { label: "Compatible IP Phones", value: "450+" },
      { label: "SIP Trunk Partners", value: "210+" },
      { label: "Average Call Handling Reduction", value: "-28%" }
    ]
  },
  {
    id: "ip-audio",
    title: "IP-Audio & Public Address (PA) Solution",
    shortTitle: "IP-Audio & PA Systems",
    tagline: "Crystal-clear, network-based audio distribution with up to 123dB SPL, granular zoning, and SIP/ONVIF integration.",
    badge: "Solution 03",
    iconName: "Volume2",
    overview: "ZEECOM SOLUTION's IP-Audio & Public Address (PA) Solution delivers crystal-clear, network-based audio communications for a wide range of applications—from emergency notifications and security announcements to ambient background music and daily public address broadcasts. Powered by PoE and scalable to 250+ zones.",
    capabilities: [
      {
        title: "High-Performance IP Speakers",
        description: "Acoustically engineered network endpoints for any environment.",
        items: [
          "Sound pressure levels up to 123dB SPL for crystal-clear voice clarity even in high-noise industrial zones",
          "Individual speaker addressing enabling granular zone control down to single rooms or corridors",
          "High-efficiency 30W audio output powered directly via standard Power over Ethernet (PoE/PoE+)",
          "Speaker-as-a-microphone technology enabling two-way intercom communication without additional hardware"
        ],
        icon: "Megaphone"
      },
      {
        title: "Comprehensive Audio Applications",
        description: "Versatile audio profiles for every operational requirement.",
        items: [
          "Public Address – Crisp voice broadcasts for daily staff announcements, shift changes, and paging",
          "Emergency Notifications – One-touch automated evacuation alarms, severe weather alerts, and lockdown sirens",
          "Security Deterrence – Automated or operator-initiated voice warnings tied to camera perimeter breach triggers",
          "Background Music (BGM) – High-fidelity ambient audio streaming for retail, hospitality, and corporate lobbies"
        ],
        icon: "Radio"
      },
      {
        title: "Intelligent Network Integration",
        description: "Unified critical communication bridge across all facility systems.",
        items: [
          "Full ONVIF Profile S/T and SIP compatibility for seamless integration with VoIP phone systems and VMS",
          "Direct integration with CCTV and access control to automate audio warnings upon sensor triggers",
          "Unified Critical Communication Platform connecting security guards, control room operators, and visitors",
          "Scheduled automated playbacks for bells, chime tones, and informational messages"
        ],
        icon: "Layers"
      },
      {
        title: "Scalability & Hardware Security",
        description: "Enterprise cyber-resilience and massive multi-campus capacity.",
        items: [
          "Scalable architecture supporting up to 250+ distinct zones per facility or distributed enterprise",
          "Hardware Root of Trust for cryptographically verifying physical component integrity",
          "Secure Boot architecture ensuring only authenticated, signed firmware executes on endpoints",
          "Dynamic energy management reducing idle power consumption across thousands of PoE nodes"
        ],
        icon: "Cpu"
      }
    ],
    benefits: [
      { title: "Exceptional Acoustic Clarity", desc: "High-output SPL speakers ensure voice intelligible emergency instructions in loud industrial noise." },
      { title: "Precise Zone Slicing", desc: "Broadcast specifically to Zone A (Warehouse), Zone B (Offices), or all 250+ zones simultaneously." },
      { title: "Lower Infrastructure Cost", desc: "Standard Ethernet CAT6 cables deliver power (PoE) and audio data—no bulky 70V/100V copper wiring." },
      { title: "Automated Security Response", desc: "Cameras detecting fence intrusion instantly trigger local directional audio warnings." },
      { title: "Two-Way Audio Interactivity", desc: "Use ceiling and horn speakers as listening microphones for bi-directional emergency calls." }
    ],
    idealFor: [
      "Educational Campuses & University Grounds",
      "Transportation Hubs (Airports, Train Stations, Bus Terminals)",
      "Industrial Manufacturing Plants & Chemical Facilities",
      "Hospitals & Healthcare Facilities",
      "Retail Malls, Supermarkets & Hospitality Venues",
      "Sports Arenas, Warehouses & Logistics Distribution Centers"
    ],
    metrics: [
      { label: "Max Sound Output", value: "123 dB SPL" },
      { label: "Addressable Zones", value: "250+ Zones" },
      { label: "PoE Power Output", value: "30W Class" },
      { label: "Interoperability Standards", value: "ONVIF & SIP" }
    ]
  }
];

export const INDUSTRIES_DATA: IndustryUseCase[] = [
  {
    id: "corporate",
    name: "Corporate Offices & Campuses",
    icon: "Building2",
    description: "Modern enterprise workplaces requiring frictionless touchless access, executive VoIP CRM workflows, and elegant acoustic zoning.",
    surveillanceUse: "Touchless facial access for employees, automated visitor check-in kiosks, and lobby tailgating alerts.",
    voipUse: "Unified VoIP with CRM click-to-call, screen popups for VIP clients, and omnichannel help desks.",
    audioUse: "Multi-floor public announcements, scheduled break chimes, and ambient lobby background music.",
    highlightStat: "65% faster visitor check-in"
  },
  {
    id: "healthcare",
    name: "Hospitals & Healthcare Facilities",
    icon: "Hospital",
    description: "Critical care environments where safety, rapid patient triage, sterile touchless entry, and immediate code alerts are vital.",
    surveillanceUse: "Restricted pharmacy & infant ward access control, AI aggression/slip-and-fall detection in corridors.",
    voipUse: "Priority nurse triage call routing, EHR-integrated patient screen pops, and secure multi-department messaging.",
    audioUse: "Code Blue emergency broadcasts, two-way cleanroom intercoms, and quiet-hour automated sound masking.",
    highlightStat: "99.99% critical alert delivery"
  },
  {
    id: "education",
    name: "Schools, Colleges & Universities",
    icon: "GraduationCap",
    description: "Sprawling educational campuses needing perimeter security, mass emergency notification, and unified administrative communications.",
    surveillanceUse: "Campus perimeter intrusion sensing, parking lot license plate recognition, and dorm access control.",
    voipUse: "Admissions center VoIP queues, parent notification SMS broadcast, and multi-campus staff intercom.",
    audioUse: "Campus-wide synchronized bell schedules, severe weather sirens, and one-touch active shooter lockdown alerts.",
    highlightStat: "Instant 250+ zone mass alert"
  },
  {
    id: "transportation",
    name: "Transportation Hubs & Airports",
    icon: "Plane",
    description: "High-density transit terminals requiring massive noise-penetrating public address, crowd flow analysis, and carrier-grade VoIP.",
    surveillanceUse: "Unattended baggage detection, queue congestion analytics, and biometric secure tarmac access.",
    voipUse: "Ground crew unified radio-to-VoIP bridging, customer service call routing, and lost & found CRM integration.",
    audioUse: "123dB SPL crystal clear gate paging over jet engine noise, automated multi-language flight updates.",
    highlightStat: "123dB high-noise voice clarity"
  },
  {
    id: "retail",
    name: "Retail Chains & Shopping Centers",
    icon: "ShoppingBag",
    description: "Customer-facing commercial spaces focused on loss prevention, customer support response, and curated shopping atmosphere.",
    surveillanceUse: "AI shoplifting prevention, heat-mapping foot traffic, and cash register POS video overlay.",
    voipUse: "Omnichannel customer inquiries via WhatsApp, instant in-store clerk mobile paging, and inventory click-to-call.",
    audioUse: "Targeted promotional audio broadcasts in specific aisles, emergency evacuation, and high-fidelity BGM.",
    highlightStat: "-34% inventory shrinkage"
  },
  {
    id: "industrial",
    name: "Industrial & Manufacturing Plants",
    icon: "Factory",
    description: "Demanding industrial complexes demanding explosion-proof/ruggedized surveillance, loud plant audio, and mission-critical voice.",
    surveillanceUse: "PPE compliance verification (helmet/vest detection), thermal hotspot monitoring, and hazardous zone access control.",
    voipUse: "Heavy-duty ruggedized VoIP phone stations, hands-free voice communications, and maintenance dispatch queues.",
    audioUse: "High-power 123dB horn speakers for factory floor shift tones, chemical spill alarms, and evacuation sirens.",
    highlightStat: "100% PPE compliance monitoring"
  }
];

export const MOCK_CAMERA_FEEDS: CameraFeed[] = [
  {
    id: "CAM-01",
    name: "Main HQ Entrance & Turnstiles",
    location: "Building A - Ground Floor",
    status: "ONLINE",
    aiDetections: [
      { type: "TOUCHLESS_ACCESS", label: "Face Verified: Sarah Jenkins (VP Operations)", confidence: 0.998, timestamp: "Just now" },
      { type: "PERSON", label: "Human Flow: 4 Ingress / 0 Egress", confidence: 0.97, timestamp: "2s ago" }
    ],
    anomalyCount: 0,
    fps: 30,
    resolution: "4K (3840x2160)"
  },
  {
    id: "CAM-02",
    name: "R&D High-Security Server Lab",
    location: "Building B - Level 3",
    status: "ONLINE",
    aiDetections: [
      { type: "FACE_RECOGNIZED", label: "Biometric MFA: Dr. Michael Vance", confidence: 0.994, timestamp: "12s ago" },
      { type: "PERSON", label: "Zone Occupancy: 1 (Authorized)", confidence: 0.98, timestamp: "10s ago" }
    ],
    anomalyCount: 0,
    fps: 30,
    resolution: "4K (3840x2160)"
  },
  {
    id: "CAM-03",
    name: "North Loading Dock & Logistics Gate",
    location: "Logistics Yard - Gate 4",
    status: "ALERT",
    aiDetections: [
      { type: "ANOMALY", label: "Loitering Alert: Unregistered individual near Bay 2", confidence: 0.94, timestamp: "Just now" },
      { type: "VEHICLE", label: "Delivery Truck #8423 - LPR Matched", confidence: 0.98, timestamp: "45s ago" }
    ],
    anomalyCount: 1,
    fps: 30,
    resolution: "4K HDR Night-Vision"
  },
  {
    id: "CAM-04",
    name: "East Perimeter Fence Line",
    location: "Perimeter Sector 7",
    status: "ONLINE",
    aiDetections: [
      { type: "PERSON", label: "Perimeter Boundary Normal - No Obstructions", confidence: 0.99, timestamp: "1m ago" }
    ],
    anomalyCount: 0,
    fps: 30,
    resolution: "4K Optical PTZ"
  }
];

export const MOCK_ACCESS_LOGS: AccessLog[] = [
  { id: "ACC-9081", timestamp: "13:30:12", userName: "Sarah Jenkins", userRole: "VP Operations", authMethod: "Facial Recognition", location: "Main Entrance Turnstile #2", status: "GRANTED", matchScore: "99.87%" },
  { id: "ACC-9080", timestamp: "13:28:44", userName: "Dr. Michael Vance", userRole: "Lead System Architect", authMethod: "Facial Recognition", location: "R&D Lab Vault Door", status: "GRANTED", matchScore: "99.91%" },
  { id: "ACC-9079", timestamp: "13:25:02", userName: "Marcus Sterling", userRole: "Contractor (HVAC)", authMethod: "Touchless QR", location: "Service Elevator Bay", status: "GRANTED", matchScore: "100.0%" },
  { id: "ACC-9078", timestamp: "13:19:11", userName: "Unknown Individual", userRole: "Unregistered", authMethod: "Mobile NFC", location: "Executive Suite 400", status: "DENIED", matchScore: "0.00%" },
  { id: "ACC-9077", timestamp: "13:14:50", userName: "Elena Rostova", userRole: "Facility Director", authMethod: "Biometric Fingerprint", location: "Central Control Room", status: "GRANTED", matchScore: "99.85%" }
];

export const MOCK_CRM_CUSTOMERS: CrmCustomerRecord[] = [
  {
    id: "CUST-4401",
    name: "David Chen",
    company: "Apex Healthcare Systems",
    phone: "+1 (555) 382-9901",
    email: "d.chen@apexhealth.org",
    status: "Enterprise VIP",
    tier: "Tier 1 Hospital Group",
    openTickets: 0,
    lastInteraction: "Yesterday at 16:40 (VoIP Consult)",
    accountManager: "Jennifer Walsh",
    notes: [
      "Currently expanding 3 hospital wings with 120 AI camera nodes and 45 IP audio speakers.",
      "Requested unified SIP integration with hospital nurse paging system."
    ],
    recentCalls: [
      { date: "Aug 14, 2026", duration: "8m 42s", summary: "Discussed PoE power budget for Zone C PA speakers and camera firmware audit.", sentiment: "Positive" },
      { date: "Aug 02, 2026", duration: "14m 10s", summary: "Quarterly review of 99.99% VoIP call routing uptime.", sentiment: "Positive" }
    ]
  },
  {
    id: "CUST-4402",
    name: "Rachel Morgan",
    company: "Skyline Logistics & Ports",
    phone: "+1 (555) 714-2290",
    email: "rmorgan@skylinelogistics.com",
    status: "Active Client",
    tier: "Commercial Enterprise",
    openTickets: 1,
    lastInteraction: "3 days ago (SMS Alert Dispatch)",
    accountManager: "Robert Torres",
    notes: [
      "Inquired about adding 123dB high-SPL horn speakers for noisy container loading berths.",
      "Omnichannel chat widget deployed on their logistics portal."
    ],
    recentCalls: [
      { date: "Aug 12, 2026", duration: "5m 18s", summary: "Configured perimeter intrusion audio warning triggers in Zone 4.", sentiment: "Positive" }
    ]
  }
];

export const MOCK_AUDIO_ZONES: AudioZone[] = [
  { id: "ZONE-1", name: "Zone 01: Main Reception & Executive Lobby", category: "Public Commercial", activeSpeakers: 8, volume: 45, status: "BACKGROUND_MUSIC", splRating: "92 dB", powerUsage: "65W (PoE+)" },
  { id: "ZONE-2", name: "Zone 02: Open Office Floor & Collaboration Hub", category: "Office Floor", activeSpeakers: 16, volume: 35, status: "IDLE", splRating: "88 dB", powerUsage: "110W (PoE)" },
  { id: "ZONE-3", name: "Zone 03: Logistics Yard & Heavy Loading Docks", category: "Perimeter & Parking", activeSpeakers: 6, volume: 85, status: "BROADCASTING", splRating: "123 dB (High-Noise)", powerUsage: "180W (PoE+)" },
  { id: "ZONE-4", name: "Zone 04: Emergency Evacuation & Stairwells", category: "Critical / Evacuation", activeSpeakers: 24, volume: 95, status: "IDLE", splRating: "115 dB", powerUsage: "240W (PoE+)" }
];
