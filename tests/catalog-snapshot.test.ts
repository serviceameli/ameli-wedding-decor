import assert from 'node:assert/strict';
import test from 'node:test';
import snapshot from '../data/generated/catalog.json' with { type: 'json' };
import { catalogProducts } from '../data/catalog.ts';
import { catalogCategories, homeZoneCategories } from '../data/categories.ts';
import { validateCatalogTree } from '../lib/catalog-tree.ts';

void test('Homepage uses the seven admin wedding zones and their public covers', () => {
  assert.deepEqual(homeZoneCategories.map(c => c.id), ['api-category-6876', 'api-category-6877', 'api-category-6878', 'api-category-7565', 'api-category-7411', 'ready-solutions', 'api-category-7412']);
  for (const category of homeZoneCategories) {
    assert.equal(category.parentId, undefined);
    assert.ok(category.label.trim());
    assert.match(category.image, /^https:\/\/(?:cdn\.frents\.ru|storage\.yandexcloud\.net)\//);
  }
});

void test('The published snapshot has a company, timestamp, complete routes and usable variants', () => {
  assert.equal(snapshot.company.id, 30);
  assert.equal(snapshot.company.name, 'Амели декор');
  assert.ok(Number.isFinite(Date.parse(snapshot.updatedAt)));
  assert.ok(catalogProducts.length > 0);
  validateCatalogTree(catalogCategories);
  const categories = new Set(catalogCategories.map((category) => category.id));
  assert.equal(
    new Set(catalogProducts.map((product) => product.id)).size,
    catalogProducts.length,
  );
  for (const product of catalogProducts) {
    assert.equal(product.isDemo, false);
    assert.ok(categories.has(product.category));
    for (const id of product.categoryIds || []) assert.ok(categories.has(id));
    assert.ok(
      product.variants.some(
        (variant) => variant.id === product.defaultVariantId,
      ),
    );
    assert.equal(
      new Set(product.variants.map((variant) => variant.id)).size,
      product.variants.length,
    );
    for (const variant of product.variants) {
      assert.ok(Number.isFinite(variant.price) && variant.price >= 0);
      assert.ok(
        variant.rentalDays === null ||
          (Number.isInteger(variant.rentalDays) && variant.rentalDays > 0),
      );
      assert.match(
        variant.sourceUrl,
        /^https:\/\/ameli-dekor\.frents\.ru\/catalog\//,
      );
    }
  }
});
