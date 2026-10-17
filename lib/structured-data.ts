import type { Product } from '../data/types.ts';
import type { CatalogCategory } from '../data/categories.ts';
import { categoryTrail, categoryDescendants, belongsToBranch } from './catalog-tree.ts';
import { getVariant } from './variants.ts';
import { FAQ, informationPages, portfolioWorks } from '../data/site-content.ts';

// Existing public address, verified in README. Local previews stay noindex.
export const SITE_URL = 'https://serviceameli.github.io/ameli-wedding-decor/';
export const STRUCTURED_DATA_ID = 'ameli-structured-data';
export type SchemaNode = { [key: string]: unknown };
export type SchemaGraph = { '@context': string; '@graph': SchemaNode[] };
export type SchemaPage = {
  path: string;
  title: string;
  kind: 'home' | 'catalog' | 'category' | 'product' | 'information';
  categoryId?: string;
  productId?: string;
};

export function schemaPages(categories: CatalogCategory[], products: Product[]): SchemaPage[] {
  return [
    { path: '', title: 'Амели Декор — готовые решения для вашей свадьбы', kind: 'home' },
    ...Object.entries(informationPages).map(([path, info]) => ({ path, title: `${info.label} | Амели декор`, kind: 'information' as const })),
    { path: 'catalog', title: 'Каталог для вашей свадьбы | Амели Декор', kind: 'catalog' },
    ...categories.flatMap(category => [category.slug, ...(category.aliases || [])].map(slug => ({ path: `catalog/${slug}`, title: `${category.label} | Амели Декор`, kind: 'category' as const, categoryId: category.id }))),
    ...products.map(product => ({ path: `solution/${product.id}`, title: `${product.name} | Амели Декор`, kind: 'product' as const, productId: product.id })),
  ];
}

export function schemaPageForPath(path: string, categories: CatalogCategory[], products: Product[]) {
  const normalized = path.replace(/^\/+|\/+$/g, '').replace(/(?:^|\/)index\.html$/, '');
  return schemaPages(categories, products).find(page => page.path === normalized);
}

/** Escape HTML-sensitive characters before embedding catalog text in a script. */
export function serializeStructuredData(value: SchemaGraph) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

