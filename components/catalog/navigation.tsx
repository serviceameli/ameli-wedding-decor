import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronRight, Layers3, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { catalogCategories, type CatalogCategory } from '@/data/categories';
import type { Product } from '@/data/types';
import { categoryChildren, categoryCounts, categoryTrail } from '@/lib/catalog-tree';
import { categoryHref, siteHref } from '@/lib/navigation';

export function CatalogNavigation({ activeId, products }: { activeId?: string; products: Product[] }) {
  const [open, setOpen] = useState(false);
  const counts = useMemo(() => categoryCounts(products, catalogCategories), [products]);
  const trail = activeId ? categoryTrail(activeId, catalogCategories).map(c => c.id) : [];
  const roots = categoryChildren(undefined, catalogCategories);
  const renderNodes = (nodes: CatalogCategory[], depth = 0) => <ul className={depth ? 'catalog-tree-children' : 'catalog-tree-roots'}>{nodes.map(node => {
    const children = categoryChildren(node.id, catalogCategories);
    const count = counts.get(node.id) || 0;
    const label = <><span>{node.label}</span>{count > 0 && <small>{count}</small>}</>;
    return <li key={node.id}>
      {children.length ? <details className="catalog-tree-branch" open={trail.includes(node.id) || (!activeId && node.id === 'ready-solutions')}>
        <summary className={trail.includes(node.id) ? 'in-current-branch' : ''}>{label}<ChevronRight size={15} /></summary>
        <a href={categoryHref(node.slug)} className={`catalog-tree-all ${activeId === node.id ? 'active' : ''}`} aria-current={activeId === node.id ? 'page' : undefined}>Смотреть весь раздел <ArrowUpRight size={13} /></a>
        {renderNodes(children, depth + 1)}
      </details> : <a href={categoryHref(node.slug)} className={activeId === node.id ? 'active' : ''} aria-current={activeId === node.id ? 'page' : undefined}>{label}</a>}
    </li>;
  })}</ul>;
  const navigation = (label: string) => <nav className="catalog-tree" aria-label={label}><a href={siteHref('catalog/')} className={`catalog-tree-home ${!activeId ? 'active' : ''}`} aria-current={!activeId ? 'page' : undefined}><Layers3 size={17} />Все товары<span>{products.length}</span></a>{renderNodes(roots)}</nav>;
  return <>
    <aside className="catalog-tree-sidebar"><p className="catalog-tree-title">Разделы каталога</p>{navigation('Каталог по разделам')}</aside>
    <button className="catalog-nav-mobile button button-outline" onClick={() => setOpen(true)}><Menu size={18} />Разделы каталога<ChevronRight size={17} /></button>
    <Sheet open={open} onOpenChange={setOpen}><SheetContent side="left" showCloseButton={false} className="catalog-navigation-sheet"><button className="icon-button close-button" aria-label="Закрыть разделы каталога" onClick={() => setOpen(false)}><X size={21} /></button><SheetTitle className="sheet-heading">Каталог</SheetTitle><SheetDescription>Готовые решения и отдельные предметы</SheetDescription>{navigation('Разделы каталога на телефоне')}</SheetContent></Sheet>
  </>;
}

export function CatalogBreadcrumb({ categoryId, productName, isCatalog }: { categoryId?: string; productName?: string; isCatalog?: boolean }) {
  const trail = categoryId ? categoryTrail(categoryId, catalogCategories) : [];
  return <nav className="breadcrumb page-width" aria-label="Путь по каталогу"><a href={siteHref()}>Главная</a><span aria-hidden="true">/</span>{isCatalog ? <span aria-current="page">Каталог</span> : <><a href={siteHref('catalog/')}>Каталог</a>{trail.map((node, index) => <span className="breadcrumb-part" key={node.id}><span aria-hidden="true">/</span>{index === trail.length - 1 && !productName ? <span aria-current="page">{node.label}</span> : <a href={categoryHref(node.slug)}>{node.label}</a>}</span>)}{productName && <span className="breadcrumb-part"><span aria-hidden="true">/</span><span aria-current="page">{productName}</span></span>}</>}</nav>;
}

export function UpcomingCategory({ category }: { category: CatalogCategory | null }) {
  const children = category ? categoryChildren(category.id, catalogCategories) : [];
  return <div className="upcoming-category">
    {children.length > 0 && <div className="upcoming-subcategories">{children.map(child => <a href={categoryHref(child.slug)} key={child.id}><span>{child.label}</span><ArrowUpRight size={19} /></a>)}</div>}
    <div className="upcoming-message"><Layers3 size={29} strokeWidth={1.2} /><h2>Раздел пополняется</h2><p>{children.length ? 'Здесь появятся отдельные предметы для вашей свадьбы.' : 'Скоро здесь можно будет выбрать и добавить предметы в общую подборку.'} Пока посмотреть ассортимент можно в основном каталоге Амели.</p><a className="button button-outline" href={category?.sourceUrl || 'https://catalog.ameli-rental.ru'} target="_blank" rel="noreferrer">Посмотреть основной каталог <ArrowUpRight size={18} /></a></div>
  </div>;
}
