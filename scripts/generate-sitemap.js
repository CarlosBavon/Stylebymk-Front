const fs = require('fs');
const path = require('path');

// Define your routes
const routes = [
    '/',
    '/about',
    '/gallery',
    '/booking',
    '/enquiry',
    '/contact',
    '/cancel',
];

// Your website URL (replace with your actual domain)
const BASE_URL = 'https://stylebymk.vercel.app'; // or your custom domain

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Sitemap generated at ${outputPath}`);
};

generateSitemap();