import fs from 'node:fs';
import { catalogCategories } from '../data/categories.ts';
import { demoProducts } from '../data/catalog.ts';
const template = fs.readFileSync('dist/index.html', 'utf8');
const pages = [
  { path: 'catalog', title: 'Готовые решения для свадьбы | Амели' },
  ...catalogCategories.map(c => ({ path: `catalog/${c.slug}`, title: `${c.label} | Амели` })),
  ...demoProducts.map(p => ({ path: `solution/${p.id}`, title: `${p.name} | Амели` })),
];
for (const page of pages) {
  const prefix = '../'.repeat(page.path.split('/').length);
  const html = template.replaceAll('./assets/', `${prefix}assets/`).replace('href="./favicon.svg"', `href="${prefix}favicon.svg"`).replace('name="app-root" content="./"', `name="app-root" content="${prefix}"`).replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
  fs.mkdirSync(`dist/${page.path}`, { recursive: true });
  fs.writeFileSync(`dist/${page.path}/index.html`, html);
}
fs.writeFileSync('dist/.nojekyll','');
console.log(`Generated ${pages.length + 1} directly addressable pages.`);
