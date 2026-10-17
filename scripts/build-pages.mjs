import fs from 'node:fs';
import { catalogCategories } from '../data/categories.ts';
import { validateCatalogTree } from '../lib/catalog-tree.ts';
import { catalogProducts } from '../data/catalog.ts';
import { schemaPages, buildStructuredData, serializeStructuredData, STRUCTURED_DATA_ID } from '../lib/structured-data.ts';
validateCatalogTree(catalogCategories);
for (const product of catalogProducts) {
  if (!catalogCategories.some(c => c.id === product.category)) throw new Error(`Unknown category: ${product.id}`);
}
const template = fs.readFileSync('dist/index.html', 'utf8');
const pages = schemaPages(catalogCategories, catalogProducts);
for (const page of pages) {
  const prefix = page.path ? '../'.repeat(page.path.split('/').length) : './';
  const title = page.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const structuredData = serializeStructuredData(buildStructuredData(page, catalogCategories, catalogProducts));
  const html = template.replaceAll('./assets/', `${prefix}assets/`).replace('href="./favicon.svg"', `href="${prefix}favicon.svg"`).replace('name="app-root" content="./"', `name="app-root" content="${prefix}"`).replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`).replace('</head>', () => `<script id="${STRUCTURED_DATA_ID}" type="application/ld+json">${structuredData}</script>\n  </head>`);
  const directory = page.path ? `dist/${page.path}` : 'dist';
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(`${directory}/index.html`, html);
}
fs.writeFileSync('dist/.nojekyll','');
console.log(`Generated ${pages.length} directly addressable pages with structured data.`);
const snapshot = JSON.parse(fs.readFileSync('data/generated/catalog.json', 'utf8'));
fs.writeFileSync('dist/catalog-status.json', JSON.stringify({ company: snapshot.company, updatedAt: snapshot.updatedAt, products: snapshot.products.length, revision: process.env.GITHUB_SHA || null }));
