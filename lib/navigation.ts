import { catalogCategories } from '../data/categories.ts';

export function siteBase(): string {
  if (import.meta.env.DEV) return '/';
  const prefix = document.querySelector<HTMLMetaElement>('meta[name="app-root"]')?.content || './';
  return new URL(prefix, window.location.href).pathname;
}
export const siteHref = (path = '') => `${siteBase()}${path.replace(/^\//, '')}`;
export const categoryHref = (slug: string) => siteHref(`catalog/${slug}/`);
export const productHref = (id: string, variantId?: string) => siteHref(`solution/${id}/${variantId ? `?variant=${encodeURIComponent(variantId)}` : ""}`);
export function resolveRoute() {
  const path = decodeURI(window.location.pathname).slice(siteBase().length).replace(/^\/+|\/+$/g, '').replace(/\/index\.html$/, '');
  if (!path || path === 'index.html') return { kind: 'home' as const };
  if (path === 'catalog') return { kind: 'catalog' as const };
  const category = catalogCategories.find(c => `catalog/${c.slug}` === path);
  if (category) return { kind: 'category' as const, category };
  if (path.startsWith('solution/')) return { kind: 'product' as const, productId: path.slice('solution/'.length) };
  return { kind: 'missing' as const };
}
