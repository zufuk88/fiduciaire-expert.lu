import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { customSitemapTransform } from './src/utils/sitemap-config.js';

export default defineConfig({
  site: 'https://www.fiduciaire-expert.lu',
  
  // Redirections 301 pour les anciennes URLs
  redirects: {
    '/': '/fr',
    '/services': '/fr/services',
    '/comptabilite': '/fr/comptabilite',
    '/fiscalite': '/fr/fiscalite',
    '/creation-societe-luxembourg': '/fr/creation-societe-luxembourg',
    '/paie': '/fr/paie',
    '/domiciliation': '/fr/domiciliation',
    '/a-propos': '/fr/a-propos',
    '/contact': '/fr/contact',
    '/articles': '/fr/articles',
    '/articles/[...slug]': '/fr/articles/[...slug]',
    '/mentions-legales': '/fr/mentions-legales',
    '/politique-confidentialite': '/fr/politique-confidentialite',
  },
  
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
});
