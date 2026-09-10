'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, ArrowRight, Heart, ShoppingBag, Menu, X, Plus, Minus, Check, Flower2, Layers3, CalendarDays, Trash2, Download, Send } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { categories, catalogProvider, money, asset, type Product, type Category } from '@/data/catalog';
import { catalogCategories } from '@/data/categories';
import { siteHref, categoryHref, productHref, resolveRoute } from '@/lib/navigation';
import { cartTotal, changeQuantity, normalizeCart, localToday, MAX_QUANTITY, type CartItem } from '@/lib/cart';

const STORE_KEY = 'ameli-wedding-selection-v1';
const FAVORITES_KEY = 'ameli-wedding-favorites-v1';
const NAV = [{ href: 'catalog/', label: 'Каталог' }, { href: '#how', label: 'Как это работает' }, { href: '#questions', label: 'Вопросы' }];
const FAQ = [
  ['Что такое готовое решение?', 'Это сочетающиеся предметы декора, собранные в один комплект. Вместо выбора каждой вазы и салфетки по отдельности вы выбираете образ. Состав указан в карточке: всё, что присутствует на фотографии, не обязательно входит в комплект.'],
  ['Можно ли изменить цвет или состав?', 'Расскажите команде, что хотите изменить. Возможность замены текстиля, мебели или отдельных деталей зависит от выбранного комплекта и наличия на вашу дату. Изменения и стоимость согласовываются отдельно.'],
  ['Как понять, сколько комплектов мне нужно?', 'Для церемонии обычно выбирают одну зону. Гостевые столы добавляют по количеству столов, а сервировку по числу гостей. Единица расчёта подписана у каждой цены. С планом рассадки и количеством поможет отдел заботы.'],
  ['Цветы на фото входят в стоимость?', 'Только если флористика прямо указана в составе комплекта. В каталоге есть решения без флористики. Вид цветов, объём композиции и возможность изменения обсуждаются отдельно.'],
  ['Доставка и установка входят в цену?', 'Доставка, монтаж, демонтаж и другие услуги не включены в примерный расчёт этой витрины. Их состав и стоимость нужно согласовать с командой с учётом площадки и даты.'],
  ['Добавление в корзину бронирует декор?', 'Нет. Корзина сохраняет вашу подборку на этом устройстве. Наличие и итоговую стоимость подтверждает команда после проверки даты и состава. В текущей демоверсии заявки не отправляются и бронирование не создаётся.'],
];

type Inquiry = { name: string; phone: string; date: string; venue: string; guests: string; comment: string };
const EMPTY_INQUIRY: Inquiry = { name: '', phone: '', date: '', venue: '', guests: '', comment: '' };

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href={siteHref()} className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="Амели, на главную"><span>Амели<span className="brand-dot">.</span></span><small>ГОТОВЫЕ РЕШЕНИЯ</small></a>;
}
function CloseButton({ onClick }: { onClick: () => void }) { return <button className="icon-button close-button" aria-label="Закрыть" onClick={onClick}><X size={23} /></button>; }
function solutionCount(count: number) { const last = count % 10, lastTwo = count % 100; return `${count} ${last === 1 && lastTwo !== 11 ? 'решение' : last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'решения' : 'решений'}`; }
function Palette({ colors }: { colors: string[] }) { return <span className="palette" aria-label="Палитра решения">{colors.map(c => <span key={c} style={{ backgroundColor: c }} />)}</span>; }


