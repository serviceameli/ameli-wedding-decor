import { siteHref } from '../lib/navigation.ts';
import snapshot from './generated/catalog.json' with { type: 'json' };
import type { Product } from './types.ts';
export { demoProducts } from './fixtures.ts';
export type { Product, ProductVariant, CompositionItem, Category } from './types.ts';
export interface CatalogProvider { listProducts(signal?: AbortSignal): Promise<Product[]>; }
export const catalogProducts: Product[] = snapshot.products as Product[];
export const catalogUpdatedAt = snapshot.updatedAt;
export const catalogProvider: CatalogProvider = {
  async listProducts(signal) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return catalogProducts;
  },
};
export const money = (value: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' ₽';
export const asset = (name: string) => /^https?:\/\//.test(name) ? name : siteHref('images/' + name);
export const rentalPeriod = (days: number | null) => days ? `аренда ${days} дн.` : 'период аренды уточняется';
