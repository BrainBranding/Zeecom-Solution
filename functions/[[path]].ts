const PAGE_SEO: Record<string, { title: string; description: string; canonical: string }> = {
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

const INDEXABLE_PATHS = new Set(["/", ...Object.keys(PAGE_SEO)]);

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const path = url.pathname !== "/" ? url.pathname.replace(/\/+$/, "") : "/";
  const legacyDestination = LEGACY_REDIRECTS[path];
  if (legacyDestination) return Response.redirect(new URL(legacyDestination, "https://zeecomsolution.com").toString(), 301);
  if (url.hostname === "www.zeecomsolution.com" || url.protocol !== "https:" || (url.pathname !== "/" && url.pathname.endsWith("/"))) {
    url.protocol = "https:";
    url.hostname = "zeecomsolution.com";
    url.pathname = path;
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const seo = PAGE_SEO[path];
  const isHtml = response.headers.get("content-type")?.includes("text/html");
  if (!isHtml) return response;

  if (!INDEXABLE_PATHS.has(path)) {
    const transformed = new HTMLRewriter()
      .on("title", { element(element) { element.setInnerContent("Page Not Found | ZEECOM Solution"); } })
      .on('meta[name="description"]', { element(element) { element.setAttribute("content", "The requested page could not be found. Return to the ZEECOM Solution homepage or contact our Lahore engineering team."); } })
      .on('meta[name="robots"]', { element(element) { element.setAttribute("content", "noindex, follow"); } })
      .on('link[rel="canonical"]', { element(element) { element.setAttribute("href", `https://zeecomsolution.com${path}`); } })
      .transform(response);
    return new Response(transformed.body, { status: 404, statusText: "Not Found", headers: transformed.headers });
  }

  if (!seo) return response;

  return new HTMLRewriter()
    .on("title", { element(element) { element.setInnerContent(seo.title); } })
    .on('meta[name="description"]', { element(element) { element.setAttribute("content", seo.description); } })
    .on('link[rel="canonical"]', { element(element) { element.setAttribute("href", seo.canonical); } })
    .on('meta[property="og:title"]', { element(element) { element.setAttribute("content", seo.title); } })
    .on('meta[property="og:description"]', { element(element) { element.setAttribute("content", seo.description); } })
    .on('meta[property="og:url"]', { element(element) { element.setAttribute("content", seo.canonical); } })
    .on('meta[name="twitter:title"]', { element(element) { element.setAttribute("content", seo.title); } })
    .on('meta[name="twitter:description"]', { element(element) { element.setAttribute("content", seo.description); } })
    .on('meta[name="twitter:url"]', { element(element) { element.setAttribute("content", seo.canonical); } })
    .transform(response);
};
