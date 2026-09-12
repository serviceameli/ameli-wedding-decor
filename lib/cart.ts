import type { Product, ProductVariant } from '../data/types.ts';
import { getVariant } from './variants.ts';
export type CartItem = { productId: string; variantId: string; quantity: number };
export type CartLine = CartItem & { product: Product; variant: ProductVariant };
export const MAX_QUANTITY = 200;
export const cartKey = (row: Pick<CartItem, 'productId' | 'variantId'>) => JSON.stringify([row.productId, row.variantId]);
export function normalizeCart(value: unknown, products: Product[]): CartItem[] {
  if (!Array.isArray(value)) return [];
  const merged = new Map<string, CartItem>();
  for (const row of value) {
    if (!row || typeof row !== 'object' || !Number.isInteger(row.quantity) || row.quantity < 1) continue;
    const product = products.find(p => p.id === row.productId);
    if (!product) continue;
    // Only legacy rows without a variant migrate to the default. Stale variants never silently change the order.
    const variant = row.variantId === undefined ? getVariant(product) : product.variants.find(v => v.id === row.variantId);
    if (!variant) continue;
    const item = { productId: product.id, variantId: variant.id, quantity: row.quantity };
    const key = cartKey(item);
    merged.set(key, { ...item, quantity: Math.min(MAX_QUANTITY, (merged.get(key)?.quantity ?? 0) + row.quantity) });
  }
  return [...merged.values()];
}
export function changeQuantity(cart: CartItem[], productId: string, variantId: string, delta: number): CartItem[] {
  if (!Number.isInteger(delta)) return cart;
  const matches = (row: CartItem) => row.productId === productId && row.variantId === variantId;
  const current = cart.find(matches)?.quantity ?? 0;
  const quantity = Math.max(0, Math.min(MAX_QUANTITY, current + delta));
  if (!quantity) return cart.filter(row => !matches(row));
  if (!current) return [...cart, { productId, variantId, quantity }];
  return cart.map(row => matches(row) ? { ...row, quantity } : row);
}
export function resolveCart(cart: CartItem[], products: Product[]): CartLine[] {
  return cart.flatMap(row => {
    const product = products.find(p => p.id === row.productId);
    const variant = product?.variants.find(v => v.id === row.variantId);
    return product && variant ? [{ ...row, product, variant }] : [];
  });
}
export function cartTotal(cart: CartItem[], products: Product[]): number {
  return resolveCart(cart, products).reduce((total, row) => total + row.variant.price * row.quantity, 0);
}
export function cartTextLines(cart: CartItem[], products: Product[]): string[] {
  return resolveCart(cart, products).flatMap(({ product, variant, quantity }) => [
    `${product.name} — ${variant.label} × ${quantity}: ${new Intl.NumberFormat('ru-RU').format(variant.price * quantity)} ₽`,
    `${variant.unit}, ${variant.rentalDays ? `аренда ${variant.rentalDays} дн.` : 'период аренды уточняется'}`,
    ...(variant.composition.length ? ['Состав на выбранное количество комплектов:', ...variant.composition.map(item => `  ${item.name} — ${item.quantity * quantity} шт.`)] : []),
    '',
  ]);
}
export function localToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
