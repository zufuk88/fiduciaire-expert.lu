import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { customSitemapTransform } from './src/utils/sitemap-config.js';

export default defineConfig({
  site: 'https://www.fiduciaire-expert.lu',
  
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },
  
  integrations: [
    sitemap({
      serialize: customSitemapTransform,
      customPages: [],
      entryLimit: 10000,
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-LU',
          en: 'en-US'
        }
      }
    })
  ],
  
  // Configuration Vite pour supprimer les warnings CSS
  vite: {
    css: {
      devSourcemap: false
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignore les warnings CSS syntax-error
          if (warning.message?.includes('css-syntax-error')) return;
          warn(warning);
        }
      }
    }
  }
});
