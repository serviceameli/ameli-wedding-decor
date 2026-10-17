import { informationPages as pages, portfolioWorks as works } from '@/data/site-content';
import { useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Plus } from 'lucide-react';
import { asset } from '@/data/catalog';
import { siteHref } from '@/lib/navigation';

function NextStep() {
  return <section className="information-next page-width"><img className="information-next-object" src={asset('brand/invitation.png')} alt="" width="1080" height="1080" loading="lazy" /><div><p className="eyebrow">ВАШ СЛЕДУЮЩИЙ ШАГ</p><h2>Начните с одной зоны.</h2><p>Готовые сочетания, состав и стоимость в одном каталоге.</p></div><a className="button button-primary" href={siteHref('#wedding-zones')}>Выбрать декор <ArrowUpRight size={20} /></a></section>;
}

export function InformationPage({ page, questions }: { page: string; questions: string[][] }) {
  const current = pages[page];
  const art: Record<string, string> = { about: 'velvet-heart', 'how-it-works': 'invitation', portfolio: 'inspiration', faq: 'setting' };
  useEffect(() => { document.title = `${current.label} | Амели декор`; }, [current.label]);
  return <>
    <nav className="breadcrumb page-width" aria-label="Путь по сайту"><a href={siteHref()}>Главная</a><span aria-hidden="true">/</span><span aria-current="page">{current.label}</span></nav>
    <header className={`information-header page-width information-header-${page}`}><div className="information-header-copy"><p className="eyebrow">{current.label}</p><h1>{current.title}</h1><p>{current.intro}</p></div>{art[page] && <figure className="information-header-art" aria-hidden="true"><img src={asset(`brand/${art[page]}.png`)} alt="" width="1080" height="1080" /></figure>}</header>

    {page === 'about' && <>
      <section className="about-editorial page-width"><figure><img src={asset('story.jpg')} alt="Свадебный зал с мебелью, текстилем и декором Амели" width="1000" height="1250" /><figcaption>Событие из портфолио Амели</figcaption></figure><div className="information-copy"><p className="eyebrow">ОПЫТ В КАЖДОМ РЕШЕНИИ</p><h2>Сочетания уже продуманы.</h2><p>Готовые решения помогают выбрать оформление целиком: увидеть мебель, текстиль и сервировку вместе, сравнить составы и понять предварительный бюджет.</p><p>Начать можно с церемонии, гостевых столов, президиума или другой нужной зоны. Отдельные предметы доступны в общем каталоге и добавляются в ту же подборку.</p><div className="information-facts"><div><strong>13</strong><span>лет в декоре событий</span></div><div><strong>100+</strong><span>цветов в палитре текстиля</span></div></div><a className="text-link" href={siteHref('portfolio/')}>Посмотреть наши работы <ArrowUpRight size={18} /></a></div></section>
      <section className="information-principles page-width section-space"><p className="eyebrow">ЧТО ПОМОГАЕТ ВЫБИРАТЬ</p><div className="information-columns"><div><h3>Понятный состав</h3><p>В каждой комплектации указан список предметов и их количество. Дополнительные детали на фото могут не входить в комплект.</p></div><div><h3>Образ до свадьбы</h3><p>Для вашей площадки команда готовит визуализацию. Согласованный состав и визуализация становятся ориентиром для оформления.</p></div><div><h3>Ваш оттенок</h3><p>Цвет текстиля можно обсудить с командой. Наличие на дату и стоимость замены проверяются при подготовке предложения.</p></div></div></section>
    </>}

    {page === 'how-it-works' && <div className="information-process page-width">
      {[
        { title: 'Выберите зоны', text: 'Решите, что нужно вашей свадьбе: церемония, президиум, гостевые столы, композиции, лаунж, фотозона или фуршет. Начните с одной зоны и переходите к остальным в удобном порядке.', href: siteHref('#wedding-zones'), link: 'Посмотреть зоны' },
        { title: 'Сравните комплектации', text: 'Откройте готовое решение и переключайте варианты. У каждого варианта свои изображение, цена и состав. Посмотрите количество предметов и единицу расчёта: за комплект, зону или сервировку.', href: siteHref('#budget'), link: 'Попробовать на одном решении' },
        { title: 'Соберите подборку', text: 'Добавьте выбранное в «Мою свадьбу» и укажите количество. Корзина сохранится на этом устройстве. Можно заполнить демонстрационный расчёт и скачать подборку для обсуждения с командой.', href: siteHref('catalog/'), link: 'Открыть каталог' },
      ].map((step, index) => <section className="information-process-step" key={step.title}><span className="information-step-number">0{index + 1}</span><div><h2>{step.title}</h2><p>{step.text}</p><a className="text-link" href={step.href}>{step.link}<ArrowUpRight size={18} /></a></div></section>)}
      <section className="information-after"><p className="eyebrow">ПОСЛЕ ПОДБОРКИ</p><h2>Дальше подключается команда.</h2><p>Уточняются дата, площадка и количество гостей. Команда проверяет наличие, обсуждает визуализацию и итоговую стоимость, включая доставку, монтаж и дополнительные услуги. После согласования деталей можно перейти к бронированию.</p><p className="information-note">Подборка на сайте не создаёт заказ или бронь. Оплата и отправка заявки пока не подключены.</p><a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Обсудить подборку<ArrowUpRight size={18} /></a></section>
    </div>}

    {page === 'portfolio' && <section className="portfolio-page page-width"><div className="works-grid">{works.map((work, index) => <a className="work-card" href={work.sourceUrl} key={work.sourceUrl} target="_blank" rel="noreferrer"><figure><img src={asset(work.image)} alt={work.title} width="800" height="1000" loading="lazy" /><span>0{index + 1}<ArrowUpRight size={22} /></span></figure><h2>{work.title}</h2><p>{work.description}</p></a>)}</div><div className="portfolio-page-note"><p>На фотографиях показаны выполненные мероприятия. Флористика, свечи и другие детали могут дополнять готовые решения. Точный состав указан в выбранной комплектации.</p><a className="text-link" href="https://catalog.ameli-rental.ru/gallery" target="_blank" rel="noreferrer">Всё портфолио Амели <ArrowUpRight size={18} /></a></div></section>}

    {page === 'faq' && <section className="information-faq page-width"><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={20} /></summary><p>{answer}</p></details>)}</div><aside><p className="eyebrow">О ВАШЕЙ СВАДЬБЕ</p><h2>Остался вопрос?</h2><p>Для уточнения даты, состава или особенностей площадки свяжитесь с командой.</p><a className="text-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Написать в Telegram <ArrowUpRight size={18} /></a></aside></section>}

    {page === 'contacts' && <section className="contact-editorial page-width"><div className="contact-details"><p className="eyebrow">ОТДЕЛ ЗАБОТЫ О КЛИЕНТАХ</p><a className="contact-main-link" href="https://t.me/amelirental" target="_blank" rel="noreferrer">Написать в Telegram<ArrowUpRight size={28} /></a><p>Отправьте ссылку на решение или сохранённую подборку. Для расчёта понадобятся дата, площадка и количество гостей.</p><dl><div><dt>Телефон</dt><dd><a href="tel:+79850843855">+7 985 084-38-55</a></dd></div><div><dt>Электронная почта</dt><dd><a href="mailto:ameli.rental@gmail.com">ameli.rental@gmail.com</a></dd></div><div><dt>Клиентская линия</dt><dd>09:00–21:00</dd></div><div><dt>География свадебной коллекции</dt><dd>Москва и Московская область</dd></div></dl><a className="text-link" href={siteHref('faq/')}>Ответы перед выбором <ArrowRight size={18} /></a></div><figure className="contact-object"><img src={asset('contact-handset.png')} alt="" width="1024" height="1024" /></figure></section>}

    {page !== 'contacts' && <NextStep />}
    <nav className="information-navigation page-width" aria-label="Полезные страницы">{Object.entries(pages).filter(([key]) => key !== page).map(([key, item]) => <a key={key} href={siteHref(`${key}/`)}>{item.label}<ArrowUpRight size={16} /></a>)}</nav>
  </>;
}
