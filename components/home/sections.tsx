import { ArrowUpRight, ArrowRight, Check, Clock3, Eye, Layers3 } from 'lucide-react';
import { asset, money, type Product, type ProductVariant } from '@/data/catalog';
import { siteHref, productHref, categoryHref } from '@/lib/navigation';
import portfolio from '@/data/portfolio.json';
import { VariantPicker, CompositionList } from '@/components/catalog/products';

export function HomePackage({ product, variant, choose, add, selected }: { product: Product; variant: ProductVariant; choose: (id: string) => void; add: () => void; selected: boolean }) {
  return <section className="home-package page-width section-space" id="budget" data-sc-act="flow">
    <div className="section-heading"><div><p className="eyebrow">ПОПРОБУЙТЕ НА ОДНОМ РЕШЕНИИ</p><h2>Ваш стиль.<br /><em>Ваш бюджет.</em></h2></div><p>Один образ — несколько комплектаций.<br />Переключайте варианты и смотрите,<br />как меняются детали и стоимость.</p></div>
    <div className="package-example">
      <figure className="package-photo"><img src={asset(variant.image)} alt={`Готовое решение «${product.name}», ${variant.label}`} width="1000" height="900" loading="lazy" /><figcaption><span>ГОТОВОЕ СОЧЕТАНИЕ</span><span>{(product.variants.findIndex(v => v.id === variant.id) + 1).toString().padStart(2, '0')} / {product.variants.length.toString().padStart(2, '0')} КОМПЛЕКТАЦИИ</span></figcaption></figure>
      <div className="package-copy"><p className="eyebrow">КРУГЛЫЙ СТОЛ · 8 ГОСТЕЙ</p><h3>{product.name}</h3><p className="package-intro">Мебель и текстиль уже сочетаются. Вы решаете, сколько деталей добавить в свою свадьбу.</p>
        <VariantPicker product={product} variant={variant} choose={choose} surface="page" />
        <div className="package-price" aria-live="polite"><strong>{money(variant.price)}</strong><span>{variant.unit}<br />аренда {variant.rentalDays} дн.</span></div>
        <details className="package-composition" open><summary>Что входит в выбранный вариант <span>{variant.composition.length} поз.</span></summary><CompositionList variant={variant} compact /></details>
        <div className="package-actions"><button className="button button-primary" onClick={add}>{selected ? 'Добавить ещё комплект' : 'В мою свадьбу'}{selected ? <Check size={18} /> : <ArrowUpRight size={18} />}</button><a className="text-link" href={productHref(product.id, variant.id)}>Все детали решения <ArrowUpRight size={17} /></a></div>
        <p className="package-note">Цена за выбранный состав. Доставка и монтаж отдельно. Демо-каталог: наличие и итоговую стоимость подтверждает команда.</p>
      </div>
    </div>
  </section>;
}

export function HomeProof() {
  return <section className="home-proof" id="expectation" data-sc-act="flow"><div className="page-width section-space">
    <div className="proof-heading"><p className="eyebrow">ВЫ ЗАРАНЕЕ ЗНАЕТЕ, ЧТО ПОКУПАЕТЕ</p><h2>Ожидание <span className="equals-sign">=</span> <em>реальность.</em></h2><p>Мы делаем визуализации вашего декора на площадке.<br />Вы видите результат до свадьбы — и получаете оформление<br className="desktop-only" /> по согласованной визуализации и составу.</p></div>
    <div className="proof-images"><figure className="proof-concept"><div><img src={asset('product-18319.jpg')} alt="Визуализация сочетания «Тихий сад»: стол змейка, пшеничный текстиль и зелёные стулья" width="1200" height="805" loading="lazy" /><span className="proof-label">ГОТОВОЕ СОЧЕТАНИЕ</span></div><figcaption><span>01</span><p><strong>Видите сочетание целиком</strong>Мебель, текстиль и сервировка «Тихий сад».</p></figcaption></figure><figure className="proof-real"><div><img src={asset('editorial.jpg')} alt="Стол змейка с пшеничным текстилем и зелёными стульями на реальном мероприятии из портфолио Амели" width="905" height="1280" loading="lazy" /><span className="proof-label">НАСТОЯЩАЯ СВАДЬБА</span></div><figcaption><span>02</span><p><strong>Представляете свою площадку</strong>Те же сочетания в пространстве и свете зала.</p></figcaption></figure></div>
    <div className="proof-bottom"><p>Пример из портфолио Амели с деталями «Тихого сада». Флористика, свечи и оформление площадки на фото дополняют готовый комплект и рассчитываются отдельно.</p><a className="text-link" href={productHref('demo-18319')}>Рассмотреть «Тихий сад» <ArrowUpRight size={19} /></a></div>
    <div className="proof-promises"><div><Eye size={23} /><h3>Видеть, а не представлять</h3><p>Визуализация показывает, как выбранный декор будет смотреться на вашей площадке.</p></div><div><Layers3 size={23} /><h3>Знать каждую деталь</h3><p>В составе указаны предметы и количество. Понятно, что включено и что можно добавить.</p></div><div><Check size={23} /><h3>Получить согласованное</h3><p>Фиксируем оформление и состав до свадьбы. В день события воплощаем выбранное решение.</p></div></div>
  </div></section>;
}

