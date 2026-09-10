import test from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal, changeQuantity, normalizeCart, MAX_QUANTITY } from '../lib/cart.ts';
import type { Product } from '../data/catalog.ts';
const products = [{id:'ceremony',price:39000},{id:'table',price:18900},{id:'setting',price:1450}] as Product[];
void test('Mixed package quantities produce the expected estimate', () => {
  let cart = changeQuantity([], 'ceremony', 1);
  cart = changeQuantity(cart, 'table', 5);
  cart = changeQuantity(cart, 'setting', 40);
  assert.equal(cartTotal(cart, products), 191500);
});
void test('Decrement to zero removes the item, repeated additions merge', () => {
  let cart = changeQuantity([], 'table', 1);
  cart = changeQuantity(cart, 'table', 1);
  assert.deepEqual(cart, [{productId:'table',quantity:2}]);
  cart = changeQuantity(cart, 'table', -2);
  assert.deepEqual(cart, []);
});
void test('Untrusted storage drops stale IDs and malformed quantities and caps duplicates', () => {
  const rows = [{productId:'gone',quantity:4},{productId:'table',quantity:-2},{productId:'setting',quantity:1.5},{productId:'table',quantity:3},{productId:'table',quantity:500},null];
  assert.deepEqual(normalizeCart(rows, products), [{productId:'table',quantity:MAX_QUANTITY}]);
  assert.deepEqual(normalizeCart({}, products), []);
});
void test('Maximum quantity cannot be exceeded', () => {
  const cart = changeQuantity([{productId:'setting',quantity:MAX_QUANTITY}], 'setting', 1);
  assert.equal(cart[0].quantity, MAX_QUANTITY);
});
