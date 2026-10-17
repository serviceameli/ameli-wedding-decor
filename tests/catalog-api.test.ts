import assert from 'node:assert/strict';
import test from 'node:test';
import {
  API_URL,
  apiEndpoint,
  assertCompany,
  readAllDecor,
  type ApiDecor,
  type ApiCategory,
} from '../lib/catalog-api.ts';
import {
  importCategories,
  importProducts,
  publicImage,
} from '../lib/catalog-import.ts';
import { seedCategories } from '../data/category-seed.ts';
import { belongsToBranch, categoryCounts } from '../lib/catalog-tree.ts';

const decor = (id: number, extra: Partial<ApiDecor> = {}): ApiDecor => ({
  id,
  company_id: 30,
  name: `Item ${id}`,
  price: 100,
  categories_site: [{ id: 1965, slug: 'tarelki' }],
  ...extra,
});
const category: ApiCategory = {
  id: 1965,
  company_id: 30,
  name: 'Тарелки',
  slug: 'tarelki',
};
const fakeFetch =
  (respond: (url: URL) => unknown): typeof fetch =>
  async (input) =>
    new Response(
      JSON.stringify(
        respond(new URL(input instanceof Request ? input.url : input)),
      ),
      { headers: { 'content-type': 'application/json' } },
    );

void test('Company is fixed in URL and checked in API responses', () => {
  const url = apiEndpoint(API_URL, '/api/v1/decor/', {
    company_id: '99',
    st: '99',
  });
  assert.equal(url.searchParams.get('company_id'), '30');
  assert.equal(url.searchParams.get('st'), '30');
  assert.throws(() => assertCompany({ id: 31, name_company: 'Амели декор' }));
  assert.throws(() =>
    assertCompany({ id: 30, name_company: 'Another company' }),
  );
  assert.throws(() => apiEndpoint('http://localhost', '/api/v1/decor/'));
});

void test('Importer preserves old category URL and accepts the API URL as an alias', () => {
  const categories = importCategories([category], seedCategories);
  const plates = categories.find((item) => item.id === 'plates')!;
  assert.equal(plates.slug, 'plates');
  assert.deepEqual(plates.aliases, ['tarelki']);
  assert.throws(() =>
    importCategories([{ ...category, company_id: 31 }], seedCategories),
  );
});

void test('Admin covers, labels and hierarchy update without breaking stable category links', () => {
  const cover = 'https://cdn.frents.ru/ameli-dekor/01-ceremony.webp';
  const categories = importCategories([
    {
      id: 6876, company_id: 30, name: 'Зона церемонии', slug: 'zona-tseremonii-ada', path_photo: cover,
      children: [{ id: 6589, company_id: 30, name: 'Зоны церемонии', slug: 'zony-tseremonii-fow', path_photo: cover }],
    },
    { id: 1989, company_id: 30, name: 'Фотозона', slug: 'gotovye-reshenija', path_photo: cover },
    { id: 2010, company_id: 30, name: 'Навигация', slug: 'navigatsiya', path_photo: 'https://untrusted.example/cover.jpg' },
  ], seedCategories);
  const ceremony = categories.find(c => c.id === 'ceremony')!;
  assert.equal(ceremony.parentId, 'api-category-6876');
  assert.equal(ceremony.slug, 'ceremony');
  assert.equal(ceremony.image, cover);
  const photozone = categories.find(c => c.id === 'ready-solutions')!;
  assert.equal(photozone.label, 'Фотозона');
  assert.equal(photozone.description, '');
  assert.equal(photozone.image, cover);
  assert.equal(photozone.slug, 'ready-solutions');
  const navigation = categories.find(c => c.id === 'api-category-2010')!;
  assert.equal(navigation.parentId, undefined);
  assert.equal(navigation.image, 'placeholder.svg');
  const counts = categoryCounts([{ category: 'ceremony' }], categories);
  assert.equal(counts.get('api-category-6876'), 1);
  assert.equal(counts.get('ready-solutions'), undefined);
});