export function buildStructuredData(page: SchemaPage, categories: CatalogCategory[], products: Product[], options: {
  siteUrl?: string;
  selectedVariantId?: string;
  listedProducts?: Product[];
} = {}): SchemaGraph {
  const base = options.siteUrl || SITE_URL;
  const url = (path = '') => new URL(path, base).href;
  const image = (path: string) => /^https?:\/\//.test(path) ? path : url(`images/${path}`);
  const ref = (id: string) => ({ '@id': id });
  const category = categories.find(item => item.id === page.categoryId);
  const product = products.find(item => item.id === page.productId);
  // Aliases represent the same category entity and keep the stable category URL.
  const pageUrl = url(category ? `catalog/${category.slug}/` : page.path ? `${page.path}/` : '');
  const pageId = `${pageUrl}#webpage`;
  const orgId = url('#organization');
  const siteId = url('#website');
  const info = page.kind === 'information' ? informationPages[page.path] : undefined;
  const type = page.kind === 'product' ? 'ItemPage'
    : page.kind === 'catalog' || page.kind === 'category' || page.path === 'portfolio' ? 'CollectionPage'
    : page.path === 'about' ? 'AboutPage'
    : page.path === 'contacts' ? 'ContactPage'
    : page.path === 'faq' ? 'FAQPage' : 'WebPage';
  const webpage: SchemaNode = {
    '@type': type, '@id': pageId, url: pageUrl, name: page.title,
    inLanguage: 'ru-RU', isPartOf: ref(siteId), about: ref(orgId),
    ...(info ? { description: info.intro } : {}),
    ...(category?.description ? { description: category.description } : {}),
  };
  const graph: SchemaNode[] = [
    { '@type': 'Organization', '@id': orgId, name: 'Амели декор', url: url(), telephone: '+79850843855', sameAs: ['https://t.me/amelirental', 'https://catalog.ameli-rental.ru'] },
    { '@type': 'WebSite', '@id': siteId, url: url(), name: 'Амели декор', inLanguage: 'ru-RU', publisher: ref(orgId) },
    webpage,
  ];
  if (page.path === 'contacts') graph[0].email = 'ameli.rental@gmail.com';

  const crumbs = [{ name: 'Главная', item: url() }];
  if (['catalog', 'category', 'product'].includes(page.kind)) crumbs.push({ name: 'Каталог', item: url('catalog/') });
  if (category || product) {
    for (const item of categoryTrail(category?.id || product!.category, categories)) crumbs.push({ name: item.label, item: url(`catalog/${item.slug}/`) });
  }
  if (product) crumbs.push({ name: product.name, item: pageUrl });
  if (info) crumbs.push({ name: info.label, item: pageUrl });
  if (crumbs.length > 1) {
    const id = `${pageUrl}#breadcrumb`;
    webpage.breadcrumb = ref(id);
    graph.push({ '@type': 'BreadcrumbList', '@id': id, itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })) });
  }

  if (product) {
    // One exact selected variant, rather than one price shared by different packages.
    const variant = getVariant(product, options.selectedVariantId);
    const variantUrl = `${pageUrl}?variant=${encodeURIComponent(variant.id)}`;
    const id = `${variantUrl}#product`;
    const properties: SchemaNode[] = [
      { '@type': 'PropertyValue', name: 'Вариант', value: variant.label },
      ...variant.composition.map(item => ({ '@type': 'PropertyValue', name: item.name, value: item.quantity, unitText: 'шт.' })),
    ];
    const description = variant.description || product.description;
    webpage.mainEntity = ref(id);
    graph.push({
      '@type': 'Product', '@id': id, url: variantUrl,
      name: product.kind === 'item' || variant.label === product.name ? variant.label : `${product.name}: ${variant.label}`,
      sku: variant.id,
      ...(description ? { description } : {}),
      ...(variant.image && variant.image !== 'placeholder.svg' ? { image: image(variant.image) } : {}),
      ...(categories.find(item => item.id === product.category) ? { category: categories.find(item => item.id === product.category)!.label } : {}),
      additionalProperty: properties,
      offers: {
        '@type': 'Offer', '@id': `${variantUrl}#offer`, url: variantUrl,
        price: variant.price, priceCurrency: 'RUB', seller: ref(orgId),
        businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
        description: `${variant.unit}; ${variant.rentalDays ? `аренда ${variant.rentalDays} дн` : 'период аренды уточняется'}. Наличие на дату подтверждает команда.`,
        priceSpecification: { '@type': 'UnitPriceSpecification', price: variant.price, priceCurrency: 'RUB', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: variant.unit.replace(/^за\s+/, '') } },
        ...(variant.rentalDays ? { additionalProperty: { '@type': 'PropertyValue', name: 'Период аренды', value: variant.rentalDays, unitText: 'дн.' } } : {}),
        // The snapshot provides no confirmed stock, review, GTIN or price expiry.
      },
    });
  }
  if (page.kind === 'catalog' || category) {
    const branch = category ? categoryDescendants(category.id, categories) : null;
    const listed = options.listedProducts ?? products.filter(item => !branch || belongsToBranch(item, branch)).slice(0, 24);
    if (listed.length) {
      const id = `${pageUrl}#items`;
      webpage.mainEntity = ref(id);
      graph.push({ '@type': 'ItemList', '@id': id, numberOfItems: listed.length, itemListElement: listed.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: url(`solution/${item.id}/`) })) });
    }
  }
  if (page.path === 'faq') webpage.mainEntity = FAQ.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }));
  if (page.path === 'about' || page.path === 'contacts') webpage.mainEntity = ref(orgId);
  if (page.path === 'portfolio') {
    const id = `${pageUrl}#works`;
    webpage.mainEntity = ref(id);
    graph.push({ '@type': 'ItemList', '@id': id, numberOfItems: portfolioWorks.length, itemListElement: portfolioWorks.map((work, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'ImageObject', name: work.title, description: work.description, contentUrl: image(work.image), url: work.sourceUrl } })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
