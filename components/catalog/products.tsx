import { ArrowUpRight, ArrowRight, Heart, Check, Plus, CalendarDays } from 'lucide-react';
import { asset, money, rentalPeriod, type Product, type ProductVariant } from '../../data/catalog';
import { catalogCategories } from '../../data/categories';
import { categoryHref, productHref, siteHref } from '../../lib/navigation';

function Palette({ colors }: { colors: string[] }) {
  return <span className="palette" aria-label="Палитра решения">{colors.map(color => <span key={color} style={{ backgroundColor: color }} />)}</span>;
}
const positions = (n: number) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'позиция' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'позиции' : 'позиций'}`;

type VariantProps = { product: Product; variant: ProductVariant; choose: (id: string) => void; surface: 'card' | 'page' };
export function VariantPicker({ product, variant, choose, surface }: VariantProps) {
  if (product.variants.length === 1) return <p className="single-variant">{product.kind === 'item' ? 'Отдельный предмет' : 'Одна комплектация'}</p>;
  return <fieldset className={`variant-picker variant-picker-${surface} ${product.variants.some(v => v.label.length > 15) ? 'variant-picker-long' : ''}`}>
    <legend>{product.kind === 'item' ? 'Выберите вариант' : surface === 'card' ? `${product.variants.length} варианта комплектации` : 'Выберите комплектацию'}</legend>
    <div className="variant-options">{product.variants.map(option => <label key={option.id} className={`variant-option ${option.id === variant.id ? 'is-active' : ''}`}>
      <input type="radio" name={`${surface}-${product.id}`} value={option.id} checked={option.id === variant.id} onChange={() => choose(option.id)} />
      <span className="variant-option-label">{option.label}</span><span className="variant-option-price">{money(option.price)}</span>
    </label>)}</div>
  </fieldset>;
}

export function CompositionList({ variant, compact = false }: { variant: ProductVariant; compact?: boolean }) {
  return <ul className={`composition-list ${compact ? 'composition-list-compact' : ''}`}>{variant.composition.map(item => <li key={item.id}>
    {item.image && <img src={asset(item.image)} alt="" width="64" height="64" loading="lazy" />}
    {item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.name}<ArrowUpRight size={13} /></a> : <span>{item.name}</span>}
    <strong>{item.quantity} шт.</strong>
  </li>)}</ul>;
}

type CardProps = { product: Product; variant: ProductVariant; choose: (id: string) => void; add: () => void; selected: boolean; favorite: boolean; toggleFavorite: () => void };
export function ProductCard({ product, variant, choose, add, selected, favorite, toggleFavorite }: CardProps) {
  const href = productHref(product.id, variant.id);
  return <article className="product-card" aria-label={product.name}>
    <div className="product-visual"><a className="product-image-button" href={href} aria-label={`Подробнее: ${product.name}`}><img src={asset(variant.image)} alt={product.name} width="800" height="880" loading="lazy" /><span className="view-details">Подробнее <ArrowUpRight size={18} /></span></a>{product.tag && <span className="product-tag">{product.tag}</span>}<button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={toggleFavorite} aria-label={`${favorite ? 'Убрать из избранного' : 'В избранное'}: ${product.name}`} aria-pressed={favorite}><Heart size={20} /></button></div>
    <div className="product-category"><span>{catalogCategories.find(c => c.id === product.category)?.shortLabel}</span>{product.category !== "ceremony" && <Palette colors={product.palette} />}</div>
    <a className="product-title" href={href}><h3>{product.name}</h3></a><p className="product-subtitle">{product.category === "ceremony" ? variant.unit.replace("за зону", "Церемония") : product.subtitle}</p>
    <VariantPicker product={product} variant={variant} choose={choose} surface="card" />
    {variant.composition.length > 0 && <a className="composition-preview-link" href={`${href}#composition`}>Состав: {positions(variant.composition.length)}<ArrowUpRight size={15} /></a>}
    <div className="product-bottom"><div aria-live="polite"><strong>{money(variant.price)}</strong><span>{variant.unit}</span><span>{rentalPeriod(variant.rentalDays)}</span></div><button className={`add-button ${selected ? 'has-item' : ''}`} onClick={add} aria-label={`Добавить в корзину: ${product.name}, ${variant.label}`}>{selected ? <Check size={18} /> : <Plus size={18} />}<span>{selected ? 'Добавить ещё' : 'В мою свадьбу'}</span></button></div>
  </article>;
}

type PageProps = { product: Product; variant: ProductVariant; choose: (id: string) => void; add: () => void; openCart: () => void; selected: boolean };
export function ProductPage({ product, variant, choose, add, openCart, selected }: PageProps) {
  const category = catalogCategories.find(c => c.id === product.category);
  return <section className="product-page page-width">
    <figure className="product-page-photo"><img src={asset(variant.image)} alt={`${product.name} — ${variant.label}`} width="1100" height="1000" fetchPriority="high" /><figcaption>{product.kind === 'item' ? 'Изображение выбранного предмета.' : 'Общий образ. Точный состав — в выбранном варианте.'}</figcaption></figure>
    <div className="product-page-copy detail-copy">
      <a className="eyebrow" href={category ? categoryHref(category.slug) : siteHref('catalog/')}>{category?.label}</a>
      <h1 className="detail-title">{product.name}</h1><p className="detail-description">{product.description}</p>{product.category !== "ceremony" && <Palette colors={product.palette} />}
      <VariantPicker product={product} variant={variant} choose={choose} surface="page" />
      <div className="detail-price" aria-live="polite"><strong>{money(variant.price)}</strong><span>{variant.unit} · {rentalPeriod(variant.rentalDays)}</span></div>
      <button className="button button-primary full-width" onClick={add}>{selected ? 'Добавить ещё' : 'В мою свадьбу'} {selected ? <Check size={19} /> : <Plus size={19} />}</button>
      {selected && <button className="text-link detail-cart-link" onClick={openCart}>Перейти к подборке <ArrowRight size={18} /></button>}
      {variant.composition.length > 0 && <section id="composition" className="product-composition" aria-label="Состав выбранного варианта">
        <div className="composition-heading"><h2>Состав комплекта</h2><span>{variant.label}</span></div>
        <p className="composition-count">{positions(variant.composition.length)} · количество на один комплект</p>
        <CompositionList variant={variant} />
        <p className="composition-explanation">В выбранный вариант входят предметы из этого списка. Другие детали на фотографии могут не входить в комплект.</p>
      </section>}
      {variant.description && <section className="source-description" aria-label="Описание выбранного варианта"><h2>Описание</h2>{variant.description.split(/\n+/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>}
      <div className="detail-note"><strong>Предварительный расчёт</strong>Цены и составы обновляются из каталога Амели при публикации сайта. Перед заказом команда подтвердит наличие на дату, итоговую стоимость и дополнительные услуги.</div>
      <div className="product-service-note"><CalendarDays size={19} /><p>Добавление в корзину не создаёт бронь.<br />Доставка и установка обсуждаются отдельно.</p></div>
      <a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить это решение <ArrowUpRight size={18} /></a>
    </div>
  </section>;
}
