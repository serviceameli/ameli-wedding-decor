import type { Product } from '../data/catalog';
export type CartItem = { productId: string; quantity: number };
export const MAX_QUANTITY = 200;
export function normalizeCart(value: unknown, products: Product[]): CartItem[] {
  if (!Array.isArray(value)) return [];
  const validIds = new Set(products.map(p => p.id));
  const merged = new Map<string, number>();
  for (const row of value) {
    if (!row || typeof row !== 'object' || !validIds.has(row.productId) || !Number.isInteger(row.quantity) || row.quantity < 1) continue;
    merged.set(row.productId, Math.min(MAX_QUANTITY, (merged.get(row.productId) ?? 0) + row.quantity));
  }
  return Array.from(merged, ([productId, quantity]) => ({ productId, quantity }));
}
export function changeQuantity(cart: CartItem[], productId: string, delta: number): CartItem[] {
  const current = cart.find(row => row.productId === productId)?.quantity ?? 0;
  const quantity = Math.max(0, Math.min(MAX_QUANTITY, current + delta));
  if (!quantity) return cart.filter(row => row.productId !== productId);
  if (!current) return [...cart, { productId, quantity }];
  return cart.map(row => row.productId === productId ? { ...row, quantity } : row);
}
export function cartTotal(cart: CartItem[], products: Product[]): number {
  return cart.reduce((total, row) => total + (products.find(p => p.id === row.productId)?.price ?? 0) * row.quantity, 0);
}
export function localToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
