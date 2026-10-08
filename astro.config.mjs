// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import { BASE_PATH, SITE_URL } from './site.mjs';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  integrations: [preact()],
});
