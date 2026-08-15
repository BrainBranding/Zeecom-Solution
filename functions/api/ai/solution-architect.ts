interface Env {
  GEMINI_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body: any = await request.json().catch(() => ({}));
    const {
      facilityType = "Corporate Office",
      facilitySize = 50000,
      buildingCount = 1,
      floorCount = 3,
      userCount = 150,
      painPoints = "Need unified security, CRM click-to-call, and multi-zone PA audio",
      deploymentPreference = "Hybrid",
      focusDomains = ["ai-surveillance", "voip-crm", "ip-audio"],
    } = body;

    const apiKey = env.GEMINI_API_KEY;

    if (apiKey) {
      const prompt = `
You are the Chief Enterprise Solutions Architect at ZEECOM SOLUTION, specializing in:
1. AI-Surveillance & Biometric Access Control (Intelligent video analytics, 99.87% biometric facial MFA, unified console).
2. VoIP Integrated CRM & Contact Center (99.99% uptime, SIP trunks, screen popups, omnichannel, AI speech analytics).
3. IP-Audio & Public Address (PA) Systems (up to 123dB SPL, 30W PoE, 250+ zones, ONVIF/SIP integration).

Facility Specs:
- Facility Type: ${facilityType}
- Size: ${facilitySize} sq ft across ${buildingCount} building(s) and ${floorCount} floor(s)
- Users/Staff: ${userCount}
- Pain Points: ${painPoints}
- Deployment: ${deploymentPreference}
- Desired Domains: ${focusDomains.join(", ")}

Generate a professional JSON architectural blueprint strictly following this schema:
{
  "executiveSummary": "Concise 2-3 sentence overview of custom ZEECOM integrated architecture and strategic benefits.",
  "surveillanceArchitecture": {
    "cameraCount": number,
    "recommendedTypes": ["3-4 specific camera/sensor types"],
    "accessControlPoints": number,
    "keyAnalytics": ["3-4 analytics like Anomaly Behavior Sensing, Tailgating Prevention, LPR"]
  },
  "voipArchitecture": {
    "recommendedSeats": number,
    "trunkCapacity": "e.g. 24 Concurrent SIP Trunks with 99.99% SLA",
    "crmIntegrationStrategy": "Specific strategy for Screen-pop, Click-to-call, and auto-logging",
    "omnichannelFeatures": ["3-4 features like WhatsApp API, Two-Way SMS, AI Speech Sentiment Coaching"]
  },
  "audioArchitecture": {
    "recommendedZones": number,
    "speakerCount": number,
    "speakerTypes": ["3 speaker types like 30W PoE Ceiling Speakers, 123dB Industrial Horns"],
    "emergencyProtocol": "Protocol description for instant automated mass notification over ONVIF/SIP"
  },
  "deploymentModel": "${deploymentPreference}",
  "timelineWeeks": number,
  "estimatedInvestmentRange": "e.g. $28,000 - $42,000 USD",
  "keyBenefits": ["4 tangible ROI and operational benefits"]
}
`;

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const result: any = await geminiRes.json();
          const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed = JSON.parse(candidateText.trim());
            return new Response(
              JSON.stringify({ success: true, data: parsed, source: "gemini-cloudflare-edge" }),
              { headers: corsHeaders }
            );
          }
        }
      } catch (geminiErr) {
        console.error("Cloudflare Edge Gemini API Error:", geminiErr);
      }
    }

    // High-accuracy fallback engineering calculation engine
    const calculatedCameras = Math.max(8, Math.round((facilitySize / 2500) * (buildingCount * 0.8)));
    const calculatedDoors = Math.max(4, Math.round(floorCount * 3 * buildingCount));
    const calculatedSeats = Math.max(10, Math.round(userCount * 0.7));
    const calculatedZones = Math.max(3, floorCount + buildingCount + 2);
    const calculatedSpeakers = Math.max(12, Math.round(facilitySize / 1500));
    const timeline = Math.max(3, Math.min(12, Math.round(buildingCount * 1.5 + floorCount * 0.8)));

    const fallbackData = {
      executiveSummary: `ZEECOM SOLUTION has engineered a unified, high-reliability architecture for your ${facilitySize.toLocaleString()} sq ft ${facilityType} facility. By converging AI computer vision, CRM-integrated VoIP communications, and IP-Audio PA onto a PoE-powered network backbone, your operations achieve proactive threat mitigation and seamless communication continuity.`,
      surveillanceArchitecture: {
        cameraCount: calculatedCameras,
        recommendedTypes: [
          "4K AI Smart Dome Cameras with Behavioral Anomaly Detection",
          "Optical PTZ Perimeter Cameras with Auto-Tracking",
          "Biometric Touchless Facial Verification Readers (99.87% Accuracy)",
        ],
        accessControlPoints: calculatedDoors,
        keyAnalytics: [
          "Real-time Anomaly & Loitering Sensing",
          "Multi-Factor Touchless Face / Mobile NFC Verification",
          "Automated Emergency Lockdown Triggering",
        ],
      },
      voipArchitecture: {
        recommendedSeats: calculatedSeats,
        trunkCapacity: `${Math.ceil(calculatedSeats * 0.35)} Concurrent SIP Channels with 99.99% Carrier Uptime`,
        crmIntegrationStrategy: "Real-time CRM Screen-Pop Dossier on inbound ring, 1-Click Dialing, and AI conversation speech logging.",
        omnichannelFeatures: [
          "Unified Inbox (Voice, SMS, Live Web Chat & WhatsApp)",
          "AI Speech Sentiment Analysis & Keyword Coaching",
          "Interactive Visual IVR & Smart Skill-based Call Queues",
        ],
      },
      audioArchitecture: {
        recommendedZones: calculatedZones,
        speakerCount: calculatedSpeakers,
        speakerTypes: [
          "30W PoE High-Fidelity Ceiling Speakers for Open Areas & Offices",
          "123dB SPL High-Noise Horn Speakers for Logistics & Perimeter",
          "Speaker-as-a-Microphone 2-Way Intercom Endpoints",
        ],
        emergencyProtocol: "One-Touch Mass Evacuation Override with SIP-triggered automated voice dispatches across all addressable zones.",
      },
      deploymentModel: deploymentPreference,
      timelineWeeks: timeline,
      estimatedInvestmentRange: `$${(calculatedCameras * 450 + calculatedSeats * 180 + calculatedSpeakers * 220 + 4500).toLocaleString()} - $${(calculatedCameras * 680 + calculatedSeats * 260 + calculatedSpeakers * 320 + 8000).toLocaleString()} USD`,
      keyBenefits: [
        "Proactive Physical Protection with <250ms Threat Latency",
        "Up to 28% Faster Customer Call Handling with CRM Screen-Pop",
        "PoE-Powered IP Audio eliminates bulky 70V/100V copper wiring",
        "Single-Pane-of-Glass unified security & communication management",
      ],
    };

    return new Response(
      JSON.stringify({ success: true, data: fallbackData, source: "zeecom-edge-rules" }),
      { headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Failed to generate architecture blueprint" }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
