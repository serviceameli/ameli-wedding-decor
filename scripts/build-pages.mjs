import fs from 'node:fs';
import { catalogCategories } from '../data/categories.ts';
import { validateCatalogTree } from '../lib/catalog-tree.ts';
import { demoProducts } from '../data/catalog.ts';
validateCatalogTree(catalogCategories);
for (const product of demoProducts) {
  if (!catalogCategories.some(c => c.id === product.category)) throw new Error(`Unknown category: ${product.id}`);
}
const template = fs.readFileSync('dist/index.html', 'utf8');
const pages = [
  { path: 'catalog', title: 'Каталог для вашей свадьбы | Амели Декор' },
  ...catalogCategories.map(c => ({ path: `catalog/${c.slug}`, title: `${c.label} | Амели Декор` })),
  ...demoProducts.map(p => ({ path: `solution/${p.id}`, title: `${p.name} | Амели Декор` })),
];
for (const page of pages) {
  const prefix = '../'.repeat(page.path.split('/').length);
  const html = template.replaceAll('./assets/', `${prefix}assets/`).replace('href="./favicon.svg"', `href="${prefix}favicon.svg"`).replace('name="app-root" content="./"', `name="app-root" content="${prefix}"`).replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
  fs.mkdirSync(`dist/${page.path}`, { recursive: true });
  fs.writeFileSync(`dist/${page.path}/index.html`, html);
}
fs.writeFileSync('dist/.nojekyll','');
console.log(`Generated ${pages.length + 1} directly addressable pages.`);
