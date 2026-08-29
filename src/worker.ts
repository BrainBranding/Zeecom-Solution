// High-performance Cloudflare Worker entry point for ZEECOM SOLUTION
interface Env {
  GEMINI_API_KEY?: string;
  CONSULTATION_WEBHOOK_URL?: string;
  ENVIRONMENT?: string;
  APP_NAME?: string;
  APP_URL?: string;
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
  LEADS?: {
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
  };
  RATE_LIMITS?: {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
  };
}

const LEGAL_PAGE_SEO: Record<string, { title: string; description: string; canonical: string }> = {
  "/ai-surveillance-access-control": {
    title: "AI Surveillance & Access Control Lahore | ZEECOM",
    description: "AI surveillance, biometric access control and unified security systems engineered by ZEECOM Solution in Lahore, Pakistan.",
    canonical: "https://zeecomsolution.com/ai-surveillance-access-control",
  },
  "/voip-crm-contact-center": {
    title: "VoIP CRM & Contact Center Lahore | ZEECOM",
    description: "VoIP phone systems, CRM screen pops, contact-center routing and omnichannel communications from ZEECOM Solution.",
    canonical: "https://zeecomsolution.com/voip-crm-contact-center",
  },
  "/ip-audio-pa-systems": {
    title: "IP Audio & PA Systems Lahore | ZEECOM",
    description: "PoE IP-audio, public-address, emergency paging and multi-zone communication systems engineered by ZEECOM Solution.",
    canonical: "https://zeecomsolution.com/ip-audio-pa-systems",
  },
  "/privacy-policy": {
    title: "Privacy Policy | ZEECOM Solution",
    description: "Read how ZEECOM Solution collects, uses, protects and retains information submitted through its website and consultation forms.",
    canonical: "https://zeecomsolution.com/privacy-policy",
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions | ZEECOM Solution",
    description: "Review the terms governing ZEECOM Solution engineering consultations, proposals, system deployments, website use and client responsibilities.",
    canonical: "https://zeecomsolution.com/terms-and-conditions",
  },
};

const consultationRateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const LEGACY_REDIRECTS: Record<string, string> = {
  "/ai-surveillance": "/ai-surveillance-access-control",
  "/voip-crm": "/voip-crm-contact-center",
  "/ip-audio": "/ip-audio-pa-systems",
  "/terms": "/terms-and-conditions",
  "/about": "/#overview",
  "/overview": "/#overview",
  "/industries": "/#industries",
  "/architect": "/#ai-architect",
  "/configurator": "/#configurator",
  "/audit": "/#deployment",
  "/contact": "/#contact",
};

const INDEXABLE_PATHS = new Set(["/", ...Object.keys(LEGAL_PAGE_SEO)]);

const jsonResponse = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "https://zeecomsolution.com",
    "Vary": "Origin",
  },
});

