import snapshot from './generated/catalog.json' with { type: 'json' };
import type { CatalogCategory } from './category-seed.ts';
export type { CatalogCategory } from './category-seed.ts';
export const catalogCategories: CatalogCategory[] = snapshot.categories;
export const readySolutionCategories = catalogCategories.filter(c => c.parentId === 'ready-solutions');
