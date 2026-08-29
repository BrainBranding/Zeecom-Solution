interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  structuredData?: Record<string, unknown>;
  robots?: string;
}

const setMeta = (selector: string, attribute: string, value: string) => {
  document.querySelector(selector)?.setAttribute(attribute, value);
};

export const applyPageSeo = ({ title, description, canonical, structuredData, robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }: PageSeo) => {
  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('link[rel="canonical"]', 'href', canonical);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonical);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:url"]', 'content', canonical);
  setMeta('meta[name="robots"]', 'content', robots);
  const existingSchema = document.getElementById('page-structured-data');
  existingSchema?.remove();
  if (structuredData) {
    const schema = document.createElement('script');
    schema.id = 'page-structured-data';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify(structuredData);
    document.head.appendChild(schema);
  }
};
