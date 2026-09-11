import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogCategories, type CatalogCategory } from '../data/categories.ts';
import { demoProducts } from '../data/fixtures.ts';
import { categoryChildren, categoryCounts, categoryDescendants, categoryTrail, validateCatalogTree } from '../lib/catalog-tree.ts';
const sample = (id: string, parentId?: string): CatalogCategory => ({id, slug:id, label:id, shortLabel:id, image:'', description:'', sourceUrl:'', parentId});

void test('Adding another nesting level automatically exposes products to every ancestor', () => {
  const nodes = [sample('furniture'),sample('chairs','furniture'),sample('velvet','chairs'),sample('barstools','furniture'),sample('textiles')];
  const products = [{category:'velvet'}, {category:'velvet'}, {category:'barstools'}, {category:'textiles'}];
  assert.deepEqual(categoryChildren('chairs',nodes).map(n=>n.id),['velvet']);
  const ids = categoryDescendants('furniture',nodes);
  assert.deepEqual(products.filter(p=>ids.has(p.category)).length,3);
  assert.deepEqual(categoryTrail('velvet',nodes).map(n=>n.id),['furniture','chairs','velvet']);
  const counts = categoryCounts(products,nodes);
  assert.equal(counts.get('furniture'),3);assert.equal(counts.get('chairs'),2);assert.equal(counts.get('velvet'),2);assert.equal(counts.get('textiles'),1);
});
void test('Hierarchy rejects duplicate IDs, duplicate routes, missing parents and cycles before publishing', () => {
  assert.throws(()=>validateCatalogTree([sample('one'),sample('one')]),/Duplicate/);
  assert.throws(()=>validateCatalogTree([sample('one'),{...sample('two'),slug:'one'}]),/Duplicate/);
  assert.throws(()=>validateCatalogTree([sample('one','missing')]),/Missing parent/);
  assert.throws(()=>validateCatalogTree([sample('one','two'),sample('two','one')]),/cycle/);
  assert.doesNotThrow(()=>validateCatalogTree([sample('one'),sample('two','one')]));
});
void test('Existing solution links and all fourteen products remain in their original branches', () => {
  validateCatalogTree(catalogCategories);
  const readyIds = categoryDescendants('ready-solutions',catalogCategories);
  assert.equal(demoProducts.filter(p=>readyIds.has(p.category)).length,demoProducts.length);
  assert.equal(categoryCounts(demoProducts,catalogCategories).get('ready-solutions'),14);
  for(const slug of ['ceremony','round-tables','rectangular-tables','snake-tables','tableware','floral-compositions']) {
    const node=catalogCategories.find(n=>n.slug===slug);
    assert(node);assert.equal(node.parentId,'ready-solutions');
  }
  assert.equal(categoryCounts(demoProducts,catalogCategories).get('dishes') || 0,0);
});
