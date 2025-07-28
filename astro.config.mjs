import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { customSitemapTransform } from './src/utils/sitemap-config.js';

export default defineConfig({
  site: 'https://www.fiduciaire-expert.lu',
  integrations: [
    sitemap({
      serialize: customSitemapTransform,
      customPages: [],
      entryLimit: 10000
    })
  ],
});
