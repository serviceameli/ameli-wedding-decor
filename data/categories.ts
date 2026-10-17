import snapshot from './generated/catalog.json' with { type: 'json' };
import type { CatalogCategory } from './category-seed.ts';
export type { CatalogCategory } from './category-seed.ts';
export const catalogCategories: CatalogCategory[] = snapshot.categories;
export const readySolutionCategories = catalogCategories.filter(c => ['ceremony', 'round-tables', 'rectangular-tables', 'snake-tables', 'settings', 'flowers', 'api-category-6875'].includes(c.id));
// These are the public wedding zones in company 30's admin, in homepage order.
// Separate items (chairs, poufs, textiles, etc.) belong in the full catalog.
const homeZoneIds = ['api-category-6876', 'api-category-6877', 'api-category-6878', 'api-category-7565', 'api-category-7411', 'ready-solutions', 'api-category-7412'];
export const homeZoneCategories = homeZoneIds.flatMap(id => {
  const category = catalogCategories.find(c => c.id === id && !c.parentId && c.image !== 'placeholder.svg');
  return category ? [category] : [];
});
