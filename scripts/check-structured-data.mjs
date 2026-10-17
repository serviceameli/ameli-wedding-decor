import fs from 'node:fs';
import assert from 'node:assert/strict';
import { catalogCategories } from '../data/categories.ts';
import { catalogProducts } from '../data/catalog.ts';
import { schemaPages, buildStructuredData, STRUCTURED_DATA_ID } from '../lib/structured-data.ts';

const pages = schemaPages(catalogCategories, catalogProducts);
const vocabularyPath = process.argv.find(arg => arg.startsWith('--vocabulary='))?.slice('--vocabulary='.length);
const vocabulary = vocabularyPath ? new Map(JSON.parse(fs.readFileSync(vocabularyPath, 'utf8'))['@graph'].map(node => [node['@id'], node])) : null;
const array = value => value ? Array.isArray(value) ? value : [value] : [];
const ancestors = type => {
  const found = new Set();
  const visit = id => {
    if (found.has(id)) return;
    found.add(id);
    for (const parent of array(vocabulary.get(id)?.['rdfs:subClassOf'])) visit(parent['@id']);
  };
  visit(`schema:${type}`);
  return found;
};
function validateVocabulary(graph) {
  const entities = new Map(graph['@graph'].map(node => [node['@id'], node]));
  const visit = node => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(visit); return; }
    const types = array(node['@type']);
    for (const type of types) assert.ok(vocabulary.has(`schema:${type}`), `Unknown Schema.org type ${type}`);
    const ownerTypes = new Set(types.flatMap(type => [...ancestors(type)]));
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('@')) continue;
      const property = vocabulary.get(`schema:${key}`);
      assert.ok(property, `Unknown Schema.org property ${key}`);
      const domains = array(property['schema:domainIncludes']).map(item => item['@id']);
      if (domains.length && ownerTypes.size) assert.ok(domains.some(domain => ownerTypes.has(domain)), `${types.join('/')} does not support ${key}`);
      const ranges = array(property['schema:rangeIncludes']).map(item => item['@id']);
      for (const item of array(value)) {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          const resolved = item['@type'] ? item : entities.get(item['@id']);
          if (item['@id'] && !item['@type']) assert.ok(resolved, `Unresolved entity ${item['@id']}`);
          if (resolved?.['@type'] && ranges.length) {
            const valueTypes = array(resolved['@type']).flatMap(type => [...ancestors(type)]);
            assert.ok(ranges.some(range => valueTypes.includes(range)), `${key} does not accept ${resolved['@type']}`);
          }
        }
      }
      visit(value);
    }
  };
  graph['@graph'].forEach(visit);
}

const counts = {};
for (const page of pages) {
  const path = `dist/${page.path ? `${page.path}/` : ''}index.html`;
  const html = fs.readFileSync(path, 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match => /type="application\/ld\+json"/.test(match[1]));
  assert.equal(scripts.length, 1, `${path}: expected one JSON-LD block`);
  assert.ok(scripts[0][1].includes(`id="${STRUCTURED_DATA_ID}"`), `${path}: script identifier`);
  const graph = JSON.parse(scripts[0][2]);
  assert.deepEqual(graph, buildStructuredData(page, catalogCategories, catalogProducts), `${path}: outdated data`);
  assert.ok(!scripts[0][2].includes('<'), `${path}: unsafe catalog text`);
  assert.match(html, /name="robots" content="noindex, nofollow"/, `${path}: existing indexing restriction`);
  if (vocabulary) validateVocabulary(graph);
  counts[page.kind] = (counts[page.kind] || 0) + 1;
}
// Catch stale or unexpected HTML that was not covered by the route audit.
const htmlFiles = fs.readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'));
assert.equal(htmlFiles.length, pages.length, 'Unexpected HTML pages in dist');
const report = { checkedAt: new Date().toISOString(), pages: pages.length, counts, products: catalogProducts.length, variants: catalogProducts.reduce((sum, p) => sum + p.variants.length, 0), vocabularyChecked: Boolean(vocabulary), errors: 0, publication: false };
fs.mkdirSync('work/schema-audit', { recursive: true });
fs.writeFileSync('work/schema-audit/report.json', JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync('work/schema-audit/pages.json', JSON.stringify(pages.map(page => ({ path: `/${page.path ? `${page.path}/` : ''}`, kind: page.kind, entityUrl: buildStructuredData(page, catalogCategories, catalogProducts)['@graph'][2].url })), null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
