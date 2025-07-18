import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // On retire les "//" pour que la ligne soit lue par le programme
  site: 'https://www.fiduciaire-expert.lu',

  integrations: [sitemap()]
});