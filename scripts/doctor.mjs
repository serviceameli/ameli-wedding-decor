import fs from 'node:fs';
import { API_URL, apiGet, assertCompany } from '../lib/catalog-api.ts';

const major = Number(process.versions.node.split('.')[0]);
if (major !== 22 || !/^npm\/10\./.test(process.env.npm_config_user_agent || ''))
  throw new Error(
    'Используйте nvm install && nvm use: нужны Node.js 22.23.0 и npm 10.x.',
  );
if (fs.existsSync('.env')) process.loadEnvFile('.env');
const base = process.env.AMELI_API_URL || API_URL;
const company = await apiGet(base, '/api/v1/company/30/');
assertCompany(company);
const stands = await apiGet(base, '/api/v1/decor/', {
  category_slug: 'vysokie-stojki',
  page: '1',
  size: '1',
});
if (!Number.isInteger(stands.total))
  throw new Error('Invalid catalogue response');
console.log(
  `Node.js ${process.versions.node}; npm 10.x; API: ${company.name_company}, ID ${company.id}.`,
);
console.log(
  `Высокие стойки: ${stands.total} товаров. Нулевой результат означает пустой раздел в API.`,
);
