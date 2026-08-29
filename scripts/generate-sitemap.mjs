import { writeFile } from 'node:fs/promises';

const lastmod = new Date().toISOString().slice(0, 10);
const urls = [
  ['https://zeecomsolution.com/', 'weekly', '1.0'],
  ['https://zeecomsolution.com/ai-surveillance-access-control', 'monthly', '0.9'],
  ['https://zeecomsolution.com/voip-crm-contact-center', 'monthly', '0.9'],
  ['https://zeecomsolution.com/ip-audio-pa-systems', 'monthly', '0.9'],
  ['https://zeecomsolution.com/privacy-policy', 'monthly', '0.7'],
  ['https://zeecomsolution.com/terms-and-conditions', 'monthly', '0.7'],
];

const entries = urls.map(([loc, changefreq, priority]) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');

await writeFile(new URL('../public/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`, 'utf8');
