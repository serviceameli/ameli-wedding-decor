import fs from 'node:fs';
import { seedCategories } from '../data/category-seed.ts';
import {
  API_URL,
  apiGet,
  assertCompany,
  readAllDecor,
} from '../lib/catalog-api.ts';
import { importCategories, importProducts } from '../lib/catalog-import.ts';

if (fs.existsSync('.env')) process.loadEnvFile('.env');
const base = process.env.AMELI_API_URL || API_URL;
const company = await apiGet(base, '/api/v1/company/30/');
assertCompany(company);
const rawCategories = await apiGet(base, '/api/v1/categories-site/30/', {
  choice_category: 'parent',
});
// This documented diagnostic route exists even while it has no public products.
const stands = await apiGet(
  base,
  '/api/v1/categories-site/slug/vysokie-stojki/30/',
);
if (stands) {
  const parent = rawCategories.find(
    (category) => category.id === stands.parent_id,
  );
  if (parent && !parent.children?.some((category) => category.id === stands.id))
    (parent.children ||= []).push(stands);
}
const categories = importCategories(rawCategories, seedCategories);
let rows;
for (let attempt = 0; attempt < 2; attempt++) {
  try {
    rows = await readAllDecor(base);
    break;
  } catch (error) {
    if (attempt === 1) throw error;
    console.warn('Повторяем загрузку полного каталога после ошибки.');
  }
}
if (!rows.length)
  throw new Error(
    'Refusing to replace the published catalogue with an empty response',
  );
const ids = new Set();
for (const row of rows) {
  // Full details for complete wedding sets and explicitly linked hidden variants.
  if (
    row.categories_site?.some((category) =>
      [6589, 6587, 6629, 6630, 6594, 6591].includes(category.id),
    )
  )
    ids.add(row.id);
  for (const link of row.decors_repaint || [])
    if (link.is_alternative && link.hide_in_catalog) ids.add(link.id);
}
const pending = [...ids];
const details = new Map();
let cursor = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < pending.length) {
      const id = pending[cursor++];
      const detail = await apiGet(base, `/api/v1/decor/${id}/`);
      if (detail.id !== id || detail.company_id !== 30)
        throw new Error('Unexpected variant identity');
      details.set(id, detail);
    }
  }),
);
const products = importProducts(rows, details, categories);
const snapshot = {
  company: { id: 30, name: company.name_company },
  updatedAt: new Date().toISOString(),
  categories,
  products,
};
fs.mkdirSync('data/generated', { recursive: true });
const temporary = 'data/generated/catalog.json.tmp';
fs.writeFileSync(temporary, JSON.stringify(snapshot) + '\n');
fs.renameSync(temporary, 'data/generated/catalog.json');
console.log(
  `Амели декор №30: ${products.length} карточек, ${products.reduce((sum, product) => sum + product.variants.length, 0)} вариантов, ${categories.length} разделов.`,
);
