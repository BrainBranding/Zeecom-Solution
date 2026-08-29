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

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  const path = new URL(context.request.url).pathname.replace(/\/$/, "") || "/";
  const seo = PAGE_SEO[path];
  if (!seo || !response.headers.get("content-type")?.includes("text/html")) return response;

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
