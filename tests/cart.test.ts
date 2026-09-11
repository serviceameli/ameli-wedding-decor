import test from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal, changeQuantity, normalizeCart, cartTextLines, MAX_QUANTITY } from '../lib/cart.ts';
import { getVariant, normalizeVariantChoices } from '../lib/variants.ts';
import { demoProducts } from '../data/fixtures.ts';
const table = demoProducts.find(p => p.id === 'demo-table-01')!;
const base = table.variants.find(v => v.label === 'Базовый')!;
const premium = table.variants.find(v => v.label === 'Премиум')!;

void test('Different packages of one solution stay separate and use their own prices', () => {
  let cart = changeQuantity([], table.id, base.id, 1);
  cart = changeQuantity(cart, table.id, premium.id, 2);
  assert.equal(cart.length, 2);
  assert.equal(cartTotal(cart, demoProducts), 13780 + 21100 * 2);
  cart = changeQuantity(cart, table.id, base.id, 1);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cart[1].quantity, 2);
});
void test('Removing one package leaves the other package intact', () => {
  let cart = changeQuantity([], table.id, base.id, 1);
  cart = changeQuantity(cart, table.id, premium.id, 1);
  cart = changeQuantity(cart, table.id, base.id, -1);
  assert.deepEqual(cart, [{ productId: table.id, variantId: premium.id, quantity: 1 }]);
});
void test('Legacy carts migrate to the default package; explicit stale packages are dropped', () => {
  const rows = [
    { productId: table.id, quantity: 2 },
    { productId: table.id, variantId: base.id, quantity: 1 },
    { productId: table.id, variantId: premium.id, quantity: 4 },
    { productId: table.id, variantId: 'deleted-package', quantity: 1 },
    { productId: 'removed-product', variantId: base.id, quantity: 1 },
    { productId: table.id, variantId: premium.id, quantity: 1.5 },
    { productId: table.id, variantId: premium.id, quantity: -1 },
    null,
  ];
  assert.deepEqual(normalizeCart(rows, demoProducts), [
    { productId: table.id, variantId: base.id, quantity: 3 },
    { productId: table.id, variantId: premium.id, quantity: 4 },
  ]);
  assert.deepEqual(normalizeCart({}, demoProducts), []);
});
void test('Limits apply per package and a malformed delta cannot corrupt a row', () => {
  let cart = changeQuantity([], table.id, base.id, MAX_QUANTITY);
  cart = changeQuantity(cart, table.id, base.id, 1);
  cart = changeQuantity(cart, table.id, premium.id, 1);
  assert.equal(cart[0].quantity, MAX_QUANTITY);
  assert.equal(cart[1].quantity, 1);
  assert.deepEqual(changeQuantity(cart, table.id, base.id, NaN), cart);
  assert.equal(normalizeCart([...cart, ...cart], demoProducts)[0].quantity, MAX_QUANTITY);
});
void test('Checkout export retains package label, exact contents and multiplied component quantities', () => {
  const cart = changeQuantity([], table.id, premium.id, 2);
  const text = cartTextLines(cart, demoProducts).join('\n');
  assert.match(text, /Премиум × 2/);
  assert.match(text, /42\s200 ₽/);
  assert.match(text, /Стул "Вашингтон" золотой, жемчужный бархат — 16 шт\./);
  assert.match(text, /Набор приборов "Сафо" золотых 2 шт — 16 шт\./);
});
void test('Saved package choices are validated against their own product', () => {
  assert.deepEqual(normalizeVariantChoices({ [table.id]: premium.id, missing: premium.id }, demoProducts), { [table.id]: premium.id });
  assert.deepEqual(normalizeVariantChoices({ [table.id]: '6294' }, demoProducts), {});
  assert.equal(getVariant(table, 'unknown').id, base.id);
  assert.equal(getVariant(table, premium.id).composition.length, 8);
  assert.equal(getVariant(table, base.id).composition.length, 3);
});
void test('Every source-backed fixture has unique packages, valid compositions and a default', () => {
  for (const product of demoProducts) {
    assert(product.variants.some(v => v.id === product.defaultVariantId), product.id);
    assert.equal(new Set(product.variants.map(v => v.id)).size, product.variants.length);
    for (const variant of product.variants) {
      assert(Number.isFinite(variant.price) && variant.price > 0, variant.id);
      assert(variant.composition.length > 0, variant.id);
      assert(variant.composition.every(item => item.name && Number.isInteger(item.quantity) && item.quantity > 0), variant.id);
    }
    if (product.category.includes('tables')) assert.deepEqual(product.variants.map(v => v.label), ['Базовый', 'Оптимальный', 'Премиум']);
  }
});

void test('Individual items and ready solutions share a cart without empty composition sections', () => {
  const chair = { ...table, id: 'test-chair', kind: 'item' as const, category: 'chairs', name: 'Тестовый стул', defaultVariantId: 'test-standard', variants: [{ ...base, id: 'test-standard', price: 500, unit: 'за 1 стул', composition: [] }] };
  const inventory = [...demoProducts, chair];
  let cart = changeQuantity([], table.id, base.id, 1);
  cart = changeQuantity(cart, chair.id, 'test-standard', 8);
  assert.deepEqual(normalizeCart(cart, inventory), cart);
  assert.equal(cartTotal(cart, inventory), 17780);
  const itemText = cartTextLines(cart.filter(row => row.productId === chair.id), inventory).join('\n');
  assert.match(itemText, /4\s000 ₽/); assert.match(itemText, /за 1 стул/); assert.doesNotMatch(itemText, /Состав/);
});