const shades = [
  { color: '#e7e0ce', name: 'Молочный' }, { color: '#cdbc9e', name: 'Шампань' }, { color: '#b29b74', name: 'Пшеничный' },
  { color: '#b6b9a1', name: 'Шалфейный' }, { color: '#9aacae', name: 'Дымчато-голубой' }, { color: '#c9b3a9', name: 'Пудровый' },
];
export function HomePalette() {
  return <section className="home-palette section-space page-width" data-sc-act="flow"><div className="palette-copy"><p className="eyebrow">ГОТОВОЕ РЕШЕНИЕ. ВАШ ХАРАКТЕР.</p><h2>Более <em>100 цветов</em><br />в палитре текстиля.</h2><p>Сочетания мы уже продумали. Оттенок можно подобрать под вашу историю, площадку и цветы — без разработки декора с нуля.</p><a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Подобрать оттенок с нами <ArrowUpRight size={18} /></a></div><div className="textile-display"><div className="textile-swatches">{shades.map(shade => <div className="textile-swatch" key={shade.name}><div style={{ backgroundColor: shade.color }} /><span>{shade.name}</span></div>)}</div><p>Несколько направлений палитры. Точный оттенок и наличие текстиля подберём для вашей даты.</p></div></section>;
}

export function HomeAbout() {
  return <section className="story home-about" id="about" data-sc-act="flow"><div className="story-inner page-width"><figure className="story-image" data-sc-parallax="-0.45"><img src={asset('story.jpg')} alt="Свадебный зал с декором Амели: белая флористика, светлый текстиль и янтарные стулья" width="1000" height="1250" loading="lazy" /><figcaption>Событие из портфолио Амели</figcaption></figure><div className="story-copy" data-sc-in><p className="eyebrow">МЫ — АМЕЛИ ДЕКОР</p><h2><em>13 лет</em> в декоре.<br />Этот опыт —<br />в каждом решении.</h2><p>Мы работаем с мебелью, текстилем, сервировкой и декором для событий. Знаем, как детали складываются в целое — на фотографии и на площадке.</p><p>В «Амели Декор» собрали этот опыт в готовые решения для свадьбы. Чтобы вам не приходилось становиться декоратором, искать десятки отдельных предметов и начинать с чистого листа.</p><div className="about-facts"><div><strong>13</strong><span>лет в декоре</span></div><div><strong>100+</strong><span>цветов текстиля</span></div></div><a className="text-link light-link" href="#works">Посмотреть наши работы <ArrowUpRight size={20} /></a></div></div></section>;
}

const works = [
  { image: 'hero.jpg', title: 'Свет и белая флористика', text: 'Светлый текстиль, прозрачные детали и цветочные акценты.', source: 'https://catalog.ameli-rental.ru/gallery/1379' },
  ...portfolio.map(work => ({ image: work.image, title: work.title, text: work.description, source: work.sourceUrl })),
];
export function HomeWorks() {
  return <section className="home-works page-width section-space" id="works" data-sc-act="flow"><div className="section-heading"><div><p className="eyebrow">НАШИ РАБОТЫ</p><h2>Когда детали<br /><em>становятся событием.</em></h2></div><p>Настоящие мероприятия с декором Амели.<br />Смотрите, как мебель, текстиль и сервировка<br />работают вместе на разных площадках.</p></div><div className="works-grid">{works.map((work, i) => <a href={work.source} target="_blank" rel="noreferrer" key={work.source} className="work-card"><figure><img src={asset(work.image)} alt={work.title} width="800" height="1000" loading="lazy" /><span>0{i + 1} <ArrowUpRight size={22} /></span></figure><h3>{work.title}</h3><p>{work.text}</p></a>)}</div><div className="works-actions"><a className="text-link" href="https://catalog.ameli-rental.ru/gallery" target="_blank" rel="noreferrer">Больше работ в портфолио <ArrowUpRight size={18} /></a><a className="text-link" href={categoryHref('ceremony')}>Выбрать декор для церемонии <ArrowRight size={18} /></a></div></section>;
}

export function HomeProcess() {
  return <section id="how" className="home-process page-width section-space" data-sc-act="flow"><div className="section-heading"><div><p className="eyebrow">БЕЗ БЕСКОНЕЧНЫХ ПЕРЕПИСОК</p><h2>Три выбора.<br /><em>Подборка готова.</em></h2></div><div className="process-time"><Clock3 size={25} /><p><strong>Около 30 минут</strong><span>на выбор декора в каталоге</span></p></div></div><div className="selection-steps">{[
    { title: 'Выберите зоны', text: 'Церемония, столы для гостей, посуда и цветы. Начните с того, что нужно вашей свадьбе.', link: 'Выбрать первую зону', href: '#wedding-zones' },
    { title: 'Найдите свои комплекты', text: 'Смотрите готовые сочетания. Сравнивайте базовый, оптимальный и премиум по составу и цене.', link: 'Сравнить комплектации', href: '#budget' },
    { title: 'Соберите в корзину', text: 'Укажите количество комплектов. Вся подборка и предварительный бюджет будут в «Моей свадьбе».', link: 'Открыть каталог', href: siteHref('catalog/') },
  ].map((step, i) => <div className="selection-step" key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p><a className="text-link" href={step.href}>{step.link} <ArrowUpRight size={16} /></a></div>)}</div><div className="after-selection"><span>ДАЛЬШЕ МЫ ПОДХВАТИМ</span><p>Проверим дату и особенности площадки, подготовим визуализацию и итоговый расчёт. После подтверждения деталей — бронирование и оформление по согласованному плану.</p></div></section>;
}
