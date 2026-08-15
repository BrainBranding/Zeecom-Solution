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
     - `NODE_VERSION`: `20`
5. Click **Save and Deploy**. Cloudflare Pages will automatically build the static assets and deploy edge serverless functions located in the `/functions` directory!

---

## ⚡ Option 2: Direct Deployment with Wrangler CLI

You can build and deploy directly from your local terminal using Cloudflare Wrangler:

```bash
# 1. Install dependencies
npm install

# 2. Build the client application
npm run build:pages

# 3. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=zeecom-solution

# 4. (Optional) Set your secret Gemini API Key for Edge Functions
npx wrangler pages secret put GEMINI_API_KEY --project-name=zeecom-solution
```

---

## 🛡️ Edge Serverless Architecture Overview

- **Static Frontend**: Compiled into `dist/` and distributed globally via Cloudflare's ultra-low-latency Anycast CDN.
- **Pages Functions (`/functions/api/`)**:
  - `GET /api/health` — Platform status, carrier uptime SLA check, and Gemini readiness.
  - `POST /api/ai/solution-architect` — Edge-powered AI solution blueprint and hardware sizing engine.
  - `POST /api/ai/security-audit` — Cyber-physical readiness auditor.
- **Routing & Fallbacks**: `public/_redirects` ensures seamless SPA routing with `/* /index.html 200`.
- **Security & Headers**: `public/_headers` enforces strict security policies (`X-Content-Type-Options`, `Permissions-Policy`, and asset caching).

---

## 🌐 Custom Domain Setup (`zeecomsolution.com`)

1. In the Cloudflare Dashboard, open your Pages project.
2. Go to **Custom domains** > **Set up a custom domain**.
3. Enter `zeecomsolution.com` or `www.zeecomsolution.com`.
4. Cloudflare automatically generates SSL/TLS certificates and configures DNS routing with DDoS protection.