void test('Only verified prices, per-variant compositions and safe public fields are exported', () => {
  const base = decor(1, {
    decors_repaint: [
      {
        id: 2,
        name: 'Second',
        is_alternative: true,
        hide_in_catalog: true,
        visible_site: false,
      },
    ],
  });
  const option = {
    ...decor(2, {
      price: 250,
      decors_included: [{ total: 6, decor_included: { id: 3, name: 'Plate' } }],
    }),
    accounting_price: 19,
    booking: [{ customer: 'private' }],
    rental_period_days: 3,
  };
  const [product] = importProducts(
    [base],
    new Map([[2, option]]),
    seedCategories,
  );
  assert.deepEqual(
    product.variants.map((item) => item.price),
    [100, 250],
  );
  assert.equal(product.variants[0].rentalDays, null);
  assert.equal(product.variants[1].rentalDays, 3);
  assert.equal(product.variants[1].composition[0].quantity, 6);
  assert.equal(product.isDemo, false);
  assert.doesNotMatch(
    JSON.stringify(product),
    /accounting_price|booking|private/,
  );
  assert.throws(() =>
    importProducts([decor(3, { company_id: 31 })], new Map(), seedCategories),
  );
  assert.throws(() =>
    importProducts([decor(3, { price: null })], new Map(), seedCategories),
  );
  assert.throws(() => importProducts([base], new Map(), seedCategories));
  assert.equal(publicImage('javascript:alert(1)'), 'placeholder.svg');
  assert.equal(
    publicImage('https://untrusted.example/image.jpg'),
    'placeholder.svg',
  );
});

void test('Multi-category items appear in each category without double-counting their parent', () => {
  const product = { category: 'plates', categoryIds: ['plates', 'glassware'] };
  assert.ok(belongsToBranch(product, new Set(['glassware'])));
  const counts = categoryCounts([product], seedCategories);
  assert.equal(counts.get('plates'), 1);
  assert.equal(counts.get('glassware'), 1);
  assert.equal(counts.get('dishes'), 1);
});

void test('Unassigned records and removed category links stay out of the public catalog', () => {
  const products = importProducts([decor(1), decor(2, { categories_site: [] }), decor(3, { categories_site: [{ id: 999999, slug: 'removed' }] })], new Map(), seedCategories);
  assert.deepEqual(products.map(product => product.id), ['ameli-1']);
  const [mixed] = importProducts([decor(4, { categories_site: [{ id: 1965, slug: 'tarelki' }, { id: 999999, slug: 'removed' }] })], new Map(), seedCategories);
  assert.deepEqual(mixed.categoryIds, ['plates']);
});

void test('Pagination loads every page and rejects duplicate or changing results', async () => {
  const fetcher = fakeFetch((url) => ({
    total: 2,
    page: Number(url.searchParams.get('page')),
    pages: 2,
    size: 1,
    items: [decor(Number(url.searchParams.get('page')))],
  }));
  assert.deepEqual(
    (await readAllDecor(API_URL, fetcher)).map((item) => item.id),
    [1, 2],
  );
  await assert.rejects(
    readAllDecor(
      API_URL,
      fakeFetch((url) => ({
        total: 2,
        page: Number(url.searchParams.get('page')),
        pages: 2,
        size: 1,
        items: [decor(1)],
      })),
    ),
    /Duplicate/,
  );
  await assert.rejects(
    readAllDecor(
      API_URL,
      fakeFetch((url) => ({
        total: Number(url.searchParams.get('page')),
        page: Number(url.searchParams.get('page')),
        pages: 2,
        size: 1,
        items: [decor(1)],
      })),
    ),
    /changed/,
  );
});

void test('An overstated upstream total is accepted only when a second complete pagination agrees', async () => {
  const fetcher = fakeFetch(() => ({
    total: 3,
    page: 1,
    pages: 1,
    size: 100,
    items: [decor(1), decor(2)],
  }));
  assert.equal((await readAllDecor(API_URL, fetcher)).length, 2);
  await assert.rejects(
    readAllDecor(
      API_URL,
      fakeFetch((url) => ({
        total: 3,
        page: 1,
        pages: 1,
        size: 100,
        items:
          url.searchParams.get('size') === '100'
            ? [decor(1)]
            : [decor(1), decor(2)],
      })),
    ),
    /Incomplete/,
  );
});
