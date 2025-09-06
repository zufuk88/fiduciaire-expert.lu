export function customSitemapTransform(page) {
  // Vérifier que page existe
  if (!page) {
    return page;
  }

  // Obtenir l'URL de manière sûre
  const url = typeof page === 'string' ? page : page.url || page;
  const pathname = url.replace('https://www.fiduciaire-expert.lu', '').replace(/\/$/, '') || '/';

  // Exclure les pages de recherche du sitemap
  if (pathname.includes('/recherche') || pathname.includes('/search')) {
    return null;
  }

  // Définir les priorités en fonction du type de page
  // Gestion des URLs avec préfixes de langue /fr et /en
  const priorities = {
    '/': 1.0, // Redirection racine
    '/fr': 1.0, // Page d'accueil française
    '/en': 1.0, // Page d'accueil anglaise
    '/fr/fiscalite': 1.0, // Pages très importantes pour le SEO
    '/en/tax': 1.0,
    '/fr/taxpertize': 1.0,
    '/en/taxpertize': 1.0,
    '/fr/services': 0.9,
    '/en/services': 0.9,
    '/fr/creation-societe-luxembourg': 0.9,
    '/en/company-formation-luxembourg': 0.9,
    '/fr/comptabilite': 0.8,
    '/en/accounting': 0.8,
    '/fr/paie': 0.8,
    '/en/payroll': 0.8,
    '/fr/domiciliation': 0.7,
    '/en/domiciliation': 0.7,
    '/fr/contact': 0.7,
    '/en/contact': 0.7,
    '/fr/a-propos': 0.7,
    '/en/about': 0.7,
    '/fr/articles': 0.6,
    '/en/articles': 0.6,
    'default': 0.5
  };

  // Obtenir la priorité basée sur l'URL
  let priority = priorities.default;
  
  // Vérifier d'abord les correspondances exactes
  if (priorities[pathname]) {
    priority = priorities[pathname];
  } else {
    // Ensuite vérifier les correspondances de préfixe
    for (const [path, prio] of Object.entries(priorities)) {
      if (path !== 'default' && pathname.startsWith(path + '/')) {
        priority = prio;
        break;
      }
    }
  }

  // Articles de blog individuels
  if (pathname.includes('/articles/') && !pathname.endsWith('/articles')) {
    // Articles de catégories
    if (pathname.includes('/category/')) {
      priority = 0.4;
    }
    // Pages de pagination
    else if (pathname.includes('/page/')) {
      priority = 0.4;
    }
    // Articles individuels (augmenter la priorité pour améliorer l'indexation)
    else {
      priority = 0.5;
    }
  }

  // Pages légales ont une priorité très faible
  if (pathname.includes('/mentions-legales') || 
      pathname.includes('/politique-confidentialite') ||
      pathname.includes('/legal-notice') || 
      pathname.includes('/privacy-policy')) {
    priority = 0.3;
  }
  
  // Pages de remerciement
  if (pathname.includes('/merci') || pathname.includes('/thank-you')) {
    priority = 0.2;
  }

  // Définir changefreq de manière plus granulaire
  let changefreq = 'monthly';
  if (priority >= 0.9) {
    changefreq = 'weekly';
  } else if (priority >= 0.8) {
    changefreq = 'weekly';
  } else if (pathname.includes('/articles/') && priority >= 0.5) {
    changefreq = 'weekly'; // Articles mis à jour plus fréquemment
  }

  return {
    url: url,
    lastmod: new Date().toISOString(),
    priority: priority,
    changefreq: changefreq
  };
}