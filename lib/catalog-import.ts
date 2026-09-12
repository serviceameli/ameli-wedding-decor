import type { CatalogCategory } from '../data/category-seed.ts';
import type { Product, ProductVariant } from '../data/types.ts';
import {
  CATALOG_URL,
  COMPANY_ID,
  type ApiCategory,
  type ApiDecor,
} from './catalog-api.ts';
import { validateCatalogTree } from './catalog-tree.ts';

// Explicit category correspondences keep the existing wedding storefront URLs working.
const categoryIds: Record<number, string> = {
  1964: 'dishes',
  1965: 'plates',
  1966: 'glassware',
  1967: 'cutlery',
  1969: 'textiles',
  1974: 'napkins',
  6583: 'chairs',
  6596: 'poufs',
  6592: 'furniture',
  6593: 'banquet-tables',
  6622: 'side-tables',
  1989: 'ready-solutions',
  6589: 'ceremony',
  6587: 'round-tables',
  6629: 'rectangular-tables',
  6630: 'snake-tables',
  6594: 'settings',
  6591: 'flowers',
};
export const categoryId = (id: number) =>
  categoryIds[id] || `api-category-${id}`;
const categoryParents: Record<number, string> = {
  6603: 'tablecloths',
  6602: 'tablecloths',
  1976: 'decor',
  1983: 'decor',
  1991: 'decor',
  6609: 'decor',
  2010: 'decor',
  6585: 'decor',
};
const textOnly = (text: string | null | undefined) =>
  (text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
export function publicImage(value: string | null | undefined): string {
  if (!value) return 'placeholder.svg';
  try {
    const url = new URL(value);
    if (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      ['cdn.frents.ru', 'storage.yandexcloud.net'].includes(url.hostname)
    )
      return url.href;
  } catch {
    /* Missing or unsupported images use a neutral placeholder. */
  }
  return 'placeholder.svg';
}
const decorImage = (decor: ApiDecor) => {
  const image = Array.isArray(decor.images) ? decor.images[0] : decor.images;
  return publicImage(image?.path_photo || image?.path_photo_thumbnail);
};

export function importCategories(raw: ApiCategory[], seeds: CatalogCategory[]) {
  const categories = seeds.map((category) => ({ ...category }));
  const visit = (rows: ApiCategory[], parent?: string) => {
    for (const row of rows) {
      if (row.company_id !== COMPANY_ID)
        throw new Error('Unexpected company in categories');
      if (row.visible_manager || row.visible_parent === false) continue;
      if (!Number.isInteger(row.id) || !row.name?.trim())
        throw new Error('Invalid category');
      const id = categoryId(row.id);
      const existing = categories.find((category) => category.id === id);
      const sourceUrl = `${CATALOG_URL}/catalog/${row.slug}`;
      if (existing) {
        existing.sourceUrl = sourceUrl;
        existing.aliases = row.slug === existing.slug ? [] : [row.slug];
      } else {
        categories.push({
          id,
          slug: row.slug,
          label: row.name.trim(),
          shortLabel: row.name.trim(),
          image: publicImage(row.path_photo || row.image_preview_path),
          description: '',
          sourceUrl,
          ...(categoryParents[row.id] || parent
            ? { parentId: categoryParents[row.id] || parent }
            : {}),
        });
      }
      visit(row.children || [], id);
    }
  };
  visit(raw);
  validateCatalogTree(categories);
  return categories;
}

/** Only explicit public fields enter the downloadable catalogue; never serialize API objects. */
export function importProducts(
  rows: ApiDecor[],
  details: Map<number, ApiDecor>,
  categories: CatalogCategory[],
): Product[] {
  const known = new Set(categories.map((category) => category.id));
  const all = new Map([
    ...rows.map((row) => [row.id, row] as const),
    ...details,
  ]);
  const source = (row: ApiDecor, slug: string) =>
    `${CATALOG_URL}/catalog/${slug}/${row.id}`;
  const asVariant = (row: ApiDecor, slug: string): ProductVariant => {
    if (
      row.company_id !== COMPANY_ID ||
      !Number.isInteger(row.id) ||
      !row.name?.trim() ||
      typeof row.price !== 'number' ||
      !Number.isFinite(row.price) ||
      row.price < 0
    )
      throw new Error('Invalid product or company in catalogue');
    const composition = (row.decors_included || []).map((part) => {
      if (
        !Number.isInteger(part.total) ||
        part.total <= 0 ||
        !Number.isInteger(part.decor_included.id) ||
        !part.decor_included.name?.trim()
      )
        throw new Error('Invalid composition');
      const included = all.get(part.decor_included.id);
      return {
        id: String(part.decor_included.id),
        name: part.decor_included.name.trim(),
        quantity: part.total,
        ...(included ? { image: decorImage(included) } : {}),
      };
    });
    return {
      id: String(row.id),
      label: row.name.trim(),
      price: row.price,
      unit: composition.length ? 'за комплект' : 'за предмет',
      rentalDays:
        Number.isInteger(row.rental_period_days) && row.rental_period_days! > 0
          ? row.rental_period_days!
          : null,
      image: decorImage(row),
      description: textOnly(row.description || row.key_feature_description),
      composition,
      sourceUrl: source(row, slug),
    };
  };
  return rows
    .filter((row) => row.visible_site !== false && row.is_active !== false)
    .map((row) => {
      const ids = [
        ...new Set(
          (row.categories_site || [])
            .map((category) => categoryId(category.id))
            .filter((id) => known.has(id)),
        ),
      ];
      if (!ids.length)
        throw new Error(`No public category for product ${row.id}`);
      const category = categories.find((category) => category.id === ids[0])!;
      const slug = new URL(category.sourceUrl).pathname
        .split('/')
        .filter(Boolean)
        .pop()!;
      const own = asVariant(details.get(row.id) || row, slug);
      const variants = [own];
      for (const link of row.decors_repaint || []) {
        // visible_site=false hides an alternative from the grid, not from the
        // public variant picker (verified against the source storefront).
        if (
          !link.is_alternative ||
          !link.hide_in_catalog ||
          variants.some((variant) => variant.id === String(link.id))
        )
          continue;
        const alternative = all.get(link.id);
        if (!alternative) throw new Error(`Missing linked variant ${link.id}`);
        if (alternative.is_active !== false)
          variants.push(asVariant(alternative, slug));
      }
      variants.sort((a, b) => a.price - b.price);
      // Shorten repeated text for display only; membership always comes from API links.
      const words = own.label.split(' ');
      const common: string[] = [];
      for (let index = 0; index < words.length; index++) {
        if (
          variants.length < 2 ||
          !variants.every(
            (variant) => variant.label.split(' ')[index] === words[index],
          )
        )
          break;
        common.push(words[index]);
      }
      const prefix = common.join(' ');
      const groupName =
        prefix.length > 10 &&
        variants.every((variant) => variant.label.length > prefix.length)
          ? prefix
          : '';
      if (groupName)
        for (const variant of variants)
          variant.label = variant.label.slice(groupName.length).trim();
      const isSolution =
        ids.some((id) =>
          [
            'ceremony',
            'round-tables',
            'rectangular-tables',
            'snake-tables',
            'settings',
            'flowers',
          ].includes(id),
        ) && own.composition.length > 0;
      return {
        id: `ameli-${row.id}`,
        name: groupName || row.name.trim(),
        subtitle: '',
        category: ids[0],
        categoryIds: ids,
        kind: isSolution ? 'solution' : 'item',
        image: own.image,
        palette: (row.colors || [])
          .map((color) => color.code || '')
          .filter((color) => /^#[0-9a-f]{6}$/i.test(color)),
        description: own.description,
        defaultVariantId: own.id,
        variants,
        sourceUrl: own.sourceUrl,
        isDemo: false,
      };
    });
}
