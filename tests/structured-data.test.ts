import assert from 'node:assert/strict';
import test from 'node:test';
import { catalogProducts } from '../data/catalog.ts';
import { catalogCategories } from '../data/categories.ts';
import { FAQ } from '../data/site-content.ts';
import { categoryTrail, belongsToBranch, categoryDescendants } from '../lib/catalog-tree.ts';
import { buildStructuredData, schemaPages, schemaPageForPath, serializeStructuredData, type SchemaGraph } from '../lib/structured-data.ts';

const pages = schemaPages(catalogCategories, catalogProducts);
const build = (path: string, options = {}) => buildStructuredData(pages.find(page => page.path === path)!, catalogCategories, catalogProducts, options);
type PropertyView = { name: string; value: string | number };
type ListView = { name: string; position: number; item: string };
type NodeView = {
  '@id': string; name: string; url: string; sku: string; image: string;
  isPartOf: { '@id': string };
  offers: { price: number; priceCurrency: string; businessFunction: string; url: string; priceSpecification: { referenceQuantity: { unitText: string } }; additionalProperty?: PropertyView; [key: string]: unknown };
  additionalProperty: PropertyView[]; itemListElement: ListView[]; numberOfItems: number;
  mainEntity: { name: string; acceptedAnswer: { text: string } }[];
  [key: string]: unknown;
};
const node = (graph: SchemaGraph, type: string) => graph['@graph'].find(item => item['@type'] === type) as NodeView | undefined;

void test('Every public route and alias has one linked page, organization and website', () => {
  assert.equal(new Set(pages.map(page => page.path)).size, pages.length);
  for (const page of pages) {
    const graph = build(page.path);
    assert.deepEqual(JSON.parse(serializeStructuredData(graph)), graph);
    const ids = graph['@graph'].map(item => item['@id']);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(node(graph, 'Organization'));
    assert.ok(node(graph, 'WebSite'));
    assert.equal(graph['@graph'][2].name, page.title);
    assert.ok((graph['@graph'][2].isPartOf as { '@id': string })['@id'] === node(graph, 'WebSite')!['@id']);
    for (const id of ids) assert.match(String(id), /^https:\/\/serviceameli\.github\.io\/ameli-wedding-decor\//);
    if (page.path) {
      const list = node(graph, 'BreadcrumbList')!.itemListElement;
      assert.deepEqual(list.map((crumb: ListView) => crumb.position), list.map((_: ListView, index: number) => index + 1));
      assert.equal(list.at(-1)!.item, graph['@graph'][2].url);
    }
  }
  assert.equal(schemaPageForPath('solution/does-not-exist/', catalogCategories, catalogProducts), undefined);
});

void test('Every actual variant preserves its own price, image, composition, unit and rental period', () => {
  for (const product of catalogProducts) for (const variant of product.variants) {
    const graph = build(`solution/${product.id}`, { selectedVariantId: variant.id });
    const item = node(graph, 'Product')!;
    assert.equal(item.sku, variant.id);
    assert.equal(item.offers.price, variant.price);
    assert.equal(item.offers.priceCurrency, 'RUB');
    assert.equal(item.offers.businessFunction, 'http://purl.org/goodrelations/v1#LeaseOut');
    assert.equal(new URL(item.url).searchParams.get('variant'), variant.id);
    assert.equal(item.offers.url, item.url);
    if (variant.image.startsWith('https://')) assert.equal(item.image, variant.image);
    assert.deepEqual(item.additionalProperty.slice(1).map((p: PropertyView) => [p.name, p.value]), variant.composition.map(p => [p.name, p.quantity]));
    assert.equal(item.offers.priceSpecification.referenceQuantity.unitText, variant.unit.replace(/^за\s+/, ''));
    assert.equal(item.offers.additionalProperty?.value ?? null, variant.rentalDays);
    for (const forbidden of ['availability', 'priceValidUntil', 'shippingDetails', 'hasMerchantReturnPolicy']) assert.equal(item.offers[forbidden], undefined);
    for (const forbidden of ['aggregateRating', 'review', 'gtin', 'brand', 'mpn']) assert.equal(item[forbidden], undefined);
  }
});

void test('Category lists use admin descendants, aliases reuse stable IDs, empty categories have no fake products', () => {
  for (const category of catalogCategories) {
    const graph = build(`catalog/${category.slug}`);
    const expected = catalogProducts.filter(p => belongsToBranch(p, categoryDescendants(category.id, catalogCategories))).slice(0, 24);
    const list = node(graph, 'ItemList');
    assert.deepEqual(list?.itemListElement.map((item: ListView) => item.name) || [], expected.map(p => p.name));
    const trail = node(graph, 'BreadcrumbList')!.itemListElement.slice(2);
    assert.deepEqual(trail.map((item: ListView) => item.name), categoryTrail(category.id, catalogCategories).map(c => c.label));
    for (const alias of category.aliases || []) {
      assert.equal(build(`catalog/${alias}`)['@graph'][2]['@id'], graph['@graph'][2]['@id']);
    }
  }
  const custom = build('catalog', { listedProducts: catalogProducts.slice(24, 48) });
  assert.deepEqual(node(custom, 'ItemList')!.itemListElement.map((p: ListView) => p.name), catalogProducts.slice(24, 48).map(p => p.name));
  assert.equal(node(build('catalog', { listedProducts: [] }), 'ItemList'), undefined);
});

void test('FAQ uses exactly visible answers and information pages keep their correct types', () => {
  const faq = node(build('faq'), 'FAQPage')!;
  assert.deepEqual(faq.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => [q.name, q.acceptedAnswer.text]), FAQ);
  assert.ok(node(build('about'), 'AboutPage'));
  assert.ok(node(build('contacts'), 'ContactPage'));
  assert.ok(node(build('portfolio'), 'CollectionPage'));
  assert.equal(node(build('portfolio'), 'ItemList')!.numberOfItems, 3);
  assert.ok(node(build('how-it-works'), 'WebPage'));
  assert.equal(node(build('about'), 'LocalBusiness'), undefined);
});

void test('Catalog strings cannot end a JSON-LD script or inject markup', () => {
  const hostile: SchemaGraph = { '@context': 'https://schema.org', '@graph': [{ name: '</script><script>alert("x")</script>&\u2028\u2029$&' }] };
  const text = serializeStructuredData(hostile);
  assert.ok(!/[<>&\u2028\u2029]/.test(text));
  assert.deepEqual(JSON.parse(text), hostile);
});
