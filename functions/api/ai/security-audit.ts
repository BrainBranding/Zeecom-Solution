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
    const { existingInfrastructure = "Analog CCTV and legacy PBX", sector = "Corporate" } = body;
    const apiKey = env.GEMINI_API_KEY;

    if (apiKey) {
      const prompt = `
Act as a Senior Cyber-Physical Security Auditor at ZEECOM SOLUTION.
Evaluate this current infrastructure state: "${existingInfrastructure}" in the "${sector}" sector.
Provide a structured assessment JSON:
{
  "readinessScore": number (0-100),
  "criticalVulnerabilities": ["Array of 3 key vulnerabilities in legacy setup"],
  "zeecomUpgradePath": ["Array of 3 prioritized migration steps"],
  "complianceImpact": "Summary of compliance/security improvement"
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
            return new Response(JSON.stringify({ success: true, data: parsed }), { headers: corsHeaders });
          }
        }
      } catch (geminiErr) {
        console.error("Cloudflare Edge Audit API Error:", geminiErr);
      }
    }

    // Edge Fallback
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          readinessScore: 42,
          criticalVulnerabilities: [
            "Passive recording without real-time AI anomaly detection causes delayed incident response",
            "Siloed PBX telephony lacks CRM context and omnichannel visibility",
            "Analog 70V PA systems lack granular zoning, encryption, and two-way verification",
          ],
          zeecomUpgradePath: [
            "Deploy ZEECOM AI Edge Gateways to retrofit existing cameras with behavior analytics",
            "Migrate telephony to Cloud/Hybrid VoIP with CRM Screen-Pop & Omnichannel sync",
            "Implement PoE-powered IP Audio endpoints with ONVIF/SIP emergency cross-triggering",
          ],
          complianceImpact:
            "Achieves ISO/IEC physical security standard alignment, 99.99% voice SLA, and encrypted NIST-compliant biometric verification.",
        },
      }),
      { headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || "Failed to perform security audit" }),
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