function CategoryDirectory({ products, fullPage }: { products: Product[]; fullPage: boolean }) {
  const Heading = fullPage ? 'h1' : 'h2';
  return <section className={`category-directory section-space page-width ${fullPage ? 'directory-page' : ''}`}>
    <div className="section-heading"><div><p className="eyebrow">КАТАЛОГ СВАДЕБНОГО ДЕКОРА</p><Heading className="directory-title">Всё для вашего <em>красивого дня.</em></Heading></div><p>От первого «да» до последнего тоста.<br />{' '}Выберите, с какой зоны начать.</p></div>
    <div className="directory-grid">{catalogCategories.map((category, index) => <a className="directory-card" key={category.id} href={categoryHref(category.slug)}>
      <div className="directory-image"><img src={asset(category.image)} alt={category.label} width="600" height="500" loading="lazy" /><span className="directory-number">0{index + 1}</span></div>
      <div className="directory-caption"><h3>{category.label}</h3><ArrowUpRight size={22} /></div>
      <span className="directory-count">{solutionCount(products.filter(p => p.category === category.id).length)} в коллекции</span>
    </a>)}</div>
  </section>;
}
function ProductPage({ product, add, openCart, selected }: { product: Product; add: (p: Product) => void; openCart: () => void; selected: boolean }) {
  const category = catalogCategories.find(c => c.id === product.category);
  return <section className="product-page page-width">
    <figure className="product-page-photo"><img src={asset(product.image)} alt={product.name} width="1100" height="1000" fetchPriority="high" /><figcaption>Фотография из коллекции Амели</figcaption></figure>
    <div className="product-page-copy detail-copy">
      <a className="eyebrow" href={category ? categoryHref(category.slug) : siteHref('catalog/')}>{category?.label}</a>
      <h1 className="detail-title">{product.name}</h1><p className="detail-description">{product.description}</p><Palette colors={product.palette} />
      <div className="detail-price"><strong>{money(product.price)}</strong><span>{product.unit} · примерная цена</span></div>
      <button className="button button-primary full-width" onClick={() => add(product)}>{selected ? 'Добавить ещё' : 'В мою свадьбу'} {selected ? <Check size={19} /> : <Plus size={19} />}</button>
      {selected && <button className="text-link detail-cart-link" onClick={openCart}>Перейти к подборке <ArrowRight size={18} /></button>}
      <h4>Пример состава комплекта</h4><ul className="includes-list">{product.includes.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
      <div className="detail-note"><strong>Чтобы всё было понятно</strong>Это демонстрационная карточка. Предметы на фото могут не входить в комплект. Точный состав, флористика, доставка и установка согласовываются с командой отдельно.</div>
      <div className="product-service-note"><CalendarDays size={19} /><p>Наличие проверяется на дату свадьбы.<br />Добавление в корзину не создаёт бронь.</p></div>
      <a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить это решение <ArrowUpRight size={18} /></a>
    </div>
  </section>;
}

export default function Home() {
  const route = resolveRoute();
  const isHome = route.kind === 'home';
  const isCategory = route.kind === 'category';
  const isCatalog = route.kind === 'catalog';
  const activeCategory = route.kind === 'category' ? route.category : null;
  const [products, setProducts] = useState<Product[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteOnly, setFavoriteOnly] = useState(new URLSearchParams(window.location.search).get('favorites') === '1');
  const [category, setCategory] = useState<Category>(activeCategory?.id || 'all');
  const [sort, setSort] = useState('curated');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'review'>('cart');
  const [inquiry, setInquiry] = useState<Inquiry>(EMPTY_INQUIRY);
  const [acknowledged, setAcknowledged] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState('');
  const sceneRef = useRef<HTMLElement>(null);
  const motionInitialized = useRef(false);
  const motionRuntime = useRef<{ layout: () => void } | null>(null);
  const total = cartTotal(cart, products);
  const routeProduct = route.kind === 'product' ? products.find(p => p.id === route.productId) : null;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const selectedProducts = cart.map(row => ({ ...row, product: products.find(p => p.id === row.productId)! })).filter(row => row.product);
  const selectedZones = new Set(selectedProducts.map(row => row.product.category));

  useEffect(() => {
    const controller = new AbortController();
    catalogProvider.listProducts(controller.signal).then(data => {
      if (controller.signal.aborted) return;
      setProducts(data);
      try {
        setCart(normalizeCart(JSON.parse(localStorage.getItem(STORE_KEY) || '[]'), data));
        const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        setFavorites(Array.isArray(stored) ? stored.filter(id => typeof id === 'string' && data.some(p => p.id === id)) : []);
      } catch { /* Storage can be unavailable or contain an outdated selection. */ }
      setReady(true); setLoading(false);
    }).catch(error => { if (error.name !== 'AbortError') { setLoadError(true); setLoading(false); } });
    return () => controller.abort();
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch { /* The cart still works in memory. */ } } }, [cart, favorites, ready]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 3200); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => {
    if (!ready || motionInitialized.current) return;
    // Vendor engine is kept verbatim. Motion is enhancement, never navigation.
    const mount = () => {
      const runtime = (window as unknown as { ScrollCraft?: { mount: (root: HTMLElement) => { layout: () => void } } }).ScrollCraft;
      if (runtime && !motionInitialized.current) { motionRuntime.current = runtime.mount(document.querySelector('main')!); motionInitialized.current = true; }
    };
    const existing = document.querySelector<HTMLScriptElement>('#scrollcraft-runtime');
    if (existing) { mount(); existing.addEventListener('load', mount, { once: true }); return; }
    const script = document.createElement('script'); script.id = 'scrollcraft-runtime'; script.src = siteHref('vendor/scrollcraft.js'); script.onload = mount; document.body.appendChild(script);
  }, [ready]);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (preference.matches || window.innerWidth < 760) { scene.style.setProperty('--hero-shift', '0px'); return; }
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      scene.style.setProperty('--hero-shift', `${Math.min(65, Math.max(0, -rect.top) * 0.12)}px`);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true }); window.addEventListener('resize', request); preference.addEventListener('change', request); update();
    return () => { window.removeEventListener('scroll', request); window.removeEventListener('resize', request); preference.removeEventListener('change', request); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => { const id = requestAnimationFrame(() => motionRuntime.current?.layout()); return () => cancelAnimationFrame(id); }, [category, favoriteOnly, favorites, sort]);

  function add(product: Product) {
    const current = cart.find(row => row.productId === product.id)?.quantity ?? 0;
    if (current >= MAX_QUANTITY) { setToast('Для большего количества свяжитесь с командой'); return; }
    setCart(prev => changeQuantity(prev, product.id, 1)); setToast(`«${product.name}» добавлено в вашу свадьбу`);
  }
  function toggleFavorite(id: string) { setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }
  function goToCatalog(nextCategory: Category = 'all') { const target = catalogCategories.find(c => c.id === nextCategory); window.location.href = target ? categoryHref(target.slug) : siteHref('catalog/'); }
  function openCart() { setCheckoutStep('cart'); setCartOpen(true); }
  function reviewInquiry(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const readField = (key: keyof Inquiry) => { const value = fields.get(key); return typeof value === 'string' ? value : ''; };
    const draft: Inquiry = { name: readField('name'), phone: readField('phone'), date: readField('date'), venue: readField('venue'), guests: readField('guests'), comment: readField('comment') };
    if (!draft.name.trim() || draft.phone.replace(/\D/g, '').length < 10 || draft.phone.replace(/\D/g, '').length > 15) { setFormError('Укажите имя и телефон, по которому с вами можно связаться.'); return; }
    if (!draft.date || draft.date < localToday()) { setFormError('Выберите сегодняшнюю или будущую дату свадьбы.'); return; }
    if (!acknowledged) { setFormError('Подтвердите, что это демонстрационный расчёт.'); return; }
    setInquiry(draft); setFormError(''); setCheckoutStep('review');
  }
  function downloadSelection() {
    const contents = ['АМЕЛИ · ПОДБОРКА СВАДЕБНОГО ДЕКОРА', 'Демонстрационный расчёт. Не является заказом или бронированием.', '', `Имя: ${inquiry.name}`, `Телефон: ${inquiry.phone}`, `Дата: ${inquiry.date}`, `Площадка: ${inquiry.venue || 'Уточняется'}`, `Гостей: ${inquiry.guests || 'Уточняется'}`, '', ...selectedProducts.map(({product,quantity}) => `${product.name} × ${quantity} (${product.unit}): ${money(product.price * quantity)}`), '', `Примерная сумма: ${money(total)}`, 'Доставка, монтаж и дополнительные услуги рассчитываются отдельно.', `Комментарий: ${inquiry.comment || 'Нет'}`, '', 'Ничего не отправлено. Контакт Амели: +7 985 084-38-55, https://t.me/amelirental'].join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff', contents], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'подборка-свадьбы-амели.txt'; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  let visibleProducts = products.filter(p => (category === 'all' || p.category === category) && (!favoriteOnly || favorites.includes(p.id)));
  if (sort === 'low') visibleProducts = [...visibleProducts].sort((a,b) => a.price - b.price);
  if (sort === 'high') visibleProducts = [...visibleProducts].sort((a,b) => b.price - a.price);
  if (isHome && !favoriteOnly && category === 'all') visibleProducts = visibleProducts.slice(0, 6);

  return <>
    <div id="top" />
    <a href={siteHref('catalog/')} className="skip-link">Перейти к готовым решениям</a>
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">{NAV.map(link => <a key={link.href} href={siteHref(link.href)}>{link.label}</a>)}</nav>
        <div className="header-actions">
          <a className="header-contact" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить свадьбу <ArrowUpRight size={16} /></a>
          <button className={`icon-button ${favoriteOnly ? 'selected' : ''}`} aria-label={`Избранное, ${favorites.length}`} onClick={() => { window.location.href = siteHref('catalog/?favorites=1#collection'); }}><Heart size={21} />{favorites.length > 0 && <span className="mini-count">{favorites.length}</span>}</button>
          <button className="bag-button" onClick={openCart} aria-label={`Корзина, ${count}`}><ShoppingBag size={20} /><span className="bag-label">Моя свадьба</span><span className="bag-count">{count}</span></button>
          <button className="icon-button mobile-menu" aria-label="Открыть меню" onClick={() => setMenuOpen(true)}><Menu /></button>
        </div>
      </div>
    </header>
    <main>
      {isHome && <>
      <section className="hero page-width" ref={sceneRef} data-sc-act="flow">
        <div className="hero-copy">
          <p className="eyebrow"><span className="little-line" /> СВАДЕБНЫЙ ДЕКОР В АРЕНДУ</p>
          <h1>Ваша история.<br />{' '}В красивых<br />{' '}<em>деталях.</em></h1>
          <p className="hero-description">Готовые решения для вашей свадьбы.<br />{' '}Вы выбираете настроение.<br className="mobile-break" /> Мы помогаем собрать всё остальное.</p>
          <a className="button button-primary" href={siteHref('catalog/')}>Выбрать декор <ArrowUpRight size={20} /></a>
          <p className="hero-location">Москва и Московская область</p>
        </div>
        <div className="hero-collage">
          <figure className="hero-main"><img src={asset('hero.jpg')} alt="Белые цветочные композиции, свечи и сервировка на свадьбе с декором Амели" width="1280" height="854" fetchPriority="high" /><figcaption>Декор Амели на настоящей свадьбе</figcaption></figure>
          <figure className="hero-detail"><img src={asset('editorial.jpg')} alt="Свадебный стол с зелёными стульями и белой флористикой" width="905" height="1280" /><figcaption>Всё складывается<br />{' '}<em>в вашу историю</em></figcaption></figure>
          <span className="hero-side-note">СОЗДАНО ДЛЯ ВАШЕЙ ИСТОРИИ</span>
        </div>
      </section>

      <div className="promise-strip page-width">
        <span><Layers3 size={21} /> Сочетания уже продуманы</span>
        <span><ShoppingBag size={21} /> Каждая зона одним комплектом</span>
        <span><Heart size={21} /> Можно выбрать в своём темпе</span>
      </div>

      </>}
      {!isHome && <div className="breadcrumb page-width"><a href={siteHref()}>Главная</a><span>/</span>{isCatalog ? <span>Каталог</span> : <><a href={siteHref('catalog/')}>Готовые решения</a><span>/</span><span>{activeCategory?.label || routeProduct?.name || 'Решение'}</span></>}</div>}
      {(isHome || isCatalog) && <CategoryDirectory products={products} fullPage={isCatalog} />}
      {route.kind === 'product' && loading && <output className="empty-state">Открываем решение…</output>}
      {route.kind === 'product' && routeProduct && <ProductPage product={routeProduct} add={add} openCart={openCart} selected={cart.some(row => row.productId === routeProduct.id)} />}
      {(route.kind === 'missing' || (route.kind === 'product' && !loading && !routeProduct)) && <section className="page-width section-space empty-state"><h1>Страница не найдена</h1><p>Выберите подходящий раздел в каталоге.</p><a className="button button-primary" href={siteHref('catalog/')}>Перейти в каталог</a></section>}
      {(isHome || isCatalog || isCategory) && <div className={isCategory ? 'catalog-page-layout page-width' : ''}>
      {isCategory && <aside className="catalog-sidebar"><a href={siteHref('catalog/')} className="sidebar-all">Все готовые решения <ArrowUpRight size={15} /></a><nav className="desktop-catalog-nav" aria-label="Разделы каталога">{catalogCategories.map(c => <a key={c.id} href={categoryHref(c.slug)} className={activeCategory?.id === c.id ? 'active' : ''}>{c.label}<span>{products.filter(p => p.category === c.id).length}</span></a>)}</nav><details className="mobile-catalog-nav"><summary>Разделы каталога <Plus size={18} /></summary><nav aria-label="Выбрать раздел">{catalogCategories.map(c => <a key={c.id} href={categoryHref(c.slug)} className={activeCategory?.id === c.id ? 'active' : ''}>{c.label}<ArrowUpRight size={15} /></a>)}</nav></details><div className="sidebar-help"><h3>Поможем выбрать</h3><p>Сочетания, количество и детали вашей площадки.</p><a href="https://t.me/amelirental" target="_blank" rel="noreferrer">Написать команде <ArrowUpRight size={15} /></a></div></aside>}
      <section id="collection" className={isCategory ? 'collection catalog-page-content' : 'collection section-space page-width'} data-sc-act="flow">
        <div className="section-heading">
          <div><p className="eyebrow">ГОТОВЫЕ РЕШЕНИЯ</p>{isCategory ? <h1 className="category-page-title">{activeCategory?.label}</h1> : <h2>{isHome ? <>Идеи для <em>вашей свадьбы.</em></> : <>Вся коллекция <em>решений.</em></>}</h2>}</div>
          <p>{activeCategory?.description || 'Смотрите готовые сочетания и собирайте свою подборку.'}</p>
        </div>
        <div className="catalog-controls">
          {!isCategory && <fieldset className="category-tabs" aria-label="Зона свадьбы">{categories.map(item => <button key={item.id} aria-pressed={category === item.id} className={category === item.id ? 'active' : ''} onClick={() => { setCategory(item.id); setFavoriteOnly(false); }}>{item.label}</button>)}</fieldset>}
          <Select value={sort} onValueChange={value => setSort(value || 'curated')}><SelectTrigger className="sort-select" aria-label="Сортировка"><SelectValue>{sort === 'low' ? 'Сначала дешевле' : sort === 'high' ? 'Сначала дороже' : 'Подборка Амели'}</SelectValue></SelectTrigger><SelectContent><SelectItem value="curated">Подборка Амели</SelectItem><SelectItem value="low">Сначала дешевле</SelectItem><SelectItem value="high">Сначала дороже</SelectItem></SelectContent></Select>
        </div>
        <div className="catalog-meta"><span>{favoriteOnly ? 'Избранные решения' : `${solutionCount(visibleProducts.length)} для вдохновения`}{favoriteOnly && <button onClick={() => setFavoriteOnly(false)}>Показать все <X size={13} /></button>}</span><span className="demo-label">Демо-коллекция · примерные цены</span></div>
        {loading && <output className="empty-state">Собираем коллекцию…</output>}
        {loadError && <div className="empty-state" role="alert"><h3>Коллекция не загрузилась</h3><button className="button button-outline" onClick={() => window.location.reload()}>Попробовать ещё раз</button></div>}
        {!loading && !loadError && visibleProducts.length === 0 && <div className="empty-state"><Heart size={32} /><h3>Здесь будут ваши любимые решения</h3><p>Нажмите на сердечко у понравившегося комплекта.</p><button className="button button-outline" onClick={() => { setFavoriteOnly(false); setCategory('all'); }}>Посмотреть коллекцию</button></div>}
        <div className="product-grid">{visibleProducts.map(product => <article className="product-card" key={product.id}>
          <div className="product-visual"><a className="product-image-button" href={productHref(product.id)} aria-label={`Подробнее: ${product.name}`}><img src={asset(product.image)} alt={product.name} width="800" height="880" loading="lazy" /><span className="view-details">Рассмотреть решение <ArrowUpRight size={18} /></span></a>{product.tag && <span className="product-tag">{product.tag}</span>}<button className={`favorite-button ${favorites.includes(product.id) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={`${favorites.includes(product.id) ? 'Убрать из избранного' : 'В избранное'}: ${product.name}`} aria-pressed={favorites.includes(product.id)}><Heart size={20} /></button></div>
          <div className="product-category"><span>{categories.find(c => c.id === product.category)?.label}</span><Palette colors={product.palette} /></div>
          <a className="product-title" href={productHref(product.id)}><h3>{product.name}</h3></a><p className="product-subtitle">{product.subtitle}</p>
          <div className="product-bottom"><div><strong>{money(product.price)}</strong><span>{product.unit}</span></div><button className={`add-button ${cart.some(row => row.productId === product.id) ? 'has-item' : ''}`} onClick={() => add(product)} aria-label={`Добавить в корзину: ${product.name}`}>{cart.some(row => row.productId === product.id) ? <Check size={18} /> : <Plus size={18} />}<span>{cart.some(row => row.productId === product.id) ? 'Добавить ещё' : 'В мою свадьбу'}</span></button></div>
        </article>)}</div>
        <p className="catalog-footnote">Фотографии из каталога Амели. Названия, цены и состав показаны для примера. Наличие и окончательный расчёт подтверждает команда.</p>
      {isHome && <a className="button button-outline catalog-more" href={siteHref('catalog/')}>Весь каталог готовых решений <ArrowUpRight size={19} /></a>}
      </section>
      </div>}
      {isHome && <>
      <section className="story" id="approach" data-sc-act="flow">
        <div className="story-inner page-width"><figure className="story-image" data-sc-parallax="-0.45"><img src={asset('story.jpg')} alt="Декор Амели: фактуры текстиля, цветы и детали свадебного зала" loading="lazy" width="1000" height="1250" /><figcaption>Красивые детали. Одно настроение.</figcaption></figure><div className="story-copy" data-sc-in><p className="eyebrow">ПРОДУМАНО ВМЕСТЕ</p><h2>Не сотня решений.<br />{' '}<em>Одно красивое.</em></h2><p>Сохранять референсы приятно. Подбирать к ним каждую вазу, стул и салфетку уже сложнее.</p><p>Мы собрали сочетания заранее. Вам остаётся выбрать то, в чём вы узнаёте себя, а затем обсудить детали вашей площадки.</p><div className="story-points"><div><span>01</span><p><strong>Видно, что получится</strong>Смотрите на целую зону и сочетания деталей.</p></div><div><span>02</span><p><strong>Понятно, что вы выбираете</strong>Состав и единица расчёта указаны в карточке.</p></div><div><span>03</span><p><strong>Есть с кем обсудить</strong>Команда поможет с количеством и совместимостью.</p></div></div><a className="text-link light-link" href={siteHref('catalog/')}>Найти своё сочетание <ArrowUpRight size={20} /></a></div></div>
      </section>

      <section id="how" className="how-section section-space page-width" data-sc-act="flow">
        <div className="section-heading"><h2>От «нравится»<br />{' '}до <em>«это наша свадьба».</em></h2><p>Начните с одного решения.<br />{' '}Остальное сложится шаг за шагом.</p></div>
        <div className="steps" data-sc-stagger="80">{[
          { icon: Heart, title: 'Найдите своё', text: 'Выберите оформление по фото. Посмотрите состав и сохраните понравившееся.' },
          { icon: ShoppingBag, title: 'Соберите подборку', text: 'Добавьте зоны в корзину. Укажите количество столов, комплектов или гостей.' },
          { icon: CalendarDays, title: 'Расскажите о дне', text: 'Укажите дату и площадку. Это поможет проверить наличие и подготовить расчёт.' },
          { icon: Flower2, title: 'Согласуйте детали', text: 'Обсудите с командой состав, доставку и установку. Бронирование после подтверждения.' },
        ].map(({icon: Icon, title, text}, index) => <div className="step" data-sc-in key={title}><div className="step-top"><Icon size={27} strokeWidth={1.2} /><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section id="questions" className="faq-section page-width section-space" data-sc-act="flow"><div className="faq-intro"><p className="eyebrow">МОЖНО ПРОСТО СПРОСИТЬ</p><h2>Чтобы выбирать<br />{' '}<em>было спокойно.</em></h2><p>Собрали то, что хочется знать<br />{' '}до первого шага.</p><a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Задать свой вопрос <ArrowUpRight size={18} /></a></div><div className="faq-list">{FAQ.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="closing page-width" data-sc-act="flow"><div className="closing-inner"><span className="closing-symbol" aria-hidden="true">а.</span><div><h2>Пусть этот день<br />{' '}будет <em>про вас.</em></h2><p>Начните с того, что откликается.<br />{' '}Мы рядом, если понадобится помощь.</p></div><div className="closing-actions"><a className="button button-primary" href={siteHref('catalog/')}>Выбрать декор <ArrowUpRight size={20} /></a><a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить с Амели <Send size={17} /></a></div></div></section>
      </>}
    </main>
    <footer className="site-footer page-width"><div className="footer-top"><Brand footer /><div><p>Готовые решения для тёплых воспоминаний.</p><a href="https://catalog.ameli-rental.ru" target="_blank" rel="noreferrer">Весь каталог аренды <ArrowUpRight size={15} /></a></div><div className="footer-contact"><a href="tel:+79850843855">+7 985 084-38-55</a><span>Клиентская линия: 09:00–21:00</span><a href="https://t.me/amelirental" target="_blank" rel="noreferrer">Телеграм <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Амели</span><span>Концепция свадебной коллекции. Демо-версия.</span><a href="https://catalog.ameli-rental.ru" target="_blank" rel="noreferrer">Основной сайт <ArrowUpRight size={13} /></a></div></footer>

    {count > 0 && !cartOpen && <div className="selection-dock"><div className="dock-thumbnails">{selectedProducts.slice(0,3).map(row => <img key={row.productId} src={asset(row.product.image)} alt="" />)}</div><div className="dock-copy"><strong>Ваша свадьба складывается</strong><span>{selectedZones.size} из {catalogCategories.length} разделов выбрано · {money(total)}</span></div><button onClick={openCart}>Посмотреть <ArrowUpRight size={18} /></button></div>}
    <output className={`toast ${toast ? 'toast-visible' : ''}`} aria-live="polite">{toast && <><Check size={19} /><span>{toast}</span></>}</output>

    <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetContent className="menu-sheet" showCloseButton={false}><CloseButton onClick={() => setMenuOpen(false)} /><SheetTitle className="sheet-heading">Ваша свадьба с Амели</SheetTitle><SheetDescription>Готовые решения для красивого дня</SheetDescription><nav className="mobile-navigation">{NAV.map(link => <a key={link.href} href={siteHref(link.href)} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight /></a>)}</nav><a className="button button-primary" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить свадьбу <Send size={18} /></a></SheetContent></Sheet>


    <Sheet open={cartOpen} onOpenChange={setCartOpen}><SheetContent className="cart-sheet" showCloseButton={false}><CloseButton onClick={() => setCartOpen(false)} /><div className="cart-header"><p className="eyebrow">ВАША КРАСИВАЯ ИСТОРИЯ</p><SheetTitle className="sheet-heading">{checkoutStep === 'cart' ? 'Моя свадьба' : checkoutStep === 'form' ? 'Детали вашего дня' : 'Ваша подборка готова'}</SheetTitle><SheetDescription>{checkoutStep === 'cart' ? 'Добавляйте то, что нравится. Всё выбранное сохранится на этом устройстве.' : checkoutStep === 'form' ? 'Заполните данные, чтобы посмотреть, как будет выглядеть заявка.' : 'Это демонстрация. Заявка не отправлена, декор не забронирован.'}</SheetDescription></div>
      {count === 0 ? <div className="empty-cart"><ShoppingBag size={45} strokeWidth={1} /><h3>Пока только предвкушение</h3><p>Добавьте первое решение,<br />{' '}и ваша свадьба начнёт складываться.</p><SheetClose className="button button-primary" onClick={() => goToCatalog()}>Выбрать декор <ArrowUpRight size={20} /></SheetClose></div> : <>
        <div className="zone-progress" aria-label="Выбранные зоны">{catalogCategories.map(c => <span key={c.id} className={selectedZones.has(c.id as Category) ? 'complete' : ''}>{selectedZones.has(c.id as Category) ? <Check size={13} /> : <span className="zone-dot" />}{c.shortLabel}</span>)}</div>
        {checkoutStep === 'cart' && <><div className="cart-items">{selectedProducts.map(({ product, quantity }) => <div className="cart-item" key={product.id}><img src={asset(product.image)} alt={product.name} width="100" height="120" /><div className="cart-item-content"><h3>{product.name}</h3><p>{product.unit}</p><div className="cart-item-bottom"><div className="quantity-controls"><button aria-label={`Уменьшить количество: ${product.name}`} onClick={() => setCart(prev => changeQuantity(prev, product.id, -1))}><Minus size={15} /></button><span aria-live="polite">{quantity}</span><button disabled={quantity >= MAX_QUANTITY} aria-label={`Увеличить количество: ${product.name}`} onClick={() => setCart(prev => changeQuantity(prev, product.id, 1))}><Plus size={15} /></button></div><strong>{money(product.price * quantity)}</strong></div></div><button className="remove-item" aria-label={`Удалить: ${product.name}`} onClick={() => setCart(prev => prev.filter(row => row.productId !== product.id))}><Trash2 size={17} /></button></div>)}</div><div className="cart-summary"><div><span>Примерная стоимость</span><strong>{money(total)}</strong></div><p>Доставка, монтаж и дополнительные услуги рассчитываются отдельно. Наличие на дату пока не проверено.</p><button className="button button-primary full-width" onClick={() => setCheckoutStep('form')}>Перейти к оформлению <ArrowRight size={20} /></button><span className="demo-caption">Демо-режим: без оплаты и отправки заявки</span></div></>}
        {checkoutStep === 'form' && <form className="checkout-form" onSubmit={reviewInquiry} method="post"><button type="button" className="back-link" onClick={() => setCheckoutStep('cart')}>← Вернуться к подборке</button><div className="form-grid"><label>Как вас зовут *<input name="name" autoComplete="name" required maxLength={80} value={inquiry.name} onChange={e => setInquiry({ ...inquiry, name: e.target.value })} placeholder="Ваше имя" /></label><label>Телефон *<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={25} value={inquiry.phone} onChange={e => setInquiry({ ...inquiry, phone: e.target.value })} placeholder="+7 999 123-45-67" /></label><label>Дата свадьбы *<input name="date" type="date" min={localToday()} required defaultValue={inquiry.date} /></label><label>Количество гостей<input name="guests" type="number" min="1" max="2000" step="1" value={inquiry.guests} onChange={e => setInquiry({ ...inquiry, guests: e.target.value })} placeholder="Например, 40" /></label><label className="span-two">Площадка<input name="venue" maxLength={200} value={inquiry.venue} onChange={e => setInquiry({ ...inquiry, venue: e.target.value })} placeholder="Название или «пока выбираем»" /></label><label className="span-two">Что ещё нам стоит знать?<textarea name="comment" rows={3} maxLength={1500} value={inquiry.comment} onChange={e => setInquiry({ ...inquiry, comment: e.target.value })} placeholder="Пожелания по цвету, рассадке или декору" /></label></div><label className="consent-row" htmlFor="demo-acknowledgement"><Checkbox id="demo-acknowledgement" checked={acknowledged} onCheckedChange={setAcknowledged} /><span>Я понимаю, что это демонстрационный расчёт. Данные никуда не отправляются.</span></label>{formError && <p className="form-error" role="alert">{formError}</p>}<div className="form-total"><span>Ваша подборка</span><strong>{money(total)}</strong></div><button className="button button-primary full-width" type="submit">Посмотреть заявку <ArrowRight size={19} /></button><p className="demo-caption">Можно использовать вымышленные контактные данные.</p></form>}
        {checkoutStep === 'review' && <div className="review-content"><div className="review-status"><Check size={26} /><p>Вы собрали свой вариант свадьбы.<br />{' '}<strong>Ничего не отправлено.</strong></p></div><dl className="review-details"><div><dt>Имя</dt><dd>{inquiry.name}</dd></div><div><dt>Дата</dt><dd>{inquiry.date.split('-').reverse().join('.')}</dd></div><div><dt>Телефон</dt><dd>{inquiry.phone}</dd></div><div><dt>Площадка</dt><dd>{inquiry.venue || 'Пока выбираем'}</dd></div>{inquiry.guests && <div><dt>Гостей</dt><dd>{inquiry.guests}</dd></div>}</dl><div className="review-lines">{selectedProducts.map(({product,quantity}) => <div key={product.id}><span>{product.name} × {quantity}</span><strong>{money(product.price * quantity)}</strong></div>)}</div><div className="form-total"><span>Примерная сумма</span><strong>{money(total)}</strong></div><button className="button button-primary full-width" onClick={downloadSelection}>Скачать подборку <Download size={19} /></button><button className="button button-outline full-width" onClick={() => setCheckoutStep('form')}>Изменить данные</button><a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить с командой Амели <ArrowUpRight size={17} /></a></div>}
      </>}
    </SheetContent></Sheet>
  </>;
}
