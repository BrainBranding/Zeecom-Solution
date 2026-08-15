// High-performance Cloudflare Worker entry point for ZEECOM SOLUTION
interface Env {
  GEMINI_API_KEY?: string;
  ENVIRONMENT?: string;
  APP_NAME?: string;
  APP_URL?: string;
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // API Routes Handlers directly on the Edge Worker
    if (url.pathname === "/api/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          platform: "cloudflare-worker",
          company: "ZEECOM SOLUTION",
          timestamp: new Date().toISOString(),
          geminiConfigured: Boolean(env.GEMINI_API_KEY),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (url.pathname === "/api/ai/solution-architect" && request.method === "POST") {
      const corsHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
You are Chief Solutions Architect at ZEECOM SOLUTION.
Facility: ${facilityType} (${facilitySize} sq ft, ${buildingCount} buildings, ${floorCount} floors, ${userCount} users).
Pain points: ${painPoints}. Deployment: ${deploymentPreference}. Domains: ${focusDomains.join(", ")}.
Return valid JSON matching the architectural specification.
`;
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: { responseMimeType: "application/json" },
                }),
              }
            );

            if (geminiRes.ok) {
              const resData: any = await geminiRes.json();
              const text = resData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                return new Response(
                  JSON.stringify({ success: true, data: JSON.parse(text.trim()), source: "gemini-worker-edge" }),
                  { headers: corsHeaders }
                );
              }
            }
          } catch (e) {
            console.error("Worker Gemini call error", e);
          }
        }

        // Deterministic engineering fallback
        const calculatedCameras = Math.max(8, Math.round((facilitySize / 2500) * (buildingCount * 0.8)));
        const calculatedDoors = Math.max(4, Math.round(floorCount * 3 * buildingCount));
        const calculatedSeats = Math.max(10, Math.round(userCount * 0.7));
        const calculatedZones = Math.max(3, floorCount + buildingCount + 2);
        const calculatedSpeakers = Math.max(12, Math.round(facilitySize / 1500));
        const timeline = Math.max(3, Math.min(12, Math.round(buildingCount * 1.5 + floorCount * 0.8)));

        return new Response(
          JSON.stringify({
            success: true,
            data: {
              executiveSummary: `ZEECOM SOLUTION unified architecture for your ${facilitySize.toLocaleString()} sq ft ${facilityType} facility.`,
              surveillanceArchitecture: {
                cameraCount: calculatedCameras,
                recommendedTypes: [
                  "4K AI Smart Dome Cameras with Behavioral Anomaly Detection",
                  "Optical PTZ Perimeter Cameras with Auto-Tracking",
                  "Biometric Touchless Facial Verification Readers (99.87% Accuracy)",
                ],
                accessControlPoints: calculatedDoors,
                keyAnalytics: ["Real-time Anomaly Sensing", "Biometric Touchless MFA", "Automated Lockdown"],
              },
              voipArchitecture: {
                recommendedSeats: calculatedSeats,
                trunkCapacity: `${Math.ceil(calculatedSeats * 0.35)} Concurrent SIP Channels with 99.99% Carrier Uptime`,
                crmIntegrationStrategy: "Real-time Inbound Screen-Pop Dossier and 1-Click Dialing.",
                omnichannelFeatures: ["Unified Inbox", "AI Speech Sentiment Analysis", "Visual IVR"],
              },
              audioArchitecture: {
                recommendedZones: calculatedZones,
                speakerCount: calculatedSpeakers,
                speakerTypes: [
                  "30W PoE High-Fidelity Ceiling Speakers",
                  "123dB SPL High-Noise Industrial Horns",
                  "2-Way Intercom Endpoints",
                ],
                emergencyProtocol: "One-Touch Mass Evacuation Override with SIP/ONVIF dispatch.",
              },
              deploymentModel: deploymentPreference,
              timelineWeeks: timeline,
              estimatedInvestmentRange: `$${(calculatedCameras * 450 + calculatedSeats * 180 + calculatedSpeakers * 220 + 4500).toLocaleString()} - $${(calculatedCameras * 680 + calculatedSeats * 260 + calculatedSpeakers * 320 + 8000).toLocaleString()} USD`,
              keyBenefits: [
                "Proactive Threat Detection (<250ms latency)",
                "28% Faster Customer Resolution via VoIP CRM",
                "PoE-Powered IP Audio Architecture",
                "Single-Pane-of-Glass unified security & telephony control",
              ],
            },
            source: "zeecom-worker-engine",
          }),
          { headers: corsHeaders }
        );
      } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err?.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Default: Forward request to Cloudflare Workers Static Assets binding
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("ZEECOM SOLUTION Edge Worker Active", { status: 200 });
  },
};