const sanitizeText = (value: unknown, maxLength = 1000) =>
  String(value ?? "").replace(/[<>]/g, "").trim().slice(0, maxLength);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const normalizedPath = url.pathname !== "/" ? url.pathname.replace(/\/+$/, "") : "/";
    const legacyDestination = LEGACY_REDIRECTS[normalizedPath];

    if (legacyDestination) {
      return Response.redirect(new URL(legacyDestination, "https://zeecomsolution.com").toString(), 301);
    }

    if (url.hostname === "www.zeecomsolution.com" || url.protocol !== "https:" || (url.pathname !== "/" && url.pathname.endsWith("/"))) {
      url.protocol = "https:";
      url.hostname = "zeecomsolution.com";
      url.pathname = normalizedPath;
      return Response.redirect(url.toString(), 301);
    }

    if (request.method === "POST" && url.pathname.startsWith("/api/") && Number(request.headers.get("content-length") || 0) > 32768) {
      return jsonResponse({ success: false, error: "Request payload is too large." }, 413);
    }

    // Explicit SEO & AI Agent Crawlers direct fast paths
    if (url.pathname === "/robots.txt") {
      const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: https://zeecomsolution.com/sitemap.xml\n`;
      return new Response(robotsContent, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/sitemap.xml") {
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://zeecomsolution.com/</loc>\n    <lastmod>2026-08-29</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>https://zeecomsolution.com/privacy-policy</loc>\n    <lastmod>2026-08-29</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n  <url>\n    <loc>https://zeecomsolution.com/terms-and-conditions</loc>\n    <lastmod>2026-08-29</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n</urlset>\n`;
      const serviceUrls = `  <url>\n    <loc>https://zeecomsolution.com/ai-surveillance-access-control</loc>\n    <lastmod>2026-08-29</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>https://zeecomsolution.com/voip-crm-contact-center</loc>\n    <lastmod>2026-08-29</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>https://zeecomsolution.com/ip-audio-pa-systems</loc>\n    <lastmod>2026-08-29</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
      const expandedSitemap = sitemapContent.replace("  <url>\n    <loc>https://zeecomsolution.com/privacy-policy</loc>", `${serviceUrls}  <url>\n    <loc>https://zeecomsolution.com/privacy-policy</loc>`);
      return new Response(expandedSitemap.replaceAll("2026-08-29", new Date().toISOString().slice(0, 10)), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/llms.txt") {
      const llmsTxt = `# ZEECOM SOLUTION\n\n> ZEECOM SOLUTION delivers turnkey intelligent enterprise physical security, VoIP integrated CRM contact centers, and IP-Audio mass notification systems.\n\n## Overview\nZEECOM SOLUTION is an enterprise systems engineering and technology infrastructure provider headquartered in Lahore, Pakistan.\n\n## Core Capabilities\n- **AI-Powered Surveillance & Access Control**: 4K smart dome surveillance, automated behavioral anomaly detection, touchless biometric facial recognition.\n- **VoIP Integrated CRM & Contact Center**: Cloud and on-premise PBX, click-to-dial, inbound caller dossiers, IVR automation, call recordings.\n- **IP-Audio & Public Address Systems**: Multi-zone IP network audio, SIP/ONVIF integrated intercoms, ambient background music, and instant emergency override.\n\n## Tools\n- AI Solutions Architect: Capacity estimator and BOM generator.\n- System Configurator: Live deployment designer and budget forecaster.\n\n## Contact\n- Website: https://zeecomsolution.com\n- Email: info@zeecomsolution.com\n`;
      return new Response(llmsTxt, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/llms-full.txt") {
      const llmsFullTxt = `# ZEECOM SOLUTION — Full Architectural & Technical Reference\n\n## Enterprise Engineering Architecture\n\n### 1. AI-Powered Physical Surveillance & Access Control\n- Edge AI optical analytics: ANPR/LPR, perimeter intrusion tripwires, dwell-time anomalies.\n- Biometric Readers: Dual-lens anti-spoofing facial recognition (<0.2s verification), optical fingerprint, RFID/MIFARE.\n- Security Integration: ONVIF Profile S/G/T/M compliance, RTSP direct streaming, integration with fire alarms.\n\n### 2. VoIP Unified Communications & CRM Integration\n- PBX Infrastructure: Asterisk / FreePBX / FreeSWITCH SIP core with TLS/SRTP encryption.\n- CRM Integrations: HubSpot, Salesforce, Zoho CRM, Bitrix24, Microsoft Dynamics 365.\n- Call Flow Features: Automatic Call Distribution (ACD), Interactive Voice Response (IVR), Queue Callback, Call Recording.\n\n### 3. IP-Audio Public Address & Intercom Systems\n- Audio Transports: Dante, AES67, SIP/RTP multicast streaming.\n- Endpoint Hardware: IP ceiling speakers (15W/30W PoE+), outdoor horn speakers (120dB+ SPL), two-way intercom endpoints.\n- Zone Management: Software-defined zone matrix, priority emergency override broadcast.\n\n## Organization\n- Company: ZEECOM SOLUTION\n- Location: Lahore, Pakistan\n- Web: https://zeecomsolution.com\n`;
      return new Response(llmsFullTxt, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

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
            "Access-Control-Allow-Origin": "https://zeecomsolution.com",
            "Vary": "Origin",
          },
        }
      );
    }

    if (url.pathname === "/api/ai/solution-architect" && request.method === "POST") {
      const corsHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://zeecomsolution.com",
        "Vary": "Origin",
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
                crmIntegrationStrategy: "Real-time inbound screen-pop dossier and one-click dialing.",
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

    if (url.pathname === "/api/ai/security-audit" && request.method === "POST") {
      try {
        const body: any = await request.json().catch(() => ({}));
        const setup = sanitizeText(body.existingInfrastructure || body.existingSetup || "Legacy analog CCTV and PBX", 2000);
        return jsonResponse({
          success: true,
          data: {
            readinessScore: setup.length > 120 ? 48 : 42,
            criticalVulnerabilities: [
              "Passive recording without real-time anomaly detection can delay incident response",
              "Disconnected telephony and CRM systems limit customer context and reporting",
              "Legacy public-address infrastructure lacks addressable zones and automated emergency triggers",
            ],
            zeecomUpgradePath: [
              "Audit the existing network, cabling, cameras, PBX and public-address endpoints",
              "Introduce edge analytics and CRM-integrated VoIP through a phased migration",
              "Deploy PoE IP-audio endpoints with SIP/ONVIF emergency automation",
            ],
            complianceImpact: "Improves auditability, access governance, communications resilience and incident-response readiness.",
          },
          source: "zeecom-worker-audit-engine",
        });
      } catch (err: any) {
        return jsonResponse({ success: false, error: err?.message || "Unable to complete the audit." }, 500);
      }
    }

    if (url.pathname === "/api/consultation" && request.method === "POST") {
      try {
        const rawBody = await request.text();
        if (rawBody.length > 32768) {
          return jsonResponse({ success: false, error: "Request payload is too large." }, 413);
        }
        const body: any = rawBody ? JSON.parse(rawBody) : {};
        if (sanitizeText(body.website_check, 200)) {
          return jsonResponse({ success: true, inquiryId: "ZEC-RECEIVED", message: "Your request has been received." });
        }

        const clientKey = request.headers.get("CF-Connecting-IP") || "anonymous";
        const now = Date.now();
        const rateKey = `consultation:${clientKey}`;
        if (env.RATE_LIMITS) {
          const count = Number(await env.RATE_LIMITS.get(rateKey) || 0);
          if (count >= MAX_SUBMISSIONS_PER_WINDOW) {
            return jsonResponse({ success: false, error: "Too many requests. Please try again later or call 042-37455670." }, 429);
          }
          await env.RATE_LIMITS.put(rateKey, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_MS / 1000 });
        } else {
          const current = consultationRateLimits.get(clientKey);
          if (!current || current.resetTime <= now) {
            consultationRateLimits.set(clientKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
          } else if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
            return jsonResponse({ success: false, error: "Too many requests. Please try again later or call 042-37455670." }, 429);
          } else {
            current.count += 1;
          }
        }

        const fullName = sanitizeText(body.fullName || body.name, 120);
        const email = sanitizeText(body.email, 180);
        const phone = sanitizeText(body.phone, 60);
        const company = sanitizeText(body.company, 180);
        const phoneDigits = phone.replace(/\D/g, "");
        if (!fullName || !email || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phoneDigits.length < 7 || phoneDigits.length > 15) {
          return jsonResponse({ success: false, error: "Please provide a valid name, work email, phone number and company." }, 400);
        }

        const inquiryId = `ZEC-${now.toString(36).toUpperCase()}`;
        const lead = {
          type: "consultation_inquiry",
          inquiryId,
          fullName,
          email,
          phone,
          company,
          facilityType: sanitizeText(body.facilityType, 120),
          primaryDomain: sanitizeText(body.primaryDomain, 300),
          message: sanitizeText(body.message, 2000),
          receivedAt: new Date(now).toISOString(),
        };

        let delivered = false;
        if (env.LEADS) {
          await env.LEADS.put(inquiryId, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 365 });
          delivered = true;
        }
        if (env.CONSULTATION_WEBHOOK_URL) {
          const webhookResponse = await fetch(env.CONSULTATION_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
          });
          if (!webhookResponse.ok) {
            return jsonResponse({ success: false, error: "Lead delivery failed. Please call 042-37455670." }, 502);
          }
          delivered = true;
        }
        if (!delivered) {
          return jsonResponse({ success: false, error: "Consultation delivery is not configured. Please call 042-37455670." }, 503);
        }

        console.log(JSON.stringify({ type: "consultation_delivered", inquiryId }));

        return jsonResponse({
          success: true,
          inquiryId,
          message: `Thank you, ${fullName}. Your consultation request has been registered. Our team will contact you within 24 business hours.`,
        });
      } catch (err: any) {
        return jsonResponse({ success: false, error: err?.message || "Unable to submit the consultation request." }, 500);
      }
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "https://zeecomsolution.com",
          "Vary": "Origin",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    if (url.pathname.startsWith("/api/")) {
      return jsonResponse({ success: false, error: "API endpoint not found." }, 404);
    }

    // Default: Forward request to Cloudflare Workers Static Assets binding
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      const seo = LEGAL_PAGE_SEO[url.pathname.replace(/\/$/, "")];
      let response = assetResponse;
      if (seo && assetResponse.headers.get("content-type")?.includes("text/html")) {
        response = new HTMLRewriter()
          .on("title", { element(element) { element.setInnerContent(seo.title); } })
          .on('meta[name="description"]', { element(element) { element.setAttribute("content", seo.description); } })
          .on('link[rel="canonical"]', { element(element) { element.setAttribute("href", seo.canonical); } })
          .on('meta[property="og:title"]', { element(element) { element.setAttribute("content", seo.title); } })
          .on('meta[property="og:description"]', { element(element) { element.setAttribute("content", seo.description); } })
          .on('meta[property="og:url"]', { element(element) { element.setAttribute("content", seo.canonical); } })
          .on('meta[name="twitter:title"]', { element(element) { element.setAttribute("content", seo.title); } })
          .on('meta[name="twitter:description"]', { element(element) { element.setAttribute("content", seo.description); } })
          .on('meta[name="twitter:url"]', { element(element) { element.setAttribute("content", seo.canonical); } })
          .transform(assetResponse);
      }
      if (!INDEXABLE_PATHS.has(normalizedPath) && assetResponse.headers.get("content-type")?.includes("text/html")) {
        const notFoundResponse = new HTMLRewriter()
          .on("title", { element(element) { element.setInnerContent("Page Not Found | ZEECOM Solution"); } })
          .on('meta[name="description"]', { element(element) { element.setAttribute("content", "The requested page could not be found. Return to the ZEECOM Solution homepage or contact our Lahore engineering team."); } })
          .on('meta[name="robots"]', { element(element) { element.setAttribute("content", "noindex, follow"); } })
          .on('link[rel="canonical"]', { element(element) { element.setAttribute("href", `https://zeecomsolution.com${normalizedPath}`); } })
          .transform(assetResponse);
        response = new Response(notFoundResponse.body, {
          status: 404,
          statusText: "Not Found",
          headers: notFoundResponse.headers,
        });
      }
      const securedResponse = new Response(response.body, response);
      securedResponse.headers.set("X-Content-Type-Options", "nosniff");
      securedResponse.headers.set("X-Frame-Options", "SAMEORIGIN");
      securedResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      securedResponse.headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; upgrade-insecure-requests");
      securedResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
      securedResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      securedResponse.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
      return securedResponse;
    }

    return new Response("ZEECOM SOLUTION Edge Worker Active", { status: 200 });
  },
};
