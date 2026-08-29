# Cloudflare Workers & Pages Deployment Guide

**ZEECOM SOLUTION** is structured to deploy seamlessly to **Cloudflare Pages** with **Pages Functions (Edge Serverless)** and **Cloudflare Workers**.

---

## 🚀 Option 1: Cloudflare Pages via Git (Recommended)

1. **Push your repository** to GitHub or GitLab.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework Preset**: `Vite` (or `None`)
   - **Build Command**: `npm run build:pages` (or `vite build`)
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/`
4. **Environment Variables**:
   - In **Settings** > **Environment variables**, add:
     - `GEMINI_API_KEY`: *(Your Google AI Studio / Gemini API Key)*
     - `CONSULTATION_WEBHOOK_URL`: *(Required HTTPS webhook for email, CRM, or workflow delivery unless KV storage is configured)*
     - `NODE_VERSION`: `20`
5. Click **Save and Deploy**. Cloudflare Pages will automatically build the static assets and deploy edge serverless functions located in the `/functions` directory!

---

## ⚡ Option 2: Direct Cloudflare Worker Deployment

You can build and deploy directly from your local terminal using Cloudflare Wrangler:

```bash
# 1. Install dependencies
npm install

# 2. Build the client application
npm run build

# 3. Deploy the Worker and static assets
npm run deploy

# 4. Set Worker secrets
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put CONSULTATION_WEBHOOK_URL

# Optional: create persistent KV namespaces for leads and distributed rate limits,
# then add the returned namespace IDs as LEADS and RATE_LIMITS bindings in wrangler.toml.
npx wrangler kv namespace create LEADS
npx wrangler kv namespace create RATE_LIMITS
```

---

## 🛡️ Edge Serverless Architecture Overview

- **Static Frontend**: Compiled into `dist/` and distributed globally via Cloudflare's ultra-low-latency Anycast CDN.
- **Pages Functions (`/functions/api/`)**:
  - `GET /api/health` — Platform status, carrier uptime SLA check, and Gemini readiness.
  - `POST /api/ai/solution-architect` — Edge-powered AI solution blueprint and hardware sizing engine.
  - `POST /api/ai/security-audit` — Cyber-physical readiness auditor.
  - `POST /api/consultation` — Validated consultation intake delivered through the configured webhook or KV binding.
- **Routing & Fallbacks**: Workers Static Assets uses `not_found_handling = "single-page-application"` in `wrangler.toml`. Do not add a catch-all `public/_redirects` rule to the Workers deployment.
- **Security & Headers**: `public/_headers` enforces strict security policies (`X-Content-Type-Options`, `Permissions-Policy`, and asset caching).
- **Consultation delivery**: Configure `CONSULTATION_WEBHOOK_URL`, or bind a Cloudflare KV namespace as `LEADS`. The API returns a configuration error instead of confirming an undelivered request.

---

## 🌐 Custom Domain Setup (`zeecomsolution.com`)

1. In the Cloudflare Dashboard, open your Pages project.
2. Go to **Custom domains** > **Set up a custom domain**.
3. Enter `zeecomsolution.com` or `www.zeecomsolution.com`.
4. Cloudflare automatically generates SSL/TLS certificates and configures DNS routing with DDoS protection.

---

## Post-deployment checklist

1. Bind `LEADS` and `RATE_LIMITS` to their Cloudflare KV namespaces.
2. Add `CONSULTATION_WEBHOOK_URL` as an encrypted Worker secret when automatic email or CRM delivery is required.
3. Submit `https://zeecomsolution.com/sitemap.xml` in Google Search Console.
4. Request indexing for the homepage, three service pages, Privacy Policy, and Terms and Conditions.
5. Replace illustrative performance benchmarks only when verified product or project documentation is available.
