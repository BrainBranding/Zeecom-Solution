export interface SolutionDomain {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  iconName: string;
  overview: string;
  capabilities: {
    title: string;
    description: string;
    items: string[];
    icon: string;
  }[];
  benefits: {
    title: string;
    desc: string;
  }[];
  idealFor: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface IndustryUseCase {
  id: string;
  name: string;
  icon: string;
  description: string;
  surveillanceUse: string;
  voipUse: string;
  audioUse: string;
  highlightStat: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'ONLINE' | 'ALERT' | 'STANDBY';
  aiDetections: {
    type: 'PERSON' | 'FACE_RECOGNIZED' | 'ANOMALY' | 'VEHICLE' | 'TOUCHLESS_ACCESS';
    label: string;
    confidence: number;
    timestamp: string;
  }[];
  anomalyCount: number;
  fps: number;
  resolution: string;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  authMethod: 'Facial Recognition' | 'Touchless QR' | 'Mobile NFC' | 'Biometric Fingerprint';
  location: string;
  status: 'GRANTED' | 'DENIED' | 'FLAGGED';
  matchScore: string;
}

export interface CrmCustomerRecord {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: 'Enterprise VIP' | 'Active Client' | 'Pending Contract' | 'Support Priority';
  tier: string;
  openTickets: number;
  lastInteraction: string;
  accountManager: string;
  notes: string[];
  recentCalls: {
    date: string;
    duration: string;
    summary: string;
    sentiment: 'Positive' | 'Neutral' | 'Urgent';
  }[];
}

export interface AudioZone {
  id: string;
  name: string;
  category: 'Critical / Evacuation' | 'Public Commercial' | 'Office Floor' | 'Perimeter & Parking';
  activeSpeakers: number;
  volume: number;
  status: 'IDLE' | 'BROADCASTING' | 'EMERGENCY_ALERT' | 'BACKGROUND_MUSIC';
  splRating: string;
  powerUsage: string;
}

export interface ArchitectRecommendation {
  executiveSummary: string;
  surveillanceArchitecture: {
    cameraCount: number;
    recommendedTypes: string[];
    accessControlPoints: number;
    keyAnalytics: string[];
  };
  voipArchitecture: {
    recommendedSeats: number;
    trunkCapacity: string;
    crmIntegrationStrategy: string;
    omnichannelFeatures: string[];
  };
  audioArchitecture: {
    recommendedZones: number;
    speakerCount: number;
    speakerTypes: string[];
    emergencyProtocol: string;
  };
  deploymentModel: 'On-Premise' | 'Cloud-Native' | 'Hybrid';
  timelineWeeks: number;
  estimatedInvestmentRange: string;
  keyBenefits: string[];
}

export interface QuoteConfig {
  facilityType: string;
  facilitySize: number; // sq ft
  buildingCount: number;
  floorCount: number;
  surveillanceTier: 'Essential' | 'Advanced AI' | 'Enterprise Multi-Site';
  cameraQty: number;
  accessDoors: number;
  voipAgents: number;
  voipTier: 'Standard Cloud' | 'Enterprise CRM-Integrated' | 'Omnichannel Contact Center';
  audioZones: number;
  speakerQty: number;
  deploymentType: 'Cloud-Native' | 'On-Premise' | 'Hybrid';
  slaTier: 'Standard 8x5' | 'Enterprise 24/7' | 'Mission-Critical VIP';
}
