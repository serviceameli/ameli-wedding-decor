import type { Product } from '../data/types.ts';
export function getVariant(product: Product, variantId?: string) {
  return product.variants.find(v => v.id === variantId)
    ?? product.variants.find(v => v.id === product.defaultVariantId)
    ?? product.variants[0];
}
export function minimumPrice(product: Product): number {
  return Math.min(...product.variants.map(v => v.price));
}
export function normalizeVariantChoices(value: unknown, products: Product[]): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([productId, variantId]) =>
    typeof variantId === 'string' && products.some(p => p.id === productId && p.variants.some(v => v.id === variantId))
  ));
}
