import type { CatalogCategory } from '../data/categories.ts';

export function categoryChildren(parentId: string | undefined, nodes: CatalogCategory[]) {
  return nodes.filter(node => node.parentId === parentId);
}

export function categoryTrail(id: string, nodes: CatalogCategory[]) {
  const byId = new Map(nodes.map(node => [node.id, node]));
  const result: CatalogCategory[] = [];
  const seen = new Set<string>();
  let current = byId.get(id);
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    result.unshift(current);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return result;
}

export function categoryDescendants(id: string, nodes: CatalogCategory[]) {
  const ids = new Set<string>();
  const pending = [id];
  while (pending.length) {
    const current = pending.pop()!;
    if (ids.has(current)) continue;
    ids.add(current);
    pending.push(...categoryChildren(current, nodes).map(node => node.id));
  }
  return ids;
}

export function belongsToBranch(product: { category: string; categoryIds?: string[] }, ids: Set<string>) {
  return (product.categoryIds || [product.category]).some(id => ids.has(id));
}

export function categoryCounts(products: { category: string; categoryIds?: string[] }[], nodes: CatalogCategory[]) {
  const counts = new Map<string, number>();
  for (const product of products) {
    const ancestors = new Set((product.categoryIds || [product.category]).flatMap(id => categoryTrail(id, nodes).map(node => node.id)));
    for (const id of ancestors) counts.set(id, (counts.get(id) || 0) + 1);
  }
  return counts;
}

/** Stop a static build on broken links or cycles instead of publishing an incomplete tree. */
export function validateCatalogTree(nodes: CatalogCategory[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`Duplicate category: ${node.id}`);
    for (const slug of [node.slug, ...(node.aliases || [])]) {
      if (slugs.has(slug)) throw new Error(`Duplicate category: ${slug}`);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid category slug: ${slug}`);
      slugs.add(slug);
    }
    ids.add(node.id);
  }
  const byId = new Map(nodes.map(node => [node.id, node]));
  for (const node of nodes) {
    const seen = new Set<string>();
    let current: CatalogCategory | undefined = node;
    while (current) {
      if (seen.has(current.id)) throw new Error(`Category cycle: ${node.id}`);
      seen.add(current.id);
      if (current.parentId && !ids.has(current.parentId)) throw new Error(`Missing parent: ${current.parentId}`);
      current = current.parentId ? byId.get(current.parentId) : undefined;
    }
  }
}
