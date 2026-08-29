interface Env {
  CONSULTATION_WEBHOOK_URL?: string;
  LEADS?: {
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
  };
  RATE_LIMITS?: {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
  };
}

const fallbackRateLimits = new Map<string, { count: number; resetTime: number }>();
const WINDOW_SECONDS = 600;
const MAX_REQUESTS = 5;

const sanitize = (value: unknown, maxLength = 1000) =>
  String(value ?? "").replace(/[<>]/g, "").trim().slice(0, maxLength);

const respond = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "https://zeecomsolution.com",
    "Vary": "Origin",
  },
});

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const rawBody = await request.text();
    if (rawBody.length > 32768) return respond({ success: false, error: "Request payload is too large." }, 413);
    const body: any = rawBody ? JSON.parse(rawBody) : {};
    if (sanitize(body.website_check, 200)) {
      return respond({ success: true, inquiryId: "ZEC-RECEIVED", message: "Your request has been received." });
    }

    const key = request.headers.get("CF-Connecting-IP") || "anonymous";
    const rateKey = `consultation:${key}`;
    const now = Date.now();
    if (env.RATE_LIMITS) {
      const count = Number(await env.RATE_LIMITS.get(rateKey) || 0);
      if (count >= MAX_REQUESTS) return respond({ success: false, error: "Too many requests. Please try again later or call 042-37455670." }, 429);
      await env.RATE_LIMITS.put(rateKey, String(count + 1), { expirationTtl: WINDOW_SECONDS });
    } else {
      const current = fallbackRateLimits.get(key);
      if (!current || current.resetTime <= now) fallbackRateLimits.set(key, { count: 1, resetTime: now + WINDOW_SECONDS * 1000 });
      else if (current.count >= MAX_REQUESTS) return respond({ success: false, error: "Too many requests. Please try again later or call 042-37455670." }, 429);
      else current.count += 1;
    }

    const fullName = sanitize(body.fullName || body.name, 120);
    const email = sanitize(body.email, 180);
    const phone = sanitize(body.phone, 60);
    const company = sanitize(body.company, 180);
    const phoneDigits = phone.replace(/\D/g, "");
    if (!fullName || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return respond({ success: false, error: "Please provide a valid name, work email, phone number and company." }, 400);
    }

    const inquiryId = `ZEC-${now.toString(36).toUpperCase()}`;
    const lead = {
      inquiryId,
      fullName,
      email,
      phone,
      company,
      facilityType: sanitize(body.facilityType, 120),
      primaryDomain: sanitize(body.primaryDomain, 300),
      message: sanitize(body.message, 2000),
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
      if (!webhookResponse.ok) return respond({ success: false, error: "Lead delivery failed. Please call 042-37455670." }, 502);
      delivered = true;
    }
    if (!delivered) return respond({ success: false, error: "Consultation delivery is not configured. Please call 042-37455670." }, 503);

    console.log(JSON.stringify({ type: "consultation_delivered", inquiryId }));
    return respond({ success: true, inquiryId, message: `Thank you, ${fullName}. Your consultation request was delivered successfully. Our team will contact you within 24 business hours.` });
  } catch (err: any) {
    return respond({ success: false, error: err?.message || "Unable to submit the consultation request." }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => new Response(null, {
  headers: {
    "Access-Control-Allow-Origin": "https://zeecomsolution.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  },
});
