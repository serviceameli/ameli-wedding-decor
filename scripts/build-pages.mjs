import fs from 'node:fs';
import { catalogCategories } from '../data/categories.ts';
import { validateCatalogTree } from '../lib/catalog-tree.ts';
import { catalogProducts } from '../data/catalog.ts';
validateCatalogTree(catalogCategories);
for (const product of catalogProducts) {
  if (!catalogCategories.some(c => c.id === product.category)) throw new Error(`Unknown category: ${product.id}`);
}
const template = fs.readFileSync('dist/index.html', 'utf8');
const pages = [
  { path: 'catalog', title: 'Каталог для вашей свадьбы | Амели Декор' },
  ...catalogCategories.flatMap(c => [c.slug, ...(c.aliases || [])].map(slug => ({ path: `catalog/${slug}`, title: `${c.label} | Амели Декор` }))),
  ...catalogProducts.map(p => ({ path: `solution/${p.id}`, title: `${p.name} | Амели Декор` })),
];
for (const page of pages) {
  const prefix = '../'.repeat(page.path.split('/').length);
  const title = page.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const html = template.replaceAll('./assets/', `${prefix}assets/`).replace('href="./favicon.svg"', `href="${prefix}favicon.svg"`).replace('name="app-root" content="./"', `name="app-root" content="${prefix}"`).replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`);
  fs.mkdirSync(`dist/${page.path}`, { recursive: true });
  fs.writeFileSync(`dist/${page.path}/index.html`, html);
}
fs.writeFileSync('dist/.nojekyll','');
console.log(`Generated ${pages.length + 1} directly addressable pages.`);
const snapshot = JSON.parse(fs.readFileSync('data/generated/catalog.json', 'utf8'));
fs.writeFileSync('dist/catalog-status.json', JSON.stringify({ company: snapshot.company, updatedAt: snapshot.updatedAt, products: snapshot.products.length, revision: process.env.GITHUB_SHA || null }));
