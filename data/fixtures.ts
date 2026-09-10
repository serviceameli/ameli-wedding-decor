import type { Product } from './types.ts';
// Snapshot for the frontend prototype, not a live inventory or booking feed.
export const demoProducts: Product[] = [
  {
    "id": "demo-ceremony-01",
    "name": "То самое «да»",
    "subtitle": "Церемония на 40 гостей, без флористики",
    "category": "ceremony",
    "image": "variants/23467.jpg",
    "palette": [
      "#f4f1e9",
      "#d7cfb7",
      "#728166"
    ],
    "tag": "Воздушная классика",
    "description": "Выберите посадочные места и оформление. У каждого варианта свои фотография, цена и состав.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/23467",
    "isDemo": true,
    "defaultVariantId": "23467",
    "variants": [
      {
        "id": "23467",
        "label": "40 гостей · скамейки",
        "price": 43000,
        "unit": "за зону на 40 гостей",
        "rentalDays": 3,
        "image": "variants/23467.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nНа скамейках с комфортом рассаживается 3-4 гостя.\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nЗона церемонии представлена без флористики. Флористики вы можете подобрать в разделе \"Флористика для зон церемонии\". Флористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа расчитывается после оформления заказа",
        "composition": [
          {
            "id": "12197",
            "name": "Скамейка складная \"Флэт\" кокосовый раф бархат",
            "quantity": 10,
            "image": "components/12197.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/skamejki-pxt/12197"
          },
          {
            "id": "19133",
            "name": "Задник \"Белатрикс\" с драпировкой, жемчужный бархат",
            "quantity": 1,
            "image": "components/19133.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19133"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/23467"
      },
      {
        "id": "20040",
        "label": "28 гостей · пуфы",
        "price": 54800,
        "unit": "за зону на 28 гостей",
        "rentalDays": 3,
        "image": "variants/20040.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nЗона церемонии представлена без флористики. Флористики вы можете подобрать в разделе \"Флористика для зон церемонии\". Флористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа расчитывается после оформления заказа",
        "composition": [
          {
            "id": "10163",
            "name": "Пуфик \"Фуфик\" мини фиолетовый люпин бархат",
            "quantity": 28,
            "image": "components/10163.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/pufy-fufik-znh-byq-zef-qay-fbe-qwg-knd-oea/10163"
          },
          {
            "id": "19134",
            "name": "Задник \"Белатрикс\" с драпировкой, бледно-розовый бархат",
            "quantity": 1,
            "image": "components/19134.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19134"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/20040"
      },
      {
        "id": "20790",
        "label": "40 гостей · с цветами",
        "price": 88040,
        "unit": "за зону на 40 гостей",
        "rentalDays": 3,
        "image": "variants/20790.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nФлористика белая из декоративных цветов (можно добавить цветные акценты)\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nФлористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа рассчитывается после оформления заказа",
        "composition": [
          {
            "id": "5367",
            "name": "Пуфик \"Фуфик\" мини кокосовый раф бархат",
            "quantity": 40,
            "image": "components/5367.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/pufy-fufik-znh-byq-zef-qay-fbe-qwg-knd-oea/5367"
          },
          {
            "id": "19136",
            "name": "Задник \"Белатрикс\" с драпировкой, кокосовый раф бархат",
            "quantity": 1,
            "image": "components/19136.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19136"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          },
          {
            "id": "20061",
            "name": "Флористическая композиция к зоне церемонии Белатрикс из декоративных цветов",
            "quantity": 1,
            "image": "components/20061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/floristicheskie-kompozitsii-tehnicheskaja-kategorija-amh/20061"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/20790"
      }
    ]
  },
  {
    "id": "demo-table-01",
    "name": "Изысканный жемчуг",
    "subtitle": "Сервировка и оформление на 8 гостей",
    "category": "round-tables",
    "image": "variants/17906.jpg",
    "palette": [
      "#f2eee4",
      "#b9ac8e",
      "#e7d9ce"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-bop/17906",
    "isDemo": true,
    "defaultVariantId": "17906",
    "variants": [
      {
        "id": "17906",
        "label": "Базовый",
        "price": 13780,
        "unit": "за комплект на 8 гостей",
        "rentalDays": 3,
        "image": "variants/17906.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "5799",
            "name": "Скатерть бархатная \"Бета\" жемчужная круглая",
            "quantity": 1,
            "image": "components/5799.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/kruglye-skaterti-azl-nmg-ear/5799"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 8,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 8,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-bop/17906"
      },
      {
        "id": "17907",
        "label": "Оптимальный",
        "price": 16420,
        "unit": "за комплект на 8 гостей",
        "rentalDays": 3,
        "image": "variants/17907.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3098",
            "name": "Бокал \"Лавлейс\" прозрачный винный",
            "quantity": 8,
            "image": "components/3098.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3098"
          },
          {
            "id": "5799",
            "name": "Скатерть бархатная \"Бета\" жемчужная круглая",
            "quantity": 1,
            "image": "components/5799.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/kruglye-skaterti-azl-nmg-ear/5799"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 8,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 8,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "11206",
            "name": "Тарелка \"Кюри\" белая большая",
            "quantity": 8,
            "image": "components/11206.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11206"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-bop/17907"
      },
      {
        "id": "17908",
        "label": "Премиум",
        "price": 21100,
        "unit": "за комплект на 8 гостей",
        "rentalDays": 3,
        "image": "variants/17908.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2923",
            "name": "Набор приборов \"Сафо\" золотых 2 шт",
            "quantity": 8,
            "image": "components/2923.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2923"
          },
          {
            "id": "3093",
            "name": "Стакан \"Лавлейс\" прозрачный",
            "quantity": 8,
            "image": "components/3093.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3093"
          },
          {
            "id": "3096",
            "name": "Бокал \"Лавлейс\" прозрачный под шампанское",
            "quantity": 8,
            "image": "components/3096.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3096"
          },
          {
            "id": "3098",
            "name": "Бокал \"Лавлейс\" прозрачный винный",
            "quantity": 8,
            "image": "components/3098.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3098"
          },
          {
            "id": "5799",
            "name": "Скатерть бархатная \"Бета\" жемчужная круглая",
            "quantity": 1,
            "image": "components/5799.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/kruglye-skaterti-azl-nmg-ear/5799"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 8,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 8,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "11207",
            "name": "Набор тарелок \"Кюри\" белых",
            "quantity": 8,
            "image": "components/11207.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11207"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-bop/17908"
      }
    ]
  },
  {
    "id": "demo-ceremony-02",
    "name": "Белый сад",
    "subtitle": "Белые цветы и мягкие драпировки",
    "category": "ceremony",
    "image": "variants/20790.jpg",
    "palette": [
      "#f2f0e6",
      "#718261",
      "#d8cfb7"
    ],
    "tag": "Романтичное настроение",
    "description": "Выберите посадочные места и оформление. У каждого варианта свои фотография, цена и состав.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/20790",
    "isDemo": true,
    "defaultVariantId": "20790",
    "variants": [
      {
        "id": "20790",
        "label": "40 гостей · с цветами",
        "price": 88040,
        "unit": "за зону на 40 гостей",
        "rentalDays": 3,
        "image": "variants/20790.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nФлористика белая из декоративных цветов (можно добавить цветные акценты)\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nФлористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа рассчитывается после оформления заказа",
        "composition": [
          {
            "id": "5367",
            "name": "Пуфик \"Фуфик\" мини кокосовый раф бархат",
            "quantity": 40,
            "image": "components/5367.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/pufy-fufik-znh-byq-zef-qay-fbe-qwg-knd-oea/5367"
          },
          {
            "id": "19136",
            "name": "Задник \"Белатрикс\" с драпировкой, кокосовый раф бархат",
            "quantity": 1,
            "image": "components/19136.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19136"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          },
          {
            "id": "20061",
            "name": "Флористическая композиция к зоне церемонии Белатрикс из декоративных цветов",
            "quantity": 1,
            "image": "components/20061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/floristicheskie-kompozitsii-tehnicheskaja-kategorija-amh/20061"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/20790"
      },
      {
        "id": "20040",
        "label": "28 гостей · пуфы",
        "price": 54800,
        "unit": "за зону на 28 гостей",
        "rentalDays": 3,
        "image": "variants/20040.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nЗона церемонии представлена без флористики. Флористики вы можете подобрать в разделе \"Флористика для зон церемонии\". Флористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа расчитывается после оформления заказа",
        "composition": [
          {
            "id": "10163",
            "name": "Пуфик \"Фуфик\" мини фиолетовый люпин бархат",
            "quantity": 28,
            "image": "components/10163.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/pufy-fufik-znh-byq-zef-qay-fbe-qwg-knd-oea/10163"
          },
          {
            "id": "19134",
            "name": "Задник \"Белатрикс\" с драпировкой, бледно-розовый бархат",
            "quantity": 1,
            "image": "components/19134.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19134"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/20040"
      },
      {
        "id": "20059",
        "label": "40 гостей · пуфы",
        "price": 65000,
        "unit": "за зону на 40 гостей",
        "rentalDays": 3,
        "image": "variants/20059.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nЗона церемонии представлена без флористики. Флористики вы можете подобрать в разделе \"Флористика для зон церемонии\". Флористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа расчитывается после оформления заказа",
        "composition": [
          {
            "id": "9971",
            "name": "Пуфик \"Фуфик\" мини жемчужный бархат",
            "quantity": 40,
            "image": "components/9971.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/pufy-fufik-znh-byq-zef-qay-fbe-qwg-knd-oea/9971"
          },
          {
            "id": "19133",
            "name": "Задник \"Белатрикс\" с драпировкой, жемчужный бархат",
            "quantity": 1,
            "image": "components/19133.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19133"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/20059"
      },
      {
        "id": "23467",
        "label": "40 гостей · скамейки",
        "price": 43000,
        "unit": "за зону на 40 гостей",
        "rentalDays": 3,
        "image": "variants/23467.jpg",
        "description": "Зона церемонии может быть выполнена в любой цветовой гамме.\n\nНа скамейках с комфортом рассаживается 3-4 гостя.\n\nВы можете изменить количество и тип посадочных мест (ознакомьтесь с ассортиментом пуфов и стульев в нашем каталоге).\n\nЗона церемонии представлена без флористики. Флористики вы можете подобрать в разделе \"Флористика для зон церемонии\". Флористические композиции мы делаем только при заказе оформления мероприятия под ключ. За подробностями обращайтесь к менеджеру\n\nОбратите внимание - стоимость зоны церемонии указана без учета монтажа. Стоимость доставки и монтажа расчитывается после оформления заказа",
        "composition": [
          {
            "id": "12197",
            "name": "Скамейка складная \"Флэт\" кокосовый раф бархат",
            "quantity": 10,
            "image": "components/12197.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/skamejki-pxt/12197"
          },
          {
            "id": "19133",
            "name": "Задник \"Белатрикс\" с драпировкой, жемчужный бархат",
            "quantity": 1,
            "image": "components/19133.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/19133"
          },
          {
            "id": "20039",
            "name": "Бархат для дорожки 10м",
            "quantity": 1,
            "image": "components/20039.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/arki-s-drapirovkoj-xfx/20039"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/zony-tseremonii-fow/23467"
      }
    ]
  },
  {
    "id": "demo-setting-01",
    "name": "Красота в деталях",
    "subtitle": "Сервировка, которую хочется рассматривать",
    "category": "settings",
    "image": "variants/6263.jpg",
    "palette": [
      "#f3f1eb",
      "#c6ad6c",
      "#d0c8b6"
    ],
    "description": "Посуда, бокалы, приборы и салфетка в одной палитре. Добавьте столько комплектов, сколько будет гостей.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6263",
    "isDemo": true,
    "defaultVariantId": "6263",
    "variants": [
      {
        "id": "6263",
        "label": "Комплект",
        "price": 1380,
        "unit": "на одного гостя",
        "rentalDays": 3,
        "image": "variants/6263.jpg",
        "description": "Ложка не входит в сет, вы можете добавить ее отдельно",
        "composition": [
          {
            "id": "2826",
            "name": "Нож десертный \"Сафо\" золотой",
            "quantity": 1,
            "image": "components/2826.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2826"
          },
          {
            "id": "2828",
            "name": "Нож столовый \"Сафо\" золотой",
            "quantity": 1,
            "image": "components/2828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2828"
          },
          {
            "id": "2830",
            "name": "Вилка десертная \"Сафо\" золотая",
            "quantity": 1,
            "image": "components/2830.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2830"
          },
          {
            "id": "2832",
            "name": "Вилка столовая \"Сафо\" золотая",
            "quantity": 1,
            "image": "components/2832.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2832"
          },
          {
            "id": "3034",
            "name": "Стакан \"Роулинг\" светло-голубой",
            "quantity": 1,
            "image": "components/3034.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3034"
          },
          {
            "id": "3036",
            "name": "Бокал \"Роулинг\" светло-голубой под шампанское",
            "quantity": 1,
            "image": "components/3036.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3036"
          },
          {
            "id": "3037",
            "name": "Бокал \"Роулинг\" светло-голубой винный",
            "quantity": 1,
            "image": "components/3037.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3037"
          },
          {
            "id": "3516",
            "name": "Кольцо для салфетки \"Гюго\"",
            "quantity": 1,
            "image": "components/3516.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/koltsa-dlja-salfetok-fnm-nhx/3516"
          },
          {
            "id": "3632",
            "name": "Салфетка бархатная \"Бета\" голубой сапфир",
            "quantity": 1,
            "image": "components/3632.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/3632"
          },
          {
            "id": "4166",
            "name": "Тарелка \"Вульф\" белая большая",
            "quantity": 1,
            "image": "components/4166.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4166"
          },
          {
            "id": "4170",
            "name": "Тарелка \"Вульф\" белая малая",
            "quantity": 1,
            "image": "components/4170.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4170"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6263"
      }
    ]
  },
  {
    "id": "demo-table-02",
    "name": "Жемчужная линия",
    "subtitle": "Сервировка и оформление на 10 гостей",
    "category": "snake-tables",
    "image": "variants/20992.jpg",
    "palette": [
      "#e8e5dc",
      "#66735c",
      "#b3a88e"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/20992",
    "isDemo": true,
    "defaultVariantId": "20992",
    "variants": [
      {
        "id": "20992",
        "label": "Базовый",
        "price": 24650,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/20992.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 10,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 10,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "6548",
            "name": "Скатерть бархатная \"Бета+\" жемчужная прямоугольная",
            "quantity": 2,
            "image": "components/6548.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/6548"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/20992"
      },
      {
        "id": "20993",
        "label": "Оптимальный",
        "price": 27950,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/20992.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "3098",
            "name": "Бокал \"Лавлейс\" прозрачный винный",
            "quantity": 10,
            "image": "components/3098.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3098"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 10,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 10,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "6548",
            "name": "Скатерть бархатная \"Бета+\" жемчужная прямоугольная",
            "quantity": 2,
            "image": "components/6548.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/6548"
          },
          {
            "id": "11206",
            "name": "Тарелка \"Кюри\" белая большая",
            "quantity": 10,
            "image": "components/11206.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11206"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/20993"
      },
      {
        "id": "20994",
        "label": "Премиум",
        "price": 33800,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/20992.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2923",
            "name": "Набор приборов \"Сафо\" золотых 2 шт",
            "quantity": 10,
            "image": "components/2923.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2923"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "3093",
            "name": "Стакан \"Лавлейс\" прозрачный",
            "quantity": 10,
            "image": "components/3093.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3093"
          },
          {
            "id": "3096",
            "name": "Бокал \"Лавлейс\" прозрачный под шампанское",
            "quantity": 10,
            "image": "components/3096.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3096"
          },
          {
            "id": "3098",
            "name": "Бокал \"Лавлейс\" прозрачный винный",
            "quantity": 10,
            "image": "components/3098.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3098"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 10,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 10,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "6548",
            "name": "Скатерть бархатная \"Бета+\" жемчужная прямоугольная",
            "quantity": 2,
            "image": "components/6548.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/6548"
          },
          {
            "id": "11205",
            "name": "Тарелка \"Кюри\" белая малая",
            "quantity": 10,
            "image": "components/11205.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11205"
          },
          {
            "id": "11206",
            "name": "Тарелка \"Кюри\" белая большая",
            "quantity": 10,
            "image": "components/11206.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11206"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/20994"
      }
    ]
  },
  {
    "id": "demo-flowers-01",
    "name": "Белая Хапи",
    "subtitle": "Последний штрих к вашему столу",
    "category": "flowers",
    "image": "variants/20051.jpg",
    "palette": [
      "#f2f0e8",
      "#96a082",
      "#d7c2b6"
    ],
    "description": "Нежный акцент для гостевого стола или зоны встречи гостей. Тип цветов, размер и сезонность уточняются при подборе.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/kompozitsii-na-stoly-ivp/20051",
    "isDemo": true,
    "defaultVariantId": "20051",
    "variants": [
      {
        "id": "20051",
        "label": "Комплект",
        "price": 11350,
        "unit": "за композицию",
        "rentalDays": 3,
        "image": "variants/20051.jpg",
        "description": "Флористическая композиция на низкой подставке из сезонных цветов. Может быть выполнена в цветовой гамме на выбор.\n\nПодставка может быть золотого, серебряного, белого или черного цвета.\n\nОбращаем ваше внимание, что флористическую композицию можно заказать только при комплексном оформлении мероприятия.",
        "composition": [
          {
            "id": "20051",
            "name": "Флористическая композиция Хапи белая",
            "quantity": 1,
            "image": "variants/20051.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/kompozitsii-na-stoly-ivp/20051"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/kompozitsii-na-stoly-ivp/20051"
      }
    ]
  },
  {
    "id": "demo-18319",
    "name": "Тихий сад",
    "subtitle": "Сервировка и оформление на 10 гостей",
    "category": "snake-tables",
    "image": "variants/18319.jpg",
    "palette": [
      "#f1eee7",
      "#7f8a70",
      "#c4b896"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/18319",
    "isDemo": true,
    "defaultVariantId": "18319",
    "variants": [
      {
        "id": "18319",
        "label": "Базовый",
        "price": 23814,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/18319.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3061",
            "name": "Скатерть канвас \"Гамма+\" пшеничная прямоугольная",
            "quantity": 2,
            "image": "components/3061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/3061"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "5812",
            "name": "Салфетка бархатная \"Бета\" зеленый чай",
            "quantity": 10,
            "image": "components/5812.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5812"
          },
          {
            "id": "6828",
            "name": "Стул \"Вашингтон\" серебряный, зеленый чай бархат",
            "quantity": 10,
            "image": "components/6828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6828"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/18319"
      },
      {
        "id": "18320",
        "label": "Оптимальный",
        "price": 27214,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/18319.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2845",
            "name": "Бокал \"Роулинг\" зеленый винный",
            "quantity": 10,
            "image": "components/2845.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2845"
          },
          {
            "id": "3061",
            "name": "Скатерть канвас \"Гамма+\" пшеничная прямоугольная",
            "quantity": 2,
            "image": "components/3061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/3061"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "4780",
            "name": "Тарелка \"Барто\" прозрачная с черным кантом",
            "quantity": 10,
            "image": "components/4780.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4780"
          },
          {
            "id": "5812",
            "name": "Салфетка бархатная \"Бета\" зеленый чай",
            "quantity": 10,
            "image": "components/5812.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5812"
          },
          {
            "id": "6828",
            "name": "Стул \"Вашингтон\" серебряный, зеленый чай бархат",
            "quantity": 10,
            "image": "components/6828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6828"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/18320"
      },
      {
        "id": "18321",
        "label": "Премиум",
        "price": 32114,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/18319.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2850",
            "name": "Набор бокалов \"Роулинг\" зеленых",
            "quantity": 10,
            "image": "components/2850.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2850"
          },
          {
            "id": "2968",
            "name": "Набор приборов \"Сафо\" черных 2 шт",
            "quantity": 10,
            "image": "components/2968.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2968"
          },
          {
            "id": "3061",
            "name": "Скатерть канвас \"Гамма+\" пшеничная прямоугольная",
            "quantity": 2,
            "image": "components/3061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/3061"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "4780",
            "name": "Тарелка \"Барто\" прозрачная с черным кантом",
            "quantity": 10,
            "image": "components/4780.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4780"
          },
          {
            "id": "5812",
            "name": "Салфетка бархатная \"Бета\" зеленый чай",
            "quantity": 10,
            "image": "components/5812.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5812"
          },
          {
            "id": "6828",
            "name": "Стул \"Вашингтон\" серебряный, зеленый чай бархат",
            "quantity": 10,
            "image": "components/6828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6828"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/18321"
      }
    ]
  },
  {
    "id": "demo-23528",
    "name": "Мария Антуанетта",
    "subtitle": "Сервировка и оформление на 10 гостей",
    "category": "snake-tables",
    "image": "variants/23528.jpg",
    "palette": [
      "#f1eee7",
      "#b1afa6",
      "#a2906f"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23528",
    "isDemo": true,
    "defaultVariantId": "23528",
    "variants": [
      {
        "id": "23528",
        "label": "Базовый",
        "price": 24450,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/23528.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "4117",
            "name": "Скатерть \"Шелк+\" кремовая прямоугольная",
            "quantity": 2,
            "image": "components/4117.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/4117"
          },
          {
            "id": "6796",
            "name": "Стул \"Вашингтон\" золотой, аквамарин бархат",
            "quantity": 10,
            "image": "components/6796.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6796"
          },
          {
            "id": "11692",
            "name": "Салфетка \"Каппа\" Диор синяя",
            "quantity": 10,
            "image": "components/11692.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/11692"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23528"
      },
      {
        "id": "23529",
        "label": "Оптимальный",
        "price": 28950,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/23528.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2862",
            "name": "Бокал \"Санд\" с золотым кантом винный",
            "quantity": 10,
            "image": "components/2862.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2862"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "4117",
            "name": "Скатерть \"Шелк+\" кремовая прямоугольная",
            "quantity": 2,
            "image": "components/4117.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/4117"
          },
          {
            "id": "6796",
            "name": "Стул \"Вашингтон\" золотой, аквамарин бархат",
            "quantity": 10,
            "image": "components/6796.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6796"
          },
          {
            "id": "11207",
            "name": "Набор тарелок \"Кюри\" белых",
            "quantity": 10,
            "image": "components/11207.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11207"
          },
          {
            "id": "11692",
            "name": "Салфетка \"Каппа\" Диор синяя",
            "quantity": 10,
            "image": "components/11692.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/11692"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23529"
      },
      {
        "id": "23530",
        "label": "Премиум",
        "price": 33600,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 3,
        "image": "variants/23528.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2864",
            "name": "Набор бокалов \"Санд\" с золотым кантом",
            "quantity": 10,
            "image": "components/2864.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2864"
          },
          {
            "id": "2923",
            "name": "Набор приборов \"Сафо\" золотых 2 шт",
            "quantity": 10,
            "image": "components/2923.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2923"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "4117",
            "name": "Скатерть \"Шелк+\" кремовая прямоугольная",
            "quantity": 2,
            "image": "components/4117.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/4117"
          },
          {
            "id": "6796",
            "name": "Стул \"Вашингтон\" золотой, аквамарин бархат",
            "quantity": 10,
            "image": "components/6796.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6796"
          },
          {
            "id": "11207",
            "name": "Набор тарелок \"Кюри\" белых",
            "quantity": 10,
            "image": "components/11207.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11207"
          },
          {
            "id": "11692",
            "name": "Салфетка \"Каппа\" Диор синяя",
            "quantity": 10,
            "image": "components/11692.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/11692"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23530"
      }
    ]
  },
  {
    "id": "demo-23519",
    "name": "Розовый пломбир",
    "subtitle": "Сервировка и оформление на 10 гостей",
    "category": "snake-tables",
    "image": "variants/23519.jpg",
    "palette": [
      "#f3eee7",
      "#d8bebc",
      "#b4a789"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23519",
    "isDemo": true,
    "defaultVariantId": "23519",
    "variants": [
      {
        "id": "23519",
        "label": "Базовый",
        "price": 18400,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 2,
        "image": "variants/23519.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "5689",
            "name": "Салфетка \"Альфа\" пломбир",
            "quantity": 10,
            "image": "components/5689.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5689"
          },
          {
            "id": "5772",
            "name": "Скатерть бархатная \"Бета+\" бледно-розовая прямоугольная",
            "quantity": 2,
            "image": "components/5772.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/5772"
          },
          {
            "id": "6788",
            "name": "Стул \"Гост\" прозрачный",
            "quantity": 10,
            "image": "components/6788.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-swe-aoa-dld-qkt-ddo/6788"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23519"
      },
      {
        "id": "23520",
        "label": "Оптимальный",
        "price": 21500,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 2,
        "image": "variants/23519.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2893",
            "name": "Бокал \"Шелли\" с золотым кантом винный",
            "quantity": 10,
            "image": "components/2893.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2893"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "5689",
            "name": "Салфетка \"Альфа\" пломбир",
            "quantity": 10,
            "image": "components/5689.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5689"
          },
          {
            "id": "5772",
            "name": "Скатерть бархатная \"Бета+\" бледно-розовая прямоугольная",
            "quantity": 2,
            "image": "components/5772.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/5772"
          },
          {
            "id": "5824",
            "name": "Тарелка \"Барто\" прозрачная с золотым кантом",
            "quantity": 10,
            "image": "components/5824.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/5824"
          },
          {
            "id": "6788",
            "name": "Стул \"Гост\" прозрачный",
            "quantity": 10,
            "image": "components/6788.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-swe-aoa-dld-qkt-ddo/6788"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23520"
      },
      {
        "id": "23521",
        "label": "Премиум",
        "price": 26000,
        "unit": "за комплект на 10 гостей",
        "rentalDays": 2,
        "image": "variants/23519.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2899",
            "name": "Набор бокалов \"Шелли\"",
            "quantity": 10,
            "image": "components/2899.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2899"
          },
          {
            "id": "2923",
            "name": "Набор приборов \"Сафо\" золотых 2 шт",
            "quantity": 10,
            "image": "components/2923.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2923"
          },
          {
            "id": "3065",
            "name": "Банкетный стол \"Вольф\" змейка 2 части белый",
            "quantity": 1,
            "image": "components/3065.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/banketnye-stoly-vfa-zoq-mlk-swm/3065"
          },
          {
            "id": "5689",
            "name": "Салфетка \"Альфа\" пломбир",
            "quantity": 10,
            "image": "components/5689.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5689"
          },
          {
            "id": "5772",
            "name": "Скатерть бархатная \"Бета+\" бледно-розовая прямоугольная",
            "quantity": 2,
            "image": "components/5772.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/5772"
          },
          {
            "id": "5824",
            "name": "Тарелка \"Барто\" прозрачная с золотым кантом",
            "quantity": 10,
            "image": "components/5824.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/5824"
          },
          {
            "id": "6788",
            "name": "Стул \"Гост\" прозрачный",
            "quantity": 10,
            "image": "components/6788.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-swe-aoa-dld-qkt-ddo/6788"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/gostevye-stoly-zmejki-jjv/23521"
      }
    ]
  },
  {
    "id": "demo-20989",
    "name": "Жемчужный ужин",
    "subtitle": "Сервировка и оформление на 6 гостей",
    "category": "rectangular-tables",
    "image": "variants/20989.jpg",
    "palette": [
      "#f1eee7",
      "#b1afa6",
      "#a2906f"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/20989",
    "isDemo": true,
    "defaultVariantId": "20989",
    "variants": [
      {
        "id": "20989",
        "label": "Базовый",
        "price": 11260,
        "unit": "за комплект на 6 гостей",
        "rentalDays": 3,
        "image": "variants/20989.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 6,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 6,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "6548",
            "name": "Скатерть бархатная \"Бета+\" жемчужная прямоугольная",
            "quantity": 1,
            "image": "components/6548.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/6548"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/20989"
      },
      {
        "id": "20990",
        "label": "Оптимальный",
        "price": 13240,
        "unit": "за комплект на 6 гостей",
        "rentalDays": 3,
        "image": "variants/20989.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3098",
            "name": "Бокал \"Лавлейс\" прозрачный винный",
            "quantity": 6,
            "image": "components/3098.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3098"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 6,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 6,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "6548",
            "name": "Скатерть бархатная \"Бета+\" жемчужная прямоугольная",
            "quantity": 1,
            "image": "components/6548.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/6548"
          },
          {
            "id": "11206",
            "name": "Тарелка \"Кюри\" белая большая",
            "quantity": 6,
            "image": "components/11206.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11206"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/20990"
      },
      {
        "id": "20991",
        "label": "Премиум",
        "price": 15950,
        "unit": "за комплект на 6 гостей",
        "rentalDays": 3,
        "image": "variants/20989.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2923",
            "name": "Набор приборов \"Сафо\" золотых 2 шт",
            "quantity": 6,
            "image": "components/2923.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2923"
          },
          {
            "id": "3093",
            "name": "Стакан \"Лавлейс\" прозрачный",
            "quantity": 1,
            "image": "components/3093.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3093"
          },
          {
            "id": "3096",
            "name": "Бокал \"Лавлейс\" прозрачный под шампанское",
            "quantity": 6,
            "image": "components/3096.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3096"
          },
          {
            "id": "3098",
            "name": "Бокал \"Лавлейс\" прозрачный винный",
            "quantity": 6,
            "image": "components/3098.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3098"
          },
          {
            "id": "5803",
            "name": "Салфетка бархатная \"Бета\" жемчужная",
            "quantity": 6,
            "image": "components/5803.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5803"
          },
          {
            "id": "6145",
            "name": "Стул \"Вашингтон\" золотой, жемчужный бархат",
            "quantity": 6,
            "image": "components/6145.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6145"
          },
          {
            "id": "6548",
            "name": "Скатерть бархатная \"Бета+\" жемчужная прямоугольная",
            "quantity": 1,
            "image": "components/6548.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/6548"
          },
          {
            "id": "11205",
            "name": "Тарелка \"Кюри\" белая малая",
            "quantity": 6,
            "image": "components/11205.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11205"
          },
          {
            "id": "11206",
            "name": "Тарелка \"Кюри\" белая большая",
            "quantity": 6,
            "image": "components/11206.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/11206"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/20991"
      }
    ]
  },
  {
    "id": "demo-18316",
    "name": "Лесная тишина",
    "subtitle": "Сервировка и оформление на 6 гостей",
    "category": "rectangular-tables",
    "image": "variants/18316.jpg",
    "palette": [
      "#f1eee7",
      "#7f8a70",
      "#c4b896"
    ],
    "description": "Готовое сочетание мебели, текстиля и сервировки. Выберите комплектацию: точный состав и количество предметов указаны ниже.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/18316",
    "isDemo": true,
    "defaultVariantId": "18316",
    "variants": [
      {
        "id": "18316",
        "label": "Базовый",
        "price": 10842,
        "unit": "за комплект на 6 гостей",
        "rentalDays": 3,
        "image": "variants/18316.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "3061",
            "name": "Скатерть канвас \"Гамма+\" пшеничная прямоугольная",
            "quantity": 1,
            "image": "components/3061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/3061"
          },
          {
            "id": "5812",
            "name": "Салфетка бархатная \"Бета\" зеленый чай",
            "quantity": 6,
            "image": "components/5812.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5812"
          },
          {
            "id": "6828",
            "name": "Стул \"Вашингтон\" серебряный, зеленый чай бархат",
            "quantity": 6,
            "image": "components/6828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6828"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/18316"
      },
      {
        "id": "18317",
        "label": "Оптимальный",
        "price": 12882,
        "unit": "за комплект на 6 гостей",
        "rentalDays": 3,
        "image": "variants/18316.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2845",
            "name": "Бокал \"Роулинг\" зеленый винный",
            "quantity": 6,
            "image": "components/2845.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2845"
          },
          {
            "id": "3061",
            "name": "Скатерть канвас \"Гамма+\" пшеничная прямоугольная",
            "quantity": 1,
            "image": "components/3061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/3061"
          },
          {
            "id": "4780",
            "name": "Тарелка \"Барто\" прозрачная с черным кантом",
            "quantity": 6,
            "image": "components/4780.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4780"
          },
          {
            "id": "5812",
            "name": "Салфетка бархатная \"Бета\" зеленый чай",
            "quantity": 6,
            "image": "components/5812.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5812"
          },
          {
            "id": "6828",
            "name": "Стул \"Вашингтон\" серебряный, зеленый чай бархат",
            "quantity": 6,
            "image": "components/6828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6828"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/18317"
      },
      {
        "id": "18318",
        "label": "Премиум",
        "price": 15822,
        "unit": "за комплект на 6 гостей",
        "rentalDays": 3,
        "image": "variants/18316.jpg",
        "description": "Изображение демонстрирует общий стиль оформления стола и пример возможной сервировки.\nФактический состав и стоимость зависят от выбранного варианта — Базовый, Оптимальный или Премиум. \nТочный набор предметов и итоговая цена указаны в карточке выбранного варианта товара.\n\nОбратите внимание, что цвет и фактура изделий на изображении могут незначительно отличаться. \nДля точной информации ориентируйтесь на карточки конкретных товаров.",
        "composition": [
          {
            "id": "2850",
            "name": "Набор бокалов \"Роулинг\" зеленых",
            "quantity": 6,
            "image": "components/2850.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2850"
          },
          {
            "id": "2968",
            "name": "Набор приборов \"Сафо\" черных 2 шт",
            "quantity": 6,
            "image": "components/2968.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2968"
          },
          {
            "id": "3061",
            "name": "Скатерть канвас \"Гамма+\" пшеничная прямоугольная",
            "quantity": 1,
            "image": "components/3061.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-skaterti-ybl-hyk-brm/3061"
          },
          {
            "id": "4780",
            "name": "Тарелка \"Барто\" прозрачная с черным кантом",
            "quantity": 6,
            "image": "components/4780.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4780"
          },
          {
            "id": "5812",
            "name": "Салфетка бархатная \"Бета\" зеленый чай",
            "quantity": 6,
            "image": "components/5812.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5812"
          },
          {
            "id": "6828",
            "name": "Стул \"Вашингтон\" серебряный, зеленый чай бархат",
            "quantity": 6,
            "image": "components/6828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stulja-vashington-tme-wpx-ena-dci-xdv/6828"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/prjamougolnye-gostevye-stoly-qdl/18318"
      }
    ]
  },
  {
    "id": "demo-6294",
    "name": "Дымчатый акцент",
    "subtitle": "Продуманная сервировка для каждого гостя",
    "category": "settings",
    "image": "variants/6294.jpg",
    "palette": [
      "#f1eee7",
      "#b1afa6",
      "#a2906f"
    ],
    "description": "Готовое сочетание посуды, бокалов и приборов. Добавьте комплект по количеству гостей и обсудите подходящий текстиль.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6294",
    "isDemo": true,
    "defaultVariantId": "6294",
    "variants": [
      {
        "id": "6294",
        "label": "Комплект",
        "price": 1275,
        "unit": "на одного гостя",
        "rentalDays": 3,
        "image": "variants/6294.jpg",
        "description": "Готовое сочетание посуды, бокалов и приборов. Добавьте комплект по количеству гостей и обсудите подходящий текстиль.",
        "composition": [
          {
            "id": "2819",
            "name": "Вилка десертная \"Сафо\" черная",
            "quantity": 1,
            "image": "components/2819.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2819"
          },
          {
            "id": "2820",
            "name": "Вилка столовая \"Сафо\" черная",
            "quantity": 1,
            "image": "components/2820.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2820"
          },
          {
            "id": "2823",
            "name": "Нож десертный \"Сафо\" черный",
            "quantity": 1,
            "image": "components/2823.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2823"
          },
          {
            "id": "2824",
            "name": "Нож столовый \"Сафо\" черный",
            "quantity": 1,
            "image": "components/2824.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2824"
          },
          {
            "id": "3128",
            "name": "Бокал \"Роулинг\" серый винный",
            "quantity": 1,
            "image": "components/3128.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3128"
          },
          {
            "id": "3129",
            "name": "Бокал \"Роулинг\" серый под шампанское",
            "quantity": 1,
            "image": "components/3129.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3129"
          },
          {
            "id": "3523",
            "name": "Кольцо для салфетки \"Мопассан\"",
            "quantity": 1,
            "image": "components/3523.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/koltsa-dlja-salfetok-fnm-nhx/3523"
          },
          {
            "id": "3656",
            "name": "Стакан \"Роулинг\" серый",
            "quantity": 1,
            "image": "components/3656.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3656"
          },
          {
            "id": "4785",
            "name": "Салфетка бархатная \"Бета\" черная",
            "quantity": 1,
            "image": "components/4785.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/4785"
          },
          {
            "id": "5781",
            "name": "Тарелка \"Мистраль\" прозрачная без канта",
            "quantity": 1,
            "image": "components/5781.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/5781"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6294"
      }
    ]
  },
  {
    "id": "demo-6233",
    "name": "Пудровое утро",
    "subtitle": "Продуманная сервировка для каждого гостя",
    "category": "settings",
    "image": "variants/6233.jpg",
    "palette": [
      "#f3eee7",
      "#d8bebc",
      "#b4a789"
    ],
    "description": "Готовое сочетание посуды, бокалов и приборов. Добавьте комплект по количеству гостей и обсудите подходящий текстиль.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6233",
    "isDemo": true,
    "defaultVariantId": "6233",
    "variants": [
      {
        "id": "6233",
        "label": "Комплект",
        "price": 1580,
        "unit": "на одного гостя",
        "rentalDays": 3,
        "image": "variants/6233.jpg",
        "description": "Ложка не входит в сет, вы можете добавить ее отдельно",
        "composition": [
          {
            "id": "2826",
            "name": "Нож десертный \"Сафо\" золотой",
            "quantity": 1,
            "image": "components/2826.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2826"
          },
          {
            "id": "2828",
            "name": "Нож столовый \"Сафо\" золотой",
            "quantity": 1,
            "image": "components/2828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2828"
          },
          {
            "id": "2830",
            "name": "Вилка десертная \"Сафо\" золотая",
            "quantity": 1,
            "image": "components/2830.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2830"
          },
          {
            "id": "2832",
            "name": "Вилка столовая \"Сафо\" золотая",
            "quantity": 1,
            "image": "components/2832.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2832"
          },
          {
            "id": "2884",
            "name": "Бокал \"Роулинг\" пыльно-розовый винный",
            "quantity": 1,
            "image": "components/2884.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2884"
          },
          {
            "id": "3034",
            "name": "Стакан \"Роулинг\" светло-голубой",
            "quantity": 1,
            "image": "components/3034.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3034"
          },
          {
            "id": "3137",
            "name": "Бокал \"Роулинг\" сиреневый под шампанское",
            "quantity": 1,
            "image": "components/3137.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/3137"
          },
          {
            "id": "3519",
            "name": "Кольцо для салфетки \"Доде\"",
            "quantity": 1,
            "image": "components/3519.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/koltsa-dlja-salfetok-fnm-nhx/3519"
          },
          {
            "id": "4166",
            "name": "Тарелка \"Вульф\" белая большая",
            "quantity": 1,
            "image": "components/4166.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4166"
          },
          {
            "id": "4170",
            "name": "Тарелка \"Вульф\" белая малая",
            "quantity": 1,
            "image": "components/4170.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4170"
          },
          {
            "id": "5847",
            "name": "Салфетка бархатная \"Бета\" розовая сакура",
            "quantity": 1,
            "image": "components/5847.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5847"
          },
          {
            "id": "6223",
            "name": "Тарелка \"Линдгрен\" прозрачная без канта",
            "quantity": 1,
            "image": "components/6223.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/6223"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6233"
      }
    ]
  },
  {
    "id": "demo-6220",
    "name": "Зелёная история",
    "subtitle": "Продуманная сервировка для каждого гостя",
    "category": "settings",
    "image": "variants/6220.jpg",
    "palette": [
      "#f1eee7",
      "#7f8a70",
      "#c4b896"
    ],
    "description": "Готовое сочетание посуды, бокалов и приборов. Добавьте комплект по количеству гостей и обсудите подходящий текстиль.",
    "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6220",
    "isDemo": true,
    "defaultVariantId": "6220",
    "variants": [
      {
        "id": "6220",
        "label": "Комплект",
        "price": 1355,
        "unit": "на одного гостя",
        "rentalDays": 3,
        "image": "variants/6220.jpg",
        "description": "Готовое сочетание посуды, бокалов и приборов. Добавьте комплект по количеству гостей и обсудите подходящий текстиль.",
        "composition": [
          {
            "id": "2826",
            "name": "Нож десертный \"Сафо\" золотой",
            "quantity": 1,
            "image": "components/2826.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2826"
          },
          {
            "id": "2828",
            "name": "Нож столовый \"Сафо\" золотой",
            "quantity": 1,
            "image": "components/2828.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2828"
          },
          {
            "id": "2830",
            "name": "Вилка десертная \"Сафо\" золотая",
            "quantity": 1,
            "image": "components/2830.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2830"
          },
          {
            "id": "2832",
            "name": "Вилка столовая \"Сафо\" золотая",
            "quantity": 1,
            "image": "components/2832.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/stolovye-pribory-zub-rrx/2832"
          },
          {
            "id": "2845",
            "name": "Бокал \"Роулинг\" зеленый винный",
            "quantity": 1,
            "image": "components/2845.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2845"
          },
          {
            "id": "2847",
            "name": "Бокал \"Роулинг\" зеленый под шампанское",
            "quantity": 1,
            "image": "components/2847.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2847"
          },
          {
            "id": "2849",
            "name": "Стакан \"Роулинг\" зеленый",
            "quantity": 1,
            "image": "components/2849.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/bokaly-drf-knl-afa-nmq/2849"
          },
          {
            "id": "3521",
            "name": "Кольцо для салфетки \"Кинг\"",
            "quantity": 1,
            "image": "components/3521.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/koltsa-dlja-salfetok-fnm-nhx/3521"
          },
          {
            "id": "4166",
            "name": "Тарелка \"Вульф\" белая большая",
            "quantity": 1,
            "image": "components/4166.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4166"
          },
          {
            "id": "4170",
            "name": "Тарелка \"Вульф\" белая малая",
            "quantity": 1,
            "image": "components/4170.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/tarelki-oir-djg/4170"
          },
          {
            "id": "5646",
            "name": "Салфетка \"Альфа\" оливковая",
            "quantity": 1,
            "image": "components/5646.jpg",
            "sourceUrl": "https://catalog.ameli-rental.ru/catalog/salfetki-hho-gfz-lpy/5646"
          }
        ],
        "sourceUrl": "https://catalog.ameli-rental.ru/catalog/sety-sss/6220"
      }
    ]
  }
];
