export const COMPANY_ID = 30;
export const API_URL = 'https://api.ameli-dekor.frents.ru/client-company';
export const CATALOG_URL = 'https://ameli-dekor.frents.ru';

export interface ApiCategory {
  id: number;
  company_id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  children?: ApiCategory[];
  path_photo?: string | null;
  image_preview_path?: string | null;
  visible_manager?: boolean;
  visible_parent?: boolean;
}
export interface ApiImage {
  path_photo?: string | null;
  path_photo_thumbnail?: string | null;
}
export interface ApiDecor {
  id: number;
  company_id: number;
  name: string;
  price: number | null;
  visible_site?: boolean;
  is_active?: boolean;
  categories_site?: { id: number; slug: string }[];
  images?: ApiImage | ApiImage[] | null;
  colors?: { code?: string | null }[];
  key_feature_description?: string | null;
  description?: string | null;
  rental_period_days?: number | null;
  decors_included?: {
    total: number;
    decor_included: { id: number; name: string };
  }[];
  decors_repaint?: {
    id: number;
    is_alternative?: boolean;
    hide_in_catalog?: boolean;
    visible_site?: boolean;
    name: string;
  }[];
}
interface ApiPage {
  total: number;
  page: number;
  pages: number;
  size: number;
  items: ApiDecor[];
}
type Fetcher = typeof fetch;

export function apiEndpoint(
  base: string,
  path: string,
  query: Record<string, string> = {},
) {
  const url = new URL(`${base.replace(/\/$/, '')}${path}`);
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('API requires HTTPS without embedded credentials');
  Object.entries(query).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );
  // Never accept a tenant override from caller parameters.
  url.searchParams.set('company_id', String(COMPANY_ID));
  url.searchParams.set('st', String(COMPANY_ID));
  return url;
}

export async function apiGet<T>(
  base: string,
  path: string,
  query: Record<string, string> = {},
  fetcher: Fetcher = fetch,
): Promise<T> {
  const response = await fetcher(apiEndpoint(base, path, query), {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(30_000),
    // Public catalogue reads only. Do not forward browser cookies or call auth/order APIs.
    credentials: 'omit',
    redirect: 'error',
  });
  if (!response.ok)
    throw new Error(`Catalogue API: HTTP ${response.status} at ${path}`);
  return (await response.json()) as T;
}

export function assertCompany(value: { id: number; name_company: string }) {
  if (
    value.id !== COMPANY_ID ||
    value.name_company.trim().toLocaleLowerCase('ru') !== 'амели декор'
  ) {
    throw new Error('API did not return Амели декор, company 30');
  }
}

/** Reject partial/changing pagination instead of publishing silently missing products. */
export async function readAllDecor(base: string, fetcher: Fetcher = fetch) {
  const items: ApiDecor[] = [];
  let total = -1;
  let pages = 1;
  for (let page = 1; page <= pages; page++) {
    const result = await apiGet<ApiPage>(
      base,
      '/api/v1/decor/',
      { page: String(page), size: '100' },
      fetcher,
    );
    if (
      !Array.isArray(result.items) ||
      !Number.isInteger(result.total) ||
      result.total < 0 ||
      !Number.isInteger(result.pages) ||
      result.pages < 0 ||
      result.pages > 500 ||
      result.page !== page
    )
      throw new Error('Invalid catalogue pagination');
    if (total !== -1 && (result.total !== total || result.pages !== pages))
      throw new Error('Catalogue changed during sync; please retry');
    total = result.total;
    pages = result.pages;
    items.push(...result.items);
  }
  const ids = new Set(items.map((item) => item.id));
  if (ids.size !== items.length || items.length > total)
    throw new Error('Duplicate or invalid catalogue pages');
  if (items.length !== total) {
    // The upstream total can exceed the returned public items. Cross-check every
    // page with a different page size (the API caps it at 150) before accepting it.
    const alternate: ApiDecor[] = [];
    let alternatePages = 1;
    for (let page = 1; page <= alternatePages; page++) {
      const result = await apiGet<ApiPage>(
        base,
        '/api/v1/decor/',
        { page: String(page), size: '150' },
        fetcher,
      );
      if (
        result.page !== page ||
        result.total !== total ||
        !Array.isArray(result.items) ||
        !Number.isInteger(result.pages) ||
        result.pages < 1 ||
        result.pages > 500 ||
        (page > 1 && result.pages !== alternatePages)
      )
        throw new Error('Invalid alternate catalogue pagination');
      alternatePages = result.pages;
      alternate.push(...result.items);
    }
    if (
      alternate.length !== items.length ||
      new Set(alternate.map((item) => item.id)).size !== ids.size ||
      alternate.some((item) => !ids.has(item.id))
    )
      throw new Error('Incomplete catalogue: alternate pagination disagrees');
    console.warn(
      `API total=${total}; public products=${items.length}. All IDs verified using two page sizes.`,
    );
  }
  return items;
}
