import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ↓↓↓ AJOUTEZ CETTE LIGNE ↓↓↓
  site: 'https://www.fiduciaire-expert.lu',

  integrations: [sitemap()]
});