# Амели Декор — свадебная витрина

[Открыть сайт](https://serviceameli.github.io/ameli-wedding-decor/) · [Каталог](https://serviceameli.github.io/ameli-wedding-decor/catalog/) · [Публикации](https://github.com/serviceameli/ameli-wedding-decor/actions/workflows/pages.yml)

Свадебный дизайн, разделы, избранное, комплектации и общая корзина. Товары, цены и составы поступают из API компании **«Амели декор», ID 30**. Компания фиксирована в коде.

## Запуск на компьютере

Нужны Node.js **22.23.0**, npm **10.x** и nvm.

```sh
nvm install
nvm use
npm ci
cp .env.example .env # только при первом запуске, если .env ещё нет
npm run dev
```

Откройте адрес из терминала. В следующий раз достаточно `nvm use` и `npm run dev`. Локальный каталог берётся из сохранённой выгрузки.

```sh
npm run doctor        # проверить компанию №30 и раздел «Высокие стойки»
npm run catalog:sync  # обновить данные из API
npm test
npm run lint
npm run build
npm run preview      # проверить готовую сборку
```

## Публикация

После отправки изменений в `main` workflow **Publish Ameli Decor** устанавливает зависимости, проверяет API, обновляет каталог, запускает проверки и публикует `dist` на GitHub Pages. Компьютер владельца для работы сайта не нужен.

Обновить только каталог можно кнопкой **Run workflow** на [странице публикаций](https://github.com/serviceameli/ameli-wedding-decor/actions/workflows/pages.yml). Изменения в базе сами по себе не запускают публикацию: данные обновляются при каждой сборке. Время обновления показано в каталоге. Если API или проверки недоступны, продолжает работать предыдущая версия сайта.

GitHub Pages использует **GitHub Actions**, согласно [официальной инструкции](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Ветка `gh-pages` сохранена как предыдущая версия. Для отката можно выбрать её корень в Settings → Pages или отменить коммит в `main` и повторить публикацию.

**Заявки, бронирование, личный кабинет и платежи не подключены.** Подборку можно скачать и обсудить с командой. Наличие на дату и итоговую стоимость подтверждает команда.

## Основные файлы

- `lib/catalog-api.ts` — GET-запросы, фиксированная компания, проверка полноты.
- `lib/catalog-import.ts` — преобразование публичных полей и связей вариантов.
- `scripts/sync-catalog.mjs` — обновление выгрузки после успешной проверки.
- `data/generated/catalog.json` — публичные данные витрины и дата обновления.
- `data/category-seed.ts` — прежние разделы; `data/categories.ts` — итоговое дерево.
- `data/fixtures.ts` — прежние демо-данные только для тестов.
- `app/page.tsx`, `components/catalog/` — интерфейс и корзина.
- `scripts/build-pages.mjs` — HTML для прямых ссылок и версия в `catalog-status.json`.
- `.github/workflows/pages.yml` — сборка и публикация.
- `docs/INTEGRATION.md` — ограничения и подробности подключения.

## Проект программиста

Приватный репозиторий находится отдельно в игнорируемой папке `work/ameli-dekor-site`. Его исходники и `.env` не публикуются здесь. Зависимости установлены, `npm run doctor` пройден, главная и `/catalog/vysokie-stojki` проверены на порту 3004. API этого раздела сейчас возвращает 0 товаров.

Повторный запуск:

```sh
cd work/ameli-dekor-site
nvm use
npm run dev
```
